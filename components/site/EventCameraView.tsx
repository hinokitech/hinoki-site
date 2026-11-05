"use client";

import { useEffect, useRef } from "react";

export type CameraMode = "event" | "frame";

type Ball = { x: number; y: number; vx: number; vy: number; r: number };

const TAU = 0.22; // seconds a drawn event stays visible
const EDGE_STEP = 2.2; // px of rim per sample
const DENSITY = 0.32; // events per px² the rim sweeps across
const NOISE_RATE = 90; // background noise events per second
const MAX_EVENTS = 24000;
const FRAME_DT = 1 / 30;

// The panel's illustration. Two bright balls cross a dark scene. As an event
// camera, only their moving rims fire: orange where brightness rises (the
// leading edge), grey where it falls (the trailing edge), plus a little sensor
// noise; a still scene sends nothing. As a normal camera, the same scene is
// drawn whole 30 times a second, smeared by each frame's exposure. `onRate`
// gets this drawing's own event rate. An illustration, not recorded data.
export function EventCameraView({
  mode,
  playing,
  onRate,
  className,
}: {
  mode: CameraMode;
  playing: boolean;
  onRate: (eventsPerSecond: number) => void;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  const playingRef = useRef(playing);
  const onRateRef = useRef(onRate);
  const sceneRef = useRef<{ start: () => void; stop: () => void; redraw: () => void } | null>(null);

  useEffect(() => {
    onRateRef.current = onRate;
  }, [onRate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let balls: Ball[] = [];
    let clock = 0; // scene time in seconds, advances only while playing
    let frameClock = 0;
    let raf = 0;
    let last = 0;
    let lastReport = 0;
    let onColor = "#e8622a";
    let offColor = "#9099a8";

    // Events as a ring buffer of plain arrays, newest at `head`.
    const ex = new Float32Array(MAX_EVENTS);
    const ey = new Float32Array(MAX_EVENTS);
    const et = new Float32Array(MAX_EVENTS);
    const eon = new Uint8Array(MAX_EVENTS);
    let head = 0;
    let stored = 0;
    // Events emitted per step, for the rate over the last second.
    let history: { t: number; n: number }[] = [];

    const emit = (x: number, y: number, on: boolean) => {
      ex[head] = x;
      ey[head] = y;
      et[head] = clock;
      eon[head] = on ? 1 : 0;
      head = (head + 1) % MAX_EVENTS;
      stored = Math.min(stored + 1, MAX_EVENTS);
    };

    const place = () => {
      balls = [
        { x: width * 0.24, y: height * 0.54, vx: width * 0.15, vy: -height * 0.02, r: height * 0.13 },
        { x: width * 0.72, y: height * 0.3, vx: -width * 0.27, vy: height * 0.035, r: height * 0.055 },
      ];
    };

    const move = (dt: number) => {
      for (const b of balls) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.vx > 0 && b.x - b.r > width) b.x = -b.r;
        if (b.vx < 0 && b.x + b.r < 0) b.x = width + b.r;
        if ((b.y - b.r < 0 && b.vy < 0) || (b.y + b.r > height && b.vy > 0)) b.vy = -b.vy;
      }
    };

    // One step of the event camera: each bit of rim fires in proportion to
    // the area it sweeps; then a little noise anywhere.
    const fire = (dt: number) => {
      let n = 0;
      for (const b of balls) {
        const samples = Math.ceil((2 * Math.PI * b.r) / EDGE_STEP);
        const phase = Math.random() * ((2 * Math.PI) / samples);
        for (let k = 0; k < samples; k++) {
          const a = phase + (2 * Math.PI * k) / samples;
          const nx = Math.cos(a);
          const ny = Math.sin(a);
          const vn = b.vx * nx + b.vy * ny;
          const expected = EDGE_STEP * Math.abs(vn) * dt * DENSITY;
          let count = Math.floor(expected + Math.random());
          while (count-- > 0) {
            const u = Math.random();
            emit(
              b.x - b.vx * dt * u + nx * b.r + (Math.random() - 0.5) * 1.2,
              b.y - b.vy * dt * u + ny * b.r + (Math.random() - 0.5) * 1.2,
              vn > 0,
            );
            n++;
          }
        }
      }
      let noise = Math.floor(NOISE_RATE * dt + Math.random());
      while (noise-- > 0) {
        emit(Math.random() * width, Math.random() * height, Math.random() < 0.5);
        n++;
      }
      history.push({ t: clock, n });
      history = history.filter((h) => clock - h.t <= 1);
    };

    // Newest first, stopping at the first event too old to show. Dots go into
    // one path per age band and polarity, so there are only eight fills.
    const drawEvents = () => {
      ctx.clearRect(0, 0, width, height);
      const paths = Array.from({ length: 8 }, () => new Path2D());
      for (let k = 1; k <= stored; k++) {
        const i = (head - k + MAX_EVENTS) % MAX_EVENTS;
        // Times are stored as 32-bit floats, so a brand-new event can read a
        // hair below zero.
        const age = Math.max(0, clock - et[i]);
        if (age >= TAU) break;
        const band = Math.min(3, Math.floor((age / TAU) * 4));
        paths[band * 2 + eon[i]].rect(ex[i] - 0.8, ey[i] - 0.8, 1.6, 1.6);
      }
      for (let band = 0; band < 4; band++) {
        ctx.globalAlpha = 0.95 - band * 0.24;
        ctx.fillStyle = onColor;
        ctx.fill(paths[band * 2 + 1]);
        ctx.fillStyle = offColor;
        ctx.fill(paths[band * 2]);
      }
      ctx.globalAlpha = 1;
    };

    // A normal camera's frame: the whole scene, each ball smeared across the
    // distance it moved during the exposure.
    const drawFrame = () => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#1a1d23";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "rgb(214 217 224 / 0.17)";
      for (const b of balls) {
        for (let s = 0; s < 8; s++) {
          ctx.beginPath();
          ctx.arc(b.x - (b.vx * FRAME_DT * s) / 7, b.y - (b.vy * FRAME_DT * s) / 7, b.r, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    };

    // Events in the last second (or in however much has run so far), to the
    // nearest hundred.
    const report = () => {
      if (!history.length) return onRateRef.current(0);
      const span = Math.min(clock - history[0].t + 1 / 60, 1);
      const total = history.reduce((sum, h) => sum + h.n, 0);
      onRateRef.current(Math.round(total / span / 100) * 100);
    };

    const step = (dt: number) => {
      clock += dt;
      move(dt);
      if (modeRef.current === "event") {
        fire(dt);
      } else {
        frameClock += dt;
      }
    };

    const redraw = () => {
      if (modeRef.current === "event") drawEvents();
      else drawFrame();
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      step(dt);
      if (modeRef.current === "event") {
        drawEvents();
        if (now - lastReport > 250) {
          lastReport = now;
          report();
        }
      } else if (frameClock >= FRAME_DT) {
        frameClock %= FRAME_DT;
        drawFrame();
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const first = !width;
      const sx = first ? 1 : box.width / width;
      const sy = first ? 1 : box.height / height;
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const style = getComputedStyle(canvas);
      onColor = style.getPropertyValue("--color-accent").trim() || onColor;
      offColor = style.getPropertyValue("--color-fg-secondary").trim() || offColor;
      if (first) {
        place();
        // A still moment to show before (or without) any motion: a quarter
        // second of the scene, drawn once.
        for (let i = 0; i < 15; i++) step(1 / 60);
        report();
      } else {
        for (const b of balls) {
          b.x *= sx;
          b.y *= sy;
          b.vx *= sx;
          b.vy *= sy;
          b.r *= sy;
        }
        for (let i = 0; i < stored; i++) {
          ex[i] *= sx;
          ey[i] *= sy;
        }
      }
      if (!raf) redraw();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    sceneRef.current = { start, stop, redraw };
    if (playingRef.current) start();

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (playingRef.current) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    playingRef.current = playing;
    if (playing) sceneRef.current?.start();
    else sceneRef.current?.stop();
  }, [playing]);

  useEffect(() => {
    modeRef.current = mode;
    sceneRef.current?.redraw();
  }, [mode]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
