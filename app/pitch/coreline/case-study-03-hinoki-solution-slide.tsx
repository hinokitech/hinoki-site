import React from "react";
import caseStudy03SolutionSrc from "../../../public/assets/case-study-03-hinoki-solution.png";
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

export function CaseStudy03HinokiSolutionSlide() {
  return (
    <Slide align="start">
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,620px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <Eyebrow className="flex items-center gap-3">
            <span>Case Study 03 · Hinoki Solution</span>
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
            Recovery before the line stops.
          </h2>

          <div className="mt-10 flex flex-1 flex-col justify-center gap-9">
            <SolutionRow label="What Arc does">
              Logic mapped onto the chip, no memory fetches — Arc detects the
              micro-slips in{" "}
              <span className="font-semibold text-accent">&lt;1.0 ms</span>, on{" "}
              <span className="font-semibold text-accent">0.14 mJ</span>.
            </SolutionRow>

            <SolutionRow label="Result">
              The micro-stop never happens. The line keeps running.
            </SolutionRow>
          </div>
        </div>

        <div className="flex min-h-0 items-center justify-center overflow-hidden rounded-[12px]">
          <img
            src={caseStudy03SolutionSrc.src}
            alt="Industrial pick-and-place robot line running smoothly with a secure grip on a component"
            width={caseStudy03SolutionSrc.width}
            height={caseStudy03SolutionSrc.height}
            className="max-h-full max-w-full object-cover object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="20 · Hinoki Solution 03" />
    </Slide>
  );
}
