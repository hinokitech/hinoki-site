import React from "react";

import { Slide, Eyebrow, SlideFooter } from "./slides";

const TIMELINE_STEPS = [
  {
    period: "Mo 0–6",
    title: "Build",
    outcome: "Rig live · benchmarks · IP filed",
  },
  {
    period: "Mo 6–9",
    title: "PoC",
    outcome: "First paid PoC · $250K",
  },
  {
    period: "Mo 9–12",
    title: "Integration Revenue",
    outcome: "$500K plus 1–2% royalties per unit",
  },
  {
    period: "Mo 12+",
    title: "Seed",
    outcome: "Raise on measured traction + revenue",
  },
] as const;

const EXPANSION_INDUSTRIES = [
  "Humanoids",
  "Industrial systems",
  "Social robotics / AMRs",
  "Defense UAVs / swarms",
  "PGMs / guided munitions",
  "EV active suspension",
  "Assistive exoskeletons",
  "Bionic prosthetics",
] as const;

function TimelineStep({
  period,
  title,
  outcome,
  showArrow,
}: (typeof TIMELINE_STEPS)[number] & { showArrow: boolean }) {
  return (
    <>
      <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-border/80 bg-bg-subtle/70 px-5 py-5">
        <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-accent">
          {period}
        </p>
        <h3 className="mt-2.5 text-[34px] font-semibold leading-[1.12] tracking-[-0.02em] text-fg-primary">
          {title}
        </h3>
        <p className="mt-3 text-[19px] leading-[1.5] text-fg-secondary">
          {outcome}
        </p>
      </div>
      {showArrow ? (
        <div
          className="flex shrink-0 items-center px-4 font-mono text-[24px] font-light text-accent/35"
          aria-hidden
        >
          →
        </div>
      ) : null}
    </>
  );
}

export function FundraisingTimelineSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">The Ask</Eyebrow>
          <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            Use of Funds Timeline
          </h2>
          <p className="mt-3 max-w-[980px] text-[24px] font-normal leading-[1.45] text-fg-secondary">
            $150K funds 15+ months on its own — from build to PoC to first revenue,
            then seed.
          </p>
        </div>

        <div className="mt-12 max-w-[1640px] shrink-0 rounded-lg border border-border/80 bg-bg-subtle/50 px-8 py-6">
          <div className="flex justify-between font-mono text-[13px] uppercase tracking-[0.1em] text-fg-caption">
            <span>Mo 0</span>
            <span>Mo 15</span>
            <span>Mo 24</span>
          </div>

          <div className="relative mt-4 h-5 overflow-hidden rounded-full bg-border/60">
            <div className="absolute inset-y-0 left-0 w-[62.5%] bg-accent" />
            <div className="absolute inset-y-0 left-[62.5%] w-[37.5%] border-l-2 border-accent/30 bg-accent/10" />
          </div>

          <div className="mt-4 flex justify-between text-[16px] leading-[1.45] text-fg-secondary">
            <span>
              <span className="font-semibold text-accent">$150K pre-seed</span>{" "}
              · 15+ mo standalone runway
            </span>
            <span className="text-fg-caption">Seed raise window</span>
          </div>
        </div>

        <div className="mt-8 flex max-w-[1640px] shrink-0 items-stretch gap-1">
          {TIMELINE_STEPS.map((step, index) => (
            <TimelineStep
              key={step.title}
              {...step}
              showArrow={index < TIMELINE_STEPS.length - 1}
            />
          ))}
        </div>

        <div className="mt-14 max-w-[1640px] shrink-0 border-t border-border pt-8">
          <p className="border-l-2 border-accent/70 pl-5 text-[27px] font-semibold leading-[1.4] tracking-[-0.015em] text-fg-primary">
            Pre-seed proves the wedge → PoC proves the product → revenue proves
            the business → seed funds the expansion.
          </p>
          <div className="mt-5 rounded-lg bg-bg-subtle/70 px-8 py-5">
            <ul className="columns-2 gap-x-12 text-[17px] leading-[1.7] text-fg-primary">
              {EXPANSION_INDUSTRIES.map((industry) => (
                <li key={industry} className="flex break-inside-avoid gap-2.5">
                  <span className="shrink-0 text-accent" aria-hidden>
                    ·
                  </span>
                  <span>{industry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="16 · Use of Funds Timeline" />
    </Slide>
  );
}
