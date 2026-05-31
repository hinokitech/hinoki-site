import React from "react";
import controlLoopArbitrageMatrixSrc from "../../../public/assets/control-loop-arbitrage-matrix.png";
import { Slide, Eyebrow, SlideFooter, SlideCitation } from "../slides";

export function ControlLoopArbitrageMatrixSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Performance</Eyebrow>

      <div className="grid max-w-[1640px] shrink-0 grid-cols-[minmax(0,1fr)_minmax(0,480px)] items-end gap-x-10">
        <h2 className="text-[56px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
          The Control-Loop Arbitrage Matrix
        </h2>
        <p className="pb-0.5 text-[20px] leading-[1.42] text-fg-primary/90">
          Conventional edge CPU/GPU stacks (30–50 ms) vs.{" "}
          <span className="italic">Arc</span> target (modeled) on the same
          control loop.
        </p>
      </div>

      <div className="mt-3 min-h-0 flex-1">
        <img
          src={controlLoopArbitrageMatrixSrc.src}
          alt="Control-loop arbitrage matrix comparing standard edge CPU GPU latency against Hinoki Arc modeled target on the same loop"
          width={controlLoopArbitrageMatrixSrc.width}
          height={controlLoopArbitrageMatrixSrc.height}
          className="h-full w-full object-contain object-center"
        />
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
          Baseline bars · measured stack latency ·{" "}
          <span className="text-accent">Arc bar · target (modeled)</span>
        </p>
      </div>

      <SlideCitation size="large">
        Peer-Reviewed Validation: Alomar, M. L., et al., Implementation of an
        Echo State Network (ESN) to Field Programmable Gate Array (FPGA),
        ICAROB (2020); A 16nJ/Classification FPGA-based Wired-Logic DNN
        Accelerator Using Fixed-Weight Non-Linear Neural Net, IEEE Journal on
        Emerging and Selected Topics in Circuits and Systems (2021).
      </SlideCitation>

      <SlideFooter pageLabel="12 · Control-Loop Arbitrage Matrix" />
    </Slide>
  );
}
