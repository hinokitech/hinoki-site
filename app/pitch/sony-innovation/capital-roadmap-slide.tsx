import React from "react";
import {
  Slide,
  Eyebrow,
  SlideFooter,
  DECK_SLIDE_H2_CLASS,
} from "./slides";

const CAPITAL_ROADMAP_STAGES = [
  {
    label: "Stage 1",
    timing: "Now — during / just after Antler · 0–6 months",
    items: [
      <>
        Apply to{" "}
        <span className="font-semibold">NEDO NEP Yakushin 3000</span>; target{" "}
        <span className="font-semibold">$188K non-dilutive</span> at 100% subsidy.
      </>,
      <>
        <span className="font-semibold">Aichi DeepTech</span> — $313K grant
        applied.
      </>,
      <>
        <span className="font-semibold">Coreline ATLAS</span> — second stage,
        $1M pre-seed
      </>,
    ],
  },
  {
    label: "Stage 2",
    timing: "6–15 months — bridge to seed",
    items: [
      <>
        Draw a{" "}
        <span className="font-semibold">JFC Capital Subordinated Loan</span>{" "}
        (target $188K–$450K) for equity-treated bullet repayment.
      </>,
      <>
        File foundation grant applications through AIST partnership.
      </>,
      <>
        <span className="font-semibold">
          SBIR (NEDO) FY2027 / Monozukuri 23rd-round
        </span>
      </>,
    ],
  },
  {
    label: "Stage 3",
    timing: "12–24 months — seed round",
    items: [
      <>
        <span className="font-semibold">Warm VCs</span> (
        <span className="font-semibold">Sony Innovation</span>,{" "}
        <span className="font-semibold">Spiral Capital</span>,{" "}
        <span className="font-semibold">Co-capital</span>)
      </>,
      <>
        <span className="font-semibold">NEDO DTSU STS</span> ($3.1M · 2/3 subsidy ·
        1/3 VC-equity requirement).
      </>,
      <>
        Pursue <span className="font-semibold">METI J-Startup</span> designation
        for branding.
      </>,
    ],
  },
] as const;

function CapitalRoadmapStageRow({
  label,
  timing,
  items,
}: (typeof CAPITAL_ROADMAP_STAGES)[number]) {
  return (
    <div className="flex flex-1 flex-col justify-center border-b border-border py-5">
      <div className="grid grid-cols-[minmax(0,320px)_1fr] items-start gap-x-10">
        <div>
          <div className="font-mono text-[15px] uppercase tracking-[0.14em] text-accent">
            {label}
          </div>
          <div className="mt-2 text-[20px] font-semibold leading-[1.35] text-fg-primary">
            {timing}
          </div>
        </div>
        <ul className="space-y-2 text-[22px] font-normal leading-[1.55] text-fg-primary">
          {items.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="shrink-0 text-accent">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CapitalRoadmapSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 max-w-[1640px]">
          <Eyebrow className="mb-5">Capital Roadmap</Eyebrow>
          <h2 className={DECK_SLIDE_H2_CLASS}>
            Staged path from Antler to{" "}
            <span className="text-gradient-logo">seed.</span>
          </h2>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          {CAPITAL_ROADMAP_STAGES.map((stage) => (
            <CapitalRoadmapStageRow key={stage.label} {...stage} />
          ))}
        </div>
      </div>

      <SlideFooter pageLabel="18 · Capital Roadmap" />
    </Slide>
  );
}
