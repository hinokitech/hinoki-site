import React from "react";
import { ArcIntegrationCanvas } from "../../reflex/ArcIntegrationCanvas";
import {
  Slide,
  Eyebrow,
  SlideFooter,
  FounderCard,
} from "../slides";

// =====================================================================
//  HINOKI — 1stROUND APPLICATION DECK
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

function BenefitCard({
  label,
  headline,
  body,
}: {
  label: string;
  headline: string;
  body: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-6">
      <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      <div className="mt-4 text-[22px] font-light leading-[1.25] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <div className="mt-3 text-[16px] leading-[1.55] text-fg-secondary">
        {body}
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

function MetricCard({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  return (
    <div className="rounded-[8px] border border-border bg-bg-subtle px-5 py-4">
      <div className="text-[16px] font-semibold text-fg-primary">{label}</div>
      <div className="mt-1 text-[15px] leading-[1.5] text-fg-secondary">
        {body}
      </div>
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
      <Eyebrow>Hinoki Technologies</Eyebrow>
      <h1 className="text-[104px] font-light leading-[1.02] tracking-[-0.025em] text-fg-primary">
        Physical intelligence
        <br />
        for robotic systems.
      </h1>
      <p className="mt-12 max-w-[1180px] text-[28px] font-normal leading-[1.5] text-fg-secondary">
        <span className="italic font-semibold text-fg-primary">Arc</span> is a
        neuromorphic local control layer that helps robots{" "}
        <span className="font-semibold text-fg-primary">respond faster</span>,{" "}
        <span className="font-semibold text-fg-primary">adapt locally</span>,
        and act on sensor data{" "}
        <span className="font-semibold text-fg-primary">
          without replacing the existing controller
        </span>
        .
      </p>

      <div className="mt-14 grid max-w-[1200px] grid-cols-2 gap-x-12 gap-y-4 text-[20px] leading-[1.5] text-fg-secondary">
        <div className="flex gap-3">
          <span className="text-accent">·</span>
          <span>Tsukuba-based deep-tech startup</span>
        </div>
        <div className="flex gap-3">
          <span className="text-accent">·</span>
          <span>Selected for Antler Japan Residency</span>
        </div>
        <div className="flex gap-3">
          <span className="text-accent">·</span>
          <span>
            First benchmark: tactile slip detection &amp; fast gripper response
          </span>
        </div>
        <div className="flex gap-3">
          <span className="text-accent">·</span>
          <span>
            Applications across industrial, collaborative, mobile, humanoid &amp;
            assistive systems
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

      <p className="mt-12 max-w-[1500px] text-[26px] font-normal leading-[1.45] tracking-[-0.01em] text-fg-primary">
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
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[14px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      {/* Fixed min-height so bodies align across the row even when
          headlines wrap to a different number of lines. */}
      <div className="mt-5 min-h-[100px] text-[26px] font-light leading-[1.25] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <div className="mt-4 text-[18px] leading-[1.6] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

function DiscoverySlide() {
  return (
    <Slide>
      <Eyebrow>Discovery</Eyebrow>
      <h2 className="text-[72px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        What engineers are telling us.
      </h2>
      <p className="mt-8 max-w-[1500px] text-[24px] font-normal leading-[1.55] text-fg-secondary">
        Customer discovery is narrowing Arc from a broad architecture thesis
        into a measurable first control-loop benchmark.
      </p>

      <div className="mt-12 grid max-w-[1640px] grid-cols-3 gap-6">
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
          headline="Customers want specificity."
          body="Engineers are asking: latency of what, in which loop, on which robot, against which baseline? They want a measurable benchmark, not a thesis."
        />
      </div>

      <p className="mt-10 max-w-[1500px] text-[22px] font-light italic leading-[1.45] text-fg-primary">
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

      <div className="mt-10 grid max-w-[1640px] grid-cols-2 gap-x-12">
        <div>
          <SectionLabel>Why this benchmark</SectionLabel>
          <ul className="mt-4 space-y-3 text-[18px] leading-[1.55] text-fg-secondary">
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>Concrete and measurable</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>Commercially relevant</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Directly aligned with tactile sensing companies such as XELA
                and FingerVision
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
          <SectionLabel>Metrics we will measure</SectionLabel>
          <div className="mt-4 grid grid-cols-1 gap-2.5">
            <MetricCard
              label="Response time"
              body="From slip / contact event to corrective output."
            />
            <MetricCard
              label="Gripper response speed"
              body="Time-to-correction at the actuator."
            />
            <MetricCard
              label="Grasp stability"
              body="Reduction in failed grasps and dropped objects."
            />
            <MetricCard
              label="Adaptation"
              body="Behavior under variable weight, surface, shape, motion."
            />
            <MetricCard
              label="Energy per response"
              body="Power cost of each reflex correction."
            />
            <MetricCard
              label="Baseline comparison"
              body="Arc vs. conventional digital control on the same rig."
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
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        <span className="italic">Arc</span> — a local reflex layer for robotic
        systems.
      </h2>
      <p className="mt-3 text-[24px] font-light leading-[1.4] text-fg-secondary">
        The robot keeps its existing controller. Arc adds a faster local
        response loop.
      </p>

      <div className="mt-8 max-w-[1640px] rounded-[12px] border border-border bg-bg-subtle/40 px-6 py-5">
        <ArcIntegrationCanvas />
      </div>

      <div className="mt-6 grid max-w-[1640px] grid-cols-2 gap-x-12">
        <p className="text-[19px] leading-[1.55] text-fg-secondary">
          Arc does not replace the robot&rsquo;s main controller. It works
          alongside existing robotics stacks, focusing on selected
          sensor-actuator loops where{" "}
          <span className="font-semibold text-fg-primary">
            fast local response, adaptation, or lower compute burden
          </span>{" "}
          matter.
        </p>
        <div className="text-[17px] leading-[1.55] text-fg-secondary">
          <div className="flex gap-3">
            <span className="font-mono text-[14px] uppercase tracking-[0.1em] text-fg-tertiary">
              Task-level control
            </span>
            <span>Existing controller → motor controller</span>
          </div>
          <div className="mt-1.5 flex gap-3">
            <span className="font-mono text-[14px] uppercase tracking-[0.1em] text-fg-tertiary">
              Bounded correction
            </span>
            <span>Arc → motor controller</span>
          </div>
          <div className="mt-1.5 flex gap-3">
            <span className="font-mono text-[14px] uppercase tracking-[0.1em] text-fg-tertiary">
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
      <h2 className="text-[72px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        What customers gain if Arc works.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.55] text-fg-secondary">
        Arc turns sensor data into faster physical response —{" "}
        <span className="font-semibold text-fg-primary">
          without requiring a full robot redesign.
        </span>
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-5 gap-5">
        <BenefitCard
          label="Response"
          headline="Faster physical response."
          body="React to slip, contact, force change, instability, or load shift before the full planning loop completes."
        />
        <BenefitCard
          label="Adaptation"
          headline="Better adaptation."
          body="Adjust locally to changing object weight, surface, shape, sensor noise, motion, or environmental conditions."
        />
        <BenefitCard
          label="Reliability"
          headline="Higher reliability."
          body="Reduce failed grasps, dropped objects, unstable handling, overcorrection, and manual retuning."
        />
        <BenefitCard
          label="Compute"
          headline="Lower compute burden."
          body="Handle reflex-level response locally — without routing every event through CPU, GPU, cloud, or heavy inference."
        />
        <BenefitCard
          label="Integration"
          headline="Easier integration."
          body="Add Arc to one control-critical loop while the customer's existing robot controller remains in charge."
        />
      </div>

      <p className="mt-10 max-w-[1500px] text-[22px] font-light italic leading-[1.45] text-fg-primary">
        Arc helps robotics companies convert sensor data into faster, more
        adaptive physical response —{" "}
        <span className="not-italic font-semibold">
          without replacing their existing controller.
        </span>
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
function FpgaSlide() {
  const bullets = [
    "Iterate architecture before locking into silicon",
    "Adapt to different sensors, protocols, and control loops",
    "Collect proprietary benchmark data from real robotic systems",
    "Identify patentable control methods and tuning strategies",
    "Build integration recipes for future licensing",
    "Later path to ASIC, reference design, or embedded IP",
  ];

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

      <p className="mt-10 max-w-[1640px] text-[20px] leading-[1.6] text-fg-secondary">
        FPGA deployment is not only a validation platform. It allows Hinoki
        to test reservoir configurations across real sensor-actuator loops,
        collect proprietary benchmark data, identify patentable control
        methods, and build integration know-how before moving toward ASIC,
        reference design, or licensable IP.
      </p>

      <div className="mt-8 grid max-w-[1640px] grid-cols-3 gap-4">
        {bullets.map((b, i) => (
          <div
            key={b}
            className="rounded-[8px] border border-border bg-bg-subtle px-5 py-4"
          >
            <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[18px] leading-[1.4] text-fg-primary">
              {b}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid max-w-[1640px] grid-cols-[1.4fr_1fr] gap-10">
        <p className="text-[19px] font-light italic leading-[1.45] text-fg-primary">
          FPGA lets Hinoki learn the architecture before freezing the
          architecture.
        </p>
        <p className="text-[15px] leading-[1.55] text-fg-tertiary">
          FPGA cost, power, and heat can be concerns. FPGA is the validation
          and IP-discovery vehicle — not necessarily the final cost structure.
          ASIC, reference design, or embedded IP follow validation.
        </p>
      </div>

      <SlideFooter pageLabel="08 · FPGA Strategy" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  09 · Traction / External Validation
// ---------------------------------------------------------------------
function TractionColumn({
  label,
  headline,
  items,
}: {
  label: string;
  headline: string;
  items: React.ReactNode[];
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      <div className="mt-4 text-[24px] font-light leading-[1.25] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <ul className="mt-5 space-y-3 text-[16px] leading-[1.55] text-fg-secondary">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-accent">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TractionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Traction</Eyebrow>
      <h2 className="text-[72px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Early validation signals.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[22px] font-normal leading-[1.55] text-fg-secondary">
        Customer discovery, investor momentum, and technical advisory support
        are converging around the same validation path.
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-6">
        <TractionColumn
          label="Customer / Partner"
          headline="Discovery is narrowing on slip detection."
          items={[
            <>
              <span className="font-semibold text-fg-primary">XELA Robotics</span>{" "}
              CEO meeting completed — written go-ahead to draft a non-binding
              technical relationship / LOI
            </>,
            <>
              Slip detection &amp; fast gripper response identified as the
              first validation benchmark
            </>,
            <>
              <span className="font-semibold text-fg-primary">Forcesteed Robotics</span>{" "}
              co-founder meeting lined up
            </>,
            <>
              <span className="font-semibold text-fg-primary">Cyberdyne</span>{" "}
              CEO / Professor Yoshiyuki Sankai replied — meeting path opened
            </>,
            <>
              <span className="font-semibold text-fg-primary">FingerVision</span>{" "}
              CEO outreach &amp; warm technical route
            </>,
            <>
              Engineer discovery across AMR, humanoid, quadruped, assistive,
              simulation, and service robotics backgrounds
            </>,
          ]}
        />
        <TractionColumn
          label="Investor / Program"
          headline="Momentum from screening to materials shared."
          items={[
            <>Selected for Antler Japan Residency</>,
            <>
              <span className="font-semibold text-fg-primary">Coreline / Atlas VC</span>{" "}
              — first screening passed, in-person team interview being
              scheduled
            </>,
            <>SusHi Tech Tokyo investor follow-ups initiated</>,
            <>
              <span className="font-semibold text-fg-primary">Sony Ventures</span>{" "}
              contact responded positively — Hinoki materials shared
              internally with the deep-tech team
            </>,
            <>Spiral Capital acknowledged receipt</>,
            <>Co-Capital / Founder Institute Japan conversation initiated</>,
          ]}
        />
        <TractionColumn
          label="Technical / Ecosystem"
          headline="Validation rig &amp; advisor network forming."
          items={[
            <>Phase 1 FPGA validation completed</>,
            <>6-week demo sprint underway</>,
            <>Early technical advisory board forming</>,
            <>
              Network emerging across{" "}
              <span className="font-semibold text-fg-primary">
                University of Tsukuba, Nagoya University, University of Tokyo,
                AIST
              </span>
            </>,
          ]}
        />
      </div>

      <p className="mt-8 max-w-[1640px] text-[15px] italic leading-[1.55] text-fg-tertiary">
        Status language is intentionally precise: &ldquo;screening passed,&rdquo;
        &ldquo;materials shared,&rdquo; &ldquo;conversation initiated,&rdquo;
        &ldquo;meeting scheduled,&rdquo; &ldquo;LOI in progress&rdquo; — no
        commitments are implied.
      </p>

      <SlideFooter pageLabel="09 · Traction" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  10 · Market / Expansion Path
// ---------------------------------------------------------------------
function ExpansionRing({
  label,
  body,
  emphasis = false,
  inset,
}: {
  label: string;
  body: string;
  emphasis?: boolean;
  inset: number;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-[8px] border px-7 py-5 ${
        emphasis
          ? "border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
      style={{ marginLeft: inset, marginRight: inset }}
    >
      <div
        className={`text-[22px] font-medium leading-[1.25] ${
          emphasis ? "text-fg-primary" : "text-fg-primary"
        }`}
      >
        {label}
      </div>
      <div
        className={`ml-6 max-w-[760px] text-right text-[16px] leading-[1.5] ${
          emphasis ? "text-fg-primary" : "text-fg-secondary"
        }`}
      >
        {body}
      </div>
    </div>
  );
}

function MarketSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Market</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.1] tracking-[-0.02em] text-fg-primary">
        The first customer problem is slip response.
        <br />
        The platform opportunity is physical response across robotics.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[22px] font-normal leading-[1.55] text-fg-secondary">
        Every robotic system has sensor-actuator loops. Arc starts with one
        measurable loop, then expands.
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-[1.05fr_1fr] gap-10">
        <div className="flex flex-col gap-3">
          <ExpansionRing
            label="Tactile slip detection / gripper response"
            body="First validation benchmark — closed-loop sensor → Arc → actuator."
            emphasis
            inset={0}
          />
          <ExpansionRing
            label="Robotic manipulation / industrial automation"
            body="Pick-and-place, force-controlled assembly, adaptive grasping."
            inset={28}
          />
          <ExpansionRing
            label="Collaborative robots / mobile manipulators"
            body="Mixed-environment manipulation with variable load and contact."
            inset={56}
          />
          <ExpansionRing
            label="Humanoids · assistive devices · drones · quadrupeds"
            body="Wherever local response, adaptation, or resilience matter."
            inset={84}
          />
        </div>

        <div className="self-start">
          <SectionLabel>Where Arc applies — website language</SectionLabel>
          <div className="mt-5 space-y-4 text-[17px] leading-[1.55] text-fg-secondary">
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                Physical Adaptation
              </div>
              <div className="mt-1 text-fg-primary">
                Gripper control under changing conditions.
              </div>
            </div>
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                Physical Response
              </div>
              <div className="mt-1 text-fg-primary">
                Humanoid safety around humans.
              </div>
            </div>
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                Physical Resilience
              </div>
              <div className="mt-1 text-fg-primary">
                Stability when conditions degrade.
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-[1.55] text-fg-tertiary">
              The initial market is tactile sensing, gripper control, and
              industrial manipulation. Once validated, the same architecture
              extends to other robotic systems where fast local physical
              response, adaptation, energy efficiency, or resilience matter.
            </p>
          </div>
        </div>
      </div>

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
      <h2 className="text-[72px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        From validation to architecture licensing.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-light leading-[1.4] text-fg-secondary">
        Hinoki captures value by{" "}
        <span className="font-semibold text-fg-primary">
          sitting inside robotics platforms
        </span>{" "}
        — not by building robots.
      </p>

      <div className="mt-12 grid max-w-[1640px] grid-cols-3 gap-6">
        <ModelPhaseCard
          phase="Phase 1"
          title="Validation &amp; co-development"
          items={[
            "Grants and non-dilutive R&D funding",
            "Paid technical validation projects",
            "Joint benchmark projects with robotics companies",
            "Partner-specific integration support",
          ]}
        />
        <ModelPhaseCard
          phase="Phase 2"
          title="Reference design licensing"
          items={[
            "Arc control module / embedded control layer",
            "Reference design licensing",
            "Integration support for sensor, gripper, and robotics platform companies",
          ]}
        />
        <ModelPhaseCard
          phase="Phase 3"
          title="Embedded IP &amp; royalties"
          items={[
            "Architecture licensing",
            "Per-platform or per-unit royalties",
            "Embedded IP inside robotics platforms",
          ]}
        />
      </div>

      <p className="mt-10 max-w-[1500px] text-[22px] font-light italic leading-[1.45] text-fg-primary">
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
      className={`grid grid-cols-[180px_1fr_1.3fr_1fr] items-center gap-6 rounded-[8px] border px-6 py-4 ${
        emphasis
          ? "border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div
        className={`font-mono text-[12px] uppercase tracking-[0.14em] ${
          emphasis ? "text-accent" : "text-fg-tertiary"
        }`}
      >
        {layer}
      </div>
      <div
        className={`text-[20px] font-medium leading-[1.25] ${
          emphasis ? "text-fg-primary" : "text-fg-primary"
        }`}
      >
        {label}
      </div>
      <div className="text-[15px] leading-[1.5] text-fg-secondary">{body}</div>
      <div className="text-[14px] italic leading-[1.5] text-fg-tertiary">
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
          examples="Forcesteed · autonomy companies · VLA models"
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
          examples="XELA · FingerVision · Prophesee-type sensors"
        />
        <StackLayer
          layer="Hinoki"
          label="Local physical response layer"
          body="Sensor input → Arc → bounded correction → motor controller."
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
          name="Salvatore Martone"
          role="Co-founder / CEO"
          body={
            <>
              Team building, business strategy, fundraising, customer
              discovery, and investor + robotics company relationships.
              University of Tsukuba biology background — brought the
              biological framing of physical intelligence into the company
              thesis.
            </>
          }
        />
        <FounderCard
          imageSrc="/team/bernardo.png"
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
          <div className="text-[17px] leading-[1.55] text-fg-secondary">
            Salvatore and Bernardo have known each other for{" "}
            <span className="font-semibold text-fg-primary">8 years</span>{" "}
            since the University of Tsukuba. Mina has known the team for{" "}
            <span className="font-semibold text-fg-primary">4 years</span>.
            The founding team is built on long-standing trust — not assembled
            only for an accelerator. Shared mission: build a Tsukuba-rooted
            deep-tech company contributing to Japan and creating a place
            where Japanese and international researchers can work together.
          </div>
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
        <SectionLabel>Confirmed — verbal go-ahead</SectionLabel>
        <div className="mt-4 grid grid-cols-2 gap-5">
          <AdvisorCard
            status="Verbal go-ahead"
            statusTone="confirmed"
            name="Denis Peña"
            credentials="PhD Physical HRI / Human-Robot Interaction, University of Tsukuba · Professor, PUCP"
            value="Human-robot interaction, assistive systems, physical interaction, robotics validation context."
          />
          <AdvisorCard
            status="Verbal go-ahead"
            statusTone="confirmed"
            name="Takayuki Miyamoto"
            credentials="PhD Mechatronics / Human Informatics, University of Tsukuba · Associate Professor, Nagoya University"
            value="Mechatronics, human informatics, robotic systems, academic validation path."
          />
        </div>
      </div>

      <div className="mt-7 max-w-[1640px] grid grid-cols-2 gap-6">
        <div>
          <SectionLabel>Expected from July</SectionLabel>
          <div className="mt-4">
            <AdvisorCard
              status="Expected from July"
              statusTone="expected"
              name="Cedric Caremel"
              credentials="PhD Neuromorphic Networks, University of Tokyo"
              value="Neuromorphic architecture / reservoir-adjacent technical support."
            />
          </div>
        </div>
        <div>
          <SectionLabel>Pending discussion</SectionLabel>
          <div className="mt-4">
            <AdvisorCard
              status="Pending discussion"
              statusTone="pending"
              name="Rafael Cisneros Limón"
              credentials="PhD Intelligent Interaction / Robotics, University of Tsukuba · Senior Researcher, AIST"
              value="AIST robotics ecosystem, intelligent interaction, robotics research credibility."
            />
          </div>
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
            "Finalize XELA non-binding LOI / technical relationship",
            "Continue customer discovery with robotics companies and engineers",
            "Define slip-detection benchmark requirements",
            "Source tactile sensor, gripper, FPGA, and actuator setup",
            "Continue 6-week demo sprint",
          ]}
        />
        <PlanQuarter
          label="3–6 months"
          items={[
            "Build closed-loop tactile-to-actuation validation rig",
            "Run baseline comparison against conventional digital control",
            "Measure response time, adaptation, energy per response, and stability",
          ]}
        />
        <PlanQuarter
          label="6–9 months"
          items={[
            "Share validation data with XELA and other relevant partners",
            "Refine Arc architecture from benchmark results",
            "Prepare patent / IP filing strategy",
            "Secure additional LOIs or collaboration discussions",
          ]}
        />
        <PlanQuarter
          label="9–12 months"
          items={[
            "Begin partner pilot planning",
            "Apply for additional grants",
            "Prepare angel / VC round using benchmark data",
            "Expand validation into adjacent sensor-actuator loops",
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
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Revenue and expenditure plan.
      </h2>
      <p className="mt-4 max-w-[1500px] text-[22px] font-light leading-[1.4] text-fg-secondary">
        Directional plan — from validation, to paid pilots, to licensing.
      </p>

      <div className="mt-10 max-w-[1640px]">
        <div className="grid grid-cols-[120px_220px_1.4fr_1.2fr] gap-6 border-b border-border-strong pb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-fg-tertiary">
          <div>Year</div>
          <div>Revenue (JPY)</div>
          <div>Focus</div>
          <div>Expenses</div>
        </div>
        <YearRow
          year="Year 1"
          revenue="¥0–5M"
          focus="Validation, grants, LOIs, benchmark dataset"
          expenses="Hardware, engineering, IP, customer discovery"
          emphasis
        />
        <YearRow
          year="Year 2"
          revenue="¥10–30M"
          focus="1–3 paid validation / co-development projects"
          expenses="Engineering, integration, partner support"
        />
        <YearRow
          year="Year 3"
          revenue="¥50–100M"
          focus="Early reference design licensing, 3–6 partner projects"
          expenses="Technical team, hardware, IP, business development"
        />
        <YearRow
          year="Year 4"
          revenue="¥150–300M"
          focus="Platform licensing / repeat partner integrations"
          expenses="Support, engineering, market expansion"
        />
        <YearRow
          year="Year 5"
          revenue="¥500M+"
          focus="Embedded IP / royalty model, reference design adoption"
          expenses="Scaling engineering, support, patent portfolio, global partnerships"
        />
      </div>

      <p className="mt-8 max-w-[1500px] text-[15px] italic leading-[1.55] text-fg-tertiary">
        Directional plan — not a precise financial forecast. Ranges reflect
        the natural uncertainty of deep-tech validation timelines and
        licensing-revenue ramps.
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
    <div className="rounded-[8px] border border-border bg-bg-subtle px-5 py-4 text-[16px] leading-[1.5] text-fg-secondary">
      {children}
    </div>
  );
}

function ClosingSlide() {
  return (
    <Slide align="start">
      <Eyebrow>The Ask</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.0] tracking-[-0.025em] text-fg-primary">
        What 1stRound funding unlocks.
      </h2>
      <p className="mt-5 text-[28px] font-light leading-[1.3] tracking-[-0.01em] text-fg-secondary">
        The first benchmark dataset that moves Hinoki from thesis to
        technical validation.
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-[1.1fr_1fr] gap-12">
        <p className="text-[20px] leading-[1.6] text-fg-secondary">
          Hinoki is seeking non-dilutive validation funding to build the
          closed-loop tactile sensing and gripper response benchmark, compare
          Arc against a conventional digital control baseline, and generate
          the dataset required for partner LOIs, technical collaboration,
          patent strategy, and future licensing conversations.
        </p>

        <div>
          <SectionLabel>12-month outcomes</SectionLabel>
          <div className="mt-4 grid grid-cols-1 gap-2.5">
            <OutcomeTile>Closed-loop Arc validation rig</OutcomeTile>
            <OutcomeTile>
              Slip detection / gripper response benchmark
            </OutcomeTile>
            <OutcomeTile>
              Dataset shared with XELA and relevant partners
            </OutcomeTile>
            <OutcomeTile>Stronger LOI / pilot pathway</OutcomeTile>
            <OutcomeTile>Initial patent strategy</OutcomeTile>
            <OutcomeTile>
              Better position for grants, angels, and VC
            </OutcomeTile>
          </div>
        </div>
      </div>

      <p className="mt-12 max-w-[1500px] text-[26px] font-light italic leading-[1.4] tracking-[-0.01em] text-fg-primary">
        Arc starts with one measurable reflex loop.
        <br />
        <span className="not-italic font-semibold">
          The long-term opportunity is physical intelligence infrastructure
          for robotic systems.
        </span>
      </p>

      <SlideFooter pageLabel="17 · The Ask" />
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
