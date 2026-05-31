import React from "react";
import { Slide, Eyebrow } from "../slides";
import { SlideFooter } from "./slide-footer";

const BUSINESS_PHASES = [
  {
    title: "Prove",
    horizon: "Year 1–2",
    body: (
      <>
        Paid pilot ·{" "}
        <span className="font-semibold text-accent">¥10–30M</span>
        {" · "}
        <span className="italic">Arc</span>
        {" validated on a partner\u2019s gripper · 4–8 weeks · bench data + joint IP filing"}
      </>
    ),
    product:
      "Arc is a neuromorphic reaction core on FPGA with a trained software readout, run on a partner\u2019s gripper for the closed-loop benchmark.",
    step: 0 as const,
  },
  {
    title: "Ship",
    horizon: "Year 3–4",
    body: (
      <>
        Integration + per-unit ·{" "}
        <span className="font-semibold text-accent">¥20–80M</span> Year 1 per
        partner (NRE + initial production units royalties)
      </>
    ),
    product:
      "Arc ships as a reference design — the core plus integration recipe partners embed in their hardware.",
    step: 1 as const,
  },
  {
    title: "Scale",
    horizon: "Year 5+",
    body: (
      <>
        License + royalty ·{" "}
        <span className="font-semibold text-accent">¥100M+</span> annualized per
        partner · per-unit royalty across their shipping platform, as embed
        volume scales
      </>
    ),
    product:
      "Arc is a licensed IP block embedded in the partner\u2019s own silicon, per-unit royalty.",
    step: 2 as const,
  },
] as const;

function BusinessPhaseRow({
  title,
  horizon,
  body,
  product,
  step,
}: {
  title: string;
  horizon: string;
  body: React.ReactNode;
  product: string;
  step: 0 | 1 | 2;
}) {
  const titleClass = [
    "text-[26px] font-light text-fg-primary",
    "text-[26px] font-normal text-fg-primary",
    "text-[26px] font-semibold text-accent",
  ][step];

  return (
    <div className="flex flex-1 flex-col justify-center border-l-2 border-accent/50 pl-7">
      <p className="font-mono text-[15px] font-semibold uppercase tracking-[0.12em] text-fg-caption">
        {horizon}
      </p>
      <div className={`mt-2 min-h-[72px] font-mono uppercase tracking-[0.14em] ${titleClass}`}>
        {title}
      </div>
      <p className="mt-4 text-[24px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary">
        {body}
      </p>
      <p className="mt-3 text-[18px] leading-[1.45] text-fg-primary/85">{product}</p>
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

      <div className="mt-12 grid min-h-0 flex-1 max-w-[1640px] grid-cols-3 items-start gap-12">
        {BUSINESS_PHASES.map((phase) => (
          <BusinessPhaseRow key={phase.title} {...phase} />
        ))}
      </div>

      <div className="mt-auto max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-10 py-7">
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
