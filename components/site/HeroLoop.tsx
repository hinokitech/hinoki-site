"use client";

import { useEffect, useRef } from "react";

// The generated atmosphere loop behind the hero headline (abstract light only;
// never a stand-in for real footage). Plays silently while on screen; under
// reduced motion it stays on its poster frame.
export function HeroLoop({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      poster="/assets/epic-brand-loop-poster.jpg"
      aria-hidden
      className={className}
    >
      <source media="(max-width: 767px)" src="/assets/epic-brand-loop-720.mp4" type="video/mp4" />
      <source src="/assets/epic-brand-loop.webm" type="video/webm" />
      <source src="/assets/epic-brand-loop.mp4" type="video/mp4" />
    </video>
  );
}
