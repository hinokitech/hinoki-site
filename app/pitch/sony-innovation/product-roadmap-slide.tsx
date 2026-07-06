import React from "react";
import { Slide, Eyebrow, SlideFooter, DECK_SLIDE_H2_CLASS, DECK_SLIDE_SUBTITLE_CLASS } from "./slides";

const PRODUCT_ROADMAP_PHASES = [
  {
    label: "Phase 1",
    round: "Pre-Seed",
    goal: "The Physical Proof",
    items: [
      {
        term: "Hardware Stack",
        detail: "Commercial off-the-shelf FPGAs.",
      },
      {
        term: "Technical Milestone",
        detail:
          "Full tactile integration (XELA uSkin) proving sub-millisecond slip arrest.",
      },
      {
        term: "Validation",
        detail:
          "First live deployments of our Physical AI loop on industrial test rigs.",
      },
    ],
  },
  {
    label: "Phase 2",
    round: "Seed",
    goal: "The Edge Module",
    items: [
      {
        term: "Hardware Stack",
        detail: "Custom Hinoki PCB (Industrial hardened).",
      },
      {
        term: "Technical Milestone",
        detail:
          "Form-factor miniaturization and OEM standard digital logic wrappers.",
      },
      {
        term: "Validation",
        detail:
          "Full catalog embedding across product lines",
      },
    ],
  },
  {
    label: "Phase 3",
    round: "Series A",
    goal: "The Hybrid SoC (Physical AI + SLM)",
    items: [
      {
        term: "Hardware Stack",
        detail: (
          <>
            Tape-out of the custom Hinoki <span className="italic">Arc</span>{" "}
            Silicon.
          </>
        ),
      },
      {
        term: "Technical Milestone",
        detail:
          "Fusing our core Neuromorphic substrate with a baked-in Small Language Model (SLM).",
      },
      {
        term: "Validation",
        detail:
          "Deep silicon-level intent translation and hardware execution for high-axis humanoid lines.",
      },
    ],
  },
] as const;

function ProductRoadmapItemRow({
  term,
  detail,
}: {
  term: string;
  detail: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,220px)_1fr] items-start gap-x-8 border-t border-border/70 pt-4 first:border-t-0 first:pt-0">
      <p className="font-mono text-[12px] uppercase leading-[1.35] tracking-[0.1em] text-fg-caption">
        {term}
      </p>
      <p className="text-[21px] leading-[1.5] text-fg-primary">{detail}</p>
    </div>
  );
}

function ProductRoadmapPhaseRow({
  label,
  round,
  goal,
  items,
}: (typeof PRODUCT_ROADMAP_PHASES)[number]) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center border-b border-border py-6 last:border-b-0">
      <div className="grid grid-cols-[minmax(0,340px)_1fr] items-start gap-x-12">
        <div>
          <div className="font-mono text-[15px] uppercase tracking-[0.14em] text-accent">
            {label}
          </div>
          <div className="mt-2.5 text-[24px] font-semibold leading-[1.3] tracking-[-0.01em] text-fg-primary">
            {round}
          </div>
          <p className="mt-3 text-[17px] leading-[1.45] text-fg-secondary">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-fg-caption">
              The Goal
            </span>
            <br />
            <span className="font-medium text-fg-primary">{goal}</span>
          </p>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <ProductRoadmapItemRow key={item.term} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductRoadmapSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">Long-Term Product Roadmap</Eyebrow>
          <div className="flex max-w-[1640px] items-center">
            <div className="min-w-0 max-w-[980px] shrink-0">
              <h2 className={DECK_SLIDE_H2_CLASS}>
                The Path to Custom Silicon
              </h2>
              <p className={DECK_SLIDE_SUBTITLE_CLASS}>
                Pre-Seed → Seed → Series A — FPGA, custom PCB, hybrid SoC.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/product-roadmap-path-to-silicon-accent.png?v=1"
              alt=""
              width={640}
              height={360}
              decoding="async"
              aria-hidden
              className="ml-44 h-[186px] w-[462px] shrink-0 object-contain object-left opacity-95"
            />
          </div>
        </div>

        <div className="mt-5 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          {PRODUCT_ROADMAP_PHASES.map((phase) => (
            <ProductRoadmapPhaseRow key={phase.label} {...phase} />
          ))}
        </div>
      </div>

      <SlideFooter pageLabel="14 · Long-Term Product Roadmap" />
    </Slide>
  );
}
