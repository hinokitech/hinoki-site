import Image from "next/image";
import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell, Section, SectionHeader } from "./Cell";

export function Team({ copy }: { copy: SiteCopy["team"] }) {
  return (
    <Section id="team">
      <SectionHeader id="team" index="06" label={copy.label}>
        {copy.heading}
      </SectionHeader>
      <Bento>
        {copy.people.map((person) => (
          <Cell key={person.name} className="p-6 md:col-span-2 md:p-8 lg:col-span-4">
            <p className="font-label text-[10px] uppercase tracking-[0.16em] text-faint">{person.role}</p>
            <h3 className="mt-10 font-display text-[24px] font-bold leading-[1.1] tracking-[-0.025em] text-ink wdth-112">
              {person.name}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.65] text-muted">{person.bio}</p>
          </Cell>
        ))}

        {/* Antler wordmark kept by Sal's decision (2026-11-02), shown in the
            page's off-white rather than Antler red to stay inside the palette. */}
        <Cell className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:gap-6 md:col-span-6 md:px-8 lg:col-span-12">
          <Image
            src="/assets/antler-wordmark.png"
            alt="Antler"
            width={92}
            height={22}
            className="h-[20px] w-auto opacity-85 [filter:brightness(0)_invert(0.95)]"
          />
          <p className="text-[14px] leading-[1.6] text-muted">{copy.backing}</p>
        </Cell>
      </Bento>
    </Section>
  );
}
