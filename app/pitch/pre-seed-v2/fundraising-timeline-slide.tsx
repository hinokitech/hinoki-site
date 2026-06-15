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
    outcome: "Validated slip arrest on partner hardware",
  },
  {
    period: "Mo 9–12",
    title: "Revenue",
    outcome: "First paid PoC · ¥10M–¥30M",
  },
  {
    period: "Mo 12+",
    title: "Seed",
    outcome: "Raise on measured traction + revenue",
  },
] as const;

function TimelineStep({
  period,
  title,
  outcome,
  showArrow,
}: (typeof TIMELINE_STEPS)[number] & { showArrow: boolean }) {
  return (
    <>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="font-mono text-[14px] tracking-[0.08em] text-fg-caption">
          {period}
        </p>
        <h3 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-fg-primary">
          {title}
        </h3>
        <p className="mt-4 text-[20px] leading-[1.45] text-fg-secondary">
          {outcome}
        </p>
      </div>
      {showArrow ? (
        <div
          className="flex shrink-0 items-center px-6 pt-8 font-mono text-[28px] font-light text-fg-caption/50"
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
            ¥23M funds 15+ months on its own — from build to PoC to first revenue,
            then seed.
          </p>
        </div>

        <div className="mt-14 max-w-[1640px] shrink-0">
          <div className="flex justify-between font-mono text-[14px] tracking-[0.08em] text-fg-caption">
            <span>Mo 0</span>
            <span>Mo 15</span>
            <span>Mo 24</span>
          </div>

          <div className="relative mt-4 h-5 overflow-hidden rounded-full bg-border/70">
            <div className="absolute inset-y-0 left-0 w-[62.5%] bg-accent" />
            <div className="absolute inset-y-0 left-[62.5%] w-[37.5%] border-l-2 border-accent/30 bg-accent/10" />
          </div>

          <div className="mt-4 flex justify-between text-[16px] leading-[1.4] text-fg-secondary">
            <span>
              <span className="font-semibold text-accent">¥23M pre-seed</span>{" "}
              · 15+ mo standalone runway
            </span>
            <span>Seed raise window</span>
          </div>
        </div>

        <div className="mt-16 flex min-h-0 max-w-[1640px] flex-1 items-start">
          {TIMELINE_STEPS.map((step, index) => (
            <TimelineStep
              key={step.title}
              {...step}
              showArrow={index < TIMELINE_STEPS.length - 1}
            />
          ))}
        </div>

        <p className="mt-auto shrink-0 max-w-[1640px] pt-10 text-[28px] font-semibold leading-[1.35] tracking-[-0.015em] text-fg-primary">
          Pre-seed proves the wedge → PoC proves the product → revenue proves
          the business → seed funds the platform.
        </p>
      </div>

      <SlideFooter pageLabel="17 · Use of Funds Timeline" />
    </Slide>
  );
}
