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

export function CaseStudy02HinokiSolutionSlide() {
  return (
    <Slide align="start">
      <HinokiSolutionTreeMark />
      <div className="relative z-[1]">
        <Eyebrow>Case Study 02 · Hinoki Solution</Eyebrow>
      </div>
      <h2 className="relative z-[1] max-w-[980px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
        Arc opens the fenceless floor.
      </h2>

      <div className="relative z-[1] mt-8 flex min-h-0 flex-1 max-w-[1640px] flex-col">
        <SolutionLabel large>The Arc response</SolutionLabel>
        <div className="mt-5 grid flex-1 grid-cols-2 items-center gap-12">
          <SolutionPillar
            title="The B2B Component Wedge"
            headline={
              <>
                Next gen reflex at the{" "}
                <span className="font-semibold">OEM layer</span>
              </>
            }
            detail={
              <>
                Arc will integrate as a hardware-level sensorimotor reflex layer
                complementing the control units of existing tactile sensor
                makers and gripper OEMs — no full robot redesign required.
              </>
            }
          />
          <SolutionPillar
            title="1–5 kHz Localized Correction"
            headline={
              <>
                <span className="font-semibold text-accent">1–5 kHz</span> ·{" "}
                <span className="font-semibold text-accent">&lt;0.5 ms</span> ·
                off OS jitter
              </>
            }
            detail={
              <>
                High-resolution force arrays route straight into an
                our edge-integrated substrate — bypassing central computing OS
                jitter, monitoring the friction envelope, and commanding
                joint-level current adjustments at continuous 1–5 kHz.
              </>
            }
          />
        </div>
      </div>

      <div className="relative z-[1] mt-6 max-w-[1640px] shrink-0">
        <SolutionLabel>The commercial unlock</SolutionLabel>
        <div className="mt-4 rounded-[10px] border-2 border-accent bg-accent-subtle px-8 py-5">
          <p className="text-[28px] font-light leading-[1.38] tracking-[-0.015em] text-fg-primary">
            Arc builds the fenceless safety architecture McKinsey notes is
            missing. Upgraded component ecosystems arrest micro-slips and limit
            contact pressure — shielding human workers, scaling production
            volumes, and unlocking immediate factory floor ROI.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="18 · Hinoki Solution 02" />
    </Slide>
  );
}
