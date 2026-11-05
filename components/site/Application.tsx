import { buttonVariants } from "@/components/ui/button";
import type { SiteCopy } from "@/content/site.en";
import { Chapter, ChapterLabel, ChapterTitle, delay } from "./Chapter";
import { Reveal } from "./Reveal";
import { SimCompare } from "./SimCompare";

// Sim 1A (without Hinoki) and Sim 1B (with Hinoki), cut to the same span of
// simulation time so the toggle can swap them mid-play. Marker times are the
// frames where each run's own overlay changes (measured, 30 fps), labelled
// with the overlay's own words.
const BLIND_CORNER_DURATION = 638 / 30;
const BLIND_CORNER = {
  baseline: {
    src: "/media/blind-corner-baseline.mp4",
    poster: "/media/blind-corner-baseline-poster.jpg",
    markers: [
      { at: 314 / 30, label: "STO" },
      { at: 566 / 30, label: "Impact" },
    ],
  },
  hinoki: {
    src: "/media/blind-corner-hinoki.mp4",
    poster: "/media/blind-corner-hinoki-poster.jpg",
    markers: [
      { at: 299 / 30, label: "STO" },
      // Was "Safe stop" (Sal, 2026-11-05).
      { at: 555 / 30, label: "Stop signal · simulation" },
    ],
  },
};

// The section the nav calls Trial.
export function Application({ copy }: { copy: SiteCopy["application"] }) {
  return (
    <Chapter id="trial">
      <Reveal>
        <ChapterLabel index="04" label={copy.label} className="reveal" />
        <ChapterTitle id="trial" className="reveal max-w-[820px]">
          {copy.heading}
        </ChapterTitle>
      </Reveal>

      <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="reveal max-w-[62ch] text-pretty text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-[1.75] text-fg-secondary">
            {copy.body}
          </p>

          <dl className="reveal mt-10 border-t border-line" style={delay(120)}>
            {copy.values.map((value) => (
              <div
                key={value.label}
                className="grid gap-2 border-b border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <dt className="pt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{value.label}</dt>
                <dd className="text-[17px] leading-[1.5] text-fg-primary">{value.text}</dd>
              </div>
            ))}
          </dl>

          <p
            className="reveal mt-8 max-w-[52ch] text-pretty text-[clamp(1.125rem,1.7vw,1.3125rem)] leading-[1.5] tracking-[-0.01em] text-fg-primary"
            style={delay(180)}
          >
            {copy.bridge}
          </p>
          <p className="reveal mt-4 max-w-[62ch] text-[14px] leading-[1.7] text-fg-tertiary" style={delay(220)}>
            {copy.safetyNote}
          </p>

          <div className="reveal mt-12" style={delay(280)}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">
              {copy.alsoSuited.label}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {copy.alsoSuited.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] leading-[1.5] text-fg-primary">
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* The trial offer as one framed card with its own glow, and the
            gap it fills just above it. */}
        <Reveal className="lg:col-span-5">
          <p
            className="reveal mb-6 max-w-[40ch] text-pretty text-[clamp(1.125rem,1.7vw,1.3125rem)] leading-[1.5] tracking-[-0.01em] text-fg-primary"
            style={delay(100)}
          >
            {copy.stopLogs}
          </p>
          <div
            className="reveal shadow-frame relative overflow-hidden rounded-xl border border-edge bg-lift p-8 md:p-10"
            style={delay(150)}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,color-mix(in_srgb,var(--color-logo-mid)_12%,transparent),transparent)]"
            />
            <h3 className="relative text-[clamp(1.5rem,2.4vw,2rem)] font-light leading-[1.15] tracking-[-0.025em] text-fg-primary">
              {copy.offer.title}
            </h3>
            <dl className="relative mt-8 border-t border-line">
              {copy.offer.rows.map((row) => (
                <div
                  key={row.term}
                  className="grid gap-1.5 border-b border-line py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-5"
                >
                  <dt className="pt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{row.term}</dt>
                  <dd className="text-[15px] leading-[1.6] text-fg-primary">{row.detail}</dd>
                </div>
              ))}
            </dl>
            <a href="#contact" className={buttonVariants({ className: "relative mt-10" })}>
              {copy.offer.cta}
            </a>
          </div>
        </Reveal>
      </div>

      {/* The blind-corner simulation, full width below the trial panel. */}
      <Reveal className="mt-10 md:mt-14">
        <SimCompare
          chip={copy.simulation.chip}
          note={copy.simulation.note}
          title={copy.simulation.title}
          caption={copy.simulation.caption}
          labels={copy.compare}
          runs={BLIND_CORNER}
          duration={BLIND_CORNER_DURATION}
          className="reveal"
        />
      </Reveal>
    </Chapter>
  );
}
