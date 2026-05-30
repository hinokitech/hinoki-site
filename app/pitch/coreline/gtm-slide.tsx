import React from "react";
import { Slide, Eyebrow, SlideFooter } from "../slides";

const GTM_LAYERS = [
  {
    phase: "Start · Wedge",
    horizon: "Year 1–2",
    body: (
      <>
        Industrial Gripper OEMs —{" "}
        <span className="font-semibold text-fg-primary">50+ companies</span>
        {" — "}
        <span className="font-semibold text-accent">¥10–30M</span> paid PoCs ·
        first embeds
      </>
    ),
    step: 0 as const,
  },
  {
    phase: "Scale · Pull-through",
    horizon: "Year 3–4",
    body: (
      <>
        System Integrators + Humanoid developers —{" "}
        <span className="font-semibold text-fg-primary">
          340+ and 10–15 accounts
        </span>
        {" — "}
        reference designs · channel pull-through
      </>
    ),
    step: 1 as const,
  },
  {
    phase: "Mature · Lock-in",
    horizon: "Year 5+",
    body: (
      <>
        Robot Arm OEMs —{" "}
        <span className="font-semibold text-fg-primary">7–10 conglomerates</span>
        {" — "}
        <span className="font-semibold text-accent">¥100M+</span> annualized per
        partner · per-platform royalty{" "}
        <span className="text-[20px] text-fg-caption">
          (Fanuc · Yaskawa class)
        </span>
      </>
    ),
    step: 2 as const,
  },
] as const;

function GtmLayerRow({
  phase,
  horizon,
  body,
  step,
}: {
  phase: string;
  horizon: string;
  body: React.ReactNode;
  step: 0 | 1 | 2;
}) {
  const titleClass = [
    "text-[26px] font-light text-fg-primary",
    "text-[26px] font-normal text-fg-primary",
    "text-[26px] font-semibold text-accent",
  ][step];

  return (
    <div
      className={`flex flex-1 flex-col justify-center border-l-2 border-accent/50 pl-7${
        step === 0 ? " -mt-3" : ""
      }`}
    >
      <p className="font-mono text-[15px] font-semibold uppercase tracking-[0.12em] text-fg-caption">
        {horizon}
      </p>
      <div className={`mt-2 min-h-[72px] font-mono uppercase tracking-[0.14em] ${titleClass}`}>
        {phase}
      </div>
      <p className="mt-4 text-[24px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary">
        {body}
      </p>
    </div>
  );
}

export function GtmSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Go-to-Market</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
        Bottom-up: start where the wedge is closest.
      </h2>
      <p className="mt-5 max-w-[1320px] text-[28px] font-light leading-[1.45] tracking-[-0.015em] text-fg-secondary">
        Japan&rsquo;s most approachable B2B robotics universe.
      </p>

      <div className="mt-12 grid min-h-0 flex-1 max-w-[1640px] grid-cols-3 gap-12">
        {GTM_LAYERS.map((layer) => (
          <GtmLayerRow key={layer.phase} {...layer} />
        ))}
      </div>

      <div className="mt-auto max-w-[1640px] shrink-0 rounded-[10px] border border-border bg-bg-subtle px-10 py-5">
        <p className="font-mono text-[18px] leading-[1.45] tracking-[0.04em] text-fg-caption">
          <span className="font-semibold text-fg-secondary">Source</span> — JARA
          / METI / analyst aggregates
        </p>
      </div>

      <SlideFooter pageLabel="24 · Go-to-Market" />
    </Slide>
  );
}
