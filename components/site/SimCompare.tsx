"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExpandButton, PlayToggle, VideoLightbox, stamp } from "./MediaControls";
import { BAR, FIGURE } from "./ProofMedia";

type Run = "baseline" | "hinoki";
type Clip = { src: string; poster: string };

// The blind-corner simulation, run twice: without Hinoki (camera + AI + LiDAR)
// and with it. The two exports cover the same span of simulation time, so
// switching runs keeps the moment: the toggle shows what changes, not when.
export function SimCompare({
  chip,
  title,
  caption,
  labels,
  runs,
  viewport = "aspect-video",
  className,
}: {
  chip: string;
  title: string;
  caption: string;
  labels: Record<Run, string>;
  runs: Record<Run, Clip>;
  viewport?: string;
  className?: string;
}) {
  const baselineRef = useRef<HTMLVideoElement>(null);
  const hinokiRef = useRef<HTMLVideoElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const runRef = useRef<Run>("hinoki");
  const [run, setRun] = useState<Run>("hinoki");
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const videoFor = (r: Run) => (r === "baseline" ? baselineRef.current : hinokiRef.current);

  useEffect(() => {
    const time = timeRef.current;
    const videos = [baselineRef.current, hinokiRef.current];
    if (!time || videos.some((v) => !v)) return;

    let frame = 0;
    const draw = () => {
      const active = videoFor(runRef.current);
      if (!active) return;
      time.textContent = stamp(active.currentTime);
      if (!active.paused) frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      const active = videoFor(runRef.current);
      setPlaying(Boolean(active && !active.paused));
      draw();
    };
    for (const v of videos) {
      v!.addEventListener("play", sync);
      v!.addEventListener("pause", sync);
    }

    let observer: IntersectionObserver | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      observer = new IntersectionObserver(
        ([entry]) => {
          const active = videoFor(runRef.current);
          if (entry.isIntersecting) void active?.play().catch(() => {});
          else videos.forEach((v) => v!.pause());
        },
        { threshold: 0.35 },
      );
      observer.observe(hinokiRef.current!);
    }

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      for (const v of videos) {
        v!.removeEventListener("play", sync);
        v!.removeEventListener("pause", sync);
      }
    };
  }, []);

  const select = (next: Run) => {
    if (next === runRef.current) return;
    const from = videoFor(runRef.current);
    const to = videoFor(next);
    runRef.current = next;
    setRun(next);
    if (!from || !to) return;
    const wasPlaying = !from.paused;
    to.currentTime = from.currentTime;
    from.pause();
    if (wasPlaying) void to.play().catch(() => {});
    else if (timeRef.current) timeRef.current.textContent = stamp(to.currentTime);
  };

  const toggle = () => {
    const active = videoFor(runRef.current);
    if (!active) return;
    if (active.paused) void active.play().catch(() => {});
    else active.pause();
  };

  const expand = () => {
    const active = videoFor(runRef.current);
    if (!active) return;
    active.pause();
    setExpanded(active.currentTime);
  };

  return (
    <figure className={cn(FIGURE, className)}>
      <div className={cn(BAR, "flex-wrap py-2")}>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="simulation">{chip}</Badge>
          <div role="group" aria-label={title} className="flex gap-1">
            {(["baseline", "hinoki"] as const).map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={run === r}
                onClick={() => select(r)}
                className={cn(
                  "h-7 rounded-[2px] border px-2.5 font-label text-[10px] uppercase tracking-[0.1em] transition-colors duration-200",
                  run !== r
                    ? "border-white/[0.08] text-muted hover:text-ink"
                    : r === "hinoki"
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-white/[0.16] bg-white/[0.06] text-ink",
                )}
              >
                {labels[r]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.12em] text-faint">
          <span ref={timeRef} className="mr-1 tabular-nums">
            --:--.--
          </span>
          <PlayToggle playing={playing} title={`${title}, ${labels[run]}`} onClick={toggle} />
          <ExpandButton title={`${title}, ${labels[run]}`} onClick={expand} />
        </div>
      </div>

      <div className={cn("relative min-h-0 overflow-hidden bg-ground", viewport)}>
        {(["baseline", "hinoki"] as const).map((r) => (
          <video
            key={r}
            ref={r === "baseline" ? baselineRef : hinokiRef}
            src={runs[r].src}
            poster={runs[r].poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${title}, ${labels[r]}`}
            aria-hidden={run !== r}
            className={cn(
              "absolute inset-0 size-full object-contain transition-opacity duration-200",
              run === r ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      <figcaption className="mt-auto border-t border-white/[0.06] p-5 md:p-6">
        <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</span>
        <span className="mt-2 block text-[14px] leading-[1.6] text-muted">{caption}</span>
      </figcaption>

      <VideoLightbox
        open={expanded !== null}
        src={runs[run].src}
        title={`${title} · ${labels[run]}`}
        startAt={expanded ?? 0}
        onClose={() => setExpanded(null)}
      />
    </figure>
  );
}
