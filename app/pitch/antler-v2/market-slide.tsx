import React from "react";
import { Slide, Eyebrow, SlideFooter } from "../slides";

const MARKET_MOTION = [
  {
    phase: "Start",
    headline: "Tactile manipulation & gripper control",
    count: "$15B+ by 2030",
    detail:
      "Beachhead where one reflex loop is measurable — tactile & force sensing wedge.",
    source: "Industry analyst aggregates",
    step: 0 as const,
  },
  {
    phase: "Scale with funding",
    headline: "Industrial & collaborative robotics",
    count: "$170B by 2030",
    detail:
      "Platform-wide robotics TAM as embed rights compound across OEMs and SIers.",
    source: "IFR World Robotics · Statista",
    step: 1 as const,
  },
  {
    phase: "Mature",
    headline: "Humanoids, mobile, assistive & beyond",
    count: "$165B by 2034",
    detail:
      "Category land-grab — licensable reaction layer across multiple platforms.",
    source: "Goldman Sachs Research · McKinsey",
    step: 2 as const,
  },
] as const;

function MarketMotionCard({
  phase,
  headline,
  count,
  detail,
  source,
  step,
}: {
  phase: string;
  headline: string;
  count: string;
  detail: string;
  source: string;
  step: 0 | 1 | 2;
}) {
  const phaseClass = [
    "text-[24px] font-light text-fg-primary",
    "text-[24px] font-normal text-fg-primary",
    "text-[24px] font-semibold text-accent",
  ][step];

  return (
    <div className="flex flex-1 flex-col justify-center border-l-2 border-accent/50 pl-7">
      <div className={`font-mono uppercase tracking-[0.14em] ${phaseClass}`}>
        {phase}
      </div>
      <p className="mt-4 text-[30px] font-medium leading-[1.2] tracking-[-0.015em] text-fg-primary">
        {headline}
      </p>
      <p className="mt-3 text-[38px] font-light leading-[1.1] tracking-[-0.02em] text-accent">
        {count}
      </p>
      <p className="mt-4 text-[22px] leading-[1.45] text-fg-secondary">
        {detail}
      </p>
      <p className="mt-2 font-mono text-[14px] leading-[1.4] tracking-[0.04em] text-fg-caption">
        {source}
      </p>
    </div>
  );
}

export function AntlerMarketSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Market</Eyebrow>
      <h2 className="max-w-[1640px] text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        A measurable wedge inside a platform-wide opportunity.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[28px] font-normal leading-[1.45] text-fg-secondary">
        Hinoki sizes the beachhead first — then the robotics stack, then the
        platforms where reaction becomes infrastructure.
      </p>

      <div className="mt-10 grid min-h-0 flex-1 max-w-[1640px] grid-cols-3 gap-12">
        {MARKET_MOTION.map((item) => (
          <MarketMotionCard key={item.phase} {...item} />
        ))}
      </div>

      <p className="max-w-[1640px] shrink-0 text-[24px] font-light leading-[1.4] tracking-[-0.01em] text-fg-secondary">
        Slip is the entry point. We are sizing the licensable reaction layer
        inside robotic platforms — not slip detection alone.
      </p>

      <SlideFooter pageLabel="23 · Market" />
    </Slide>
  );
}
