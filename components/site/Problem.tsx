import type { SiteCopy } from "@/content/site.en";
import { Chapter, ChapterLabel, ChapterTitle, delay } from "./Chapter";
import { Reveal } from "./Reveal";

// Set like the live site's Belief chapter: one large light statement, the
// explanation beneath, then the four facts in its hairline outcome grid:
// stacked on phones, two by two in between, one row on wide screens.
export function Problem({ copy }: { copy: SiteCopy["problem"] }) {
  return (
    <Chapter id="problem" glow="center">
      <Reveal>
        <ChapterLabel index="01" label={copy.label} className="reveal" />
        {/* A size override drops ChapterTitle's own line height when the
            classes merge, so it's restated after the size. */}
        <ChapterTitle
          id="problem"
          className="reveal max-w-[1000px] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.08] tracking-[-0.035em]"
        >
          {copy.heading}
        </ChapterTitle>
        <p
          className="reveal mt-10 max-w-[720px] text-pretty text-[clamp(1.0625rem,1.8vw,1.3125rem)] leading-[1.75] text-fg-secondary md:mt-12"
          style={delay(200)}
        >
          {copy.body}
        </p>
      </Reveal>

      <Reveal className="stat-frame mt-16 grid gap-px overflow-hidden rounded-lg bg-line md:mt-20 md:grid-cols-2 xl:grid-cols-4">
        {copy.facts.map((fact, i) => (
          <div
            key={fact.tag}
            className="reveal group bg-card p-8 transition-colors duration-500 hover:bg-raise md:p-10"
            style={delay(i * 100 + 80)}
          >
            {/* Each tag with one line on what it means. */}
            <div className="border-t border-accent/70 pt-5">
              {/* A touch smaller in the row of four, so "~100,000 lux" keeps to one line. */}
              <p className="font-mono text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em] text-accent xl:text-[clamp(1.5rem,2.3vw,2.25rem)]">
                {fact.tag}
              </p>
              <p className="mt-6 max-w-[360px] text-pretty text-[16px] leading-[1.6] text-fg-primary">{fact.text}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </Chapter>
  );
}
