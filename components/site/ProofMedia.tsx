"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProofMediaProps = {
  kind: string;
  chip: string;
  title: string;
  caption: string;
  src: string | null;
  poster: string | null;
  /** Aspect class for the picture area, close to the clip's own shape. */
  viewport?: string;
  className?: string;
};

const stamp = (t: number) =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}.${String(
    Math.floor((t % 1) * 100),
  ).padStart(2, "0")}`;

// A demo clip framed like an instrument readout. The timecode is the video's
// own playback position, not invented data. Muted loops play only while on
// screen and never on their own under reduced motion; the button always works.
export function ProofMedia({
  kind,
  chip,
  title,
  caption,
  src,
  poster,
  viewport = "aspect-video",
  className,
}: ProofMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const time = timeRef.current;
    if (!video || !time) return;

    let frame = 0;
    const draw = () => {
      time.textContent = stamp(video.currentTime);
      if (!video.paused) frame = requestAnimationFrame(draw);
    };
    const onPlay = () => {
      setPlaying(true);
      frame = requestAnimationFrame(draw);
    };
    const onPause = () => {
      setPlaying(false);
      cancelAnimationFrame(frame);
      draw();
    };
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    let observer: IntersectionObserver | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        },
        { threshold: 0.35 },
      );
      observer.observe(video);
    }

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [src]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  return (
    <figure
      className={cn(
        "group/cell relative flex min-w-0 flex-col bg-lift outline outline-1 outline-transparent transition-[translate,outline-color] duration-300 ease-out hover:z-10 hover:-translate-y-0.5 hover:outline-white/[0.14] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {/* The chip sits in a bar above the picture so it never covers the
          footage or the readouts recorded into it. */}
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-white/[0.06] px-5 transition-[background-color,backdrop-filter] duration-300 group-hover/cell:bg-white/[0.02] group-hover/cell:backdrop-blur-md md:px-6">
        <Badge variant={kind === "simulation" ? "simulation" : "real"}>{chip}</Badge>
        <div className="flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.12em] text-faint">
          <span ref={timeRef} className="tabular-nums">
            --:--.--
          </span>
          {src ? (
            <button
              type="button"
              onClick={toggle}
              aria-label={`${playing ? "Pause" : "Play"}: ${title}`}
              className="flex size-7 items-center justify-center rounded-[2px] border border-white/[0.1] text-muted transition-colors hover:border-white/25 hover:text-ink"
            >
              {playing ? (
                <span aria-hidden className="flex gap-[3px]">
                  <span className="h-2.5 w-[2px] bg-current" />
                  <span className="h-2.5 w-[2px] bg-current" />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="ml-0.5 size-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-current"
                />
              )}
            </button>
          ) : null}
        </div>
      </div>

      {/* min-h-0 + overflow-hidden keep the frame at its aspect even when a
          clip is taller; object-contain then letterboxes it inside. */}
      <div className={cn("min-h-0 overflow-hidden bg-ground", viewport)}>
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster ?? undefined}
            muted
            loop
            playsInline
            preload="none"
            aria-label={title}
            className="size-full object-contain"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <p className="font-label text-[10px] uppercase tracking-[0.16em] text-faint">
              Original footage needed
            </p>
          </div>
        )}
      </div>

      <figcaption className="mt-auto border-t border-white/[0.06] p-5 md:p-6">
        <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</span>
        <span className="mt-2 block text-[14px] leading-[1.6] text-muted">{caption}</span>
      </figcaption>
    </figure>
  );
}
