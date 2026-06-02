import React from "react";
import { Slide, Eyebrow } from "../slides";
import { SlideFooter } from "./slide-footer";

const MARKET_SURFACES = [
  {
    header: "Wedge",
    ruleWidth: "w-[38%]",
    category: "Tactile & gripper control",
    figure: "$15B by 2030",
    source: "industry analyst aggregates",
    step: 0 as const,
  },
  {
    header: "Serviceable market",
    ruleWidth: "w-[62%]",
    category: "Industrial & collaborative robotics",
    figure: "$170B by 2030",
    source: "IFR World Robotics · Statista",
    step: 1 as const,
  },
  {
    header: "The platform",
    ruleWidth: "w-full",
    category: "Humanoids, locomotion, mobile & aerial",
    figure: "$165B by 2034",
    source: "Goldman Sachs · McKinsey",
    step: 2 as const,
  },
] as const;

const MARKET_HEADER_CLASS = [
  "text-[28px] font-light text-fg-primary",
  "text-[28px] font-normal text-fg-primary",
  "text-[28px] font-semibold text-accent",
] as const;

function MarketSurfaceBox({
  category,
  figure,
  source,
}: {
  category: string;
  figure: string;
  source: string;
}) {
  return (
    <div className="flex h-full min-h-[176px] w-full flex-col rounded-[6px] bg-fg-primary/[0.035] px-5 py-5">
      <p className="text-[22px] font-light leading-[1.4] tracking-[-0.01em] text-fg-secondary">
        {category} —
      </p>
      <p className="mt-3 text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-accent">
        {figure}
      </p>
      <p className="mt-auto pt-3 text-[18px] leading-[1.45] text-fg-caption">{source}</p>
    </div>
  );
}

export function AntlerMarketSlide() {
  return (
    <Slide align="start">
      <div className="shrink-0">
        <Eyebrow>Market</Eyebrow>
        <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
          A measurable wedge inside a platform-wide opportunity.
        </h2>
        <p className="mt-5 max-w-[1320px] text-[28px] font-light leading-[1.45] tracking-[-0.015em] text-fg-secondary">
          Top-down: the surface one architecture can address, widening as we earn
          each layer.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <div className="grid max-w-[1640px] grid-cols-[24%_33%_43%] gap-x-6">
          {MARKET_SURFACES.map((layer) => (
            <div
              key={`header-${layer.header}`}
              className={`min-h-[36px] font-mono uppercase leading-[1.1] tracking-[0.12em] ${MARKET_HEADER_CLASS[layer.step]}`}
            >
              {layer.header}
            </div>
          ))}

          {MARKET_SURFACES.map((layer) => (
            <div
              key={`rule-${layer.header}`}
              className={`mt-3 h-[2px] ${layer.ruleWidth} bg-accent/55`}
            />
          ))}

          {MARKET_SURFACES.map((layer) => (
            <div key={`box-${layer.header}`} className="mt-5 flex h-full min-h-0">
              <MarketSurfaceBox
                category={layer.category}
                figure={layer.figure}
                source={layer.source}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-10 py-7">
        <p className="text-[24px] font-light leading-[1.45] tracking-[-0.015em] text-fg-primary">
          One architecture, three widening surfaces — we earn each by proving the
          one before it. Grip, balance, impact safety: every fast physical
          correction is the same <span className="italic">Arc</span>.
        </p>
      </div>

      <SlideFooter pageLabel="22 · Market" />
    </Slide>
  );
}
