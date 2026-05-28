import React from "react";
import { Slide, Eyebrow, SlideFooter } from "../slides";
import { HinokiSolutionTreeMark } from "./hinoki-solution-tree-mark";

function SolutionLabel({
  children,
  large = false,
}: {
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className={`font-mono uppercase tracking-[0.16em] text-accent ${
        large
          ? "text-[22px] font-semibold tracking-[0.14em]"
          : "text-[18px]"
      }`}
    >
      {children}
    </div>
  );
}

function SolutionPillar({
  title,
  headline,
  detail,
}: {
  title: string;
  headline: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <div className="flex flex-col border-l-2 border-accent pl-7">
      <div className="font-mono text-[17px] font-semibold uppercase tracking-[0.14em] text-accent">
        {title}
      </div>
      <p className="mt-4 text-[40px] font-light leading-[1.14] tracking-[-0.02em] text-fg-primary">
        {headline}
      </p>
      <p className="mt-4 text-[26px] leading-[1.4] text-fg-secondary">
        {detail}
      </p>
    </div>
  );
}

export function CaseStudy01HinokiSolutionSlide() {
  return (
    <Slide align="start">
      <HinokiSolutionTreeMark />
      <div className="relative z-[1]">
        <Eyebrow>Case Study 01 · Hinoki Solution</Eyebrow>
      </div>
      <h2 className="relative z-[1] max-w-[980px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
        Arc closes the blind window.
      </h2>

      <div className="relative z-[1] mt-8 flex min-h-0 flex-1 max-w-[1640px] flex-col">
        <SolutionLabel large>The Arc response</SolutionLabel>
        <div className="mt-5 grid flex-1 grid-cols-2 items-center gap-12">
          <SolutionPillar
            title="Decentralized Peripheral Reflex"
            headline={
              <>
                Tactile streams →{" "}
                <span className="font-semibold">our edge substrate</span>, off the host
                bus
              </>
            }
            detail={
              <>
                Arc shunts high-resolution tactile data directly into an
                our edge-integrated substrate — executing localized corrections
                completely independent of host CPU/GPU shared memory channels.
              </>
            }
          />
          <SolutionPillar
            title="1–5 kHz Micro-Impedance Balancing"
            headline={
              <>
                <span className="font-semibold text-accent">1–5 kHz</span> ESN ·{" "}
                <span className="font-semibold text-accent">&lt;0.5 ms</span>{" "}
                local loop
              </>
            }
            detail={
              <>
                On-chip Echo State Network modulates joint-level current
                drivers the microsecond a partial slip annulus initiates —
                before the central stack even sees it.
              </>
            }
          />
        </div>
      </div>

      <div className="relative z-[1] mt-6 max-w-[1640px] shrink-0">
        <SolutionLabel>The result</SolutionLabel>
        <div className="mt-4 rounded-[10px] border-2 border-accent bg-accent-subtle px-8 py-5">
          <p className="text-[28px] font-light leading-[1.38] tracking-[-0.015em] text-fg-primary">
            Safeguards fragile, high-cost finger harmonic drives from backdriving
            wear, helps lock maintenance costs inside standard baseline
            parameters, and reinforces task continuity, securing the
            underwritten{" "}
            <span className="font-semibold text-accent">6-month payback</span>.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="16 · Hinoki Solution 01" />
    </Slide>
  );
}
