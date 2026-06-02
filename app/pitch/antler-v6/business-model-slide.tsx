import React from "react";
import { Slide, Eyebrow } from "../slides";
import { MicroLabel, PER_UNIT_ROYALTY_RANGE } from "./pitch-micro-label";
import { SlideFooter } from "./slide-footer";

const BUSINESS_COLUMNS = [
  {
    title: "Prove",
    horizon: "Year 0–1",
    sell: "A paid validation pilot",
    buyer: "Integrators & gripper OEMs",
    value: (
      <>
        <span className="font-semibold text-accent">¥10–30M</span> per project
      </>
    ),
    caption:
      "Arc runs on a partner\u2019s gripper with XELA\u2019s sensor.",
    step: 0 as const,
  },
  {
    title: "Ship",
    horizon: "Year 2–3",
    sell: "A reference design + integration",
    buyer: "Gripper OEMs",
    value: (
      <>
        <span className="font-semibold text-accent">¥20–80M</span> per partner/yr
        {" · NRE + early per-unit royalty"}
      </>
    ),
    caption: "Arc embeds into their hardware; you help integrate.",
    step: 1 as const,
  },
  {
    title: "Scale",
    horizon: "Year 3+",
    sell: "Licensed embedded IP",
    buyer: "Arm & platform OEMs",
    value: (
      <>
        <span className="font-semibold text-accent">¥100M+</span> early →{" "}
        <span className="font-semibold text-accent">¥2–4B/yr</span> per partner at
        volume
      </>
    ),
    caption: "Arc baked into their silicon; royalty on every unit they ship.",
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

export function BusinessModelSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Business Model + Moat</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
        The first loop becomes the business.
      </h2>
      <p className="mt-5 max-w-[1320px] text-[28px] font-light leading-[1.45] tracking-[-0.015em] text-fg-secondary">
        Sell the module. Deepen into the platform. License at scale.
      </p>

      <div className="mt-10 max-w-[1640px] shrink-0">
        <div className="grid grid-cols-3 gap-x-12">
          {BUSINESS_COLUMNS.map((col) => (
            <div key={col.title} className="min-h-[72px]">
              <div
                className={`font-mono uppercase tracking-[0.12em] ${PHASE_TITLE_CLASS[col.step]}`}
              >
                {col.title}
              </div>
              <p className="mt-2 font-mono text-[14px] tracking-[0.06em] text-fg-caption">
                {col.horizon}
              </p>
            </div>
          ))}

          {BUSINESS_COLUMNS.map((col) => (
            <MatrixRow key={`${col.title}-sell`} label="Sell" minHeight="min-h-[88px]">
              {col.sell}
            </MatrixRow>
          ))}

          {BUSINESS_COLUMNS.map((col) => (
            <MatrixRow key={`${col.title}-buyer`} label="Buyer" minHeight="min-h-[72px]">
              {col.buyer}
            </MatrixRow>
          ))}

          {BUSINESS_COLUMNS.map((col) => (
            <MatrixRow key={`${col.title}-value`} label="Value" minHeight="min-h-[88px]">
              {col.value}
            </MatrixRow>
          ))}

          {BUSINESS_COLUMNS.map((col) => (
            <div key={`${col.title}-caption`}>
              <p className="text-[17px] leading-[1.45] text-fg-caption">{col.caption}</p>
              {col.title === "Scale" ? (
                <MicroLabel className="mt-2 block normal-case">
                  → illustrative math below
                </MicroLabel>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 max-w-[1640px] shrink-0 rounded-[8px] bg-bg-subtle px-8 py-5">
        <MicroLabel className="!text-[12px]">Illustrative — how scale compounds (modeled)</MicroLabel>
        <p className="mt-2 text-[19px] leading-[1.5] tracking-[-0.01em] text-fg-caption">
          At {PER_UNIT_ROYALTY_RANGE} (~1–2% of unit value, semiconductor IP
          norms), one platform partner at ~50,000 units/yr →{" "}
          <span className="font-semibold text-accent">¥2–4B/yr</span>.{" "}
          <span className="font-normal text-fg-primary">
            The ¥100M+ above is the early-stage floor.
          </span>{" "}
          Global industrial installs: 542,000/yr (IFR 2024).
        </p>
      </div>

      <div className="mt-5 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-10 py-7">
        <p className="text-[24px] font-light leading-[1.45] tracking-[-0.015em] text-fg-primary">
          <span className="font-semibold text-accent">Why it compounds:</span>{" "}
          sub-ms tactile data nobody else captures · designs locked into factory
          line blueprints · physical efficiency software can&rsquo;t match
        </p>
      </div>

      <SlideFooter pageLabel="23 · Business Model + Moat" />
    </Slide>
  );
}
