"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import type { SiteCopy } from "@/content/site.en";
import { cn } from "@/lib/utils";
import type { TwoCameraFrame } from "./live/two-camera-engine";
import {
  answer,
  BoardSim,
  describe,
  encode,
  formatCount,
  Narrator,
  readTrack,
  stampOf,
  type Answers,
  type BoardReadout,
  type HinokiLines,
  type HinokiReading,
  type Message,
  type SceneControls,
  type TrackReadout,
} from "./live/hinoki-sim";

export type HinokiCopy = SiteCopy["hero"]["hinoki"];
export type Coordinates = "pixels" | "gps";
export type StreamView = "tokens" | "words";

export type HinokiFeed = {
  /** Null until the ball first moves: the event camera can't see a still ball. */
  track: (TrackReadout & { clock: number; lock: number | null }) | null;
  board: BoardReadout | null;
  answers: Answers | null;
  /** The model answers only while the scene changes. */
  answering: boolean;
  /** Messages to the main board, newest first: one in every 500 sent. */
  messages: Message[];
  /** Lines of meaning, newest first. */
  lines: { ts: string; text: string }[];
  /** A message read out in words, refreshed every few seconds. */
  reading: string | null;
  /** How sure it's a ball, as of the latest message shown (the box's tag). */
  sure: number | null;
};

const EMPTY: HinokiFeed = {
  track: null,
  board: null,
  answers: null,
  answering: false,
  messages: [],
  lines: [],
  reading: null,
  sure: null,
};
const TICK_MS = 100;
// The projected stream: a message every millisecond, so each tick stands for
// a hundred. Shown at a pace people can read (Sal, 2026-11-05): a new row
// every half second, and words every four seconds.
const SENT_PER_TICK = 100;
// On average every 5 ticks, but not exactly: a fixed beat close to the
// bounce's own rhythm would catch the ball at the same point every time, so
// the speeds would seem to creep up or down instead of rising and falling.
const showGap = () => 4 + Math.floor(Math.random() * 3);
const READ_EVERY_TICKS = 40;

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

type Sim = {
  board: BoardSim;
  narrator: Narrator;
  feed: HinokiFeed;
  seq: number;
  ticks: number;
  /** The tick on which the next message is shown. */
  nextShow: number;
  /** The last change of light: how big (0..1), when, and the sunlight it ended at. */
  light: { peak: number; at: number; sun: number };
};

// A change in daylight shows up as a burst of events across the scene: the
// "Did the lighting just change?" answer jumps with the size of the change
// and fades over about a second.
const LIGHT_FADE_S = 0.4;

// Runs Hinoki's side of the illustration while it's switched on: the model's
// answers and the messages to the main board ten times a second, the track
// and board readouts five times a second, and a line of meaning whenever
// there's something worth saying. Holds still while paused.
export function useHinokiFeed(o: {
  active: boolean;
  playing: boolean;
  frameRef: RefObject<TwoCameraFrame | null>;
  rateRef: RefObject<number>;
  controls: SceneControls;
  lines: HinokiLines;
  reading: HinokiReading;
}): HinokiFeed {
  const { active, playing, frameRef, rateRef } = o;
  const [feed, setFeed] = useState<HinokiFeed>(EMPTY);
  const simRef = useRef<Sim | null>(null);
  const controlsRef = useRef(o.controls);
  const linesRef = useRef(o.lines);
  const readingRef = useRef(o.reading);
  useEffect(() => {
    readingRef.current = o.reading;
  }, [o.reading]);
  const { speed, sun, hold } = o.controls;

  useEffect(() => {
    controlsRef.current = { speed, sun, hold };
  }, [speed, sun, hold]);

  useEffect(() => {
    linesRef.current = o.lines;
  }, [o.lines]);

  useEffect(() => {
    if (!active) return;
    simRef.current = {
      board: new BoardSim(),
      narrator: new Narrator(linesRef.current),
      feed: EMPTY,
      seq: 0,
      ticks: 0,
      nextShow: 0,
      light: { peak: 0, at: 0, sun: controlsRef.current.sun },
    };
    return () => {
      simRef.current = null;
      setFeed(EMPTY);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const tick = () => {
      const sim = simRef.current, f = frameRef.current;
      if (!sim || !f) return;
      const now = performance.now() / 1000;
      const rate = rateRef.current ?? 0;
      const c = controlsRef.current;
      const n = sim.narrator;
      n.update(now, f, rate, c);

      let { lines, messages, track, board, reading, sure } = sim.feed;
      const text = n.next(now, f, rate, c);
      if (text) {
        n.done(now);
        lines = [{ ts: `${f.clock.toFixed(2)} s`, text }, ...lines].slice(0, 3);
      }

      const l = sim.light;
      if (c.sun !== l.sun) {
        const left = l.peak * Math.exp(-(now - l.at) / LIGHT_FADE_S);
        l.peak = Math.min(0.98, Math.max(left, (Math.abs(c.sun - l.sun) / 0.05) * 0.98));
        l.at = now;
        l.sun = c.sun;
      }
      const light = l.peak * Math.exp(-(now - l.at) / LIGHT_FADE_S);
      const answers = n.started ? answer(f, c.sun, light) : null;
      // To the microsecond, like the events behind it.
      const stamp = stampOf(f.clock);
      const step = sim.ticks++;
      if (step % 2 === 0) {
        board = sim.board.step(rate, n.started && !f.held);
        track = n.started ? { ...readTrack(f), clock: stamp, lock: f.held ? null : 99.4 + Math.random() * 0.5 } : null;
      }
      if (answers) {
        sim.seq += SENT_PER_TICK;
        if (!messages.length || step >= sim.nextShow) {
          sim.nextShow = step + showGap();
          messages = [encode(f, readTrack(f), answers, sim.seq, stamp), ...messages].slice(0, 5);
          sure = answers.object.conf;
        }
        if (!reading || step % READ_EVERY_TICKS === 0) {
          const ln = linesRef.current;
          reading = describe(answers, f.vx >= 0 ? ln.right : ln.left, readingRef.current);
        }
      } else {
        reading = null;
        sure = null;
      }

      sim.feed = { track, board, answers, answering: n.started && !f.held, messages, lines, reading, sure };
      setFeed(sim.feed);
    };
    // One straight away, so a paused view still shows where things stand.
    const first = window.setTimeout(tick, 0);
    const id = playing ? window.setInterval(tick, TICK_MS) : 0;
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [active, playing, frameRef, rateRef]);

  return active ? feed : EMPTY;
}

const BLOCK =
  "rounded-lg border border-edge-strong bg-ground/85 px-3 py-2 font-mono text-[11px] leading-[1.75] text-fg-primary";
const TAG = "rounded border border-[#efa34a]/60 px-1.5 leading-[1.6] text-[#efa34a]";
const SEG = "rounded-md border px-2 leading-[1.6] transition-colors";
const segState = (on: boolean) =>
  on ? "border-accent bg-accent/15 text-accent" : "border-edge-strong text-fg-secondary hover:text-fg-primary";

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-3 whitespace-nowrap">
      <span className="text-fg-secondary">{label}</span>
      <span className={cn("tabular-nums", accent && "text-accent")}>{value}</span>
    </div>
  );
}

const signed = (v: number, digits: number) => `${v < 0 ? "−" : "+"}${Math.abs(v).toFixed(digits)}`;
const degrees = (v: number) => String(Math.round(v) % 360).padStart(3, "0");

export function TrackBlock({
  feed,
  coords,
  onCoords,
  copy,
  className,
  style,
}: {
  feed: HinokiFeed;
  coords: Coordinates;
  onCoords: (c: Coordinates) => void;
  copy: HinokiCopy;
  className?: string;
  style?: CSSProperties;
}) {
  const t = feed.track;
  const stopped = !t || t.lock === null;
  const latLon = t ? fill(copy.geo.pos, { lat: t.lat.toFixed(6), lon: t.lon.toFixed(6) }).split(" · ") : [];
  return (
    <div data-tour="track" className={cn(BLOCK, "pointer-events-auto", className)} style={style}>
      <div className="mb-0.5 flex items-center justify-between gap-3">
        <span>{copy.track}</span>
        <div role="group" aria-label={copy.coords} className="flex gap-1">
          {(["pixels", "gps"] as const).map((c) => (
            <button key={c} type="button" aria-pressed={coords === c} onClick={() => onCoords(c)} className={cn(SEG, segState(coords === c))}>
              {copy[c]}
            </button>
          ))}
        </div>
      </div>
      {!t ? (
        <p className="text-fg-secondary">{copy.waiting}</p>
      ) : coords === "pixels" ? (
        <div className="tabular-nums">
          <p>{fill(copy.px.pos, { x: Math.round(t.x), y: Math.round(t.y) })}</p>
          <p>{fill(copy.px.motion, { v: Math.round(t.pxSpeed).toLocaleString("en-US"), d: degrees(t.direction + 360) })}</p>
          <p className="text-fg-secondary">{fill(copy.px.time, { t: t.clock.toFixed(6) })}</p>
        </div>
      ) : (
        <div className="tabular-nums">
          {/* Latitude and longitude on a line each, so the block stays narrow. */}
          {latLon.map((part) => (
            <p key={part.slice(-1)}>{part}</p>
          ))}
          <p>{fill(copy.geo.height, { h: t.height.toFixed(1), c: signed(t.climb, 1) })}</p>
          <p>{fill(copy.geo.motion, { v: t.speed.toFixed(1), hd: stopped ? "–" : degrees(t.heading) })}</p>
          <p>{fill(copy.geo.range, { r: t.range.toFixed(1), b: degrees(t.bearing) })}</p>
          <p className="text-fg-secondary">{copy.geo.note}</p>
        </div>
      )}
    </div>
  );
}

function Spark({ values }: { values: number[] }) {
  const points = values
    .map((v, i) => `${(i * 2).toFixed(0)},${Math.max(1, Math.min(21, 20 - (v - 4) * 5.5)).toFixed(1)}`)
    .join(" ");
  return (
    <svg aria-hidden viewBox="0 0 120 22" preserveAspectRatio="none" className="my-0.5 block h-[22px] w-full">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent" />
    </svg>
  );
}

const eventsText = (n: number) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)} M/s` : `${formatCount(n)}/s`);

export function BoardBlock({
  feed,
  copy,
  className,
  style,
}: {
  feed: HinokiFeed;
  copy: HinokiCopy;
  className?: string;
  style?: CSSProperties;
}) {
  const b = feed.board, t = feed.track;
  return (
    <div data-tour="board" className={cn(BLOCK, className)} style={style}>
      <div className="mb-0.5 flex items-center justify-between gap-3">
        <span>{copy.board}</span>
        <span className={TAG}>{copy.simulated}</span>
      </div>
      <Row label={copy.latency} value={b ? `${b.latency.toFixed(3)} ms` : "–"} />
      <Row label={copy.jitter} value={b ? `±${Math.round(b.jitter)} µs` : "–"} />
      <Row label={copy.power} value={b ? `${b.power.toFixed(1)} W` : "–"} />
      <Spark values={b ? b.spark : []} />
      <Row label={copy.lock} value={!t ? "–" : t.lock === null ? copy.holding : `${t.lock.toFixed(1)}%`} accent={!!t} />
      <Row label={copy.eventsIn} value={b ? eventsText(b.events) : "–"} />
      <Row label={copy.model} value={feed.answering ? copy.answering : copy.idle} accent={feed.answering} />
    </div>
  );
}

// What goes to the vehicle's main board: compact typed tokens, one in every
// hundred shown, with the raw bytes of the latest message. Words reads the
// same answers out for people.
export function TokenStrip({
  feed,
  view,
  onView,
  copy,
  className,
}: {
  feed: HinokiFeed;
  view: StreamView;
  onView: (v: StreamView) => void;
  copy: HinokiCopy;
  className?: string;
}) {
  const s = copy.stream;
  const latest = feed.messages[0];
  return (
    <div data-tour="stream" className={cn("px-3 py-3 font-mono text-[11px] leading-[1.75] text-fg-primary md:px-4", className)}>
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <div className="flex items-center gap-2">
          <span>{s.title}</span>
          <div role="group" aria-label={s.title} className="flex gap-1">
            {(["tokens", "words"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                data-tour={v === "words" ? "words" : undefined}
                onClick={() => onView(v)}
                className={cn(SEG, segState(view === v))}
              >
                {s[v]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-fg-secondary">
          <span>{s.stats}</span>
          <span className={TAG}>{s.projected}</span>
        </div>
      </div>

      <div className="min-h-[96px]">
        {view === "tokens" ? (
          feed.messages.length ? (
            // On phones the rows wrap, so every answer stays visible; the
            // newest two show there.
            feed.messages.map((m, i) => (
              <p
                key={m.seq}
                className={cn("tabular-nums sm:truncate", i >= 2 && "hidden sm:block")}
                style={{ opacity: 1 - i * 0.17 }}
              >
                <span className="text-fg-secondary">{m.t}</span>
                {"  "}
                <span className="text-accent">{m.head}</span> {m.body}
              </p>
            ))
          ) : (
            <p className="text-fg-secondary">{s.waiting}</p>
          )
        ) : feed.reading || feed.lines.length ? (
          <>
            {/* The newest message, read out from the same answers as the
                Tokens view, then what has happened lately. */}
            {feed.reading ? (
              <div className="mb-1.5 rounded-md border border-accent/30 bg-accent/[0.07] px-2.5 py-1.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-accent">{s.reading}</p>
                <p className="font-sans text-[13px] leading-[1.5] text-fg-primary">{feed.reading}</p>
              </div>
            ) : null}
            {feed.lines.slice(0, 2).map((l, i) => (
              <p key={`${l.ts}${l.text}`} className="flex gap-3 py-0.5" style={{ opacity: 1 - i * 0.35 }}>
                <span className="shrink-0 tabular-nums text-fg-secondary">{l.ts}</span>
                <span className="font-sans text-[13px] leading-[1.5] text-fg-primary">{l.text}</span>
              </p>
            ))}
          </>
        ) : (
          <p className="text-fg-secondary">{s.waiting}</p>
        )}
      </div>

      {view === "tokens" && latest ? (
        <p className="mt-1.5 hidden break-all border-t border-line pt-1.5 tabular-nums sm:block">
          <span className="text-fg-secondary">{s.raw} </span>
          {latest.raw}
        </p>
      ) : null}

      <span className="sr-only" aria-live="polite">
        {feed.lines[0]?.text}
      </span>
    </div>
  );
}

export function HinokiSwitch({
  on,
  onChange,
  label,
  visible,
}: {
  on: boolean;
  onChange: (on: boolean) => void;
  label: string;
  visible: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      data-tour="hinoki"
      aria-checked={on}
      aria-hidden={!visible || undefined}
      tabIndex={visible ? 0 : -1}
      onClick={() => onChange(!on)}
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-full border bg-ground/85 py-1 pl-1 pr-3 text-[12px] font-medium text-fg-primary outline-none transition-[opacity,border-color] duration-300 focus-visible:ring-2 focus-visible:ring-accent",
        on ? "border-accent/60" : "border-edge-strong hover:border-accent/60",
        visible ? "pointer-events-auto" : "pointer-events-none opacity-0",
      )}
    >
      <span aria-hidden className={cn("relative h-[15px] w-[26px] rounded-full transition-colors", on ? "bg-accent" : "bg-white/20")}>
        <span
          className={cn(
            "absolute top-[2px] size-[11px] rounded-full bg-white transition-[left] duration-200",
            on ? "left-[13px]" : "left-[2px]",
          )}
        />
      </span>
      {label}
    </button>
  );
}
