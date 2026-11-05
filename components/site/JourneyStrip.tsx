"use client";

import { useEffect, useRef, useState } from "react";
import { JOURNEY, isPlanned } from "@/content/journey";
import { cn } from "@/lib/utils";
import { AxisLine, COLUMNS, MonthLabels, column, random, wait } from "./JourneyAxis";

const NOW_COLUMN = column(JOURNEY.find((m) => m.tag === "NOW")?.when ?? "2026-11");

// Each milestone is a burst of about eleven dots in its month's column, mostly
// orange (brightness up) with some grey (down), so busy months look denser.
// Planned milestones are hollow, dashed dots.
function Plot({ col, h, dot, jitter }: { col: number; h: number; dot: number; jitter: number }) {
  const w = col * COLUMNS;
  const base = h - 10;
  const today = (NOW_COLUMN + 0.85) * col;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} aria-hidden className="block w-full overflow-visible">
      <AxisLine col={col} base={base} />

      <line
        x1={today}
        x2={today}
        y1={4}
        y2={base}
        stroke="var(--color-fg-secondary)"
        strokeWidth={1}
        strokeDasharray="3 3"
        vectorEffect="non-scaling-stroke"
        className="journey-fade"
        style={wait(NOW_COLUMN * 80 + 200)}
      />

      {JOURNEY.map((m, i) => {
        const rnd = random(i * 7919 + 3);
        const cx = (column(m.when) + 0.5) * col;
        const planned = isPlanned(m);
        return (
          <g key={i} className="journey-burst">
            {Array.from({ length: 11 }, (_, j) => {
              const x = cx + (rnd() + rnd() - 1) * jitter;
              const y = planned ? h * 0.3 + rnd() * h * 0.42 : h * 0.12 + rnd() * (base - h * 0.16);
              const on = rnd() < 0.74;
              const lag = column(m.when) * 80 + Math.round(rnd() * 220);
              return planned ? (
                <circle
                  key={j}
                  cx={x}
                  cy={y}
                  r={dot * 1.15}
                  fill="none"
                  stroke="var(--color-fg-tertiary)"
                  strokeWidth={dot * 0.4}
                  strokeDasharray={`${dot * 0.6} ${dot * 0.5}`}
                  style={wait(lag)}
                />
              ) : (
                <circle
                  key={j}
                  cx={x}
                  cy={y}
                  r={dot * (0.8 + rnd() * 0.45)}
                  fill={on ? "var(--color-accent)" : "var(--color-fg-tertiary)"}
                  fillOpacity={on ? 0.6 + rnd() * 0.4 : 0.75}
                  style={wait(lag)}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

// The journey as a month-by-month strip, as in the revised-copy layout. Fires
// in once when scrolled to; under reduced motion it simply appears. The list
// below carries every detail, so the strip is hidden from screen readers.
export function JourneyStrip({ caption, className }: { caption: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
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

  const nextColumn = column(JOURNEY.find(isPlanned)?.when ?? "2027-02");
  const pct = (c: number) => `${(c / COLUMNS) * 100}%`;

  return (
    <figure
      ref={ref}
      data-drawn={drawn ? "" : undefined}
      className={cn("journey shadow-frame rounded-xl border border-edge bg-card px-4 pb-5 pt-8 md:px-8 md:pb-6 md:pt-10", className)}
    >
      <div className="relative">
        <div className="hidden md:block">
          <Plot col={60} h={170} dot={2.6} jitter={13} />
        </div>
        <div className="md:hidden">
          <Plot col={20} h={120} dot={1.35} jitter={4.5} />
        </div>

        {/* Tags above the strip: today, and the planned trial. On phones
            TODAY sits left of its line, clear of NEXT. */}
        <p
          className="journey-fade absolute -top-5 -ml-1.5 -translate-x-full font-mono text-[9px] uppercase tracking-[0.16em] text-fg-primary md:-top-6 md:ml-1.5 md:translate-x-0 md:text-[10px]"
          style={{ ...wait(NOW_COLUMN * 80 + 200), left: pct(NOW_COLUMN + 0.85) }}
        >
          Today
        </p>
        <p
          className="journey-fade absolute -top-5 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.16em] text-fg-tertiary md:-top-6 md:text-[10px]"
          style={{ ...wait(nextColumn * 80 + 200), left: pct(nextColumn + 0.5) }}
        >
          Next
        </p>
      </div>

      <MonthLabels />

      <figcaption className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-fg-tertiary md:text-[10px]">
        {caption}
      </figcaption>
    </figure>
  );
}
