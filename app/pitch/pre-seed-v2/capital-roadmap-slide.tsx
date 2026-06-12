import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";

const CAPITAL_ROADMAP_STAGES = [
  {
    stage: "01",
    title: "Stage 1",
    timing: "Now — during / just after Antler · 0–6 months",
    items: [
    <>
      Apply to{" "}
      <span className="font-semibold text-fg-primary">
        NEDO NEP Yakushin 3000
      </span>
      ; target{" "}
      <span className="font-semibold text-fg-primary">¥30M non-dilutive</span> at
      100% subsidy.
    </>,
    <>
      <span className="font-semibold text-fg-primary">1stRound</span> — ¥10M
      non-dilutive grant applied.
    </>,
    <>
      <span className="font-semibold text-fg-primary">Aichi DeepTech</span> — ¥50M
      grant applied.
    </>,
    <>
      Close at least one{" "}
      <span className="font-semibold text-fg-primary">
        paid corporate PoC (¥10M–¥30M)
      </span>{" "}
      with a Japanese robotics / industrial partner for non-dilutive revenue and
      seed-round validation.
    </>,
    <>
      Register for{" "}
      <span className="font-semibold text-fg-primary">
        Tsukuba Startup Park
      </span>{" "}
      (50% facility-fee reduction).
    </>,
    ],
  },
  {
    stage: "02",
    title: "Stage 2",
    timing: "6–15 months — bridge to seed",
    items: [
    <>
      Draw a{" "}
      <span className="font-semibold text-fg-primary">
        JFC Capital Subordinated Loan
      </span>{" "}
      (target ¥30M–¥72M) for equity-treated, non-dilutive runway with bullet
      repayment.
    </>,
    <>
      File foundation grant applications (
      <span className="font-semibold text-fg-primary">Tateisi</span> up to ¥5M,{" "}
      <span className="font-semibold text-fg-primary">Murata</span>,{" "}
      <span className="font-semibold text-fg-primary">
        Telecommunications Advancement
      </span>
      ) through the academic partner.
    </>,
    <>
      Monitor the{" "}
      <span className="font-semibold text-fg-primary">
        Japanese SBIR (NEDO)
      </span>{" "}
      FY2026 theme list and{" "}
      <span className="font-semibold text-fg-primary">
        Monozukuri 22nd-round
      </span>{" "}
      for any matched build.
    </>,
    ],
  },
  {
    stage: "03",
    title: "Stage 3",
    timing: "12–24 months — seed round",
    items: [
    <>
      Secure a partner VC (
      <span className="font-semibold text-fg-primary">
        Sony Innovation Fund
      </span>{" "}
      is the warm, on-thesis lead; plus robotics / industrial CVCs) to anchor
      seed and simultaneously unlock{" "}
      <span className="font-semibold text-fg-primary">
        NEDO DTSU STS
      </span>{" "}
      (¥300M / up to ¥500M · 2/3 subsidy · 1/3 VC-equity requirement).
    </>,
    <>
      Pursue{" "}
      <span className="font-semibold text-fg-primary">
        METI J-Startup
      </span>{" "}
      designation for branding / procurement and the founder&rsquo;s visa points.
    </>,
    ],
  },
] as const;

function RoadmapBullets({ items }: { items: readonly React.ReactNode[] }) {
  return (
    <ul className="space-y-1.5 text-[17px] leading-[1.42] text-fg-secondary">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <span className="shrink-0 text-accent">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CapitalRoadmapStageCard({
  stage,
  title,
  timing,
  items,
}: (typeof CAPITAL_ROADMAP_STAGES)[number]) {
  return (
    <div className="rounded-[10px] border border-border bg-bg-subtle px-5 py-4">
      <div className="grid grid-cols-[minmax(0,248px)_1fr] items-start gap-x-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0 rounded-[6px] border border-border bg-bg-base px-2.5 py-1 font-mono text-[13px] font-semibold tracking-[0.08em] text-fg-secondary">
            {stage}
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[15px] font-semibold uppercase leading-[1.3] tracking-[0.12em] text-accent">
              {title}
            </p>
            <p className="mt-1 text-[16px] font-normal leading-[1.35] text-fg-caption">
              {timing}
            </p>
          </div>
        </div>
        <RoadmapBullets items={items} />
      </div>
    </div>
  );
}

export function CapitalRoadmapSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="!mb-4">Capital Roadmap</Eyebrow>
          <h2 className="max-w-[1640px] text-[56px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
            Staged path from Antler to seed.
          </h2>
          <p className="mt-2 max-w-[1500px] text-[22px] font-normal leading-[1.45] text-fg-secondary">
            Non-dilutive grants and PoC revenue first — partner VC unlocks the
            large NEDO co-investment programs at seed.
          </p>
        </div>

        <div className="mt-4 flex min-h-0 max-w-[1640px] flex-1 flex-col gap-2">
          {CAPITAL_ROADMAP_STAGES.map((stage) => (
            <CapitalRoadmapStageCard key={stage.stage} {...stage} />
          ))}
        </div>
      </div>

      <SlideFooter pageLabel="16 · Capital Roadmap" />
    </Slide>
  );
}
