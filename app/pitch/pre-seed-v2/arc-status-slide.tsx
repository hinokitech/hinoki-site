import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";

const ARC_STATUS_LANES = [
  {
    label: "Concept",
    status: "Defined",
    body: "Reaction-intelligence architecture is set. Next: prove it on customer hardware.",
  },
  {
    label: "Data",
    status: "Modeled, not measured",
    body: "Latency and energy are modeled and advisor-validated. This raise produces the physical benchmark.",
  },
  {
    label: "Product",
    status: "Phase 1 on silicon",
    body: "Live-sensor classification on real chips — not simulation. Next: closed-loop tactile-to-gripper rig.",
  },
  {
    label: "Traction",
    status: "Discovery and LOIs",
    body: "LOIs with XELA and Sophara Robotics, plus discovery calls, confirm demand for the layer.",
  },
] as const;

const ARC_STATUS_NEXT_STEPS = [
  "0–3 mo · Closed-loop rig live; benchmark vs baseline; initial IP filed",
  "3–6 mo · Validation data with 1–2 tactile OEMs; first paid pilot",
  "6–9 mo · Raise seed on measured data, pilot traction, and IP",
] as const;

function ArcStatusLaneRow({
  label,
  status,
  body,
}: {
  label: string;
  status: string;
  body: string;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center border-b border-border py-4">
      <div className="grid grid-cols-[minmax(0,280px)_1fr] items-start gap-x-10">
        <div>
          <div className="font-mono text-[15px] uppercase tracking-[0.14em] text-accent">
            {label}
          </div>
          <div className="mt-2 text-[20px] font-semibold leading-[1.35] text-fg-primary">
            {status}
          </div>
        </div>
        <p className="text-[22px] font-normal leading-[1.5] text-fg-primary">
          {body}
        </p>
      </div>
    </div>
  );
}

export function ArcStatusSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">Where Arc is today</Eyebrow>
          <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            Architecture validated. Benchmark data next.
          </h2>
          <p className="mt-3 max-w-[1100px] text-[24px] font-normal leading-[1.45] text-fg-secondary">
            Customers are pulling — but the headline numbers are still modeled,
            not measured.
          </p>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          {ARC_STATUS_LANES.map((lane) => (
            <ArcStatusLaneRow key={lane.label} {...lane} />
          ))}
        </div>

        <div className="mt-auto shrink-0 pt-6 max-w-[1640px]">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-caption">
            What this raise delivers
          </p>
          <ul className="mt-4 space-y-2 text-[22px] font-normal leading-[1.5] text-fg-primary">
            {ARC_STATUS_NEXT_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </div>

      <SlideFooter pageLabel="Appendix 2 · Where Arc is today" />
    </Slide>
  );
}
