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

export function CaseStudy03HinokiSolutionSlide() {
  return (
    <Slide align="start">
      <HinokiSolutionTreeMark />
      <div className="relative z-[1]">
        <Eyebrow>Case Study 03 · Hinoki Solution</Eyebrow>
      </div>
      <h2 className="relative z-[1] max-w-[980px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
        The Hinoki effect — recovery before the micro-stop.
      </h2>

      <div className="relative z-[1] mt-8 flex min-h-0 flex-1 max-w-[1640px] flex-col">
        <SolutionLabel large>The Arc response</SolutionLabel>
        <div className="mt-5 grid flex-1 grid-cols-2 items-center gap-12">
          <SolutionPillar
            title="Memory Wall Bypass"
            headline={
              <>
                LUT-mapped logic —{" "}
                <span className="font-semibold">zero weight-fetch</span> loops
              </>
            }
            detail={
              <>
                Arc uses parallel combinational circuits mapped directly onto
                local look-up tables (LUTs), eliminating external memory
                weight-fetching loops.
              </>
            }
          />
          <SolutionPillar
            title="0.14 mJ Power Footprint"
            headline={
              <>
                <span className="font-semibold text-accent">0.14 mJ</span>{" "}
                active footprint
              </>
            }
            detail={
              <>
                Rather than power-heavy software policies over shared memory
                channels, Arc maps the entire friction trajectory on-substrate,
                dropping active power overhead.
              </>
            }
          />
        </div>
      </div>

      <div className="relative z-[1] mt-6 max-w-[1640px] shrink-0">
        <SolutionLabel>The result</SolutionLabel>
        <div className="mt-4 rounded-[10px] border-2 border-accent bg-accent-subtle px-8 py-5">
          <p className="text-[28px] font-light leading-[1.38] tracking-[-0.015em] text-fg-primary">
            Anticipates limit surface collapse and locks the object securely
            within{" "}
            <span className="font-semibold text-accent">&lt;1.0 ms</span>,
            reliably shielding high-volume production lines from
            multi-million-dollar micro-stop events.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="20 · Hinoki Solution 03" />
    </Slide>
  );
}
