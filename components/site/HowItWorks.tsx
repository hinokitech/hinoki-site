import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell, Section, SectionHeader } from "./Cell";

export function HowItWorks({ copy }: { copy: SiteCopy["how"] }) {
  return (
    <Section id="how">
      <SectionHeader id="how" index="02" label={copy.label}>
        {copy.heading}
      </SectionHeader>
      <Bento>
        {copy.steps.map((step, i) => (
          <Cell key={step.step} className="p-6 md:col-span-3 md:p-8 lg:col-span-3">
            <p className="font-label text-[10px] uppercase tracking-[0.16em] text-faint">
              {step.step}
            </p>
            {/* Each compartment's rule runs edge to edge, so across the row
                they read as one line with a node per stage. */}
            <div aria-hidden className="relative -mx-6 my-8 h-px bg-white/[0.12] md:-mx-8">
              <span
                className={`absolute left-6 top-1/2 size-2.5 -translate-y-1/2 rounded-full border border-accent md:left-8 ${
                  i === copy.steps.length - 1
                    ? "bg-accent shadow-[0_0_12px_rgb(232_98_42/0.6)]"
                    : "bg-lift"
                }`}
              />
            </div>
            <h3 className="font-display text-[22px] font-bold leading-[1.1] tracking-[-0.025em] text-ink wdth-112">
              {step.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-muted">{step.text}</p>
          </Cell>
        ))}
        <Cell className="px-6 py-5 md:col-span-6 md:px-8 lg:col-span-12">
          <p className="max-w-[80ch] text-[14px] leading-[1.7] text-muted">{copy.note}</p>
        </Cell>
      </Bento>
    </Section>
  );
}
