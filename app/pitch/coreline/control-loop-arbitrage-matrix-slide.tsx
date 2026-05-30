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
        <p className="pb-0.5 text-[20px] leading-[1.42] text-fg-secondary">
          Comparative performance — standard edge CPU/GPU architectures vs.{" "}
          <span className="italic">Arc</span> FPGA ESN on the same control
          loop.
        </p>
      </div>

      <div className="mt-3 min-h-0 flex-1">
        <img
          src={controlLoopArbitrageMatrixSrc.src}
          alt="Control-loop arbitrage matrix comparing standard edge CPU GPU latency, loop frequency, and energy against Hinoki Arc FPGA ESN"
          width={controlLoopArbitrageMatrixSrc.width}
          height={controlLoopArbitrageMatrixSrc.height}
          className="h-full w-full object-contain object-center"
        />
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
