import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Stagger for .reveal children, as on the live site.
export const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

const GLOWS = {
  // The soft orange bloom behind the live site's Belief chapter.
  center: "glow-center",
  // The ember rising from the bottom of the live site's closing chapter.
  ember: "glow-ember",
};

// One chapter of the page in the live site's frame: full width, a hairline
// rule on top, wide gutters, content capped at 1400px.
export function Chapter({
  id,
  glow,
  className,
  children,
}: {
  id: string;
  glow?: keyof typeof GLOWS;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative border-t border-line px-6 py-24 md:px-10 md:py-32", className)}
    >
      {glow ? <div aria-hidden className={cn("pointer-events-none absolute inset-0", GLOWS[glow])} /> : null}
      <div className="relative mx-auto max-w-[1400px]">{children}</div>
    </section>
  );
}

// "01 —— PROBLEM": orange index, a rule fading out, the chapter's name.
export function ChapterLabel({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={cn("mb-10 flex items-center gap-4 md:mb-14", className)}>
      <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{index}</span>
      <span aria-hidden className="chapter-line w-12 md:w-20" />
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">{label}</span>
    </p>
  );
}

export function ChapterTitle({
  id,
  className,
  style,
  children,
}: {
  id: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <h2
      id={`${id}-title`}
      style={style}
      className={cn(
        "text-balance text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.08] tracking-[-0.03em] text-fg-primary",
        className,
      )}
    >
      {children}
    </h2>
  );
}
