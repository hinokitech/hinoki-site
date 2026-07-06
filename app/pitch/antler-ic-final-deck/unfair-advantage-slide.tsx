import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";

const ADVANTAGE_PHASES = [
  {
    title: "Where",
    body: "Tsukuba is one of two Japanese SEZs for deep-tech robotics. Regulatory sandbox, mega lab access, expedited non-dilutive funding support.",
    detail: "Japan robotics research corridor",
  },
  {
    title: "When",
    body: "Japan funding — aging society, labor shortage, manufacturing, elder care.",
    detail: "Demand now, not someday",
  },
  {
    title: "Who",
    body: "Deep researcher network, from Physical HRI to Electrical chip engineers.",
    detail: "Tsukuba · Tokyo · Nagoya",
  },
] as const;

function AdvantagePhaseRow({
  title,
  body,
  detail,
  step,
}: {
  title: string;
  body: string;
  detail: string;
  step: 0 | 1 | 2;
}) {
  const titleClass = [
    "text-[52px] font-light text-fg-primary",
    "text-[52px] font-normal text-fg-primary",
    "text-[52px] font-medium text-accent",
  ][step];

  return (
    <div className="grid grid-cols-[minmax(0,440px)_1fr] items-baseline gap-x-20 py-4">
      <h3 className={`leading-[0.95] tracking-[-0.025em] ${titleClass}`}>
        {title}
      </h3>
      <div className="pb-0.5">
        <p className="text-[26px] leading-[1.45] text-fg-secondary">{body}</p>
        <p className="mt-2 font-mono text-[20px] font-semibold leading-[1.4] tracking-[0.04em] text-fg-caption">
          {detail}
        </p>
      </div>
    </div>
  );
}

export function UnfairAdvantageSlide() {
  return (
    <Slide align="start">
      <div className="flex min-h-0 flex-1 flex-col">
        <Eyebrow>Unfair Advantage</Eyebrow>
        <h2 className="max-w-[1640px] text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
          Why Hinoki can win from Japan.
        </h2>
        <p className="mt-6 max-w-[1500px] text-[28px] font-normal leading-[1.45] text-fg-secondary">
          Location, timing, and network.
        </p>

        <div className="mt-8 flex min-h-0 flex-1 flex-col">
          <div className="flex flex-col divide-y divide-border/60">
            {ADVANTAGE_PHASES.map((phase, index) => (
              <AdvantagePhaseRow
                key={phase.title}
                {...phase}
                step={index as 0 | 1 | 2}
              />
            ))}
          </div>

          <div className="mt-auto flex max-w-[1640px] shrink-0 items-center gap-20 border-t border-border/70 pt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/university-of-tsukuba-logo.png?v=2"
              alt="University of Tsukuba"
              width={640}
              height={256}
              decoding="async"
              className="h-[96px] w-auto max-w-[560px] object-contain object-left"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/aist-logo.png?v=2"
              alt="AIST"
              width={320}
              height={128}
              decoding="async"
              className="h-[88px] w-auto max-w-[320px] object-contain object-left"
            />
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="Appendix 1 · Unfair Advantage" />
    </Slide>
  );
}
