import React from "react";
import vonNeumannLatencyGauntletSrc from "../../../public/assets/von-neumann-latency-gauntlet.png";
import { Slide, Eyebrow, SlideFooter, SlideCitation } from "../slides";

export function VonNeumannLatencyGauntletSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Latency</Eyebrow>

      <div className="grid max-w-[1640px] shrink-0 grid-cols-[minmax(0,1fr)_minmax(0,480px)] items-end gap-x-10">
        <h2 className="text-[56px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
          The Von Neumann Latency Gauntlet
        </h2>
        <p className="pb-0.5 text-[20px] leading-[1.42] text-fg-secondary">
          Why standard humanoid software stacks cannot stop the collapse —
          the central &ldquo;brain&rdquo; is mathematically blind to the
          physical failure window.
        </p>
      </div>

      <div className="mt-3 min-h-0 flex-1">
        <img
          src={vonNeumannLatencyGauntletSrc.src}
          alt="Timeline of sensory signal latency through TDMA, EtherCAT, RTOS jitter, and WBC optimization"
          width={vonNeumannLatencyGauntletSrc.width}
          height={vonNeumannLatencyGauntletSrc.height}
          className="h-full w-full object-contain object-center"
        />
      </div>

      <div className="mt-3 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-6 py-3">
        <p className="text-[18px] font-light leading-[1.35] tracking-[-0.015em] text-fg-primary">
          TDMA frame scan{" "}
          <span className="font-mono font-semibold">2.56 ms</span>
          {" · "}EtherCAT serialization{" "}
          <span className="font-mono font-semibold">2.00 ms</span>
          {" · "}RTOS jitter{" "}
          <span className="font-mono font-semibold">1.50 ms</span>
          {" · "}WBC loop{" "}
          <span className="font-mono font-semibold">15–20 ms</span>
          {" — "}the stack cannot respond before stick collapse at{" "}
          <span className="font-mono font-semibold text-accent">15 ms</span>.
        </p>
      </div>

      <SlideCitation size="large">
        Peer-Reviewed Validation: Deploying foundation models in embodied edge
        systems: Systems challenges, memory bottlenecks, and architectural
        trade-offs, Preprints (2026); Tee, B. C. K. et al., A neuro-inspired
        artificial peripheral nervous system for scalable tactile skins, Science
        Robotics (2019).
      </SlideCitation>

      <SlideFooter pageLabel="12 · Von Neumann Latency Gauntlet" />
    </Slide>
  );
}
