import React from "react";
import caseStudy02PilotPurgatorySrc from "../../../public/assets/case-study-02-pilot-purgatory.png";
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

export function CaseStudy02PilotPurgatorySlide() {
  return (
    <Slide align="start">
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,620px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <Eyebrow>Case Study 02 · Pilot Purgatory</Eyebrow>
          <h2 className="mt-0 max-w-[900px] text-[56px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
            20,000 shipped.{" "}
            <span className="font-semibold text-accent">2,500</span> actually
            working.
          </h2>

          <div className="mt-10 flex flex-1 flex-col justify-center gap-9">
            <CaseStudyRow label="Setup">
              McKinsey calls it{" "}
              <span className="font-semibold text-fg-primary">
                &ldquo;pilot purgatory&rdquo;
              </span>
              :{" "}
              <span className="font-semibold text-fg-primary">20,000</span>{" "}
              humanoids shipped, only{" "}
              <span className="font-semibold text-accent">~2,500</span> truly
              deployed.
            </CaseStudyRow>

            <CaseStudyRow label="Break">
              They can&rsquo;t work cage-free next to people. The brain is too
              slow to catch a slip before it&rsquo;s a hazard.
            </CaseStudyRow>

            <CaseStudyRow label="Cost">
              BOM stuck at{" "}
              <span className="font-semibold text-fg-primary">
                $30K–$150K/unit
              </span>
              {" · "}
              <span className="font-semibold text-accent">3–5 yr</span> delay
              into a{" "}
              <span className="font-semibold text-fg-primary">
                $300B–$750B
              </span>{" "}
              market
            </CaseStudyRow>
          </div>

          <SlideCitation size="large">
            Sources: McKinsey, Humanoid Robots: Crossing the Chasm from Concept to
            Commercial Reality (Oct 2025); McKinsey, Turning Humanoid Supply Chain
            Constraints into Billion-Dollar Wins (Apr 2026); Roland Berger,
            Humanoid Robots 2026 (2026); Interact Analysis Motion Control
            Compendium (May 2026).
          </SlideCitation>
        </div>

        <div className="flex min-h-0 items-center justify-center overflow-hidden rounded-[12px]">
          <img
            src={caseStudy02PilotPurgatorySrc.src}
            alt="Humanoid robot isolated inside a safety cage while human workers operate cage-free nearby on a factory floor"
            width={caseStudy02PilotPurgatorySrc.width}
            height={caseStudy02PilotPurgatorySrc.height}
            className="max-h-full max-w-full object-cover object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="17 · Case Study 02" />
    </Slide>
  );
}
