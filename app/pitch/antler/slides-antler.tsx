import React from "react";
import {
  Slide,
  Eyebrow,
  SlideFooter,
  FounderCard,
} from "../slides";
import {
  ArcArchitectureSlide as FirstRoundArchitectureSlide,
  BenchmarkSlide as FirstRoundBenchmarkSlide,
  MarketSlide as FirstRoundMarketSlide,
} from "../1stround/slides-1stround";

// =====================================================================
//  HINOKI — ANTLER IC DECK (source of truth)
//
//  Investment-conviction deck for Antler Japan Pre-IC / IC.
//  English only — no Japanese variant for now.
//  Do not update mobile-antler.tsx unless explicitly requested.
//
//  Main deck — 15 IC slides + 2 appendix (Vision, Defensibility).
//
//    01  Cover — Robots are getting brains. Arc gives them reflexes.
//    02  Problem — Scaling robots into the real world is hard.
//    03  Solution — Arc adds the missing physical response layer companies need.
//    04  Architecture — Arc local reflex layer for robotic systems.
//    05  Discovery — What engineers are telling us so far.
//    06  First Benchmark — Tactile slip detection and fast gripper response.
//    07  Why Now — 2025 robotics funding reached roughly $28B to $41B globally.
//    08  Business Model — ARM-like licensing for robotic control.
//    09  Market — A measurable beachhead inside a platform-wide opportunity.
//    10  Competition — Stack is crowded. Response layer is open.
//    11  GTM — Account-based validation into OEM licensing.
//    12  Unfair Advantage — Why Hinoki can win from Japan.
//    13  Team — The founders and the chemistry behind Arc.
//    14  Ask — Antler capital unlocks the benchmark that unlocks the next round.
//    15  Thank You
//
//  Appendix:
//    A1  Vision — A piece of Hinoki architecture in every robotic system.
//    A2  Defensibility — The first benchmark creates the moat.
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
        className="pointer-events-none absolute right-[80px] -top-[16px] opacity-60"
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
//  Appendix · A1 — Vision
// =====================================================================
function VisionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Vision</Eyebrow>
      <h2 className="max-w-[1640px] text-[72px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        Hinoki&rsquo;s vision is to have a piece of our architecture play a
        role in every robotic system.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[26px] font-normal leading-[1.45] text-fg-secondary">
        Achieved through novelty, discipline, and technical execution.
      </p>

      <div className="mt-14 max-w-[1500px] space-y-10">
        <div className="border-l-2 border-accent/40 pl-5">
          <p className="text-[32px] font-normal leading-[1.35] tracking-[-0.01em] text-fg-primary">
            Novelty
          </p>
          <p className="mt-3 text-[22px] leading-[1.5] text-fg-secondary">
            A physical intelligence layer — not another robot brain — that
            closes the sensor-to-actuator loop locally and adaptively.
          </p>
        </div>
        <div className="border-l-2 border-accent/40 pl-5">
          <p className="text-[32px] font-normal leading-[1.35] tracking-[-0.01em] text-fg-primary">
            Discipline
          </p>
          <p className="mt-3 text-[22px] leading-[1.5] text-fg-secondary">
            One credible benchmark at a time. Prove the architecture in a
            bounded physical loop before licensing it across platforms.
          </p>
        </div>
        <div className="border-l-2 border-accent/40 pl-5">
          <p className="text-[32px] font-normal leading-[1.35] tracking-[-0.01em] text-fg-primary">
            Technical execution
          </p>
          <p className="mt-3 text-[22px] leading-[1.5] text-fg-secondary">
            FPGA-first validation, empirical discovery, and integration paths
            that let partners evaluate Arc without redesigning the whole stack.
          </p>
        </div>
      </div>

      <BottomBanner>
        We believe a robot can one day cradle a baby — the ultimate test of
        sensors and actuators functioning as a{" "}
        <span className="font-semibold">unified system</span>.
      </BottomBanner>

      <SlideFooter pageLabel="A1 · Vision" />
    </Slide>
  );
}

// =====================================================================
//  03 · Problem
// =====================================================================
function ContrastListItem({
  headline,
  body,
  variant = "problem",
}: {
  headline: string;
  body: string;
  variant?: "problem" | "solution";
}) {
  return (
    <div
      className={`border-l-2 pl-5 ${
        variant === "solution" ? "border-accent" : "border-accent/40"
      }`}
    >
      <div className="text-[22px] font-medium leading-[1.22] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <p className="mt-2 text-[16px] leading-[1.5] text-fg-secondary">{body}</p>
    </div>
  );
}

function ProblemSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Problem · physical generalization</Eyebrow>
      <h2 className="text-[72px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
        Robots work in controlled environments.
        <br />
        They break down when physical conditions change.
      </h2>

      <div className="mt-10 grid max-w-[1640px] grid-cols-2 gap-x-10 gap-y-7">
        <ContrastListItem
          headline="Longer deployment cycles"
          body="Each new site or use case requires more testing, tuning, and field engineering before the robot performs reliably."
        />
        <ContrastListItem
          headline="More manual intervention"
          body="When contact, slip, load, or vibration changes, robots can require human correction, reset, or supervision."
        />
        <ContrastListItem
          headline="Lower operating speeds"
          body="Teams compensate for uncertainty by slowing robots down, widening safety margins, or narrowing the allowed operating conditions."
        />
        <ContrastListItem
          headline="More failed actions"
          body="Dropped objects, unstable handling, wheel slip, force-control issues, and overcorrections reduce trust in deployment."
        />
        <ContrastListItem
          headline="Harder customer repeatability"
          body="A solution that works in one environment may not transfer cleanly to the next customer, object type, or physical setup."
        />
        <ContrastListItem
          headline="Weaker deployment economics"
          body="More support cost, longer integration timelines, and lower reliability make each customer harder to serve profitably."
        />
      </div>

      <BottomBanner>
        For robotics companies, this is the{" "}
        <span className="font-semibold">scaling problem</span>: robots do not
        just need to work once, they need to work reliably across changing
        physical conditions, customer sites, and real-world environments.
      </BottomBanner>

      <SlideFooter pageLabel="02 · Problem" />
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
      <h2 className="max-w-[1640px] text-[72px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        <span className="italic">Arc</span> adds the missing physical response
        layer companies need.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[26px] font-normal leading-[1.45] text-fg-secondary">
        A neuromorphic local control architecture that helps robots respond
        inside selected sensor-actuator loops, solving the generalization
        problem.
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-2 gap-x-10 gap-y-7">
        <ContrastListItem
          variant="solution"
          headline="Faster deployment cycles"
          body="Arc can be evaluated on one control-critical loop without redesigning the full stack, reducing tuning and field engineering per site."
        />
        <ContrastListItem
          variant="solution"
          headline="Less manual intervention"
          body="Local response to slip, contact, load, and vibration changes reduces reset, supervision, and human correction in the field."
        />
        <ContrastListItem
          variant="solution"
          headline="Higher operating speeds"
          body="Faster physical correction at the edge lets teams run with tighter safety margins and less speed compensation."
        />
        <ContrastListItem
          variant="solution"
          headline="Fewer failed actions"
          body="Bounded corrective action in the sensor-actuator loop reduces dropped objects, unstable handling, slip, and force-control failures."
        />
        <ContrastListItem
          variant="solution"
          headline="Easier customer repeatability"
          body="A validated local response layer can transfer across customers, object types, and physical setups with less custom retuning."
        />
        <ContrastListItem
          variant="solution"
          headline="Stronger deployment economics"
          body="Lower support cost, shorter integration, and higher reliability improve the economics of each deployment."
        />
      </div>

      <BottomBanner>
        For robotics companies, this is how Arc solves the{" "}
        <span className="font-semibold">scaling problem</span>: local physical
        response that helps robots work reliably across changing physical
        conditions, customer sites, and real-world environments.
      </BottomBanner>

      <SlideFooter pageLabel="03 · Solution" />
    </Slide>
  );
}

// =====================================================================
//  04 · Architecture (1stRound slide 6)
// =====================================================================
function AntlerArchitectureSlide() {
  return <FirstRoundArchitectureSlide pageLabel="04 · Architecture" />;
}

// =====================================================================
//  06 · Why Now
// =====================================================================
function WhyNowSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Why Now</Eyebrow>
      <h2 className="max-w-[1640px] text-[72px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        2025 robotics funding reached roughly $28B to $41B globally.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        AI is accelerating robot reasoning, but real deployment still depends
        on whether robots can physically respond when the world changes.
      </p>

      <div className="mt-14 max-w-[1500px] space-y-10">
        <p className="text-[32px] font-normal leading-[1.4] tracking-[-0.01em] text-fg-primary">
          AI is advancing the robot brain and increasing capability at lightning
          pace.
        </p>
        <p className="text-[32px] font-normal leading-[1.4] tracking-[-0.01em] text-fg-primary">
          Richer sensors are being developed rapidly, exposing the gap
          between sense and reaction.
        </p>
        <p className="text-[32px] font-normal leading-[1.4] tracking-[-0.01em] text-fg-primary">
          Reservoir computing has a new application window due to edge AI, the
          advanced sensors available, and practical path for application
          (robotic response loops).
        </p>
      </div>

      <BottomBanner>
        The world is building better robot brains. Hinoki is building the{" "}
        <span className="font-semibold">
          response layer that helps those robots work in the real world.
        </span>
      </BottomBanner>

      <SlideFooter pageLabel="07 · Why Now" />
    </Slide>
  );
}

// =====================================================================
//  07 · First Benchmark (1stRound slide 5)
// =====================================================================
function AntlerBenchmarkSlide() {
  return <FirstRoundBenchmarkSlide pageLabel="06 · First Benchmark" />;
}

// =====================================================================
//  07 · First Proof Point (retained — not in deck order)
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

      <SlideFooter pageLabel="07 · First Proof Point" />
    </Slide>
  );
}

// =====================================================================
//  05 · Discovery
// =====================================================================
function DiscoveryQuoteLine({
  role,
  quote,
  emphasis = false,
}: {
  role: string;
  quote: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`border-l-2 pl-5 ${
        emphasis ? "border-accent" : "border-accent/40"
      }`}
    >
      <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
        {role}
      </div>
      <p className="mt-2 text-[18px] leading-[1.55] text-fg-primary">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

function DiscoverySlide() {
  return (
    <Slide align="start">
      <Eyebrow>Discovery</Eyebrow>
      <h2 className="max-w-[1640px] text-[68px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        What engineers are telling us so far.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        Customer discovery is narrowing Arc from a broad architecture thesis
        into a measurable first control-loop benchmark.
      </p>

      <div className="mt-10 max-w-[1500px] space-y-8">
        <ContrastListItem
          headline="Latency matters at the physical edge."
          body="Engineers confirmed response time becomes critical when precision, speed, or actuator timing matter."
        />
        <ContrastListItem
          headline="Physical variability creates instability."
          body="Changing surfaces, variable loads, wheel slip, noisy sensors, and unpredictable environments create practical control challenges."
        />
        <ContrastListItem
          headline="Slip response is the first measurable wedge."
          body="In gripper control, the problem is concrete: detect slip, respond faster, stabilize the object, and compare against baseline."
        />
      </div>

      <div className="mt-10 max-w-[1500px] space-y-6">
        <DiscoveryQuoteLine
          emphasis
          role="Gripper / manipulation engineer"
          quote="Slip shows up in the tactile stream before the grasp loop reacts. We increase grasp force after the part is already moving. Sensor-to-gripper latency keeps coming up."
        />
        <DiscoveryQuoteLine
          role="AMR torque-control engineer"
          quote="Wheel slip forces tradeoffs between torque and velocity control. Closing the loop closer to the wheel would still help."
        />
        <DiscoveryQuoteLine
          role="Bipedal humanoid researcher"
          quote="One slipped foothold and the gait is already behind. There is no separate fast path for contact."
        />
      </div>

      <BottomBanner>
        This pushed Hinoki toward a specific first validation benchmark:{" "}
        <span className="font-semibold">
          tactile slip detection and fast gripper response.
        </span>
      </BottomBanner>

      <SlideFooter pageLabel="05 · Discovery" />
    </Slide>
  );
}

// =====================================================================
//  05 · Demand Validation (retained — not in deck order)
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

      <SlideFooter pageLabel="05 · Demand Validation" />
    </Slide>
  );
}

// =====================================================================
//  Appendix · A2 — Defensibility
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

      <SlideFooter pageLabel="A2 · Defensibility" />
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
            view="Closes the sensor-to-actuator loop locally and adaptively — where existing stacks bottleneck."
            emphasis
          />
        </div>
      </div>

      <SlideFooter pageLabel="10 · Competition" />
    </Slide>
  );
}

// =====================================================================
//  10 · Market (1stRound slide 11)
// =====================================================================
function AntlerMarketSlide() {
  return <FirstRoundMarketSlide pageLabel="09 · Market" plainJapanFrame />;
}

// =====================================================================
//  11 · Business Model
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

      <SlideFooter pageLabel="08 · Business Model" />
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
//  12 · Unfair Advantage — Why Hinoki can win from Japan
// =====================================================================
function AdvantageLine({
  label,
  body,
}: {
  label: string;
  body: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-accent/40 pl-5">
      <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      <p className="mt-2 text-[17px] leading-[1.5] text-fg-primary">{body}</p>
    </div>
  );
}

function AdvisorRow({
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
      className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.5fr)_minmax(0,0.95fr)] items-start gap-x-6 border-t border-border/70 px-5 py-4 first:border-t-0 ${
        emphasis ? "bg-accent-subtle/40" : ""
      }`}
    >
      <div className="text-[18px] font-medium leading-[1.25] text-fg-primary">
        {area}
      </div>
      <div className="text-[14px] leading-[1.45] text-fg-secondary">
        {affiliation}
      </div>
      <div className="text-[14px] leading-[1.45] text-fg-secondary">
        {deRisks}
      </div>
      <div
        className={`font-mono text-[11px] uppercase leading-[1.35] tracking-[0.12em] ${
          emphasis ? "text-accent" : "text-fg-caption"
        }`}
      >
        {status}
      </div>
    </div>
  );
}

function UnfairAdvantageSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Unfair Advantage</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        Why Hinoki can win from Japan.
      </h2>

      <div className="mt-8 grid max-w-[1640px] grid-cols-2 gap-x-10 gap-y-6">
        <AdvantageLine
          label="Where"
          body={
            <>
              <span className="font-semibold">Tsukuba Science City launchpad</span>{" "}
              — one of two special economic zones in Japan designed for
              deep-tech robotics development. Next to AIST and NIMS, inside
              Japan&rsquo;s robotics research corridor.
            </>
          }
        />
        <AdvantageLine
          label="When"
          body={
            <>
              <span className="font-semibold">Japan timing</span> — aging
              society, labor shortage, manufacturing, elder care.
            </>
          }
        />
        <AdvantageLine
          label="Who"
          body={
            <>
              <span className="font-semibold">Researcher network</span> —
              Physical HRI, Mechatronics, Neuromorphic Networks, AIST,
              Tsukuba, Tokyo, Nagoya.
            </>
          }
        />
        <AdvantageLine
          label="How"
          body={
            <>
              <span className="font-semibold">FPGA-to-IP learning loop</span>{" "}
              — turn physical validation into defensible IP faster than
              silicon-first incumbents.
            </>
          }
        />
      </div>

      <div className="mt-8 max-w-[1640px]">
        <div className="flex items-baseline justify-between">
          <SectionLabel>Technical advisor network</SectionLabel>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-caption">
            Status as of May 2026
          </span>
        </div>

        <div className="mt-3 overflow-hidden rounded-[8px] border border-border bg-bg-subtle/50">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.5fr)_minmax(0,0.95fr)] gap-x-6 border-b border-border/70 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-caption">
            <div>Area</div>
            <div>Affiliation</div>
            <div>De-risks</div>
            <div>Status</div>
          </div>
          <AdvisorRow
            emphasis
            area="Physical HRI"
            affiliation="PhD, University of Tsukuba · Professor, PUCP"
            deRisks="Human-robot interaction, assistive robotics, and physical validation for human-proximate systems."
            status="Verbal agreement received"
          />
          <AdvisorRow
            emphasis
            area="Mechatronics"
            affiliation="PhD, University of Tsukuba · Associate Professor, Nagoya University"
            deRisks="Sensor-actuator integration, mechatronics validation, and the path from architecture concept to hardware testing."
            status="Verbal agreement received"
          />
          <AdvisorRow
            area="Neuromorphic Networks"
            affiliation="PhD, University of Tokyo"
            deRisks="Neuromorphic architecture, reservoir-adjacent design, and future IP development."
            status="Expected from July"
          />
          <AdvisorRow
            area="AIST Senior Robotics"
            affiliation="PhD, University of Tsukuba · Senior Researcher, AIST"
            deRisks="Applied robotics perspective, AIST ecosystem access, and future validation partnerships."
            status="Discussion pending"
          />
        </div>
      </div>

      <p className="mt-6 max-w-[1640px] text-[20px] font-normal leading-[1.5] text-fg-secondary">
        Together this network supports four validation risks: human-robot
        interaction, hardware integration, neuromorphic architecture, and Japan
        robotics ecosystem access.
      </p>

      <SlideFooter pageLabel="12 · Unfair Advantage" />
    </Slide>
  );
}

// =====================================================================
//  13 · Team — from 1stRound application deck
// =====================================================================
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
          role="Co-founder / CEO · Commercial"
          body={
            <>
              University of Tsukuba (College of Biological Sciences).{" "}
              <span className="font-semibold text-fg-primary">
                Co-architect of the Arc thesis
              </span>{" "}
              — brought the biology framing. Built a Japan-based enterprise
              practice from zero, working with{" "}
              <span className="font-semibold text-fg-primary">
                C-suite executives at major Japanese institutions
              </span>
              . Drives Hinoki&apos;s commercial strategy and investor
              relations.
            </>
          }
        />
        <FounderCard
          imageSrc="/team/bernardo.png"
          affiliation="University of Tsukuba · AIST Tsukuba"
          name="Bernardo Gatto"
          role="Co-founder / CTO · Industry &amp; Technical"
          body={
            <>
              <span className="font-semibold text-fg-primary">
                PhD Computer Vision Engineer
              </span>
              .{" "}
              <span className="font-semibold text-fg-primary">
                Co-architect of the Arc thesis
              </span>{" "}
              — operationalized it on FPGA hardware.{" "}
              <span className="font-semibold text-fg-primary">
                10+ years of industry experience
              </span>{" "}
              in robotics, embedded AI, and hardware integration. JSPS Research
              Grant recipient · MEXT Scholar · former AIST Tsukuba researcher.
              Built and validated Phase 1.
            </>
          }
        />
        <FounderCard
          imageSrc="/team/mina.jpg"
          objectPosition="center 25%"
          affiliation="Meiji Yasuda Life Insurance · Showa Women's University"
          name="Mina Otsuka"
          role="Co-founder / COO · Japan Operations"
          body={
            <>
              <span className="font-semibold text-fg-primary">
                Native Japanese fluency
              </span>
              . Former{" "}
              <span className="font-semibold text-fg-primary">Manager</span>,
              business development and client relations at{" "}
              <span className="font-semibold text-fg-primary">
                Meiji Yasuda Life Insurance
              </span>{" "}
              — one of Japan&apos;s largest financial corporations. Deep
              understanding of Japanese corporate culture. Building
              relationships with robotics engineers and research institutions
              across Japan.
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
                <span className="font-semibold text-fg-primary">
                  Salvatore and Bernardo
                </span>{" "}
                have known each other for{" "}
                <span className="font-semibold text-fg-primary">8 years</span>{" "}
                since their time at the University of Tsukuba.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                <span className="font-semibold text-fg-primary">Mina</span> has
                known the team for{" "}
                <span className="font-semibold text-fg-primary">4 years</span>.
                Lifelong Tsukuba resident.
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

// =====================================================================
//  14 · Ask — Antler capital unlocks the benchmark
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

function CapitalPipelineRow({
  name,
  status,
  logoSrc,
  logoMaxH = 26,
  logoMaxW = 120,
}: {
  name: string;
  status: string;
  logoSrc?: string;
  logoMaxH?: number;
  logoMaxW?: number;
}) {
  return (
    <div className="grid grid-cols-[148px_minmax(0,1fr)] items-center gap-x-4 border-b border-border/70 py-2.5 last:border-b-0">
      <div
        className="flex min-h-10 items-center justify-start"
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
          <span className="max-w-[148px] text-[13px] font-semibold leading-[1.25] tracking-[-0.01em] text-fg-primary">
            {name}
          </span>
        )}
      </div>
      <p className="text-[15px] leading-[1.45] text-fg-secondary">{status}</p>
    </div>
  );
}

function AskSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Milestones / Ask</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Antler capital unlocks the benchmark
        <br />
        that unlocks the next round.
      </h2>

      <div className="mt-10 grid max-w-[1640px] grid-cols-4 gap-5">
        <MilestoneCard
          range="Now → IC"
          emphasis
          body={
            <>
              Finalize multiple technical LOIs, define benchmark, continue
              demo sprint.
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

      <div className="mt-8 max-w-[1640px] rounded-[8px] border border-border bg-bg-subtle px-6 py-5">
        <SectionLabel>Capital pipeline</SectionLabel>
        <div className="mt-3 border-t border-border/70">
          <CapitalPipelineRow
            name="Coreline / Atlas"
            logoSrc="/assets/coreline-logo.png"
            logoMaxH={32}
            logoMaxW={128}
            status="Interviewing"
          />
          <CapitalPipelineRow
            name="1stRound"
            status="Applied · ¥10M non-dilutive validation funding"
          />
          <CapitalPipelineRow
            name="Aichi DeepTech Launch PA"
            status="Applied · ¥40M non-dilutive"
          />
          <CapitalPipelineRow
            name="Sony Innovation Fund"
            status="Active conversations with deep-tech team"
          />
          <CapitalPipelineRow
            name="Spiral Capital"
            logoSrc="/assets/spiral-capital-logo.png"
            logoMaxH={36}
            logoMaxW={128}
            status="Warm conversations"
          />
        </div>
      </div>

      <p className="mt-8 max-w-[1500px] text-[26px] font-light italic leading-[1.35] tracking-[-0.015em] text-fg-primary">
        One measurable reflex loop becomes the foundation for{" "}
        <span className="not-italic font-semibold">
          physical intelligence infrastructure.
        </span>
      </p>

      <SlideFooter pageLabel="14 · Ask" />
    </Slide>
  );
}

// =====================================================================
//  15 · Thank You
// =====================================================================
function ThankYouSlide() {
  return (
    <Slide>
      <HeroTag>Hinoki Technologies</HeroTag>
      <h1 className="text-[112px] font-light leading-[1.0] tracking-[-0.025em] text-fg-primary">
        Thank you.
      </h1>
      <p className="mt-10 max-w-[900px] text-[28px] font-normal leading-[1.5] text-fg-secondary">
        We would welcome the opportunity to build the first measurable reflex
        loop with Antler Japan.
      </p>
      <p className="mt-8 font-mono text-[20px] tracking-[0.08em] text-fg-tertiary">
        hinokitech.com
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[80px] -top-[16px] opacity-60"
      >
        <NeuralMotif className="h-auto w-[780px]" />
      </div>

      <SlideFooter pageLabel="15 · Thank You" />
    </Slide>
  );
}

// =====================================================================
//  Ordered slide manifest — 15 main + 2 appendix.
// =====================================================================
export const SLIDES_ANTLER_MAIN: Array<() => React.JSX.Element> = [
  CoverSlide,
  ProblemSlide,
  SolutionSlide,
  AntlerArchitectureSlide,
  DiscoverySlide,
  AntlerBenchmarkSlide,
  WhyNowSlide,
  BusinessModelSlide,
  AntlerMarketSlide,
  CompetitionSlide,
  GtmSlide,
  UnfairAdvantageSlide,
  TeamSlide,
  AskSlide,
  ThankYouSlide,
];

export const APPENDIX_SLIDES_ANTLER: Array<() => React.JSX.Element> = [
  VisionSlide,
  DefensibilitySlide,
];

export const SLIDES_ANTLER: Array<() => React.JSX.Element> = [
  ...SLIDES_ANTLER_MAIN,
  ...APPENDIX_SLIDES_ANTLER,
];
