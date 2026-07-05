import React from "react";
import caseStudy01HumanoidSrc from "../../../public/assets/case-study-01-humanoid-parcel-sorting.png";
import { Slide, Eyebrow, SlideCitation } from "../slides";
import { SlideFooter } from "./slide-footer";

function CaseStudyLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[18px] uppercase tracking-[0.16em] text-accent">
      {children}
    </div>
  );
}

function CaseStudyRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-accent pl-7">
      <CaseStudyLabel>{label}</CaseStudyLabel>
      <p className="mt-3 text-[34px] font-light leading-[1.32] tracking-[-0.015em] text-fg-secondary">
        {children}
      </p>
    </div>
  );
}

export function CaseStudy01HumanProximateLogisticsSlide() {
  return (
    <Slide align="start">
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,620px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <Eyebrow>Case Study 01 · Human-Proximate Logistics</Eyebrow>
          <h2 className="mt-0 max-w-[900px] text-[56px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
            When robots drop, the unit economics break.
          </h2>

          <div className="mt-10 flex flex-1 flex-col justify-center gap-9">
            <CaseStudyRow label="Setup">
              Parcel-sorting humanoid. Leased at{" "}
              <span className="font-semibold text-fg-primary">~$6,000/mo</span>.
              Underwritten for a{" "}
              <span className="font-semibold text-fg-primary">6-month payback</span>.
            </CaseStudyRow>

            <CaseStudyRow label="Break">
              The central brain misses micro-slips in a{" "}
              <span className="font-semibold text-accent">20–40 ms</span> blind
              window. It reacts after the drop.
            </CaseStudyRow>

            <CaseStudyRow label="Cost">
              Payback:{" "}
              <span className="font-semibold text-fg-primary">6 mo</span>
              {" → "}
              <span className="font-semibold text-accent">15+ mo</span>
              {" · "}
              Maintenance:{" "}
              <span className="font-semibold text-fg-primary">$5K/yr</span> budget,{" "}
              <span className="font-semibold text-accent">blown</span>
            </CaseStudyRow>
          </div>

          <SlideCitation size="large">
            Sources: McKinsey, Turning Humanoid Supply Chain Constraints into
            Billion-Dollar Wins (2026); Barclays Equity Gilt Robotics Outlook
            (2026); IDTechEx Autonomous Warehouse TCO Datasets.
          </SlideCitation>
        </div>

        <div className="flex min-h-0 items-center justify-center overflow-hidden rounded-[12px]">
          <img
            src={caseStudy01HumanoidSrc.src}
            alt="Commercial humanoid robot sorting parcels on a warehouse conveyor beside human workers"
            width={caseStudy01HumanoidSrc.width}
            height={caseStudy01HumanoidSrc.height}
            className="max-h-full max-w-full object-cover object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="15 · Case Study 01" />
    </Slide>
  );
}
