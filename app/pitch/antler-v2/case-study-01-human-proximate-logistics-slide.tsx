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
    <div className="flex flex-col border-l-2 border-accent pl-7">
      <div className="font-mono text-[17px] font-semibold uppercase tracking-[0.14em] text-accent">
        {title}
      </div>
      <p className="mt-4 text-[46px] font-light leading-[1.12] tracking-[-0.02em] text-fg-primary">
        {headline}
      </p>
      <p className="mt-4 text-[26px] leading-[1.4] text-fg-secondary">
        {detail}
      </p>
    </div>
  );
}

export function CaseStudy01HumanProximateLogisticsSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Case Study 01 · Human-Proximate Logistics</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
        Humanoids drop — and the unit economics break.
      </h2>

      <div className="mt-6 grid max-w-[1640px] shrink-0 grid-cols-2 gap-x-14 gap-y-3">
        <div>
          <CaseStudyLabel>The setting</CaseStudyLabel>
          <p className="mt-4 text-[34px] font-light leading-[1.32] tracking-[-0.015em] text-fg-secondary">
            Two-shift parcel sorting · RaaS at{" "}
            <span className="font-semibold text-fg-primary">~$6,000/unit/mo</span>
            {" · "}
            <span className="font-semibold text-fg-primary">6-month payback</span>{" "}
            underwritten.
          </p>
        </div>
        <div>
          <CaseStudyLabel>Where it breaks</CaseStudyLabel>
          <p className="mt-4 text-[34px] font-light leading-[1.32] tracking-[-0.015em] text-fg-secondary">
            Central WBC misses micro-slips in a{" "}
            <span className="font-semibold text-accent">20–40 ms</span> blind
            window — reacts after the item is already moving.
          </p>
        </div>
      </div>

      <div className="mt-8 flex min-h-0 flex-1 max-w-[1640px] flex-col">
        <CaseStudyLabel large>What it costs</CaseStudyLabel>
        <div className="mt-5 grid flex-1 grid-cols-2 items-center gap-12">
          <CostProblem
            title="15+ Month Payback Bloat"
            headline={
              <>
                <span className="font-semibold">6 months</span> →{" "}
                <span className="font-semibold text-accent">15+ months</span>
              </>
            }
            detail={
              <>
                Frequent drops force human intervention. Active utilization
                falls — and the commercial payback window balloons past what
                operators underwrote.
              </>
            }
          />
          <CostProblem
            title="Actuator Mechanical Fracture"
            headline={
              <>
                <span className="font-semibold">$5,000/yr</span> maintenance
                budget —{" "}
                <span className="font-semibold text-accent">blown</span>
              </>
            }
            detail={
              <>
                Late, overcompensated torque from the central stack spikes
                current into the fingers — backdriving harmonic and strain-wave
                gearboxes the model never priced in.
              </>
            }
          />
        </div>
      </div>

      <div className="mt-4 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-8 py-4">
        <p className="text-[24px] font-light leading-[1.35] tracking-[-0.015em] text-fg-primary">
          Two compounding line items — both outside the operator&rsquo;s
          underwritten model.
        </p>
      </div>

      <SlideCitation size="large">
        Sources: McKinsey, Turning Humanoid Supply Chain Constraints into
        Billion-Dollar Wins (2026); Barclays Equity Gilt Robotics Outlook
        (2026); IDTechEx Autonomous Warehouse TCO Datasets.
      </SlideCitation>

      <SlideFooter pageLabel="15 · Case Study 01" />
    </Slide>
  );
}
