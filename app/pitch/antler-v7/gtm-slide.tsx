import React from "react";
import { Slide, Eyebrow } from "../slides";
import { MicroLabel, PER_UNIT_ROYALTY_RANGE, MODEL_ASSUMPTIONS_LINE } from "./pitch-micro-label";
import { SlideFooter } from "./slide-footer";

const GTM_TIERS = [
  {
    tier: "Tactile sensor OEMs",
    horizon: "Year 0–1",
    reach: "50+ companies",
    win: <span className="font-semibold text-accent">8–10</span>,
    value: (
      <>
        <span className="font-semibold text-accent">¥10–30M</span> each · first
        embeds
      </>
    ),
    step: 0 as const,
  },
  {
    tier: "Integrators + humanoid devs",
    horizon: "Year 2–3",
    reach: "340+ / 10–15 accounts",
    win: "channel pull-through",
    value: "pull-through + per-deployment revenue at volume",
    step: 1 as const,
  },
  {
    tier: "Arm OEMs",
    horizon: "Year 3+",
    reach: (
      <>
        7–10 conglomerates{" "}
        <span className="text-[17px] text-fg-caption">(Fanuc · Yaskawa class)</span>
      </>
    ),
    win: <span className="font-semibold text-accent">2–3</span>,
    value: (
      <>
        <span className="font-semibold text-accent">¥100M+</span> per partner →
        per-unit royalty at scale
      </>
    ),
    step: 2 as const,
  },
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
        Bottom-up: revenue built account by account — the mirror of the
        top-down ceiling.
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
          At maturity: 2–3 embedded platforms × ~50,000 units/yr ×{" "}
          {PER_UNIT_ROYALTY_RANGE} →{" "}
          <span className="font-semibold text-accent">¥5–11B/yr</span> annualized
          royalty — built bottom-up from nameable accounts.{" "}
          <span className="font-normal text-fg-primary">
            (Illustrative / at maturity.)
          </span>
        </p>
      </div>

      <p className="mt-3 max-w-[1640px] shrink-0 text-[17px] leading-[1.45] text-fg-caption">
        {MODEL_ASSUMPTIONS_LINE}
      </p>

      <div className="mt-5 max-w-[1640px] shrink-0 rounded-[10px] border border-border bg-bg-subtle px-10 py-5">
        <p className="font-mono text-[18px] leading-[1.45] tracking-[0.04em] text-fg-caption">
          <span className="font-semibold text-fg-secondary">Source</span> — JARA
          / METI / analyst aggregates
        </p>
      </div>

      <SlideFooter pageLabel="25 · Go-to-Market" />
    </Slide>
  );
}
