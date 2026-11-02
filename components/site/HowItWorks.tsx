import type { SiteCopy } from "@/content/site.en";
import { Section, SectionHeading } from "./Section";

export function HowItWorks({ copy }: { copy: SiteCopy["how"] }) {
  return (
    <Section id="how" index="02" label={copy.label} tone="lift">
      <SectionHeading id="how">{copy.heading}</SectionHeading>

      <div className="relative mt-16 md:mt-20">
        {/* Desktop rail from the first node's centre to the last's (4 columns,
            2rem gaps). Step 3 draws the orange in on scroll. */}
        <div
          aria-hidden
          className="absolute left-2 right-[calc(25%-2rem)] top-[7px] hidden h-0.5 bg-line-strong lg:block"
        >
          <div className="h-full w-full bg-accent" />
        </div>

        <ol className="relative grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step, i) => (
            <li key={step.step} className="min-w-0">
              <span
                aria-hidden
                className={`block size-4 rounded-full border-2 border-accent ${
                  i === copy.steps.length - 1 ? "bg-accent" : "bg-lift"
                }`}
              />
              <p className="mt-7 font-label text-[11px] uppercase tracking-[0.16em] text-faint">
                {step.step}
              </p>
              <h3 className="mt-3 font-display text-[24px] font-bold leading-[1.1] tracking-[-0.025em] text-ink wdth-112">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-16 max-w-[62ch] border-t border-line pt-8 text-[16px] leading-[1.7] text-muted md:mt-20">
        {copy.note}
      </p>
    </Section>
  );
}
