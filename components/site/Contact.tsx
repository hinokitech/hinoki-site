import type { SiteCopy } from "@/content/site.en";
import { Chapter, ChapterLabel, step } from "./Chapter";
import { ContactForm } from "./ContactForm";
import { EmailCopy } from "./EmailCopy";
import { OfficeMap } from "./OfficeMap";
import { Reveal } from "./Reveal";

// The live site's closing chapter (grain, ember glow, centred call), with the
// rebuild's inline form in a two-pane card like the live Request Access modal.
export function Contact({ copy }: { copy: SiteCopy["contact"] }) {
  const details = [
    { term: "Email", detail: <EmailCopy email={copy.email} placeholder={copy.emailPlaceholder} /> },
    { term: "Location", detail: copy.location },
  ];

  return (
    <Chapter id="contact" glow="ember" className="film-grain overflow-hidden">
      <Reveal className="flex flex-col items-center text-center">
        <ChapterLabel index="06" label={copy.label} className="reveal justify-center" />
        <h2
          id="contact-title"
          className="reveal text-[clamp(2.75rem,8vw,6rem)] font-light leading-none tracking-[-0.04em] text-fg-primary"
        >
          {copy.heading}
        </h2>
        <p
          className="reveal mx-auto mt-8 max-w-[600px] text-pretty text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-[1.7] text-fg-secondary"
          style={step(1)}
        >
          {copy.body}
        </p>
      </Reveal>

      <Reveal className="mx-auto mt-14 max-w-[980px] md:mt-16">
        <div
          className="reveal shadow-frame grid gap-px overflow-hidden rounded-xl border border-edge bg-line md:grid-cols-[2fr_3fr]"
          style={step(2)}
        >
          <div className="flex flex-col gap-8 bg-card p-6 md:p-10">
            <dl className="flex flex-col gap-8">
              {details.map((row) => (
                <div key={row.term}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{row.term}</dt>
                  <dd className="mt-3 text-[15px] leading-[1.6] text-fg-primary">{row.detail}</dd>
                </div>
              ))}
            </dl>
            {/* The office on the map, just under the address, filling the
                space beside the form (Sal, 2026-11-05). On phones, where the
                form sits below, a short strip. */}
            <OfficeMap
              title={copy.map.title}
              coords={copy.map.coords}
              className="-mt-4 aspect-[16/10] md:aspect-auto md:min-h-[160px] md:flex-1"
            />
            {/* As on the live site: Antler's own wordmark under a quiet label,
                set apart from the contact details by a hairline. Its red reads
                on both themes. Exact-pixel copies per size and screen density,
                so the browser never resizes it (Sal, 2026-11-05: logos "a
                little blurry"). */}
            <div className="mt-auto border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-tertiary">{copy.portfolio}</p>
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet="/assets/partners/antler-32-1x.png 1x, /assets/partners/antler-32-2x.png 2x, /assets/partners/antler-32-3x.png 3x"
                  width={133}
                  height={32}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/partners/antler-28-1x.png"
                  srcSet="/assets/partners/antler-28-1x.png 1x, /assets/partners/antler-28-2x.png 2x, /assets/partners/antler-28-3x.png 3x"
                  alt="Antler"
                  width={117}
                  height={28}
                  loading="lazy"
                  decoding="async"
                  className="mt-3 h-7 w-[117px] opacity-90 md:h-8 md:w-[133px]"
                />
              </picture>
            </div>
          </div>
          <div className="bg-card p-6 md:p-10">
            <ContactForm topic={copy.topic} />
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}
