import React from "react";
import { Slide, SlideFooter, DeckSlideHeader } from "./slides";

const WEBSITE_ROADMAP = [
  {
    period: "2026 · Q2",
    title: "Integration with High FPS cameras",
    completed: true,
  },
  {
    period: "2026 · Q3",
    title: "Integration with High Fidelity tactile sensors",
  },
  {
    period: "2026 · Q4",
    title: "Integration with Event Based Visual cameras",
  },
  {
    period: "2027 · Q1",
    title: "Sensor Fusion — Multi-stream sensors",
  },
] as const;

function RoadmapCheckmark() {
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15"
      aria-label="Completed"
    >
      <svg
        viewBox="0 0 12 12"
        className="h-3 w-3 stroke-accent"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M2.5 6l2.5 2.5 4.5-4.5" />
      </svg>
    </span>
  );
}

export function WebsiteRoadmapSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col max-w-[1640px]">
        <DeckSlideHeader
          eyebrow="Near-Term Roadmap"
          title={
            <>
              The next{" "}
              <span className="text-gradient-logo">four quarters.</span>
            </>
          }
          subtitle="Sensor integrations executing now — Q2 2026 through Q1 2027."
        />

        <div className="mt-10 flex min-h-0 flex-1 items-start gap-20">
          <p className="max-w-[420px] shrink-0 pt-2 text-[22px] leading-[1.55] text-fg-secondary">
            Live milestones on the path to multi-stream sensor fusion at the
            edge. Q2 complete — Q3 in progress.
          </p>

          <ol className="relative min-w-0 flex-1 max-w-[760px]">
            <span
              aria-hidden
              className="absolute bottom-4 left-0 top-4 w-px bg-border"
            />
            {WEBSITE_ROADMAP.map((item) => (
              <li key={item.period} className="relative py-5 pl-10 first:pt-0">
                <span
                  aria-hidden
                  className="absolute left-0 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent"
                />
                <p className="flex items-center gap-2.5 font-mono text-[14px] uppercase tracking-[0.22em] text-accent">
                  <span>{item.period}</span>
                  {"completed" in item && item.completed ? (
                    <RoadmapCheckmark />
                  ) : null}
                </p>
                <p className="mt-2.5 text-[26px] leading-[1.45] text-fg-primary">
                  {item.title}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-auto shrink-0 pt-8 text-[18px] leading-[1.6] text-fg-secondary">
          Selectively engaging aligned partners and investors.
        </p>
      </div>

      <SlideFooter pageLabel="15 · Near-Term Roadmap" />
    </Slide>
  );
}
