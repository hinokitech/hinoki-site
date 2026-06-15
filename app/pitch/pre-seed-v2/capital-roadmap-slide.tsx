import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";

const CAPITAL_ROADMAP_STAGES = [
  {
    label: "Stage 1",
    timing: "Now — during / just after Antler · 0–6 months",
    items: [
      <>
        Apply to{" "}
        <span className="font-semibold">NEDO NEP Yakushin 3000</span>; target{" "}
        <span className="font-semibold">¥30M non-dilutive</span> at 100% subsidy.
      </>,
      <>
        <span className="font-semibold">1stRound</span> — ¥10M non-dilutive grant
        applied.
      </>,
      <>
        <span className="font-semibold">Aichi DeepTech</span> — ¥50M grant
        applied.
      </>,
      <>
        Close at least one{" "}
        <span className="font-semibold">paid corporate PoC (¥10M–¥30M)</span>.
      </>,
      <>
        Register for{" "}
        <span className="font-semibold">Tsukuba Startup Park</span> (50%
        facility-fee reduction).
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
        (target ¥30M–¥72M) for equity-treated, non-dilutive runway with bullet
        repayment.
      </>,
      <>
        File foundation grant applications (
        <span className="font-semibold">Tateisi</span> up to ¥5M,{" "}
        <span className="font-semibold">Murata</span>,{" "}
        <span className="font-semibold">Telecommunications Advancement</span>)
        through AIST partnership.
      </>,
      <>
        Monitor the <span className="font-semibold">Japanese SBIR (NEDO)</span>{" "}
        FY2027 theme list and{" "}
        <span className="font-semibold">Monozukuri 23rd-round</span> for any
        matched build.
      </>,
    ],
  },
  {
    label: "Stage 3",
    timing: "12–24 months — seed round",
    items: [
      <>
        Secure a partner VC (
        <span className="font-semibold">Sony Innovation Fund</span> is the warm,
        on-thesis lead; plus robotics / industrial CVCs) to anchor seed and
        simultaneously unlock{" "}
        <span className="font-semibold">NEDO DTSU STS</span> (¥300M / up to ¥500M
        · 2/3 subsidy · 1/3 VC-equity requirement).
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
        <div className="shrink-0">
          <Eyebrow className="mb-5">Capital Roadmap</Eyebrow>
          <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            Staged path from Antler to seed.
          </h2>
          <p className="mt-3 max-w-[1640px] text-[24px] font-normal leading-[1.45] text-fg-secondary">
            Non-dilutive grants and PoC revenue first — partner VC unlocks the
            large NEDO co-investment programs at seed.
          </p>
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
