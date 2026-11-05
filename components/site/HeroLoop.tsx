"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { LoopPart, LoopSources, LoopStill } from "./hero-loops";
import { afterLoad, canWarm } from "./warm";

const PHONE = "(max-width: 767px)";

// The file this browser will play for a part, matching the <source> order.
function pickSrc(part: LoopPart, video: HTMLVideoElement) {
  if (part.mobile && window.matchMedia(PHONE).matches) return part.mobile;
  return video.canPlayType("video/webm") ? part.webm : part.mp4;
}

// Where in the first part the still was taken, for this screen's file.
function stillTime(still: LoopStill) {
  return window.matchMedia(PHONE).matches && still.mobileTime != null ? still.mobileTime : still.time;
}

// The hero background. It opens on a still frame of the loop (Sal's pick,
// 2026-11-05), and nothing plays until the visitor presses play; the video
// then starts at that same frame, so the picture simply carries on. Once the
// page has loaded, the first part loads quietly and stands on that frame,
// hidden, so play starts at once (Sal: "delays on hitting play"); on Data
// Saver or a slow connection it loads on the press instead.
// A loop with follow-on parts plays them in order and starts over; every part
// begins and ends on black, so the switch can't be seen. Playback pauses
// while the hero is scrolled away and resumes on return.
//
// The button is a labelled pill ("Play video"), so people know the picture
// plays (Sal, 2026-11-05). It arrives after the hero's lines, and until the
// video has been played its disc pulses softly three times.
export function HeroLoop({
  loop,
  labels,
  className,
  controlsClassName,
}: {
  loop: LoopSources;
  labels: { play: string; pause: string };
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

  // Warm the first part: load it once the page has settled and stand it on
  // the still's frame, so the press only has to start it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !still || !canWarm()) return;
    return afterLoad(() => {
      if (video.readyState > 0 || !video.paused) return;
      const at = stillTime(still);
      video.addEventListener(
        "loadedmetadata",
        () => {
          if (video.paused) video.currentTime = at;
        },
        { once: true },
      );
      video.preload = "auto";
      video.load();
    });
  }, [still]);

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
    // The first press starts where the still was taken (a warmed video is
    // already standing there). Play is asked for right here, inside the tap,
    // never later from a loading event: phones (iPhones above all) only
    // start a video for a tap if the request comes with the tap, and a
    // deferred one could wait on data that never came (Sal, 2026-11-05:
    // "isn't playing when you press the button"). A video with nothing
    // loaded yet takes the still's time as its starting point and begins
    // there once it has loaded.
    if (!started && step === 0 && still) {
      const at = stillTime(still);
      fromStillRef.current = true;
      if (video.preload === "none") video.preload = "auto";
      if (Math.abs(video.currentTime - at) > 0.05) video.currentTime = at;
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
      <div className={controlsClassName ?? "absolute right-[18px] top-[84px] z-10 md:bottom-10 md:right-10"}>
        {/* Quiet, in the page's own ink rather than orange (Sal, 2026-11-05:
            "softer", "a little smaller"), with a mono label like the site's
            other small tags. */}
        <button
          type="button"
          onClick={toggle}
          className="hero-rise group inline-flex items-center gap-2 rounded-full border border-edge-strong bg-ground/60 py-[3px] pl-[3px] pr-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-secondary backdrop-blur-md transition-colors duration-300 hover:bg-ground/85 hover:text-fg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          // After the hero's lines and the measured results.
          style={{ "--reveal-delay": "1100ms" } as CSSProperties}
        >
          <span
            aria-hidden
            className={cn(
              "grid size-6 place-items-center rounded-full bg-fg-primary/[0.08] text-fg-primary transition-colors duration-300 group-hover:bg-fg-primary/[0.14]",
              !started && "play-ring",
            )}
          >
            {playing ? (
              <span className="flex gap-[2px]">
                <span className="h-2 w-[2px] rounded-full bg-current" />
                <span className="h-2 w-[2px] rounded-full bg-current" />
              </span>
            ) : (
              <span className="ml-[2px] size-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-current" />
            )}
          </span>
          {playing ? labels.pause : labels.play}
        </button>
      </div>
    </>
  );
}
