import type { CSSProperties } from "react";

// The About page's month axis: from the founding month to the end of the
// planned quarter, one column per month. Shared by the journey charts.
const FIRST = { year: 2025, month: 12 };
export const COLUMNS = 16;
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Column of a "YYYY-MM" month, or the middle month of a "YYYY-Qn" quarter.
export function column(when: string) {
  const [year, part] = when.split("-");
  const month = part.startsWith("Q") ? (Number(part.slice(1)) - 1) * 3 + 2 : Number(part);
  return (Number(year) - FIRST.year) * 12 + (month - FIRST.month);
}

const LABELS = Array.from({ length: COLUMNS }, (_, i) => {
  const m = (FIRST.month - 1 + i) % 12;
  const year = FIRST.year + Math.floor((FIRST.month - 1 + i) / 12);
  // Years go under the first month shown and under each January.
  return { month: MONTHS[m], year: i === 0 || m === 0 ? String(year) : "" };
});

// Small seeded random numbers, so server and browser draw the same dots.
export function random(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const wait = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Baseline and a tick under each month, in a chart's own SVG units.
export function AxisLine({ col, base }: { col: number; base: number }) {
  return (
    <>
      <line
        x1={0}
        x2={col * COLUMNS}
        y1={base}
        y2={base}
        stroke="var(--color-edge-strong)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      {LABELS.map((_, i) => (
        <line
          key={i}
          x1={(i + 0.5) * col}
          x2={(i + 0.5) * col}
          y1={base}
          y2={base + 5}
          stroke="var(--color-edge-strong)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </>
  );
}

// Month names under the axis, years beneath in orange. Phones get single
// letters and two-digit years, where the columns are narrow.
export function MonthLabels() {
  return (
    <div aria-hidden className="mt-2 grid grid-cols-16 text-center font-mono uppercase">
      {LABELS.map((l, i) => (
        <div key={i} className="min-w-0">
          <p className="text-[9px] tracking-[0.04em] text-fg-tertiary md:text-[10px] md:tracking-[0.14em]">
            <span className="md:hidden">{l.month[0]}</span>
            <span className="hidden md:inline">{l.month}</span>
          </p>
          <p className="mt-1 h-3 text-[9px] tracking-[0.04em] text-accent md:text-[10px] md:tracking-[0.14em]">
            <span className="md:hidden">{l.year ? `’${l.year.slice(2)}` : ""}</span>
            <span className="hidden md:inline">{l.year}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
