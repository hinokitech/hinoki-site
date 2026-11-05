"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { SiteCopy } from "@/content/site.en";
import { cn } from "@/lib/utils";

// The demo's guided tour (prototype, Sal 2026-11-05). Friendly in what it
// says and how it paces, and set like the rest of the site: a dark card with
// a hairline, an orange rule and a small mono label. It works like a game's
// first level: one thing at a time, a short cheer the moment the visitor
// does it, and the power-up (With Hinoki) as the climax, then a few tips on
// what Hinoki is doing and a last "try to lose it". Nothing moves on by
// itself: every tip waits for Next, so there's time to read and look.
// On every visit the demo waits at its start, and a tip at the play button
// asks for play (Sal, 2026-11-05: "isn't starting from the start position we
// designed"). Pressing play (or Start) starts the demo and the tour together;
// Skip tour just starts the demo. The tour never blocks the demo and scrolls
// each control into sight; "Show me around" replays it. On phones the tip is
// a card at the bottom of the screen.

export type TourState = {
  playing: boolean;
  compareAt: number;
  sun: number;
  speed: number;
  hold: boolean;
  hinoki: boolean;
  stream: "tokens" | "words";
  view: "compare" | "frame" | "event";
};

type Copy = SiteCopy["hero"]["tour"];
type Part = keyof Copy["parts"];
/** Beside the control, or inside the view: low ("inside") or high ("upper"). */
type Place = "right" | "left" | "top" | "bottom" | "inside" | "upper";
type Step = {
  id: string;
  part: Part;
  /** The [data-tour] element the tip points at. */
  anchor: string;
  place: Place;
  /** Where the cheer sits, if not where the question was. */
  reactPlace?: Place;
  /** When the step counts as done; without one it waits for Next. */
  done?: (s: TourState, at: TourState) => boolean;
  /** Passed over when it's already true, such as the divider already centred. */
  skip?: (s: TourState) => boolean;
};

const PHONE_W = 640;
const centred = (s: TourState) => Math.abs(s.compareAt - 0.5) <= 0.04;

const STEPS: Step[] = [
  // The way in: press play. Passed over when the demo is already running.
  { id: "play", part: "start", anchor: "play", place: "left", done: (s) => s.playing, skip: (s) => s.playing },
  { id: "divider", part: "learn", anchor: "divider", place: "right", done: (s, at) => Math.abs(s.compareAt - at.compareAt) >= 0.08 },
  { id: "center", part: "learn", anchor: "divider", place: "right", done: centred, skip: centred },
  { id: "sun", part: "learn", anchor: "sun", place: "top", done: (s) => s.sun >= 70 },
  { id: "speed", part: "learn", anchor: "speed", place: "top", done: (s) => s.speed >= 85 },
  { id: "hold", part: "learn", anchor: "hold", place: "top", done: (s) => s.hold },
  // The climax. Its cheer moves to the top middle of the view, between the
  // readouts that appear and clear of the ball.
  { id: "hinoki", part: "power", anchor: "hinoki", place: "bottom", reactPlace: "upper", done: (s) => s.hinoki },
  { id: "track", part: "magic", anchor: "track", place: "left" },
  { id: "arc", part: "magic", anchor: "view", place: "inside" },
  { id: "board", part: "magic", anchor: "board", place: "right" },
  { id: "tokens", part: "magic", anchor: "stream", place: "top" },
  { id: "words", part: "magic", anchor: "words", place: "top", done: (s) => s.stream === "words" },
  { id: "finale", part: "last", anchor: "sliders", place: "top", done: (s) => s.speed >= 98 && s.sun >= 98 },
];
const POWER = STEPS.findIndex((s) => s.id === "hinoki");

type Box = { left: number; top: number; width: number; height: number };
type Layout = {
  /** On phones the tip is a card fixed at the bottom of the screen. */
  sheet: boolean;
  bubble: { left: number; top: number; width: number } | null;
  arrow: { side: Place; at: number } | null;
  ring: (Box & { radius: number }) | null;
};

const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 14 10" className="tour-arrow h-2.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 5h11M8.5 1.5 12 5 8.5 8.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DemoTour({
  copy,
  state,
  rootRef,
  enabled,
  replay,
  onStart,
  onClose,
  onPowerUp,
  onView,
}: {
  copy: Copy;
  state: TourState;
  /** The demo's section: tips are placed inside it and scroll with it. */
  rootRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  /** Bumped by the "Show me around" link to start over. */
  replay: number;
  /** Start the demo (the first tip's Start, or a jump to the power-up). */
  onStart: () => void;
  /** The tips are closed: from now on the demo starts by itself when in view. */
  onClose: () => void;
  /** The climax: switch Hinoki on (if the visitor pressed Next) and let the ball go. */
  onPowerUp: () => void;
  /** Change the camera view, for steps that need one. */
  onView: (view: "compare" | "event") => void;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"ask" | "react" | "final">("ask");
  const [layout, setLayout] = useState<Layout | null>(null);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const atRef = useRef(state); // the state when the current step began
  const stateRef = useRef(state);
  const phaseRef = useRef(phase);
  const bubbleRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    stateRef.current = state;
    phaseRef.current = phase;
  });

  const step = index === null ? null : STEPS[index];

  const begin = (from: number) => {
    const s = stateRef.current;
    let i = from;
    while (i < STEPS.length - 1 && STEPS[i].skip?.(s)) i++;
    // The divider exists only in the two-camera view, the switch wherever the
    // event camera shows, and Hinoki's readouts once it's on.
    const id = STEPS[i].id;
    if ((id === "divider" || id === "center") && s.view !== "compare") onView("compare");
    else if (i === POWER && s.view === "frame") onView("compare");
    else if (i > POWER && s.view === "frame") onView("event");
    atRef.current = s;
    setPhase("ask");
    setIndex(i);
  };

  const close = () => {
    setIndex(null);
    onClose();
  };

  // A small burst of event dots: the demo's own look, used as the reward.
  const burst = (anchor: string) => {
    const root = rootRef.current;
    const el = root?.querySelector<HTMLElement>(`[data-tour="${anchor}"]`);
    if (!root || !el || still()) return;
    const r = el.getBoundingClientRect(), o = root.getBoundingClientRect();
    const id = Date.now();
    setBursts((b) => [...b, { id, x: r.left - o.left + r.width / 2, y: r.top - o.top + r.height / 2 }]);
    window.setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 900);
  };

  // Finish a step: a cheer that stays until Next, or straight on.
  const complete = (i: number) => {
    const s = STEPS[i];
    if (s.id === "hinoki") onPowerUp();
    burst(s.anchor);
    if (i === STEPS.length - 1) setPhase("final");
    else if (copy.steps[s.id]?.reaction) setPhase("react");
    else begin(i + 1);
  };

  const next = () => {
    if (index === null) return;
    if (phase === "react") begin(index + 1);
    // The first tip's Start presses play; the watch below then moves on.
    else if (STEPS[index].id === "play") onStart();
    // At the power-up, Next switches Hinoki on, since every tip after it needs it.
    else if (index === POWER || index === STEPS.length - 1) complete(index);
    else begin(index + 1);
  };

  // Ask for play once the demo has been on screen for a moment.
  useEffect(() => {
    const view = rootRef.current?.querySelector('[data-tour="view"]');
    if (!enabled || !view) return;
    let wait = 0;
    const seen = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(wait);
        if (!entry.isIntersecting) return;
        wait = window.setTimeout(() => {
          seen.disconnect();
          begin(0);
        }, 800);
      },
      { threshold: 0.5 },
    );
    seen.observe(view);
    return () => {
      window.clearTimeout(wait);
      seen.disconnect();
    };
    // Mount-only: begin() reads live values through refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // "Show me around": start over.
  useEffect(() => {
    if (replay) begin(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replay]);

  // Watch the demo for each step's action. Switching Hinoki on early skips
  // straight to the power-up; switching it off later goes back to it.
  useEffect(() => {
    if (index === null || phase !== "ask") return;
    if (index < POWER && state.hinoki) {
      if (!state.playing) onStart();
      setIndex(POWER);
      complete(POWER);
      return;
    }
    if (index > POWER && !state.hinoki) {
      begin(POWER);
      return;
    }
    if (STEPS[index].done?.(state, atRef.current)) complete(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, index, phase]);

  // Esc closes the tour.
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // The power-up switch beckons while it's its turn.
  useEffect(() => {
    if (index !== POWER || phase !== "ask") return;
    const el = rootRef.current?.querySelector('[data-tour="hinoki"]');
    el?.classList.add("tour-beckon");
    return () => el?.classList.remove("tour-beckon");
  }, [index, phase, rootRef]);

  // Bring each step's control into sight, with the whole view where both fit
  // (above the card, on phones), so nothing the tip talks about is cut off.
  // Not for the first tip: the visitor is still scrolling and hasn't joined in.
  useEffect(() => {
    if (!step || step.id === "play") return;
    const id = window.setTimeout(() => {
      const root = rootRef.current;
      const view = root?.querySelector<HTMLElement>('[data-tour="view"]');
      const el = root?.querySelector<HTMLElement>(`[data-tour="${step.anchor}"]`) ?? view;
      if (!root || !el) return;
      const phone = root.clientWidth < PHONE_W;
      const top = 84, bottom = window.innerHeight - (phone ? 210 : 40);
      const a = el.getBoundingClientRect();
      const v = view?.getBoundingClientRect();
      const lo = Math.min(a.top, v?.top ?? a.top), hi = Math.max(a.bottom, v?.bottom ?? a.bottom);
      let delta = 0;
      if (hi - lo <= bottom - top) delta = lo < top ? lo - top : hi > bottom ? hi - bottom : 0;
      else delta = a.top < top ? a.top - top : a.bottom > bottom ? a.bottom - bottom : 0;
      if (Math.abs(delta) > 4) window.scrollBy({ top: delta, behavior: still() ? "auto" : "smooth" });
    }, 80);
    return () => window.clearTimeout(id);
  }, [step, rootRef]);

  // Keep the tip beside its control as the demo moves and resizes. If the
  // control isn't showing (say, no room beside the divider), the tip sits
  // inside the view instead, so the tour can always carry on.
  useLayoutEffect(() => {
    if (!step) return;
    let frame = 0;
    let last = "";
    const place = () => {
      frame = requestAnimationFrame(place);
      const root = rootRef.current, bubble = bubbleRef.current;
      if (!root || !bubble) return;
      const view = root.querySelector<HTMLElement>('[data-tour="view"]');
      let el = root.querySelector<HTMLElement>(`[data-tour="${step.anchor}"]`);
      let want: Place = phaseRef.current !== "ask" && step.reactPlace ? step.reactPlace : step.place;
      let r = el?.getBoundingClientRect();
      if (!el || !r || r.width === 0 || getComputedStyle(el).opacity === "0") {
        el = view;
        r = view?.getBoundingClientRect();
        want = "inside";
      }
      if (!el || !r) return;
      const o = root.getBoundingClientRect();
      const a = { left: r.left - o.left, top: r.top - o.top, width: r.width, height: r.height };
      const ring =
        el === view
          ? null
          : { left: a.left - 6, top: a.top - 6, width: a.width + 12, height: a.height + 12, radius: a.height > 48 ? 14 : 999 };
      const rootW = root.clientWidth;

      let next: Layout;
      if (rootW < PHONE_W) {
        next = { sheet: true, bubble: null, arrow: null, ring };
      } else {
        const width = 296;
        const h = bubble.offsetHeight;
        const gap = 14;
        const cx = a.left + a.width / 2, cy = a.top + a.height / 2;
        const clampX = (x: number) => Math.max(16, Math.min(rootW - 16 - width, x));
        // Beside a control, the tip flips to the other side, then below, when
        // there's no room.
        let side = want;
        const fitsRight = a.left + a.width + gap + width <= rootW - 16;
        const fitsLeft = a.left - gap - width >= 16;
        if (side === "right" && !fitsRight) side = fitsLeft ? "left" : "bottom";
        if (side === "left" && !fitsLeft) side = fitsRight ? "right" : "bottom";
        // Above or below a control, the tip opens toward the middle.
        const across = cx > rootW / 2 ? clampX(cx - width + 44) : clampX(cx - 44);
        let left = 0, top = 0;
        if (side === "right") ((left = a.left + a.width + gap), (top = cy - 36));
        else if (side === "left") ((left = a.left - gap - width), (top = cy - 36));
        else if (side === "top") ((left = across), (top = a.top - h - gap));
        else if (side === "bottom") ((left = across), (top = a.top + a.height + gap));
        else {
          // Inside the view on the event camera's side: low, or high.
          const box = view?.getBoundingClientRect();
          const v = box ? { left: box.left - o.left, top: box.top - o.top, width: box.width, height: box.height } : a;
          const s = stateRef.current;
          const share = s.view === "compare" ? s.compareAt + (1 - s.compareAt) / 2 : 0.5;
          left = clampX(v.left + share * v.width - width / 2);
          top = side === "upper" ? v.top + 56 : v.top + v.height - h - 16;
        }
        const arrow =
          side === "inside" || side === "upper"
            ? null
            : side === "top" || side === "bottom"
              ? { side, at: Math.max(20, Math.min(width - 20, cx - left)) }
              : { side, at: Math.max(20, Math.min(h - 20, cy - top)) };
        next = { sheet: false, bubble: { left, top, width }, arrow, ring };
      }
      const key = [
        next.sheet ? 1 : 0,
        next.bubble?.left, next.bubble?.top, next.arrow?.at,
        ring?.left, ring?.top, ring?.width, ring?.height,
      ]
        .map((v) => Math.round(v ?? 0))
        .join(",");
      if (key !== last) {
        last = key;
        setLayout(next);
      }
    };
    place();
    return () => cancelAnimationFrame(frame);
  }, [step, rootRef]);

  const root = rootRef.current;
  if (!root || index === null || !step) return null;

  const words = copy.steps[step.id] ?? { title: "" };
  const label = copy.parts[step.part];
  const cheering = phase !== "ask" && !!words.reaction;
  // The play tip is the way in, so the count starts after it.
  const first = step.id === "play";
  const count = first ? "" : `${String(index).padStart(2, "0")} / ${String(STEPS.length - 1).padStart(2, "0")}`;

  return createPortal(
    <>
      {layout?.ring ? (
        <div
          aria-hidden
          className="tour-ring pointer-events-none absolute z-30"
          style={{
            left: layout.ring.left,
            top: layout.ring.top,
            width: layout.ring.width,
            height: layout.ring.height,
            borderRadius: layout.ring.radius,
          }}
        />
      ) : null}

      {bursts.map((b) => (
        <div key={b.id} aria-hidden className="pointer-events-none absolute z-40" style={{ left: b.x, top: b.y }}>
          {Array.from({ length: 14 }, (_, k) => (
            <span key={k} className="tour-dot" style={{ ["--a" as string]: `${(k / 14) * 360}deg`, animationDelay: `${(k % 3) * 40}ms` }} />
          ))}
        </div>
      ))}

      {/* Set like the site's own cards: dark in both themes, a hairline, an
          orange rule along the top and a mono label. A shade lighter than
          the demo's own panels, with a deeper shadow, so it stands clear of
          them once Hinoki is on (Sal, 2026-11-05: "a little brighter"). */}
      <div
        ref={bubbleRef}
        key={`${index}-${phase}`}
        role="dialog"
        aria-label={label}
        className={cn(
          "tour-bubble stay-dark z-50 rounded-xl border border-white/[0.2] bg-[#1f232b] px-5 pb-4 pt-4 text-left text-fg-primary shadow-[0_24px_60px_-8px_rgb(0_0_0/0.8),0_0_0_1px_rgb(0_0_0/0.4)]",
          layout?.sheet ? "fixed inset-x-3 bottom-3 mx-auto max-w-[440px]" : "absolute",
          !layout && "invisible",
          // A soft orange glow that breathes while Hinoki is on (globals.css).
          state.hinoki && "tour-glow",
        )}
        style={layout && !layout.sheet && layout.bubble ? { left: layout.bubble.left, top: layout.bubble.top, width: layout.bubble.width } : undefined}
      >
        <div aria-hidden className="absolute inset-x-5 top-0 h-px bg-accent" />
        <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span className="text-accent">{label}</span>
          <span className="tabular-nums text-fg-tertiary">{count}</span>
        </div>

        <div aria-live="polite" className="mt-3">
          {cheering ? (
            <p className="flex items-baseline gap-2.5 text-[16px] leading-[1.45] tracking-[-0.01em]">
              <span aria-hidden className="tour-check text-accent">
                ✓
              </span>
              {words.reaction}
            </p>
          ) : (
            <>
              <p className="text-[16px] leading-[1.45] tracking-[-0.01em]">{words.title}</p>
              {words.body ? <p className="mt-1.5 text-pretty text-[14px] leading-[1.6] text-fg-secondary">{words.body}</p> : null}
            </>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/[0.1] pt-3">
          {phase === "final" ? (
            <>
              <button type="button" onClick={close} className="text-[12px] text-fg-tertiary transition-colors hover:text-fg-primary">
                {copy.done}
              </button>
              <a
                href={copy.trial.href}
                onClick={close}
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-accent transition-colors hover:text-fg-primary"
              >
                {copy.trial.label}
                <Arrow />
              </a>
            </>
          ) : (
            <>
              <button type="button" onClick={close} className="text-[12px] text-fg-tertiary transition-colors hover:text-fg-primary">
                {copy.skip}
              </button>
              <button
                type="button"
                onClick={next}
                className={cn(
                  "group inline-flex items-center gap-2 text-[13px] font-medium text-accent transition-colors hover:text-fg-primary",
                  (cheering || first) && "tour-nudge",
                )}
              >
                {first ? copy.start : copy.next}
                <Arrow />
              </button>
            </>
          )}
        </div>

        {layout?.arrow ? (
          <span
            aria-hidden
            className={cn(
              "absolute size-3 border-l border-t bg-[#1f232b]",
              state.hinoki ? "border-accent/50" : "border-white/[0.2]",
            )}
            style={
              layout.arrow.side === "right"
                ? { left: -7, top: layout.arrow.at - 6, transform: "rotate(-45deg)" }
                : layout.arrow.side === "left"
                  ? { right: -7, top: layout.arrow.at - 6, transform: "rotate(135deg)" }
                  : layout.arrow.side === "top"
                    ? { bottom: -7, left: layout.arrow.at - 6, transform: "rotate(-135deg)" }
                    : { top: -7, left: layout.arrow.at - 6, transform: "rotate(45deg)" }
            }
          />
        ) : null}
      </div>
    </>,
    root,
  );
}
