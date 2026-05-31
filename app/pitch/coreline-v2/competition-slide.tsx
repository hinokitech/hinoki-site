import React from "react";
import { Slide, Eyebrow, SlideFooter } from "../slides";

const FRAGMENTED_LAYERS = [
  {
    label: "Brains plan",
    middle: "NVIDIA GR00T, Physical Intelligence, DeepMind",
    tail: "above reaction intelligence",
  },
  {
    label: "Sensors detect",
    middle: "XELA, GelSight, FingerVision",
    tail: "but don\u2019t act",
  },
  {
    label: "Motion infra executes",
    middle: "Beckhoff, dSPACE",
    tail: "deterministic, not adaptive",
  },
  {
    label: "Neuromorphic chips exist",
    middle: "TDK, BrainChip, Loihi",
    tail: "but not designed for reaction intelligence",
  },
  {
    label: "Internal control teams patch it",
    middle: null,
    tail: "slow, custom, not licensable; high compute overhead",
  },
] as const;

function FragmentRow({
  label,
  middle,
  tail,
}: {
  label: string;
  middle: string | null;
  tail: string;
}) {
  return (
    <div className="border-l-2 border-accent/40 pl-6">
      <p className="text-[26px] font-light leading-[1.42] tracking-[-0.01em] text-fg-secondary">
        <span className="font-semibold text-fg-primary">{label}</span>
        {middle ? (
          <>
            {" — "}
            {middle}
            {" — "}
          </>
        ) : (
          " — "
        )}
        {tail}
      </p>
    </div>
  );
}

export function CompetitionSlide() {
  return (
    <Slide align="start" dense>
      <Eyebrow className="!mb-5">Competition</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
        Reaction intelligence is fragmented — nobody owns the layer.
      </h2>

      <div className="mt-8 flex min-h-0 flex-1 max-w-[1640px] flex-col justify-center gap-5">
        {FRAGMENTED_LAYERS.map((layer) => (
          <FragmentRow key={layer.label} {...layer} />
        ))}
      </div>

      <div className="mt-6 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-10 py-6">
        <p className="text-[26px] font-light leading-[1.45] tracking-[-0.015em] text-fg-primary">
          <span className="font-semibold text-accent">The gap:</span> A
          dedicated, licensable, adaptive reaction intelligence. That&rsquo;s{" "}
          <span className="italic">Arc</span>.
        </p>
      </div>

      <div className="mt-4 max-w-[1640px] shrink-0 rounded-[10px] border border-border bg-bg-subtle px-10 py-5">
        <p className="text-[22px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary">
          <span className="font-semibold text-fg-primary">Why we hold it:</span>{" "}
          FPGA-flexible while TDK is silicon-frozen — architecture updates
          without a tape-out.
        </p>
      </div>

      <SlideFooter pageLabel="26 · Competition" />
    </Slide>
  );
}
