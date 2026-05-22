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
//  Slide order follows Antler's expected pitch structure:
//    1  Cover
//    2  Vision                ★★★
//    3  Problem               ★★★
//    4  Solution              ★★
//    5  Demand Validation     ★★
//    6  Why Now               ★★
//    7  Business Model        ★
//    8  Market Size           ★
//    9  Competition           ★
//   10  Go-to-Market
//   11  Team                  ★★★
//   12  Milestones / Ask
//
//  Design intent: deliberately quieter than the 1stRound deck.
//  One dominant claim per slide. 3–5 key points max. Big statements,
//  short proof points, diagrams over paragraphs.
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
}: {
  label: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-[96px] min-w-[200px] flex-1 items-center justify-center rounded-[8px] border px-5 text-center text-[18px] font-medium leading-[1.25] ${
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
//  02 · Problem  ★★★
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
      <h2 className="text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        Robots can think.
        <br />
        They still can&rsquo;t reliably react.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        Robotics platforms perform well in demos and narrow deployments, but
        performance degrades the moment weight, contact, payload, vibration,
        or environment changes.
      </p>

      <div className="mt-14 grid max-w-[1640px] grid-cols-3 gap-6">
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
        take longer, run at lower speeds, and become harder to repeat
        profitably across customers.
      </BottomBanner>

      <SlideFooter pageLabel="03 · Problem" />
    </Slide>
  );
}

// =====================================================================
//  03 · Solution  ★★
// =====================================================================
function SolutionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Solution</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        <span className="italic">Arc</span> — the missing
        <br />
        physical response layer.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        A neuromorphic local control layer that sits between selected sensors
        and actuators — alongside, not instead of, the existing controller.
      </p>

      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-8">
        <div className="rounded-[8px] border border-border bg-bg-subtle p-8">
          <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-caption">
            Today
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-y-3">
            <FlowBox label="Sensor data" />
            <FlowArrow />
            <FlowBox label="Perception / planning / control" />
            <FlowArrow />
            <FlowBox label="Actuator response" />
          </div>
        </div>
        <div className="rounded-[8px] border-2 border-accent bg-accent-subtle p-8">
          <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
            With Arc
          </div>
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
//  04 · Demand Validation  ★★
// =====================================================================
function ValidationColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      <ul className="mt-5 flex-1 space-y-3 text-[16px] leading-[1.55] text-fg-primary">
        {children}
      </ul>
    </div>
  );
}

function ValidationItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="shrink-0 text-accent">·</span>
      <span>{children}</span>
    </li>
  );
}

function ValidationSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Demand Validation</Eyebrow>
      <h2 className="text-[72px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        The market is pulling us toward
        <br />
        the same first loop.
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        Customer discovery and engineer feedback narrowed Arc from broad
        architecture thesis into a measurable first benchmark:{" "}
        <span className="font-semibold text-fg-primary">
          tactile slip detection and fast gripper response.
        </span>
      </p>

      <div className="mt-12 grid max-w-[1640px] grid-cols-3 gap-5">
        <ValidationColumn label="Customer pull">
          <ValidationItem>
            <span className="font-semibold text-fg-primary">
              Tokyo-based tactile sensing partner
            </span>{" "}
            — technical LOI being finalized
          </ValidationItem>
          <ValidationItem>
            Assistive robotics company — CEO meeting scheduled
          </ValidationItem>
          <ValidationItem>
            Cognitive robotics company — co-founder meeting being set
          </ValidationItem>
          <ValidationItem>
            Vision-based tactile sensing — warm route identified
          </ValidationItem>
        </ValidationColumn>

        <ValidationColumn label="Engineer signal">
          <ValidationItem>
            AMR, humanoid, quadruped, assistive, marine, and service robotics
            engineers
          </ValidationItem>
          <ValidationItem>
            Confirmed pain around latency, noisy input, variable loads, wheel
            slip, and real-time response
          </ValidationItem>
          <ValidationItem>
            Slip-to-gripper response identified as the strongest first wedge
          </ValidationItem>
        </ValidationColumn>

        <ValidationColumn label="Momentum">
          <ValidationItem>Phase 1 FPGA validation completed</ValidationItem>
          <ValidationItem>6-week demo sprint underway</ValidationItem>
          <ValidationItem>
            Coreline / Atlas — first screening passed
          </ValidationItem>
          <ValidationItem>
            Sony Innovation Fund — materials shared with deep-tech team
          </ValidationItem>
          <ValidationItem>
            The Ventures Award — first round passed
          </ValidationItem>
        </ValidationColumn>
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
//  05 · Why Now  ★★
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
              Japan&rsquo;s aging society, labor shortage, and manufacturing
              pressure make robotics a{" "}
              <span className="font-semibold">national priority</span>.
            </>
          }
        />
        <ForceCard
          index="04"
          body={
            <>
              <span className="font-semibold">FPGA-first validation</span>{" "}
              lets us test adaptive response before moving to ASIC, reference
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

      <SlideFooter pageLabel="06 · Why Now" />
    </Slide>
  );
}

// =====================================================================
//  06 · Business Model  ★
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
        ARM for robotics.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        We don&rsquo;t build robots.{" "}
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
        <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-caption">
          Unit logic
        </div>
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

      <p className="mt-8 max-w-[1500px] text-[22px] font-light italic leading-[1.4] tracking-[-0.01em] text-fg-secondary">
        Compute companies don&rsquo;t capture value by selling devices. They
        capture value by sitting{" "}
        <span className="not-italic font-semibold text-fg-primary">
          inside everyone else&rsquo;s.
        </span>
      </p>

      <SlideFooter pageLabel="07 · Business Model" />
    </Slide>
  );
}

// =====================================================================
//  07 · Market Size  ★
// =====================================================================
function MarketTier({
  tier,
  size,
  label,
  body,
  emphasis = false,
}: {
  tier: string;
  size: string;
  label: string;
  body: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-[8px] border p-7 ${
        emphasis
          ? "border-accent border-2 bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div
        className={`font-mono text-[12px] uppercase tracking-[0.16em] ${
          emphasis ? "text-accent" : "text-fg-caption"
        }`}
      >
        {tier}
      </div>
      <div className="mt-4 text-[64px] font-light leading-[1.0] tracking-[-0.02em] text-fg-primary">
        {size}
      </div>
      <div className="mt-3 text-[20px] font-medium leading-[1.25] text-fg-primary">
        {label}
      </div>
      <div className="mt-3 text-[15px] leading-[1.5] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

function MarketSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Market Size</Eyebrow>
      <h2 className="text-[96px] font-light leading-[1.02] tracking-[-0.025em] text-fg-primary">
        Every platform that moves.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-secondary">
        Arc starts in a measurable wedge and expands across the robotics
        platforms where physical response is performance-critical.
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-5">
        <MarketTier
          emphasis
          tier="Beachhead"
          size="$15B+"
          label="Tactile &amp; force sensing by 2030"
          body="Robotic grippers, tactile sensors, industrial manipulation — the first paid validation wedge for Arc."
        />
        <MarketTier
          tier="Serviceable"
          size="$170B"
          label="Global robotics market by 2030"
          body="Industrial automation today is $300B+ deployed; service robotics adds $40B+ by 2030."
        />
        <MarketTier
          tier="Long-term"
          size="$165B"
          label="Humanoid robots by 2034"
          body="50% CAGR. Cage-free human-robot collaboration is gated on the layer Arc operates in."
        />
      </div>

      <div className="mt-8 max-w-[1640px]">
        <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-caption">
          Beachhead → expansion path
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-y-3">
          <FlowBox label="Tactile slip &amp; gripper response" emphasis />
          <FlowArrow />
          <FlowBox label="Industrial &amp; collaborative" />
          <FlowArrow />
          <FlowBox label="Mobile &amp; humanoids" />
          <FlowArrow />
          <FlowBox label="Assistive · drones · quadrupeds" />
        </div>
      </div>

      <p className="absolute bottom-[110px] left-[140px] right-[140px] font-mono text-[11px] leading-[1.5] tracking-[0.04em] text-fg-caption">
        Sources: IFR World Robotics &amp; Statista global robotics market
        (2024 → 2030); Goldman Sachs Research, Humanoid Robot Market 2024–2035;
        McKinsey Global Institute, Embodied AI safety research 2024.
      </p>

      <SlideFooter pageLabel="08 · Market Size" />
    </Slide>
  );
}

// =====================================================================
//  08 · Competition  ★
// =====================================================================
function CompetitorRow({
  approach,
  arch,
  tradeoff,
  highlight = false,
}: {
  approach: string;
  arch: string;
  tradeoff: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1.1fr_1.2fr_1.5fr] gap-6 border-b py-5 text-[20px] leading-[1.4] ${
        highlight
          ? "border-accent bg-accent-subtle px-5 text-fg-primary"
          : "border-border text-fg-primary"
      }`}
    >
      <div className={highlight ? "font-semibold" : "font-medium"}>
        {approach}
      </div>
      <div className="text-fg-secondary">{arch}</div>
      <div className="text-fg-secondary">{tradeoff}</div>
    </div>
  );
}

function CompetitionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Competition</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        The physical response layer
        <br />
        is uncrowded.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        Cognition, sensing, and motion control are all active. The local
        response layer between sensing and actuation remains underdeveloped.
      </p>

      <div className="mt-12 max-w-[1640px]">
        <div className="grid grid-cols-[1.1fr_1.2fr_1.5fr] gap-6 border-b border-border-strong pb-3 font-mono text-[13px] uppercase tracking-[0.12em] text-fg-caption">
          <div>Approach</div>
          <div>Architecture</div>
          <div>Trade-off</div>
        </div>
        <CompetitorRow
          approach="Digital adaptive control"
          arch="Discrete (PID / MPC)"
          tradeoff="Static tuning, slow adaptation"
        />
        <CompetitorRow
          approach="TinyML / Embedded ML"
          arch="Memory-driven, discrete"
          tradeoff="Latency-bound by inference cycle"
        />
        <CompetitorRow
          approach="Neuromorphic spiking"
          arch="Spiking, event-based"
          tradeoff="Less mature in closed-loop actuation"
        />
        <CompetitorRow
          approach="Silicon-first RC"
          arch="Silicon (frozen at tape-out)"
          tradeoff="Topology locked before optimum found"
        />
        <CompetitorRow
          approach="Hinoki · Arc"
          arch="FPGA-first continuous-time substrate"
          tradeoff="Iterable now → ASIC / IP licensable later"
          highlight
        />
      </div>

      <p className="mt-10 max-w-[1500px] text-[26px] font-light italic leading-[1.4] tracking-[-0.015em] text-fg-primary">
        The incumbents bet on the answer.{" "}
        <span className="not-italic font-semibold">
          We bet on the question.
        </span>
      </p>

      <SlideFooter pageLabel="09 · Competition" />
    </Slide>
  );
}

// =====================================================================
//  09 · Go-to-Market
// =====================================================================
function GtmTile({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-6">
      <div className="text-[20px] font-semibold leading-[1.25] text-fg-primary">
        {title}
      </div>
      <p className="mt-3 text-[16px] leading-[1.55] text-fg-secondary">
        {body}
      </p>
    </div>
  );
}

function GtmSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Go-to-Market</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        Japan first. By design, not default.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        Japan is the world&rsquo;s most concentrated robotics ecosystem. We&rsquo;re
        based in{" "}
        <span className="font-semibold text-fg-primary">
          Tsukuba Science City
        </span>{" "}
        — next to AIST and NIMS — and already inside the relationships that
        matter.
      </p>

      <div className="mt-10 max-w-[1640px]">
        <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
          Customer development
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <GtmTile
            title="Tactile sensing partner"
            body="Tokyo-based. Technical LOI being finalized. First validation benchmark aligned around slip detection and gripper response."
          />
          <GtmTile
            title="Assistive &amp; cognitive robotics"
            body="CEO meeting scheduled with assistive robotics company. Co-founder meeting being set with cognitive robotics company."
          />
          <GtmTile
            title="Engineer discovery"
            body="AMR, humanoid, quadruped, assistive, marine, and service robotics engineers confirmed pain in physical control loops."
          />
        </div>
      </div>

      <div className="mt-8 max-w-[1640px]">
        <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
          Capital &amp; ecosystem pathway
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <GtmTile
            title="Antler Japan 2026"
            body="Selected for Japan Residency. Deep-tech founder program with potential follow-on investment and Japan hardware investor access."
          />
          <GtmTile
            title="Coreline / Atlas · Sony IF"
            body="Coreline first screening passed. Sony Innovation Fund materials shared with deep-tech team."
          />
          <GtmTile
            title="NEDO &amp; grant pathway"
            body="Japan&rsquo;s national agency for deep-tech validation funding. Targeted post-benchmark to extend non-dilutive runway."
          />
        </div>
      </div>

      <SlideFooter pageLabel="10 · Go-to-Market" />
    </Slide>
  );
}

// =====================================================================
//  10 · Vision  ★★★
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
          body="A damaged body redistributes movement. The intelligence is in the substrate, not the central plan."
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
//  11 · Team  ★★★
// =====================================================================
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
      <h2 className="text-[88px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        Biology meets hardware AI.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        A Tsukuba-rooted team built to turn physical intelligence from
        architecture thesis into commercial robotics infrastructure.
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

      <div className="mt-8 max-w-[1640px] rounded-[8px] border border-border bg-bg-subtle/70 p-6">
        <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
          Unfair advantage
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <AdvantagePill>Tsukuba Science City launchpad</AdvantagePill>
          <AdvantagePill>
            Japan timing — aging society, labor shortage, manufacturing
          </AdvantagePill>
          <AdvantagePill>
            Researcher network — Physical HRI, Mechatronics, Neuromorphic
            Networks, AIST, Tsukuba, Tokyo, Nagoya
          </AdvantagePill>
          <AdvantagePill>Founders built on long-standing trust</AdvantagePill>
          <AdvantagePill>FPGA-to-IP learning loop</AdvantagePill>
        </div>
      </div>

      <SlideFooter pageLabel="11 · Team" />
    </Slide>
  );
}

// =====================================================================
//  12 · Milestones / Ask
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

function MilestonesSlide() {
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

      <SlideFooter pageLabel="12 · Milestones / Ask" />
    </Slide>
  );
}

// =====================================================================
//  Ordered slide manifest — follows Antler's expected pitch structure.
// =====================================================================
export const SLIDES_ANTLER: Array<() => React.JSX.Element> = [
  CoverSlide,
  VisionSlide,
  ProblemSlide,
  SolutionSlide,
  ValidationSlide,
  WhyNowSlide,
  BusinessModelSlide,
  MarketSlide,
  CompetitionSlide,
  GtmSlide,
  TeamSlide,
  MilestonesSlide,
];
