import React from "react";
import {
  Slide,
  Eyebrow,
  SlideFooter,
  FounderCard,
} from "../slides";

// =====================================================================
//  HINOKI — ANTLER IC DECK (source of truth)
//
//  Investment-conviction deck for Antler Japan Pre-IC / IC.
//  English only — no Japanese variant for now.
//  Do not update mobile-antler.tsx unless explicitly requested.
//
//  Main deck — no appendix. 13 slides, one dominant claim each.
//
//    01  Cover — Robots are getting brains. Arc gives them reflexes.
//    02  Vision — Physical intelligence lives in the body.
//    03  Problem — Scaling robots into the real world is hard.
//    04  Solution — Arc adds the missing physical response layer.
//    05  Why Now — Body-control bottleneck is becoming urgent.
//    06  First Proof Point — Slip response is the first measurable wedge.
//    07  Demand Validation — The market is pulling us toward the same loop.
//    08  Defensibility — The first benchmark creates the moat.
//    09  Competition — Stack is crowded. Response layer is open.
//    10  Business Model — ARM-like licensing for robotic control.
//    11  GTM — Account-based validation into OEM licensing.
//    12  Team — Why Hinoki can win from Japan.
//    13  Ask — Antler capital unlocks the benchmark that unlocks the next round.
//
//  Design intent: investment-conviction. Quieter than the 1stRound deck.
//  One dominant claim per slide. Diagrams, flywheels, layer maps,
//  concise proof points. Precise status language; no overstated LOIs.
// =====================================================================

// ---------------------------------------------------------------------
//  Local atoms
// ---------------------------------------------------------------------
function HeroTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-3 text-[20px] font-semibold uppercase tracking-[0.18em] text-accent">
      <img
        src="/assets/logo-hinoki-tree.png"
        alt=""
        width={50}
        height={50}
        className="block h-[50px] w-[50px] shrink-0 object-contain"
        aria-hidden
      />
      <span>{children}</span>
    </div>
  );
}

function FlowBox({
  label,
  emphasis = false,
  size = "md",
}: {
  label: string;
  emphasis?: boolean;
  size?: "sm" | "md";
}) {
  const sizing =
    size === "sm"
      ? "h-[80px] min-w-[160px] text-[16px]"
      : "h-[96px] min-w-[200px] text-[18px]";
  return (
    <div
      className={`flex flex-1 items-center justify-center rounded-[8px] border px-5 text-center font-medium leading-[1.25] ${sizing} ${
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

function BottomBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-auto max-w-[1640px] rounded-[10px] border-2 border-accent bg-accent-subtle px-8 py-6">
      <p className="text-[26px] font-light leading-[1.35] tracking-[-0.015em] text-fg-primary">
        {children}
      </p>
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
    <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-caption">
      {children}
    </div>
  );
}

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
        .hn-node-antler {
          transform-box: fill-box;
          transform-origin: center;
          animation: hn-breathe-antler 2.6s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes hn-breathe-antler {
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
      <circle className="hn-node-antler" cx="60" cy="200" r="7" fill="#E8622A" opacity="0.9" />
      <circle cx="190" cy="155" r="20" fill="#C42B2B" opacity="0.08" />
      <circle cx="190" cy="155" r="10" fill="#C42B2B" opacity="0.12" />
      <circle className="hn-node-antler" style={{ animationDelay: "-430ms" }} cx="190" cy="155" r="5" fill="#C42B2B" opacity="0.85" />
      <circle cx="300" cy="185" r="22" fill="#E8622A" opacity="0.08" />
      <circle cx="300" cy="185" r="12" fill="#E8622A" opacity="0.12" />
      <circle className="hn-node-antler" style={{ animationDelay: "-860ms" }} cx="300" cy="185" r="6" fill="#E8622A" opacity="0.85" />
      <circle cx="420" cy="140" r="18" fill="#C42B2B" opacity="0.07" />
      <circle cx="420" cy="140" r="9" fill="#C42B2B" opacity="0.1" />
      <circle className="hn-node-antler" style={{ animationDelay: "-1210ms" }} cx="420" cy="140" r="4.5" fill="#C42B2B" opacity="0.8" />
      <circle cx="130" cy="260" r="14" fill="#E8622A" opacity="0.07" />
      <circle className="hn-node-antler" style={{ animationDelay: "-1570ms" }} cx="130" cy="260" r="4" fill="#E8622A" opacity="0.7" />
      <circle cx="500" cy="175" r="12" fill="#E8622A" opacity="0.07" />
      <circle className="hn-node-antler" style={{ animationDelay: "-1910ms" }} cx="500" cy="175" r="4" fill="#E8622A" opacity="0.7" />
      <line x1="60" y1="200" x2="130" y2="260" stroke="#E8622A" strokeWidth="0.8" opacity="0.25" />
      <line x1="60" y1="200" x2="190" y2="155" stroke="#C42B2B" strokeWidth="0.8" opacity="0.2" />
      <line x1="190" y1="155" x2="300" y2="185" stroke="#E8622A" strokeWidth="0.8" opacity="0.2" />
      <line x1="300" y1="185" x2="420" y2="140" stroke="#C42B2B" strokeWidth="0.8" opacity="0.2" />
      <line x1="420" y1="140" x2="500" y2="175" stroke="#E8622A" strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

// =====================================================================
//  01 · Cover
// =====================================================================
function CoverSlide() {
  return (
    <Slide>
      <HeroTag>Hinoki Technologies</HeroTag>
      <h1 className="text-[120px] font-light leading-[1.0] tracking-[-0.028em] text-fg-primary">
        Robots are getting brains.
        <br />
        <span className="italic">Arc</span> gives them reflexes.
      </h1>
      <p className="mt-14 max-w-[1180px] text-[30px] font-normal leading-[1.45] text-fg-secondary">
        Hinoki is building the{" "}
        <span className="font-semibold text-fg-primary">
          physical response layer
        </span>{" "}
        robots have been missing — a neuromorphic local control architecture
        that turns sensor data into fast, adaptive physical action, without
        replacing the existing controller.
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[80px] top-[140px] opacity-60"
      >
        <NeuralMotif className="h-auto w-[780px]" />
      </div>

      <div className="absolute bottom-[80px] left-[140px] font-mono text-[16px] tracking-[0.08em] text-fg-tertiary">
        Antler Japan · Pre-IC / IC · May 2026 · hinokitech.com
      </div>
    </Slide>
  );
}

// =====================================================================
//  02 · Vision
// =====================================================================
function BehaviorCard({
  label,
  headline,
  body,
}: {
  label: string;
  headline: string;
  body: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-8">
      <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      <div className="mt-5 text-[26px] font-light leading-[1.22] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <p className="mt-4 text-[17px] leading-[1.55] text-fg-secondary">
        {body}
      </p>
    </div>
  );
}

function VisionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Vision</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        Physical intelligence doesn&rsquo;t live in the brain.
        <br />
        <span className="font-normal">It lives in the body.</span>
      </h2>

      <div className="mt-14 grid max-w-[1640px] grid-cols-3 gap-6">
        <BehaviorCard
          label="Response"
          headline="A body that acts before the brain decides."
          body="Touch something hot — your hand pulls back before you think. That is the loop Arc operationalizes."
        />
        <BehaviorCard
          label="Adaptation"
          headline="A body that learns from contact, instantly."
          body="An animal walks across unfamiliar ground and adjusts in milliseconds. No replanning. No retraining."
        />
        <BehaviorCard
          label="Resilience"
          headline="A body that keeps going when a part fails."
          body="A damaged body redistributes movement. Intelligence in the substrate, not the central plan."
        />
      </div>

      <BottomBanner>
        Hinoki is building the{" "}
        <span className="font-semibold">physical intelligence infrastructure</span>{" "}
        every robotic platform of the next decade will need — three behaviors,
        one architecture.
      </BottomBanner>

      <SlideFooter pageLabel="02 · Vision" />
    </Slide>
  );
}

// =====================================================================
//  03 · Problem
// =====================================================================
function ProblemCard({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-8">
      <div className="text-[24px] font-medium leading-[1.22] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <p className="mt-5 text-[17px] leading-[1.55] text-fg-secondary">
        {body}
      </p>
    </div>
  );
}

function ProblemSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Problem</Eyebrow>
      <h2 className="text-[72px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
        Robots work in controlled environments.
        <br />
        Scaling them into the real world remains hard.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        The core issue is not perception alone. It is{" "}
        <span className="font-semibold text-fg-primary">
          physical generalization
        </span>{" "}
        — turning sensor data into reliable physical action when the world
        changes.
      </p>

      <div className="mt-12 grid max-w-[1640px] grid-cols-3 gap-6">
        <ProblemCard
          headline="Works in the lab, fails in the field."
          body="Behavior that looks capable in structured settings breaks when object properties or operating conditions shift in production."
        />
        <ProblemCard
          headline="Too slow at the physical edge."
          body="Slip, contact, imbalance, and force change occur faster than the perception-to-planning path can correct."
        />
        <ProblemCard
          headline="Hard to repeat across customers."
          body="Each new site requires custom tuning, more field engineering, slower speeds, narrower use cases."
        />
      </div>

      <BottomBanner>
        For robotics companies, this is a{" "}
        <span className="font-semibold">scaling problem</span>. Deployments
        take longer, require more field engineering, run at lower speeds, and
        become harder to repeat profitably across customers.
      </BottomBanner>

      <SlideFooter pageLabel="03 · Problem" />
    </Slide>
  );
}

// =====================================================================
//  04 · Solution
// =====================================================================
function SolutionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Solution</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        <span className="italic">Arc</span> adds the missing
        <br />
        physical response layer.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        A neuromorphic local control layer between selected sensors and
        actuators — alongside, not instead of, the existing controller.
      </p>

      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-8">
        <div className="rounded-[8px] border border-border bg-bg-subtle p-8">
          <MutedLabel>Today</MutedLabel>
          <div className="mt-5 flex flex-wrap items-center gap-y-3">
            <FlowBox label="Sensor data" />
            <FlowArrow />
            <FlowBox label="Perception / planning / control" />
            <FlowArrow />
            <FlowBox label="Actuator response" />
          </div>
        </div>
        <div className="rounded-[8px] border-2 border-accent bg-accent-subtle p-8">
          <SectionLabel>With Arc</SectionLabel>
          <div className="mt-5 flex flex-wrap items-center gap-y-3">
            <FlowBox label="Sensor event" />
            <FlowArrow />
            <FlowBox label="Arc local reflex layer" emphasis />
            <FlowArrow />
            <FlowBox label="Bounded correction" emphasis />
            <FlowArrow />
            <FlowBox label="Actuator response" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-6 text-[22px] font-medium leading-[1.3] text-fg-primary">
        <div className="flex items-center gap-3">
          <span className="text-accent">·</span>
          <span>Faster local response</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-accent">·</span>
          <span>Adaptive physical dynamics</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-accent">·</span>
          <span>Works alongside existing controllers</span>
        </div>
      </div>

      <BottomBanner>
        Not another robot brain. A{" "}
        <span className="font-semibold">nervous-system-like control layer</span>{" "}
        that can be validated in one physical loop, then licensed across
        robotic systems.
      </BottomBanner>

      <SlideFooter pageLabel="04 · Solution" />
    </Slide>
  );
}

// =====================================================================
//  05 · Why Now
// =====================================================================
function ForceCard({
  index,
  body,
}: {
  index: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
        Force {index}
      </div>
      <p className="mt-5 text-[20px] leading-[1.45] text-fg-primary">{body}</p>
    </div>
  );
}

function WhyNowSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Why Now</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        The body-control bottleneck
        <br />
        is becoming urgent.
      </h2>

      <div className="mt-14 grid max-w-[1640px] grid-cols-4 gap-5">
        <ForceCard
          index="01"
          body={
            <>
              AI is pushing robots into{" "}
              <span className="font-semibold">
                less structured environments
              </span>
              .
            </>
          }
        />
        <ForceCard
          index="02"
          body={
            <>
              Tactile, force, and event-based sensors create{" "}
              <span className="font-semibold">richer physical data</span> than
              the control layer can use.
            </>
          }
        />
        <ForceCard
          index="03"
          body={
            <>
              Japan&rsquo;s aging society, labor shortage, manufacturing
              pressure, and elder-care needs make robotics a{" "}
              <span className="font-semibold">national priority</span>.
            </>
          }
        />
        <ForceCard
          index="04"
          body={
            <>
              <span className="font-semibold">FPGA-first validation</span>{" "}
              lets Hinoki test adaptive response before ASIC, reference
              design, or embedded IP.
            </>
          }
        />
      </div>

      <BottomBanner>
        The world is building better robot brains. Hinoki is building{" "}
        <span className="font-semibold">
          the response layer that lets those robots work in the real world.
        </span>
      </BottomBanner>

      <SlideFooter pageLabel="05 · Why Now" />
    </Slide>
  );
}

// =====================================================================
//  06 · First Proof Point
// =====================================================================
function FirstProofPointSlide() {
  return (
    <Slide align="start">
      <Eyebrow>First Proof Point</Eyebrow>
      <h2 className="text-[76px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        Slip response is the first
        <br />
        measurable proof point.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        The first benchmark is narrow by design: tactile sensing to fast
        gripper response. Concrete, measurable, and partner-relevant.
      </p>

      <div className="mt-14 max-w-[1640px]">
        <MutedLabel>Closed-loop benchmark</MutedLabel>
        <div className="mt-4 flex flex-wrap items-center gap-y-3">
          <FlowBox label="Tactile sensor" />
          <FlowArrow />
          <FlowBox label="Arc" emphasis />
          <FlowArrow />
          <FlowBox label="Bounded correction" emphasis />
          <FlowArrow />
          <FlowBox label="Motor controller" />
          <FlowArrow />
          <FlowBox label="Gripper stabilizes" />
        </div>
      </div>

      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-x-16 gap-y-4 text-[22px] leading-[1.45] text-fg-primary">
        <div className="flex items-center gap-3">
          <span className="text-accent">·</span>
          <span>Concrete and measurable</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-accent">·</span>
          <span>Partner-relevant</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-accent">·</span>
          <span>Does not require full robot redesign</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-accent">·</span>
          <span>Expands into broader manipulation &amp; physical response</span>
        </div>
      </div>

      <BottomBanner>
        Slip detection is{" "}
        <span className="font-semibold">not the final market</span>. It is the
        fastest credible path to prove the architecture.
      </BottomBanner>

      <SlideFooter pageLabel="06 · First Proof Point" />
    </Slide>
  );
}

// =====================================================================
//  07 · Demand Validation
// =====================================================================
function ProofArea({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-6">
      <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      <ul className="mt-4 flex-1 space-y-2.5 text-[15px] leading-[1.55] text-fg-primary">
        {children}
      </ul>
    </div>
  );
}

function ProofItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="shrink-0 text-accent">·</span>
      <span>{children}</span>
    </li>
  );
}

function DemandValidationSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Demand Validation</Eyebrow>
      <h2 className="text-[68px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        The market is pulling us toward
        <br />
        the same first loop.
      </h2>

      <div className="mt-10 grid max-w-[1640px] grid-cols-4 gap-4">
        <ProofArea label="Customer pull">
          <ProofItem>
            <span className="font-semibold text-fg-primary">
              Tokyo-based tactile sensing partner
            </span>{" "}
            — technical LOI being finalized
          </ProofItem>
          <ProofItem>
            Assistive robotics company — CEO meeting scheduled
          </ProofItem>
          <ProofItem>
            Cognitive robotics company — co-founder meeting being set
          </ProofItem>
          <ProofItem>
            Vision-based tactile sensing — warm route identified
          </ProofItem>
        </ProofArea>

        <ProofArea label="Engineer signal">
          <ProofItem>
            AMR, humanoid, quadruped, assistive, marine, and service
            robotics engineers confirmed pain around latency, noisy input,
            variable loads, wheel slip, and real-time response
          </ProofItem>
          <ProofItem>
            <span className="font-semibold text-fg-primary">
              Slip-to-gripper response
            </span>{" "}
            identified as the strongest first wedge
          </ProofItem>
        </ProofArea>

        <ProofArea label="Technical momentum">
          <ProofItem>Phase 1 FPGA validation completed</ProofItem>
          <ProofItem>6-week demo sprint underway</ProofItem>
          <ProofItem>Phase 2 benchmark defined</ProofItem>
        </ProofArea>

        <ProofArea label="Capital / ecosystem">
          <ProofItem>Antler Japan Residency 2026</ProofItem>
          <ProofItem>Coreline / Atlas — first screening passed</ProofItem>
          <ProofItem>
            Sony Innovation Fund — materials shared with deep-tech team
          </ProofItem>
          <ProofItem>
            The Ventures Award — first round passed
          </ProofItem>
        </ProofArea>
      </div>

      <BottomBanner>
        We are not building in isolation.{" "}
        <span className="font-semibold">
          Customer and engineer feedback narrowed Arc into a measurable
          benchmark.
        </span>
      </BottomBanner>

      <SlideFooter pageLabel="07 · Demand Validation" />
    </Slide>
  );
}

// =====================================================================
//  08 · Defensibility
// =====================================================================
function FlywheelNode({
  label,
  emphasis = false,
}: {
  label: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-[88px] min-w-[180px] flex-1 items-center justify-center rounded-[8px] border px-4 text-center text-[16px] font-medium leading-[1.3] ${
        emphasis
          ? "border-accent bg-accent-subtle text-fg-primary"
          : "border-border bg-bg-subtle text-fg-primary"
      }`}
    >
      {label}
    </div>
  );
}

function DefensibilitySlide() {
  return (
    <Slide align="start">
      <Eyebrow>Defensibility</Eyebrow>
      <h2 className="text-[76px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        The first benchmark creates the moat.
      </h2>

      <div className="mt-12 max-w-[1640px]">
        <MutedLabel>Defensibility flywheel</MutedLabel>
        <div className="mt-4 flex flex-wrap items-center gap-y-3">
          <FlywheelNode label="Closed-loop benchmark" emphasis />
          <FlowArrow />
          <FlywheelNode label="Proprietary physical-response data" />
          <FlowArrow />
          <FlywheelNode label="Tuning know-how" />
          <FlowArrow />
          <FlywheelNode label="Integration recipes" />
          <FlowArrow />
          <FlywheelNode label="Patentable control methods" />
          <FlowArrow />
          <FlywheelNode label="Reference design / embedded IP" />
        </div>
      </div>

      <div className="mt-10 grid max-w-[1640px] grid-cols-2 gap-6">
        <div className="rounded-[8px] border border-border bg-bg-subtle p-7">
          <MutedLabel>Silicon-first</MutedLabel>
          <ul className="mt-4 space-y-2 text-[19px] leading-[1.45] text-fg-primary">
            <li>· Architecture frozen at tape-out</li>
            <li>· Multi-year iteration</li>
            <li>· Capital-intensive</li>
          </ul>
        </div>
        <div className="rounded-[8px] border-2 border-accent bg-accent-subtle p-7">
          <SectionLabel>FPGA-first</SectionLabel>
          <ul className="mt-4 space-y-2 text-[19px] leading-[1.45] text-fg-primary">
            <li>· Architecture iterable weekly</li>
            <li>· Empirical topology discovery</li>
            <li>· Capital-efficient validation</li>
          </ul>
        </div>
      </div>

      <BottomBanner>
        The first benchmark creates more than proof. It creates{" "}
        <span className="font-semibold">
          proprietary data, IP, and integration know-how.
        </span>
      </BottomBanner>

      <p className="mt-6 max-w-[1500px] text-[18px] font-light italic leading-[1.4] tracking-[-0.005em] text-fg-secondary">
        The incumbents bet on the answer.{" "}
        <span className="not-italic font-semibold text-fg-primary">
          We bet on the question.
        </span>
      </p>

      <SlideFooter pageLabel="08 · Defensibility" />
    </Slide>
  );
}

// =====================================================================
//  09 · Competition — Layer map
// =====================================================================
function LayerRow({
  layer,
  focus,
  players,
  view,
  emphasis = false,
}: {
  layer: string;
  focus: string;
  players: string;
  view: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[220px_1fr_1fr_1.1fr] items-start gap-6 rounded-[8px] border px-6 py-4 ${
        emphasis
          ? "border-2 border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div
        className={`font-mono uppercase ${
          emphasis
            ? "text-[13px] font-semibold tracking-[0.16em] text-accent"
            : "text-[12px] tracking-[0.14em] text-fg-caption"
        }`}
      >
        {layer}
      </div>
      <div
        className={`leading-[1.3] ${
          emphasis
            ? "text-[17px] font-semibold text-fg-primary"
            : "text-[16px] font-medium text-fg-primary"
        }`}
      >
        {focus}
      </div>
      <div className="text-[14px] italic leading-[1.45] text-fg-caption">
        {players}
      </div>
      <div
        className={`leading-[1.45] ${
          emphasis ? "text-[15px] text-fg-primary" : "text-[14px] text-fg-secondary"
        }`}
      >
        {view}
      </div>
    </div>
  );
}

function CompetitionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Competition</Eyebrow>
      <h2 className="text-[60px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        The robotics stack is crowded.
        <br />
        The physical response layer is still open.
      </h2>

      <div className="mt-8 max-w-[1640px]">
        <div className="grid grid-cols-[220px_1fr_1fr_1.1fr] gap-6 border-b border-border-strong pb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-caption">
          <div>Layer</div>
          <div>Focus</div>
          <div>Representative players</div>
          <div>Hinoki view</div>
        </div>
        <div className="mt-3 flex flex-col gap-2.5">
          <LayerRow
            layer="Robot brains"
            focus="Cognition, reasoning, policies, planning"
            players="Google DeepMind Gemini Robotics · Physical Intelligence · Skild AI · Covariant"
            view="Complementary. The brain decides what should happen."
          />
          <LayerRow
            layer="Sensing input"
            focus="Force, slip, contact, motion data"
            players="XELA Robotics · FingerVision · Prophesee"
            view="Partners first. Potential substitutes if they move into control."
          />
          <LayerRow
            layer="Deployment / Robot OS"
            focus="Programming, simulation, path planning, vision-guided adaptation"
            players="Intrinsic · Wandelbots · Realtime Robotics · Micropsi"
            view="Adjacent. These improve deployment workflows."
          />
          <LayerRow
            layer="Neuromorphic / Edge AI"
            focus="Low-power edge intelligence and chips"
            players="TDK · Innatera · SynSense · BrainChip"
            view="Technically adjacent. Not focused on closed-loop robotic physical response."
          />
          <LayerRow
            layer="OEM internal teams"
            focus="Internal control development"
            players="Robot OEMs and industrial equipment manufacturers"
            view="The most real substitute. Arc becomes the specialized licensable layer OEMs can test in one loop."
          />
          <LayerRow
            layer="Hinoki · Arc"
            focus="Local physical-response layer between sensing and actuation"
            players="FPGA-first robotics validation · Closed-loop benchmark · Bounded correction · Proprietary data · Tuning recipes · Reference design / embedded IP path"
            view="Owns the missing layer between brains and bodies."
            emphasis
          />
        </div>
      </div>

      <BottomBanner>
        Better brains decide what should happen.{" "}
        <span className="font-semibold">
          Arc helps the body respond when the world changes.
        </span>
      </BottomBanner>

      <SlideFooter pageLabel="09 · Competition" />
    </Slide>
  );
}

// =====================================================================
//  10 · Business Model
// =====================================================================
function PhaseCard({
  phase,
  title,
  body,
}: {
  phase: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
        {phase}
      </div>
      <div className="mt-4 text-[24px] font-medium leading-[1.25] tracking-[-0.005em] text-fg-primary">
        {title}
      </div>
      <p className="mt-3 text-[16px] leading-[1.55] text-fg-secondary">
        {body}
      </p>
    </div>
  );
}

function UnitLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[1.4fr_1fr] items-baseline gap-6 border-b border-border/70 py-3 last:border-b-0">
      <div className="text-[17px] leading-[1.45] text-fg-primary">{label}</div>
      <div className="font-mono text-[16px] tracking-[0.04em] text-fg-secondary">
        {value}
      </div>
    </div>
  );
}

function BusinessModelSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Business Model</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        ARM-like licensing for robotic control.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        We do not build robots.{" "}
        <span className="font-semibold text-fg-primary">
          We license the architecture layer that helps them physically respond.
        </span>
      </p>

      <div className="mt-12 grid max-w-[1640px] grid-cols-3 gap-5">
        <PhaseCard
          phase="Phase 1"
          title="Paid validation & co-development"
          body="Creates early revenue, proprietary data, and reference customers."
        />
        <PhaseCard
          phase="Phase 2"
          title="Reference design licensing"
          body="Annual license fees for platform partners integrating Arc."
        />
        <PhaseCard
          phase="Phase 3"
          title="Embedded IP royalties"
          body="Per-platform or per-unit royalties as Arc becomes embedded in partner systems."
        />
      </div>

      <div className="mt-8 max-w-[1640px] rounded-[8px] border border-border bg-bg-subtle px-7 py-5">
        <MutedLabel>Unit logic</MutedLabel>
        <div className="mt-2 grid grid-cols-2 gap-x-12">
          <UnitLine
            label="Paid validation / co-development"
            value="¥5–15M per project"
          />
          <UnitLine
            label="Reference design / integration"
            value="¥10–30M per partner"
          />
          <UnitLine
            label="Platform license"
            value="¥30–100M+ per partner"
          />
          <UnitLine
            label="Embedded IP royalties"
            value="per-platform / per-unit"
          />
        </div>
      </div>

      <p className="mt-8 max-w-[1500px] text-[24px] font-light italic leading-[1.4] tracking-[-0.01em] text-fg-secondary">
        Co-development is the entry path.{" "}
        <span className="not-italic font-semibold text-fg-primary">
          Licensing is the business model.
        </span>
      </p>

      <SlideFooter pageLabel="10 · Business Model" />
    </Slide>
  );
}

// =====================================================================
//  11 · GTM — Account-based validation into OEM licensing
// =====================================================================
function GtmStep({
  index,
  title,
  body,
  emphasis = false,
}: {
  index: string;
  title: string;
  body: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-[8px] border p-6 ${
        emphasis
          ? "border-2 border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span
          className={`font-mono text-[28px] font-light leading-none ${
            emphasis ? "text-accent" : "text-fg-tertiary"
          }`}
        >
          {index}
        </span>
        <div className="text-[20px] font-medium leading-[1.25] text-fg-primary">
          {title}
        </div>
      </div>
      <p className="mt-4 text-[15px] leading-[1.55] text-fg-secondary">
        {body}
      </p>
    </div>
  );
}

function GtmSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Go-to-Market</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Account-based validation into OEM licensing.
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        Hinoki&rsquo;s first motion is not broad sales. It is{" "}
        <span className="font-semibold text-fg-primary">
          deep technical validation with a small number of strategic robotics
          partners
        </span>{" "}
        — Japan enterprise adoption is relationship-driven and account-based.
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-4 gap-4">
        <GtmStep
          index="01"
          title="Pick the right accounts"
          body={
            <>
              Target 3–5 strategic accounts in Japan across{" "}
              <span className="font-semibold text-fg-primary">
                robot OEMs, industrial equipment makers, SIers, R&amp;D
                divisions, and service robotics
              </span>
              .
            </>
          }
        />
        <GtmStep
          index="02"
          title="Define one measurable loop"
          body="For each account, identify one control-critical loop where physical response matters: slip response, contact stability, load shift, noisy input, force / torque instability, energy per correction."
        />
        <GtmStep
          index="03"
          title="Run a 4–8 week technical PoC"
          body="Compare Arc against a conventional digital baseline using agreed KPIs: response latency, energy per response, grasp / motion stability, signal robustness, failed-action reduction, integration difficulty."
        />
        <GtmStep
          index="04"
          title="Convert successful validation"
          emphasis
          body="Move from technical validation into paid co-development, reference design licensing, OEM integration discussion, or embedded IP pathway."
        />
      </div>

      <div className="mt-8 max-w-[1640px]">
        <MutedLabel>Japan enterprise adoption pattern</MutedLabel>
        <div className="mt-4 flex flex-wrap items-center gap-y-3">
          <FlowBox label="PoC" size="sm" emphasis />
          <FlowArrow />
          <FlowBox label="Evaluation" size="sm" />
          <FlowArrow />
          <FlowBox label="Small-scale deployment" size="sm" />
          <FlowArrow />
          <FlowBox label="Expansion" size="sm" />
        </div>
      </div>

      <BottomBanner>
        The first customer motion creates more than revenue. It creates{" "}
        <span className="font-semibold">
          benchmark data, reference customers, integration know-how, and
          licensing leverage.
        </span>
      </BottomBanner>

      <SlideFooter pageLabel="11 · Go-to-Market" />
    </Slide>
  );
}

// =====================================================================
//  12 · Team — Why Hinoki can win from Japan
// =====================================================================
function AdvisorChip({
  area,
  status,
  variant = "pending",
}: {
  area: string;
  status: string;
  variant?: "committed" | "expected" | "pending";
}) {
  const isCommitted = variant === "committed";
  const statusTone =
    variant === "committed"
      ? "text-accent"
      : variant === "expected"
        ? "text-fg-secondary"
        : "text-fg-caption";
  return (
    <div
      className={`flex min-w-[260px] flex-1 flex-col gap-1 rounded-[8px] border px-5 py-3 ${
        isCommitted
          ? "border-accent bg-accent-subtle"
          : "border-border bg-bg-base"
      }`}
    >
      <div className="text-[16px] font-medium leading-[1.25] text-fg-primary">
        {area}
      </div>
      <div
        className={`font-mono text-[11px] uppercase tracking-[0.14em] ${statusTone}`}
      >
        {status}
      </div>
    </div>
  );
}

function AdvantagePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-bg-subtle px-4 py-2 text-[14px] leading-[1.3] text-fg-secondary">
      {children}
    </span>
  );
}

function TeamSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Team</Eyebrow>
      <h2 className="text-[72px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        Why Hinoki can win from Japan.
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        A Tsukuba-rooted team combining commercial execution, FPGA robotics
        implementation, Japan operations, and a technical advisor network
        across robotics and neuromorphic systems.
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-5">
        <FounderCard
          imageSrc="/team/salvatore.jpg"
          objectPosition="center 30%"
          affiliation="University of Tsukuba"
          name="Salvatore"
          role="CEO · Commercial"
          body={
            <>
              Biology background, University of Tsukuba.{" "}
              <span className="font-semibold text-fg-primary">
                Co-architect of the Arc thesis.
              </span>{" "}
              Built a Japan-based enterprise practice from zero. Leads
              commercial strategy, investor relations, and customer
              development.
            </>
          }
        />
        <FounderCard
          imageSrc="/team/bernardo.png"
          affiliation="University of Tsukuba · AIST"
          name="Bernardo"
          role="CTO · Technical"
          body={
            <>
              <span className="font-semibold text-fg-primary">
                PhD computer vision engineer.
              </span>{" "}
              Robotics, embedded AI, FPGA / reservoir implementation. Former
              AIST Tsukuba researcher. Built and validated Phase 1.
            </>
          }
        />
        <FounderCard
          imageSrc="/team/mina.jpg"
          objectPosition="center 25%"
          affiliation="Meiji Yasuda Life Insurance"
          name="Mina"
          role="COO · Japan Operations"
          body={
            <>
              <span className="font-semibold text-fg-primary">
                Native Japanese.
              </span>{" "}
              Former manager at Meiji Yasuda Life Insurance. Japanese
              corporate stakeholder management, operations, and Japan
              ecosystem development.
            </>
          }
        />
      </div>

      <div className="mt-6 max-w-[1640px] rounded-[8px] border border-border bg-bg-subtle/70 p-5">
        <div className="flex items-baseline justify-between">
          <SectionLabel>Technical advisor network</SectionLabel>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-caption">
            Status as of May 2026
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <AdvisorChip
            variant="committed"
            area="Physical HRI"
            status="Verbal agreement"
          />
          <AdvisorChip
            variant="committed"
            area="Mechatronics"
            status="Verbal agreement"
          />
          <AdvisorChip
            variant="expected"
            area="Neuromorphic Networks"
            status="Expected from July"
          />
          <AdvisorChip
            variant="pending"
            area="AIST Senior Robotics"
            status="Discussion pending"
          />
        </div>
      </div>

      <div className="mt-5 max-w-[1640px] rounded-[8px] border border-border bg-bg-subtle/70 p-5">
        <SectionLabel>Unfair advantage</SectionLabel>
        <div className="mt-3 flex flex-wrap gap-2.5">
          <AdvantagePill>Tsukuba Science City launchpad</AdvantagePill>
          <AdvantagePill>
            Japan timing — aging society, labor shortage, manufacturing,
            elder care
          </AdvantagePill>
          <AdvantagePill>
            Researcher network — Physical HRI, Mechatronics, Neuromorphic
            Networks, AIST, Tsukuba, Tokyo, Nagoya
          </AdvantagePill>
          <AdvantagePill>FPGA-to-IP learning loop</AdvantagePill>
        </div>
      </div>

      <p className="mt-5 max-w-[1640px] text-[18px] font-light italic leading-[1.45] text-fg-secondary">
        Salvatore and Bernardo have known each other for 8 years since the
        University of Tsukuba. Mina has known the team for 4 years.{" "}
        <span className="not-italic font-semibold text-fg-primary">
          This team was not assembled for the accelerator.
        </span>
      </p>

      <SlideFooter pageLabel="12 · Team" />
    </Slide>
  );
}

// =====================================================================
//  13 · Ask — Antler capital unlocks the benchmark
// =====================================================================
function MilestoneCard({
  range,
  body,
  emphasis = false,
}: {
  range: string;
  body: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-[8px] border p-7 ${
        emphasis
          ? "border-2 border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div
        className={`font-mono text-[13px] uppercase tracking-[0.16em] ${
          emphasis ? "text-accent" : "text-fg-caption"
        }`}
      >
        {range}
      </div>
      <p className="mt-5 text-[19px] leading-[1.5] text-fg-primary">{body}</p>
    </div>
  );
}

function AskSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Milestones / Ask</Eyebrow>
      <h2 className="text-[68px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Antler capital unlocks the benchmark
        <br />
        that unlocks the next round.
      </h2>

      <div className="mt-14 grid max-w-[1640px] grid-cols-4 gap-5">
        <MilestoneCard
          range="Now → IC"
          emphasis
          body={
            <>
              Finalize first technical LOI, define benchmark, continue demo
              sprint.
            </>
          }
        />
        <MilestoneCard
          range="0–3 months"
          body={
            <>
              Build closed-loop tactile-to-actuation validation rig. Run Arc
              vs. conventional baseline.
            </>
          }
        />
        <MilestoneCard
          range="3–6 months"
          body={
            <>
              Share validation data with partners. Secure 1–2 deeper partner
              pilot paths. Prepare initial IP filing.
            </>
          }
        />
        <MilestoneCard
          range="6–9 months"
          body={
            <>
              Raise from professional investors using benchmark data, LOIs,
              and IP strategy.
            </>
          }
        />
      </div>

      <p className="mt-14 max-w-[1500px] text-[30px] font-light italic leading-[1.35] tracking-[-0.015em] text-fg-primary">
        One measurable reflex loop becomes the foundation for{" "}
        <span className="not-italic font-semibold">
          physical intelligence infrastructure.
        </span>
      </p>

      <SlideFooter pageLabel="13 · Ask" />
    </Slide>
  );
}

// =====================================================================
//  Ordered slide manifest — 13 main slides, no appendix.
// =====================================================================
export const SLIDES_ANTLER: Array<() => React.JSX.Element> = [
  CoverSlide,
  VisionSlide,
  ProblemSlide,
  SolutionSlide,
  WhyNowSlide,
  FirstProofPointSlide,
  DemandValidationSlide,
  DefensibilitySlide,
  CompetitionSlide,
  BusinessModelSlide,
  GtmSlide,
  TeamSlide,
  AskSlide,
];
