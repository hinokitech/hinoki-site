import React from "react";
import caseStudy01SolutionSrc from "../../../public/assets/case-study-01-hinoki-solution.png";
import { Slide, Eyebrow, SlideFooter } from "../slides";

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

export function CaseStudy01HinokiSolutionSlide() {
  return (
    <Slide align="start">
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,620px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <Eyebrow className="flex items-center gap-3">
            <span>Case Study 01 · Hinoki Solution</span>
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
            Arc closes the blind window.
          </h2>

          <div className="mt-10 flex flex-1 flex-col justify-center gap-9">
            <SolutionRow label="What Arc does">
              Tactile data routes straight into Arc&rsquo;s local chip, off
              the host bus.               A reflex loop corrects the slip in{" "}
              <span className="font-semibold text-accent">&lt;0.5 ms · modeled</span>
              {" — "}
              before the brain sees it.
            </SolutionRow>

            <SolutionRow label="Result">
              No drop. No gearbox wear. The{" "}
              <span className="font-semibold text-accent">6-month payback</span>{" "}
              holds.
            </SolutionRow>
          </div>
        </div>

        <div className="flex min-h-0 items-center justify-center overflow-hidden rounded-[12px]">
          <img
            src={caseStudy01SolutionSrc.src}
            alt="Humanoid robot securely gripping a parcel on a warehouse conveyor with local reflex hardware at the gripper"
            width={caseStudy01SolutionSrc.width}
            height={caseStudy01SolutionSrc.height}
            className="max-h-full max-w-full object-cover object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="16 · Hinoki Solution 01" />
    </Slide>
  );
}
