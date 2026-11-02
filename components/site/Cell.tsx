import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

// The bento grid: compartments sit 1px apart on a hairline-coloured ground,
// so every boundary is the same ultra-thin translucent line.
export function Bento({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px border border-white/[0.06] bg-white/[0.06] md:grid-cols-6 lg:grid-cols-12",
        className,
      )}
      {...props}
    />
  );
}

// One compartment. On hover it lifts 2px and gains a brighter outline.
export function Cell({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/cell relative min-w-0 bg-lift outline outline-1 outline-transparent transition-[translate,outline-color,background-color] duration-300 ease-out hover:z-10 hover:-translate-y-0.5 hover:bg-[#101217] hover:outline-white/[0.14] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}

// The mono label bar along the top of a compartment. On hover it frosts over
// whatever sits behind it.
export function CellBar({
  children,
  aside,
  className,
}: {
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-12 items-center justify-between gap-4 border-b border-white/[0.06] px-5 font-label text-[10px] uppercase tracking-[0.16em] text-faint transition-[color,background-color,backdrop-filter] duration-300 group-hover/cell:bg-white/[0.02] group-hover/cell:text-muted group-hover/cell:backdrop-blur-md md:px-6",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">{children}</div>
      {aside ? <div className="flex shrink-0 items-center gap-3">{aside}</div> : null}
    </div>
  );
}

// "01 —— PROBLEM": index, short orange rule, section name.
export function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <p className="flex items-center gap-3 font-label text-[11px] uppercase leading-none tracking-[0.18em]">
      <span className="tabular-nums text-faint">{index}</span>
      <span aria-hidden className="h-px w-6 bg-accent" />
      <span className="text-ink">{label}</span>
    </p>
  );
}

export function SectionHeader({
  id,
  index,
  label,
  className,
  children,
}: {
  id: string;
  index: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <header className={cn("flex flex-col gap-6 pb-8 md:pb-10", className)}>
      <SectionTag index={index} label={label} />
      <h2
        id={`${id}-title`}
        className="max-w-[24ch] text-balance font-display text-[clamp(2rem,3.6vw,3.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink wdth-112"
      >
        {children}
      </h2>
    </header>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("mt-24 scroll-mt-20 md:mt-32", className)}
    >
      {children}
    </section>
  );
}
