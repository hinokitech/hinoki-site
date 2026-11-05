"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { SiteCopy } from "@/content/site.en";
import { cn } from "@/lib/utils";
import { step } from "./Chapter";
import { DemoTour } from "./DemoTour";
import { EventCameraView } from "./EventCameraView";
import type { StreamView } from "./HinokiHud";
import { PlayToggle } from "./MediaControls";
import { Reveal } from "./Reveal";
import { TwoCameraView, type CameraView } from "./TwoCameraView";
import { formatCount as fmt } from "./live/hinoki-sim";
import type { TwoCameraRates } from "./live/two-camera-engine";

const VIEWS: CameraView[] = ["compare", "frame", "event"];

// Where Speed and Sunlight start, and where "Show me around" brings them
// back. The tour's power-up glides Speed home over GLIDE_MS.
const START = { speed: 55, sun: 25 };
const GLIDE_MS = 700;

// One part of the explanation: a hairline, a small title, then its text.
function Part({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("mt-8 border-t border-line pt-6", className)}>
      <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-primary">{title}</h3>
      {children}
    </div>
  );
}

// A list line with a short orange rule for a bullet.
function Item({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-pretty text-[15px] leading-[1.65] text-fg-secondary">
      <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
      <span>{children}</span>
    </li>
  );
}

// The interactive event-camera illustration: one scene seen by a normal
// camera and an event camera at once, with controls for speed and sunlight.
// Every page load opens it at the designed start, paused on its first frame,
// with the tour's tip at the play button asking for play (Sal, 2026-11-05:
// "a bubble to encourage a click to begin", "designated start at least on
// refresh"). Once played, it runs whenever it's on screen and pauses when
// scrolled away (also under reduced motion, since the demo is the point).
// The button starts or stops it, and a manual pause sticks. Switching on With
// Hinoki fills the view with the event camera, for the full effect. Without
// WebGL2 it falls back to the simpler two-ball drawing, which starts by itself.
export function EventCameraPanel({ copy }: { copy: SiteCopy["hero"] }) {
  const [view, setView] = useState<CameraView>("compare");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(START.speed);
  const [sun, setSun] = useState(START.sun);
  const [hold, setHold] = useState(false);
  const [rates, setRates] = useState<TwoCameraRates | null>(null);
  const [hinoki, setHinoki] = useState(false);
  const [below, setBelow] = useState<HTMLDivElement | null>(null);
  const [fallback, setFallback] = useState(false);
  const [fallbackRate, setFallbackRate] = useState<number | null>(null);
  // What the guided tour watches, beyond the controls kept here.
  const [compareAt, setCompareAt] = useState(0.5);
  const [stream, setStream] = useState<StreamView>("tokens");
  const [replay, setReplay] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const heldRef = useRef(false);
  // On a first visit the demo waits for play (the tour asks for it).
  const waitRef = useRef(true);
  const visibleRef = useRef(false);
  // The view to go back to when With Hinoki is switched off.
  const beforeHinokiRef = useRef<CameraView>("compare");
  const fail = useCallback(() => setFallback(true), []);

  // From now on, start whenever on screen (unless paused by hand).
  const stopWaiting = useCallback(() => {
    waitRef.current = false;
    if (visibleRef.current && !heldRef.current) setPlaying(true);
  }, []);

  // The fallback drawing has no tour, so it doesn't wait.
  useEffect(() => {
    if (fallback) stopWaiting();
  }, [fallback, stopWaiting]);

  // By the power-up the tour has the ball racing; Hinoki's steps read best at
  // the base pace, so Speed glides back to where the demo starts (Sal,
  // 2026-11-05). The slider visibly travels home on an ease-out close to the
  // site's calm curve; under reduced motion it jumps. Sunlight stays put:
  // easing it down makes the event camera fire a burst over the doorway (a
  // light change is exactly what it reports), which reads as static at the
  // climax. A visitor's own slider move stops the glide.
  const glideRef = useRef(0);
  const stopGlide = () => cancelAnimationFrame(glideRef.current);
  const glideHome = (from: number) => {
    stopGlide();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSpeed(START.speed);
      return;
    }
    const t0 = performance.now();
    const frame = (now: number) => {
      const t = Math.min(1, (now - t0) / GLIDE_MS);
      const k = 1 - Math.pow(1 - t, 4);
      setSpeed(Math.round(from + (START.speed - from) * k));
      if (t < 1) glideRef.current = requestAnimationFrame(frame);
    };
    glideRef.current = requestAnimationFrame(frame);
  };
  useEffect(() => () => cancelAnimationFrame(glideRef.current), []);

  const switchHinoki = useCallback((on: boolean) => {
    setHinoki(on);
    setView((v) => {
      if (on) {
        if (v !== "event") beforeHinokiRef.current = v;
        return "event";
      }
      return beforeHinokiRef.current;
    });
  }, []);

  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    // Every visit opens at the designed start: paused until the visitor
    // presses play (the tour's tip asks for it).
    waitRef.current = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (heldRef.current) return;
        if (!entry.isIntersecting) setPlaying(false);
        else if (!waitRef.current) setPlaying(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    heldRef.current = playing;
    setPlaying(!playing);
  };

  const eventRate = fallback ? fallbackRate : rates ? rates.events : null;
  const eventLine = copy.readout.event.replace("{n}", eventRate === null ? "–" : fmt(eventRate));
  const frameLine = copy.readout.frame.replace("{n}", fmt(rates ? rates.pixels : 30 * 1280 * 720));
  const views = fallback ? VIEWS.filter((v) => v !== "compare") : VIEWS;
  const shown = fallback && view === "compare" ? "event" : view;
  const e = copy.explain;

  return (
    <section
      ref={sectionRef}
      id="event-camera"
      aria-labelledby="event-camera-title"
      className="relative border-t border-line px-6 py-24 md:px-10 md:py-32"
    >
      <Reveal className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
        <div className="reveal shadow-frame overflow-hidden rounded-xl border border-edge bg-card lg:col-span-8">
          <div className="flex min-h-14 items-center justify-between gap-3 border-b border-line px-4 py-2.5 md:px-5">
            <div role="group" aria-label="Camera view" className="flex flex-wrap gap-1.5">
              {views.map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={shown === v}
                  onClick={() => setView(v)}
                  className={cn(
                    "h-7 rounded-full border px-3 text-[11px] font-medium tracking-[0.02em] transition-all duration-300 sm:h-8 sm:px-4 sm:text-[12px]",
                    shown !== v
                      ? "border-edge text-fg-secondary hover:text-fg-primary"
                      : v === "frame"
                        ? "border-edge-strong bg-tint-strong text-fg-primary"
                        : "border-accent/40 bg-accent/10 text-accent",
                  )}
                >
                  {copy.toggle[v]}
                </button>
              ))}
            </div>
            {/* The tour's first tip points here. */}
            <span data-tour="play" className="inline-flex rounded-full">
              <PlayToggle playing={playing} title={`${copy.toggle.event} ${copy.badge.toLowerCase()}`} onClick={toggle} />
            </span>
          </div>

          {/* The view itself is a dark screen in both themes. */}
          <div ref={viewRef} data-tour="view" className="stay-dark relative aspect-[16/10] bg-[#0a0b0d]">
            {fallback ? (
              <EventCameraView
                mode={shown === "frame" ? "frame" : "event"}
                playing={playing}
                onRate={setFallbackRate}
                className="absolute inset-0 size-full"
              />
            ) : (
              <TwoCameraView
                view={shown}
                playing={playing}
                speed={speed / 100}
                sun={sun / 100}
                hold={hold}
                hinoki={hinoki}
                onHinoki={switchHinoki}
                labels={{
                  frame: copy.toggle.frame,
                  frameShort: copy.toggle.frameShort,
                  event: copy.toggle.event,
                  divider: copy.controls.divider,
                }}
                hinokiCopy={copy.hinoki}
                below={below}
                onRates={setRates}
                onFail={fail}
                onCompare={setCompareAt}
                onStream={setStream}
                className="absolute inset-0 size-full"
              />
            )}
            <p className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-edge bg-ground/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-tertiary md:bottom-4 md:left-4">
              {copy.badge}
            </p>
          </div>

          {/* Hinoki's readouts land here when the view is too small to hold them. */}
          {fallback ? null : <div ref={setBelow} />}

          {fallback ? null : (
            <div
              data-tour="sliders"
              className="grid gap-4 border-t border-line px-4 py-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center md:px-5"
            >
              <label className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-secondary">
                <span className="w-16 shrink-0">{copy.controls.speed}</span>
                <input
                  data-tour="speed"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={speed}
                  aria-label={copy.controls.speed}
                  onChange={(e) => {
                    stopGlide();
                    setSpeed(Number(e.target.value));
                  }}
                  className="h-1 w-full cursor-pointer accent-accent"
                />
              </label>
              <label className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-secondary">
                <span className="w-16 shrink-0">{copy.controls.sun}</span>
                <input
                  data-tour="sun"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={sun}
                  aria-label={copy.controls.sun}
                  onChange={(e) => {
                    stopGlide();
                    setSun(Number(e.target.value));
                  }}
                  className="h-1 w-full cursor-pointer accent-accent"
                />
              </label>
              <button
                type="button"
                data-tour="hold"
                aria-pressed={hold}
                onClick={() => setHold(!hold)}
                className={cn(
                  "h-8 rounded-full border px-4 text-[12px] font-medium tracking-[0.02em] transition-all duration-300",
                  hold ? "border-accent/40 bg-accent/10 text-accent" : "border-edge text-fg-secondary hover:text-fg-primary",
                )}
              >
                {hold ? copy.controls.release : copy.controls.hold}
              </button>
            </div>
          )}

          <div
            className={cn(
              "grid border-t border-line font-mono text-[10px] uppercase tracking-[0.16em] text-fg-secondary",
              shown === "compare" && "sm:grid-cols-2",
            )}
          >
            {shown !== "event" ? (
              <p className={cn("px-4 py-4 md:px-5", shown === "compare" && "sm:border-r sm:border-line")}>{frameLine}</p>
            ) : null}
            {shown !== "frame" ? (
              <p className={cn("px-4 py-4 text-accent md:px-5", shown === "compare" && "border-t border-line sm:border-t-0")}>
                {eventLine}
              </p>
            ) : null}
          </div>

          {hinoki && !fallback && shown !== "frame" ? (
            <p className="border-t border-line px-4 py-3 text-pretty text-[12px] leading-[1.6] text-fg-tertiary md:px-5">
              {copy.hinoki.footnote}
            </p>
          ) : null}
        </div>

        {/* Beside the interactive: what the visitor is looking at and what to
            try (only when the full interactive runs). */}
        <div className="reveal lg:col-span-4" style={step(1)}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{copy.toggle.event}</p>
          <h2
            id="event-camera-title"
            className="mt-5 text-balance text-[clamp(1.75rem,2.6vw,2.25rem)] font-light leading-[1.1] tracking-[-0.03em] text-fg-primary"
          >
            {e.heading}
          </h2>
          <p className="mt-5 text-pretty text-[15px] leading-[1.75] text-fg-secondary">{e.intro}</p>

          {fallback ? null : (
            <Part title={e.tryIt.title}>
              <ul className="space-y-2.5">
                {e.tryIt.items.map((item) => (
                  <Item key={item.action}>
                    <span className="text-fg-primary">{item.action}</span> {item.result}
                  </Item>
                ))}
              </ul>
              {/* Replays the guided tour, after it was finished or skipped. */}
              <button
                type="button"
                onClick={() => {
                  // A fresh start: the demo's controls back to how it opens.
                  beforeHinokiRef.current = "compare";
                  setView("compare");
                  stopGlide();
                  setSpeed(START.speed);
                  setSun(START.sun);
                  setHold(false);
                  setHinoki(false);
                  if (!heldRef.current) setPlaying(true);
                  viewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                  setReplay((n) => n + 1);
                }}
                className="mt-5 inline-flex items-center gap-2 text-[14px] text-accent underline decoration-accent/40 underline-offset-[6px] transition-colors duration-300 hover:decoration-accent"
              >
                {copy.tour.replay}
              </button>
            </Part>
          )}

          <p className="mt-8 text-pretty text-[12px] leading-[1.6] text-fg-tertiary">{e.note}</p>
        </div>

        {/* Below it, across the width: why event vision is hard, and how Hinoki makes it work. */}
        <div
          className="reveal grid gap-x-14 gap-y-8 border-t border-line pt-10 lg:col-span-12 lg:grid-cols-12"
          style={step(2)}
        >
          <Part title={e.hard.title} className="mt-0 border-t-0 pt-0 lg:col-span-5">
            <p className="max-w-[560px] text-pretty text-[15px] leading-[1.75] text-fg-secondary">{e.hard.text}</p>
          </Part>
          <Part title={e.how.title} className="mt-0 border-t-0 pt-0 lg:col-span-7">
            <ul className="space-y-2.5">
              {e.how.items.map((item) => (
                <Item key={item.lead}>
                  <span className="text-fg-primary">{item.lead}</span> {item.text}
                </Item>
              ))}
            </ul>
            <Link
              href={e.how.link.href}
              className="mt-5 inline-block text-[14px] text-accent underline decoration-accent/40 underline-offset-[6px] transition-colors duration-300 hover:decoration-accent"
            >
              {e.how.link.label}
            </Link>
          </Part>
        </div>
      </Reveal>

      <DemoTour
        copy={copy.tour}
        state={{ playing, compareAt, sun, speed, hold, hinoki, stream, view: shown }}
        rootRef={sectionRef}
        enabled={!fallback}
        replay={replay}
        onStart={() => {
          heldRef.current = false;
          setPlaying(true);
        }}
        onClose={stopWaiting}
        onPowerUp={() => {
          switchHinoki(true);
          setHold(false);
          glideHome(speed);
        }}
        onView={setView}
      />
    </section>
  );
}
