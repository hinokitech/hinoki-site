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

export function CaseStudy02PilotPurgatorySlide() {
  return (
    <Slide align="start">
      <Eyebrow>Case Study 02 · Pilot Purgatory</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
        The fenceless safety &amp; actuator bandwidth bottleneck.
      </h2>

      <div className="mt-6 max-w-[1640px] shrink-0">
        <CaseStudyLabel>The failure profile</CaseStudyLabel>
        <div className="mt-4 grid grid-cols-2 gap-x-14 gap-y-4">
          <div>
            <p className="text-[34px] font-light leading-[1.32] tracking-[-0.015em] text-fg-secondary">
              <span className="font-semibold text-fg-primary">
                20,000 Humanoid units shipped
              </span>{" "}
              — but only{" "}
              <span className="font-semibold text-accent">~2,500</span> in
              active commercial field deployment.
            </p>
          </div>
          <div>
            <p className="text-[34px] font-light leading-[1.32] tracking-[-0.015em] text-fg-secondary">
              McKinsey&rsquo;s{" "}
              <span className="font-semibold text-fg-primary">
                &ldquo;Pilot Purgatory&rdquo;
              </span>{" "}
              — humanoids cannot cross the cage-free safety bridge alongside
              human workers.
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-[1640px] text-[30px] font-light leading-[1.35] tracking-[-0.015em] text-fg-secondary">
          Central stacks lack biological bandwidth — blind to micro-slips until
          an item is already dropped or crushed.
        </p>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 max-w-[1640px] flex-col">
        <CaseStudyLabel large>What it costs</CaseStudyLabel>
        <div className="mt-5 grid flex-1 grid-cols-2 items-center gap-12">
          <CostProblem
            title="$30K–$150K BOM Trap"
            headline={
              <>
                <span className="font-semibold">$30K–$150K</span> per unit —{" "}
                <span className="font-semibold text-accent">locked</span>
              </>
            }
            detail={
              <>
                Latency blocks fenceless operation, so volumes never scale.
                Suppliers cannot build production lines — BOM stays
                uneconomical.
              </>
            }
          />
          <CostProblem
            title="3–5 Year Commercialization Delay"
            headline={
              <>
                <span className="font-semibold">3–5 years</span> scaling{" "}
                <span className="font-semibold text-accent">frozen</span>
              </>
            }
            detail={
              <>
                Sensor ingestion and control-sync latency stall industrial
                deployment — delaying access to a{" "}
                <span className="font-semibold text-fg-primary">
                  $300B–$750B
                </span>{" "}
                automation market.
              </>
            }
          />
        </div>
      </div>

      <div className="mt-4 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-8 py-4">
        <p className="text-[24px] font-light leading-[1.35] tracking-[-0.015em] text-fg-primary">
          A structural reflex deficit — keeping humanoids out of fenceless
          workplaces and out of enterprise scale.
        </p>
      </div>

      <SlideCitation size="large">
        Sources: McKinsey, Humanoid Robots: Crossing the Chasm from Concept to
        Commercial Reality (Oct 2025); McKinsey, Turning Humanoid Supply Chain
        Constraints into Billion-Dollar Wins (Apr 2026); Roland Berger,
        Humanoid Robots 2026 (2026); Interact Analysis Motion Control
        Compendium (May 2026).
      </SlideCitation>

      <SlideFooter pageLabel="17 · Case Study 02" />
    </Slide>
  );
}
