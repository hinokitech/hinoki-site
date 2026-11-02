import type { SiteCopy } from "@/content/site.en";
import { EventCameraPanel } from "./EventCameraPanel";
import { HeroHeadline } from "./HeroHeadline";

export function Hero({ copy }: { copy: SiteCopy["hero"] }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative scroll-mt-16">
      <div className="site-container pb-24 pt-10 md:pb-32 md:pt-14">
        <p className="hero-rise border-b border-line pb-4 font-label text-[10px] uppercase leading-5 tracking-[0.2em] text-muted md:text-[11px]">
          {copy.eyebrow}
        </p>

        <HeroHeadline
          lead={copy.headline.lead}
          accent={copy.headline.accent}
          className="mt-10 text-balance font-display text-[clamp(3.6rem,10vw,10.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-ink wdth-112 md:mt-14 md:wdth-125"
        />

        <div className="hero-rise mt-14 grid grid-cols-12 gap-x-6 gap-y-16 border-t border-line-strong pt-10 md:mt-20 lg:gap-x-8 lg:pt-12">
          <div className="col-span-12 flex flex-col lg:col-span-4">
            <p className="text-pretty text-[22px] font-medium leading-[1.35] tracking-[-0.01em] text-ink md:text-[26px]">
              {copy.lede}
            </p>
            <p className="mt-6 text-pretty text-[16px] leading-[1.65] text-muted md:text-[17px]">
              {copy.subLede}
            </p>

            <div className="mt-10">
              <p className="font-label text-[10px] uppercase tracking-[0.18em] text-faint">
                {copy.startingWith.label}
              </p>
              <p className="mt-3 border-t border-line pt-3 text-[16px] text-ink">
                {copy.startingWith.text}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-primary">
                {copy.primaryCta}
              </a>
              <a href="#proof" className="btn btn-secondary">
                {copy.secondaryCta}
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <EventCameraPanel
              toggle={copy.toggle}
              readout={copy.readout}
              caption={copy.caption}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
