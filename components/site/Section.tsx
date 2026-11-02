import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  tone?: "ground" | "lift";
  className?: string;
  /** Decoration painted behind the content, e.g. the progress ember glow. */
  backdrop?: ReactNode;
  children: ReactNode;
};

// Every section after the hero: a narrow label rail on the left (3 of 12
// columns on desktop), content in the remaining 9.
export function Section({
  id,
  index,
  label,
  tone = "ground",
  className = "",
  backdrop,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative scroll-mt-16 border-t border-line ${
        tone === "lift" ? "bg-lift" : "bg-ground"
      } ${className}`}
    >
      {backdrop}
      <div className="site-container relative grid grid-cols-12 gap-x-6 py-24 md:py-32 lg:gap-x-8 lg:py-40">
        <div className="col-span-12 mb-12 lg:col-span-3 lg:mb-0">
          <SectionLabel index={index} label={label} />
        </div>
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <p className="flex items-center gap-3 font-label text-[11px] uppercase leading-none tracking-[0.18em]">
      <span className="tabular-nums text-faint">{index}</span>
      <span aria-hidden className="h-px w-8 bg-accent" />
      <span className="text-ink">{label}</span>
    </p>
  );
}

export function SectionHeading({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={`${id}-title`}
      className={`max-w-[22ch] text-balance font-display text-[clamp(2.25rem,4.4vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink wdth-112 ${className}`}
    >
      {children}
    </h2>
  );
}
