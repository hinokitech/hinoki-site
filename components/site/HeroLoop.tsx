"use client";

import { useEffect, useRef, useState } from "react";
import { PlayToggle } from "./MediaControls";

// The generated atmosphere loop behind the hero headline (abstract light only;
// never a stand-in for real footage). Plays silently while on screen. Under
// reduced motion it waits on its poster frame; the button starts or stops it
// either way, and a manual pause sticks.
export function HeroLoop({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heldRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sync = () => setPlaying(!video.paused);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);

    let observer: IntersectionObserver | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !heldRef.current) void video.play().catch(() => {});
        else if (!entry.isIntersecting) video.pause();
      });
      observer.observe(video);
    }

    return () => {
      observer?.disconnect();
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    heldRef.current = !video.paused;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  return (
    <>
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
      <div className="absolute right-4 top-4 z-10 md:right-6 md:top-6">
        <PlayToggle playing={playing} title="background motion" onClick={toggle} />
      </div>
    </>
  );
}
