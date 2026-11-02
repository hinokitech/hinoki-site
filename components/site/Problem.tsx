import type { SiteCopy } from "@/content/site.en";
import { Section, SectionHeading } from "./Section";

export function Problem({ copy }: { copy: SiteCopy["problem"] }) {
  return (
    <Section id="problem" index="01" label={copy.label}>
      <SectionHeading id="problem">{copy.heading}</SectionHeading>
      <p className="mt-8 max-w-[62ch] text-pretty text-[17px] leading-[1.7] text-muted md:text-[18px]">
        {copy.body}
      </p>

      <ul className="mt-16 grid border-y border-line md:mt-20 md:grid-cols-3">
        {copy.facts.map((fact, i) => (
          <li
            key={fact.tag}
            className={`py-8 md:py-10 md:pr-8 ${
              i > 0 ? "border-t border-line md:border-l md:border-t-0 md:pl-8" : ""
            }`}
          >
            <p className="font-label text-[22px] leading-none tracking-[-0.02em] text-ink lg:text-[26px]">
              {fact.tag}
            </p>
            <h3 className="mt-6 text-[16px] font-semibold text-ink">{fact.title}</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-muted">{fact.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
