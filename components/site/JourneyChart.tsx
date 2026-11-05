"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import { JOURNEY, isPlanned, whenLabel } from "@/content/journey";
import { cn } from "@/lib/utils";

type Pad = { l: number; r: number; top: number; bottom: number };
type Point = { x: number; y: number };

const NOW = JOURNEY.findIndex((m) => m.tag === "NOW");

// When each milestone's ring fills, in ms after the chart comes into view.
// A steady beat (Sal, 2026-11-05: "a steady premium professional cadence",
// then "a little bit faster", so 300 became 250): the line travels at one
// even speed and fills each ring as it reaches it, BEAT apart. The rings
// appear first, in a quick wave.
const START = 600, BEAT = 250, RING_STEP = 40;
const FILL_AT = JOURNEY.map((_, i) => START + i * BEAT);

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

  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} aria-hidden className="absolute inset-0 size-full overflow-visible">
        {/* Today: a dashed line up from the current milestone to its tag. */}
        <line
          x1={now.x}
          x2={now.x}
          y1={tagBottom}
          y2={now.y - dot * 2}
          stroke="var(--color-edge-strong)"
          strokeWidth={1}
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
          className="journey-later"
          style={wait(FILL_AT[NOW] + 300)}
        />

        {/* The line travels from ring to ring at the calendar's pace; the
            stretch to a plan is dashed and fades in instead. */}
        {points.slice(1).map((to, k) => {
          const from = points[k];
          const planned = isPlanned(JOURNEY[k + 1]);
          return (
            <line
              key={k}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              pathLength={1}
              stroke="var(--color-edge-strong)"
              strokeWidth={stroke}
              strokeDasharray={planned ? "4 4" : undefined}
              vectorEffect="non-scaling-stroke"
              className={planned ? "journey-plan" : "journey-line"}
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
                <g className="journey-later" style={wait(FILL_AT[i] + 400)}>
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
        className="journey-later absolute -translate-x-1/2 -translate-y-full bg-ground"
        style={{ ...wait(FILL_AT[NOW] + 300), left: `${(now.x / w) * 100}%`, top: `${(tagBottom / h) * 100}%` }}
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
export function JourneyChart({ caption, className }: { caption: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

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

  return (
    <figure ref={ref} data-drawn={drawn ? "" : undefined} className={cn("journey", className)}>
      {/* Wide screens: every milestone labelled. */}
      <div className="relative hidden aspect-[1200/440] lg:block">
        <Plot w={1200} h={440} pad={{ l: 36, r: 180, top: 120, bottom: 80 }} dot={5} stroke={1} labels />
      </div>
      {/* Narrower screens: the shape alone; the list below has the words. */}
      <div className="relative aspect-[360/250] lg:hidden">
        <Plot w={360} h={250} pad={{ l: 14, r: 34, top: 64, bottom: 26 }} dot={3.4} stroke={1} />
      </div>
      <figcaption className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-tertiary">
        {caption}
      </figcaption>
    </figure>
  );
}
