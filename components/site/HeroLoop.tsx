"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { LoopPart, LoopSources } from "./hero-loops";
import { PlayToggle } from "./MediaControls";

const PHONE = "(max-width: 767px)";

// The file this browser will play for a part, matching the <source> order.
function pickSrc(part: LoopPart, video: HTMLVideoElement) {
  if (part.mobile && window.matchMedia(PHONE).matches) return part.mobile;
  return video.canPlayType("video/webm") ? part.webm : part.mp4;
}

// The hero background. It opens on a still frame of the loop (Sal's pick,
// 2026-11-05), and nothing plays or downloads until the visitor presses play;
// the video then starts at that same frame, so the picture simply carries on.
// A loop with follow-on parts plays them in order and starts over; every part
// begins and ends on black, so the switch can't be seen. Playback pauses
// while the hero is scrolled away and resumes on return.
export function HeroLoop({
  loop,
  className,
  controlsClassName,
}: {
  loop: LoopSources;
  className?: string;
  controlsClassName?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantRef = useRef(false);
  // True while the first part plays on from the still. When it ends, the
  // worker has walked off to the right; the part then starts again from its
  // beginning, so the robot comes across him again, before the rest follows.
  const fromStillRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  // Becomes true once the video shows a frame; until then the still shows.
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const parts = [loop, ...(loop.then ?? [])];
  const part = parts[step % parts.length];
  const still = loop.still;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sync = () => setPlaying(!video.paused);
    const begin = () => setStarted(true);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("playing", begin);

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
      else if (wantRef.current && video.paused) void video.play().catch(() => {});
    });
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
      video.removeEventListener("playing", begin);
    };
  }, []);

  // A new part swaps the <source> list, which takes a reload.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || step === 0) return;
    video.load();
    void video.play().catch(() => {});
  }, [step]);

  // Once playback has begun, fetch the part after the current one so the
  // next switch starts from cache. Nothing extra loads before that.
  useEffect(() => {
    const video = videoRef.current;
    const all = [loop, ...(loop.then ?? [])];
    if (!video || !started || all.length < 2) return;
    void fetch(pickSrc(all[(step + 1) % all.length], video)).catch(() => {});
  }, [loop, step, started]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      wantRef.current = false;
      video.pause();
      return;
    }
    wantRef.current = true;
    // The first press starts where the still was taken.
    if (!started && step === 0 && still) {
      const at = window.matchMedia(PHONE).matches && still.mobileTime != null ? still.mobileTime : still.time;
      fromStillRef.current = true;
      const go = () => {
        video.currentTime = at;
        void video.play().catch(() => {});
      };
      if (video.readyState >= 1) go();
      else {
        video.addEventListener("loadedmetadata", go, { once: true });
        video.preload = "auto";
        video.load();
      }
      return;
    }
    void video.play().catch(() => {});
  };

  return (
    <>
      {still ? (
        <picture>
          {still.mobile ? <source media={PHONE} srcSet={still.mobile} /> : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* Fades out as the video fades in: on the light theme both blend
              into the paper, so the still would otherwise show through. */}
          <img
            src={still.src}
            srcSet={still.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden
            decoding="async"
            // The headline and subhead are what the page's speed is measured
            // on, so the still waits behind them (high priority cost 0.3 s).
            fetchPriority="low"
            className={cn(className, "transition-opacity duration-300", started && "opacity-0")}
          />
        </picture>
      ) : null}
      <video
        ref={videoRef}
        muted
        loop={parts.length < 2}
        playsInline
        preload="none"
        poster={still ? undefined : loop.poster}
        aria-hidden
        className={cn(className, still && "transition-opacity duration-300", still && !started && "opacity-0")}
        onEnded={(e) => {
          // The first part ends on black, so restarting it is seamless (Sal,
          // 2026-11-05: "so we come across him again").
          if (fromStillRef.current) {
            fromStillRef.current = false;
            e.currentTarget.currentTime = 0;
            void e.currentTarget.play().catch(() => {});
            return;
          }
          setStep((s) => s + 1);
        }}
      >
        {part.mobile ? <source media={PHONE} src={part.mobile} type="video/mp4" /> : null}
        <source src={part.webm} type="video/webm" />
        <source src={part.mp4} type="video/mp4" />
      </video>
      <div className={controlsClassName ?? "absolute right-[18px] top-[88px] z-10 md:right-6 md:top-6"}>
        <PlayToggle playing={playing} title="background motion" onClick={toggle} />
      </div>
    </>
  );
}
