import Image from "next/image";
import type { SiteCopy } from "@/content/site.en";
import { Section, SectionHeading } from "./Section";

export function Team({ copy }: { copy: SiteCopy["team"] }) {
  return (
    <Section id="team" index="06" label={copy.label}>
      <SectionHeading id="team">{copy.heading}</SectionHeading>

      <ul className="mt-14 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-3">
        {copy.people.map((person) => (
          <li key={person.name} className="border-t border-line pt-6">
            <p className="font-label text-[10px] uppercase tracking-[0.16em] text-faint">
              {person.role}
            </p>
            <h3 className="mt-4 font-display text-[24px] font-bold leading-[1.1] tracking-[-0.025em] text-ink wdth-112">
              {person.name}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-muted">{person.bio}</p>
          </li>
        ))}
      </ul>

      {/* Antler wordmark kept by Sal's decision (2026-11-02), shown in the
          page's off-white rather than Antler red to stay inside the palette. */}
      <div className="mt-16 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:gap-6">
        <Image
          src="/assets/antler-wordmark.png"
          alt="Antler"
          width={92}
          height={22}
          className="h-[22px] w-auto opacity-85 [filter:brightness(0)_invert(0.95)]"
        />
        <p className="text-[15px] leading-[1.6] text-muted">{copy.backing}</p>
      </div>
    </Section>
  );
}
