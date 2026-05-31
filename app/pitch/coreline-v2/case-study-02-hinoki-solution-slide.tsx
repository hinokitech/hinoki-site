import React from "react";
import caseStudy02SolutionSrc from "../../../public/assets/case-study-02-hinoki-solution.png";
import { Slide, Eyebrow } from "../slides";
import { SlideFooter } from "./slide-footer";

function SolutionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[18px] uppercase tracking-[0.16em] text-accent">
      {children}
    </div>
  );
}

function SolutionRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-accent pl-7">
      <SolutionLabel>{label}</SolutionLabel>
      <p className="mt-3 text-[34px] font-light leading-[1.32] tracking-[-0.015em] text-fg-secondary">
        {children}
      </p>
    </div>
  );
}

export function CaseStudy02HinokiSolutionSlide() {
  return (
    <Slide align="start">
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,620px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <Eyebrow className="flex items-center gap-3">
            <span>Case Study 02 · Hinoki Solution</span>
            <img
              src="/assets/logo-hinoki-tree.png"
              alt=""
              width={72}
              height={72}
              className="block h-[72px] w-[72px] shrink-0 object-contain"
              aria-hidden
            />
          </Eyebrow>
          <h2 className="mt-0 max-w-[900px] text-[56px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
            Arc opens the fenceless floor.
          </h2>

          <div className="mt-10 flex flex-1 flex-col justify-center gap-9">
            <SolutionRow label="What Arc does">
              Reaction intelligence that drops into existing grippers and sensors —
              no robot redesign. Caps contact force and arrests slips locally,
              in{" "}
              <span className="font-semibold text-accent">&lt;1.0 ms · modeled</span>.
            </SolutionRow>

            <SolutionRow label="Result">
              Contributing to the cage-free safety layer McKinsey says is
              missing — so humanoids can finally scale.
            </SolutionRow>
          </div>
        </div>

        <div className="flex min-h-0 items-center justify-center overflow-hidden rounded-[12px]">
          <img
            src={caseStudy02SolutionSrc.src}
            alt="Humanoid robot working cage-free alongside human workers on a factory floor"
            width={caseStudy02SolutionSrc.width}
            height={caseStudy02SolutionSrc.height}
            className="max-h-full max-w-full object-cover object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="18 · Hinoki Solution 02" />
    </Slide>
  );
}
