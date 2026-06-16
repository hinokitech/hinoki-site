import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";

const VISION_2035_ROWS = [
  {
    arr: "$7.5B ARR",
    vertical: "Humanoid Robotics (The High-Axis Crown Jewel)",
    math: (
      <>
        500,000 Robots/yr × $15,000 Royalty{" "}
        <span className="text-fg-caption">(30 moving axes × $500)</span>
      </>
    ),
  },
  {
    arr: "$2.0B ARR",
    vertical: "Next-Gen Automotive (EV Active Suspension)",
    math: (
      <>
        1,000,000 Premium EVs/yr × $2,000 Royalty{" "}
        <span className="text-fg-caption">(4 dynamic corners × $500)</span>
      </>
    ),
  },
  {
    arr: "$500M ARR",
    vertical: "Industrial Automation (Mature Beachhead)",
    math: <>1,000,000 Embedded Units/yr × $500 Royalty</>,
  },
] as const;

const VISION_2035_OTHER_VERTICALS = [
  "Social robotics / AMRs",
  "Defense UAVs / swarms",
  "PGMs / guided munitions",
  "Assistive exoskeletons",
  "Bionic prosthetics",
] as const;

function Vision2035Row({
  arr,
  vertical,
  math,
}: (typeof VISION_2035_ROWS)[number]) {
  return (
    <div className="flex flex-1 flex-col justify-center border-b border-border py-5">
      <div className="grid grid-cols-[minmax(0,320px)_1fr] items-start gap-x-10">
        <div className="font-mono text-[28px] font-semibold tracking-[-0.02em] text-accent">
          {arr}
        </div>
        <div>
          <p className="text-[20px] font-semibold leading-[1.35] text-fg-primary">
            {vertical}
          </p>
          <p className="mt-2 text-[22px] font-normal leading-[1.55] text-fg-primary">
            {math}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Vision2035Slide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">2035 Vision</Eyebrow>
          <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            The Physical AI Monopoly
          </h2>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          {VISION_2035_ROWS.map((row) => (
            <Vision2035Row key={row.arr} {...row} />
          ))}

          <div className="mt-2 shrink-0 border-t border-border pt-5">
            <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-secondary">
              Other verticals we will capture
            </p>
            <ul className="mt-3 columns-2 gap-x-12 text-[18px] leading-[1.65] text-fg-primary">
              {VISION_2035_OTHER_VERTICALS.map((vertical) => (
                <li key={vertical} className="flex break-inside-avoid gap-2.5">
                  <span className="shrink-0 text-accent" aria-hidden>
                    ·
                  </span>
                  <span>{vertical}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 shrink-0 max-w-[1640px] text-[32px] font-semibold leading-[1.35] tracking-[-0.018em] text-fg-primary">
          Total 2035 Run-Rate:{" "}
          <span className="text-accent">$10B+ ARR</span>
        </p>
      </div>

      <SlideFooter pageLabel="14 · 2035 Vision" />
    </Slide>
  );
}
