import React from "react";
import { ArcIntegrationCanvas } from "../../reflex/ArcIntegrationCanvas";
import {
  Slide,
  Eyebrow,
  SlideFooter,
  FounderCard,
} from "../slides";

// =====================================================================
//  HINOKI — 1stROUND APPLICATION DECK (source of truth)
//
//  Copy and structure: edit this file first. Sync mobile-1stround.tsx in
//  one pass after deck changes are complete — do not update mobile per edit.
//
//  Non-dilutive validation funding application. Same Hinoki design
//  language as the pre-seed deck (warm off-white background, dotted
//  grid, rounded cards, restrained orange accent, muted blue-gray
//  conventional-system elements, minimalist typography). Tone is
//  practical, technical, validation-focused — not VC hype.
//
//  Slide canvas: 1920×1080 (PitchDeck.tsx handles scaling).
//  Shared atoms (Slide, Eyebrow, SlideFooter, FounderCard) are imported
//  from ../slides so visual language stays in lock-step with the
//  pre-seed deck.
// =====================================================================

// ---------------------------------------------------------------------
//  Shared local atoms used across this deck
// ---------------------------------------------------------------------
function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span
          key={it}
          className="rounded-full border border-border bg-bg-subtle px-4 py-1.5 text-[18px] font-normal leading-[1.2] text-fg-secondary"
        >
          {it}
        </span>
      ))}
    </div>
  );
}

function BenefitPillar({
  title,
  body,
  outcome,
}: {
  title: string;
  body: string;
  outcome: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="text-[36px] font-light leading-[1.1] tracking-[-0.015em] text-accent">
        {title}
      </div>
      {/* Fixed min-height keeps outcome rows aligned across cards even when
          body copy wraps to a different number of lines. */}
      <div className="mt-5 min-h-[110px] text-[16px] leading-[1.6] text-fg-secondary">
        {body}
      </div>
      <div className="mt-auto pt-6">
        <div className="border-l-[3px] border-accent pl-4 text-[18px] font-medium leading-[1.4] text-fg-primary">
          {outcome}
        </div>
      </div>
    </div>
  );
}

function FlowBox({
  label,
  emphasis = false,
}: {
  label: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-[88px] min-w-[180px] flex-1 items-center justify-center rounded-[8px] border px-5 text-center text-[18px] font-medium leading-[1.25] ${
        emphasis
          ? "border-accent bg-accent-subtle text-fg-primary"
          : "border-border bg-bg-subtle text-fg-primary"
      }`}
    >
      {label}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex shrink-0 items-center px-2 text-[28px] font-light text-fg-tertiary">
      →
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
      {children}
    </div>
  );
}

function MutedLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-fg-tertiary">
      {children}
    </div>
  );
}

function MetricGroup({
  group,
  items,
}: {
  group: string;
  items: string[];
}) {
  return (
    <div className="rounded-[8px] border border-border bg-bg-subtle px-5 py-4">
      <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
        {group}
      </div>
      <ul className="mt-2 space-y-1 text-[15px] leading-[1.5] text-fg-secondary">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="text-fg-tertiary">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------
//  Neural motif — borrowed from the website hero. Static SVG so the
//  motion is preserved on screen but the deck PDF/print stays calm.
// ---------------------------------------------------------------------
function NeuralMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      <style>{`
        .hn-node-1st {
          transform-box: fill-box;
          transform-origin: center;
          animation: hn-breathe-1st 2.6s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes hn-breathe-1st {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
      `}</style>
      <path d="M60 200 C120 140, 200 260, 300 180 S460 120, 520 160" stroke="#E8622A" strokeWidth="1" opacity="0.3" />
      <path d="M40 240 C110 170, 220 300, 330 210 S490 150, 540 200" stroke="#C42B2B" strokeWidth="1" opacity="0.2" />
      <path d="M80 160 C150 100, 260 240, 360 150 S500 90, 550 120" stroke="#E8622A" strokeWidth="0.8" opacity="0.2" />
      <path d="M30 280 C100 200, 210 340, 310 240" stroke="#E8622A" strokeWidth="0.8" opacity="0.15" />

      <circle cx="60" cy="200" r="28" fill="#E8622A" opacity="0.08" />
      <circle cx="60" cy="200" r="16" fill="#E8622A" opacity="0.12" />
      <circle className="hn-node-1st" cx="60" cy="200" r="7" fill="#E8622A" opacity="0.9" />

      <circle cx="190" cy="155" r="20" fill="#C42B2B" opacity="0.08" />
      <circle cx="190" cy="155" r="10" fill="#C42B2B" opacity="0.12" />
      <circle className="hn-node-1st" style={{ animationDelay: "-430ms" }} cx="190" cy="155" r="5" fill="#C42B2B" opacity="0.85" />

      <circle cx="300" cy="185" r="22" fill="#E8622A" opacity="0.08" />
      <circle cx="300" cy="185" r="12" fill="#E8622A" opacity="0.12" />
      <circle className="hn-node-1st" style={{ animationDelay: "-860ms" }} cx="300" cy="185" r="6" fill="#E8622A" opacity="0.85" />

      <circle cx="420" cy="140" r="18" fill="#C42B2B" opacity="0.07" />
      <circle cx="420" cy="140" r="9" fill="#C42B2B" opacity="0.1" />
      <circle className="hn-node-1st" style={{ animationDelay: "-1210ms" }} cx="420" cy="140" r="4.5" fill="#C42B2B" opacity="0.8" />

      <circle cx="130" cy="260" r="14" fill="#E8622A" opacity="0.07" />
      <circle className="hn-node-1st" style={{ animationDelay: "-1570ms" }} cx="130" cy="260" r="4" fill="#E8622A" opacity="0.7" />

      <circle cx="500" cy="175" r="12" fill="#E8622A" opacity="0.07" />
      <circle className="hn-node-1st" style={{ animationDelay: "-1910ms" }} cx="500" cy="175" r="4" fill="#E8622A" opacity="0.7" />

      <line x1="60" y1="200" x2="130" y2="260" stroke="#E8622A" strokeWidth="0.8" opacity="0.25" />
      <line x1="60" y1="200" x2="190" y2="155" stroke="#C42B2B" strokeWidth="0.8" opacity="0.2" />
      <line x1="190" y1="155" x2="300" y2="185" stroke="#E8622A" strokeWidth="0.8" opacity="0.2" />
      <line x1="300" y1="185" x2="420" y2="140" stroke="#C42B2B" strokeWidth="0.8" opacity="0.2" />
      <line x1="420" y1="140" x2="500" y2="175" stroke="#E8622A" strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

// ---------------------------------------------------------------------
//  01 · Title / Company Summary
// ---------------------------------------------------------------------
function TitleSlide() {
  return (
    <Slide>
      <div className="mb-8 flex items-center gap-3 text-[20px] font-semibold uppercase tracking-[0.18em] text-accent">
        <img
          src="/assets/logo-hinoki-tree.png"
          alt=""
          width={50}
          height={50}
          className="block h-[50px] w-[50px] shrink-0 object-contain"
          aria-hidden
        />
        <span>Hinoki Technologies</span>
      </div>
      <h1 className="text-[104px] font-light leading-[1.02] tracking-[-0.025em] text-fg-primary">
        Physical intelligence
        <br />
        for robotic systems.
      </h1>
      <p className="mt-12 max-w-[1180px] text-[28px] font-normal leading-[1.5] text-fg-secondary">
        <span className="italic font-semibold text-fg-primary">Arc</span> is a
        neuromorphic local control layer that helps robots convert sensor data
        into{" "}
        <span className="font-semibold text-fg-primary">
          faster physical response
        </span>
        ,{" "}
        <span className="font-semibold text-fg-primary">
          without replacing the existing controller
        </span>
        .
      </p>

      <p className="mt-4 max-w-[1180px] text-[20px] font-light italic leading-[1.45] text-fg-primary">
        Robots have been given brains.{" "}
        <span className="not-italic font-semibold">
          Arc gives them a nervous system.
        </span>
      </p>

      <div className="mt-10 flex max-w-[1200px] flex-col gap-3 text-[20px] leading-[1.5] text-fg-secondary">
        <div className="flex gap-3">
          <span className="text-accent">·</span>
          <span>Tsukuba-based deep-tech startup</span>
        </div>
        <div className="flex gap-3">
          <span className="text-accent">·</span>
          <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Selected for</span>
            <img
              src="/assets/antler-wordmark.png"
              alt="Antler"
              width={88}
              height={20}
              className="h-[20px] w-auto shrink-0 object-contain object-left"
            />
            <span>Japan Residency, May 2026</span>
          </span>
        </div>
        <div className="flex gap-3">
          <span className="text-accent">·</span>
          <span>
            First benchmark: tactile slip detection &amp; fast gripper response
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[80px] top-[120px] opacity-70"
      >
        <NeuralMotif className="h-auto w-[780px]" />
      </div>

      <div className="absolute bottom-[80px] left-[140px] font-mono text-[16px] tracking-[0.08em] text-fg-tertiary">
        1stRound application · May 2026 · hinokitech.com
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  02 · Problem
// ---------------------------------------------------------------------
function ProblemSlide() {
  const examples = [
    "Object slip",
    "Unstable grasps",
    "Noisy sensor input",
    "Load changes",
    "Changing surfaces",
    "Torque / velocity control",
    "Variable object handling",
    "Real-time precision tasks",
  ];
  return (
    <Slide>
      <Eyebrow>Problem</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Robots can sense and plan,
        <br />
        but still fail in physical response moments.
      </h2>
      <p className="mt-10 max-w-[1500px] text-[24px] font-normal leading-[1.6] text-fg-secondary">
        Robots are improving rapidly in perception, planning, and AI. But
        real-world deployment still breaks down in the physical loop —
        where sensor data must become immediate, reliable action.
      </p>

      <div className="mt-10 max-w-[1500px]">
        <MutedLabel>Where the physical loop breaks down today</MutedLabel>
        <div className="mt-4">
          <ChipList items={examples} />
        </div>
      </div>

      <p className="mt-10 max-w-[1500px] text-[20px] leading-[1.6] text-fg-secondary">
        For robotics companies, this creates{" "}
        <span className="font-semibold text-fg-primary">failed picks</span>,{" "}
        <span className="font-semibold text-fg-primary">unstable handling</span>
        ,{" "}
        <span className="font-semibold text-fg-primary">slower deployment</span>
        , ongoing retuning burden, and reduced reliability in real-world
        environments.
      </p>

      <p className="mt-8 max-w-[1500px] text-[26px] font-normal leading-[1.45] tracking-[-0.01em] text-fg-primary">
        The bottleneck is not only intelligence. It is{" "}
        <span className="font-semibold">
          converting sensor data into reliable physical action
        </span>{" "}
        under real-world conditions.
      </p>
      <SlideFooter pageLabel="02 · Problem" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  03 · Discovery Signals
// ---------------------------------------------------------------------
function DiscoveryCard({
  label,
  headline,
  body,
}: {
  label: string;
  headline: string;
  body: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-5">
      <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      {/* Fixed min-height so bodies align across the row even when
          headlines wrap to a different number of lines. */}
      <div className="mt-3 min-h-[72px] text-[22px] font-light leading-[1.2] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <div className="mt-3 text-[15px] leading-[1.55] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

function EngineerQuote({
  role,
  quote,
}: {
  role: string;
  quote: string;
}) {
  return (
    <div className="rounded-[8px] border border-border bg-bg-subtle px-4 py-3">
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        {role}
      </div>
      <div className="mt-1.5 text-[14px] leading-[1.5] text-fg-secondary">
        &ldquo;{quote}&rdquo;
      </div>
    </div>
  );
}

function DiscoverySlide() {
  return (
    <Slide align="start">
      <Eyebrow>Discovery</Eyebrow>
      <h2 className="text-[60px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        What engineers are telling us.
      </h2>
      <p className="mt-4 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        Customer discovery is narrowing Arc from a broad architecture thesis
        into a measurable first control-loop benchmark.
      </p>

      <div className="mt-7 grid max-w-[1640px] grid-cols-3 gap-5">
        <DiscoveryCard
          label="Signal 01"
          headline="Latency matters in specific physical moments."
          body="Engineers confirmed latency can become a bottleneck under tight real-time constraints — especially where response, precision, or speed matter at the actuator."
        />
        <DiscoveryCard
          label="Signal 02"
          headline="Physical variability creates instability."
          body="Changing surfaces, variable loads, wheel slip, noisy sensors, and unpredictable environments create practical control challenges that planning loops alone don't resolve."
        />
        <DiscoveryCard
          label="Signal 03"
          headline="Slip response is a measurable first wedge."
          body="In tactile sensing and gripper control, the problem becomes concrete — detect slip, respond faster, stabilize the object, and compare the result against a conventional digital baseline."
        />
      </div>

      {/* Independent engineer confirmation — anonymized by role, paraphrased */}
      <div className="mt-6 max-w-[1640px]">
        <MutedLabel>Independent confirmation — engineer voices</MutedLabel>
        <div className="mt-3 grid grid-cols-4 gap-3">
          <EngineerQuote
            role="AMR torque-control engineer"
            quote="Wheel slip and torque-vs-velocity control are real issues — strip the layers, measure direct sensor latency, then add back."
          />
          <EngineerQuote
            role="Field robotics engineer"
            quote="Latency and power consumption at the control layer can definitely become pain points where real-time responsiveness and precision are critical."
          />
          <EngineerQuote
            role="Bipedal humanoid researcher (TUM)"
            quote="Current humanoid control stacks have real architectural limits before cage-free deployment becomes practical."
          />
          <EngineerQuote
            role="Assistive robotics researcher"
            quote="Real-time response latency is a primary barrier to a natural user experience in exoskeleton control."
          />
        </div>
      </div>

      <p className="mt-5 max-w-[1640px] text-[20px] font-light italic leading-[1.4] text-fg-primary">
        This pushed Hinoki toward a specific first validation benchmark:{" "}
        <span className="not-italic font-semibold">
          tactile slip detection and fast gripper response.
        </span>
      </p>
      <SlideFooter pageLabel="03 · Discovery" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  04 · First Validation Benchmark
// ---------------------------------------------------------------------
function BenchmarkSlide() {
  return (
    <Slide align="start">
      <Eyebrow>First Benchmark</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Tactile slip detection and fast gripper response.
      </h2>
      <p className="mt-4 text-[24px] font-light leading-[1.4] text-fg-secondary">
        Slip detection is the first benchmark — not the final market.
      </p>

      {/* Sensor → Arc → Motor controller → Gripper flow */}
      <div className="mt-10 max-w-[1640px]">
        <MutedLabel>Closed-loop benchmark — tactile sensor to gripper</MutedLabel>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <FlowBox label="Tactile sensor" />
          <FlowArrow />
          <FlowBox label="Arc local reflex layer" emphasis />
          <FlowArrow />
          <FlowBox label="Bounded correction" />
          <FlowArrow />
          <FlowBox label="Motor controller" />
          <FlowArrow />
          <FlowBox label="Gripper stabilizes" />
        </div>
      </div>

      {/* Discovery validation — strongest external signal for this benchmark */}
      <div className="mt-6 max-w-[1640px] rounded-[8px] border border-accent bg-accent-subtle px-6 py-4">
        <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
          Discovery validation · Tactile-sensing partner
        </div>
        <p className="mt-2 text-[18px] leading-[1.5] text-fg-primary">
          Tactile sensing and gripper response identified as a strong initial
          validation direction with a{" "}
          <span className="font-semibold">
            Tokyo-based tactile-sensing leader
          </span>
          .{" "}
          <span className="font-semibold">
            Their CEO has requested the LOI — first technical relationship
            being finalized.
          </span>
        </p>
      </div>

      <div className="mt-8 grid max-w-[1640px] grid-cols-[1fr_1.15fr] gap-x-10">
        <div>
          <SectionLabel>Why this benchmark</SectionLabel>
          <ul className="mt-4 space-y-2.5 text-[17px] leading-[1.55] text-fg-secondary">
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>Concrete, measurable, commercially relevant</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Aligned with tactile sensing partners in Japan
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Proves Arc in one sensor-actuator loop without requiring full
                robot redesign
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Expands naturally into broader robotic manipulation and
                physical response
              </span>
            </li>
          </ul>
        </div>

        <div>
          <SectionLabel>Metrics — grouped by what they prove</SectionLabel>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <MetricGroup
              group="Speed"
              items={[
                "Response time (slip → correction)",
                "Gripper correction speed",
              ]}
            />
            <MetricGroup
              group="Reliability"
              items={[
                "Grasp stability",
                "Failed grasp / drop reduction",
              ]}
            />
            <MetricGroup
              group="Efficiency"
              items={[
                "Energy per corrective response",
                "Arc vs. conventional baseline",
              ]}
            />
            <MetricGroup
              group="Adaptation"
              items={[
                "Variable weight, surface, shape",
                "Robustness to motion / noise",
              ]}
            />
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="04 · First Benchmark" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  05 · Solution / Arc Architecture
// ---------------------------------------------------------------------
function SolutionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Architecture</Eyebrow>
      <h2 className="text-[52px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        <span className="italic">Arc</span> — a local reflex layer for robotic
        systems.
      </h2>
      <p className="mt-2 max-w-[1500px] text-[20px] font-light leading-[1.35] text-fg-secondary">
        Inspired by the spinal reflex arc — the body&rsquo;s fast local pathway
        from sensation to response. The robot keeps its existing controller;
        Arc adds a faster local response loop in selected sensor-actuator
        loops.
      </p>

      <div className="mt-5 max-w-[1640px] overflow-hidden rounded-[12px] border border-border">
        <ArcIntegrationCanvas compact />
      </div>

      <div className="mt-5 grid max-w-[1640px] grid-cols-[1.2fr_1fr] gap-x-10">
        <div>
          <div className="inline-block rounded-[8px] border border-accent bg-accent-subtle px-4 py-2 text-[18px] font-semibold leading-[1.25] text-fg-primary">
            Not a replacement controller. A bounded local response layer.
          </div>
          <p className="mt-3 text-[17px] leading-[1.5] text-fg-secondary">
            Arc works alongside existing robotics stacks, focusing on selected
            sensor-actuator loops where{" "}
            <span className="font-semibold text-fg-primary">
              fast local response, adaptation, or lower compute burden
            </span>{" "}
            matter.
          </p>
        </div>
        <div className="text-[16px] leading-[1.5] text-fg-secondary">
          <div className="flex gap-3">
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-fg-tertiary">
              Task-level control
            </span>
            <span>Existing controller → motor controller</span>
          </div>
          <div className="mt-1 flex gap-3">
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-fg-tertiary">
              Bounded correction
            </span>
            <span>Arc → motor controller</span>
          </div>
          <div className="mt-1 flex gap-3">
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-fg-tertiary">
              State feedback
            </span>
            <span>Arc → main controller</span>
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="05 · Architecture" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  06 · Customer Benefits
// ---------------------------------------------------------------------
function BenefitsSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Customer Benefits</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        What <span className="italic">Arc</span> is designed to improve.
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        Arc turns sensor data into faster physical response —{" "}
        <span className="font-semibold text-fg-primary">
          added to one control-critical loop, without replacing the existing
          controller.
        </span>
      </p>

      <div className="mt-8 grid max-w-[1640px] grid-cols-3 gap-5">
        <BenefitPillar
          title="Physical Response"
          body="React to contact, force change, slip, or imbalance faster than a perception-to-planning loop can complete. Arc operates locally between selected sensors and actuators."
          outcome="Safer human-proximate deployment. Fewer failed grasps and overcorrections."
        />
        <BenefitPillar
          title="Physical Adaptation"
          body="Adjust locally to changing weight, surface, shape, sensor noise, and motion — using sensor feedback inside the control loop, without per-task retuning."
          outcome="Reliable handling across variable real-world conditions."
        />
        <BenefitPillar
          title="Physical Resilience"
          body="Noisy sensors, shifting loads, vibration, or partial hardware degradation are stabilized in selected local loops before the broader system needs to intervene."
          outcome="Higher uptime in the field. Lower compute and integration burden."
        />
      </div>

      {/* Architectural property — common to all three pillars: edge-local compute */}
      <div className="mt-6 max-w-[1640px] rounded-[8px] border border-accent bg-accent-subtle px-6 py-5">
        <div className="grid grid-cols-[260px_1fr] items-start gap-6">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
              Architectural property
            </div>
            <div className="mt-1.5 text-[20px] font-light leading-[1.2] tracking-[-0.01em] text-fg-primary">
              Local by design.
            </div>
          </div>
          <p className="text-[17px] leading-[1.55] text-fg-primary">
            Across all three pillars, Arc handles the reflex loop locally on
            the FPGA —{" "}
            <span className="font-semibold">
              without routing every event through CPU, GPU, or cloud
              inference.
            </span>{" "}
            The higher-level controller stays in charge of perception,
            planning, and learning;{" "}
            <span className="font-semibold">
              power and compute load on those layers drop accordingly.
            </span>
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-[1640px] text-[20px] leading-[1.55] text-fg-secondary">
        Together, these improvements deliver{" "}
        <span className="font-semibold text-fg-primary">
          faster physical response
        </span>
        ,{" "}
        <span className="font-semibold text-fg-primary">
          better adaptation to variable conditions
        </span>
        , and{" "}
        <span className="font-semibold text-fg-primary">
          higher reliability in the field
        </span>{" "}
        — added to existing robots without a full redesign.
      </p>

      <SlideFooter pageLabel="06 · Customer Benefits" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  07 · Product / Technical Status
// ---------------------------------------------------------------------
function PhaseTargetCard({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  return (
    <div className="rounded-[8px] border border-border bg-bg-base px-5 py-4">
      <div className="text-[18px] font-semibold text-fg-primary">{label}</div>
      <div className="mt-1.5 text-[16px] leading-[1.5] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

function StatusSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Status</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Phase 1 proved the substrate runs.
        <br />
        Phase 2 proves physical response.
      </h2>

      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-10">
        <div className="rounded-[8px] border border-border bg-bg-subtle p-7">
          <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-fg-tertiary">
            Phase 1 — completed
          </div>
          <div className="mt-4 text-[26px] font-light leading-[1.25] tracking-[-0.01em] text-fg-primary">
            The substrate runs on real hardware.
          </div>
          <ul className="mt-5 space-y-3 text-[18px] leading-[1.55] text-fg-secondary">
            <li className="flex gap-3">
              <span className="text-accent">✓</span>
              <span>Reservoir computing implemented on FPGA hardware</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">✓</span>
              <span>
                Live sensor stream classification and motion tracking validated
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">✓</span>
              <span>Hardware validated on real silicon, not only simulation</span>
            </li>
          </ul>
        </div>

        <div className="rounded-[8px] border border-accent bg-accent-subtle p-7">
          <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
            Phase 2 — next, 1stRound funds this
          </div>
          <div className="mt-4 text-[26px] font-light leading-[1.25] tracking-[-0.01em] text-fg-primary">
            Close the loop with a real actuator.
          </div>
          <ul className="mt-5 space-y-3 text-[18px] leading-[1.55] text-fg-primary">
            <li className="flex gap-3">
              <span className="text-accent">→</span>
              <span>Closed-loop tactile sensor + gripper benchmark</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">→</span>
              <span>Slip detection and fast local response</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">→</span>
              <span>Compare Arc against a conventional digital baseline</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">→</span>
              <span>
                Measure response time, energy per response, adaptation, and
                stability
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">→</span>
              <span>
                Generate validation dataset for partners and investors
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 max-w-[1640px]">
        <MutedLabel>Phase 2 benchmark targets — not yet proven</MutedLabel>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <PhaseTargetCard
            label="Latency"
            body="Sub-millisecond response target at the actuator."
          />
          <PhaseTargetCard
            label="Energy"
            body="Lower energy per corrective response than baseline."
          />
          <PhaseTargetCard
            label="Adaptation"
            body="Stable control under variable physical conditions."
          />
        </div>
      </div>

      <SlideFooter pageLabel="07 · Status" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  08 · Why FPGA First
// ---------------------------------------------------------------------
function FpgaLoopStep({
  index,
  label,
  emphasis = false,
}: {
  index: number;
  label: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-[132px] flex-1 flex-col justify-between rounded-[8px] border px-4 py-3 ${
        emphasis
          ? "border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
        Step {String(index).padStart(2, "0")}
      </div>
      <div className="text-[17px] leading-[1.3] text-fg-primary">{label}</div>
    </div>
  );
}

function FpgaSlide() {
  return (
    <Slide align="start">
      <Eyebrow>FPGA Strategy</Eyebrow>
      <h2 className="text-[72px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        FPGA is Hinoki&rsquo;s IP discovery engine.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-light leading-[1.4] text-fg-secondary">
        We use FPGA to discover and validate the architecture before freezing
        it into silicon.
      </p>

      {/* IP discovery loop — visual, not a paragraph */}
      <div className="mt-12 max-w-[1640px]">
        <MutedLabel>IP discovery loop</MutedLabel>
        <div className="mt-4 flex flex-wrap items-stretch gap-2">
          <FpgaLoopStep index={1} label="FPGA validation" emphasis />
          <FlowArrow />
          <FpgaLoopStep
            index={2}
            label="Real sensor-actuator experiments"
          />
          <FlowArrow />
          <FpgaLoopStep
            index={3}
            label="Proprietary benchmark data"
          />
          <FlowArrow />
          <FpgaLoopStep index={4} label="Tuning know-how" />
          <FlowArrow />
          <FpgaLoopStep index={5} label="Patentable methods" />
          <FlowArrow />
          <FpgaLoopStep
            index={6}
            label="Reference design / ASIC / licensing"
          />
        </div>
      </div>

      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-x-12 gap-y-6">
        <div>
          <SectionLabel>What FPGA enables today</SectionLabel>
          <ul className="mt-4 space-y-2.5 text-[18px] leading-[1.5] text-fg-secondary">
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Iterate architecture before locking into silicon
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Adapt to different sensors, protocols, and control loops
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Build integration recipes for future licensing partners
              </span>
            </li>
          </ul>
        </div>
        <div>
          <SectionLabel>What FPGA unlocks downstream</SectionLabel>
          <ul className="mt-4 space-y-2.5 text-[18px] leading-[1.5] text-fg-secondary">
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Collect proprietary benchmark data from real robotic systems
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Identify patentable control methods and tuning strategies
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Clear path to ASIC, reference design, or embedded IP
              </span>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-10 max-w-[1500px] text-[20px] font-light italic leading-[1.45] text-fg-primary">
        FPGA lets Hinoki learn the architecture before freezing the
        architecture.
      </p>

      <p className="absolute bottom-[110px] left-[140px] right-[140px] text-[13px] leading-[1.5] text-fg-tertiary">
        FPGA is the validation and IP-discovery vehicle — not necessarily the
        final cost structure. ASIC, reference design, or embedded IP follow
        validation.
      </p>

      <SlideFooter pageLabel="08 · FPGA Strategy" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  09 · Traction / External Validation
// ---------------------------------------------------------------------
function TractionCard({
  label,
  headline,
  children,
}: {
  label: string;
  headline?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-6">
      <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      {headline ? (
        <p className="mt-3 text-[19px] font-light leading-[1.3] tracking-[-0.01em] text-fg-primary">
          {headline}
        </p>
      ) : null}
      <div className={`flex flex-1 flex-col gap-3.5 ${headline ? "mt-4" : "mt-4"}`}>
        {children}
      </div>
    </div>
  );
}

function TractionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        {title}
      </div>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function TractionProse({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] leading-[1.5] text-fg-primary">{children}</p>
  );
}

function TractionInvestorRow({
  name,
  status,
  logoSrc,
  logoMaxH = 28,
  logoMaxW = 124,
}: {
  name: string;
  status: string;
  logoSrc?: string;
  logoMaxH?: number;
  logoMaxW?: number;
}) {
  return (
    <div className="grid grid-cols-[132px_minmax(0,1fr)] items-center gap-x-4 border-b border-border/70 py-[11px] last:border-b-0">
      <div
        className="flex h-9 items-center justify-start"
        aria-hidden={!!logoSrc}
      >
        {logoSrc ? (
          <img
            src={logoSrc}
            alt=""
            className="block w-auto object-contain object-left"
            style={{ maxHeight: logoMaxH, maxWidth: logoMaxW }}
          />
        ) : (
          <span className="max-w-[132px] text-[11px] font-semibold leading-[1.25] tracking-[-0.01em] text-fg-primary">
            {name}
          </span>
        )}
      </div>
      <p className="text-[13px] leading-[1.4] text-fg-secondary">{status}</p>
    </div>
  );
}

function CustomerPartnerTractionCard() {
  return (
    <TractionCard label="Customer / Partner">
      <TractionSection title="Primary signal">
        <div className="rounded-[8px] border border-accent bg-accent-subtle px-4 py-3">
          <div className="text-[15px] font-semibold text-fg-primary">
            Tokyo-based tactile sensing partner
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-fg-primary">
            CEO meeting completed. Written go-ahead to draft non-binding
            technical LOI. Slip detection and fast gripper response aligned as
            first validation benchmark.
          </p>
        </div>
      </TractionSection>

      <TractionSection title="Additional discovery">
        <ul className="space-y-2.5 text-[13px] leading-[1.5] text-fg-primary">
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              Assistive robotics company — researcher conversation completed,
              validating real-time response latency as a barrier in assistive
              control. CEO meeting scheduled.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              Cognitive robotics company — co-founder meeting being set around
              cognition vs physical execution.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              Vision-based tactile sensing company — warm route identified for
              partnership discussion.
            </span>
          </li>
        </ul>
      </TractionSection>

      <TractionSection title="Engineer discovery">
        <TractionProse>
          AMR, humanoid, quadruped, assistive, marine, and service robotics
          engineers confirmed pain around latency, noisy input, variable loads,
          wheel slip, and real-time response.
        </TractionProse>
      </TractionSection>
    </TractionCard>
  );
}

function InvestorProgramTractionCard() {
  return (
    <TractionCard
      label="Investor / Program Momentum"
      headline="Screening and investor conversations progressing."
    >
      <div className="border-t border-border/70">
        <TractionInvestorRow
          name="Antler Japan"
          logoSrc="/assets/antler-wordmark.png"
          logoMaxH={26}
          logoMaxW={108}
          status="Selected for Japan Residency, May 2026"
        />
        <TractionInvestorRow
          name="Coreline / Atlas"
          logoSrc="/assets/coreline-logo.png"
          logoMaxH={34}
          logoMaxW={132}
          status="First screening passed, in-person team interview being scheduled"
        />
        <TractionInvestorRow
          name="Sony Innovation Fund"
          status="Positive response, materials shared with deep-tech team"
        />
        <TractionInvestorRow
          name="Co-Capital / Founder Institute Japan"
          logoSrc="/assets/co-capital-logo.png"
          logoMaxH={26}
          logoMaxW={132}
          status="Active continued conversation"
        />
        <TractionInvestorRow
          name="The Ventures Award 2026"
          status="First-round screening passed"
        />
      </div>
    </TractionCard>
  );
}

function TechnicalCredibilityTractionCard() {
  return (
    <TractionCard
      label="Technical Credibility"
      headline="Hardware validation and advisor network are forming around execution."
    >
      <TractionSection title="Hardware status">
        <ul className="space-y-2 text-[13px] leading-[1.5] text-fg-primary">
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              Phase 1 FPGA reservoir validation completed on live sensor input.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              6-week demo sprint underway for showcase at Antler Japan
              Residency.
            </span>
          </li>
        </ul>
      </TractionSection>

      <TractionSection title="Phase 2 path">
        <TractionProse>
          Closed-loop tactile sensor + gripper benchmark planned.
        </TractionProse>
        <p className="mt-2 text-[13px] leading-[1.5] text-fg-primary">
          Metrics: response time, energy per response, adaptation, signal
          robustness, baseline comparison.
        </p>
      </TractionSection>

      <TractionSection title="Advisor network">
        <ul className="space-y-2 text-[13px] leading-[1.5] text-fg-primary">
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              Verbal go-ahead from Physical HRI and Mechatronics PhD advisors.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>Neuromorphic Networks PhD expected from July.</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>AIST senior robotics researcher discussion pending.</span>
          </li>
        </ul>
      </TractionSection>
    </TractionCard>
  );
}

function TractionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Traction</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Early validation signals.
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        Customer discovery, investor momentum, and technical advisory support
        are converging around the same validation path.
      </p>

      <div className="mt-8 grid max-w-[1640px] grid-cols-3 gap-5">
        <CustomerPartnerTractionCard />
        <InvestorProgramTractionCard />
        <TechnicalCredibilityTractionCard />
      </div>

      <p className="mt-5 max-w-[1640px] text-[12px] italic leading-[1.5] text-fg-tertiary">
        Status language is intentionally precise. No investment, commercial, or
        partnership commitments are implied beyond the stated stage.
      </p>

      <SlideFooter pageLabel="09 · Traction" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  10 · Market / Expansion Path
// ---------------------------------------------------------------------
function MarketTier({
  tier,
  size,
  label,
  body,
  footnote,
  emphasis = false,
}: {
  tier: string;
  size: string;
  label: string;
  body: string;
  footnote: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-[8px] border p-5 ${
        emphasis
          ? "border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div
        className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
          emphasis ? "text-accent" : "text-fg-tertiary"
        }`}
      >
        {tier}
      </div>
      <div className="mt-3 text-[44px] font-light leading-[1.0] tracking-[-0.02em] text-fg-primary">
        {size}
      </div>
      <div className="mt-2 text-[17px] font-medium leading-[1.25] text-fg-primary">
        {label}
      </div>
      <div className="mt-2 text-[14px] leading-[1.5] text-fg-secondary">
        {body}
      </div>
      <div className="mt-auto pt-3 text-[11px] leading-[1.4] text-fg-tertiary">
        {footnote}
      </div>
    </div>
  );
}

function MarketSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Market</Eyebrow>
      <h2 className="text-[52px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        A measurable beachhead inside a platform-wide opportunity.
      </h2>
      <p className="mt-3 max-w-[1500px] text-[20px] font-normal leading-[1.5] text-fg-secondary">
        Hinoki starts in a narrow, validated wedge and expands across robotics
        platforms where sensor-actuator response is performance-critical.
      </p>

      <div className="mt-6 grid max-w-[1640px] grid-cols-3 gap-4">
        <MarketTier
          tier="Initial beachhead"
          size="$15B+"
          label="Tactile & force sensing by 2030"
          body="Robotic grippers, tactile sensors, industrial manipulation — the first paid validation wedge for Arc."
          footnote="Industry analyst aggregates¹"
          emphasis
        />
        <MarketTier
          tier="Serviceable market"
          size="$170B"
          label="Global robotics market by 2030"
          body="Industrial automation today is $300B+ deployed; service robotics adds $40B+ by 2030. Arc licenses the local response layer inside these platforms."
          footnote="IFR World Robotics · Statista²"
        />
        <MarketTier
          tier="Long-term opportunity"
          size="$165B"
          label="Humanoid robots by 2034 (50% CAGR)"
          body="Cage-free human–robot collaboration is gated on real-time physical intelligence — the layer Arc operates in."
          footnote="Goldman Sachs Research · McKinsey³"
        />
      </div>

      {/* Japan strategic anchor — explicitly for university reviewers */}
      <div className="mt-5 max-w-[1640px] rounded-[8px] border border-accent bg-accent-subtle px-6 py-4">
        <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
          Japan strategic frame
        </div>
        <p className="mt-2 text-[17px] leading-[1.5] text-fg-primary">
          Japan faces a structural robotics opportunity at the intersection of
          an{" "}
          <span className="font-semibold">aging society</span>,{" "}
          <span className="font-semibold">manufacturing renaissance</span>,
          and{" "}
          <span className="font-semibold">humanoid leadership</span>. METI
          targets approximately{" "}
          <span className="font-semibold">¥10 trillion</span> in robotics
          industry impact by 2035.⁴ Hinoki contributes a layer Japan can own at
          the architecture level — the local physical response layer that every
          robotic platform needs.
        </p>
      </div>

      {/* Beachhead → expansion strip — compact, single row */}
      <div className="mt-4 max-w-[1640px]">
        <MutedLabel>Beachhead → expansion path</MutedLabel>
        <div className="mt-2 flex flex-wrap items-stretch gap-2">
          <FlowBox label="Tactile slip & gripper response" emphasis />
          <FlowArrow />
          <FlowBox label="Industrial & collaborative" />
          <FlowArrow />
          <FlowBox label="Mobile & humanoids" />
          <FlowArrow />
          <FlowBox label="Assistive · drones · quadrupeds" />
        </div>
      </div>

      <p className="mt-4 max-w-[1640px] text-[11px] leading-[1.45] text-fg-tertiary">
        ¹ Tactile &amp; force sensor market projection; industry analyst
        aggregates. ² IFR World Robotics &amp; Statista global robotics market
        (2024 → 2030). ³ Goldman Sachs Research, Humanoid Robot Market
        2024–2035; McKinsey Global Institute, Embodied AI safety research
        2024. ⁴ METI Robot Policy Vision (2024 update) — robotics industry
        impact target by 2035.
      </p>

      <SlideFooter pageLabel="10 · Market" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  11 · Business Model
// ---------------------------------------------------------------------
function ModelPhaseCard({
  phase,
  title,
  items,
}: {
  phase: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
        {phase}
      </div>
      <div className="mt-4 text-[26px] font-light leading-[1.25] tracking-[-0.01em] text-fg-primary">
        {title}
      </div>
      <ul className="mt-5 space-y-2.5 text-[17px] leading-[1.55] text-fg-secondary">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span className="text-accent">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BusinessModelSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Business Model</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        From validation to architecture licensing.
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-light leading-[1.4] text-fg-secondary">
        Hinoki captures value by{" "}
        <span className="font-semibold text-fg-primary">
          sitting inside robotics platforms
        </span>{" "}
        — not by building robots.
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-5">
        <ModelPhaseCard
          phase="Near term — Phase 1"
          title="Validation &amp; co-development"
          items={[
            "Non-dilutive grants and R&D funding",
            "Paid technical validation projects",
            "Joint benchmark work with robotics companies",
          ]}
        />
        <ModelPhaseCard
          phase="Mid term — Phase 2"
          title="Reference design licensing"
          items={[
            "Integration fees + reference design licensing",
            "Arc control module / embedded control layer",
            "Integration support for sensor, gripper, platform companies",
          ]}
        />
        <ModelPhaseCard
          phase="Long term — Phase 3"
          title="Embedded IP &amp; royalties"
          items={[
            "Architecture licensing",
            "Per-platform or per-unit royalties",
            "Embedded IP inside robotics platforms",
          ]}
        />
      </div>

      {/* Cost structure — application requires expense structure */}
      <div className="mt-8 max-w-[1640px] rounded-[8px] border border-border bg-bg-subtle px-6 py-5">
        <div className="grid grid-cols-[220px_1fr] gap-6">
          <div>
            <SectionLabel>Cost structure</SectionLabel>
            <div className="mt-2 text-[13px] leading-[1.5] text-fg-tertiary">
              Main expense categories
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-[15px] leading-[1.5] text-fg-secondary">
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>R&amp;D engineering</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>Hardware procurement (FPGA, sensors, actuators)</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>Benchmark rig &amp; testing equipment</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>Sensor / actuator integration</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>IP / patent costs</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>Partner validation support</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-[1500px] text-[20px] font-light italic leading-[1.45] text-fg-primary">
        We do not build robots.{" "}
        <span className="not-italic font-semibold">
          We license the control architecture that helps them physically
          respond.
        </span>
      </p>

      <SlideFooter pageLabel="11 · Business Model" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  12 · Competitive Positioning
// ---------------------------------------------------------------------
function StackLayer({
  layer,
  label,
  body,
  examples,
  emphasis = false,
}: {
  layer: string;
  label: string;
  body: string;
  examples: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[200px_1fr_1.3fr_1fr] items-center gap-6 rounded-[8px] border px-6 ${
        emphasis
          ? "border-accent border-2 bg-accent-subtle py-5 shadow-[0_2px_0_rgba(232,98,42,0.08)]"
          : "border-border bg-bg-subtle py-4"
      }`}
    >
      <div
        className={`font-mono uppercase ${
          emphasis
            ? "text-[14px] font-semibold tracking-[0.16em] text-accent"
            : "text-[12px] tracking-[0.14em] text-fg-tertiary"
        }`}
      >
        {layer}
      </div>
      <div
        className={`leading-[1.25] text-fg-primary ${
          emphasis
            ? "text-[22px] font-semibold"
            : "text-[20px] font-medium"
        }`}
      >
        {label}
      </div>
      <div
        className={`leading-[1.5] ${
          emphasis ? "text-[16px] text-fg-primary" : "text-[15px] text-fg-secondary"
        }`}
      >
        {body}
      </div>
      <div
        className={`italic leading-[1.5] ${
          emphasis ? "text-[14px] text-fg-primary" : "text-[14px] text-fg-tertiary"
        }`}
      >
        {examples}
      </div>
    </div>
  );
}

function PositioningSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Positioning</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Where Hinoki sits in the robotics stack.
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-normal leading-[1.55] text-fg-secondary">
        The market is active, but the physical response layer between sensing
        and actuation remains underdeveloped.
      </p>

      <div className="mt-10 flex max-w-[1640px] flex-col gap-2.5">
        <StackLayer
          layer="Cognition"
          label="AI / planning"
          body="High-level autonomy, perception, decision-making."
          examples="Cognitive robotics · autonomy companies · VLA models"
        />
        <StackLayer
          layer="Control OS"
          label="Robot OS / motion control"
          body="Task-level control, trajectory planning, conventional controllers."
          examples="PID · MPC · PLC · existing robot controllers"
        />
        <StackLayer
          layer="Sensing"
          label="Tactile / vision / event-based sensing"
          body="Capture force, slip, contact, and visual signals."
          examples="Tactile sensing partners · vision-based touch · event-based sensors"
        />
        <StackLayer
          layer="Hinoki · Arc"
          label="Local reflex control"
          body="Sensor input → Arc → bounded correction → motor controller. The missing layer between sensing and actuation."
          examples="Neuromorphic · reservoir computing · FPGA-first"
          emphasis
        />
        <StackLayer
          layer="Hardware"
          label="Motors, grippers, actuators, robot body"
          body="Physical platforms that Arc helps respond and adapt."
          examples="Industrial · collaborative · mobile · humanoid · assistive"
        />
      </div>

      <p className="mt-8 max-w-[1500px] text-[22px] font-light italic leading-[1.45] text-fg-primary">
        Sensors create data. Controllers execute tasks.{" "}
        <span className="not-italic font-semibold">
          Arc focuses on the fast physical loop between sensing and action.
        </span>
      </p>

      <SlideFooter pageLabel="12 · Positioning" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  13 · Team
// ---------------------------------------------------------------------
function TeamSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Team</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.1] tracking-[-0.02em] text-fg-primary">
        A founder team built on long-standing trust
        <br />
        and complementary roles.
      </h2>

      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-6">
        <FounderCard
          imageSrc="/team/salvatore.jpg"
          objectPosition="center 30%"
          affiliation="University of Tsukuba"
          name="Salvatore Martone"
          role="Co-founder / CEO"
          body={
            <>
              Biology graduate, University of Tsukuba.{" "}
              <span className="font-semibold text-fg-primary">
                Co-architect of the Arc thesis
              </span>{" "}
              — brought the biological framing of physical intelligence
              (spinal reflex arc as architectural inspiration). Leads strategy,
              fundraising, customer discovery, and investor + robotics company
              relationships.
            </>
          }
        />
        <FounderCard
          imageSrc="/team/bernardo.png"
          affiliation="University of Tsukuba"
          name="Bernardo Gatto"
          role="Co-founder / CTO"
          body={
            <>
              PhD engineer. Robotics, computer vision, embedded AI, and
              hardware integration. AIST experience. MEXT / JSPS background.
              FPGA + reservoir computing implementation. Built and validated
              Phase 1.
            </>
          }
        />
        <FounderCard
          imageSrc="/team/mina.jpg"
          objectPosition="center 25%"
          affiliation="Showa Women's University"
          name="Mina Otsuka"
          role="Co-founder / Japan Market &amp; Ecosystem"
          body={
            <>
              Japan market strategy, ecosystem development, customer
              discovery, and corporate + research institution relationships.
              Japanese corporate stakeholder management. Tsukuba-rooted
              ecosystem development.
            </>
          }
        />
      </div>

      <div className="mt-8 max-w-[1640px] rounded-[8px] border border-border bg-bg-subtle/70 p-6">
        <div className="grid grid-cols-[200px_1fr] gap-6">
          <div>
            <SectionLabel>Founder connection</SectionLabel>
          </div>
          <ul className="space-y-2.5 text-[17px] leading-[1.55] text-fg-secondary">
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                The Tsukuba co-founders have known each other for{" "}
                <span className="font-semibold text-fg-primary">8 years</span>{" "}
                since their time at the University of Tsukuba.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                The Japan market co-founder has known the team for{" "}
                <span className="font-semibold text-fg-primary">4 years</span>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                The team is built on{" "}
                <span className="font-semibold text-fg-primary">
                  long-standing trust
                </span>
                .
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                <span className="font-semibold text-fg-primary">
                  Shared mission:
                </span>{" "}
                build a Tsukuba-rooted deep-tech company contributing to Japan
                and creating a place where Japanese and international
                researchers can work together.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <SlideFooter pageLabel="13 · Team" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  14 · Technical Advisory Network
// ---------------------------------------------------------------------
function AdvisorCard({
  status,
  statusTone = "confirmed",
  name,
  credentials,
  value,
}: {
  status: string;
  statusTone?: "confirmed" | "expected" | "pending";
  name: string;
  credentials: string;
  value: string;
}) {
  const tone =
    statusTone === "confirmed"
      ? "text-accent"
      : statusTone === "expected"
        ? "text-fg-primary"
        : "text-fg-tertiary";
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-6">
      <div className={`font-mono text-[12px] uppercase tracking-[0.14em] ${tone}`}>
        {status}
      </div>
      <div className="mt-3 text-[22px] font-medium leading-[1.25] text-fg-primary">
        {name}
      </div>
      <div className="mt-2 text-[15px] leading-[1.5] text-fg-secondary">
        {credentials}
      </div>
      <div className="mt-4 border-t border-border pt-3 text-[14px] leading-[1.5] text-fg-tertiary">
        <span className="font-mono uppercase tracking-[0.1em]">Value · </span>
        {value}
      </div>
    </div>
  );
}

function AdvisorsSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Advisory</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Early technical advisory board.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[22px] font-normal leading-[1.55] text-fg-secondary">
        Hinoki is building with an advisor network across physical HRI,
        mechatronics, neuromorphic networks, and intelligent robotics.
      </p>

      <div className="mt-10 max-w-[1640px]">
        <SectionLabel>Current advisor commitments</SectionLabel>
        <div className="mt-4 grid grid-cols-2 gap-5">
          <AdvisorCard
            status="Verbal agreement received"
            statusTone="confirmed"
            name="Physical HRI advisor"
            credentials="PhD · University of Tsukuba · Professor, PUCP"
            value="Human-robot interaction, assistive systems, physical interaction, robotics validation context."
          />
          <AdvisorCard
            status="Verbal agreement received"
            statusTone="confirmed"
            name="Mechatronics advisor"
            credentials="PhD · University of Tsukuba · Associate Professor, Nagoya University"
            value="Mechatronics, human informatics, robotic systems, academic validation path."
          />
        </div>
      </div>

      <div className="mt-7 max-w-[1640px]">
        <SectionLabel>Upcoming &amp; pending advisor discussions</SectionLabel>
        <div className="mt-4 grid grid-cols-2 gap-5">
          <AdvisorCard
            status="Expected from July"
            statusTone="expected"
            name="Neuromorphic networks advisor"
            credentials="PhD · University of Tokyo"
            value="Neuromorphic architecture / reservoir-adjacent technical support."
          />
          <AdvisorCard
            status="Pending discussion"
            statusTone="pending"
            name="AIST robotics researcher"
            credentials="PhD · University of Tsukuba · Senior Researcher, AIST"
            value="AIST robotics ecosystem, intelligent interaction, robotics research credibility."
          />
        </div>
      </div>

      <SlideFooter pageLabel="14 · Advisory" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  15 · 12-Month Plan & Use of Funds
// ---------------------------------------------------------------------
function PlanQuarter({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-5">
      <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
        {label}
      </div>
      <ul className="mt-3 space-y-2 text-[15px] leading-[1.5] text-fg-secondary">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="text-accent">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanSlide() {
  return (
    <Slide align="start">
      <Eyebrow>12-Month Plan</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.1] tracking-[-0.02em] text-fg-primary">
        From discovery to hardware validation.
      </h2>
      <p className="mt-4 max-w-[1500px] text-[22px] font-light leading-[1.4] text-fg-secondary">
        1stRound funding converts customer discovery into technical
        validation data.
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-4 gap-4">
        <PlanQuarter
          label="0–3 months"
          items={[
            "Define slip-detection benchmark requirements",
            "Source tactile sensor, gripper, FPGA, actuator setup",
          ]}
        />
        <PlanQuarter
          label="3–6 months"
          items={[
            "Build closed-loop tactile-to-actuation validation rig",
            "Run baseline vs. conventional digital control",
            "Measure response time, adaptation, energy, stability",
          ]}
        />
        <PlanQuarter
          label="6–9 months"
          items={[
            "Share validation data with partners",
            "Refine Arc architecture from benchmark results",
            "Prepare patent / IP filing strategy",
          ]}
        />
        <PlanQuarter
          label="9–12 months"
          items={[
            "Begin partner pilot planning",
            "Apply for additional grants",
            "Prepare angel / VC round on benchmark data",
          ]}
        />
      </div>

      <div className="mt-8 max-w-[1640px]">
        <SectionLabel>Use of funds</SectionLabel>
        <div className="mt-3 grid grid-cols-4 gap-x-6 gap-y-2 text-[16px] leading-[1.55] text-fg-secondary">
          <div>· FPGA refinement &amp; embedded control testing</div>
          <div>· Tactile sensor / gripper / actuator setup</div>
          <div>· Closed-loop benchmark rig</div>
          <div>· Validation dataset creation</div>
          <div>· Engineering time &amp; hardware integration</div>
          <div>· Patent / IP consultation</div>
          <div>· Customer discovery &amp; partner development</div>
          <div className="text-fg-tertiary">
            · Documentation &amp; technical write-up
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="15 · 12-Month Plan" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  16 · Five-Year Revenue & Expenditure Plan
// ---------------------------------------------------------------------
function YearRow({
  year,
  revenue,
  focus,
  expenses,
  emphasis = false,
}: {
  year: string;
  revenue: string;
  focus: string;
  expenses: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[120px_220px_1.4fr_1.2fr] items-start gap-6 border-b py-5 ${
        emphasis ? "border-accent" : "border-border"
      }`}
    >
      <div
        className={`font-mono text-[16px] uppercase tracking-[0.12em] ${
          emphasis ? "text-accent" : "text-fg-tertiary"
        }`}
      >
        {year}
      </div>
      <div className="text-[24px] font-light leading-[1.2] tracking-[-0.01em] text-fg-primary">
        {revenue}
      </div>
      <div className="text-[17px] leading-[1.5] text-fg-secondary">
        {focus}
      </div>
      <div className="text-[15px] leading-[1.5] text-fg-tertiary">
        {expenses}
      </div>
    </div>
  );
}

function FinancialSlide() {
  return (
    <Slide align="start">
      <Eyebrow>5-Year Plan</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Revenue and expenditure plan.
      </h2>
      <p className="mt-3 max-w-[1500px] text-[20px] font-light leading-[1.4] text-fg-secondary">
        Directional plan — from validation, to paid pilots, to licensing.
      </p>

      {/* Revenue assumptions — licensing/IP ramp, not product sales */}
      <div className="mt-6 max-w-[1640px] rounded-[8px] border border-accent bg-accent-subtle px-6 py-4">
        <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
          Revenue assumptions
        </div>
        <p className="mt-2 text-[17px] leading-[1.55] text-fg-primary">
          <span className="font-semibold">Year 2</span> begins with paid
          validation and co-development projects.{" "}
          <span className="font-semibold">Years 3–5</span> shift toward
          reference design licensing, integration fees, and embedded IP
          royalties.{" "}
          <span className="font-semibold">Year 5 upside</span> depends on
          licensing adoption across robotics platforms, not Hinoki
          manufacturing or shipping robots.
        </p>
      </div>

      <div className="mt-5 max-w-[1640px]">
        <div className="grid grid-cols-[110px_200px_1.4fr_1.2fr] gap-5 border-b border-border-strong pb-2 font-mono text-[12px] uppercase tracking-[0.14em] text-fg-tertiary">
          <div>Year</div>
          <div>Operating revenue</div>
          <div>Focus</div>
          <div>Expenses</div>
        </div>
        <p className="mt-1.5 pb-3 text-[11px] leading-[1.4] text-fg-tertiary">
          Operating revenue excludes grants and VC investment.
        </p>
        <YearRow
          year="Year 1"
          revenue="¥0–5M"
          focus="Validation, LOIs, benchmark dataset, grant funding support"
          expenses="Hardware, engineering, IP consultation, customer discovery"
          emphasis
        />
        <YearRow
          year="Year 2"
          revenue="¥15–50M"
          focus="1–3 paid validation / co-development projects"
          expenses="Engineering, integration, partner support, hardware iteration"
        />
        <YearRow
          year="Year 3"
          revenue="¥80–200M"
          focus="3–6 paid partner projects, early reference design licensing"
          expenses="Technical team, hardware, IP, business development"
        />
        <YearRow
          year="Year 4"
          revenue="¥300–700M"
          focus="Platform licensing, integration fees, repeat partner deployments"
          expenses="Support engineering, market expansion, patent portfolio"
        />
        <YearRow
          year="Year 5"
          revenue="¥1B+"
          focus="Embedded IP licensing, reference design adoption, per-platform / per-unit royalties"
          expenses="Scaling engineering, partner support, global partnerships, IP maintenance"
        />
      </div>

      <div className="mt-5 max-w-[1640px]">
        <SectionLabel>Unit logic, directional</SectionLabel>
        <div className="mt-3 grid grid-cols-4 gap-3">
          <div className="rounded-[8px] border border-border bg-bg-subtle px-4 py-3.5">
            <div className="text-[14px] font-semibold leading-[1.3] text-fg-primary">
              Paid validation / co-development
            </div>
            <div className="mt-1.5 text-[13px] leading-[1.45] text-fg-secondary">
              ¥5–15M per project
            </div>
          </div>
          <div className="rounded-[8px] border border-border bg-bg-subtle px-4 py-3.5">
            <div className="text-[14px] font-semibold leading-[1.3] text-fg-primary">
              Reference design / integration licensing
            </div>
            <div className="mt-1.5 text-[13px] leading-[1.45] text-fg-secondary">
              ¥10–30M per partner
            </div>
          </div>
          <div className="rounded-[8px] border border-border bg-bg-subtle px-4 py-3.5">
            <div className="text-[14px] font-semibold leading-[1.3] text-fg-primary">
              Platform licensing
            </div>
            <div className="mt-1.5 text-[13px] leading-[1.45] text-fg-secondary">
              ¥30–100M+ per partner depending on scope
            </div>
          </div>
          <div className="rounded-[8px] border border-border bg-bg-subtle px-4 py-3.5">
            <div className="text-[14px] font-semibold leading-[1.3] text-fg-primary">
              Embedded IP royalties
            </div>
            <div className="mt-1.5 text-[13px] leading-[1.45] text-fg-secondary">
              Per-platform or per-unit basis
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 max-w-[1640px] text-[12px] italic leading-[1.5] text-fg-tertiary">
        Directional plan, not a precise financial forecast. Revenue depends
        on successful Phase 2 validation, partner conversion, and licensing
        adoption. Grants and VC financing are not counted as operating revenue.
      </p>

      <SlideFooter pageLabel="16 · 5-Year Plan" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  17 · Closing / Funding Purpose
// ---------------------------------------------------------------------
function OutcomeTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[92px] items-center justify-center rounded-[8px] border border-border bg-bg-subtle px-4 py-4 text-center text-[14px] leading-[1.45] text-fg-secondary">
      {children}
    </div>
  );
}

function ClosingSlide() {
  const outcomes = [
    "Build the closed-loop validation rig",
    "Benchmark Arc against a digital baseline",
    "Generate partner-ready validation data",
    "Prepare IP strategy & pilot pathway",
  ];

  return (
    <Slide align="start">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow>Funding Purpose</Eyebrow>
          <h2 className="max-w-[1400px] text-[56px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
            What 1stRound funding unlocks.
          </h2>
          <p className="mt-5 max-w-[1400px] text-[22px] font-light leading-[1.4] tracking-[-0.01em] text-fg-secondary">
            Non-dilutive validation funding that converts customer discovery
            into the first partner-ready benchmark dataset.
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-12">
          <div className="max-w-[1640px]">
            <MutedLabel>What funding enables</MutedLabel>
            <div className="mt-5 grid grid-cols-4 gap-4">
              {outcomes.map((label) => (
                <OutcomeTile key={label}>
                  <span className="font-semibold text-fg-primary">{label}</span>
                </OutcomeTile>
              ))}
            </div>
          </div>

          <div className="mt-14 max-w-[1500px] space-y-10">
            <p className="text-[19px] leading-[1.6] text-fg-secondary">
              Hinoki is seeking non-dilutive validation funding to build the
              closed-loop tactile sensing and gripper response benchmark,
              compare Arc against a conventional digital control baseline, and
              generate the dataset required for partner LOIs, technical
              collaboration, patent strategy, and future licensing conversations.
            </p>

            <p className="text-[26px] font-light italic leading-[1.35] tracking-[-0.01em] text-fg-primary">
              One measurable reflex loop becomes the foundation for a broader{" "}
              <span className="not-italic font-semibold">
                physical intelligence architecture
              </span>
              .
            </p>

            <p className="text-[14px] leading-[1.55] text-fg-secondary">
              We named the company{" "}
              <span className="italic text-fg-primary">Hinoki</span> — after the
              Japanese cypress, whose distributed structure mirrors the
              architectural principle behind Arc.
            </p>
          </div>
        </div>

        <SlideFooter pageLabel="17 · Funding Purpose" />
      </div>
    </Slide>
  );
}

// =====================================================================
//  Ordered slide manifest — drives PitchDeck navigation
// =====================================================================
export const SLIDES_1STROUND: Array<() => React.JSX.Element> = [
  TitleSlide,
  ProblemSlide,
  DiscoverySlide,
  BenchmarkSlide,
  SolutionSlide,
  BenefitsSlide,
  StatusSlide,
  FpgaSlide,
  TractionSlide,
  MarketSlide,
  BusinessModelSlide,
  PositioningSlide,
  TeamSlide,
  AdvisorsSlide,
  PlanSlide,
  FinancialSlide,
  ClosingSlide,
];
