import React from "react";
import { Slide, Eyebrow, SlideCitation } from "../slides";
import { LocalizedReflexLayerPerformanceMatrixChart } from "./localized-reflex-layer-performance-matrix-chart";
import { SlideFooter } from "./slide-footer";

export function ControlLoopArbitrageMatrixSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Performance</Eyebrow>

      <div className="grid max-w-[1640px] shrink-0 grid-cols-[minmax(0,1fr)_minmax(0,480px)] items-end gap-x-10">
        <h2 className="text-[56px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
          The Localized Reflex Layer Performance
        </h2>
        <p className="pb-0.5 text-[20px] leading-[1.42] text-fg-primary/90">
          Conventional edge CPU/GPU stacks (30–50 ms) vs.{" "}
          <span className="italic">Arc</span> core logic fabric (modeled).
        </p>
      </div>

      <div className="mt-3 min-h-0 flex-1">
        <LocalizedReflexLayerPerformanceMatrixChart className="h-full w-full" />
      </div>

      <div className="mt-3 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-8 py-4">
        <p className="text-[20px] font-light leading-[1.45] tracking-[-0.015em] text-fg-primary">
          <span className="font-semibold text-accent">
            The window we&rsquo;re built to close.
          </span>{" "}
          Modeling and FPGA work indicate sub-millisecond is reachable —
          measuring it is what this raise funds.
        </p>
        <p className="mt-2 font-mono text-[13px] uppercase tracking-[0.1em] text-fg-caption">
          Standard edge stack · measured ranges ·{" "}
          <span className="text-accent">Arc localized fabric · target (modeled)</span>
        </p>
      </div>

      <SlideCitation size="large">
        Architectural Precedent &amp; Validation: Core ESN optimization and
        low-energy wired-logic methods validated independently by Alomar et
        al. (ICAROB 2020) and Kosuge et al. (IEEE JETCAS 2021).
      </SlideCitation>

      <SlideFooter pageLabel="12 · Localized Reflex Layer Performance" />
    </Slide>
  );
}
