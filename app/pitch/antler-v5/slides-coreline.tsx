import React from "react";
import humanoidRobotSrc from "../../../public/assets/humanoid-robot.png";
import bottleneck5LateStackSrc from "../../../public/assets/bottleneck-5-late-stack.png";
import bottleneck3ContactPhysicsSrc from "../../../public/assets/bottleneck-3-contact-physics.png";
import bottleneck4SensePlanActStackSrc from "../../../public/assets/bottleneck-4-sense-plan-act-stack.png";
import whyNowHumanEnvironmentsSrc from "../../../public/assets/why-now-human-environments.png";
import architectureNervousSystemReflexSrc from "../../../public/assets/architecture-nervous-system-reflex.png";
import steveUrkelSrc from "../../../public/assets/steve-urkel.jpg";
import {
  Slide,
  Eyebrow,
  FounderCard,
} from "../slides";
import { SlideFooter } from "./slide-footer";
import {
  ArcArchitectureSlide as FirstRoundArchitectureSlide,
} from "../1stround/slides-1stround";
import { FpgaStrategySlide } from "./fpga-strategy-slide";
import { ArcStatusSlide } from "./arc-status-slide";
import { GripLimitSurfaceSlide } from "./grip-limit-surface-slide";
import { VonNeumannLatencyGauntletSlide } from "./von-neumann-latency-gauntlet-slide";
import { ControlLoopArbitrageMatrixSlide } from "./control-loop-arbitrage-matrix-slide";
import { CaseStudiesSlide } from "./case-studies-slide";
import { CaseStudy01HumanProximateLogisticsSlide } from "./case-study-01-human-proximate-logistics-slide";
import { CaseStudy01HinokiSolutionSlide } from "./case-study-01-hinoki-solution-slide";
import { CaseStudy02PilotPurgatorySlide } from "./case-study-02-pilot-purgatory-slide";
import { CaseStudy02HinokiSolutionSlide } from "./case-study-02-hinoki-solution-slide";
import { CaseStudy03HighVolumeAutomationSlide } from "./case-study-03-high-volume-automation-slide";
import { CaseStudy03HinokiSolutionSlide } from "./case-study-03-hinoki-solution-slide";

// =====================================================================
//  HINOKI — CORELINE DECK (source of truth)
//
//  Working copy branched from Antler IC v4 (app/pitch/antler-v4).
//  Tailor slides here for Antler IC (v5 working copy).
//  English only — no Japanese variant for now.
//  Do not update mobile unless explicitly requested.
//
//  Main deck — 32 IC slides.
//
//    01  Cover — Robots have brains. Arc gives them reflexes.
//    02  Hook — Have you seen me today?
//    03  Problem — A slip/contact event closes in ~15 ms.
//    04  Problem — Today's sense-plan-act stack needs 30–50 ms.
//    05  Problem — It reacts after the failure.
//    06  Why Now — Robots joining society; two costs of slow physical reaction.
//    07  Solution — Arc gives robots a faster physical response layer.
//    08  Architecture — The next robotics architecture looks more like a nervous system.
//    09  Integration — Arc local reflex layer (technical diagram).
//    10  Let's Get GEEKY! — Steve Urkel hook slide.
//    11  Latency — The Von Neumann Latency Gauntlet.
//    12  Performance — The Control-Loop Arbitrage Matrix.
//    13  Physics — The Physics of the Grip Limit Surface.
//    14  Case Studies — section title slide.
//    15  Case Study 01 — Human-proximate logistics.
//    16  Hinoki Solution 01 — Arc closes the blind window.
//    17  Case Study 02 — Pilot purgatory / fenceless safety.
//    18  Hinoki Solution 02 — Arc opens the fenceless floor.
//    19  Case Study 03 — High-volume automation / micro-stops.
//    20  Hinoki Solution 03 — Recovery before the micro-stop.
//    21  Discovery — What engineers are telling us so far.
//    22  Market — Start → Scale with funding → Mature (TAM ladder).
//    23  Business Model + Moat — The first loop becomes the business.
//    24  FPGA Strategy — FPGA now. Silicon later.
//    25  GTM — Bottom-up substrate embed; Japan account universe.
//    26  Competition — Reaction intelligence is fragmented; nobody owns the layer.
//    27  Unfair Advantage — Why Hinoki can win from Japan.
//    28  Technical Network — Advisor network that de-risks validation.
//    29  Team — The founders and the chemistry behind Arc.
//    30  Where Arc is today — Architecture validated; numbers modeled, not measured.
//    31  Ask — Early capital unlocks the validation that unlocks the next round.
//    32  Thank You
//
//  Appendix slides archived in slides-coreline-appendix.tsx (not in live deck).
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
        Robots have brains,
        <br />
        <span className="italic">Arc</span> gives them reflexes.
      </h1>
      <p className="mt-14 max-w-[1180px] text-[30px] font-normal leading-[1.45] text-fg-secondary">
        Inspired by the nervous system,{" "}
        <span className="italic">Arc</span> is edge neuromorphic computing
        bringing reaction intelligence to machines.
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[80px] -top-[16px] opacity-60"
      >
        <NeuralMotif className="h-auto w-[780px]" />
      </div>

      <div className="absolute bottom-[80px] left-[140px] font-mono text-[16px] tracking-[0.08em] text-fg-tertiary">
        For Antler IC · Pre-seed · June 2026 · hinokitech.com
      </div>

      <SlideFooter pageLabel="01 · Cover" />
    </Slide>
  );
}

// =====================================================================
//  02 · Hook — Have you seen me today?
// =====================================================================
function HaveYouSeenMeSlide() {
  return (
    <Slide align="start">
      <div className="grid flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-14">
        <h2 className="text-[108px] font-light leading-[1.02] tracking-[-0.028em] text-fg-primary">
          Have you seen me today?
        </h2>
        <div className="flex h-[760px] items-center justify-center">
          <img
            src={humanoidRobotSrc.src}
            alt="Humanoid robot"
            width={humanoidRobotSrc.width}
            height={humanoidRobotSrc.height}
            className="max-h-full max-w-full object-contain object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="02 · Have you seen me today?" />
    </Slide>
  );
}

// =====================================================================
//  03 · Problem — causal chain (1/3)
// =====================================================================
function Bottleneck1Slide() {
  return (
    <Slide align="start">
      <Eyebrow>Problem</Eyebrow>
      <div className="grid flex-1 grid-cols-[minmax(0,1fr)_minmax(0,620px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <h2 className="max-w-[900px] text-[72px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            A slip/contact event closes in ~15 ms.
          </h2>
          <p className="mt-6 font-mono text-[24px] leading-[1.45] tracking-[0.02em] text-fg-secondary">
            Mindlin &amp; Deresiewicz, 1951 · Johnson, Contact Mechanics, 1985.
          </p>

          <div className="mt-8 flex flex-1 flex-col py-4">
            <div className="flex flex-1 items-center border-l-2 border-accent/40 pl-7">
              <p className="text-[36px] font-light leading-[1.2] tracking-[-0.015em] text-fg-primary">
                Stick region collapse · contact loss · the failure window is
                physical and fast.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={bottleneck3ContactPhysicsSrc.src}
            alt="Macro contact interface showing stick region collapse and contact loss within a fifteen millisecond physical window"
            width={bottleneck3ContactPhysicsSrc.width}
            height={bottleneck3ContactPhysicsSrc.height}
            className="max-h-full max-w-full object-contain object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="03 · Problem" />
    </Slide>
  );
}

// =====================================================================
//  04 · Problem — causal chain (2/3)
// =====================================================================
function Bottleneck2Slide() {
  return (
    <Slide align="start">
      <Eyebrow>Problem</Eyebrow>
      <div className="grid flex-1 grid-cols-[minmax(0,1fr)_minmax(0,620px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <h2 className="max-w-[900px] text-[72px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            Today&rsquo;s sense-plan-act stack needs 30–50 ms.
          </h2>
          <p className="mt-6 font-mono text-[24px] leading-[1.45] tracking-[0.02em] text-fg-secondary">
            ADRA, AI-powered Robotics Strategy for Europe, 2025.
          </p>

          <div className="mt-8 flex flex-1 flex-col py-4">
            <div className="flex flex-1 items-center border-l-2 border-accent/40 pl-7">
              <p className="text-[36px] font-light leading-[1.2] tracking-[-0.015em] text-fg-primary">
                Perception, planning, and control run through a stack that
                cannot answer inside the contact window.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={bottleneck4SensePlanActStackSrc.src}
            alt="Conventional sense-plan-act stack from sensor input through perception, planning, and control to actuator output, totaling thirty to fifty milliseconds"
            width={bottleneck4SensePlanActStackSrc.width}
            height={bottleneck4SensePlanActStackSrc.height}
            className="max-h-full max-w-full object-contain object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="04 · Problem" />
    </Slide>
  );
}

// =====================================================================
//  05 · Problem — causal chain (3/3)
// =====================================================================
function Bottleneck3Slide() {
  return (
    <Slide align="start">
      <Eyebrow>Problem</Eyebrow>
      <div className="grid flex-1 grid-cols-[minmax(0,1fr)_minmax(0,620px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <h2 className="max-w-[900px] text-[72px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            It reacts after the failure.
          </h2>
          <p className="mt-6 max-w-[900px] text-[28px] font-light leading-[1.45] tracking-[-0.015em] text-fg-primary/90">
            Closing that window locally is what we&rsquo;re building — the
            neuromorphic core is already validated on FPGA.
          </p>

          <div className="mt-8 flex flex-1 flex-col py-4">
            <div className="flex flex-1 items-center border-l-2 border-accent/40 pl-7">
              <p className="text-[32px] font-light leading-[1.25] tracking-[-0.015em] text-fg-secondary">
                ~15 ms event → 30–50 ms stack → correction lands too late.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={bottleneck5LateStackSrc.src}
            alt="Gripper contact window closes in fifteen milliseconds while sense-plan-act stack correction returns at forty-five milliseconds, too late"
            width={bottleneck5LateStackSrc.width}
            height={bottleneck5LateStackSrc.height}
            className="max-h-full max-w-full object-contain object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="05 · Problem" />
    </Slide>
  );
}

// =====================================================================
//  06 · Why Now — Robots joining society; two costs of slow physical reaction
// =====================================================================
function WhyNowCostBlock({
  label,
  body,
  source,
}: {
  label: string;
  body: React.ReactNode;
  source: string;
}) {
  return (
    <div className="border-l-2 border-accent/40 pl-7">
      <p className="font-mono text-[17px] font-semibold uppercase tracking-[0.12em] text-accent">
        {label}
      </p>
      <p className="mt-3 text-[26px] font-light leading-[1.45] tracking-[-0.01em] text-fg-primary">
        {body}
      </p>
      <p className="mt-2 font-mono text-[16px] leading-[1.4] tracking-[0.02em] text-fg-caption">
        {source}
      </p>
    </div>
  );
}

function WhyNowBodiesSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Why Now</Eyebrow>
      <div className="grid flex-1 grid-cols-[minmax(0,1fr)_minmax(0,620px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <h2 className="max-w-[900px] text-[72px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            Robots are joining society — on the line and beside us.
          </h2>
          <p className="mt-6 max-w-[900px] text-[28px] font-light leading-[1.45] tracking-[-0.015em] text-fg-secondary">
            The same slow physical reaction shows up as two costs.
          </p>

          <div className="mt-8 flex flex-1 flex-col justify-center gap-8 py-4">
            <WhyNowCostBlock
              label="Throughput · on the line"
              body={
                <>
                  Micro-slips and contact failures drive{" "}
                  <span className="font-semibold text-accent">~44%</span> of line
                  stops. Downtime runs{" "}
                  <span className="font-semibold text-accent">$22,000/min</span> —
                  roughly{" "}
                  <span className="font-semibold text-accent">$50B/year</span>{" "}
                  industry-wide.
                </>
              }
              source="Siemens & Senseye; Vanson Bourne"
            />
            <WhyNowCostBlock
              label="Safety · beside people"
              body={
                <>
                  The same slip that drops a part becomes a hazard next to a
                  person — which is why{" "}
                  <span className="font-semibold text-accent">~20,000</span>{" "}
                  humanoids have shipped but only{" "}
                  <span className="font-semibold text-accent">~2,500</span> actually
                  work, delaying a{" "}
                  <span className="font-semibold text-accent">$300B–$750B</span>{" "}
                  market.
                </>
              }
              source="McKinsey"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={whyNowHumanEnvironmentsSrc.src}
            alt="Robot working safely near people with responsive contact in a human environment"
            width={whyNowHumanEnvironmentsSrc.width}
            height={whyNowHumanEnvironmentsSrc.height}
            className="max-h-full max-w-full object-contain object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="06 · Why Now" />
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

      <SlideFooter pageLabel="07 · Problem" />
    </Slide>
  );
}

// =====================================================================
//  07 · Solution
// =====================================================================
function SolutionBenefit({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center border-l-2 border-accent pl-7">
      <p className="text-[34px] font-medium leading-[1.2] tracking-[-0.01em] text-fg-primary">
        {headline}
      </p>
      <p className="mt-3 text-[22px] leading-[1.5] text-fg-secondary">{body}</p>
    </div>
  );
}

function SolutionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Solution</Eyebrow>
      <h2 className="max-w-[1640px] text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        <span className="italic">Arc</span> gives robots a faster physical
        response layer.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[28px] font-normal leading-[1.45] text-fg-secondary">
        <span className="italic">Arc</span> is an edge neuromorphic substrate that sits
        between selected sensors and actuators, helping robots respond, adapt,
        and stabilize while the main controller stays in charge.
      </p>

      <div className="mt-10 flex max-w-[1640px] flex-1 flex-col py-2">
        <SolutionBenefit
          headline="Faster response"
          body="Arc creates a shorter path from physical event to corrective action."
        />
        <SolutionBenefit
          headline="Better adaptation"
          body="Arc helps the robot respond to changing contact, slip, load, and motion in real time."
        />
        <SolutionBenefit
          headline="Easier deployment"
          body="Arc is designed to improve repeatability across customers without requiring a full robot redesign."
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[60px] top-[340px] z-0 opacity-60"
      >
        <NeuralMotif className="h-auto w-[780px]" />
      </div>

      <SlideFooter pageLabel="07 · Solution" />
    </Slide>
  );
}

// =====================================================================
//  08 · Architecture
// =====================================================================
function AntlerArchitectureSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Architecture</Eyebrow>
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,680px)] items-stretch gap-12">
        <div className="flex min-h-0 flex-col">
          <h2 className="max-w-[880px] text-[68px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            The next robotics architecture looks more like a nervous system.
          </h2>
          <p className="mt-5 max-w-[860px] text-[24px] font-normal leading-[1.45] text-fg-secondary">
            The physical world is continuous, noisy, and changing. Robots need
            an architecture that can respond the same way.
          </p>

          <div className="mt-8 flex flex-1 flex-col py-2">
            <div className="flex flex-1 items-center border-l-2 border-accent/40 pl-7">
              <p className="text-[40px] font-light leading-[1.15] tracking-[-0.015em] text-fg-primary">
                Continuous.
              </p>
            </div>
            <div className="flex flex-1 items-center border-l-2 border-accent/40 pl-7">
              <p className="text-[40px] font-light leading-[1.15] tracking-[-0.015em] text-fg-primary">
                Adaptive.
              </p>
            </div>
            <div className="flex flex-1 items-center border-l-2 border-accent/40 pl-7">
              <p className="text-[40px] font-light leading-[1.15] tracking-[-0.015em] text-fg-primary">
                Local.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center overflow-hidden rounded-[8px]">
          <img
            src={architectureNervousSystemReflexSrc.src}
            alt="Human nervous system reflex arc mirrored by robot local sensor-to-actuator response loop"
            width={architectureNervousSystemReflexSrc.width}
            height={architectureNervousSystemReflexSrc.height}
            className="max-h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <div className="mt-auto max-w-[1640px] rounded-[10px] border-2 border-accent px-8 py-6">
        <p className="text-[26px] font-light leading-[1.35] tracking-[-0.015em] text-fg-primary">
          <span className="italic">Arc</span> brings neuromorphic response into
          robotics, starting with reaction intelligence between sensing and action.
        </p>
      </div>

      <SlideFooter pageLabel="08 · Architecture" />
    </Slide>
  );
}

// =====================================================================
//  09 · Integration — Arc local reflex layer (technical diagram)
// =====================================================================
function AntlerArcDiagramSlide() {
  return (
    <FirstRoundArchitectureSlide
      pageLabel="09 · Integration"
      callout="Not a replacement controller. A bounded local reaction layer."
      confidential="Confidential - Not for Redistribution"
    />
  );
}

// =====================================================================
//  10 · Let's Get GEEKY!
// =====================================================================
function LetsGetGeekySlide() {
  return (
    <Slide align="start">
      <div className="grid flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-14">
        <h2 className="text-[108px] font-light leading-[1.02] tracking-[-0.028em] text-fg-primary">
          Let&rsquo;s Get GEEKY!
        </h2>
        <div className="flex h-[820px] items-center justify-center overflow-visible">
          <img
            src={steveUrkelSrc.src}
            alt="Steve Urkel"
            width={steveUrkelSrc.width}
            height={steveUrkelSrc.height}
            className="max-h-[680px] w-auto object-contain object-center"
          />
        </div>
      </div>

      <SlideFooter pageLabel="10 · Let's Get GEEKY!" />
    </Slide>
  );
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
//  21 · Discovery
// =====================================================================
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

function DiscoverySlide() {
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

      <SlideFooter pageLabel="21 · Discovery" />
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
          <ProofItem>Antler Residency 2026</ProofItem>
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


import { AntlerMarketSlide } from "./market-slide";
import { BusinessModelSlide } from "./business-model-slide";
import { GtmSlide } from "./gtm-slide";
import { CompetitionSlide } from "./competition-slide";
// =====================================================================
//  15 · Unfair Advantage — Why Hinoki can win from Japan
// =====================================================================
const ADVANTAGE_PHASES = [
  {
    title: "Where",
    body: "Tsukuba is one of two Japanese SEZs for deep-tech robotics. We\u2019re not adjacent to the ecosystem \u2014 we are its next generation.",
    detail: "Japan robotics research corridor",
  },
  {
    title: "When",
    body: "Japan funding — aging society, labor shortage, manufacturing, elder care.",
    detail: "Demand now, not someday",
  },
  {
    title: "Who",
    body: "Deep researcher network, from Physical HRI to Electrical chip engineers.",
    detail: "Tsukuba · Tokyo · Nagoya",
  },
] as const;

const ADVISOR_NETWORK = [
  {
    area: "Physical HRI",
    affiliation: "PhD, University of Tsukuba · Professor, PUCP",
    deRisks: "Human-robot interaction and physical validation for human-proximate systems.",
    status: "Verbal agreement",
    emphasis: true,
  },
  {
    area: "Mechatronics",
    affiliation: "PhD, University of Tsukuba · Associate Professor, Nagoya University",
    deRisks: "Sensor-actuator integration and path from architecture to hardware testing.",
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
    area: "AIST Senior Robotics",
    affiliation: "PhD, University of Tsukuba · Senior Researcher, AIST",
    deRisks: "Applied robotics perspective and AIST ecosystem access.",
    status: "In discussion",
    emphasis: false,
  },
] as const;

function AdvantagePhaseRow({
  title,
  body,
  detail,
  step,
}: {
  title: string;
  body: string;
  detail: string;
  step: 0 | 1 | 2;
}) {
  const titleClass = [
    "text-[52px] font-light text-fg-primary",
    "text-[52px] font-normal text-fg-primary",
    "text-[52px] font-medium text-accent",
  ][step];

  return (
    <div className="grid grid-cols-[minmax(0,440px)_1fr] items-baseline gap-x-20 py-4">
      <h3 className={`leading-[0.95] tracking-[-0.025em] ${titleClass}`}>
        {title}
      </h3>
      <div className="pb-0.5">
        <p className="text-[26px] leading-[1.45] text-fg-secondary">{body}</p>
        <p className="mt-2 font-mono text-[20px] font-semibold leading-[1.4] tracking-[0.04em] text-fg-caption">
          {detail}
        </p>
      </div>
    </div>
  );
}

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

function UnfairAdvantageSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Unfair Advantage</Eyebrow>
      <h2 className="max-w-[1640px] text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        Why Hinoki can win from Japan.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[28px] font-normal leading-[1.45] text-fg-secondary">
        Location, timing, and network — three structural advantages
        competitors cannot copy by moving headquarters.
      </p>

      <div className="mt-8 flex min-h-0 flex-1 flex-col">
        <div className="flex flex-col divide-y divide-border/60">
          {ADVANTAGE_PHASES.map((phase, index) => (
            <AdvantagePhaseRow
              key={phase.title}
              {...phase}
              step={index as 0 | 1 | 2}
            />
          ))}
        </div>
      </div>

      <SlideFooter pageLabel="27 · Unfair Advantage" />
    </Slide>
  );
}

// =====================================================================
//  16 · Technical Network — advisor network that de-risks validation
// =====================================================================
function TechnicalNetworkSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Technical Network</Eyebrow>
      <h2 className="max-w-[1640px] text-[72px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        A researcher network that de-risks validation.
      </h2>
      <p className="mt-5 max-w-[1500px] text-[24px] font-normal leading-[1.45] text-fg-secondary">
        Four advisors covering human-robot interaction, mechatronics,
        neuromorphic architecture, and Japan&rsquo;s national robotics
        ecosystem.{" "}
        <span className="font-mono text-[18px] tracking-[0.06em] text-fg-caption">
          Status · June 2026
        </span>
      </p>

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

      <SlideFooter pageLabel="28 · Technical Network" />
    </Slide>
  );
}

// =====================================================================
//  17 · Team — from 1stRound application deck
// =====================================================================
function FounderBullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 text-[16px] leading-[1.5] text-fg-secondary">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <span className="shrink-0 text-accent">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

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
            <FounderBullets
              items={[
                <>
                  Former biology researcher, University of Tsukuba.
                </>,
                <>
                  <span className="font-semibold text-fg-primary">
                    Co-architect of the Arc thesis
                  </span>{" "}
                  — brought the biology framing.
                </>,
                <>
                  Top 5% executive recruiter for Japan and across APAC,
                  extensive experience in stakeholder management and sales
                  cycles.
                </>,
                <>
                  Built and scaled a desk from zero to{" "}
                  <span className="font-semibold text-fg-primary">
                    ¥50M+ annual profit
                  </span>
                  .
                </>,
                <>Team building expertise.</>,
              ]}
            />
          }
        />
        <FounderCard
          imageSrc="/team/bernardo.png"
          affiliation="University of Tsukuba · AIST Tsukuba"
          name="Bernardo Gatto"
          role="Co-founder / CTO · Industry &amp; Technical"
          body={
            <FounderBullets
              items={[
                <>
                  PhD computer vision engineer · former AIST Tsukuba
                  researcher.
                </>,
                <>JSPS Research Grant recipient · MEXT Scholar</>,
                <>
                  <span className="font-semibold text-fg-primary">
                    Co-architect of the Arc thesis
                  </span>{" "}
                  — built and validated Phase 1 on edge hardware.
                </>,
                <>
                  <span className="font-semibold text-fg-primary">
                    10+ years
                  </span>{" "}
                  in robotics, embedded AI, and hardware integration.
                </>,
                <>Led Phase 1 hardware validation.</>,
              ]}
            />
          }
        />
        <FounderCard
          imageSrc="/team/mina.jpg"
          objectPosition="center 25%"
          affiliation="Showa Women's University · Meiji Yasuda Life Insurance"
          name="Mina Otsuka"
          role="Co-founder / COO · Japan Operations"
          body={
            <FounderBullets
              items={[
                <>
                  Native Japanese · lifelong Tsukuba resident.
                </>,
                <>
                  Former manager, business development at{" "}
                  <span className="font-semibold text-fg-primary">
                    Meiji Yasuda Life Insurance
                  </span>
                  .
                </>,
                <>
                  Deep experience navigating Japanese corporate culture and
                  stakeholder relationships.
                </>,
                <>
                  Owns Japan-side business development, fundraising, and
                  partnerships —{" "}
                  <span className="font-semibold text-fg-primary">
                    everything the team cannot run in English alone
                  </span>
                  .
                </>,
              ]}
            />
          }
        />
      </div>

      <div className="mt-8 max-w-[1640px] border-t border-border pt-6">
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
                —{" "}
                <span className="font-semibold text-fg-primary">8 years</span>{" "}
                since University of Tsukuba.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                <span className="font-semibold text-fg-primary">Mina</span> —{" "}
                <span className="font-semibold text-fg-primary">4 years</span>{" "}
                with the team · lifelong Tsukuba resident.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Shared mission: build a Tsukuba-rooted deep-tech company — a
                place where Japanese and international experts work
                together.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <SlideFooter pageLabel="29 · Team" />
    </Slide>
  );
}

// =====================================================================
//  18 · Ask — Antler capital unlocks the benchmark
// =====================================================================
const CAPITAL_PIPELINE_GROUPS = [
  {
    label: "Active",
    items: "Antler · Coreline Japan",
  },
  {
    label: "Applied",
    items:
      "1stRound (¥10M non-dilutive) · Aichi DeepTech (¥40M non-dilutive)",
  },
  {
    label: "Warm",
    items: "Sony Innovation Fund · Spiral Capital",
  },
] as const;

const LOI_PIPELINE_GROUPS = [
  {
    label: "Gripper OEM",
    items:
      "Prominent Japanese gripper manufacturer · slip-to-grip response",
  },
  {
    label: "Elder care",
    items:
      "Human-interaction robot platform · safe physical contact in human-proximate care",
  },
] as const;

function CapitalPipelineRow({
  label,
  items,
}: {
  label: string;
  items: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,160px)_1fr] items-baseline gap-x-10 py-4">
      <p className="font-mono text-[17px] font-semibold uppercase tracking-[0.12em] text-accent">
        {label}
      </p>
      <p className="text-[24px] leading-[1.45] text-fg-secondary">{items}</p>
    </div>
  );
}

function AskPipelineColumn({
  title,
  rows,
}: {
  title: string;
  rows: readonly { label: string; items: string }[];
}) {
  return (
    <div>
      <div className="font-mono text-[22px] font-semibold uppercase tracking-[0.14em] text-accent">
        {title}
      </div>
      <div className="mt-5 flex flex-col divide-y divide-border/60">
        {rows.map((row) => (
          <CapitalPipelineRow key={row.label} {...row} />
        ))}
      </div>
    </div>
  );
}

function AskSlide() {
  return (
    <Slide align="start" dense>
      <Eyebrow className="!mb-5">Ask</Eyebrow>
      <h2 className="max-w-[1640px] text-[72px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
        Early capital unlocks the validation that unlocks the next round.
      </h2>

      <div className="mt-12 flex min-h-0 flex-1 flex-col justify-center gap-14">
        <div className="max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-12 py-9">
          <p className="text-[28px] font-light leading-[1.45] tracking-[-0.015em] text-fg-primary">
            <span className="font-semibold text-accent">The Ask:</span> Pre-seed /
            seed stacked with ~¥50M non-dilutive in pipeline · combined runway to
            validation milestone.
          </p>
        </div>

        <div className="grid max-w-[1640px] shrink-0 grid-cols-2 gap-x-20">
          <AskPipelineColumn
            title="Capital pipeline"
            rows={CAPITAL_PIPELINE_GROUPS}
          />
          <AskPipelineColumn title="LOI pipeline" rows={LOI_PIPELINE_GROUPS} />
        </div>
      </div>

      <SlideFooter pageLabel="31 · Ask" />
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
        We would welcome the opportunity to build the first continuous reflex
        loop for Japan and globally with Antler.
      </p>
      <p className="mt-8 font-mono text-[20px] tracking-[0.08em] text-fg-tertiary">
        hinokitech.com
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[80px] top-[24px] opacity-60"
      >
        <NeuralMotif className="h-auto w-[780px]" />
      </div>

      <SlideFooter pageLabel="32 · Thank You" />
    </Slide>
  );
}

// =====================================================================
//  Ordered slide manifest — 32 main slides.
//  Appendix: slides-coreline-appendix.tsx
// =====================================================================
export const SLIDES_CORELINE_MAIN: Array<() => React.JSX.Element> = [
  CoverSlide,
  HaveYouSeenMeSlide,
  Bottleneck1Slide,
  Bottleneck2Slide,
  Bottleneck3Slide,
  WhyNowBodiesSlide,
  SolutionSlide,
  AntlerArchitectureSlide,
  AntlerArcDiagramSlide,
  LetsGetGeekySlide,
  VonNeumannLatencyGauntletSlide,
  ControlLoopArbitrageMatrixSlide,
  GripLimitSurfaceSlide,
  CaseStudiesSlide,
  CaseStudy01HumanProximateLogisticsSlide,
  CaseStudy01HinokiSolutionSlide,
  CaseStudy02PilotPurgatorySlide,
  CaseStudy02HinokiSolutionSlide,
  CaseStudy03HighVolumeAutomationSlide,
  CaseStudy03HinokiSolutionSlide,
  DiscoverySlide,
  AntlerMarketSlide,
  BusinessModelSlide,
  FpgaStrategySlide,
  GtmSlide,
  CompetitionSlide,
  UnfairAdvantageSlide,
  TechnicalNetworkSlide,
  TeamSlide,
  ArcStatusSlide,
  AskSlide,
  ThankYouSlide,
];

export const SLIDES_CORELINE = SLIDES_CORELINE_MAIN;

export { APPENDIX_SLIDES_CORELINE } from "./slides-coreline-appendix";
