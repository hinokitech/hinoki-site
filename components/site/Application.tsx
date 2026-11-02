import type { SiteCopy } from "@/content/site.en";
import { Section, SectionHeading } from "./Section";

export function Application({ copy }: { copy: SiteCopy["application"] }) {
  return (
    <Section id="application" index="04" label={copy.label} tone="lift">
      <SectionHeading id="application">{copy.heading}</SectionHeading>

      <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 lg:grid-cols-9">
        <div className="lg:col-span-5">
          <p className="max-w-[60ch] text-pretty text-[17px] leading-[1.7] text-muted md:text-[18px]">
            {copy.body}
          </p>

          <dl className="mt-10 border-t border-line">
            {copy.values.map((value) => (
              <div
                key={value.label}
                className="grid gap-2 border-b border-line py-5 sm:grid-cols-[176px_1fr] sm:gap-6"
              >
                <dt className="pt-1 font-label text-[11px] uppercase tracking-[0.16em] text-faint">
                  {value.label}
                </dt>
                <dd className="text-[17px] leading-[1.5] text-ink">{value.text}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-[60ch] text-[15px] leading-[1.65] text-muted">
            {copy.safetyNote}
          </p>

          <div className="mt-10">
            <p className="font-label text-[10px] uppercase tracking-[0.18em] text-faint">
              {copy.alsoSuited.label}
            </p>
            <ul className="mt-3 border-t border-line">
              {copy.alsoSuited.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-line py-3 text-[16px] leading-[1.5] text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside
          aria-labelledby="trial-title"
          className="self-start rounded-[2px] border border-line bg-panel p-7 md:p-8 lg:col-span-4"
        >
          <h3
            id="trial-title"
            className="font-display text-[22px] font-bold leading-tight tracking-[-0.02em] text-ink wdth-112"
          >
            {copy.offer.title}
          </h3>
          <dl className="mt-6">
            {copy.offer.rows.map((row) => (
              <div
                key={row.term}
                className="grid grid-cols-[88px_1fr] gap-4 border-t border-line py-4"
              >
                <dt className="pt-0.5 font-label text-[10px] uppercase tracking-[0.16em] text-faint">
                  {row.term}
                </dt>
                <dd className="text-[15px] leading-[1.55] text-ink">{row.detail}</dd>
              </div>
            ))}
          </dl>
          <a href="#contact" className="btn btn-primary mt-6 w-full">
            {copy.offer.cta}
          </a>
        </aside>
      </div>
    </Section>
  );
}
