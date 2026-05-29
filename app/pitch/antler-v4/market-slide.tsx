import React from "react";
import { Slide, Eyebrow, SlideFooter } from "../slides";

const MARKET_LAYERS = [
  {
    phase: "Start · Wedge",
    body: (
      <>
        Tactile &amp; gripper control —{" "}
        <span className="font-semibold text-accent">$15B by 2030</span>{" "}
        <span className="text-[20px] text-fg-caption">
          (industry analyst aggregates)
        </span>
      </>
    ),
    step: 0 as const,
  },
  {
    phase: "Scale · With funding",
    body: (
      <>
        Industrial &amp; collaborative robotics —{" "}
        <span className="font-semibold text-accent">$170B by 2030</span>{" "}
        <span className="text-[20px] text-fg-caption">
          (IFR World Robotics · Statista)
        </span>
      </>
    ),
    step: 1 as const,
  },
  {
    phase: "Mature · The platform",
    body: (
      <>
        Same reflex primitive across humanoids, locomotion, mobile &amp; aerial
        — <span className="font-semibold text-accent">$165B by 2034</span>{" "}
        <span className="text-[20px] text-fg-caption">
          (Goldman Sachs · McKinsey)
        </span>
      </>
    ),
    step: 2 as const,
  },
] as const;

function MarketLayerRow({
  phase,
  body,
  step,
}: {
  phase: string;
  body: React.ReactNode;
  step: 0 | 1 | 2;
}) {
  const phaseClass = [
    "text-[26px] font-light text-fg-primary",
    "text-[26px] font-normal text-fg-primary",
    "text-[26px] font-semibold text-accent",
  ][step];

  return (
    <div className="flex flex-1 flex-col justify-center border-l-2 border-accent/50 pl-7">
      <div className={`font-mono uppercase tracking-[0.14em] ${phaseClass}`}>
        {phase}
      </div>
      <p className="mt-4 text-[24px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary">
        {body}
      </p>
    </div>
  );
}

export function AntlerMarketSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Market</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
        A measurable wedge inside a platform-wide opportunity.
      </h2>
      <p className="mt-5 max-w-[1320px] text-[28px] font-light leading-[1.45] tracking-[-0.015em] text-fg-secondary">
        Start where one loop is measurable. Each raise unlocks the next layer.
      </p>

      <div className="mt-12 grid min-h-0 flex-1 max-w-[1640px] grid-cols-3 gap-12">
        {MARKET_LAYERS.map((layer) => (
          <MarketLayerRow key={layer.phase} {...layer} />
        ))}
      </div>

      <div className="mt-auto max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-10 py-7">
        <p className="text-[24px] font-light leading-[1.45] tracking-[-0.015em] text-fg-primary">
          Slip is the entry point. The architecture is identical everywhere.
          Breadth is the size of the prize — the plan is one loop.
        </p>
      </div>

      <SlideFooter pageLabel="23 · Market" />
    </Slide>
  );
}
