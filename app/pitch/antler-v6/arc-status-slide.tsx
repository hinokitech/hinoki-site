import React from "react";
import { Slide, Eyebrow } from "../slides";
import { SlideFooter } from "./slide-footer";

const PROGRESS_DOT_COUNT = 4;

/** label · dots/pills · detail — shared x-positions for lanes 01–05 */
const LANE_GRID =
  "grid grid-cols-[minmax(0,300px)_48px_minmax(0,1fr)] items-start gap-x-5";

function ProgressDots({ filled }: { filled: number }) {
  return (
    <span
      className="inline-flex gap-1 font-mono text-[17px] leading-none tracking-[0.04em]"
      aria-label={`${filled} of ${PROGRESS_DOT_COUNT} proven today`}
    >
      {Array.from({ length: PROGRESS_DOT_COUNT }, (_, index) => (
        <span
          key={index}
          className={index < filled ? "text-accent" : "text-fg-caption/75"}
        >
          {index < filled ? "●" : "○"}
        </span>
      ))}
    </span>
  );
}

function LaneLabel({
  number,
  title,
  status,
  className = "",
}: {
  number: string;
  title: string;
  status: string;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <span className="mt-0.5 shrink-0 rounded-[6px] border border-border bg-bg-base px-2.5 py-1 font-mono text-[13px] font-semibold tracking-[0.08em] text-fg-secondary">
        {number}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[16px] font-semibold uppercase leading-[1.3] tracking-[0.12em] text-accent">
          {title}
        </p>
        <p className="mt-1 text-[19px] font-normal leading-[1.35] text-fg-caption">
          {status}
        </p>
      </div>
    </div>
  );
}

function LaneMiddle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center self-start pt-[0.22em]">{children}</div>
  );
}

function MonthPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block shrink-0 rounded-full border border-accent/35 bg-accent-subtle px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
      {children}
    </span>
  );
}

const ARC_STATUS_LANES = [
  {
    number: "01",
    title: "Concept",
    status: "Defined",
    filled: 3,
    body: "Bounded reaction intelligence — edge neuromorphic computing — between sensor and actuator. The architecture is set; the open work is proving it physically for customers.",
  },
  {
    number: "02",
    title: "Data",
    status: "Modeled, not yet measured",
    filled: 2,
    body: "Sub-millisecond latency and per-correction energy figures are modeled from scientific papers and Phase 1 work, and validated as achievable by our Advisor (Dr. C\u00e9dric Caremel) and CTO. Physical measurement is precisely what this raise funds.",
  },
  {
    number: "03",
    title: "Product development",
    status: "Phase 1 validated on hardware",
    filled: 2,
    body: "Edge neuromorphic computing — live-sensor classification and motion tracking on real silicon, not simulation. Next build: the closed-loop tactile-to-gripper rig.",
  },
  {
    number: "04",
    title: "Customer traction",
    status: "Discovery and LOIs",
    filled: 2,
    body: "The LOIs matter because they validate that customers face this problem and want the solution — not revenue, but demand. LOI\u2019s signed with a Tokyo tactile-sensing partner and an elder-care robotics company deploying in Europe and Japan.",
  },
] as const;

const ARC_STATUS_NEXT_STEPS = [
  {
    range: "0–3 mo",
    body: "Closed-loop rig live; Arc measured against a conventional baseline; initial IP filing in.",
  },
  {
    range: "3–6 mo",
    body: "Validation data in hand with 1–2 Japanese gripper OEMs; first paid pilot secured.",
  },
  {
    range: "6–9 mo",
    body: "Raise professional seed on measured data, pilot traction, and IP position.",
  },
] as const;

function ArcStatusLaneCard({
  number,
  title,
  status,
  filled,
  body,
}: {
  number: string;
  title: string;
  status: string;
  filled: number;
  body: string;
}) {
  return (
    <div className="rounded-[10px] border border-border bg-bg-subtle px-6 py-5">
      <div className={LANE_GRID}>
        <LaneLabel number={number} title={title} status={status} />
        <LaneMiddle>
          <ProgressDots filled={filled} />
        </LaneMiddle>
        <p className="text-[22px] leading-[1.45] text-fg-primary/90">{body}</p>
      </div>
    </div>
  );
}

export function ArcStatusSlide() {
  return (
    <Slide align="start" dense>
      <Eyebrow className="!mb-5">Where Arc is today</Eyebrow>
      <p className="max-w-[1500px] text-[32px] font-normal leading-[1.42] tracking-[-0.015em] text-fg-primary">
        The architecture is validated and customers are pulling — but the
        physical numbers are modeled, not yet measured. This raise funds the
        closed-loop prototype that turns lab results into measured reality.
      </p>
      <p className="mt-4 font-mono text-[15px] font-semibold uppercase tracking-[0.12em] text-fg-caption">
        <span className="text-accent">●</span> proven today ·{" "}
        <span className="text-fg-caption/75">○</span> what the raise proves
      </p>

      <div className="mt-5 flex min-h-0 flex-1 max-w-[1640px] flex-col gap-2.5">
        {ARC_STATUS_LANES.map((lane) => (
          <ArcStatusLaneCard key={lane.number} {...lane} />
        ))}

        <div className="rounded-[10px] border border-border bg-bg-subtle px-6 py-5">
          <div
            className={`${LANE_GRID} grid-rows-[auto_auto_auto] gap-y-4`}
          >
            <LaneLabel
              number="05"
              title="Next steps"
              status="What this raise delivers"
              className="row-span-3 self-start"
            />
            {ARC_STATUS_NEXT_STEPS.map((step) => (
              <React.Fragment key={step.range}>
                <LaneMiddle>
                  <MonthPill>{step.range}</MonthPill>
                </LaneMiddle>
                <p className="text-[22px] leading-[1.45] text-fg-primary/90">
                  {step.body}
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="31 · Where Arc is today" />
    </Slide>
  );
}
