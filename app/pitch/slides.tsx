import React from "react";

// =====================================================================
//  HINOKI — INVESTOR DECK SLIDES
//
//  Each slide is designed inside a 1920×1080 canvas (handled by
//  PitchDeck.tsx). Inside slides, write normal pixel values.
//
//  Team headshots (FounderCard): export square crops at 1024×1024 px minimum
//  (2048×2048 if you have them). PNG or JPEG at quality ≥ 90. On-slide
//  circle = 112 px in design space; high-res sources let the browser
//  downscale cleanly (especially after deck-wide scaling).
//
//  Anchor concept: physical intelligence (category).
//  Reflex is the most visceral entry example, not the thesis.
//
//  Type scale:
//    Eyebrow:   20px, accent, 0.18 tracking, uppercase, semibold
//    H1:        112px, font-light, -0.025 tracking
//    H2:        88px,  font-light, -0.02 tracking
//    H3:        56-64px
//    Lead body: 30px, 1.55 leading
//    Body:      24-26px, 1.6 leading
//    Caption:   16-18px, fg-tertiary
//
//  Layout: ~140px side margins, content typically capped ≤ 1640px wide.
// =====================================================================

function Slide({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  /** `start` reserves extra bottom space for `SlideFooter` on dense slides. */
  align?: "center" | "start";
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col px-[140px] ${
        align === "start"
          ? "justify-start pt-[72px] pb-[188px]"
          : "justify-center py-[100px]"
      }`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 text-[20px] font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </div>
  );
}

function SlideFooter({ pageLabel }: { pageLabel: string }) {
  return (
    <div className="absolute bottom-[60px] left-[140px] right-[140px] flex items-center justify-between font-mono text-[14px] tracking-[0.08em] text-fg-tertiary">
      <span>HINOKI · ARC</span>
      <span>{pageLabel}</span>
    </div>
  );
}

// ---------------------------------------------------------------------
//  01 · Title
// ---------------------------------------------------------------------
export function TitleSlide() {
  return (
    <Slide>
      <Eyebrow>Hinoki Technologies</Eyebrow>
      <h1 className="text-[112px] font-light leading-[1.02] tracking-[-0.025em] text-fg-primary">
        The physical intelligence
        <br />
        robots have been missing.
      </h1>
      <p className="mt-14 max-w-[1180px] text-[30px] font-normal leading-[1.55] text-fg-secondary">
        When your hand touches something hot, you pull back before you think.
        That&rsquo;s physical intelligence — and every robot ever built is
        missing it.{" "}
        <span className="font-semibold text-fg-primary">
          <span className="italic">Arc</span> is the architecture that builds
          it in.
        </span>
      </p>
      <div className="absolute bottom-[80px] left-[140px] font-mono text-[16px] tracking-[0.08em] text-fg-tertiary">
        Pre-Seed · April 2026 · hinokitech.com
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  02 · Problem
// ---------------------------------------------------------------------
export function ProblemSlide() {
  return (
    <Slide>
      <Eyebrow>Problem</Eyebrow>
      <h2 className="text-[96px] font-light leading-[1.02] tracking-[-0.02em] text-fg-primary">
        Robots can think.
        <br />
        They can&rsquo;t react.
      </h2>
      <div className="mt-14 grid max-w-[1500px] grid-cols-2 gap-x-16">
        <p className="text-[24px] font-normal leading-[1.6] text-fg-secondary">
          Today&rsquo;s robots run on the same digital stack that powers cloud
          computing — sensor input flows through ADCs, microcontrollers,
          external memory, and inference, and only then reaches the actuator.
          Every layer adds latency, energy cost, and a digital round trip
          between perception and action.
        </p>
        <p className="text-[24px] font-normal leading-[1.6] text-fg-secondary">
          When humanoids leave the factory cage and start working near humans,
          this stops being a performance limitation. It becomes a{" "}
          <span className="font-semibold text-fg-primary">
            safety bottleneck
          </span>{" "}
          — the unsolved problem blocking cage-free deployment at scale.
        </p>
      </div>
      <p className="mt-12 max-w-[1300px] text-[26px] font-normal leading-[1.5] tracking-[-0.01em] text-fg-primary">
        The cage-free deployment problem isn&rsquo;t a software problem.
        It&rsquo;s an{" "}
        <span className="font-semibold">architecture problem.</span>
      </p>
      <SlideFooter pageLabel="02 · Problem" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  03 · Insight
// ---------------------------------------------------------------------
function InsightExample({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] items-baseline gap-8">
      <div className="font-mono text-[16px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      <div className="text-[26px] font-normal leading-[1.55] text-fg-primary">
        {body}
      </div>
    </div>
  );
}

export function InsightSlide() {
  return (
    <Slide>
      <Eyebrow>Insight</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Physical intelligence doesn&rsquo;t live in the brain.
        <br />
        <span className="font-normal">It lives in the body.</span>
      </h2>
      <div className="mt-12 max-w-[1500px] space-y-6">
        <InsightExample
          label="Response"
          body="Touch something hot — your hand pulls back before your brain registers it."
        />
        <InsightExample
          label="Adaptation"
          body="An animal walks across grass it has never seen, and adjusts its gait in milliseconds."
        />
        <InsightExample
          label="Resilience"
          body="A three-legged dog keeps running. The body redistributes without a command."
        />
      </div>
      <p className="mt-12 max-w-[1500px] text-[24px] font-normal italic leading-[1.5] text-fg-primary">
        Three behaviors of one substrate — continuous-time, distributed,
        physical. Not von Neumann&rsquo;s stack.
      </p>
      <SlideFooter pageLabel="03 · Insight" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  04 · Solution — architecture comparison diagram
// ---------------------------------------------------------------------
function StackBox({
  children,
  emphasis = false,
}: {
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-[88px] min-w-[150px] items-center justify-center rounded-[6px] border px-4 text-center text-[18px] font-medium leading-[1.2] ${
        emphasis
          ? "border-accent bg-accent-subtle text-fg-primary"
          : "border-border bg-bg-subtle text-fg-primary"
      }`}
    >
      {children}
    </div>
  );
}

function StackArrow() {
  return (
    <div className="flex items-center px-2 text-[28px] font-light text-fg-tertiary">
      →
    </div>
  );
}

export function SolutionSlide() {
  return (
    <Slide>
      <Eyebrow>Solution</Eyebrow>
      <h2 className="text-[96px] font-light leading-[1.0] tracking-[-0.02em] text-fg-primary">
        <span className="italic">Arc.</span>
      </h2>
      <p className="mt-4 text-[40px] font-light leading-[1.2] tracking-[-0.015em] text-fg-secondary">
        The architecture for physical intelligence.
      </p>
      <p className="mt-10 max-w-[1480px] text-[24px] font-normal leading-[1.55] text-fg-secondary">
        A hybrid physical–digital control layer that runs as a continuous-time
        dynamical substrate — coupling sensor input to actuation without
        inference, memory access, or a digital round trip.
      </p>

      <div className="mt-14 space-y-10">
        <div>
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-fg-tertiary">
            Today&rsquo;s digital control stack
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StackBox>Sensor</StackBox>
            <StackArrow />
            <StackBox>ADC</StackBox>
            <StackArrow />
            <StackBox>MCU / GPU</StackBox>
            <StackArrow />
            <StackBox>Ext. memory</StackBox>
            <StackArrow />
            <StackBox>Control alg.</StackBox>
            <StackArrow />
            <StackBox>Actuator</StackBox>
          </div>
          <div className="mt-3 text-[18px] text-fg-tertiary">
            Discrete · memory-heavy · inference layered above control
          </div>
        </div>

        <div>
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-accent">
            Arc — physical intelligence stack
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StackBox>Sensor</StackBox>
            <StackArrow />
            <StackBox emphasis>Continuous-time adaptive dynamics</StackBox>
            <StackArrow />
            <StackBox>Light digital layer</StackBox>
            <StackArrow />
            <StackBox>Actuator</StackBox>
          </div>
          <div className="mt-3 text-[18px] text-fg-tertiary">
            Continuous · embedded · sub-millisecond response
          </div>
        </div>
      </div>
      <SlideFooter pageLabel="04 · Solution" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  05 · Behaviors — three composable behaviors of physical intelligence
// ---------------------------------------------------------------------
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
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[14px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      <div className="mt-5 text-[28px] font-light leading-[1.25] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <div className="mt-5 text-[18px] leading-[1.55] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

export function BehaviorsSlide() {
  return (
    <Slide>
      <Eyebrow>Behaviors</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Three behaviors. One architecture.
      </h2>
      <p className="mt-10 max-w-[1500px] text-[26px] font-normal leading-[1.55] text-fg-secondary">
        Get the substrate right, and physical intelligence emerges as three
        composable behaviors. Phase 2 demonstrates all three in a single
        benchmark — adaptive grasp under variable physical conditions.
      </p>
      <div className="mt-12 grid max-w-[1640px] grid-cols-3 gap-6">
        <BehaviorCard
          label="Response"
          headline="A body that acts before the brain decides."
          body="Sub-millisecond reaction to slip, contact, and force change — without inference in the loop."
        />
        <BehaviorCard
          label="Adaptation"
          headline="A body that learns from contact. Instantly."
          body="In-loop adjustment to new objects, surfaces, and loads — without replanning, retraining, or retuning."
        />
        <BehaviorCard
          label="Resilience"
          headline="A body that doesn't stop when a part fails."
          body="Graceful redistribution under sensor noise or partial actuator loss — without central failover."
        />
      </div>
      <p className="mt-8 max-w-[1500px] text-[20px] font-light italic leading-[1.5] text-fg-secondary">
        Reflex is the wedge. Adaptation and resilience are the natural
        extensions on the same substrate.
      </p>
      <SlideFooter pageLabel="05 · Behaviors" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  06 · Product
// ---------------------------------------------------------------------
function ProofRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-[28px] font-light text-accent">✓</div>
      <div className="text-[24px] font-normal leading-[1.4] text-fg-primary">
        {label}
      </div>
    </div>
  );
}

export function ProductSlide() {
  return (
    <Slide>
      <Eyebrow>Product</Eyebrow>
      <h2 className="text-[96px] font-light leading-[1.02] tracking-[-0.02em] text-fg-primary">
        Phase 1 is working.
      </h2>
      <div className="mt-12 grid max-w-[1640px] grid-cols-[1.1fr_1fr] gap-x-20">
        <div className="space-y-8 text-[24px] font-normal leading-[1.6] text-fg-secondary">
          <p>
            Reservoir computing implemented on FPGA fabric. Real-time object
            classification and motion tracking from{" "}
            <span className="font-semibold text-fg-primary">
              live video sensor input
            </span>{" "}
            — validated on hardware, not in simulation.
          </p>
          <p>
            This proves the architecture functions as a continuous-time
            computational substrate on real silicon. The remaining question is
            closed-loop performance under physical actuator control.
          </p>
          <p className="font-semibold text-fg-primary">
            That&rsquo;s Phase 2.
          </p>
        </div>
        <div className="space-y-4 self-start">
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-fg-tertiary">
            What&rsquo;s validated today
          </div>
          <ProofRow label="Reservoir computer running on FPGA hardware" />
          <ProofRow label="Live sensor stream validated on hardware" />
          <ProofRow label="Real-time classification + motion tracking confirmed" />
          <p className="mt-5 text-[16px] italic leading-[1.5] text-fg-tertiary">
            Bench available for technical due diligence.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="06 · Product" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  07 · Technology
// ---------------------------------------------------------------------
export function TechnologySlide() {
  return (
    <Slide>
      <Eyebrow>Technology</Eyebrow>
      <h2 className="text-[96px] font-light leading-[1.02] tracking-[-0.02em] text-fg-primary">
        Why FPGA. Why now.
      </h2>
      <p className="mt-10 max-w-[1500px] text-[26px] font-normal leading-[1.55] text-fg-secondary">
        A reservoir computer is a chaotic dynamical substrate. To find the right
        architecture, you have to iterate the substrate itself — not just the
        software running on top.
      </p>

      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-10">
        <div className="rounded-[8px] border border-border bg-bg-subtle p-8">
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-fg-tertiary">
            Silicon-first (TDK)
          </div>
          <div className="space-y-2 text-[22px] leading-[1.5] text-fg-primary">
            <div>· Architecture frozen at tape-out</div>
            <div>· Optimal topology assumed up front</div>
            <div>· Multi-year fabrication cycle</div>
            <div>· Capital-intensive iteration</div>
          </div>
        </div>
        <div className="rounded-[8px] border border-accent bg-accent-subtle p-8">
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-accent">
            FPGA-first (Hinoki)
          </div>
          <div className="space-y-2 text-[22px] leading-[1.5] text-fg-primary">
            <div>· Architecture iterable weekly</div>
            <div>· Optimal topology discovered empirically</div>
            <div>· Same-day rebuild cycle</div>
            <div>· Capital-efficient validation, then ASIC tape-out or licensable IP</div>
          </div>
        </div>
      </div>

      <p className="mt-10 max-w-[1300px] text-[26px] font-light italic leading-[1.4] tracking-[-0.01em] text-fg-primary">
        The incumbents bet on the answer. We bet on the question.
      </p>
      <SlideFooter pageLabel="07 · Technology" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  08 · Market
// ---------------------------------------------------------------------
function MarketTier({
  size,
  label,
  note,
}: {
  size: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="text-[80px] font-light leading-[1.0] tracking-[-0.02em] text-fg-primary">
        {size}
      </div>
      <div className="mt-3 text-[22px] font-medium leading-[1.3] text-fg-primary">
        {label}
      </div>
      {note && (
        <div className="mt-2 text-[18px] leading-[1.4] text-fg-tertiary">
          {note}
        </div>
      )}
    </div>
  );
}

export function MarketSlide() {
  return (
    <Slide>
      <Eyebrow>Market Size</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        A control layer inside every robot.
      </h2>
      <div className="mt-14 grid max-w-[1640px] grid-cols-3 gap-12">
        <MarketTier
          size="$300B+"
          label="Industrial automation"
          note="Today&rsquo;s deployed market¹"
        />
        <MarketTier
          size="$100B+"
          label="Global robotics platforms"
          note="Hardware + integration²"
        />
        <MarketTier
          size="$165B"
          label="Humanoid robots by 2034"
          note="50% CAGR projected³"
        />
      </div>
      <p className="mt-14 max-w-[1500px] text-[28px] font-light leading-[1.4] tracking-[-0.01em] text-fg-primary">
        Every robotic platform needs a control module.
        <br />
        <span className="font-semibold">
          We license the control module that gives them physical intelligence.
        </span>
      </p>
      <p className="mt-8 max-w-[1500px] text-[20px] leading-[1.55] text-fg-secondary">
        McKinsey identifies safety as the critical bridge from humanoid prototype
        to commercial deployment. Cage-free human–robot collaboration is gated
        on real-time physical intelligence — the layer Arc operates in.
      </p>
      <div className="absolute bottom-[110px] left-[140px] right-[140px] font-mono text-[12px] leading-[1.5] tracking-[0.04em] text-fg-tertiary">
        ¹ IFR World Robotics &amp; industry analyst aggregates. ² IFR / Statista
        global robotics market. ³ Goldman Sachs Research, Humanoid Robot Market
        2024–2035. McKinsey Global Institute, Embodied AI safety research 2024.
      </div>
      <SlideFooter pageLabel="08 · Market" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  09 · Target Applications
// ---------------------------------------------------------------------
function ApplicationCard({
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
      <div className="mt-5 text-[26px] font-light leading-[1.25] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <div className="mt-4 text-[18px] leading-[1.55] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

export function ApplicationsSlide() {
  return (
    <Slide>
      <Eyebrow>Target Applications</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Every platform that moves.
      </h2>
      <p className="mt-10 max-w-[1500px] text-[24px] font-normal leading-[1.55] text-fg-secondary">
        <span className="italic">Arc</span> is a general-purpose control layer.
        Phase 2 lands in industrial first; humanoid, defense, and assistive
        systems extend on the same substrate.
      </p>
      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-6">
        <ApplicationCard
          label="Humanoid robotics"
          headline="Operate near humans without a cage."
          body="Cage-free deployment is gated on response fast enough to be safe near humans. Today’s perception-to-actuation stack adds latency that’s incompatible with real-time safety. Arc closes the loop in the control layer itself."
        />
        <ApplicationCard
          label="Industrial automation"
          headline="Adapt to a new SKU without retooling the line."
          body="Today, a new part means re-teaching paths and re-tuning controllers — hours of lost throughput per changeover. Arc adapts in the control loop itself, so the line keeps moving when conditions change."
        />
        <ApplicationCard
          label="Defense &amp; autonomous systems"
          headline="Lose a limb or a rotor — the platform keeps moving."
          body="Physical resilience is distributed across the body, not central. When a limb fails or a rotor stops, response redistributes across the remaining hardware in real time — without the network, and without a central failover."
        />
        <ApplicationCard
          label="Wearable &amp; assistive"
          headline="Adapt to the body that’s wearing it."
          body="Exoskeletons and prosthetics adapt too slowly to feel natural — lag between intent and motion blocks clinical and consumer adoption. Arc adapts in real time, at the body’s own timescale, making assistive movement feel intuitive instead of mechanical."
        />
      </div>
      <p className="mt-8 max-w-[1500px] text-[20px] font-light italic leading-[1.5] text-fg-secondary">
        Wherever a body must respond, adapt, and stay standing — Arc becomes
        the architecture layer.
      </p>
      <SlideFooter pageLabel="09 · Applications" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  10 · Competition
// ---------------------------------------------------------------------
function CompetitorRow({
  approach,
  focus,
  arch,
  tradeoff,
  highlight = false,
}: {
  approach: string;
  focus: string;
  arch: string;
  tradeoff: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1.1fr_1.2fr_1.3fr_1.6fr] gap-6 border-b py-5 text-[20px] leading-[1.4] ${
        highlight
          ? "border-accent bg-accent-subtle px-5 text-fg-primary"
          : "border-border text-fg-primary"
      }`}
    >
      <div className={highlight ? "font-semibold" : "font-medium"}>
        {approach}
      </div>
      <div className="text-fg-secondary">{focus}</div>
      <div className="text-fg-secondary">{arch}</div>
      <div className="text-fg-secondary">{tradeoff}</div>
    </div>
  );
}

export function CompetitionSlide() {
  return (
    <Slide>
      <Eyebrow>Competitors</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Where we sit in the landscape.
      </h2>
      <div className="mt-12 max-w-[1640px]">
        <div className="grid grid-cols-[1.1fr_1.2fr_1.3fr_1.6fr] gap-6 border-b border-border-strong py-3 font-mono text-[13px] uppercase tracking-[0.12em] text-fg-tertiary">
          <div>Approach</div>
          <div>Focus</div>
          <div>Architecture</div>
          <div>Trade-off</div>
        </div>
        <CompetitorRow
          approach="Digital adaptive control"
          focus="Industrial control loops"
          arch="Discrete (PID / MPC)"
          tradeoff="Static tuning, slow adaptation"
        />
        <CompetitorRow
          approach="TinyML / Embedded ML"
          focus="On-device inference"
          arch="Memory-driven, discrete"
          tradeoff="Latency-bound by inference cycle"
        />
        <CompetitorRow
          approach="Neuromorphic"
          focus="Perception, event-driven sensing"
          arch="Spiking, event-based"
          tradeoff="Less mature in closed-loop actuation"
        />
        <CompetitorRow
          approach="TDK analog RC"
          focus="Embedded reservoir compute"
          arch="Silicon (frozen at tape-out)"
          tradeoff="Topology locked before optimum found"
        />
        <CompetitorRow
          approach="Hinoki Arc"
          focus="Physical intelligence control"
          arch="FPGA continuous-time substrate"
          tradeoff="Iterable now → ASIC / IP licensable later"
          highlight
        />
      </div>
      <p className="mt-10 max-w-[1500px] text-[24px] font-normal leading-[1.5] text-fg-primary">
        The control layer is uncrowded because the field has been chasing
        perception. We&rsquo;re optimizing the loop everyone else assumes is
        already solved.
      </p>
      <SlideFooter pageLabel="10 · Competitors" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  10 · Business Model
// ---------------------------------------------------------------------
function PhaseCard({
  phase,
  range,
  title,
  body,
}: {
  phase: string;
  range: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
        {phase}
      </div>
      <div className="mt-1 font-mono text-[13px] tracking-[0.06em] text-fg-tertiary">
        {range}
      </div>
      <div className="mt-5 text-[24px] font-medium leading-[1.3] text-fg-primary">
        {title}
      </div>
      <div className="mt-3 text-[18px] leading-[1.55] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

export function BusinessModelSlide() {
  return (
    <Slide>
      <Eyebrow>Business Model</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        ARM for robotics.
      </h2>
      <p className="mt-8 max-w-[1500px] text-[28px] font-light leading-[1.4] tracking-[-0.01em] text-fg-primary">
        We don&rsquo;t build robots.{" "}
        <span className="font-semibold">
          We license the architecture layer that makes them smarter.
        </span>
      </p>

      <div className="mt-12 grid max-w-[1640px] grid-cols-3 gap-6">
        <PhaseCard
          phase="Phase 1"
          range="Year 1–2 post-validation"
          title="Co-development"
          body="Robotics partners fund adaptation of Arc to their specific control problems. Generates early revenue and proprietary validation data."
        />
        <PhaseCard
          phase="Phase 2"
          range="Year 2–5"
          title="Reference design licensing"
          body="Annual license fees per platform for manufacturers integrating the Arc control architecture into their products."
        />
        <PhaseCard
          phase="Phase 3"
          range="Year 5–10"
          title="Per-unit royalties"
          body="A royalty per robot shipped using the Arc physical intelligence layer. The ARM model applied to robotic control."
        />
      </div>

      <p className="mt-10 max-w-[1500px] text-[22px] font-light italic leading-[1.5] text-fg-secondary">
        Compute companies don&rsquo;t capture value by selling devices. They
        capture value by sitting inside everyone else&rsquo;s.
      </p>
      <SlideFooter pageLabel="11 · Business Model" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  11 · Go-to-Market
// ---------------------------------------------------------------------
function EcosystemTile({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[8px] border border-border p-5">
      <div className="text-[20px] font-semibold leading-[1.3] text-fg-primary">
        {title}
      </div>
      <div className="mt-3 text-[16px] leading-[1.5] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

function GTMSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
      {children}
    </div>
  );
}

export function GTMSlide() {
  return (
    <Slide>
      <Eyebrow>Go-to-Market</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Japan first. By design, not default.
      </h2>
      <p className="mt-8 max-w-[1500px] text-[22px] font-normal leading-[1.55] text-fg-secondary">
        Japan is the world&rsquo;s most concentrated robotics ecosystem — Fanuc,
        Yaskawa, Kawasaki, Mitsubishi Electric, Sony, plus humanoid platform
        partners. We&rsquo;re based in{" "}
        <span className="font-semibold text-fg-primary">
          Tsukuba Science City
        </span>
        , next to AIST and NIMS, and already inside the relationships that
        matter.
      </p>

      <div className="mt-9">
        <GTMSectionLabel>Customer development</GTMSectionLabel>
        <div className="mt-3 grid max-w-[1640px] grid-cols-3 gap-4">
          <EcosystemTile
            title="Customer discovery — active"
            body="Direct conversations with robotics engineers across industrial and humanoid applications. Control-layer adaptation pain confirmed across multiple deployed systems."
          />
          <EcosystemTile
            title="Cyberdyne researcher"
            body="Early conversation with a Cyberdyne researcher on assistive exoskeleton applications. Signal that physical intelligence is a fit for clinical motion assistance."
          />
          <EcosystemTile
            title="Nagoya University Robotics Lab"
            body="Early dialogue on assistive exoskeleton collaboration. Path to academic publication and joint validation in the wearable domain."
          />
        </div>
      </div>

      <div className="mt-7">
        <GTMSectionLabel>Capital pathway</GTMSectionLabel>
        <div className="mt-3 grid max-w-[1640px] grid-cols-3 gap-4">
          <EcosystemTile
            title="Antler Japan 2026 Residency"
            body="May 2026 cohort begins. Deep-tech founder program with potential follow-on investment and access to Japan&rsquo;s hardware investor base."
          />
          <EcosystemTile
            title="SusHi Tech Tokyo 2026"
            body="Investor relationships initiated across deep-tech VCs, corporate venture arms, and government innovation programs."
          />
          <EcosystemTile
            title="NEDO grant pathway"
            body="Japan&rsquo;s national agency for deep-tech validation funding. Application targeted post-Phase-2 to extend non-dilutive runway."
          />
        </div>
      </div>
      <SlideFooter pageLabel="12 · Go-to-Market" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  12 · Traction & External Validation
// ---------------------------------------------------------------------
function TractionPanel({
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
      <div className="font-mono text-[14px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      <div className="mt-5 text-[32px] font-light leading-[1.25] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <div className="mt-4 text-[20px] leading-[1.55] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

export function TractionSlide() {
  return (
    <Slide>
      <Eyebrow>Traction &amp; External Validation</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        What&rsquo;s already de-risked.
      </h2>
      <p className="mt-8 max-w-[1500px] text-[24px] font-normal leading-[1.55] text-fg-secondary">
        Two independent signals — one internal, one external — pointing at
        the same architectural direction.
      </p>
      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-8">
        <TractionPanel
          label="Internal proof"
          headline="Phase 1 hardware validated."
          body="Reservoir computer running on FPGA with live sensor stream classification and motion tracking. Hardware, not simulation. The architectural thesis runs on real silicon."
        />
        <TractionPanel
          label="External validation"
          headline="Market direction confirmed."
          body="TDK&rsquo;s analog RC chip won the CEATEC 2025 Innovation Award — independent confirmation of the technology direction. We took the complementary architectural bet: FPGA-first, iterable, then licensable IP."
        />
      </div>
      <p className="mt-12 max-w-[1500px] text-[22px] font-light italic leading-[1.5] text-fg-secondary">
        The thesis is hardware-validated. The market direction is externally
        validated. Phase 2 closes the loop between them.
      </p>
      <SlideFooter pageLabel="13 · Traction" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  13 · Team
// ---------------------------------------------------------------------
function FounderCard({
  imageSrc,
  objectPosition,
  imageScale = 1,
  maskArtifacts = true,
  maskStrength = 0.25,
  initial,
  name,
  role,
  body,
}: {
  imageSrc?: string;
  objectPosition?: string;
  imageScale?: number;
  maskArtifacts?: boolean;
  maskStrength?: number;
  initial?: string;
  name: string;
  role: string;
  body: string;
}) {
  return (
    <div className="rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="relative h-[152px] w-[152px] overflow-hidden rounded-full border border-border bg-bg-base">
        {imageSrc ? (
          // Native <img> with large width/height hints a high-res decode for
          // downscaling into the avatar circle (avoids extra pipelines vs next/image).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={name}
            width={1024}
            height={1024}
            decoding="async"
            style={{
              objectPosition: objectPosition ?? "center",
              // Optional masker for JPEG/edge artifacts in small circular avatars.
              // Keep extremely light; the deck canvas itself is scaled.
              filter: maskArtifacts
                ? `blur(${maskStrength}px) contrast(1.05) saturate(1.03)`
                : "none",
              transform: `translateZ(0) scale(${imageScale})`,
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[56px] font-light text-fg-primary">
            {initial}
          </div>
        )}
      </div>
      <div className="mt-5 text-[24px] font-semibold leading-[1.2] text-fg-primary">
        {name}
      </div>
      <div className="mt-1 font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
        {role}
      </div>
      <div className="mt-4 text-[17px] leading-[1.55] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

export function TeamSlide() {
  return (
    <Slide>
      <Eyebrow>Team</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Biology meets hardware AI.
      </h2>
      <p className="mt-7 max-w-[1500px] text-[22px] font-normal leading-[1.55] text-fg-secondary">
        We don&rsquo;t think modern computing is incrementally broken. We think
        it&rsquo;s architecturally wrong. Nature doesn&rsquo;t run on von
        Neumann. We can&rsquo;t rebuild computing — but we can apply biological
        architecture to the segment where digital systems fail hardest:
        real-time, embodied, physical control.
      </p>
      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-6">
        <FounderCard
          imageSrc="/team/salvatore.jpg"
          objectPosition="center 30%"
          name="Salvatore"
          role="Strategy &amp; Capital"
          body="Biology graduate, University of Tsukuba. Co-architect of the thesis — brought the biology framing. Built a Japan-based enterprise practice from zero, working with C-suite executives at major Japanese institutions. Drives Hinoki's commercial strategy and Japan investor relations."
        />
        <FounderCard
          imageSrc="/team/bernardo.png"
          name="Bernardo"
          role="Technical"
          body="PhD Computer Vision Engineer. Co-architect of the thesis — operationalized it on FPGA hardware. 10+ years in robotics, embedded AI, and hardware integration. JSPS Research Grant recipient. MEXT Scholar. Former researcher at AIST Tsukuba. Built and validated Phase 1."
        />
        <FounderCard
          imageSrc="/team/mina.jpg"
          objectPosition="center 25%"
          name="Mina"
          role="Japan Market &amp; Ecosystem"
          body="Native Japanese fluency. Former business development and client relations at Meiji Yasuda Life Insurance. Deep understanding of Japanese corporate culture. Building relationships with robotics engineers and research institutions across Japan."
        />
      </div>
      <p className="mt-8 max-w-[1500px] text-[20px] font-light italic leading-[1.5] text-fg-secondary">
        We named the company Hinoki — after the Japanese cypress, an organism
        whose distributed &ldquo;nervous system&rdquo; is the principle behind
        Arc. The three of us previously built an applied AI venture together,
        reaching late-stage contract negotiation with clients before
        redirecting full focus to Hinoki — given the time-sensitive validation
        window for physical intelligence.
      </p>
      <SlideFooter pageLabel="14 · Team" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  15 · Financial Model
// ---------------------------------------------------------------------
function RevenuePhase({
  phase,
  range,
  title,
  body,
  revenue,
  revenueLabel,
}: {
  phase: string;
  range: string;
  title: string;
  body: string;
  revenue: string;
  revenueLabel: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
        {phase}
      </div>
      <div className="mt-1 font-mono text-[12px] tracking-[0.06em] text-fg-tertiary">
        {range}
      </div>
      <div className="mt-5 text-[24px] font-medium leading-[1.3] text-fg-primary">
        {title}
      </div>
      <div className="mt-3 flex-1 text-[17px] leading-[1.55] text-fg-secondary">
        {body}
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <div className="text-[36px] font-light leading-[1.0] tracking-[-0.02em] text-fg-primary">
          {revenue}
        </div>
        <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.1em] text-fg-tertiary">
          {revenueLabel}
        </div>
      </div>
    </div>
  );
}

export function FinancialModelSlide() {
  return (
    <Slide>
      <Eyebrow>Financial Model</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        Three phases. One royalty thesis.
      </h2>
      <p className="mt-8 max-w-[1500px] text-[24px] font-normal leading-[1.55] text-fg-secondary">
        ARM Holdings commands a 1–2% royalty on $20–$200 chip prices. Hinoki
        targets the equivalent on $20K–$150K robotic platforms and
        $30K–$100K assistive devices — upfront licensing fees plus per-unit
        royalties scaling with adoption across humanoid, industrial, defense,
        and wearable/assistive markets.
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-6">
        <RevenuePhase
          phase="Phase 1"
          range="Years 1–2 post-validation"
          title="Co-development engagements"
          body="3–5 paid integrations with robotics partners. Generates early revenue, proprietary validation data, and reference customers."
          revenue="$1.5M–$5M"
          revenueLabel="Cumulative"
        />
        <RevenuePhase
          phase="Phase 2"
          range="Years 2–5"
          title="Reference design licensing"
          body="12–25 platform manufacturers integrate the Arc reference design at $250K–$1M annual license fees per platform."
          revenue="$7M–$25M"
          revenueLabel="ARR"
        />
        <RevenuePhase
          phase="Phase 3"
          range="Years 5+"
          title="Per-unit royalties"
          body="$5–$50 per platform shipped. The ARM model — value capture scales with industry adoption, not headcount."
          revenue="$30M–$250M"
          revenueLabel="ARR"
        />
      </div>

      <div className="mt-10 grid max-w-[1640px] grid-cols-[1.25fr_1fr] gap-12">
        <p className="text-[18px] leading-[1.6] text-fg-secondary">
          <span className="font-semibold text-fg-primary">Adoption anchors.</span>{" "}
          10M+ humanoid units projected annually by 2030. Industrial robotics
          ships 600K+ units annually today. Exoskeleton and prosthetic markets
          are projected to surpass $30B by 2032. Royalty-based IP licensing
          carries 90%+ gross margins.
        </p>
        <p className="text-[17px] italic leading-[1.6] text-fg-tertiary">
          Assistive market adoption lags robotics by 18–24 months on clinical
          validation cycles. Phase 3 wearable contribution is modeled with
          that delay.
        </p>
      </div>
      <SlideFooter pageLabel="15 · Financial Model" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  16 · The Ask
// ---------------------------------------------------------------------
function FundingTier({
  amount,
  source,
  detail,
  committed = false,
}: {
  amount: string;
  source: string;
  detail: string;
  committed?: boolean;
}) {
  return (
    <div
      className={`rounded-[8px] border p-4 ${
        committed
          ? "border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[28px] font-light leading-[1.0] tracking-[-0.02em] text-fg-primary">
          {amount}
        </div>
        {committed && (
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            Committed
          </div>
        )}
      </div>
      <div className="mt-2 text-[18px] font-semibold leading-[1.3] text-fg-primary">
        {source}
      </div>
      <div className="mt-1 text-[15px] leading-[1.5] text-fg-secondary">
        {detail}
      </div>
    </div>
  );
}

function OutcomeTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[6px] border border-border bg-bg-subtle p-3 text-[14px] leading-[1.45] text-fg-secondary">
      {children}
    </div>
  );
}

export function AskSlide() {
  return (
    <Slide align="start">
      <Eyebrow>The Ask</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.0] tracking-[-0.025em] text-fg-primary">
        $400k pre-seed.
      </h2>
      <p className="mt-3 text-[32px] font-light leading-[1.2] tracking-[-0.015em] text-fg-secondary">
        Validation runway.
      </p>

      <div className="mt-6 grid max-w-[1640px] grid-cols-[1.1fr_1fr] gap-10">
        <div>
          <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
            12-month milestone
          </div>
          <p className="mt-3 text-[21px] leading-[1.5] text-fg-primary">
            Benchmark measurable improvement in latency, energy, and adaptive
            stability vs the digital baseline — closed-loop, on hardware. The
            first hardware benchmark of physical intelligence as a control
            layer.
          </p>

          <div className="mt-7 font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
            Use of funds
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[16px] leading-[1.5] text-fg-secondary">
            <div>· Founder runway</div>
            <div>· FPGA refinement &amp; benchmarking platform</div>
            <div>· Hardware integration &amp; embedded systems</div>
            <div>· Force sensor &amp; actuator validation rig</div>
            <div>· Latency / energy / adaptation dataset</div>
            <div>· Provisional patent filing</div>
            <div>· NEDO / JST grant application support</div>
          </div>
        </div>

        <div>
          <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
            Funding structure
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2">
            <FundingTier
              amount="up to $100K"
              source="Vendor credits during residency"
              detail="Preferential credits and rates with AWS, Google Cloud, IBM and other Antler partners — accessible throughout the program, non-dilutive."
            />
            <FundingTier
              amount="$150K"
              source="Antler post-IC investment"
              detail="$100K post-money J-KISS/SAFE at $1M cap (~10% post-ESOP) + $50K uncapped MFN SAFE — if Investment Committee approves at program end."
            />
            <FundingTier
              amount="up to $250K"
              source="Antler ARC matching"
              detail="Unlocks on $200K third-party investment."
            />
            <FundingTier
              amount="Open"
              source="Additional pre-seed investors"
              detail="Strategic deep-tech and hardware capital welcome."
            />
          </div>
        </div>
      </div>

      <div className="mt-5 max-w-[1640px]">
        <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
          12-month outcomes — unlocks Phase 1 revenue
        </div>
        <div className="mt-1.5 grid grid-cols-4 gap-2">
          <OutcomeTile>
            Validated benchmark dataset for licensing conversations
          </OutcomeTile>
          <OutcomeTile>
            First co-development LOI with a Japanese robotics manufacturer
          </OutcomeTile>
          <OutcomeTile>Provisional patent filed</OutcomeTile>
          <OutcomeTile>NEDO grant application submitted</OutcomeTile>
        </div>
      </div>

      <SlideFooter pageLabel="16 · The Ask" />
    </Slide>
  );
}

// =====================================================================
//  Ordered slide manifest — drives PitchDeck navigation
// =====================================================================
export const SLIDES: Array<() => React.JSX.Element> = [
  TitleSlide,
  ProblemSlide,
  InsightSlide,
  SolutionSlide,
  BehaviorsSlide,
  ProductSlide,
  TechnologySlide,
  MarketSlide,
  ApplicationsSlide,
  CompetitionSlide,
  BusinessModelSlide,
  GTMSlide,
  TractionSlide,
  TeamSlide,
  FinancialModelSlide,
  AskSlide,
];
