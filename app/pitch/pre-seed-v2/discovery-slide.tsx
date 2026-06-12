import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";

function DiscoveryQuote({
  attribution,
  quote,
}: {
  attribution?: string;
  quote: string;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center border-l-2 border-accent/40 pl-7">
      {attribution ? (
        <div className="font-mono text-[16px] font-semibold uppercase tracking-[0.14em] text-accent">
          {attribution}
        </div>
      ) : null}
      <p
        className={`text-[42px] font-light leading-[1.15] tracking-[-0.015em] text-fg-primary ${
          attribution ? "mt-3" : ""
        }`}
      >
        {quote}
      </p>
    </div>
  );
}

export function DiscoverySlide() {
  return (
    <Slide align="start">
      <Eyebrow>Discovery</Eyebrow>
      <h2 className="max-w-[1640px] text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        What engineers are telling us so far.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[28px] font-normal leading-[1.45] text-fg-secondary">
        Discovery is narrowing Arc to one first measurable control loop.
      </p>

      <div className="mt-10 flex max-w-[1640px] flex-1 flex-col gap-6 py-4">
        <DiscoveryQuote
          attribution="Technical Lead · AI & Robotics · Accenture"
          quote="Latency matters at the physical edge."
        />
        <DiscoveryQuote
          attribution="Field Application Engineer · Rapyuta Robotics"
          quote="Slip shows up before the control loop reacts."
        />
        <DiscoveryQuote
          attribution="CEO · Tokyo-based advanced gripper manufacturer"
          quote="Our sensors are state of the art, but drops still happen."
        />
      </div>

      <p className="max-w-[1640px] text-[32px] font-light leading-[1.35] tracking-[-0.015em] text-fg-secondary">
        Our validation:{" "}
        <span className="font-semibold text-fg-primary">
          micro slip arrest to solve gripper drops.
        </span>
      </p>

      <SlideFooter pageLabel="20 · Discovery" />
    </Slide>
  );
}
