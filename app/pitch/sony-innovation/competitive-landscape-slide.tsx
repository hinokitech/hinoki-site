import React from "react";
import { Slide, SlideFooter, DeckSlideHeader } from "./slides";

const TABLE_GRID =
  "grid grid-cols-[minmax(0,0.82fr)_minmax(0,0.92fr)_minmax(0,1.18fr)_minmax(0,1.18fr)] gap-x-8";

const COMPETITOR_TABLE_COLUMNS = [
  "Competitor",
  "Their Focus",
  "The Robotics Bottleneck",
  "Hinoki\u2019s Advantage",
] as const;

const COMPETITOR_TABLE_ROWS = [
  {
    competitor: "EdgeCortix",
    focus: "Edge GenAI & LLMs",
    bottleneck: {
      label: "The \u201cCentralized Brain\u201d",
      body: "Built to process language/video, taking too long to compute.",
    },
    advantage: {
      label: "Distributed Intelligence",
      body: "Sub-millisecond hardware-level motor intercept loops.",
    },
  },
  {
    competitor: "Axelera AI",
    focus: "Heavy Vision (629 TOPS)",
    bottleneck: {
      label: "Power Overkill",
      body: "High-throughput monsters that are too hot and heavy for edge AI.",
    },
    advantage: {
      label: "Extreme Sparsity",
      body: "0.14 mJ baseline computing raw time-series physics.",
    },
  },
  {
    competitor: "BrainChip",
    focus: "Generalized Neuromorphic IP",
    bottleneck: {
      label: "The \u201cLego Block\u201d",
      body: "Horizontal silicon IP with zero industrial integration expertise.",
    },
    advantage: {
      label: "The Finished Product",
      body: "Plug-and-play mapping directly to FANUC drives and XELA skin.",
    },
  },
  {
    competitor: "TDK",
    focus: "Analog Reservoir AI",
    bottleneck: {
      label: "Sensor-Bound",
      body: "Isolated telemetry. They can feel the slip, but they cannot tell the motor to stop.",
    },
    advantage: {
      label: "Full Loop",
      body: "Maps multi-brand sensor inputs directly to instant actuator control.",
    },
  },
] as const;

function CompetitorTableCell({
  label,
  body,
  accent = false,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <p className="text-[20px] leading-[1.55] text-fg-primary">
      <span className={`font-semibold ${accent ? "text-accent" : ""}`}>
        {label}:
      </span>{" "}
      {body}
    </p>
  );
}

function CompetitorTableRow({
  competitor,
  focus,
  bottleneck,
  advantage,
}: (typeof COMPETITOR_TABLE_ROWS)[number]) {
  return (
    <div
      className={`${TABLE_GRID} min-h-0 flex-1 items-center border-b border-border py-7 last:border-b-0`}
    >
      <div className="text-[24px] font-semibold leading-[1.3] tracking-[-0.01em] text-fg-primary">
        {competitor}
      </div>
      <div className="text-[20px] leading-[1.5] text-fg-secondary">{focus}</div>
      <CompetitorTableCell {...bottleneck} />
      <div className="border-l-2 border-accent/35 pl-6">
        <CompetitorTableCell {...advantage} accent />
      </div>
    </div>
  );
}

export function CompetitiveLandscapeSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <DeckSlideHeader
          eyebrow="Competitive Landscape"
          wide
          title={
            <>
              Who we&rsquo;re up against — and{" "}
              <span className="text-gradient-logo">where we win.</span>
            </>
          }
        />

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col rounded-lg border border-border bg-bg-subtle/60 px-10 py-3">
          <div
            className={`${TABLE_GRID} shrink-0 border-b border-border-strong py-4 font-mono text-[13px] uppercase tracking-[0.12em] text-fg-caption`}
          >
            {COMPETITOR_TABLE_COLUMNS.map((column, index) => (
              <div
                key={column}
                className={
                  index === COMPETITOR_TABLE_COLUMNS.length - 1
                    ? "border-l-2 border-accent/35 pl-6 text-accent"
                    : undefined
                }
              >
                {column}
              </div>
            ))}
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            {COMPETITOR_TABLE_ROWS.map((row) => (
              <CompetitorTableRow key={row.competitor} {...row} />
            ))}
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="Appendix 4 · Competitive Landscape" />
    </Slide>
  );
}
