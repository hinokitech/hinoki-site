import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

// The orange rule and mono label that run down the About page's left rail.
export function RailLabel({ label, labelJa }: { label: string; labelJa?: string }) {
  return (
    <div>
      <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        <span aria-hidden className="h-px w-6 bg-accent" />
        {label}
      </p>
      {labelJa ? (
        <p lang="ja" className="mt-2 pl-9 text-[12px] tracking-[0.08em] text-fg-tertiary">
          {labelJa}
        </p>
      ) : null}
    </div>
  );
}

// One section of the About page: label rail on the left, content on the
// right (stacked on phones). `wide` runs the full width below both.
export function RailSection({
  id,
  label,
  labelJa,
  first,
  wide,
  children,
}: {
  id: string;
  label: string;
  labelJa?: string;
  first?: boolean;
  wide?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative scroll-mt-16 px-6 md:px-10",
        first ? "pb-24 pt-36 md:pb-28 md:pt-44" : "border-t border-line py-24 md:py-28",
      )}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* The first section is on screen at load and holds the page's
            largest text, so it shows at once rather than waiting for scripts. */}
        <Reveal
          className={cn("grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12", first && "reveal-onload")}
        >
          <div className="reveal lg:pt-4">
            <RailLabel label={label} labelJa={labelJa} />
          </div>
          <div className="min-w-0">{children}</div>
        </Reveal>
        {wide}
      </div>
    </section>
  );
}
