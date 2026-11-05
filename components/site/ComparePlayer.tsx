"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExpandButton, PlayToggle, stamp } from "./MediaControls";
import { BAR, SCREEN } from "./ProofMedia";
import { useNear } from "./useNear";

export type Run = "baseline" | "hinoki";
export type Marker = { at: number; label: string };
export type CompareClip = { src: string; poster: string; markers: Marker[] };
export type PlayerState = { run: Run; time: number; playing: boolean };
export type PlayerHandle = {
  getState: () => PlayerState;
  setState: (state: PlayerState) => void;
};

const RUNS: Run[] = ["baseline", "hinoki"];

// Two runs of the same simulation behind one set of controls: a Without/With
// toggle that keeps the moment, a scrubber, and markers for the moments the
// video itself announces. Used inline and, larger, in the expanded view.
export function ComparePlayer({
  ref,
  chip,
  note,
  title,
  labels,
  runs,
  duration,
  initial,
  playWhenVisible = false,
  size = "inline",
  onExpand,
  onClose,
}: {
  ref?: Ref<PlayerHandle>;
  chip: string;
  note?: string;
  title: string;
  labels: Record<Run, string>;
  runs: Record<Run, CompareClip>;
  duration: number;
  initial?: PlayerState;
  playWhenVisible?: boolean;
  size?: "inline" | "large";
  onExpand?: () => void;
  onClose?: () => void;
}) {
  const baselineRef = useRef<HTMLVideoElement>(null);
  const hinokiRef = useRef<HTMLVideoElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const seekRef = useRef<HTMLInputElement>(null);
  const startRun: Run = initial?.run ?? "hinoki";
  const runRef = useRef<Run>(startRun);
  const frameRef = useRef(0);
  const [run, setRun] = useState<Run>(startRun);
  const [playing, setPlaying] = useState(false);
  // Inline, the posters load only as the player nears the screen; the
  // expanded view shows them at once.
  const near = useNear(hinokiRef);
  const posters = near || size === "large";

  const videoFor = (r: Run) => (r === "baseline" ? baselineRef.current : hinokiRef.current);

  // Timecode and scrubber are written straight to the DOM, not through state,
  // so playback doesn't re-render the panel every frame.
  const paint = (t: number) => {
    if (timeRef.current) timeRef.current.textContent = stamp(t);
    const seek = seekRef.current;
    if (seek) {
      seek.value = String(t);
      seek.style.setProperty("--p", `${(t / duration) * 100}%`);
    }
  };

  const loop = () => {
    const active = videoFor(runRef.current);
    if (!active) return;
    paint(active.currentTime);
    if (!active.paused) frameRef.current = requestAnimationFrame(loop);
  };

  const seekTo = (t: number) => {
    const active = videoFor(runRef.current);
    if (!active) return;
    active.currentTime = Math.min(Math.max(t, 0), duration);
    paint(active.currentTime);
  };

  const select = (next: Run, resumeAt?: number) => {
    const from = videoFor(runRef.current);
    const to = videoFor(next);
    const switching = next !== runRef.current;
    runRef.current = next;
    setRun(next);
    if (!from || !to) return;
    const wasPlaying = !from.paused;
    to.currentTime = resumeAt ?? from.currentTime;
    if (switching) from.pause();
    if (wasPlaying) void to.play().catch(() => {});
    paint(to.currentTime);
  };

  useImperativeHandle(ref, () => ({
    getState: () => {
      const active = videoFor(runRef.current);
      return {
        run: runRef.current,
        time: active?.currentTime ?? 0,
        playing: Boolean(active && !active.paused),
      };
    },
    setState: ({ run: r, time, playing: play }) => {
      select(r, time);
      const active = videoFor(r);
      if (!active) return;
      if (play) void active.play().catch(() => {});
      else active.pause();
    },
  }));

  useEffect(() => {
    const videos = [baselineRef.current, hinokiRef.current];
    if (videos.some((v) => !v)) return;

    const sync = () => {
      cancelAnimationFrame(frameRef.current);
      const active = videoFor(runRef.current);
      setPlaying(Boolean(active && !active.paused));
      loop();
    };
    for (const v of videos) {
      v!.addEventListener("play", sync);
      v!.addEventListener("pause", sync);
    }

    // Opening state (the expanded view starts where the inline one was).
    if (initial) {
      const active = videoFor(runRef.current)!;
      const start = () => {
        active.currentTime = initial.time;
        paint(initial.time);
        if (initial.playing) void active.play().catch(() => {});
      };
      if (active.readyState >= 1) start();
      else active.addEventListener("loadedmetadata", start, { once: true });
    }

    // A playing run pauses when scrolled away; it starts by itself on coming
    // into view only with `playWhenVisible` (and not under reduced motion).
    const autoplay = playWhenVisible && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) videos.forEach((v) => v!.pause());
        else if (autoplay) void videoFor(runRef.current)?.play().catch(() => {});
      },
      { threshold: 0.35 },
    );
    observer.observe(hinokiRef.current!);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
      for (const v of videos) {
        v!.removeEventListener("play", sync);
        v!.removeEventListener("pause", sync);
      }
    };
    // Mount-only: the handlers read the live run through runRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    const active = videoFor(runRef.current);
    if (!active) return;
    if (active.paused) void active.play().catch(() => {});
    else active.pause();
  };

  const large = size === "large";
  const name = `${title}, ${labels[run]}`;

  return (
    <div className={cn("flex min-w-0 flex-col", large && "bg-card")}>
      {/* Phones: chip and buttons share the first row, the run toggle gets
          its own. Wider: one row, toggle beside the chip. */}
      <div className={cn(BAR, "flex-wrap gap-y-2 py-2")}>
        <Badge variant="simulation">{chip}</Badge>
        <div role="group" aria-label={title} className="order-last flex w-full gap-1.5 sm:order-none sm:w-auto sm:flex-1">
          {RUNS.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={run === r}
              onClick={() => select(r)}
              className={cn(
                "h-8 rounded-full border px-3.5 text-[12px] font-medium tracking-[0.02em] transition-all duration-300 max-sm:flex-1",
                run !== r
                  ? "border-edge text-fg-secondary hover:text-fg-primary"
                  : r === "hinoki"
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-edge-strong bg-tint-strong text-fg-primary",
              )}
            >
              {labels[r]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <PlayToggle playing={playing} title={name} onClick={togglePlay} />
          {onExpand ? <ExpandButton title={name} onClick={onExpand} /> : null}
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="ml-2 rounded-full border border-edge px-4 py-1.5 text-[12px] font-medium text-fg-secondary transition-colors duration-300 hover:border-accent/40 hover:text-accent"
            >
              Close
            </button>
          ) : null}
        </div>
      </div>

      <div
        className={cn(SCREEN, large ? "aspect-video max-h-[72vh]" : "aspect-video")}
      >
        {RUNS.map((r) => (
          <video
            key={r}
            ref={r === "baseline" ? baselineRef : hinokiRef}
            src={runs[r].src}
            poster={posters ? runs[r].poster : undefined}
            muted
            loop
            playsInline
            preload={large ? "auto" : "none"}
            aria-label={`${title}, ${labels[r]}`}
            aria-hidden={run !== r}
            className={cn(
              "absolute inset-0 size-full object-contain transition-opacity duration-200",
              run === r ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      {/* Scrubber, with the moments this run's own overlay announces. */}
      <div className="flex items-start gap-4 border-t border-line px-4 pb-3 pt-4 font-mono text-[10px] tabular-nums tracking-[0.08em] text-fg-tertiary md:px-5">
        <span ref={timeRef} className="w-14 pt-0.5 text-fg-primary">
          00:00.00
        </span>
        <div className="relative flex-1 pb-5">
          <input
            ref={seekRef}
            type="range"
            min={0}
            max={duration}
            step={0.01}
            defaultValue={0}
            aria-label={`Position in ${name}`}
            onInput={(e) => seekTo(Number(e.currentTarget.value))}
            className="scrubber"
          />
          {runs[run].markers.map((m) => (
            <button
              key={`${run}-${m.label}`}
              type="button"
              onClick={() => seekTo(m.at - 0.4)}
              aria-label={`Jump to ${m.label}`}
              style={{ left: `${(m.at / duration) * 100}%` }}
              className="group/marker absolute top-[3px] flex -translate-x-1/2 flex-col items-center gap-1.5 px-2"
            >
              <span aria-hidden className="h-2.5 w-px bg-accent" />
              {/* Labels need room; on phones the ticks stand alone. */}
              <span className="hidden whitespace-nowrap text-[9px] uppercase tracking-[0.12em] text-fg-secondary transition-colors group-hover/marker:text-fg-primary sm:block">
                {m.label}
              </span>
            </button>
          ))}
        </div>
        <span className="pt-0.5">{stamp(duration)}</span>
      </div>

      {/* What the clip is, kept in the player so the enlarged view shows it too. */}
      {note ? (
        <p className="border-t border-line px-4 py-3 font-mono text-[10px] uppercase leading-[1.6] tracking-[0.16em] text-fg-secondary md:px-5">
          {note}
        </p>
      ) : null}
    </div>
  );
}
