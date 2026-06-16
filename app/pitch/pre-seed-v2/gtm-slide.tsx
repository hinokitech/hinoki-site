import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";
import {
  MicroLabel,
} from "./pitch-micro-label";

const GTM_TIERS = [
  {
    tier: "End effector OEMs",
    horizon: "Year 0–2",
    reach: "75+ companies",
    win: (
      <>
        <span className="font-semibold text-accent">8–10</span> accounts
      </>
    ),
    value: (
      <>
        <span className="font-semibold text-accent">$250K</span> Paid PoC →{" "}
        <span className="font-semibold text-accent">$500K</span> NRE Fee →{" "}
        <span className="font-semibold text-accent">$2.5M</span> ARR per account
        (via catalog embedding) on average
      </>
    ),
    step: 0 as const,
  },
  {
    tier: "Integrators",
    horizon: "Year 2–3",
    reach: "340+",
    win: (
      <>
        <span className="font-semibold text-accent">10–15</span> accounts
      </>
    ),
    value: (
      <>
        <span className="font-semibold text-accent">$500K</span> fee +{" "}
        <span className="font-semibold text-accent">$5K</span> Edge License/cell
        (avg. 40–80 cell deployments/yr) ={" "}
        <span className="font-semibold text-accent">$400K</span> ARR per account
      </>
    ),
    step: 1 as const,
  },
  {
    tier: "Industrial OEMs",
    horizon: "Year 3–5",
    reach: (
      <>
        7–10 conglomerates{" "}
        <span className="text-[17px] text-fg-caption">(Fanuc · Yaskawa class)</span>
      </>
    ),
    win: (
      <>
        <span className="font-semibold text-accent">2–3</span> accounts
      </>
    ),
    value: (
      <>
        <span className="font-semibold text-accent">$3.0M</span> Enterprise Platform
        Fee +{" "}
        <span className="font-semibold text-accent">$75M</span> ARR per account
        (via 150K embedded units/yr at $500/unit)
      </>
    ),
    step: 2 as const,
  },
] as const;

const GTM_SAME_MODEL_INDUSTRIES = [
  "Humanoids",
  "Industrial systems",
  "Social robotics / AMRs",
  "Defense UAVs / swarms",
  "PGMs / guided munitions",
  "EV active suspension",
  "Assistive exoskeletons",
  "Bionic prosthetics",
] as const;

const PHASE_TITLE_CLASS = [
  "text-[22px] font-light text-fg-primary",
  "text-[22px] font-normal text-fg-primary",
  "text-[22px] font-semibold text-accent",
] as const;

function MatrixRow({
  label,
  children,
  minHeight,
}: {
  label: string;
  children: React.ReactNode;
  minHeight: string;
}) {
  return (
    <div className={`${minHeight} flex flex-col border-l-2 border-accent/50 py-1 pl-6`}>
      <MicroLabel>{label}</MicroLabel>
      <p className="mt-2 text-[20px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary">
        {children}
      </p>
    </div>
  );
}

export function GtmSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Go-to-Market</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
        Bottom-up: start where the wedge is closest.
      </h2>
      <p className="mt-5 max-w-[1320px] text-[28px] font-light leading-[1.45] tracking-[-0.015em] text-fg-secondary">
        Bottom-up: Multi-tiered B2B Commercialization Pipeline — spreading
        across sectors.
      </p>

      <div className="mt-10 max-w-[1640px] shrink-0">
        <div className="grid grid-cols-3 gap-x-12">
          {GTM_TIERS.map((tier) => (
            <div key={`${tier.tier}-header`} className="min-h-[72px]">
              <div
                className={`font-mono uppercase tracking-[0.12em] ${PHASE_TITLE_CLASS[tier.step]}`}
              >
                {tier.tier}
              </div>
              <p className="mt-2 font-mono text-[14px] tracking-[0.06em] text-fg-caption">
                {tier.horizon}
              </p>
            </div>
          ))}

          {GTM_TIERS.map((tier) => (
            <MatrixRow
              key={`${tier.tier}-reach`}
              label="Reach"
              minHeight="min-h-[72px]"
            >
              {tier.reach}
            </MatrixRow>
          ))}

          {GTM_TIERS.map((tier) => (
            <MatrixRow key={`${tier.tier}-win`} label="Win" minHeight="min-h-[72px]">
              {tier.win}
            </MatrixRow>
          ))}

          {GTM_TIERS.map((tier) => (
            <MatrixRow
              key={`${tier.tier}-value`}
              label="Value"
              minHeight="min-h-[88px]"
            >
              {tier.value}
            </MatrixRow>
          ))}
        </div>
      </div>

      <div className="mt-10 max-w-[1640px] shrink-0 rounded-[8px] bg-bg-subtle px-8 py-5">
        <p className="text-[19px] leading-[1.5] tracking-[-0.01em] text-fg-caption">
          <span className="font-semibold text-fg-primary">
            Industrial Vertical Run-Rate:
          </span>{" "}
          2–3 embedded platforms (targeting ~25% of projected 2030 core motion
          lines) × 450,000 total units/yr × $500/unit →{" "}
          <span className="font-semibold text-accent">$225M/yr</span> from this
          single vertical alone.
        </p>
      </div>

      <div className="mt-5 max-w-[1640px] shrink-0 border-t border-border pt-5">
        <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-secondary">
          Same model across these industries
        </p>
        <ul className="mt-3 columns-2 gap-x-12 text-[18px] leading-[1.65] text-fg-primary">
          {GTM_SAME_MODEL_INDUSTRIES.map((industry) => (
            <li key={industry} className="break-inside-avoid">
              {industry}
            </li>
          ))}
        </ul>
      </div>

      <SlideFooter pageLabel="12 · Go-to-Market" />
    </Slide>
  );
}
