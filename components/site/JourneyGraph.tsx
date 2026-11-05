"use client";

import { useEffect, useId, useRef, useState } from "react";
import { JOURNEY, isPlanned, whenLabel } from "@/content/journey";
import { cn } from "@/lib/utils";
import { AxisLine, COLUMNS, MonthLabels, column, random, wait } from "./JourneyAxis";

const N = JOURNEY.length;
const NOW = JOURNEY.findIndex((m) => m.tag === "NOW");
const STEP_MS = 80;

type Size = { col: number; h: number; core: number; spark: number; ring: number; stroke: number };

// Milestones on the month axis, rising one step each: the line climbs as fast
// as the milestones came. Several in one month sit side by side in its column.
function layout({ col, h }: Size) {
  const base = h - 10;
  const top = 26;
  const byColumn = new Map<number, number[]>();
  JOURNEY.forEach((m, i) => byColumn.set(column(m.when), [...(byColumn.get(column(m.when)) ?? []), i]));
  return {
    base,
    points: JOURNEY.map((m, i) => {
      const c = column(m.when);
      const group = byColumn.get(c)!;
      const spread = (group.indexOf(i) - (group.length - 1) / 2) * 0.3;
      return { x: (c + 0.5 + spread) * col, y: base - 14 - (i / (N - 1)) * (base - 14 - top) };
    }),
  };
}

function Plot({
  size,
  onHover,
}: {
  size: Size;
  onHover?: (i: number | null) => void;
}) {
  const fill = useId();
  const { col, h, core, spark, ring, stroke } = size;
  const w = col * COLUMNS;
  const { base, points } = layout(size);
  const done = points.slice(0, NOW + 1);
  const solid = done.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const area = `${solid} L${done[done.length - 1].x},${base} L${done[0].x},${base} Z`;
  const today = points[NOW];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} aria-hidden className="block w-full overflow-visible">
      <defs>
        <linearGradient id={fill} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <AxisLine col={col} base={base} />

      {/* Today: a dashed line down from its tag through the current milestone. */}
      <line
        x1={today.x}
        x2={today.x}
        y1={0}
        y2={base}
        stroke="var(--color-fg-secondary)"
        strokeWidth={1}
        strokeDasharray="3 3"
        vectorEffect="non-scaling-stroke"
        className="journey-fade"
        style={wait(N * STEP_MS)}
      />

      <path d={area} fill={`url(#${fill})`} className="journey-fade" style={wait(NOW * STEP_MS)} />
      <path
        d={solid}
        pathLength={1}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={stroke}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="journey-draw"
        style={{ ...wait(0), transitionDuration: `${NOW * STEP_MS}ms` }}
      />
      {/* The way to the plan, dashed. */}
      <path
        d={points
          .slice(NOW)
          .map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`)
          .join(" ")}
        fill="none"
        stroke="var(--color-accent)"
        strokeOpacity={0.6}
        strokeWidth={stroke}
        strokeDasharray="5 5"
        vectorEffect="non-scaling-stroke"
        className="journey-fade"
        style={wait(N * STEP_MS)}
      />

      {/* Each milestone: a dot with a small spark of events around it, orange
          for brightness up and grey for down. Plans are hollow and dashed. */}
      {points.map((p, i) => {
        const rnd = random(i * 4271 + 11);
        const planned = isPlanned(JOURNEY[i]);
        const turn = rnd() * Math.PI * 2;
        return (
          <g key={i} className="journey-burst">
            {i === NOW ? (
              <circle cx={p.x} cy={p.y} r={core * 2.3} fill="var(--color-accent)" fillOpacity={0.16} style={wait(i * STEP_MS)} />
            ) : null}
            {Array.from({ length: 6 }, (_, j) => {
              const a = turn + (j / 6) * Math.PI * 2;
              const d = ring * (0.85 + rnd() * 0.35);
              const x = p.x + Math.cos(a) * d;
              const y = p.y + Math.sin(a) * d;
              return planned ? (
                <circle
                  key={j}
                  cx={x}
                  cy={y}
                  r={spark * 1.2}
                  fill="none"
                  stroke="var(--color-fg-tertiary)"
                  strokeWidth={spark * 0.5}
                  style={wait(i * STEP_MS + 60)}
                />
              ) : (
                <circle
                  key={j}
                  cx={x}
                  cy={y}
                  r={spark}
                  fill={j % 3 === 2 ? "var(--color-fg-tertiary)" : "var(--color-accent)"}
                  style={wait(i * STEP_MS + 60 + j * 20)}
                />
              );
            })}
            <circle
              cx={p.x}
              cy={p.y}
              r={core}
              fill={planned ? "var(--color-card)" : "var(--color-accent)"}
              stroke={planned ? "var(--color-fg-tertiary)" : "none"}
              strokeWidth={planned ? core * 0.35 : 0}
              strokeDasharray={planned ? `${core * 0.55} ${core * 0.45}` : undefined}
              style={wait(i * STEP_MS)}
            />
            {onHover ? (
              <circle
                cx={p.x}
                cy={p.y}
                r={ring * 1.5}
                fill="transparent"
                className="cursor-default"
                onPointerEnter={() => onHover(i)}
                onPointerLeave={() => onHover(null)}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

const WIDE: Size = { col: 60, h: 250, core: 4.2, spark: 1.35, ring: 8, stroke: 2 };
const NARROW: Size = { col: 20, h: 150, core: 2.4, spark: 0.75, ring: 4.4, stroke: 1.5 };

// The journey as one rising line on the month axis, framed as in the
// revised-copy layout. Hovering a milestone names it. Draws in once when
// scrolled to; under reduced motion it simply appears. The list below carries
// every detail, so the graph is hidden from screen readers.
export function JourneyGraph({ caption, className }: { caption: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

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

  const wide = layout(WIDE);
  const w = WIDE.col * COLUMNS;
  const at = (p: { x: number; y: number }, size: Size) => ({
    left: `${(p.x / (size.col * COLUMNS)) * 100}%`,
    top: `${(p.y / size.h) * 100}%`,
  });
  const narrow = layout(NARROW);
  const planned = JOURNEY.findIndex(isPlanned);

  return (
    <figure
      ref={ref}
      data-drawn={drawn ? "" : undefined}
      className={cn("journey shadow-frame rounded-xl border border-edge bg-card px-4 pb-5 pt-12 md:px-8 md:pb-6 md:pt-14", className)}
    >
      <div className="relative hidden md:block">
        <Plot size={WIDE} onHover={setHover} />
        <p
          className="journey-fade absolute -translate-x-1/2 -translate-y-full rounded-md bg-accent-fill px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent-ink"
          style={{ ...wait(N * STEP_MS), left: `${(wide.points[NOW].x / w) * 100}%`, top: 0 }}
        >
          Today
        </p>
        <p
          className="journey-fade absolute -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-tertiary"
          style={{ ...wait(N * STEP_MS), ...at(wide.points[planned], WIDE), marginTop: -34 }}
        >
          Next
        </p>
        {hover !== null ? (
          <div
            aria-hidden
            className="pointer-events-none absolute z-10 w-max max-w-[220px] -translate-x-1/2 -translate-y-full rounded-md border border-edge bg-card px-3 py-2 shadow-frame"
            style={{ ...at(wide.points[hover], WIDE), marginTop: -16 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{whenLabel(JOURNEY[hover].when)}</p>
            <p className="mt-0.5 text-[13px] leading-[1.35] text-fg-primary">{JOURNEY[hover].title}</p>
          </div>
        ) : null}
      </div>

      <div className="relative md:hidden">
        <Plot size={NARROW} />
        <p
          className="journey-fade absolute -translate-x-1/2 -translate-y-full rounded-md bg-accent-fill px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-accent-ink"
          style={{ ...wait(N * STEP_MS), left: `${(narrow.points[NOW].x / (NARROW.col * COLUMNS)) * 100}%`, top: 0 }}
        >
          Today
        </p>
      </div>

      <MonthLabels />

      <figcaption className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-fg-tertiary md:text-[10px]">
        {caption}
      </figcaption>
    </figure>
  );
}
