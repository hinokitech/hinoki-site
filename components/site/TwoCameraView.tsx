"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { clearOverlay, drawOverlay, TrackTrail } from "./live/hinoki-overlay";
import { createTwoCamera, type TwoCamera, type TwoCameraFrame, type TwoCameraRates } from "./live/two-camera-engine";
import {
  BoardBlock,
  HinokiSwitch,
  TokenStrip,
  TrackBlock,
  useHinokiFeed,
  type Coordinates,
  type HinokiCopy,
  type StreamView,
} from "./HinokiHud";

export type CameraView = "compare" | "frame" | "event";

// Room the Hinoki readouts need on the event camera's side, in CSS pixels.
// Below WIDE the view is too small for them, so they sit under it instead.
// What goes to the vehicle's main board (the token stream, and the same
// answers in words) always sits just under the view, so it never covers the
// ball's bounce.
const TRACK_W = 200, BOARD_W = 212, GAP = 8, WIDE = 720;

// One scene, two cameras: the normal camera left of a divider the visitor
// can drag, the event camera right of it (or either one alone). The ball
// moves on its own, so a pointer crossing the scene on its way to the
// controls changes nothing. Runs only while `playing`.
//
// With Hinoki switched on, the event camera's side also shows Hinoki's
// planned output: a tracked ball with an ID, a forecast of its next bounce,
// the track and board readouts and lines of meaning. The tracking carries on
// while the ball is on the normal camera's side; the divider only changes
// what is shown, since both cameras see the whole scene.
export function TwoCameraView({
  view,
  playing,
  speed,
  sun,
  hold,
  hinoki,
  onHinoki,
  labels,
  hinokiCopy,
  below,
  onRates,
  onFail,
  onCompare,
  onStream,
  className,
}: {
  view: CameraView;
  playing: boolean;
  speed: number;
  sun: number;
  hold: boolean;
  hinoki: boolean;
  onHinoki: (on: boolean) => void;
  labels: { frame: string; frameShort: string; event: string; divider: string };
  hinokiCopy: HinokiCopy;
  /** Where the readouts go when the view is too small to hold them. */
  below: HTMLElement | null;
  onRates: (r: TwoCameraRates) => void;
  onFail: () => void;
  /** Where the divider is (0–1), for the demo's guided tour. */
  onCompare?: (at: number) => void;
  /** Tokens or Words in the message strip, for the tour. */
  onStream?: (view: StreamView) => void;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const frameLabelRef = useRef<HTMLParagraphElement>(null);
  const eventLabelRef = useRef<HTMLParagraphElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<TwoCamera | null>(null);
  const onRatesRef = useRef(onRates);
  const frameRef = useRef<TwoCameraFrame | null>(null);
  const rateRef = useRef(0);
  const hinokiRef = useRef(hinoki);
  const viewRef = useRef(view);
  // The box's tag: the track ID, what it is, and the model's confidence.
  const tagRef = useRef(hinokiCopy.tag.replace("{c}", "97"));
  const [compareAt, setCompareAt] = useState(0.5);
  const [coords, setCoords] = useState<Coordinates>("pixels");
  const [stream, setStream] = useState<StreamView>("tokens");
  const [fit, setFit] = useState({ width: 0, inset: 12, frame: 0, event: 0, toggle: 0, row: 30 });
  const split = view === "compare" ? compareAt : view === "frame" ? 1 : 0;
  const hud = hinoki && view !== "frame";
  const feed = useHinokiFeed({
    active: hud,
    playing,
    frameRef,
    rateRef,
    controls: { speed, sun, hold },
    lines: hinokiCopy.lines,
    reading: hinokiCopy.reading,
  });

  useEffect(() => {
    onRatesRef.current = onRates;
  }, [onRates]);

  useEffect(() => {
    onCompare?.(compareAt);
  }, [compareAt, onCompare]);

  useEffect(() => {
    onStream?.(stream);
  }, [stream, onStream]);

  // The tag shows how sure the model is that it's a ball, as of the latest
  // message shown, so it moves with the answers instead of sitting at 97%.
  useEffect(() => {
    tagRef.current = hinokiCopy.tag.replace("{c}", String(Math.round((feed.sure ?? 0.97) * 100)));
  }, [hinokiCopy.tag, feed.sure]);

  useEffect(() => {
    hinokiRef.current = hinoki;
    viewRef.current = view;
    // Redraw at once, in case the view is paused.
    engineRef.current?.set({});
  }, [hinoki, view]);

  // Each corner label shows only while its side of the divider has room for it.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () =>
      setFit({
        width: wrap.clientWidth,
        inset: frameLabelRef.current?.offsetLeft ?? 12,
        frame: frameLabelRef.current?.offsetWidth ?? 0,
        event: eventLabelRef.current?.offsetWidth ?? 0,
        toggle: switchRef.current?.offsetWidth ?? 0,
        row: rowRef.current?.offsetHeight ?? 30,
      });
    measure();
    const sized = new ResizeObserver(measure);
    sized.observe(wrap);
    return () => sized.disconnect();
  }, []);
  const room = (share: number, label: number) => share * fit.width >= fit.inset + label + 10;
  const showFrame = fit.width ? room(split, fit.frame) : split >= 0.22;
  const showEvent = fit.width ? room(1 - split, fit.event) : split <= 0.78;
  const showSwitch = view !== "frame" && (fit.width ? room(1 - split, fit.toggle) : split <= 0.78);

  // The latest settings, for an engine that starts after they were set.
  const paramsRef = useRef({ split, speed, sun, hold });
  const playingRef = useRef(playing);

  // The engine (WebGL) starts only when the view comes near the screen, so
  // the page doesn't pay for it on load. It looks the same once it's there.
  useEffect(() => {
    const canvas = canvasRef.current, overlay = overlayRef.current;
    if (!canvas || !overlay) return;
    let engine: TwoCamera | null = null;
    let sized: ResizeObserver | null = null;

    const boot = () => {
      const ctx = overlay.getContext("2d");
      const trail = new TrackTrail();
      const font = getComputedStyle(overlay).fontFamily;
      let dpr = 1, drawn = false, started = false;

      // Hinoki's marks, every frame. The track starts the first time the ball
      // moves: until then the event camera has nothing to see.
      const onFrame = (f: TwoCameraFrame) => {
        frameRef.current = f;
        if (!ctx) return;
        const on = hinokiRef.current && viewRef.current !== "frame";
        if (!on) {
          started = false;
          trail.clear();
        } else if (!f.held) {
          started = true;
        }
        if (!on || !started) {
          if (drawn) clearOverlay(ctx);
          drawn = false;
          return;
        }
        if (!f.held) trail.push(f);
        drawOverlay(ctx, f, trail, {
          tag: tagRef.current,
          eta: (s) => `${s.toFixed(2)} s`,
          font: `${11 * dpr}px ${font}`,
          dpr,
        });
        drawn = true;
      };

      const made = createTwoCamera(
        canvas,
        (r) => {
          rateRef.current = r.events;
          onRatesRef.current(r);
        },
        onFrame,
      );
      if (!made) {
        onFail();
        return;
      }
      engine = made;
      engineRef.current = made;
      const resize = () => {
        const rect = overlay.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        overlay.width = Math.max(1, Math.round(rect.width * dpr));
        overlay.height = Math.max(1, Math.round(rect.height * dpr));
        drawn = true;
        made.resize();
      };
      resize();
      sized = new ResizeObserver(resize);
      sized.observe(canvas);
      made.set(paramsRef.current);
      if (playingRef.current) made.start();
    };

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        near.disconnect();
        boot();
      },
      { rootMargin: "120px 0px" },
    );
    near.observe(canvas);
    return () => {
      near.disconnect();
      sized?.disconnect();
      engine?.destroy();
      engineRef.current = null;
    };
  }, [onFail]);

  useEffect(() => {
    paramsRef.current = { split, speed, sun, hold };
    engineRef.current?.set({ split, speed, sun, hold });
  }, [split, speed, sun, hold]);

  useEffect(() => {
    playingRef.current = playing;
    const engine = engineRef.current;
    if (!engine) return;
    if (playing) engine.start();
    else engine.stop();
  }, [playing]);

  // Divider: drag it, or focus it and use the arrow keys.
  const fromPointer = (clientX: number) => {
    const r = canvasRef.current?.getBoundingClientRect();
    if (!r) return;
    setCompareAt(Math.min(0.95, Math.max(0.05, (clientX - r.left) / r.width)));
  };

  // The handle holds the pointer from press to release, and the divider moves
  // only while it does. So it never follows a pointer that isn't pressed, even
  // if a release goes missing (for example, let go outside the window).
  const onHandleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const handle = e.currentTarget;
    if (!handle.hasPointerCapture(e.pointerId)) return;
    if (e.pointerType === "mouse" && e.buttons === 0) {
      handle.releasePointerCapture(e.pointerId);
      return;
    }
    fromPointer(e.clientX);
  };

  const pct = Math.round(split * 100);

  // Where Hinoki's readouts go: on the event camera's side when it has room,
  // under the view when the view itself is small.
  const wide = fit.width >= WIDE;
  const eventPx = (1 - split) * fit.width;
  // The board block carries all the metrics, so it's the one kept when only one fits.
  const showBoard = hud && wide && eventPx >= BOARD_W + 2 * fit.inset;
  const showTrack = hud && wide && eventPx >= TRACK_W + BOARD_W + GAP + 2 * fit.inset;

  return (
    <div ref={wrapRef} className={cn("relative select-none", className)}>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />
      <canvas ref={overlayRef} aria-hidden className="pointer-events-none absolute inset-0 size-full font-mono" />

      <p
        ref={frameLabelRef}
        className={cn(
          "pointer-events-none absolute left-3 top-3 whitespace-nowrap rounded-full border border-edge bg-ground/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-secondary transition-opacity duration-300 md:left-4 md:top-4",
          !showFrame && "opacity-0",
        )}
      >
        <span className="sm:hidden">{labels.frameShort}</span>
        <span className="hidden sm:inline">{labels.frame}</span>
      </p>

      {/* The label and the switch share a line while there's room, so the
          board block sits high, above the ball's highest bounce. */}
      <div
        className="pointer-events-none absolute right-3 top-3 flex flex-col items-end gap-2 md:right-4 md:top-4"
        style={fit.width ? { maxWidth: Math.max(0, eventPx - 2 * fit.inset) } : undefined}
      >
        <div ref={rowRef} className="flex flex-wrap items-center justify-end gap-2">
          <p
            ref={eventLabelRef}
            className={cn(
              "whitespace-nowrap rounded-full border border-accent/40 bg-ground/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent transition-opacity duration-300",
              !showEvent && "opacity-0",
            )}
          >
            {labels.event}
          </p>
          <div ref={switchRef}>
            <HinokiSwitch on={hinoki} onChange={onHinoki} label={hinokiCopy.toggle} visible={showSwitch} />
          </div>
        </div>
        {showBoard ? <BoardBlock feed={feed} copy={hinokiCopy} style={{ width: BOARD_W }} /> : null}
      </div>

      {showTrack ? (
        <TrackBlock
          feed={feed}
          coords={coords}
          onCoords={setCoords}
          copy={hinokiCopy}
          className="absolute"
          style={{ left: split * fit.width + fit.inset, top: fit.inset + fit.row + GAP, width: TRACK_W }}
        />
      ) : null}

      {view === "compare" ? (
        <div className="absolute inset-y-0 w-0" style={{ left: `${split * 100}%` }}>
          <div aria-hidden className="absolute inset-y-0 -left-px w-[2px] bg-white/70" />
          <div
            role="slider"
            tabIndex={0}
            data-tour="divider"
            aria-label={labels.divider}
            aria-valuemin={5}
            aria-valuemax={95}
            aria-valuenow={pct}
            aria-valuetext={`${labels.frame} ${pct}%, ${labels.event} ${100 - pct}%`}
            onPointerDown={(e) => e.currentTarget.setPointerCapture(e.pointerId)}
            onPointerMove={onHandleMove}
            onKeyDown={(e) => {
              const step = e.key === "ArrowLeft" ? -0.05 : e.key === "ArrowRight" ? 0.05 : 0;
              if (!step) return;
              e.preventDefault();
              setCompareAt((v) => Math.min(0.95, Math.max(0.05, v + step)));
            }}
            className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/70 bg-ground/90 text-ink shadow-[0_0_24px_rgb(0_0_0/0.5)] outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-accent"
            style={{ touchAction: "none" }}
          >
            <svg aria-hidden viewBox="0 0 20 12" className="h-3 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 1 1 6l5 5M14 1l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      ) : null}

      {hud && below
        ? createPortal(
            <div className="stay-dark border-t border-line bg-ground">
              <TokenStrip feed={feed} view={stream} onView={setStream} copy={hinokiCopy} />
              {wide ? null : (
                <div className="grid gap-2 px-3 pb-3 sm:grid-cols-2">
                  <TrackBlock feed={feed} coords={coords} onCoords={setCoords} copy={hinokiCopy} />
                  <BoardBlock feed={feed} copy={hinokiCopy} />
                </div>
              )}
            </div>,
            below,
          )
        : null}
    </div>
  );
}
