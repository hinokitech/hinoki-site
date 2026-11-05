import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { JourneyChart } from "@/components/site/JourneyChart";
import { JourneyGraph } from "@/components/site/JourneyGraph";
import { JourneyList } from "@/components/site/JourneyList";
import { JourneyStrip } from "@/components/site/JourneyStrip";
import { JourneyTimeline } from "@/components/site/JourneyTimeline";
import { RailSection } from "@/components/site/RailSection";
import { Reveal } from "@/components/site/Reveal";
import { aboutCopy } from "@/content/about.en";
import { siteCopy } from "@/content/site.en";

export const metadata: Metadata = {
  title: aboutCopy.meta.title,
  description: aboutCopy.meta.description,
};

const BODY = "reveal max-w-[680px] text-pretty text-[17px] leading-[1.75] text-fg-secondary";
const TITLE = "reveal text-balance font-light leading-[1.06] tracking-[-0.035em] text-fg-primary";

// Looks for the journey, for Sal to compare (2026-11-04). Default: the rising
// curve after his reference screenshots, over the revised-copy layout's list.
// Also: ?timeline=graph (the curve redrawn on the month axis),
// ?timeline=strip (the layout's month strip), ?timeline=rising (the
// screenshot curve with its own diamond list).
export default async function About({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { about, journey, company, closing } = aboutCopy;
  const timeline = (await searchParams).timeline;
  const rising = timeline === "rising";

  return (
    <>
      <Header nav={siteCopy.nav} current="/about" />
      <main>
        <RailSection id="about" label={about.label} first>
          <h1 id="about-title" className={`${TITLE} max-w-[18ch] text-[clamp(2.5rem,5.5vw,4.25rem)]`}>
            {about.heading}
          </h1>
          <div className="mt-10 flex flex-col gap-6 md:mt-12">
            {about.before.map((p) => (
              <p key={p.slice(0, 24)} className={BODY}>
                {p}
              </p>
            ))}
            {/* The pull line, larger, between two hairlines. */}
            <p className="reveal max-w-[680px] border-y border-line py-6 text-[clamp(1.25rem,2.2vw,1.5rem)] leading-[1.4] tracking-[-0.01em] text-fg-primary">
              {about.pull}
            </p>
            {about.after.map((p) => (
              <p key={p.slice(0, 24)} className={BODY}>
                {p}
              </p>
            ))}
          </div>
        </RailSection>

        <RailSection
          id="journey"
          label={journey.label}
          wide={
            rising ? (
              <>
                <JourneyChart caption={journey.caption} className="mt-14 md:mt-16" />
                <Reveal>
                  <JourneyList />
                </Reveal>
              </>
            ) : (
              <>
                {timeline === "strip" ? (
                  <JourneyStrip caption={journey.stripCaption} className="mt-14 md:mt-16" />
                ) : timeline === "graph" ? (
                  <JourneyGraph caption={journey.caption} className="mt-14 md:mt-16" />
                ) : (
                  <JourneyChart caption={journey.caption} className="mt-14 md:mt-16" />
                )}
                <Reveal>
                  <JourneyTimeline />
                </Reveal>
              </>
            )
          }
        >
          <h2 id="journey-title" className={`${TITLE} max-w-[22ch] text-[clamp(2rem,4.4vw,3.5rem)]`}>
            {journey.heading}
          </h2>
          <p className="reveal mt-6 max-w-[58ch] text-pretty text-[15px] leading-[1.7] text-fg-secondary">
            {journey.sub}
          </p>
        </RailSection>

        <RailSection id="company" label={company.label} labelJa={company.labelJa}>
          <h2 id="company-title" className={`${TITLE} text-[clamp(2rem,4vw,3rem)]`}>
            {company.heading}
          </h2>
          <dl className="reveal mt-10 max-w-[760px] border-t border-line">
            {company.rows.map((row) => (
              <div
                key={row.term}
                className="grid gap-1.5 border-b border-line py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <dt className="pt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{row.term}</dt>
                <dd className="text-[15px] leading-[1.6] text-fg-primary">{row.detail}</dd>
              </div>
            ))}
            {/* Partners, then Programs, by logo: each at its own height so they
                read the same size, and at full strength, since the programs'
                rules say their colours must not be altered. A logo without a
                file shows its name. */}
            {company.logoRows.map((group) => (
              <div key={group.term} className="grid gap-3 border-b border-line py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="pt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{group.term}</dt>
                <dd>
                  <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
                    {group.items.map((p) => (
                      <li key={p.name} className="flex h-10 items-center">
                        {p.logo ? (
                          <>
                            {/* The dark theme's file first; a logo with a
                                separate light-theme file swaps to it there. */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.logoOnDark ?? p.logo}
                              alt={p.name}
                              width={p.width}
                              height={p.height}
                              loading="lazy"
                              decoding="async"
                              style={{ height: p.h ?? 24 }}
                              className={`${p.logoOnDark ? "light:hidden " : ""}w-auto`}
                            />
                            {p.logoOnDark ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={p.logo}
                                alt={p.name}
                                width={p.width}
                                height={p.height}
                                loading="lazy"
                                decoding="async"
                                style={{ height: p.h ?? 24 }}
                                className="hidden w-auto light:block"
                              />
                            ) : null}
                          </>
                        ) : (
                          <span className="text-[14px] font-medium tracking-[-0.005em] text-fg-secondary">{p.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>

          {/* A small map of the office. Google's embed can't be themed, so on
              the dark theme it is inverted and its hues turned back, and on
              the light theme it is softened toward the paper. It loads only
              when scrolled near. */}
          <figure className="reveal mt-8 max-w-[760px]">
            <div className="aspect-[4/3] overflow-hidden rounded-lg border border-edge bg-raise sm:aspect-[16/7]">
              <iframe
                title={company.map.title}
                src={`https://www.google.com/maps?q=${company.map.coords}&z=15&hl=en&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block size-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.75)_contrast(0.9)] light:[filter:grayscale(0.35)_contrast(0.95)]"
              />
            </div>
            <figcaption className="mt-3 text-[13px]">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${company.map.coords}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-tertiary underline-offset-4 transition-colors duration-300 hover:text-accent hover:underline"
              >
                {company.map.link} ↗
              </a>
            </figcaption>
          </figure>
        </RailSection>

        {/* The closing call, with both ways to the contact form. */}
        <section aria-labelledby="closing-title" className="border-t border-line px-6 py-16 md:px-10 md:py-20">
          <Reveal className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="reveal">
              <h2 id="closing-title" className="text-[clamp(2rem,4vw,2.75rem)] font-light leading-[1.1] tracking-[-0.03em] text-fg-primary">
                {closing.heading}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-fg-secondary">{closing.body}</p>
            </div>
            <div className="reveal flex flex-wrap gap-3 [--reveal-delay:120ms]">
              <Link href="/#contact" className={buttonVariants()}>
                {closing.trial}
              </Link>
              <Link href="/#contact" className={buttonVariants({ variant: "outline" })}>
                {closing.contact}
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer nav={siteCopy.nav} small={siteCopy.footer} />
    </>
  );
}
