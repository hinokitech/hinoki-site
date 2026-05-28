import React from "react";
import competitionPositioningMapSrc from "../../../public/assets/competition-positioning-map.png";
import { Slide, Eyebrow, SlideFooter } from "../slides";
import { BenchmarkSlide as FirstRoundBenchmarkSlide } from "../1stround/slides-1stround";

// =====================================================================
//  ANTLER IC DECK V3 — APPENDIX (archived, not in live deck)
//
//  Re-attach when needed:
//    import { APPENDIX_SLIDES_ANTLER_V3 } from "./slides-antler-v3-appendix";
//    slides={[...SLIDES_ANTLER_V3_MAIN, ...APPENDIX_SLIDES_ANTLER_V3]}
//
//    A1  Vision
//    A2  Defensibility
//    A3  First Benchmark
//    A4  Why Now (funding)
//    A5  Competition Draft (XY scatter)
//    A6  Competition XY (image)
//    A7  Competition Text (typographic)
// =====================================================================

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

      <SlideFooter pageLabel="A4 · Why Now" />
    </Slide>
  );
}

// =====================================================================
//  07 · First Benchmark (1stRound slide 5)
// =====================================================================
function AntlerBenchmarkSlide() {
  return <FirstRoundBenchmarkSlide pageLabel="A3 · First Benchmark" />;
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
//  A5 · Competition Draft — coordinate XY market map
// =====================================================================
type MapEntityVariant = "muted" | "notable" | "substitute" | "academic" | "hinoki";

type MapEntity = {
  label: string;
  x: number;
  y: number;
  variant?: MapEntityVariant;
};

const COMPETITION_MAP_ENTITIES: MapEntity[] = [
  { label: "Google DeepMind Gemini Robotics", x: 14, y: 92 },
  { label: "Physical Intelligence", x: 30, y: 88 },
  { label: "Skild AI", x: 12, y: 78 },
  { label: "Covariant", x: 28, y: 72 },
  { label: "NVIDIA GR00T", x: 38, y: 82 },
  { label: "Reinforcement learning policies", x: 58, y: 92 },
  { label: "Tactile / visual servoing", x: 84, y: 88 },
  {
    label: "Internal OEM control teams",
    x: 66,
    y: 76,
    variant: "substitute",
  },
  {
    label: "Noel Naughton · Virginia Tech",
    x: 90,
    y: 68,
    variant: "academic",
  },
  { label: "Prophesee", x: 40, y: 50 },
  { label: "GelSight", x: 53, y: 39 },
  { label: "AnySkin / DIGIT", x: 45, y: 44 },
  { label: "XELA Robotics", x: 63, y: 29 },
  { label: "FingerVision", x: 58, y: 33 },
  { label: "NVIDIA Jetson Thor", x: 30, y: 26 },
  { label: "Beckhoff TwinCAT", x: 38, y: 18 },
  { label: "Speedgoat / dSPACE", x: 34, y: 10 },
  { label: "AMD / Xilinx FPGA + NI LabVIEW FPGA", x: 42, y: 7 },
  { label: "Synapticon SOMANET", x: 82, y: 8 },
  { label: "BrainChip Akida", x: 70, y: 14 },
  { label: "Intel Loihi", x: 64, y: 22 },
  { label: "Innatera Pulsar", x: 88, y: 18, variant: "notable" },
  { label: "TDK Analog Reservoir AI", x: 94, y: 26, variant: "notable" },
  { label: "HINOKI · ARC", x: 80, y: 48, variant: "hinoki" },
];

function MapPill({
  children,
  variant = "muted",
}: {
  children: React.ReactNode;
  variant?: MapEntityVariant;
}) {
  const styles = {
    muted:
      "border border-border bg-bg-base/95 text-[9px] leading-[1.25] text-fg-caption",
    notable:
      "border border-accent/50 bg-bg-base/95 text-[9px] font-medium leading-[1.25] text-fg-primary",
    substitute:
      "border border-fg-secondary/35 bg-bg-base/95 text-[9px] font-medium leading-[1.25] text-fg-secondary",
    academic:
      "border border-border/70 bg-bg-base/90 text-[8px] leading-[1.25] text-fg-tertiary",
    hinoki:
      "border-2 border-accent bg-accent text-[10px] font-semibold leading-[1.2] text-fg-inverse",
  }[variant];

  return (
    <span className={`inline-block break-words rounded-full px-2 py-0.5 ${styles}`}>
      {children}
    </span>
  );
}

function MapMarker({ label, x, y, variant = "muted" }: MapEntity) {
  return (
    <div
      className={`absolute max-w-[104px] -translate-x-1/2 -translate-y-1/2 text-center ${
        variant === "hinoki" ? "z-30" : "z-10"
      }`}
      style={{ left: `${x}%`, top: `${100 - y}%` }}
    >
      <MapPill variant={variant}>{label}</MapPill>
    </div>
  );
}

function MapQuadrantLabel({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle: string;
  className: string;
}) {
  return (
    <div className={`absolute z-[4] max-w-[190px] pointer-events-none ${className}`}>
      <div className="font-mono text-[9px] font-semibold uppercase leading-[1.25] tracking-[0.11em] text-fg-secondary">
        {title}
      </div>
      <p className="mt-0.5 text-[9px] leading-[1.3] text-fg-caption">{subtitle}</p>
    </div>
  );
}

function CompetitionDraftSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Competition</Eyebrow>
      <h2 className="max-w-[1640px] text-[48px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
        The robotics stack has brains, sensors, and motors.
        <br />
        The reflex layer is still not owned.
      </h2>
      <p className="mt-2 max-w-[1580px] text-[17px] leading-[1.45] text-fg-secondary">
        Customers already have alternatives: better AI, better sensors,
        deterministic control, neuromorphic hardware, and internal engineering.{" "}
        <span className="italic">Arc</span> focuses on the adaptive layer between
        physical sensing and motor response.
      </p>

      <div className="mt-3 flex min-h-0 flex-1 flex-col max-w-[1640px]">
        <p className="mb-1.5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-secondary">
          Software / neural models
        </p>

        <div className="flex min-h-0 flex-1 items-stretch gap-3">
          <div className="flex w-16 shrink-0 items-center justify-center">
            <p className="text-center font-mono text-[10px] font-semibold uppercase leading-[1.25] tracking-[0.1em] text-fg-secondary">
              High-level
              <br />
              cognition
            </p>
          </div>

          <div className="relative min-h-[480px] min-w-0 flex-1">
            <div className="absolute inset-0 rounded-[8px] border border-border-strong bg-bg-base">
              <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-border-strong/80" />
              <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-border-strong/80" />
              <div className="absolute left-1/2 top-1/2 z-[5] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-strong bg-bg-base" />

              <MapQuadrantLabel
                title="Robot brains"
                subtitle="Decide what should happen."
                className="left-2 top-2"
              />
              <MapQuadrantLabel
                title="Adaptive policies + internal control"
                subtitle="Can respond, but often requires tuning, compute, or internal expertise."
                className="right-2 top-2 text-right"
              />
              <MapQuadrantLabel
                title="Robotics compute + control infrastructure"
                subtitle="Runs the stack."
                className="bottom-2 left-2 max-w-[148px]"
              />
              <MapQuadrantLabel
                title="Neuromorphic / reservoir hardware"
                subtitle="Validates the substrate."
                className="bottom-2 right-2 text-right"
              />

              {COMPETITION_MAP_ENTITIES.map((entity) => (
                <MapMarker key={entity.label} {...entity} />
              ))}
            </div>
          </div>

          <div className="flex w-16 shrink-0 items-center justify-center">
            <p className="text-center font-mono text-[10px] font-semibold uppercase leading-[1.25] tracking-[0.1em] text-fg-secondary">
              Local
              <br />
              physical
              <br />
              response
            </p>
          </div>
        </div>

        <p className="mt-1.5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-secondary">
          Hardware / embedded systems
        </p>
      </div>

      <div className="mt-2 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent px-8 py-2.5">
        <p className="text-[19px] font-light leading-[1.4] tracking-[-0.01em] text-fg-primary">
          Brains decide. Sensors detect. Motors execute.{" "}
          <span className="italic">Arc</span> helps the body respond.
        </p>
      </div>

      <SlideFooter pageLabel="A5 · Competition Draft" />
    </Slide>
  );
}

// =====================================================================
//  13 · Competition — XY positioning map (image)
// =====================================================================
function CompetitionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Competition</Eyebrow>
      <h2 className="max-w-[1640px] text-[52px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
        The robotics stack has brains, sensors, and motors.
        <br />
        The reflex layer is still not owned.
      </h2>

      <div className="mt-4 min-h-0 flex-1">
        <img
          src={competitionPositioningMapSrc.src}
          alt="Competitor positioning map showing Hinoki Arc in the local physical response and hardware embedded quadrant"
          width={competitionPositioningMapSrc.width}
          height={competitionPositioningMapSrc.height}
          className="h-full w-full object-contain object-center"
        />
      </div>

      <div className="mt-3 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent px-8 py-3">
        <p className="text-[20px] font-light leading-[1.4] tracking-[-0.01em] text-fg-primary">
          We do not replace the brain, sensor, or motor controller.{" "}
          <span className="italic">Arc</span> is the adaptive reflex layer that
          connects them.
        </p>
      </div>

      <SlideFooter pageLabel="A6 · Competition XY" />
    </Slide>
  );
}
// =====================================================================
//  A7 · Competition Text — typographic Option A (preview)
// =====================================================================
const COMPETITION_SUBSTITUTE_TIERS = [
  {
    title: "Today",
    body: "Internal OEM control — force-torque sensing, custom firmware, PID/MPC, tuning.",
    detail: "Reflex owned in-house",
  },
  {
    title: "Infrastructure",
    body: "Motor-control stack — Beckhoff · Synapticon · Speedgoat / dSPACE.",
    detail: "Deterministic, not adaptive",
  },
  {
    title: "Emerging",
    body: "Neuromorphic substrate — TDK · Innatera.",
    detail: "Closest future validation / threat",
  },
] as const;

function CompetitionSubstituteRow({
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
  const titleClass =
    step === 0
      ? "text-[58px] font-light text-fg-primary"
      : step === 1
        ? "text-[72px] font-normal text-fg-primary"
        : "text-[88px] font-medium text-accent";

  return (
    <div className="grid grid-cols-[minmax(0,440px)_1fr] items-baseline gap-x-20 py-5">
      <h3 className={`leading-[0.95] tracking-[-0.025em] ${titleClass}`}>
        {title}
      </h3>
      <div className="pb-1">
        <p className="text-[28px] leading-[1.45] text-fg-secondary">{body}</p>
        <p className="mt-2 font-mono text-[22px] font-semibold leading-[1.4] tracking-[0.04em] text-fg-caption">
          {detail}
        </p>
      </div>
    </div>
  );
}

function CompetitionTypographySlide() {
  return (
    <Slide align="start">
      <Eyebrow>Competition</Eyebrow>
      <h2 className="max-w-[1640px] text-[80px] font-light leading-[1.04] tracking-[-0.022em] text-fg-primary">
        The robotics stack is crowded.
        <br />
        The reflex layer is fragmented — not empty.
      </h2>
      <p className="mt-6 max-w-[1500px] text-[28px] font-normal leading-[1.45] text-fg-secondary">
        Customers patch reflex response together through internal control teams,
        motor-control infrastructure, classical loops, and emerging
        neuromorphic hardware.{" "}
        <span className="italic">Arc</span> packages that missing adaptive
        layer into a dedicated, licensable architecture.
      </p>

      <div className="mt-8 flex min-h-0 flex-1 flex-col">
        <div className="flex flex-col divide-y divide-border/60">
          {COMPETITION_SUBSTITUTE_TIERS.map((tier, index) => (
            <CompetitionSubstituteRow
              key={tier.title}
              {...tier}
              step={index as 0 | 1 | 2}
            />
          ))}
        </div>

        <div className="mt-8 rounded-[12px] border-2 border-accent bg-accent px-8 py-6">
          <div className="grid grid-cols-[minmax(0,440px)_1fr] items-baseline gap-x-20">
            <h3 className="text-[72px] font-medium leading-[0.95] tracking-[-0.025em] text-fg-inverse">
              Arc
            </h3>
            <div className="pb-1">
              <p className="text-[28px] leading-[1.45] text-fg-inverse/92">
                Packages adaptive reflex into a dedicated, licensable
                architecture.
              </p>
              <p className="mt-2 font-mono text-[20px] font-semibold leading-[1.4] tracking-[0.04em] text-fg-inverse/75">
                Packages sensing → bounded local response → motor execution
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto max-w-[1640px] shrink-0 border-t border-border pt-5">
          <p className="mb-3 max-w-[1200px] text-[16px] font-semibold leading-[1.5] text-fg-primary">
            Reflex is fragmented today.{" "}
            <span className="italic">Arc</span> packages it — without replacing
            the brain, sensor, or motor stack.
          </p>
          <p className="max-w-[1640px] text-[24px] font-light leading-[1.4] tracking-[-0.01em] text-fg-secondary">
            Nobody productizes the adaptive reflex layer as a dedicated,
            licensable architecture. That is what Hinoki is building.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="A7 · Competition Text" />
    </Slide>
  );
}

export const APPENDIX_SLIDES_ANTLER_V3: Array<() => React.JSX.Element> = [
  VisionSlide,
  DefensibilitySlide,
  AntlerBenchmarkSlide,
  WhyNowSlide,
  CompetitionDraftSlide,
  CompetitionSlide,
  CompetitionTypographySlide,
];
