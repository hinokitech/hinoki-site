// What Hinoki's output would look like for the two-camera scene: the track in
// sensor pixels or map coordinates, a forecast of the next bounce, a board
// readout, the messages to the main board and the lines of meaning. Track
// figures and lines are worked out from the scene as it runs; the board
// figures are simulated projections, not measurements. An illustration of
// planned output, not Hinoki's system running.

import { LAYOUT, type TwoCameraFrame } from "./two-camera-engine";

const SENSOR_W = 1280, SENSOR_H = 720;

/** Scene scale: the dock door is taken as 3 m tall. */
export const METRES = 3 / (LAYOUT.doorY1 - LAYOUT.doorY0);

/** The ball's size, rounded to 5 cm. */
export const BALL_CM = Math.round((2 * LAYOUT.ballR * METRES * 100) / 5) * 5;

// An example camera spot near Tsukuba, looking north at the bay from 12 m
// away and 4 m up.
const SPOT = { lat: 36.082, lon: 140.111, north: 12, height: 4 };
const M_PER_DEG = 111_320;

/** Counts to two significant figures, so a readout holds still enough to read. */
export function formatCount(n: number) {
  if (n < 1) return "0";
  const p = Math.pow(10, Math.max(0, Math.floor(Math.log10(n)) - 1));
  const r = Math.round(n / p) * p;
  return r >= 1e6 ? `${(r / 1e6).toLocaleString("en-US")} million` : r.toLocaleString("en-US");
}

export type TrackReadout = {
  /** Sensor pixels, y down; speed in px/s and direction in degrees, up positive. */
  x: number;
  y: number;
  pxSpeed: number;
  direction: number;
  /** Map position, height of the ball's centre above the floor, and motion in m/s. */
  lat: number;
  lon: number;
  height: number;
  climb: number;
  speed: number;
  heading: number;
  range: number;
  bearing: number;
};

export function readTrack(f: TwoCameraFrame): TrackReadout {
  const vxp = (f.vx / f.aspect) * SENSOR_W, vyp = f.vy * SENSOR_H;
  const east = (f.x - f.aspect / 2) * METRES;
  const height = (f.y - LAYOUT.ground) * METRES;
  const vxm = f.vx * METRES, vzm = f.vy * METRES;
  return {
    x: (f.x / f.aspect) * SENSOR_W,
    y: (1 - f.y) * SENSOR_H,
    pxSpeed: Math.hypot(vxp, vyp),
    direction: (Math.atan2(vyp, vxp) * 180) / Math.PI,
    lat: SPOT.lat + SPOT.north / M_PER_DEG,
    lon: SPOT.lon + east / (M_PER_DEG * Math.cos((SPOT.lat * Math.PI) / 180)),
    height,
    climb: vzm,
    speed: Math.hypot(vxm, vzm),
    heading: vxm >= 0 ? 90 : 270,
    range: Math.hypot(SPOT.north, east, height - SPOT.height),
    bearing: ((Math.atan2(east, SPOT.north) * 180) / Math.PI + 360) % 360,
  };
}

export type Forecast = { t: number; points: { x: number; y: number }[] };

/** The path to the next floor contact, in scene units, and how long until it. */
export function forecast(f: TwoCameraFrame, steps = 28): Forecast | null {
  if (f.held || f.rate <= 0) return null;
  let contact = (Math.floor(f.phase / Math.PI) + 1) * Math.PI;
  if ((contact - f.phase) / f.rate < 0.06) contact += Math.PI;
  const t = (contact - f.phase) / f.rate;
  const lo = LAYOUT.ballR + LAYOUT.margin, hi = f.aspect - LAYOUT.ballR - LAYOUT.margin, w = hi - lo;
  // The ball turns back at either side.
  const fold = (x: number) => {
    let u = (x - lo) % (2 * w);
    if (u < 0) u += 2 * w;
    return lo + (u > w ? 2 * w - u : u);
  };
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const tau = (t * i) / steps;
    points.push({
      x: fold(f.x + f.vx * tau),
      y: LAYOUT.ground + LAYOUT.ballR + LAYOUT.bounce * Math.abs(Math.sin(f.phase + f.rate * tau)),
    });
  }
  return { t, points };
}

const wobble = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

export type BoardReadout = {
  /** ms */
  latency: number;
  /** µs, half the spread of the last few latencies */
  jitter: number;
  /** W */
  power: number;
  /** recent power, oldest first */
  spark: number[];
  /** events in, per second */
  events: number;
};

// The board readout, simulated from projections: about 0.1 ms, steady to a
// few µs, rising slightly with load; about 4.5 W for tracking, and about 2 W
// more while the model is answering, which it does only while the scene
// changes.
export class BoardSim {
  // Seeded with a few readings, so jitter isn't a flat ±0 the moment it starts.
  private latencies: number[] = Array.from({ length: 8 }, () => 0.098 + wobble() * 0.003);
  private history: number[] = [];
  private power = 4.4;

  step(events: number, answering: boolean): BoardReadout {
    const load = Math.min(1, events / 2e6);
    const latency = 0.098 + load * 0.004 + wobble() * 0.003;
    this.latencies.push(latency);
    if (this.latencies.length > 25) this.latencies.shift();
    const jitter = ((Math.max(...this.latencies) - Math.min(...this.latencies)) / 2) * 1000;
    const target = 4.25 + load * 0.3 + (answering ? 2 : 0);
    this.power += (target - this.power) * 0.35 + wobble() * 0.02;
    this.history.push(this.power);
    if (this.history.length > 60) this.history.shift();
    return { latency, jitter, power: this.power, spark: this.history.slice(), events };
  }
}

export type HinokiLines = {
  start: string;
  waiting: string;
  rhythm: string;
  door: string;
  speed: string;
  sun: string;
  hold: string;
  release: string;
  lamps: string;
  summary: string;
  left: string;
  right: string;
};

export type SceneControls = { speed: number; sun: number; hold: boolean };

// The model's answers: a fixed set of typed questions, answered in one pass
// with calibrated confidences. Each answer goes to the main board as two
// bytes: the answer (a choice, or 1/0 for yes/no) and how sure the model is
// of it. Only what an event camera can actually tell: it sees changes, not
// how bright things are, so there's no glare level, but it does see the
// burst when the light changes, and the strong contrast at the ball's edges
// against the bright door.
//
// Audit (Sal, 2026-11-05) so the readout holds up to a close look: yes/no
// answers say YES or NO with the confidence in that answer (it used to print
// the chance of "yes", so a still ball read "MOV 01"); speed is the ball's
// actual speed this moment, so it rises and falls through every bounce (it
// used to be the steady sideways speed); and confidences move a little from
// one pass to the next, as a real model's do.
export type Answer = { code: number; token: string; conf: number };
export type YesNo = { yes: boolean; conf: number };
export type Answers = {
  /** What is track 01? (choice) */
  object: Answer;
  /** Is it moving? Is it bouncing right now? Is it backlit by the door? (yes/no) */
  moving: YesNo;
  bounce: YesNo;
  backlit: YesNo;
  /** How fast is it right now? (choice of four bands) */
  speed: Answer;
  /** Where is it? (choice) */
  zone: Answer;
  /** Did the lighting just change? (yes/no) */
  light: YesNo;
  /** The tracker's measured speed this moment, m/s, carried in the message as velocity. */
  mps: number;
};

type Level = { token: string; below: number };
const SPEEDS: Level[] = [
  { token: "SLOW", below: 2 },
  { token: "MEDIUM", below: 4.5 },
  { token: "FAST", below: 7 },
  { token: "VERY FAST", below: Infinity },
];

/** A yes/no answer from the chance of "yes": the answer, and how sure. */
const yn = (p: number): YesNo => ({ yes: p >= 0.5, conf: Math.min(0.99, p >= 0.5 ? p : 1 - p) });

/** A little pass-to-pass movement in a confidence. */
const jiggle = (p: number, by = 0.012) => Math.min(0.99, Math.max(0.5, p + (Math.random() - 0.5) * 2 * by));
const ZONES = ["LEFT", "DOOR", "RIGHT"];

// Confidence falls toward a boundary between two levels and is highest in
// the middle of one, as a calibrated model's would.
function level(levels: Level[], v: number, soft: number, offset = 0): Answer {
  const i = Math.max(0, levels.findIndex((l) => v < l.below));
  const lo = i > 0 ? levels[i - 1].below : -Infinity, hi = levels[i].below;
  const edge = Math.min(v - lo, hi - v);
  return { code: i + offset, token: levels[i].token, conf: 0.55 + 0.4 * Math.min(1, edge / soft) };
}

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * The model's answers for this moment. `sun` is the slider's 0..1; `light`
 * is how recently and how much the light changed, 0..1, from the burst.
 */
export function answer(f: TwoCameraFrame, sun: number, light: number): Answers {
  const share = f.x / f.aspect;
  const zone = share < LAYOUT.doorX0 ? 0 : share <= LAYOUT.doorX1 ? 1 : 2;
  const edge = Math.min(Math.abs(share - LAYOUT.doorX0), Math.abs(share - LAYOUT.doorX1));
  const sinceBounce = f.rate > 0 ? (f.phase % Math.PI) / f.rate : Infinity;
  // Speed through the air, not just across the bay: fastest at each bounce,
  // slowest at the top of the arc.
  const mps = f.held ? 0 : Math.hypot(f.vx, f.vy) * METRES;
  const band = level(SPEEDS, mps, 1, 1);
  // How sure it's a ball isn't fixed (Sal, 2026-11-05: "should it always be
  // a solid 97%?"): it eases off a little at the highest speeds, and dips
  // while a change of light floods the scene with events, then recovers.
  const sure = 0.968 - 0.025 * smooth(9, 16, mps) - 0.08 * Math.min(1, light);
  return {
    object: { code: 1, token: "BALL", conf: jiggle(sure, 0.01) },
    moving: yn(f.held ? jiggle(0.015, 0.005) : jiggle(0.985, 0.006)),
    bounce: yn(f.held ? 0.03 : Math.min(0.97, Math.exp(-sinceBounce / 0.12) + 0.03)),
    backlit: yn(zone === 1 && !f.held ? 0.03 + 0.92 * smooth(0.35, 0.85, sun) : 0.04),
    speed: f.held ? { code: 0, token: "STILL", conf: jiggle(0.97) } : { ...band, conf: jiggle(band.conf) },
    zone: { code: zone, token: ZONES[zone], conf: jiggle(0.6 + 0.37 * Math.min(1, edge / 0.04)) },
    light: yn(Math.max(0.02, Math.min(0.97, light))),
    mps,
  };
}

export type HinokiReading = {
  still: string;
  moving: string;
  bounce: string;
  backlit: string;
  light: string;
  levels: Record<string, string>;
  zones: Record<string, string>;
};

/** The newest message read out in plain words, from the same answers. */
export function describe(a: Answers, dir: string, w: HinokiReading): string {
  const values = {
    c: pct(a.object.conf),
    dir,
    v: a.mps.toFixed(1),
    level: w.levels[a.speed.token] ?? "",
    zone: w.zones[a.zone.token] ?? "",
  };
  if (!a.moving.yes) return fill(w.still, values);
  return [
    fill(w.moving, values),
    a.bounce.yes ? w.bounce : "",
    a.backlit.yes ? w.backlit : "",
    a.light.yes ? w.light : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Message time in seconds to the microsecond: the newest event behind it
 * lands anywhere in the last 0.1 ms of the scene's clock.
 */
export const stampOf = (clock: number) => clock - Math.random() * 0.0000999;

export type Message = { seq: number; t: string; head: string; body: string; raw: string };

const pct = (p: number) => Math.round(Math.max(0, Math.min(0.99, p)) * 100);

// CRC-16/CCITT-FALSE over the message, as a real link would check it.
function crc16(bytes: number[]) {
  let crc = 0xffff;
  for (const b of bytes) {
    crc ^= b << 8;
    for (let k = 0; k < 8; k++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc;
}

/**
 * One 32-byte message to the main board, decoded for display. An example
 * layout: type, track, time in µs, position and velocity in sensor pixels,
 * seven answers of two bytes each (the answer, then the confidence in it, in
 * percent), a sequence number and a CRC. Each part reads as the question,
 * the answer and how sure, so "MOVING YES 99%" is "moving: yes, 99% sure".
 */
export function encode(f: TwoCameraFrame, r: TrackReadout, a: Answers, seq: number, stamp = f.clock): Message {
  const u16 = (v: number) => [(v >> 8) & 0xff, v & 0xff];
  const i16 = (v: number) => u16(Math.max(-32768, Math.min(32767, Math.round(v))) & 0xffff);
  const us = Math.round(stamp * 1e6) >>> 0;
  const vxp = (f.vx / f.aspect) * SENSOR_W, vyp = -f.vy * SENSOR_H;
  const bit = (y: YesNo) => (y.yes ? 1 : 0);
  const bytes = [
    0x01, 0x01,
    (us >>> 24) & 0xff, (us >>> 16) & 0xff, (us >>> 8) & 0xff, us & 0xff,
    ...u16(Math.round(r.x)), ...u16(Math.round(r.y)), ...i16(vxp), ...i16(vyp),
    a.object.code, pct(a.object.conf),
    bit(a.moving), pct(a.moving.conf),
    bit(a.bounce), pct(a.bounce.conf),
    bit(a.backlit), pct(a.backlit.conf),
    a.speed.code, pct(a.speed.conf),
    a.zone.code, pct(a.zone.conf),
    bit(a.light), pct(a.light.conf),
    ...u16(seq & 0xffff),
  ];
  bytes.push(...u16(crc16(bytes)));
  const yes = (key: string, y: YesNo, on = "YES", off = "NO") => `${key} ${y.yes ? on : off} ${pct(y.conf)}%`;
  return {
    seq,
    t: (us / 1e6).toFixed(6),
    head: "T01",
    body: [
      // The tracker's speed from the velocity bytes, then the model's answers.
      `${a.mps.toFixed(1)} m/s`,
      `${a.object.token} ${pct(a.object.conf)}%`,
      yes("MOVING", a.moving),
      `SPEED ${a.speed.token} ${pct(a.speed.conf)}%`,
      yes("BOUNCE", a.bounce),
      `ZONE ${a.zone.token} ${pct(a.zone.conf)}%`,
      yes("BACKLIT", a.backlit),
      yes("LIGHT", a.light, "CHANGED", "STEADY"),
    ].join(" · "),
    raw: bytes.map((b) => b.toString(16).toUpperCase().padStart(2, "0")).join(" "),
  };
}

type Cue = "waiting" | "start" | "hold" | "release" | "speed" | "sun";

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

// Decides what to say and when. Lines caused by the visitor (moving a slider,
// holding the ball) come first, a moment after the change, so the figures
// they quote have settled. Otherwise it waits at least 2 s between lines,
// and longer between the background ones, so every line can be read.
export class Narrator {
  started = false;
  private cues = new Map<Cue, number>();
  private said = new Set<string>();
  private lastEnd = -Infinity;
  private startedAt = 0;
  private lastDoor = -Infinity;
  private lastRhythm = -Infinity;
  private lastSummary = 0;
  private prev: SceneControls | null = null;
  private lastTotal = 0;
  /** Events/s in the last count with no daylight change pending. */
  private calmRate = 0;
  private sunBase = 0;
  private sunExcess = 0;
  private history: { t: number; bounces: number; doors: number; speed: number }[] = [];

  constructor(private lines: HinokiLines) {}

  /** Feed it the scene about ten times a second. `rate` is events/s. */
  update(now: number, f: TwoCameraFrame, rate: number, c: SceneControls) {
    if (!this.prev) {
      this.prev = { ...c };
      this.lastTotal = f.events;
      this.calmRate = rate;
      if (f.held) this.cues.set("waiting", now);
    }
    if (!this.started && !f.held) {
      this.started = true;
      this.startedAt = now;
      this.lastSummary = now;
      // The first bounce line comes about 5 s in, then every 10 s.
      this.lastRhythm = now - 5;
      this.cues.delete("waiting");
      this.cues.set("start", now + 0.3);
    }
    if (c.speed !== this.prev.speed && this.started && !c.hold) this.cues.set("speed", now + 0.6);
    // The burst is what a count holds above the calm rate from before the
    // change. That rate comes from earlier counts, since the count that
    // holds the burst can land before the change is noticed here.
    if (c.sun !== this.prev.sun) {
      if (!this.cues.has("sun")) {
        this.sunBase = this.calmRate;
        this.sunExcess = 0;
      }
      this.cues.set("sun", now + 1);
    }
    if (c.hold !== this.prev.hold && this.started) {
      if (c.hold) {
        this.cues.set("hold", now + 1.1);
        this.cues.delete("release");
        this.cues.delete("speed");
      } else {
        this.cues.set("release", now + 0.3);
        this.cues.delete("hold");
      }
    }
    this.prev = { ...c };

    // A new count came in (the engine counts every 0.5 s).
    if (f.events !== this.lastTotal) {
      const counted = f.events - this.lastTotal;
      this.lastTotal = f.events;
      if (this.cues.has("sun")) this.sunExcess += Math.max(0, counted - this.sunBase * 0.5);
      else this.calmRate = counted / 0.5;
    }

    this.history.push({ t: now, bounces: f.bounces, doors: f.doorEntries, speed: Math.hypot(f.vx, f.vy) * METRES });
    while (this.history.length > 1 && now - this.history[0].t > 20) this.history.shift();
  }

  /** The next line, or null for now. Call once the last line has finished. */
  next(now: number, f: TwoCameraFrame, rate: number, c: SceneControls): string | null {
    const gap = now - this.lastEnd;
    for (const cue of ["hold", "release", "speed", "sun", "start", "waiting"] as Cue[]) {
      const ready = this.cues.get(cue);
      if (ready === undefined || now < ready || gap < 0.4) continue;
      this.cues.delete(cue);
      const text = this.cue(cue, f, rate);
      if (text) return text;
    }
    if (!this.started || f.held || gap < 2) return null;

    const inDoor = f.x >= f.aspect * LAYOUT.doorX0 && f.x <= f.aspect * LAYOUT.doorX1;
    if (inDoor && c.sun >= 0.55 && now - this.lastDoor >= 12) {
      this.lastDoor = now;
      return this.lines.door;
    }
    if (gap < 5) return null;
    if (!this.said.has("lamps") && now - this.startedAt >= 12) {
      this.said.add("lamps");
      return this.lines.lamps;
    }
    if (now - this.lastSummary >= 20 && this.history.length > 1) {
      this.lastSummary = now;
      return this.summary();
    }
    if (now - this.lastRhythm >= 10) {
      this.lastRhythm = now;
      return this.rhythm(f);
    }
    return null;
  }

  /** The last line has finished. */
  done(now: number) {
    this.lastEnd = now;
  }

  private across(f: TwoCameraFrame) {
    return Math.abs(f.vx) * METRES;
  }

  private cue(cue: Cue, f: TwoCameraFrame, rate: number) {
    const way = f.vx >= 0 ? this.lines.right : this.lines.left;
    switch (cue) {
      case "waiting":
        return this.started ? null : this.lines.waiting;
      case "start":
        // No speed here: it changes through every bounce, and the newest
        // message, read out in words, carries it.
        return f.held ? null : fill(this.lines.start, { size: BALL_CM, dir: way });
      case "hold":
        return fill(this.lines.hold, { n: formatCount(rate) });
      case "release":
        return f.held ? null : fill(this.lines.release, { dir: way });
      case "speed": {
        if (f.held) return null;
        const v = this.across(f);
        return fill(this.lines.speed, { speed: v.toFixed(1), gap: Math.round((v / 30) * 100) });
      }
      case "sun":
        return fill(this.lines.sun, { n: formatCount(this.sunExcess) });
      default:
        return null;
    }
  }

  private rhythm(f: TwoCameraFrame) {
    const next = forecast(f);
    if (!next) return null;
    return fill(this.lines.rhythm, {
      rate: (f.rate / Math.PI).toFixed(1),
      t: next.t.toFixed(2),
      d: (this.across(f) * next.t).toFixed(1),
    });
  }

  private summary() {
    const first = this.history[0], last = this.history[this.history.length - 1];
    return fill(this.lines.summary, {
      s: Math.round(last.t - first.t),
      b: last.bounces - first.bounces,
      d: last.doors - first.doors,
      v: Math.max(...this.history.map((h) => h.speed)).toFixed(1),
    });
  }
}
