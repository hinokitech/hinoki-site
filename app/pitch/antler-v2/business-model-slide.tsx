import React from "react";
import { Slide, Eyebrow, SlideFooter } from "../slides";

const BUSINESS_PHASES = [
  {
    title: "Prove it",
    phaseTag: "Paid validation",
    metric: "¥10M–¥30M per pilot",
    metricDetail: "4–8 weeks · bolt-on to existing hardware",
    execution: (
      <>
        Paid pilot with a Japanese gripper —{" "}
        <span className="italic">Arc</span> reflex layer on their stack.
      </>
    ),
    step: 0 as const,
  },
  {
    title: "Package it",
    phaseTag: "Reference blueprints",
    metric: "¥30M–¥60M per partner",
    metricDetail: "Certified reference design bundle",
    execution:
      "Ship our reflex substrate to System Integrators.",
    step: 1 as const,
  },
  {
    title: "Embed it",
    phaseTag: "The royalty engine",
    metric: "¥100M–¥300M+ per partner",
    metricDetail: "Upfront + continuous per-platform royalty",
    execution:
      "License Hinoki's architecture to robotics silicon and platform OEMs.",
    step: 2 as const,
  },
] as const;

const MOAT_PILLARS = [
  {
    title: "High-frequency data moat",
    body: (
      <>
        We run at up to{" "}
        <span className="font-semibold text-accent">5.0 kHz</span> vs. legacy sub{" "}
        <span className="font-semibold">1.0 kHz</span> loops. We capture
        sub-millisecond tactile data standard controllers cannot resolve.
      </>
    ),
  },
  {
    title: "SIer blueprint lock-in",
    body: (
      <>
        Designed straight into factory line blueprints by Japanese System
        Integrators. Swapping us out requires line re-validation and costly
        downtime.
      </>
    ),
  },
  {
    title: "0.14 mJ physical efficiency floor",
    body: (
      <>
        Our substrate delivers reflex speeds without power-heavy software or edge
        GPUs.
      </>
    ),
  },
] as const;

function BusinessPhaseCard({
  title,
  phaseTag,
  metric,
  metricDetail,
  execution,
  step,
}: {
  title: string;
  phaseTag: string;
  metric: string;
  metricDetail: string;
  execution: React.ReactNode;
  step: 0 | 1 | 2;
}) {
  const titleClass = [
    "text-[24px] font-light text-fg-primary",
    "text-[24px] font-normal text-fg-primary",
    "text-[24px] font-semibold text-accent",
  ][step];

  return (
    <div className="flex flex-1 flex-col justify-center border-l-2 border-accent/50 pl-7">
      <div className={`font-mono uppercase tracking-[0.14em] ${titleClass}`}>
        {title}
      </div>
      <p className="mt-2 font-mono text-[13px] tracking-[0.08em] text-fg-caption">
        {phaseTag}
      </p>
      <p className="mt-5 text-[32px] font-light leading-[1.12] tracking-[-0.02em] text-accent">
        {metric}
      </p>
      <p className="mt-2 font-mono text-[14px] tracking-[0.06em] text-fg-caption">
        {metricDetail}
      </p>
      <p className="mt-5 text-[19px] leading-[1.55] text-fg-secondary">
        {execution}
      </p>
    </div>
  );
}

function MoatPillar({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div className="flex flex-col border-l-2 border-accent pl-6">
      <p className="font-mono text-[14px] font-semibold uppercase tracking-[0.14em] text-accent">
        {title}
      </p>
      <p className="mt-4 text-[18px] leading-[1.55] text-fg-primary">{body}</p>
    </div>
  );
}

export function BusinessModelSlide() {
  return (
    <Slide align="start" dense>
      <Eyebrow className="!mb-5">Business Model + Moat</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
        The first loop becomes the business.
      </h2>
      <p className="mt-5 max-w-[1320px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        Start with one hardware-level reflex loop. Convert edge physics into
        data, reference design, and embedded silicon IP royalties.
      </p>

      <div className="mt-8 grid min-h-0 flex-1 max-w-[1640px] grid-cols-3 gap-12">
        {BUSINESS_PHASES.map((phase) => (
          <BusinessPhaseCard key={phase.title} {...phase} />
        ))}
      </div>

      <div className="mt-8 shrink-0 max-w-[1640px] rounded-[10px] border-2 border-accent bg-accent-subtle px-10 py-7">
        <p className="font-mono text-[15px] font-semibold uppercase tracking-[0.14em] text-accent">
          How each partner loop compounds the moat
        </p>
        <div className="mt-6 grid grid-cols-3 gap-12">
          {MOAT_PILLARS.map((pillar) => (
            <MoatPillar key={pillar.title} {...pillar} />
          ))}
        </div>
      </div>

      <SlideFooter pageLabel="22 · Business Model + Moat" />
    </Slide>
  );
}
