import React from "react";
import { Slide, Eyebrow } from "../slides";
import { SlideFooter } from "./slide-footer";

const PRODUCT_PATH = [
  {
    horizon: "Near term",
    body: "Arc is a neuromorphic reaction core on FPGA with a trained software readout, run on a partner\u2019s gripper for the closed-loop benchmark.",
  },
  {
    horizon: "Mid term",
    body: "Arc ships as a reference design \u2014 the core plus integration recipe partners embed in their hardware.",
  },
  {
    horizon: "Long term",
    body: "Arc is a licensed IP block embedded in the partner\u2019s own silicon, per-unit royalty.",
  },
] as const;

function ProductPathRow({
  horizon,
  body,
}: {
  horizon: string;
  body: string;
}) {
  return (
    <div className="border-l-2 border-accent/50 pl-7 py-3">
      <p className="font-mono text-[15px] font-semibold uppercase tracking-[0.12em] text-accent">
        {horizon}
      </p>
      <p className="mt-2 text-[24px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary">
        {body}
      </p>
    </div>
  );
}

export function FpgaStrategySlide() {
  return (
    <Slide align="start">
      <Eyebrow className="!mb-5">FPGA Strategy</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
        FPGA now. Silicon later.
      </h2>
      <p className="mt-5 max-w-[1500px] text-[28px] font-light leading-[1.45] tracking-[-0.015em] text-fg-secondary">
        Programmable hardware validates edge neuromorphic computing before we
        freeze the architecture into ASIC.
      </p>

      <div className="mt-6 flex min-h-0 flex-1 max-w-[1640px] flex-col justify-center gap-8">
        <div className="grid grid-cols-2 gap-x-14">
          <div>
            <div className="font-mono text-[18px] font-semibold uppercase tracking-[0.14em] text-accent">
              What FPGA enables today
            </div>
            <ul className="mt-4 space-y-3.5 text-[24px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary">
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>Iterate edge neuromorphic architecture before tape-out</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>Adapt across sensors, protocols, and control loops</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>Build the closed-loop benchmark on a partner platform</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[18px] font-semibold uppercase tracking-[0.14em] text-accent">
              What it unlocks downstream
            </div>
            <ul className="mt-4 space-y-3.5 text-[24px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary">
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>Measured validation data from real robotic systems</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>Reference designs partners embed in hardware</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>Licensed IP block in partner silicon at scale</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-[18px] font-semibold uppercase tracking-[0.14em] text-accent">
            Product path
          </div>
          {PRODUCT_PATH.map((phase) => (
            <ProductPathRow key={phase.horizon} {...phase} />
          ))}
        </div>
      </div>

      <SlideFooter pageLabel="24 · FPGA Strategy" />
    </Slide>
  );
}
