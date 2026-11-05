"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExpandButton, PlayToggle, VideoLightbox, stamp } from "./MediaControls";
import { useNear } from "./useNear";

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

// The live site's video frame: rounded, hairline border, a faint orange glow.
export const FIGURE =
  "shadow-frame relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-edge bg-card transition-[border-color] duration-500 hover:border-edge-strong";

export const BAR = "flex min-h-14 items-center justify-between gap-3 border-b border-line px-4 md:px-5";

export const CAPTION = "mt-auto border-t border-line p-5 md:p-6";

// The picture area: a dark screen in both themes.
export const SCREEN = "stay-dark relative min-h-0 overflow-hidden bg-[#0a0b0d]";

// A demo clip in a framed player. The timecode is the video's own playback
// position, not invented data. Muted loops play only while on screen and never
// on their own under reduced motion; the buttons always work.
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
  const [expanded, setExpanded] = useState<number | null>(null);
  // The poster loads only as the player nears the screen (the clip itself
  // already waits, with preload "none").
  const near = useNear(videoRef);

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

    // Plays only when pressed: on this page only the interactive demo starts
    // by itself (Sal, 2026-11-05). A playing clip pauses when scrolled away.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
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

  const expand = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setExpanded(video.currentTime);
  };

  return (
    <figure className={cn(FIGURE, className)}>
      {/* The chip sits in a bar above the picture so it never covers the
          footage or the readouts recorded into it. */}
      <div className={BAR}>
        <Badge variant={kind === "simulation" ? "simulation" : "real"}>{chip}</Badge>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-tertiary">
          <span ref={timeRef} className="mr-1 tabular-nums">
            --:--.--
          </span>
          {src ? (
            <>
              <PlayToggle playing={playing} title={title} onClick={toggle} />
              <ExpandButton title={title} onClick={expand} />
            </>
          ) : null}
        </div>
      </div>

      {/* min-h-0 + overflow-hidden keep the frame at its aspect even when a
          clip is taller; object-contain then letterboxes it inside. */}
      <div className={cn(SCREEN, viewport)}>
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={near && poster ? poster : undefined}
            muted
            loop
            playsInline
            preload="none"
            aria-label={title}
            className="size-full object-contain"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-tertiary">
              Original footage needed
            </p>
          </div>
        )}
      </div>

      <figcaption className={CAPTION}>
        <span className="block text-[17px] font-medium tracking-[-0.01em] text-fg-primary">{title}</span>
        <span className="mt-1.5 block text-[14px] leading-[1.65] text-fg-secondary">{caption}</span>
      </figcaption>

      {src ? (
        <VideoLightbox
          open={expanded !== null}
          src={src}
          title={title}
          startAt={expanded ?? 0}
          onClose={() => setExpanded(null)}
        />
      ) : null}
    </figure>
  );
}
