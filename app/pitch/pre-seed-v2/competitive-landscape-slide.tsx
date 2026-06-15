import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";

const PROBLEM_ROWS = [
  {
    label: "The Physics Bottleneck",
    body: (
      <>
        Cloud networks add <span className="font-semibold">100ms+ latency</span>;
        physical motion requires{" "}
        <span className="font-semibold">&#956;s determinism</span>.
      </>
    ),
  },
  {
    label: "The Enterprise Wall",
    body: (
      <>
        Global manufacturing plants mandate{" "}
        <span className="font-semibold">air-gapped, offline edge security</span>.
      </>
    ),
  },
  {
    label: "The Algorithmic Failure",
    body: (
      <>
        Deep learning requires massive matrix math; physical control requires
        light, real-time temporal processing.
      </>
    ),
  },
] as const;

const MARKET_MAPPING_ROWS = [
  {
    label: "Legacy MCUs",
    subtitle: "STMicro · TI · Renesas",
    body: (
      <>
        <span className="font-semibold">Static, fixed-logic code.</span>{" "}
        No AI compute — cannot process complex, dynamic data.
      </>
    ),
  },
  {
    label: "Edge AI SoMs",
    subtitle: "NVIDIA Jetson · Intel",
    body: (
      <>
        <span className="font-semibold">Deep learning software.</span>{" "}
        High latency &amp; power — not built for &#956;s motor loops.
      </>
    ),
  },
  {
    label: "Smart Components",
    subtitle: "TDK (Reservoir Prototype)",
    body: (
      <>
        <span className="font-semibold">Analog reservoir AI.</span>{" "}
        Sensor-bound — isolated to local component telemetry.
      </>
    ),
  },
] as const;

function LandscapeLedgerRow({
  label,
  subtitle,
  body,
}: {
  label: string;
  subtitle?: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center border-b border-border py-5">
      <div className="grid grid-cols-[minmax(0,320px)_1fr] items-start gap-x-10">
        <div>
          <div className="font-mono text-[15px] uppercase tracking-[0.14em] text-accent">
            {label}
          </div>
          {subtitle ? (
            <div className="mt-2 text-[20px] font-semibold leading-[1.35] text-fg-primary">
              {subtitle}
            </div>
          ) : null}
        </div>
        <p className="text-[22px] font-normal leading-[1.55] text-fg-primary">
          {body}
        </p>
      </div>
    </div>
  );
}

export function CompetitiveLandscapeSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">Competitive Landscape</Eyebrow>
          <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            Why the problem won&rsquo;t solve itself.
          </h2>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          {PROBLEM_ROWS.map((row) => (
            <LandscapeLedgerRow key={row.label} {...row} />
          ))}

          <p className="mt-6 shrink-0 font-mono text-[13px] uppercase tracking-[0.14em] text-fg-caption">
            Strategic Market Mapping
          </p>

          {MARKET_MAPPING_ROWS.map((row) => (
            <LandscapeLedgerRow key={row.label} {...row} />
          ))}
        </div>

        <div className="mt-auto shrink-0 pt-6 max-w-[1640px]">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-caption">
            Our solution
          </p>
          <p className="mt-4 text-[30px] font-semibold leading-[1.38] tracking-[-0.018em] text-fg-primary">
            <span className="text-accent">Hinoki Technologies</span> — RC
            Physical AI maps multi-brand inputs to instant actuator control.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="Appendix 3 · Competitive Landscape" />
    </Slide>
  );
}
