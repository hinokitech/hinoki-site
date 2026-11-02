"use client";

import { useEffect, useRef } from "react";

// Hero entrance. The headline slides a short way into place and, like an event
// camera, only its moving edges fire events: orange where brightness rises
// (leading edges), grey where it falls (trailing edges). When it stops, the
// events stop: still pixels send nothing. An illustration, not recorded data.

const TRAVEL_EM = 0.25;
const TRAVEL_MS = 1200;
const TOTAL_MS = 1800; // travel, then the supporting text settles
const DOT_MS = 250;
const MAX_EDGES = 7000;

// Review aid for re-running the entrance (also under reduced motion).
const SHOW_REPLAY =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_SHOW_REPLAY === "1";

type Edge = { x: number; y: number; on: boolean; strength: number };
type Dot = { x: number; y: number; on: boolean; born: number };

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4);

export function HeroHeadline({
  lead,
  accent,
  className,
}: {
  lead: string;
  accent: string;
  className: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const replayRef = useRef<() => void>(() => {});

  useEffect(() => {
    const wrap = wrapRef.current;
    const title = titleRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !title || !canvas || !ctx) return;

    const risers = Array.from(
      wrap.closest("section")?.querySelectorAll<HTMLElement>(".hero-rise") ?? [],
    );
    let disposed = false;
    let frame = 0;
    let last = 0;
    let elapsed = TOTAL_MS;
    let distance = 0;
    let width = 0;
    let height = 0;
    let edges: Edge[] = [];
    let dots: Dot[] = [];
    let onColor = "#e8622a";
    let offColor = "#9099a8";

    const offsetAt = (t: number) => -distance * (1 - easeOut(t / TRAVEL_MS));

    // Inline styles take over from the CSS resting state and its fallback.
    const place = (t: number) => {
      const x = offsetAt(t);
      title.style.animation = "none";
      title.style.transform = x < -0.01 ? `translateX(${x.toFixed(2)}px)` : "none";
      risers.forEach((el, i) => {
        const q = easeOut((t - TRAVEL_MS * 0.6 - i * 60) / 450);
        el.style.animation = "none";
        el.style.opacity = String(0.5 + 0.5 * q);
        el.style.transform = q < 1 ? `translateY(${(8 * (1 - q)).toFixed(2)}px)` : "none";
      });
    };

    // Redraw the headline off-screen exactly where the browser laid it out, and
    // keep the points where its strokes have strong vertical edges. Returns
    // false when the canvas can't reproduce the page's type closely enough.
    const rasterize = () => {
      title.style.transform = "none";
      const box = title.getBoundingClientRect();
      const wrapBox = wrap.getBoundingClientRect();
      const cs = getComputedStyle(title);
      distance = parseFloat(cs.fontSize) * TRAVEL_EM;
      const pad = Math.ceil(distance + 8);
      width = Math.ceil(box.width + pad * 2);
      height = Math.ceil(box.height + 16);

      canvas.style.left = `${box.left - wrapBox.left - pad}px`;
      canvas.style.top = `${box.top - wrapBox.top - 8}px`;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const raster = document.createElement("canvas");
      raster.width = width;
      raster.height = height;
      const ink = raster.getContext("2d", { willReadFrequently: true });
      if (!ink) return false;
      const wdth = /"wdth"\s+([\d.]+)/.exec(cs.fontVariationSettings)?.[1];
      const stretch =
        wdth === "125" ? "expanded" : wdth === "112.5" ? "semi-expanded" : "normal";
      ink.font = `${cs.fontWeight} ${stretch} ${cs.fontSize} ${cs.fontFamily}`;
      ink.fontStretch = stretch;
      ink.letterSpacing = cs.letterSpacing;
      ink.textBaseline = "alphabetic";
      ink.fillStyle = "#fff";

      const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        for (const match of (node.textContent ?? "").matchAll(/\S+/g)) {
          const start = match.index ?? 0;
          range.setStart(node, start);
          range.setEnd(node, start + match[0].length);
          const r = range.getBoundingClientRect();
          const m = ink.measureText(match[0]);
          if (Math.abs(m.width - r.width) > r.width * 0.03) return false;
          const ascent = m.fontBoundingBoxAscent;
          const baseline = (r.height - ascent - m.fontBoundingBoxDescent) / 2 + ascent;
          ink.fillText(match[0], r.left - box.left + pad, r.top - box.top + 8 + baseline);
        }
      }

      const alpha = ink.getImageData(0, 0, width, height).data;
      const found: Edge[] = [];
      for (let y = 1; y < height - 1; y += 2) {
        for (let x = 1; x < width - 1; x++) {
          const g = alpha[(y * width + x + 1) * 4 + 3] - alpha[(y * width + x - 1) * 4 + 3];
          // Moving right, brightness rises where alpha falls left to right.
          if (Math.abs(g) > 70) found.push({ x, y, on: g < 0, strength: Math.abs(g) / 255 });
        }
      }
      const step = Math.max(1, Math.ceil(found.length / MAX_EDGES));
      edges = found.filter((_, i) => i % step === 0);
      return true;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 40) : 0;
      last = now;
      const before = elapsed;
      elapsed = Math.min(TOTAL_MS, elapsed + dt);
      const from = offsetAt(before);
      const travel = offsetAt(elapsed) - from;
      place(elapsed);

      if (travel > 0.004) {
        for (const e of edges) {
          if (Math.random() < Math.min(0.4, travel * 0.15 * e.strength)) {
            dots.push({ x: e.x + from + Math.random() * travel, y: e.y, on: e.on, born: elapsed });
          }
        }
      }

      ctx.clearRect(0, 0, width, height);
      dots = dots.filter((d) => elapsed - d.born < DOT_MS);
      for (const d of dots) {
        ctx.globalAlpha = (1 - (elapsed - d.born) / DOT_MS) * 0.8;
        ctx.fillStyle = d.on ? onColor : offColor;
        ctx.fillRect(d.x, d.y, 1.25, 1.25);
      }
      ctx.globalAlpha = 1;

      if (elapsed < TOTAL_MS) {
        frame = requestAnimationFrame(tick);
      } else {
        title.style.willChange = "";
        ctx.clearRect(0, 0, width, height);
        dots = [];
      }
    };

    const run = () => {
      cancelAnimationFrame(frame);
      if (!rasterize()) edges = [];
      const root = getComputedStyle(document.documentElement);
      onColor = root.getPropertyValue("--color-accent").trim() || onColor;
      offColor = root.getPropertyValue("--color-muted").trim() || offColor;
      elapsed = 0;
      last = 0;
      dots = [];
      title.style.willChange = "transform";
      place(0);
      frame = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (!document.hidden && elapsed < TOTAL_MS) frame = requestAnimationFrame(tick);
    };

    document.fonts.ready.then(() => {
      if (disposed) return;
      replayRef.current = run;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const box = title.getBoundingClientRect();
      const inView = box.bottom > 0 && box.top < window.innerHeight;
      if (inView && !document.hidden) run();
      else place(TOTAL_MS);
    });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
      replayRef.current = () => {};
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <h1 ref={titleRef} id="hero-title" className={`hero-headline ${className}`}>
        {lead} <span className="text-grad">{accent}</span>
      </h1>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute" />
      {SHOW_REPLAY ? (
        <button
          type="button"
          onClick={() => replayRef.current()}
          className="fixed bottom-5 right-5 z-50 rounded-[2px] border border-line-strong bg-ground px-3 py-2 font-label text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
        >
          Replay intro
        </button>
      ) : null}
    </div>
  );
}
