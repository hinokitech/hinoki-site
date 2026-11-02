import type { SiteCopy } from "@/content/site.en";
import { ContactForm } from "./ContactForm";
import { EmailCopy } from "./EmailCopy";
import { Section } from "./Section";

export function Contact({ copy }: { copy: SiteCopy["contact"] }) {
  return (
    <Section id="contact" index="07" label={copy.label} tone="lift">
      <h2
        id="contact-title"
        className="font-display text-[clamp(3rem,7vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-ink wdth-125"
      >
        {copy.heading}
      </h2>

      <div className="mt-12 grid gap-x-8 gap-y-16 md:mt-16 lg:grid-cols-9">
        <div className="lg:col-span-5">
          <p className="max-w-[52ch] text-pretty text-[17px] leading-[1.7] text-muted md:text-[18px]">
            {copy.body}
          </p>

          <dl className="mt-10 border-t border-line">
            <div className="grid gap-2 border-b border-line py-5 sm:grid-cols-[112px_1fr] sm:items-center sm:gap-6">
              <dt className="font-label text-[10px] uppercase tracking-[0.16em] text-faint">
                Email
              </dt>
              <dd>
                <EmailCopy email={copy.email} />
              </dd>
            </div>
            <div className="grid gap-2 border-b border-line py-5 sm:grid-cols-[112px_1fr] sm:gap-6">
              <dt className="pt-1 font-label text-[10px] uppercase tracking-[0.16em] text-faint">
                Location
              </dt>
              <dd className="text-[16px] leading-[1.5] text-ink">{copy.location}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-4">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
