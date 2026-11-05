import { buttonVariants } from "@/components/ui/button";
import type { SiteCopy } from "@/content/site.en";
import { delay } from "./Chapter";
import { HeroLoop } from "./HeroLoop";
import { LOOPS } from "./hero-loops";

// The hero runs edge to edge under the fixed nav, with no frame (Sal,
// 2026-11-05). It opens on a still of the robot's-eye event view, the worker
// mid-stride, and the play button starts the video from that frame. Dark
// theme: the event view as rendered. Light theme: the same picture inverted to
// grey ink on the paper ground ("graphite"), with the text in the theme's ink.
//
// The headline and subhead show from the first paint: they are the page's
// largest text, and text that fades in from invisible only counts as painted
// once its animation has run, which held the phone score well under the
// brief's Lighthouse target. The eyebrow, trial line and buttons still rise in.
export function Hero({ copy }: { copy: SiteCopy["hero"] }) {
  const { lead, accent, tail } = copy.headline;

  return (
    <section id="top" aria-labelledby="hero-title" className="film-grain relative pb-16 max-md:pb-0 md:pb-20">
      {/* Full width, no frame. On phones the height of the screen; wider up,
          16:9 but never taller than the screen or 900 px, and taller still if
          the text needs it. Its text sits in the page's 1400 px column.
          The picture keeps its 16:9 shape and a fixed place: at most 1600 px
          wide, centred, so on wide screens it isn't blown up and cropped (Sal,
          2026-11-05: the worker's head was cut off and the dots went coarse).
          Past 1600 px its sides fade into the page, so it still has no edge. */}
      <div>
        <div className="relative flex overflow-hidden bg-ground max-md:min-h-[100svh] md:min-h-[min(56.25vw,100svh,900px)]">
          <div className="absolute inset-0 mx-auto max-w-[1600px]">
            <HeroLoop
              loop={LOOPS.pov}
              className="absolute inset-0 size-full object-cover object-bottom md:object-[50%_60%] light:mix-blend-multiply light:[filter:invert(1)_grayscale(1)_contrast(1.15)] min-[1600px]:[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
              controlsClassName="pointer-events-none absolute inset-x-0 top-[88px] z-10 mx-auto flex max-w-[1400px] justify-end px-[18px] md:top-[96px] md:px-10 [&>*]:pointer-events-auto"
            />
          </div>
          {/* Shades that keep the text readable, in the theme's ground colour. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ground/92 via-ground/50 to-ground/10 max-md:from-ground/90 max-md:via-ground/62 max-md:to-ground/20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ground/70 via-transparent to-ground/30 max-md:from-ground/82 max-md:via-ground/20"
          />

          {/* The rises are CSS animations from the first paint (.hero-rise),
              so nothing waits for scripts to appear. */}
          <div className="relative z-[1] mx-auto flex w-full max-w-[1400px] flex-col justify-center px-6 py-12 max-md:justify-start max-md:px-[18px] max-md:pb-32 max-md:pt-36 md:px-10 md:pt-24">
            <div className="max-w-[1100px]">
              <p
                className="hero-rise font-mono text-[11px] uppercase leading-[1.7] tracking-[0.24em] text-accent md:text-[13px] lg:text-[14px]"
                style={delay(0)}
              >
                {copy.eyebrow}
              </p>

              {/* Sized for a one-sentence headline: on a 390 px phone the
                  headline, subhead and both buttons fit without scrolling. */}
              <h1
                id="hero-title"
                className="mt-6 max-w-[22ch] text-balance text-[2.125rem] font-light leading-[1.04] tracking-[-0.035em] text-fg-primary sm:text-[2.75rem] md:mt-8 md:text-[clamp(2.75rem,5vw,4.75rem)]"
              >
                {lead ? <>{lead} </> : null}
                <span className="text-accent">{accent}</span> {tail}
              </h1>

              {/* On phones the buttons come before the trial line, so they
                  stay above the fold; from sm up the trial line comes first. */}
              <div className="flex flex-col">
                <p className="mt-6 max-w-[640px] text-pretty text-[16px] leading-[1.6] text-fg-primary md:mt-8 md:text-[clamp(1.0625rem,1.5vw,1.25rem)]">
                  {copy.subhead}
                </p>
                <p
                  className="hero-rise order-last mt-6 max-w-[600px] text-pretty text-[14px] leading-[1.65] text-fg-secondary sm:order-none sm:mt-4 md:text-[15px]"
                  style={delay(300)}
                >
                  {copy.trialLine}
                </p>
                <div className="hero-rise mt-6 flex flex-wrap gap-3 md:mt-8" style={delay(450)}>
                  <a href="#trial" className={buttonVariants()}>
                    {copy.primaryCta}
                  </a>
                  <a href="#proof" className={buttonVariants({ variant: "outline" })}>
                    {copy.secondaryCta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Below the hero: the measured results, in the same column as its
            text. How they were measured is stated in Proof (Sal took the note
            out of the hero, 2026-11-05). */}
        <div className="mx-auto mt-5 max-w-[1400px] px-[18px] max-md:mt-0 max-md:py-6 md:px-10">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px] leading-[1.5] text-fg-secondary">
            {copy.proofStrip.items.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i ? (
                  <span aria-hidden className="text-fg-tertiary">
                    ·
                  </span>
                ) : null}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
