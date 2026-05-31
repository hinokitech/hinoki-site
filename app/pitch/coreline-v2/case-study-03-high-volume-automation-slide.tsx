import React from "react";
import caseStudy03HighVolumeSrc from "../../../public/assets/case-study-03-high-volume-automation.png";
import { Slide, Eyebrow, SlideFooter, SlideCitation } from "../slides";

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

export function CaseStudy03HighVolumeAutomationSlide() {
  return (
    <Slide align="start">
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,620px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <Eyebrow>Case Study 03 · High-Volume Automation</Eyebrow>
          <h2 className="mt-0 max-w-[900px] text-[56px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
            One micro-slip stops the whole line.
          </h2>

          <div className="mt-10 flex flex-1 flex-col justify-center gap-9">
            <CaseStudyRow label="Setup">
              <span className="font-semibold text-fg-primary">
                24/7 pick-and-place
              </span>
              . Friction shifts every cycle. The slip hits before the planner
              can react.
            </CaseStudyRow>

            <CaseStudyRow label="Cost">
              <span className="font-semibold text-accent">44%</span> of line
              stops are these micro-failures{" · "}
              <span className="font-semibold text-fg-primary">$22,000/min</span>{" "}
              when a line stops{" · "}
              <span className="font-semibold text-accent">$50B/yr</span>{" "}
              leaking industry-wide
            </CaseStudyRow>
          </div>

          <SlideCitation size="large">
            Sources &amp; Literature Anchors: Siemens &amp; Senseye, True Cost of
            Downtime Report; Vanson Bourne Cross-Sector Automation Survey; IEEE
            Access, Vol. 11: Real-Time Closed-Loop Constraints.
          </SlideCitation>
        </div>

        <div className="flex min-h-0 items-center justify-center overflow-hidden rounded-[12px]">
          <img
            src={caseStudy03HighVolumeSrc.src}
            alt="Industrial pick-and-place robot line stopped after a micro-slip at a gripper station"
            width={caseStudy03HighVolumeSrc.width}
            height={caseStudy03HighVolumeSrc.height}
            className="max-h-full max-w-full object-cover object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="19 · Case Study 03" />
    </Slide>
  );
}
