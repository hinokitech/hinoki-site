import React from "react";
import caseStudiesRobotProfessorSrc from "../../../public/assets/case-studies-robot-professor.png";
import { Slide } from "../slides";
import { SlideFooter } from "./slide-footer";

export function CaseStudiesSlide() {
  return (
    <Slide align="start">
      <div className="grid flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-14">
        <h2 className="text-[108px] font-light leading-[1.02] tracking-[-0.028em] text-fg-primary">
          Case Studies
        </h2>
        <div className="flex h-[820px] items-center justify-center overflow-visible">
          <img
            src={caseStudiesRobotProfessorSrc.src}
            alt="Robot professor pointing at a chalkboard"
            width={caseStudiesRobotProfessorSrc.width}
            height={caseStudiesRobotProfessorSrc.height}
            className="max-h-full max-w-full object-contain object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="14 · Case Studies" />
    </Slide>
  );
}
