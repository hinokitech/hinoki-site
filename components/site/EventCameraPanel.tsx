"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { SiteCopy } from "@/content/site.en";
import { cn } from "@/lib/utils";
import { delay } from "./Chapter";
import { DemoTour, tourDone } from "./DemoTour";
import { EventCameraView } from "./EventCameraView";
import type { StreamView } from "./HinokiHud";
import { PlayToggle } from "./MediaControls";
import { Reveal } from "./Reveal";
import { TwoCameraView, type CameraView } from "./TwoCameraView";
import { formatCount as fmt } from "./live/hinoki-sim";
import type { TwoCameraRates } from "./live/two-camera-engine";

const VIEWS: CameraView[] = ["compare", "frame", "event"];

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
// On a first visit it waits on a still frame, and the guided tour's first tip
// asks for play (Sal, 2026-11-05: "a bubble to encourage a click to begin");
// once the tour has been finished or skipped, it starts by itself whenever
// it's on screen, the only thing on the page that does (also under reduced
// motion, since the demo is the point). The button starts or stops it, and a
// manual pause sticks. Switching on With Hinoki fills the view with the event
// camera, for the full effect. Without WebGL2 it falls back to the simpler
// two-ball drawing, which starts by itself.
export function EventCameraPanel({ copy }: { copy: SiteCopy["hero"] }) {
  const [view, setView] = useState<CameraView>("compare");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(55);
  const [sun, setSun] = useState(25);
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
    waitRef.current = !tourDone();
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
                  onChange={(e) => setSpeed(Number(e.target.value))}
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
                  onChange={(e) => setSun(Number(e.target.value))}
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
        <div className="reveal lg:col-span-4" style={delay(200)}>
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
                  setSpeed(55);
                  setSun(25);
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
          style={delay(300)}
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
        }}
        onView={setView}
      />
    </section>
  );
}
