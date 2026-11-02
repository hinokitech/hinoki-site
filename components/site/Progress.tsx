import type { SiteCopy } from "@/content/site.en";
import { Section, SectionHeading } from "./Section";

// The one ember glow on the page (build brief §2).
const EMBER = (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%]"
    style={{
      backgroundImage:
        "radial-gradient(ellipse 70% 70% at 50% 100%, var(--color-ember), transparent 70%)",
    }}
  />
);

export function Progress({ copy }: { copy: SiteCopy["progress"] }) {
  return (
    <Section
      id="progress"
      index="05"
      label={copy.label}
      className="overflow-hidden"
      backdrop={EMBER}
    >
      <SectionHeading id="progress">
        {copy.heading.lead} <span className="text-grad">{copy.heading.accent}</span>
      </SectionHeading>

      <ol className="mt-14 border-b border-line md:mt-20">
        {copy.milestones.map((m) => (
          <li
            key={`${m.date} ${m.text}`}
            className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line py-6 md:grid-cols-[112px_128px_1fr] md:items-baseline"
          >
            <p
              className={`flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.16em] ${
                m.current ? "text-ink" : "text-faint"
              }`}
            >
              {m.current ? (
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              ) : null}
              {m.status}
            </p>
            <p className="font-label text-[12px] tabular-nums tracking-[0.06em] text-accent">
              {m.date}
            </p>
            <p className="col-span-2 text-[16px] leading-[1.55] text-ink md:col-span-1 md:text-[17px]">
              {m.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
