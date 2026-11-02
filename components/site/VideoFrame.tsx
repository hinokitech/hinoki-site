"use client";

import { useEffect, useRef } from "react";

type VideoFrameProps = {
  kind: string;
  chip: string;
  title: string;
  caption: string;
  src: string | null;
  poster: string | null;
  className?: string;
};

export function VideoFrame({
  kind,
  chip,
  title,
  caption,
  src,
  poster,
  className = "",
}: VideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Muted loops play only while on screen, and never under reduced motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const simulation = kind === "simulation";

  return (
    <figure className={className}>
      {/* The chip sits in a bar above the picture so it never covers the
          footage or the readouts recorded into it. */}
      <div className="overflow-hidden rounded-[2px] border border-line bg-panel">
        <div className="flex h-10 items-center border-b border-line px-3 md:px-4">
          <span
            className={`rounded-[2px] border px-2 py-1 font-label text-[10px] uppercase leading-none tracking-[0.14em] ${
              simulation ? "border-dashed border-faint text-muted" : "border-accent/50 text-accent"
            }`}
          >
            {chip}
          </span>
        </div>
        <div className="aspect-video">
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
              className="size-full bg-black object-contain"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <p className="font-label text-[10px] uppercase tracking-[0.16em] text-faint">
                Original footage needed
              </p>
            </div>
          )}
        </div>
      </div>

      <figcaption className="mt-5">
        <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">
          {title}
        </span>
        <span className="mt-2 block max-w-[60ch] text-[15px] leading-[1.6] text-muted">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
