import React from "react";
import { Slide, Eyebrow, SlideFooter, SlideCitation } from "../slides";

function CaseStudyLabel({
  children,
  large = false,
}: {
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className={`font-mono uppercase tracking-[0.16em] text-accent ${
        large
          ? "text-[22px] font-semibold tracking-[0.14em]"
          : "text-[18px]"
      }`}
    >
      {children}
    </div>
  );
}

function CostProblem({
  title,
  headline,
  detail,
}: {
  title: string;
  headline: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <div className="flex flex-col border-l-2 border-accent pl-6">
      <div className="font-mono text-[15px] font-semibold uppercase tracking-[0.14em] text-accent">
        {title}
      </div>
      <p className="mt-3 text-[38px] font-light leading-[1.12] tracking-[-0.02em] text-fg-primary">
        {headline}
      </p>
      <p className="mt-3 text-[22px] leading-[1.4] text-fg-secondary">
        {detail}
      </p>
    </div>
  );
}

export function CaseStudy03HighVolumeAutomationSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Case Study 03 · High-Volume Automation</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
        Micro-stops and micro-slippage stop the line.
      </h2>

      <div className="mt-6 max-w-[1640px] shrink-0">
        <CaseStudyLabel>The failure profile</CaseStudyLabel>
        <div className="mt-4 grid grid-cols-2 gap-x-14 gap-y-4">
          <div>
            <p className="text-[34px] font-light leading-[1.32] tracking-[-0.015em] text-fg-secondary">
              <span className="font-semibold text-fg-primary">
                24/7 pick-and-place
              </span>{" "}
              — friction shifts with surface texture, moisture, and payload
              weight on every cycle.
            </p>
          </div>
          <div>
            <p className="text-[34px] font-light leading-[1.32] tracking-[-0.015em] text-fg-secondary">
              Micro-slip propagates at shear-wave speed — stick radius hits{" "}
              <span className="font-semibold text-accent">c = 0</span> before
              the planner reacts.
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-[1640px] text-[30px] font-light leading-[1.35] tracking-[-0.015em] text-fg-secondary">
          RTOS jitter, middleware serialization, and memory walls block the
          host CPU/GPU — path corrections arrive too late.
        </p>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 max-w-[1640px] flex-col">
        <CaseStudyLabel large>What it costs</CaseStudyLabel>
        <div className="mt-5 grid flex-1 grid-cols-3 items-center gap-8">
          <CostProblem
            title="Unplanned Outage Rate"
            headline={
              <>
                <span className="font-semibold text-accent">44%</span> of line
                stops
              </>
            }
            detail={
              <>
                Component and sensor micro-failures trigger automated safety
                trips — the &ldquo;micro-stop&rdquo; that kills throughput.
              </>
            }
          />
          <CostProblem
            title="Line-Stop Penalty"
            headline={
              <>
                <span className="font-semibold">$22,000</span>/min
              </>
            }
            detail={
              <>
                One dropped or misaligned part halts an entire automotive
                assembly line — penalty clocks start immediately.
              </>
            }
          />
          <CostProblem
            title="Systemic Revenue Leak"
            headline={
              <>
                <span className="font-semibold text-accent">$50B</span>/yr
                global
              </>
            }
            detail={
              <>
                Hardware and sensor loop latency bottlenecks drain
                manufacturer revenue — one micro-slip at a time.
              </>
            }
          />
        </div>
      </div>

      <div className="mt-4 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-8 py-4">
        <p className="text-[24px] font-light leading-[1.35] tracking-[-0.015em] text-fg-primary">
          The line does not fail on the big slip — it fails on the one the
          central stack never saw in time.
        </p>
      </div>

      <SlideCitation size="large">
        Sources &amp; Literature Anchors: Siemens &amp; Senseye, True Cost of
        Downtime Report; Vanson Bourne Cross-Sector Automation Survey; IEEE
        Access, Vol. 11: Real-Time Closed-Loop Constraints.
      </SlideCitation>

      <SlideFooter pageLabel="19 · Case Study 03" />
    </Slide>
  );
}
