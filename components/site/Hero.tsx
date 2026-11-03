import { buttonVariants } from "@/components/ui/button";
import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell } from "./Cell";
import { HeroHeadline } from "./HeroHeadline";
import { HeroLoop } from "./HeroLoop";
import { LOOPS } from "./hero-loops";
import { TsukubaClock } from "./TsukubaClock";

export function Hero({ copy }: { copy: SiteCopy["hero"] }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="scroll-mt-16 pt-6 md:pt-8">
      <Bento className="lg:grid-rows-[1fr_auto_auto]">
        {/* Media viewport: real event-camera data bursting along the bottom,
            headline above it. */}
        <Cell className="overflow-hidden md:col-span-6 lg:col-span-8 lg:row-span-3">
          <div className="relative flex h-full min-h-[480px] flex-col justify-start md:min-h-[560px] lg:aspect-[16/10] lg:min-h-0">
            <HeroLoop loop={LOOPS.events} className="absolute inset-0 size-full object-cover object-bottom" />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_11_13/0.92)_15%,transparent_60%)]"
            />
            <div className="relative p-6 md:p-10">
              <p className="hero-rise font-label text-[10px] uppercase leading-5 tracking-[0.18em] text-muted md:text-[11px]">
                {copy.eyebrow}
              </p>
              <HeroHeadline
                lead={copy.headline.lead}
                accent={copy.headline.accent}
                className="mt-6 text-balance font-display text-[clamp(3rem,6.2vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-ink wdth-112 md:wdth-125"
              />
            </div>
          </div>
        </Cell>

        <Cell className="hero-rise flex flex-col gap-5 p-6 md:col-span-6 md:p-8 lg:col-span-4">
          <p className="text-pretty text-[22px] font-medium leading-[1.35] tracking-[-0.01em] text-ink md:text-[24px]">
            {copy.lede}
          </p>
          <p className="text-pretty text-[15px] leading-[1.7] text-muted">{copy.subLede}</p>
          <div className="mt-auto flex flex-wrap gap-3 pt-4">
            <a href="#contact" className={buttonVariants()}>
              {copy.primaryCta}
            </a>
            <a href="#proof" className={buttonVariants({ variant: "outline" })}>
              {copy.secondaryCta}
            </a>
          </div>
        </Cell>

        <Cell className="hero-rise p-6 md:col-span-3 md:px-8 lg:col-span-4">
          <p className="font-label text-[10px] uppercase tracking-[0.18em] text-faint">
            {copy.startingWith.label}
          </p>
          <p className="mt-3 text-[16px] leading-[1.45] text-ink">{copy.startingWith.text}</p>
        </Cell>

        {/* A real live value: local time at the lab in Tsukuba. */}
        <Cell className="hero-rise flex items-center justify-between gap-4 p-6 md:col-span-3 md:px-8 lg:col-span-4">
          <p className="flex items-center gap-2.5 font-label text-[10px] uppercase tracking-[0.18em] text-faint">
            <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
            Tsukuba · JST
          </p>
          <TsukubaClock className="font-label text-[18px] tabular-nums tracking-[0.02em] text-ink" />
        </Cell>
      </Bento>
    </section>
  );
}
