"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import { JOURNEY, isPlanned, whenLabel } from "@/content/journey";
import { cn } from "@/lib/utils";

type Pad = { l: number; r: number; top: number; bottom: number };
type Point = { x: number; y: number };

const NOW = JOURNEY.findIndex((m) => m.tag === "NOW");

// When each milestone's ring fills, in ms after the chart comes into view.
// A steady beat (Sal, 2026-11-05: "a steady premium professional cadence",
// then "a little bit faster" (300 to 250 ms), then the whole curve slightly
// faster again (250 to 220 ms, starting at 500 rather than 600)): the line
// travels at one even speed and fills each ring as it reaches it, BEAT apart.
// The rings appear first, in a quick wave.
const START = 500, BEAT = 220, RING_STEP = 40;
const FILL_AT = JOURNEY.map((_, i) => START + i * BEAT);

// Today comes last (Sal, 2026-11-05: "the today should be the last thing to
// load"): once the line has reached the final, planned milestone, today's
// dashed line draws up from the current one, and the tag and the pulsing dot
// rise in as it arrives. About a second, so it isn't slow.
const LAST_AT = FILL_AT[JOURNEY.length - 1];
const TODAY_LINE_AT = LAST_AT + 250, TODAY_LINE_MS = 400;
const TODAY_TAG_AT = TODAY_LINE_AT + 300;

// The chart's drawing space. Its labels clear one another from 1300 px wide
// (measured 2026-11-05: at 1200 two collide and one leaves the chart), so
// that is the narrowest it is ever drawn (`min-w-[1300px]` below).
const PLOT = { w: 1200, h: 440, pad: { l: 36, r: 180, top: 120, bottom: 80 } };

// The milestones along one rising line, evenly spaced, oldest on the left.
// Rounded to a hundredth: the server and the browser can differ in the last
// digit of Math.pow, which React reports as a mismatch.
const r2 = (v: number) => Math.round(v * 100) / 100;
function layout(w: number, h: number, pad: Pad): Point[] {
  const n = JOURNEY.length;
  return JOURNEY.map((_, i) => {
    const t = i / (n - 1);
    return {
      x: r2(pad.l + t * (w - pad.l - pad.r)),
      y: r2(h - pad.bottom - (h - pad.top - pad.bottom) * Math.pow(t, 1.5)),
    };
  });
}

const wait = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
// A stretch of line: starts as one ring fills and arrives as the next does.
const stretch = (from: number, to: number) => ({ "--d": `${from}ms`, "--len": `${to - from}ms` }) as CSSProperties;

// Styled like the homepage Progress list: a hairline with orange nodes on it,
// hollow for a plan and pulsing for now, labels in orange mono.
function Plot({
  w,
  h,
  pad,
  dot,
  stroke,
  labels,
}: {
  w: number;
  h: number;
  pad: Pad;
  dot: number;
  stroke: number;
  labels?: boolean;
}) {
  const points = layout(w, h, pad);
  const now = points[NOW];
  const tagBottom = pad.top * 0.42;
  const pct = (p: Point) => ({ left: `${(p.x / w) * 100}%`, top: `${(p.y / h) * 100}%` });
  // Ids for this plot's masks (two plots can share a page).
  const uid = useId().replace(/[^\w-]/g, "");

  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} aria-hidden className="absolute inset-0 size-full overflow-visible">
        {/* A dashed line can't draw itself with a dash offset (its dashes
            are the dash pattern), so each one is revealed through a mask
            whose solid stroke draws instead, at the line's own steady pace. */}
        <defs>
          <mask id={`today-${uid}`} maskUnits="userSpaceOnUse" x={0} y={0} width={w} height={h}>
            <line
              x1={now.x}
              y1={now.y - dot * 2}
              x2={now.x}
              y2={tagBottom}
              pathLength={1}
              stroke="#fff"
              strokeWidth={dot * 2}
              className="journey-line"
              style={stretch(TODAY_LINE_AT, TODAY_LINE_AT + TODAY_LINE_MS)}
            />
          </mask>
          {points.slice(1).map((to, k) =>
            isPlanned(JOURNEY[k + 1]) ? (
              <mask key={k} id={`plan-${uid}-${k}`} maskUnits="userSpaceOnUse" x={0} y={0} width={w} height={h}>
                <line
                  x1={points[k].x}
                  y1={points[k].y}
                  x2={to.x}
                  y2={to.y}
                  pathLength={1}
                  stroke="#fff"
                  strokeWidth={dot * 2}
                  className="journey-line"
                  style={stretch(FILL_AT[k], FILL_AT[k + 1])}
                />
              </mask>
            ) : null,
          )}
        </defs>

        {/* Today: a dashed line up from the current milestone to its tag,
            drawn last. */}
        <line
          x1={now.x}
          x2={now.x}
          y1={tagBottom}
          y2={now.y - dot * 2}
          stroke="var(--color-edge-strong)"
          strokeWidth={1}
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
          mask={`url(#today-${uid})`}
        />

        {/* The line travels from ring to ring at a steady beat; the stretch
            to a plan is dashed, like its hollow ring. */}
        {points.slice(1).map((to, k) => {
          const from = points[k];
          return isPlanned(JOURNEY[k + 1]) ? (
            <line
              key={k}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--color-edge-strong)"
              strokeWidth={stroke}
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              mask={`url(#plan-${uid}-${k})`}
            />
          ) : (
            <line
              key={k}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              pathLength={1}
              stroke="var(--color-edge-strong)"
              strokeWidth={stroke}
              vectorEffect="non-scaling-stroke"
              className="journey-line"
              style={stretch(FILL_AT[k], FILL_AT[k + 1])}
            />
          );
        })}

        {points.map((p, i) => {
          const planned = isPlanned(JOURNEY[i]);
          return (
            <g key={i}>
              {/* A soft halo as it fills, then the hollow ring, then the fill. */}
              {planned ? null : (
                <circle cx={p.x} cy={p.y} r={dot * 2.6} fill="var(--color-accent)" className="journey-halo" style={wait(FILL_AT[i])} />
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={dot}
                fill="var(--color-ground)"
                stroke="var(--color-accent)"
                strokeOpacity={0.6}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                className="journey-ring"
                style={wait(i * RING_STEP)}
              />
              {planned ? null : (
                <circle cx={p.x} cy={p.y} r={dot} fill="var(--color-accent)" className="journey-fill" style={wait(FILL_AT[i])} />
              )}
              {i === NOW ? (
                <g className="journey-later" style={wait(TODAY_TAG_AT)}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={dot}
                    fill="var(--color-accent)"
                    fillOpacity={0.7}
                    className="animate-ping motion-reduce:animate-none"
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>

      <Badge
        variant="live"
        className="journey-rise absolute -translate-x-1/2 -translate-y-full bg-ground"
        style={{ ...wait(TODAY_TAG_AT), left: `${(now.x / w) * 100}%`, top: `${(tagBottom / h) * 100}%` }}
      >
        <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
        Today
      </Badge>

      {labels
        ? points.map((p, i) => {
            const m = JOURNEY[i];
            // Alternate sides like the reference: below-right of even
            // milestones, above-left of odd ones. The current milestone's
            // label keeps clear of the today line.
            const below = i % 2 === 0;
            return (
              <div
                key={i}
                className={cn(
                  "journey-label absolute w-[128px]",
                  below ? "translate-y-4" : "-translate-x-full -translate-y-full pb-4 text-right",
                )}
                style={{
                  ...wait(FILL_AT[i] + 80),
                  ...pct(p),
                  marginLeft: below ? -10 : i === NOW ? -10 : 12,
                }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{whenLabel(m.when)}</p>
                <p className="mt-1 text-[12.5px] leading-[1.35] text-fg-primary">{m.title}</p>
              </div>
            );
          })
        : null}
    </>
  );
}

// The journey as one rising line: each milestone a node, planned ones hollow,
// today marked. Plays once when scrolled to: hollow rings, then the line
// filling them at a steady beat (see FILL_AT). The list below carries every
// detail, so the chart is hidden from screen readers.
//
// It's the same labelled chart at every width. Where the column is narrower
// than its labels need (phones, tablets, small laptops), it becomes a strip
// you swipe sideways, with soft edges where there's more to see; as the line
// draws, the strip glides along with it and comes to rest on Today (Sal,
// 2026-11-05: phones showed no labels). A touch, wheel or key hands the strip
// to the visitor at once. Like the line it follows, which draws under reduced
// motion too, it glides there as well: a steady pan, nothing bouncing.
export function JourneyChart({ caption, label, className }: { caption: string; label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Which edges have more chart beyond them (for the soft edges), and
  // whether the strip scrolls at all: only then does it take keyboard focus.
  const measure = useCallback(() => {
    const s = stripRef.current;
    if (!s) return;
    const max = s.scrollWidth - s.clientWidth;
    s.tabIndex = max > 1 ? 0 : -1;
    const start = s.scrollLeft > 2;
    const end = s.scrollLeft < max - 2;
    setEdges((e) => (e.start === start && e.end === end ? e : { start, end }));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Glide along with the line's tip, keeping it a little past the middle,
  // then ease onto Today as its tag rises.
  useEffect(() => {
    const s = stripRef.current;
    if (!drawn || !s) return;
    const max = s.scrollWidth - s.clientWidth;
    if (max <= 1) return;
    const pts = layout(PLOT.w, PLOT.h, PLOT.pad);
    const scale = s.scrollWidth / PLOT.w;
    const tipAt = (t: number) => {
      if (t <= FILL_AT[0]) return pts[0].x;
      if (t >= LAST_AT) return pts[pts.length - 1].x;
      const k = Math.min(pts.length - 2, Math.floor((t - FILL_AT[0]) / BEAT));
      return pts[k].x + (pts[k + 1].x - pts[k].x) * ((t - FILL_AT[k]) / BEAT);
    };
    const follow = (t: number) => Math.min(max, Math.max(0, tipAt(t) * scale - s.clientWidth * 0.6));
    const settleMs = TODAY_TAG_AT + 400 - LAST_AT;
    const t0 = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const t = now - t0;
      if (t < LAST_AT) s.scrollLeft = follow(t);
      else {
        const f = Math.min(1, (t - LAST_AT) / settleMs);
        const from = follow(LAST_AT);
        s.scrollLeft = from + (max - from) * (1 - Math.pow(1 - f, 3));
        if (f >= 1) return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const stop = () => cancelAnimationFrame(raf);
    const takeOver = ["pointerdown", "touchstart", "wheel", "keydown"] as const;
    for (const ev of takeOver) s.addEventListener(ev, stop, { passive: true });
    return () => {
      stop();
      for (const ev of takeOver) s.removeEventListener(ev, stop);
    };
  }, [drawn]);

  return (
    <figure ref={ref} data-drawn={drawn ? "" : undefined} className={cn("journey", className)}>
      <div className="relative">
        <div
          ref={stripRef}
          role="region"
          aria-label={label}
          onScroll={measure}
          className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div aria-hidden className="relative aspect-[1200/440] w-full min-w-[1300px]">
            <Plot w={PLOT.w} h={PLOT.h} pad={PLOT.pad} dot={5} stroke={1} labels />
          </div>
        </div>
        {/* Soft edges where there's more of the chart to swipe to. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ground to-transparent transition-opacity duration-300",
            edges.start ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ground to-transparent transition-opacity duration-300",
            edges.end ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
      <figcaption className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-tertiary">
        {caption}
      </figcaption>
    </figure>
  );
}
