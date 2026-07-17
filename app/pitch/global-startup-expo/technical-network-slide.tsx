import React from "react";
import { Slide, SlideFooter, DeckSlideHeader } from "./slides";

const ADVISOR_NETWORK = [
  {
    area: "Physical HRI",
    affiliation: "PhD, University of Tsukuba · Professor, PUCP",
    deRisks:
      "Human-robot interaction and physical validation for human-proximate systems.",
    status: "Verbal agreement",
    emphasis: true,
  },
  {
    area: "Mechatronics",
    affiliation:
      "PhD, University of Tsukuba · Associate Professor, Nagoya University",
    deRisks:
      "Sensor-actuator integration and path from architecture to hardware testing.",
    status: "Verbal agreement",
    emphasis: true,
  },
  {
    area: "Neuromorphic Networks",
    affiliation: "PhD, University of Tokyo",
    deRisks: "Neuromorphic architecture and future IP.",
    status: "From July",
    emphasis: false,
  },
  {
    area: "Japanese B2B Hardware expert",
    affiliation:
      "2+ decades of experience in deep tech hardware in Japan and globally",
    deRisks:
      "Warm intro to supply chains, partnerships, customers",
    status: "From July",
    emphasis: false,
  },
] as const;

function AdvisorNetworkRow({
  area,
  affiliation,
  deRisks,
  status,
  emphasis = false,
}: {
  area: string;
  affiliation: string;
  deRisks: string;
  status: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[minmax(0,260px)_1fr_minmax(0,168px)] items-start gap-x-12 border-l-[3px] py-5 pl-6 ${
        emphasis ? "border-l-accent" : "border-l-border/80"
      }`}
    >
      <div className="pt-0.5">
        <p className="text-[30px] font-medium leading-[1.15] tracking-[-0.015em] text-fg-primary">
          {area}
        </p>
      </div>
      <div className="min-w-0">
        <p className="text-[22px] font-medium leading-[1.35] text-fg-primary">
          {affiliation}
        </p>
        <p className="mt-2 text-[20px] leading-[1.45] text-fg-secondary">
          {deRisks}
        </p>
      </div>
      <div className="flex justify-end pt-1">
        <span
          className={`inline-block rounded-full px-3 py-1.5 text-center font-mono text-[12px] uppercase leading-[1.3] tracking-[0.08em] ${
            emphasis
              ? "bg-accent/12 text-accent"
              : "bg-bg-subtle text-fg-caption"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export function TechnicalNetworkSlide() {
  return (
    <Slide align="start">
      <DeckSlideHeader
        eyebrow="Technical Network"
        wide
        title="A researcher network that de-risks validation."
        subtitle={
          <>
            Four advisors covering human-robot interaction, mechatronics,
            neuromorphic architecture, and Japan&rsquo;s national robotics
            ecosystem.{" "}
            <span className="font-mono text-[16px] tracking-[0.06em] text-fg-caption">
              Status · June 2026
            </span>
          </>
        }
        className="max-w-[1640px]"
      />

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <div className="flex flex-col divide-y divide-border/60">
          {ADVISOR_NETWORK.map((advisor) => (
            <AdvisorNetworkRow key={advisor.area} {...advisor} />
          ))}
        </div>

        <div className="mt-auto max-w-[1640px] shrink-0 border-t border-border pt-4">
          <p className="max-w-[1640px] text-[22px] font-light leading-[1.4] tracking-[-0.01em] text-fg-secondary">
            <span className="font-semibold text-fg-primary">
              Two verbal agreements secured.
            </span>{" "}
            Two more in active discussion — each covering a distinct technical
            risk on the path to embedded <span className="italic">Arc</span> IP.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="Appendix 2 · Technical Network" />
    </Slide>
  );
}
