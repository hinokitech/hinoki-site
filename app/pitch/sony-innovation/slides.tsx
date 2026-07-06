import React from "react";
import { CompetitiveLandscapeSlide } from "./competitive-landscape-slide";
import { CapitalRoadmapSlide } from "./capital-roadmap-slide";
import { DiscoverySlide } from "./discovery-slide";
import { GtmSlide } from "./gtm-slide";
import { ProductRoadmapSlide } from "./product-roadmap-slide";
import { Vision2035Slide } from "./vision-2035-slide";
import { WebsiteRoadmapSlide } from "./website-roadmap-slide";
import { ThankYouSlide } from "./thank-you-slide";
import { TechnicalNetworkSlide } from "./technical-network-slide";
import { UnfairAdvantageSlide } from "./unfair-advantage-slide";
import { XelaLogo, PartnerLogoPad } from "./xela-logo";

// =====================================================================
//  HINOKI — INVESTOR DECK SLIDES (v2 working copy)
//
//  Branched from the frozen pre-seed deck at `/pitch`. Edit here; leave `/pitch` unchanged.
//  Do not update mobile unless explicitly requested.
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
//    Caption:   16-18px, fg-caption (supporting lines); fg-tertiary for chrome only
//
//  Layout: ~140px side margins, content typically capped ≤ 1640px wide.
// =====================================================================

export function Slide({
  children,
  align = "center",
  dense = false,
}: {
  children: React.ReactNode;
  /** `start` reserves extra bottom space for `SlideFooter` on dense slides. */
  align?: "center" | "start";
  /** Tighter vertical chrome — use when a slide stacks multiple content blocks. */
  dense?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col px-[140px] ${
        align === "start"
          ? dense
            ? "justify-start pt-[56px] pb-[148px]"
            : "justify-start pt-[72px] pb-[188px]"
          : "justify-center py-[100px]"
      }`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mb-8 text-[20px] font-semibold uppercase tracking-[0.18em] text-accent ${className}`}
    >
      {children}
    </div>
  );
}

/** Slide 15 title stack — eyebrow, 64px headline, optional 22px subtitle. */
export const DECK_SLIDE_H2_CLASS =
  "text-[64px] font-light leading-[1.05] tracking-[-0.035em] text-fg-primary";

export const DECK_SLIDE_SUBTITLE_CLASS =
  "mt-3 text-[22px] leading-[1.45] text-fg-secondary";

export const DECK_OTHER_VERTICALS = [
  "Semiconductor fabrication",
  "Social robotics / AMRs",
  "Defense UAVs / swarms",
  "Astro-robotics",
  "Assistive exoskeletons",
  "Bionic prosthetics",
] as const;

/** GTM slide — original industry list plus verticals added on the 2035 vision slide. */
export const DECK_GTM_INDUSTRIES = [
  "Humanoids",
  "Industrial systems",
  "Semiconductor fabrication",
  "Social robotics / AMRs",
  "Defense UAVs / swarms",
  "PGMs / guided munitions",
  "Astro-robotics",
  "EV active suspension",
  "Assistive exoskeletons",
  "Bionic prosthetics",
] as const;

/** Case Study eyebrow + XELA logo — matched 22px row height for vertical alignment. */
function CaseStudyEyebrowRow() {
  return (
    <div className="mb-5 flex max-w-[1640px] items-center gap-3">
      <span className="flex h-[22px] shrink-0 items-center text-[20px] font-semibold uppercase leading-none tracking-[0.18em] text-accent">
        Case Study
      </span>
      <XelaLogo
        className="py-0"
        imgClassName="block h-[22px] w-auto max-w-[120px] object-contain object-left"
      />
    </div>
  );
}

export function DeckSlideHeader({
  eyebrow,
  title,
  subtitle,
  wide = false,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Use full content width for long headlines and subtitles. */
  wide?: boolean;
  className?: string;
}) {
  const width = wide ? "max-w-[1640px]" : "max-w-[900px]";

  return (
    <div className={`shrink-0 ${className}`}>
      <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
      <h2 className={`${width} ${DECK_SLIDE_H2_CLASS}`}>{title}</h2>
      {subtitle ? (
        <p className={`${DECK_SLIDE_SUBTITLE_CLASS} ${width}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}

export function SlideFooter({
  pageLabel,
  confidential = "Confidential - Not for Redistribution",
  leftContent,
  leftAddon,
  pageLabelContent,
}: {
  pageLabel?: string;
  confidential?: string;
  /** Replaces the default left cluster (HINOKI · ARC + leftAddon). */
  leftContent?: React.ReactNode;
  leftAddon?: React.ReactNode;
  /** Replaces the default right page label string. */
  pageLabelContent?: React.ReactNode;
}) {
  return (
    <div className="absolute bottom-[60px] left-[140px] right-[140px] flex items-center justify-between font-mono text-[14px] tracking-[0.08em] text-fg-tertiary">
      <span className="flex items-center gap-8">
        {leftContent ?? (
          <>
            <span>HINOKI · ARC</span>
            {leftAddon}
          </>
        )}
      </span>
      <span>{confidential}</span>
      <span>{pageLabelContent ?? pageLabel}</span>
    </div>
  );
}

/** Compact academic / source line — sits just above the slide footer. */
export function SlideCitation({
  children,
  size = "compact",
}: {
  children: React.ReactNode;
  size?: "compact" | "large";
}) {
  return (
    <p
      className={`absolute left-[140px] right-[140px] z-[2] font-mono tracking-[0.02em] ${
        size === "large"
          ? "bottom-[98px] text-[16px] leading-[1.42] text-fg-secondary"
          : "bottom-[88px] text-[11px] leading-[1.4] text-fg-caption"
      }`}
    >
      {children}
    </p>
  );
}

/** Bottom-right disclaimer for TAM / market-sizing slides. */
export function TamModelFootnote() {
  return (
    <div className="absolute right-[140px] top-[56px] z-[2] max-w-[520px] rounded-[8px] border border-accent/30 border-l-[3px] border-l-accent bg-bg-subtle/90 px-5 py-4 text-right shadow-[0_0_24px_rgba(232,98,42,0.08)]">
      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
        Conservative base case
      </p>
      <p className="mt-2.5 text-[15px] font-medium leading-[1.5] tracking-[-0.01em] text-fg-primary">
        Highly conservative TAM model — core platform revenue only;{" "}
        <span className="font-semibold text-accent">
          excludes product spin-offs.
        </span>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------
//  Shared chrome
// ---------------------------------------------------------------------
export function HeroTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-3 text-[20px] font-semibold uppercase tracking-[0.18em] text-accent">
      {/* eslint-disable-next-line @next/next/no-img-element */}
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

/** Compact tree + wordmark — matches site nav; for footer / chrome. */
export function HinokiBrandLockup({
  className = "",
  logoClassName = "h-7 w-7",
  textClassName = "text-[14px] font-medium tracking-[-0.02em] text-fg-primary",
}: {
  className?: string;
  logoClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo-hinoki-tree.png"
        alt=""
        width={28}
        height={28}
        className={`block shrink-0 object-contain ${logoClassName}`}
        aria-hidden
      />
      <span className={`font-sans ${textClassName}`}>Hinoki Technologies</span>
    </span>
  );
}

// ---------------------------------------------------------------------
//  01 · Title
// ---------------------------------------------------------------------
export function TitleSlide() {
  return (
    <Slide>
      <div className="absolute left-[118px] top-[72px] z-20">
        <HinokiBrandLockup
          className="gap-4"
          logoClassName="h-16 w-16"
          textClassName="text-[34px] font-medium tracking-[-0.02em] text-fg-primary"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[60px] z-0 flex w-[820px] items-center justify-end"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/title-slide-hero-ic-final-frame.png?v=1"
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          className="max-h-[94%] w-auto max-w-full object-contain object-center"
        />
      </div>

      <div className="relative z-10 max-w-[980px]">
        <Eyebrow>Neuromorphic Edge AI</Eyebrow>
        <h1 className="text-[112px] font-light leading-[0.95] tracking-[-0.04em] text-fg-primary">
          Building the
          <br />
          <span className="text-gradient-logo">future.</span>
        </h1>
        <div className="mt-14 flex max-w-[900px] flex-col gap-2 text-[30px] font-normal leading-[1.55] text-fg-secondary">
          <p className="text-fg-primary">
            Edge intelligence for physical systems.
          </p>
          <p>Real-time.</p>
          <p>Adaptive.</p>
          <p>Power-efficient.</p>
        </div>
      </div>

      <SlideFooter
        leftContent={
          <>
            <span>HINOKI · ARC</span>
            <span className="text-[16px] tracking-[0.08em]">July 2026</span>
          </>
        }
        pageLabel="01 · Hinoki Technologies"
      />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  02 · True Physical AI
// ---------------------------------------------------------------------
function TruePhysicalAIPillar({
  title,
  body,
}: {
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,220px)_1fr] items-start gap-x-10 py-6">
      <p className="text-[24px] font-semibold leading-[1.3] text-fg-primary">
        {title}
      </p>
      <p className="text-[22px] leading-[1.5] text-fg-secondary">{body}</p>
    </div>
  );
}

export function TruePhysicalAIConceptSlide() {
  return (
    <Slide align="start">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">Arc</Eyebrow>
          <div className="relative flex max-w-[1640px] items-start gap-10">
            <div className="min-w-0">
              <h2 className={`max-w-[960px] ${DECK_SLIDE_H2_CLASS}`}>
                Introducing <span className="italic">Arc</span> by Hinoki
              </h2>
              <p className={`max-w-[820px] ${DECK_SLIDE_SUBTITLE_CLASS}`}>
                An Edge Neuromorphic AI running in an{" "}
                <span className="font-semibold text-fg-primary">FPGA</span>, then{" "}
                <span className="font-semibold text-fg-primary">PCB</span>, then{" "}
                <span className="font-semibold text-accent">ASIC</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-16 flex min-h-0 w-full max-w-[1640px] flex-1 flex-col justify-end">
          <div className="flex h-full min-h-[560px] w-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/arc-stack-architecture-diagram.png?v=2"
              alt="Today's digital control stack versus Arc physical AI stack architecture comparison"
              width={1640}
              height={720}
              decoding="async"
              className="max-h-full max-w-full object-contain object-center"
            />
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="02 · Introducing Arc" />
    </Slide>
  );
}

export function TruePhysicalAIArcSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">Physical AI</Eyebrow>
          <div className="flex max-w-[1640px] items-center justify-between gap-12">
            <h2 className={`max-w-[960px] ${DECK_SLIDE_H2_CLASS}`}>
              How <span className="italic">Arc</span> changes the architecture.
            </h2>
            <div className="relative h-[280px] w-[440px] shrink-0 overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/arc-architecture-distributed-nodes-accent.png?v=1"
                alt=""
                width={640}
                height={480}
                decoding="async"
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[336px] w-[528px] -translate-x-1/2 -translate-y-1/2 rounded-[8px] object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col justify-center divide-y divide-border">
          <TruePhysicalAIPillar
            title="Hardware-Accelerated"
            body={
              <>
                We map intelligent processing directly onto hardware between
                sensors and actuators, bypassing the software stack entirely.
              </>
            }
          />
          <TruePhysicalAIPillar
            title="Continuous & Local"
            body={
              <>
                Subsystems process their own sensory data locally, enabling
                autonomous intelligence to adapt to forces, geometry, and
                movement in real time, at blistering speeds and efficiency.
              </>
            }
          />
          <TruePhysicalAIPillar
            title="Decentralized Execution"
            body={
              <>
                The main AI software is finally free to focus on high-level
                strategy, while our hardware layer provides the continuous
                physical intelligence required to actually execute it.
              </>
            }
          />
        </div>

        <div className="mt-auto shrink-0 pt-6 max-w-[1640px]">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-caption">
            The bottom line
          </p>
          <p className="mt-4 text-[30px] font-semibold leading-[1.38] tracking-[-0.018em] text-fg-primary">
            We are not just speeding up a reaction; we are distributing true
            physical intelligence to the edges of the machine.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="Appendix 7 · Arc Architecture" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  03 · The Compute Gap
// ---------------------------------------------------------------------
const COMPUTE_GAP_PROBLEMS = [
  {
    label: "The Gripper Drop",
    imageSrc: "/assets/compute-gap-gripper-drop.png",
    imageAlt: "Industrial gripper dropping a part after a micro-slip",
    className: "left-0 top-0 w-[520px]",
    imageClassName: "h-[272px]",
  },
  {
    label: "Unstable Humanoids",
    imageSrc: "/assets/compute-gap-unstable-humanoid.png",
    imageAlt: "Humanoid robot losing balance on uneven terrain",
    className: "left-[820px] top-[48px] w-[500px]",
    imageClassName: "h-[260px]",
  },
  {
    label: "Collision with Humans",
    imageSrc: "/assets/compute-gap-human-collision.png",
    imageAlt: "Collaborative robot arm making dangerous contact with a worker",
    className: "bottom-0 left-[240px] w-[560px]",
    imageClassName: "h-[280px]",
  },
] as const;

function ComputeGapProblemCard({
  label,
  imageSrc,
  imageAlt,
  className,
  imageClassName,
}: {
  label: string;
  imageSrc: string;
  imageAlt: string;
  className: string;
  imageClassName: string;
}) {
  return (
    <div className={`absolute flex flex-col gap-3 ${className}`}>
      <div className="font-mono text-[15px] uppercase tracking-[0.14em] leading-[1.35] text-accent">
        {label}
      </div>
      <div
        className={`overflow-hidden rounded-[10px] border border-border bg-bg-subtle ${imageClassName}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          width={1280}
          height={720}
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}

function DenseSlideLedgerRow({
  label,
  subtitle,
  period,
  body,
  labelAccent = true,
  bodyClassName = "",
}: {
  label: string;
  subtitle?: string;
  period?: string;
  body: React.ReactNode;
  labelAccent?: boolean;
  bodyClassName?: string;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center border-b border-border py-6">
      {subtitle ? (
        <div className="grid grid-cols-[minmax(0,200px)_1fr] items-start gap-x-10">
          <div
            className={`font-mono text-[15px] uppercase tracking-[0.14em] ${
              labelAccent ? "text-accent" : "text-fg-caption"
            }`}
          >
            {label}
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-x-12">
              <div className="w-[480px] shrink-0 text-[20px] font-semibold leading-[1.35] text-fg-primary">
                {subtitle}
              </div>
              <p
                className={`min-w-0 flex-1 text-[22px] font-normal leading-[1.55] text-fg-primary ${bodyClassName}`}
              >
                {body}
              </p>
            </div>
            {period ? (
              <div className="mt-2.5 w-[480px] font-mono text-[16px] font-medium tracking-[0.03em] text-fg-secondary">
                {period}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[minmax(0,320px)_1fr] items-start gap-x-10">
          <div>
            <div
              className={`font-mono text-[15px] uppercase tracking-[0.14em] ${
                labelAccent ? "text-accent" : "text-fg-caption"
              }`}
            >
              {label}
            </div>
            {period ? (
              <div className="mt-2.5 font-mono text-[16px] font-medium tracking-[0.03em] text-fg-secondary">
                {period}
              </div>
            ) : null}
          </div>
          <p
            className={`text-[22px] font-normal leading-[1.55] text-fg-primary ${bodyClassName}`}
          >
            {body}
          </p>
        </div>
      )}
    </div>
  );
}

export function ComputeGapSlide() {
  return (
    <Slide align="start">
      <div className="flex min-h-0 flex-1 flex-col">
        <DeckSlideHeader
          eyebrow="Why This Matters"
          title="The Compute Gap"
          subtitle="Centralized Software Cannot Handle the Physical World"
        />

        <div className="relative mt-10 min-h-[640px] max-w-[1640px] flex-1">
          {COMPUTE_GAP_PROBLEMS.map((problem) => (
            <ComputeGapProblemCard key={problem.label} {...problem} />
          ))}
          <p className="absolute bottom-6 right-0 text-[28px] font-light italic leading-[1.4] tracking-[-0.01em] text-fg-secondary">
            Plus much more
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="03 · The Compute Gap" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  03 · Macro Paradigm Shift
// ---------------------------------------------------------------------
export function MacroParadigmShiftSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Macro Paradigm Shift</Eyebrow>
      <h2 className="max-w-[1480px] text-[88px] font-light leading-[1.04] tracking-[-0.02em] text-fg-primary">
        The Era of Physical Embodiment
      </h2>
      <p className="mt-8 max-w-[1480px] text-[26px] font-normal leading-[1.55] text-fg-secondary">
        For the last decade, AI development focused on{" "}
        <span className="font-semibold text-fg-primary">digital intelligence</span>
        — scaling LLMs, token computation, and cloud-hosted reasoning. In 2026,
        the industry hit a consensus bottleneck: AI must enter the physical world
        to unlock the next wave of economic value.
      </p>

      <div className="mt-10 max-w-[1500px] space-y-7">
        <InsightExample
          label="Soft robotics boom"
          body="Modern robotic hardware is now incredibly agile — viscoelastic materials, high-torque actuators, and dense tactile skin matrices."
        />
        <InsightExample
          label="The missing link"
          body="We are piloting ultra-fast, dynamic physical bodies with slow, serialized, cloud-tethered digital brains."
        />
      </div>

      <div className="mt-12 max-w-[1500px]">
        <p className="text-[20px] font-semibold uppercase tracking-[0.14em] text-fg-primary">
          The opportunity
        </p>
        <p className="mt-4 text-[34px] font-semibold leading-[1.38] tracking-[-0.018em] text-fg-primary">
          The companies that control the translation layer between digital AI
          reasoning and low-level physical survival will own the infrastructure
          of modern automation.
        </p>
      </div>

      <SlideFooter pageLabel="19 · Macro Paradigm Shift" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  03 · Problem
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
      <SlideFooter pageLabel="06 · Problem" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  03 · Insight
// ---------------------------------------------------------------------
export function InsightExample({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
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
      <SlideFooter pageLabel="06 · Insight" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  04 · Solution — architecture comparison diagram
// ---------------------------------------------------------------------
export function StackBox({
  children,
  emphasis = false,
  className = "",
}: {
  children: React.ReactNode;
  emphasis?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex h-[88px] min-w-[150px] items-center justify-center rounded-[6px] border px-4 text-center text-[18px] font-medium leading-[1.2] ${
        emphasis
          ? "border-accent bg-accent-subtle text-fg-primary"
          : "border-border bg-bg-subtle text-fg-primary"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function StackArrow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center px-2 text-[28px] font-light text-fg-tertiary ${className}`}
    >
      →
    </div>
  );
}

function ArcStackArchitectureDiagram({
  variant = "compact",
}: {
  variant?: "compact" | "presentation";
}) {
  const isPresentation = variant === "presentation";
  const boxClass = isPresentation
    ? "h-[104px] min-w-[176px] rounded-[8px] px-5 text-[20px] leading-[1.25]"
    : "";
  const arrowClass = isPresentation ? "px-4 text-[34px]" : "";
  const labelClass = isPresentation
    ? "mb-5 text-[16px] tracking-[0.14em]"
    : "mb-3 text-[14px] tracking-[0.12em]";
  const captionClass = isPresentation
    ? "mt-3 text-[18px] text-fg-caption"
    : "mt-3 text-[18px] text-fg-caption";
  const presentationCaptionItems = (items: readonly string[], accent: boolean) =>
    isPresentation ? (
      <div
        className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${
          accent ? "mt-5" : "mt-8"
        }`}
      >
        {items.map((item, index) => (
          <React.Fragment key={item}>
            {index > 0 ? (
              <span
                className={`text-[22px] ${accent ? "text-accent/50" : "text-fg-tertiary"}`}
                aria-hidden
              >
                ·
              </span>
            ) : null}
            <span
              className={`text-[26px] font-semibold leading-[1.35] tracking-[-0.01em] ${
                accent ? "text-accent" : "text-fg-primary"
              }`}
            >
              {item}
            </span>
          </React.Fragment>
        ))}
      </div>
    ) : null;
  const sectionClass = isPresentation
    ? "rounded-[12px] border border-border bg-bg-subtle/50 px-12 py-10"
    : "";
  const rowClass = isPresentation
    ? "flex flex-wrap items-center gap-3"
    : "flex flex-wrap items-center gap-2";

  return (
    <div className={isPresentation ? "space-y-8 pb-6" : "space-y-10"}>
      <div className={sectionClass}>
        <div
          className={`font-mono uppercase text-fg-caption ${labelClass}`}
        >
          Today&rsquo;s digital control stack
        </div>
        <div className={rowClass}>
          <StackBox className={boxClass}>Sensor</StackBox>
          <StackArrow className={arrowClass} />
          <StackBox className={boxClass}>ADC</StackBox>
          <StackArrow className={arrowClass} />
          <StackBox className={boxClass}>MCU / GPU</StackBox>
          <StackArrow className={arrowClass} />
          <StackBox className={boxClass}>Ext. memory</StackBox>
          <StackArrow className={arrowClass} />
          <StackBox className={boxClass}>Control alg.</StackBox>
          <StackArrow className={arrowClass} />
          <StackBox className={boxClass}>Actuator</StackBox>
        </div>
        {presentationCaptionItems(
          ["50+ms", "heavy power consumption", "non adaptive"],
          false,
        ) ?? (
          <div className={captionClass}>
            50+ms, heavy power consumption, non adaptive
          </div>
        )}
      </div>

      <div className={`${sectionClass}${isPresentation ? " -mt-2" : ""}`}>
        <div className={`font-mono uppercase text-accent ${labelClass}`}>
          Arc — physical AI stack
        </div>
        <div className={rowClass}>
          <StackBox className={boxClass}>Sensor</StackBox>
          <StackArrow className={arrowClass} />
          <StackBox className={boxClass} emphasis>
            Arc FPGA
          </StackBox>
          <StackArrow className={arrowClass} />
          <StackBox className={boxClass}>Light digital layer</StackBox>
          <StackArrow className={arrowClass} />
          <StackBox className={boxClass}>Actuator</StackBox>
        </div>
        {presentationCaptionItems(
          ["<1ms", "extremely low power consumption", "adaptive intelligence"],
          true,
        ) ?? (
          <div className={captionClass}>
            &lt;1ms, extremely low power consumption, adaptive intelligence
          </div>
        )}
      </div>
    </div>
  );
}

function ArcDirectRouteStrip() {
  const boxClass = "h-[72px] min-w-[148px] rounded-[8px] px-4 text-[18px] leading-[1.2]";

  return (
    <div className="max-w-[1640px] rounded-[12px] border border-border bg-bg-subtle/50 px-10 py-6">
      <div className="mb-4 font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
        Arc — physical AI stack
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <StackBox className={boxClass}>Sensor</StackBox>
        <StackArrow className="px-3 text-[30px]" />
        <StackBox className={boxClass} emphasis>
          Arc FPGA
        </StackBox>
        <StackArrow className="px-3 text-[30px]" />
        <StackBox className={boxClass}>Light digital layer</StackBox>
        <StackArrow className="px-3 text-[30px]" />
        <StackBox className={boxClass}>Actuator</StackBox>
      </div>
    </div>
  );
}

const ARC_VERSUS_METRICS = [
  { multiplier: "40–80×", label: "Lower Latency" },
  { multiplier: "Up to 5×", label: "Higher Loop Rate" },
  { multiplier: "250×", label: "Lower Energy Per Cycle" },
] as const;

function ArcVersusMetricCard({
  multiplier,
  label,
}: {
  multiplier: string;
  label: string;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center rounded-[12px] border border-border bg-bg-subtle/60 px-10 py-14">
      <div className="text-[80px] font-light leading-[0.95] tracking-[-0.03em] text-accent">
        {multiplier}
      </div>
      <div className="mt-5 text-[26px] font-semibold leading-[1.3] tracking-[-0.01em] text-fg-primary">
        {label}
      </div>
    </div>
  );
}

export function SolutionSlide() {
  return (
    <Slide align="start">
      <div className="flex min-h-0 flex-1 flex-col">
        <DeckSlideHeader
          eyebrow="Solution"
          title={
            <>
              <span className="mr-[0.35em] italic">Arc</span> vs. Today&rsquo;s{" "}
              <span className="text-gradient-logo">Standards</span>
            </>
          }
        />

        <p className="mt-10 max-w-[1200px] shrink-0 text-[26px] font-normal leading-[1.5] text-fg-primary">
          Instead of forcing data to travel up a slow software stack, we route
          data directly from sensor to actuator.
        </p>

        <div className="relative z-10 -mx-[7.5%] mt-6 flex min-h-0 w-[115%] max-w-[1886px] flex-1 flex-col justify-end">
          <div className="flex h-full min-h-[520px] w-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/arc-vs-standards-body-banner.png"
              alt="Arc physical AI stack route and performance benchmarks versus today's standards"
              width={1640}
              height={820}
              decoding="async"
              className="max-h-full w-full object-contain object-center"
            />
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="04 · Arc vs. Today&rsquo;s Standards" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  05 · Intelligent Hardware
// ---------------------------------------------------------------------
const REALTIME_PILLARS = [
  { emoji: "⚡", label: "Real time reaction" },
  { emoji: "🔄", label: "Real time adaptation" },
  { emoji: "🛡️", label: "Real time resilience" },
] as const;

function RealtimePillarCard({
  emoji,
  label,
}: {
  emoji: string;
  label: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="text-[80px] leading-none" aria-hidden>
        {emoji}
      </div>
      <p className="mt-8 text-[30px] font-semibold leading-[1.3] tracking-[-0.01em] text-fg-primary">
        {label}
      </p>
    </div>
  );
}

export function IntelligentHardwareSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <DeckSlideHeader
          eyebrow="Results"
          wide
          title={
            <>
              Hardware that doesn&rsquo;t just act. It{" "}
              <span className="text-gradient-logo">thinks.</span>
            </>
          }
        />
        <div className="mt-8 max-w-[1640px] shrink-0 overflow-hidden rounded-[10px] border border-border bg-bg-subtle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hardware-thinks-edge-intelligence-strip.png"
              alt=""
              width={1680}
              height={360}
              decoding="async"
              aria-hidden
              className="h-[168px] w-full object-cover object-center"
            />
          </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 items-center">
          <div className="grid w-full grid-cols-3 gap-10">
            {REALTIME_PILLARS.map((pillar) => (
              <RealtimePillarCard key={pillar.label} {...pillar} />
            ))}
          </div>
        </div>

        <div className="mt-auto shrink-0 max-w-[1640px] border-t-2 border-accent/35 pt-8 pb-2">
          <p className="font-mono text-[15px] font-semibold uppercase tracking-[0.18em] text-accent">
            Preventing
          </p>
          <div className="mt-6 grid grid-cols-3 divide-x divide-border">
            <div className="pr-10">
              <p className="text-[26px] font-semibold leading-[1.3] tracking-[-0.01em] text-fg-primary">
                Precision failure
              </p>
              <p className="mt-2.5 text-[20px] leading-[1.45] text-fg-secondary">
                Dropping parts
              </p>
            </div>
            <div className="px-10">
              <p className="text-[26px] font-semibold leading-[1.3] tracking-[-0.01em] text-fg-primary">
                Locomotion failure
              </p>
              <p className="mt-2.5 text-[20px] leading-[1.45] text-fg-secondary">
                Humanoids tripping
              </p>
            </div>
            <div className="pl-10">
              <p className="text-[26px] font-semibold leading-[1.3] tracking-[-0.01em] text-fg-primary">
                Safety failure
              </p>
              <p className="mt-2.5 text-[20px] leading-[1.45] text-fg-secondary">
                Injuring humans
              </p>
            </div>
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="05 · Hardware that thinks" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  05 · Behaviors — three composable behaviors of physical intelligence
// ---------------------------------------------------------------------
export function BehaviorCard({
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
        Response is the entry point. Adaptation and resilience emerge from the
        same physical intelligence substrate.
      </p>
      <SlideFooter pageLabel="11 · Behaviors" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  06 · Product
// ---------------------------------------------------------------------
export function ProofRow({ label }: { label: string }) {
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
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-fg-caption">
            What&rsquo;s validated today
          </div>
          <ProofRow label="Reservoir computer running on FPGA hardware" />
          <ProofRow label="Live sensor stream validated on hardware" />
          <ProofRow label="Real-time classification + motion tracking confirmed" />
          <p className="mt-5 text-[16px] italic leading-[1.5] text-fg-caption">
            Bench available for technical due diligence.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="12 · Product" />
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
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-fg-caption">
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
      <SlideFooter pageLabel="12 · Technology" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  08 · Market
// ---------------------------------------------------------------------
export function MarketTier({
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
        <div className="mt-2 text-[18px] leading-[1.4] text-fg-caption">
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
      <div className="absolute bottom-[110px] left-[140px] right-[140px] font-mono text-[12px] leading-[1.5] tracking-[0.04em] text-fg-caption">
        ¹ IFR World Robotics &amp; industry analyst aggregates. ² IFR / Statista
        global robotics market. ³ Goldman Sachs Research, Humanoid Robot Market
        2024–2035. McKinsey Global Institute, Embodied AI safety research 2024.
      </div>
      <SlideFooter pageLabel="14 · Market" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  09 · Target Applications
// ---------------------------------------------------------------------
export function ApplicationCard({
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
      <SlideFooter pageLabel="15 · Applications" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  10 · Competition
// ---------------------------------------------------------------------
export function CompetitorRow({
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
        <div className="grid grid-cols-[1.1fr_1.2fr_1.3fr_1.6fr] gap-6 border-b border-border-strong py-3 font-mono text-[13px] uppercase tracking-[0.12em] text-fg-caption">
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
        While the industry competes on perception, the commercial control
        layer has been left untouched. We are optimizing the layer no one has
        bridged from research to industry.
      </p>
      <SlideFooter pageLabel="24 · Competitors" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  10 · Business Model
// ---------------------------------------------------------------------
export function PhaseCard({
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
      <div className="mt-1 font-mono text-[13px] tracking-[0.06em] text-fg-caption">
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
      <SlideFooter pageLabel="17 · Business Model" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  11 · Go-to-Market
// ---------------------------------------------------------------------
export function EcosystemTile({
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

export function GTMSectionLabel({ children }: { children: React.ReactNode }) {
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
      <SlideFooter pageLabel="18 · Go-to-Market" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  12 · Traction & External Validation
// ---------------------------------------------------------------------
export function TractionPanel({
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
      <SlideFooter pageLabel="19 · Traction" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  Team — from Antler IC v7 slide 29
// ---------------------------------------------------------------------
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

function TeamSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
      {children}
    </div>
  );
}

export function FounderCard({
  imageSrc,
  objectPosition,
  imageScale = 1,
  maskArtifacts = true,
  maskStrength = 0.25,
  initial,
  affiliation,
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
  /** Shown above the founder name (e.g. university affiliation). */
  affiliation?: string;
  name: string;
  role: React.ReactNode;
  body: React.ReactNode;
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
      {affiliation ? (
        <div className="mt-5 text-[13px] font-medium leading-[1.3] text-fg-caption">
          {affiliation}
        </div>
      ) : null}
      <div
        className={`${affiliation ? "mt-1" : "mt-5"} text-[24px] font-semibold leading-[1.2] text-fg-primary`}
      >
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
    <Slide align="start">
      <DeckSlideHeader
        eyebrow="Team"
        wide
        title={
          <>
            A founder team built on long-standing trust and complementary{" "}
            <span className="text-gradient-logo">roles.</span>
          </>
        }
        className="max-w-[1640px]"
      />

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
                <>Former biology researcher, University of Tsukuba.</>,
                <span className="font-semibold text-fg-primary">
                  Co-architect of the Arc thesis
                </span>,
                <>
                  Extensive experience in stakeholder management, client
                  origination and full sales cycle delivery.
                </>,
                <>Team building and management expertise.</>,
                <>Recruitment expert.</>,
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
                <>Native Japanese · lifelong Tsukuba resident.</>,
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
            <TeamSectionLabel>Founder connection</TeamSectionLabel>
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
                <span className="font-semibold text-fg-primary">4 years</span>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                Shared mission: build a Tsukuba-rooted deep-tech company — a
                place where Japanese and international experts build the future
                together.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <SlideFooter pageLabel="19 · Team" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  15 · Financial Model
// ---------------------------------------------------------------------
export function RevenuePhase({
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
      <div className="mt-1 font-mono text-[12px] tracking-[0.06em] text-fg-caption">
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
        <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.1em] text-fg-caption">
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
        <p className="text-[17px] italic leading-[1.6] text-fg-caption">
          Assistive market adoption lags robotics by 18–24 months on clinical
          validation cycles. Phase 3 wearable contribution is modeled with
          that delay.
        </p>
      </div>
      <SlideFooter pageLabel="21 · Financial Model" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  16 · The Ask
// ---------------------------------------------------------------------
export function FundingTier({
  amount,
  source,
  detail,
  committed = false,
  committedLabel = "Committed",
}: {
  amount: string;
  source: string;
  detail: string;
  committed?: boolean;
  committedLabel?: string;
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
            {committedLabel}
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

export function OutcomeTile({ children }: { children: React.ReactNode }) {
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
            first industrial benchmark of physical intelligence as a
            commercializable control layer.
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

      <SlideFooter pageLabel="22 · The Ask" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  18–19 · Global Maximized TAM Models
// ---------------------------------------------------------------------
type TamRoyaltyRow = {
  sector: string;
  shipments: string;
  unitCost: string;
  royalty: string;
  tam: string;
};

type TamModelConfig = {
  year: number;
  pageLabel: string;
  rows: readonly TamRoyaltyRow[];
  royaltySubtotalShipments: string;
  royaltySubtotalTam: string;
  programs: string;
  licensingTam: string;
  consolidatedLine: string;
  consolidatedTotal: string;
};

const TAM_2030_CONFIG: TamModelConfig = {
  year: 2030,
  pageLabel: "Appendix 5 · 2030 TAM Model",
  royaltySubtotalShipments: "15,450,000",
  royaltySubtotalTam: "$10.89B",
  programs: "320",
  licensingTam: "$3.20B",
  consolidatedLine: "$3.20B licensing + $10.89B royalties",
  consolidatedTotal: "$14.09B",
  rows: [
    {
      sector: "Humanoids",
      shipments: "250,000",
      unitCost: "$35,000",
      royalty: "$2,100",
      tam: "$525M",
    },
    {
      sector: "Industrial systems",
      shipments: "850,000",
      unitCost: "$40,000",
      royalty: "$2,400",
      tam: "$2.04B",
    },
    {
      sector: "Social robotics / AMRs",
      shipments: "1,000,000",
      unitCost: "$30,000",
      royalty: "$1,800",
      tam: "$1.80B",
    },
    {
      sector: "Defense UAVs / swarms",
      shipments: "3,500,000",
      unitCost: "$8,000",
      royalty: "$480",
      tam: "$1.68B",
    },
    {
      sector: "PGMs / guided munitions",
      shipments: "2,500,000",
      unitCost: "$15,000",
      royalty: "$900",
      tam: "$2.25B",
    },
    {
      sector: "EV active suspension",
      shipments: "6,000,000",
      unitCost: "$5,000",
      royalty: "$300",
      tam: "$1.80B",
    },
    {
      sector: "Assistive exoskeletons",
      shipments: "350,000",
      unitCost: "$20,000",
      royalty: "$1,200",
      tam: "$420M",
    },
    {
      sector: "Bionic prosthetics",
      shipments: "500,000",
      unitCost: "$12,000",
      royalty: "$720",
      tam: "$360M",
    },
  ],
};

const TAM_2035_CONFIG: TamModelConfig = {
  year: 2035,
  pageLabel: "Appendix 6 · 2035 TAM Model",
  royaltySubtotalShipments: "46,500,000",
  royaltySubtotalTam: "$20.64B",
  programs: "630",
  licensingTam: "$6.30B",
  consolidatedLine: "$6.30B licensing + $20.64B royalties",
  consolidatedTotal: "$26.94B",
  rows: [
    {
      sector: "Humanoids",
      shipments: "1,400,000",
      unitCost: "$20,000",
      royalty: "$1,200",
      tam: "$1.68B",
    },
    {
      sector: "Industrial systems",
      shipments: "1,800,000",
      unitCost: "$30,000",
      royalty: "$1,800",
      tam: "$3.24B",
    },
    {
      sector: "Social robotics / AMRs",
      shipments: "2,500,000",
      unitCost: "$20,000",
      royalty: "$1,200",
      tam: "$3.00B",
    },
    {
      sector: "Defense UAVs / swarms",
      shipments: "10,000,000",
      unitCost: "$5,000",
      royalty: "$300",
      tam: "$3.00B",
    },
    {
      sector: "PGMs / guided munitions",
      shipments: "6,000,000",
      unitCost: "$10,000",
      royalty: "$600",
      tam: "$3.60B",
    },
    {
      sector: "EV active suspension",
      shipments: "22,300,000",
      unitCost: "$3,500",
      royalty: "$210",
      tam: "$4.68B",
    },
    {
      sector: "Assistive exoskeletons",
      shipments: "1,000,000",
      unitCost: "$12,000",
      royalty: "$720",
      tam: "$720M",
    },
    {
      sector: "Bionic prosthetics",
      shipments: "1,500,000",
      unitCost: "$8,000",
      royalty: "$480",
      tam: "$720M",
    },
  ],
};

function TamRoyaltyRow({ row }: { row: TamRoyaltyRow }) {
  return (
    <div className="flex flex-1 items-center border-b border-border">
      <div className="grid w-full grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)_minmax(0,0.75fr)_minmax(0,0.7fr)_minmax(0,0.65fr)] gap-x-5 text-[17px] leading-[1.35] text-fg-primary">
        <div className="font-medium">{row.sector}</div>
        <div className="font-mono text-fg-secondary">{row.shipments}</div>
        <div className="font-mono text-fg-secondary">{row.unitCost}</div>
        <div className="font-mono text-fg-secondary">{row.royalty}</div>
        <div className="font-mono font-semibold">{row.tam}</div>
      </div>
    </div>
  );
}

function GlobalTamModelSlide({ config }: { config: TamModelConfig }) {
  const { year } = config;

  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <DeckSlideHeader
          eyebrow="Market"
          wide
          title={`The ${year} Global Maximized TAM Model`}
          subtitle={`By ${year} — sockets and unit royalty calculations at 2.0% blended royalty per unit.`}
        />

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          <div className="grid shrink-0 grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)_minmax(0,0.75fr)_minmax(0,0.7fr)_minmax(0,0.65fr)] gap-x-5 border-b border-border-strong py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-caption">
            <div>Market sector</div>
            <div>{year} shipments</div>
            <div>Avg. unit cost</div>
            <div>Royalty / unit</div>
            <div>Royalty TAM</div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            {config.rows.map((row) => (
              <TamRoyaltyRow key={row.sector} row={row} />
            ))}
          </div>
          <div className="grid shrink-0 grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)_minmax(0,0.75fr)_minmax(0,0.7fr)_minmax(0,0.65fr)] gap-x-5 border-b border-border-strong py-3.5 text-[17px] font-semibold text-fg-primary">
            <div>Royalty sub-total</div>
            <div className="font-mono">{config.royaltySubtotalShipments}</div>
            <div>—</div>
            <div>—</div>
            <div className="font-mono">{config.royaltySubtotalTam}</div>
          </div>
        </div>

        <div className="mt-auto grid max-w-[1640px] shrink-0 grid-cols-2 gap-10 pt-6">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-caption">
              {year} upfront platform licensing
            </p>
            <div className="mt-3 space-y-1.5 text-[18px] leading-[1.45] text-fg-secondary">
              <p>
                <span className="font-semibold text-fg-primary">
                  {config.programs}
                </span>{" "}
                active global programs
              </p>
              <p>
                <span className="font-semibold text-fg-primary">$10M</span>{" "}
                upfront platform license per program
              </p>
              <p className="font-mono text-[20px] font-semibold text-fg-primary">
                Licensing TAM: {config.licensingTam}
              </p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-caption">
              Consolidated {year} TAM
            </p>
            <p className="mt-3 text-[24px] font-semibold leading-[1.35] tracking-[-0.015em] text-fg-primary">
              {config.consolidatedLine}
            </p>
            <p className="mt-2 text-[52px] font-semibold leading-[1.05] tracking-[-0.022em] text-fg-primary">
              {config.consolidatedTotal}
            </p>
          </div>
        </div>
      </div>

      <TamModelFootnote />
      <SlideFooter pageLabel={config.pageLabel} />
    </Slide>
  );
}

export function Tam2030ModelSlide() {
  return <GlobalTamModelSlide config={TAM_2030_CONFIG} />;
}

export function Tam2035ModelSlide() {
  return <GlobalTamModelSlide config={TAM_2035_CONFIG} />;
}

// ---------------------------------------------------------------------
//  20 · Market Sizing Summary
// ---------------------------------------------------------------------
const TAM_SUMMARY_ROWS = [
  {
    dimension: "Upfront enterprise platform licensing",
    tam2030: "$3.20B",
    tam2035: "$6.30B",
    cagr: "14.5%",
  },
  {
    dimension: "Unit sockets royalty TAM (MIMO consolidated)",
    tam2030: "$10.89B",
    tam2035: "$20.64B",
    cagr: "13.7%",
  },
  {
    dimension: "Consolidated total addressable market",
    tam2030: "$14.09B",
    tam2035: "$26.94B",
    cagr: "14.0%",
    emphasis: true,
  },
] as const;

const TAM_INCLUDED_INDUSTRIES = [
  "Humanoids",
  "Industrial systems",
  "Social robotics / AMRs",
  "Defense UAVs / swarms",
  "PGMs / guided munitions",
  "EV active suspension",
  "Assistive exoskeletons",
  "Bionic prosthetics",
] as const;

function TamSummaryRow({
  dimension,
  tam2030,
  tam2035,
  cagr,
  emphasis = false,
}: (typeof TAM_SUMMARY_ROWS)[number] & { emphasis?: boolean }) {
  return (
    <div
      className={`flex flex-1 items-center border-b ${
        emphasis ? "border-border-strong" : "border-border"
      }`}
    >
      <div
        className={`grid w-full grid-cols-[minmax(0,1.5fr)_minmax(0,0.75fr)_minmax(0,0.75fr)_minmax(0,0.55fr)] gap-x-6 text-[18px] leading-[1.35] ${
          emphasis ? "font-semibold text-fg-primary" : "text-fg-primary"
        }`}
      >
        <div className={emphasis ? "" : "font-medium"}>{dimension}</div>
        <div className="font-mono">{tam2030}</div>
        <div className="font-mono">{tam2035}</div>
        <div className="font-mono text-fg-secondary">{cagr}</div>
      </div>
    </div>
  );
}

export function MarketSizingSummarySlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <DeckSlideHeader
          eyebrow="Market"
          wide
          title="Market Sizing Summary"
          subtitle="The investor narrative — 2030 to 2035 consolidated TAM."
        />

        <div className="mt-8 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          <div className="grid shrink-0 grid-cols-[minmax(0,1.5fr)_minmax(0,0.75fr)_minmax(0,0.75fr)_minmax(0,0.55fr)] gap-x-6 border-b border-border-strong py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-caption">
            <div>Sizing dimension</div>
            <div>2030 TAM</div>
            <div>2035 TAM</div>
            <div>CAGR</div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            {TAM_SUMMARY_ROWS.map((row) => (
              <TamSummaryRow key={row.dimension} {...row} />
            ))}
          </div>
        </div>

        <div className="mt-auto shrink-0 pt-8 max-w-[1640px]">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-caption">
            Industries included
          </p>
          <ul className="mt-4 columns-2 gap-x-12 text-[18px] leading-[1.7] text-fg-secondary">
            {TAM_INCLUDED_INDUSTRIES.map((industry) => (
              <li key={industry} className="break-inside-avoid">
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TamModelFootnote />
      <SlideFooter pageLabel="11 · Market Sizing Summary" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  21 · The Value Multiplier
// ---------------------------------------------------------------------
function ValueMultiplierBlock({
  label,
  subtitle,
  body,
}: {
  label: string;
  subtitle: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center border-b border-border py-6">
      <div className="grid grid-cols-[minmax(0,320px)_1fr] items-start gap-x-10">
        <div>
          <div className="font-mono text-[15px] uppercase tracking-[0.14em] text-accent">
            {label}
          </div>
          <div className="mt-2 text-[20px] font-semibold leading-[1.35] text-fg-primary">
            {subtitle}
          </div>
        </div>
        <p className="text-[22px] font-normal leading-[1.55] text-fg-primary">
          {body}
        </p>
      </div>
    </div>
  );
}

export function ValueMultiplierSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <DeckSlideHeader
          eyebrow="Unlocked Market Potential"
          wide
          title="The Value Multiplier"
          subtitle="Unlocking the real-time economy — bridging licensing fees to macro valuations."
        />

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          <ValueMultiplierBlock
            label="The efficiency multiplier"
            subtitle="Battery & thermal"
            body={
              <>
                By delivering{" "}
                <span className="font-semibold">100× less energy use</span>, we
                eliminate thousands of dollars in cooling hardware and heavy
                battery packs per machine. We don&rsquo;t just cost{" "}
                <span className="font-semibold">$400</span> — we remove{" "}
                <span className="font-semibold">$2,000</span> of structural cost
                from the OEM&rsquo;s bill of materials.
              </>
            }
          />
          <ValueMultiplierBlock
            label="The capability multiplier"
            subtitle="Frequency & latency"
            body={
              <>
                Current humanoids cannot operate safely around humans because
                their control-loop frequency is too slow. Our{" "}
                <span className="font-semibold">100× faster frequency</span> is
                the technical threshold required to move{" "}
                <span className="font-semibold">1.4 million robots</span> from
                empty test labs into active, revenue-generating factory floors.
              </>
            }
          />
        </div>

        <div className="mt-auto shrink-0 pt-6 max-w-[1640px]">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-caption">
            The macro impact
          </p>
          <p className="mt-4 text-[30px] font-semibold leading-[1.38] tracking-[-0.018em] text-fg-primary">
            While our direct TAM is{" "}
            <span className="font-mono">$26.94B</span>, our technology serves
            as a foundational gatekeeper helping to increase the cost value of
            our technology.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="12 · Value Multiplier" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  22 · Use of Funds
// ---------------------------------------------------------------------
const USE_OF_FUNDS_ROWS = [
  {
    category: "Engineering & execution",
    amount: "$40K",
    pct: "27%",
    funding: "Funding 2× contract engineers for 6 months.",
    goal: "Dedicated talent to build, iterate, and finalize the closed-loop tactile-to-gripper testing rig.",
  },
  {
    category: "Core robotic hardware",
    amount: "$15K",
    pct: "10%",
    funding: "Procurement of 2× physical robotic platforms/arms.",
    goal: "The baseline physical infrastructure required to run benchmark tests against conventional edge CPU/GPU stacks.",
  },
  {
    category: "IP defense & patent filing",
    amount: "$10K",
    pct: "7%",
    funding: "Legal and filing fees.",
    goal: "Locking down our proprietary edge neuromorphic architecture and closed-loop actuation methodology before tape-out.",
  },
  {
    category: "Go-to-market & business development",
    amount: "$10K",
    pct: "7%",
    funding: "Travel, conferences, and stakeholder relationship building.",
    goal: "Securing face-to-face trust with Japanese gripper OEMs and integrators to convert our pipeline into our first paid pilot.",
  },
  {
    category: "Office & administration",
    amount: "$15K",
    pct: "10%",
    funding: "Base operations in Tsukuba.",
    goal: "Maintaining our operational footprint in Japan\u2019s deep-tech robotics ecosystem.",
  },
  {
    category: "Hardware iteration & runway buffer",
    amount: "$60K",
    pct: "40%",
    funding:
      "Additional sensors, replacement parts, testing contingencies, and extended runway margin.",
    goal: "Hardware development is unpredictable. This buffer ensures we do not run out of capital if a sensor breaks, a rig needs re-tooling, or physical measurements require an extra iteration cycle.",
  },
] as const;

function UseOfFundsRow({
  category,
  amount,
  pct,
  funding,
  goal,
}: (typeof USE_OF_FUNDS_ROWS)[number]) {
  return (
    <div className="flex flex-1 items-center border-b border-border py-4">
      <div className="grid w-full grid-cols-[minmax(0,1.05fr)_minmax(0,0.42fr)_minmax(0,1.53fr)] gap-x-8">
        <div>
          <div className="text-[18px] font-semibold leading-[1.3] text-fg-primary">
            {category}
          </div>
          <div className="mt-1 font-mono text-[16px] text-fg-secondary">
            {amount}{" "}
            <span className="text-fg-caption">({pct})</span>
          </div>
        </div>
        <div className="text-[16px] leading-[1.45] text-fg-secondary">{funding}</div>
        <div className="text-[16px] leading-[1.45] text-fg-primary">
          <span className="font-semibold">Goal:</span> {goal}
        </div>
      </div>
    </div>
  );
}

export function UseOfFundsSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">The Ask</Eyebrow>
          <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.05] tracking-[-0.035em] text-fg-primary">
            Use of Funds{" "}
            <span className="text-[48px] text-fg-secondary">($150K Pre-Seed)</span>
          </h2>
          <p className="mt-3 max-w-[1640px] text-[20px] leading-[1.45] text-fg-secondary">
            Capital optimized to deliver physical validation, secure IP, and
            unlock the next professional seed round.
          </p>
          <div className="mt-5 flex max-w-[1640px] flex-wrap gap-8 font-mono text-[14px] uppercase tracking-[0.1em] text-fg-primary">
            <p>
              <span className="text-fg-caption">Total raise · </span>
              <span className="font-semibold">$150K USD</span>
            </p>
            <p>
              <span className="text-fg-caption">Runway target · </span>
              <span className="font-normal normal-case tracking-normal text-[16px] text-fg-secondary">
                15+ months standalone runway · PoC and first revenue within this window
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          <div className="grid shrink-0 grid-cols-[minmax(0,1.05fr)_minmax(0,0.42fr)_minmax(0,1.53fr)] gap-x-8 border-b border-border-strong py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-caption">
            <div>Allocation</div>
            <div>Funding</div>
            <div>Goal</div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            {USE_OF_FUNDS_ROWS.map((row) => (
              <UseOfFundsRow key={row.category} {...row} />
            ))}
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="17 · Use of Funds" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  23 · Pipeline Traction
// ---------------------------------------------------------------------
type PipelineTimelineStep = {
  period: string;
  phase: string;
  value: string;
};

type PipelinePartner = {
  name: string;
  role: string;
  logoSrc: string;
  logoClassName?: string;
  body: string;
  timeline: readonly PipelineTimelineStep[];
};

const PIPELINE_LOI_PARTNERS: readonly PipelinePartner[] = [
  {
    name: "XELA Robotics",
    role: "High-density 3D tactile sensing",
    logoSrc: "/assets/partners/xela-robotics.png",
    logoClassName: "max-h-[30px] max-w-[132px]",
    body: "XELA\u2019s uSkin detects tactile slip; Arc is the downstream hardware-accelerated intelligence layer that acts on that data instantly.",
    timeline: [
      { period: "Mo. 6–9", phase: "POC", value: "$250K" },
      { period: "Mo. 9–15", phase: "Co-dev", value: "$500K" },
      { period: "Mo. 15+", phase: "1–2% per unit royalty", value: "" },
    ],
  },
  {
    name: "Kyostra",
    role: "Deterministic execution governance",
    logoSrc: "/assets/partners/kyostra.webp",
    logoClassName: "max-h-[28px] max-w-[148px]",
    body: "Kyostra builds the runtime layer that enforces strict physical safety limits. A partnership maps Arc\u2019s neuromorphic speed into their ecosystem to execute those boundaries in real time.",
    timeline: [
      {
        period: "Mo. 6–12+",
        phase: "Co-dev for Humanoid safety layer",
        value: "$5B market",
      },
    ],
  },
  {
    name: "Sophara Robotics",
    role: "Elder-care & service platforms",
    logoSrc: "/assets/partners/sophara-robotics.svg",
    logoClassName: "max-h-[32px] max-w-[156px]",
    body: "Deploying across Europe and Japan, they require Arc\u2019s intelligence layer to guarantee safe, cage-free physical contact in unpredictable human environments.",
    timeline: [
      { period: "Mo. 6–9", phase: "POC", value: "~$100K" },
      { period: "Mo. 9–15", phase: "Co-dev", value: "$500K" },
      {
        period: "Mo. 15+",
        phase: "5–8% per unit royalty — pathway to Euro market",
        value: "",
      },
    ],
  },
  {
    name: "Cyberdyne",
    role: "Medical & human-assistive robotics",
    logoSrc: "/assets/partners/cyberdyne.svg",
    logoClassName: "max-h-[30px] max-w-[168px]",
    body: "A leader in our Tsukuba ecosystem building rehabilitation exoskeletons, demanding the ceiling of human-machine safety with Arc for sub-millisecond force-capping.",
    timeline: [
      { period: "Mo. 6–9", phase: "POC", value: "$150K" },
      { period: "Mo. 9–20", phase: "Co-dev", value: "$500K" },
      { period: "Mo. 15+", phase: "1–2% per unit royalty", value: "" },
    ],
  },
];

function PipelinePartnerCard({
  name,
  role,
  logoSrc,
  logoClassName,
  body,
  timeline,
}: PipelinePartner) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden border border-border bg-bg-subtle px-5 py-4">
      <PartnerLogoPad
        src={logoSrc}
        className="mb-3 flex h-10 w-full shrink-0 items-center px-3 py-0"
        imgClassName={`block max-h-[28px] w-auto object-contain object-left ${logoClassName ?? "max-w-[160px]"}`}
      />
      <p className="shrink-0 text-[17px] font-semibold leading-[1.25] text-fg-primary">
        {name}
      </p>
      <p className="mt-0.5 shrink-0 text-[13px] leading-[1.35] text-fg-caption">
        {role}
      </p>
      <p className="mt-2 min-h-0 flex-1 text-[14px] leading-[1.45] text-fg-secondary">
        {body}
      </p>
      <div className="mt-2.5 shrink-0 space-y-1 border-t border-border pt-2.5">
        {timeline.map((step) => (
          <p
            key={`${step.period}-${step.phase}`}
            className="font-mono text-[13px] leading-[1.4] tracking-[0.02em] text-fg-primary"
          >
            {step.period ? (
              <>
                <span className="text-fg-secondary">{step.period}</span> ·{" "}
              </>
            ) : null}
            <span className="font-semibold">{step.phase}</span>
            {step.value ? (
              <>
                {" · "}
                <span className="text-accent">{step.value}</span>
              </>
            ) : null}
          </p>
        ))}
      </div>
    </div>
  );
}

export function PipelineTractionSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex h-full min-h-0 flex-col overflow-hidden max-w-[1640px] pb-[118px]">
        <div className="shrink-0">
          <Eyebrow className="mb-2">Traction</Eyebrow>
          <h2 className="max-w-[1640px] text-[52px] font-light leading-[1.05] tracking-[-0.035em] text-fg-primary">
            Pipeline Traction: Validating our Intelligence Layer
          </h2>
          <p className="mt-2 max-w-[1640px] text-[20px] leading-[1.45] text-fg-secondary">
            Hinoki&rsquo;s <span className="italic">Arc</span> across the
            robotics ecosystem
          </p>
        </div>

        <div className="mt-2 shrink-0 border-b border-border pb-2.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-caption">
            The commercial trigger mechanism
          </p>
          <p className="mt-1 text-[14px] leading-[1.4] text-fg-primary">
            Each executed Letter of Intent guarantees a formal executive discussion
            for co-development, hardware partnership, or Proof of Concept (POC)
            integration within{" "}
            <span className="font-semibold">30 days</span> of Hinoki delivering
            our physical benchmark data sheet.
          </p>
        </div>

        <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden">
          <p className="shrink-0 font-mono text-[12px] uppercase tracking-[0.14em] text-fg-secondary">
            Secured LOIs · ecosystem partners
          </p>
          <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3.5 overflow-hidden">
            {PIPELINE_LOI_PARTNERS.map((partner) => (
              <div key={partner.name} className="min-h-0 overflow-hidden">
                <PipelinePartnerCard {...partner} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[118px] left-[140px] right-[140px] z-[2] max-w-[1640px] border-t border-border pt-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-caption">
          High-signal pipeline · active discussions
        </p>
        <div className="mt-2 flex items-center gap-4">
          <PartnerLogoPad
            src="/assets/partners/astroscale.png"
            className="flex h-9 shrink-0 items-center px-3 py-0"
            imgClassName="max-h-[26px] w-auto max-w-[150px] object-contain object-left"
          />
          <p className="min-w-0 text-[14px] leading-[1.4] text-fg-primary">
            <span className="font-semibold">Astroscale</span>{" "}
            <span className="text-fg-caption">
              (on-orbit servicing & space debris removal)
            </span>
            {" — "}Active discussions with their Head of R&D, for Q4 Pilot.
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="17 · Pipeline Traction" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  25 · Case Study — XELA Robotics
// ---------------------------------------------------------------------
export function XelaCaseStudySlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">Case Study</Eyebrow>
          <h2 className={`max-w-[1640px] ${DECK_SLIDE_H2_CLASS}`}>
            The Sensor vs. The Stack
          </h2>
          <div className="mt-3 flex max-w-[1640px] items-center gap-4">
            <XelaLogo imgClassName="block h-7 w-auto max-w-[120px] object-contain object-left" />
            <p className="text-[22px] leading-[1.45] text-fg-secondary">
              XELA Robotics · CEO Alexander Schmitz
            </p>
          </div>
        </div>

        <div className="mt-6 grid min-h-0 max-w-[1640px] flex-1 grid-cols-[minmax(0,1fr)_minmax(0,560px)] items-stretch gap-10">
          <div className="flex min-h-0 flex-col justify-center gap-8">
            <div>
              <p className="font-mono text-[15px] uppercase tracking-[0.12em] text-fg-caption">
                The problem
              </p>
              <p className="mt-3 text-[34px] font-semibold leading-[1.25] text-fg-primary">
                The Best Sensors in the World Still Drop Parts
              </p>
              <ul className="mt-5 space-y-3.5 text-[24px] leading-[1.45] text-fg-primary">
                <li className="flex gap-3.5">
                  <span className="shrink-0 text-[28px] leading-[1.2] text-accent">
                    ·
                  </span>
                  <span>
                    Industry-leading high-density 3-axis tactile skin (uSkin)
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="shrink-0 text-[28px] leading-[1.2] text-accent">
                    ·
                  </span>
                  <span>
                    Tier-1 supply chain: Honda, Hitachi, Samsung, Denso
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="shrink-0 text-[28px] leading-[1.2] text-accent">
                    ·
                  </span>
                  <span>
                    Native integration into FANUC cobots and OEM grippers
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="shrink-0 text-[28px] leading-[1.2] text-accent">
                    ·
                  </span>
                  <span>
                    Flawless slip data the exact millisecond contact breaks
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-9">
              <p className="font-mono text-[17px] uppercase tracking-[0.14em] text-accent">
                The Frustration
              </p>
              <ul className="mt-4 space-y-3.5 text-[24px] leading-[1.45] text-fg-primary">
                <li className="flex gap-3.5">
                  <span className="shrink-0 text-[28px] leading-[1.2] text-accent">
                    ·
                  </span>
                  <span>
                    Clients&apos; effectors still drop objects despite
                    world-class sensors
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="shrink-0 text-[28px] leading-[1.2] text-accent">
                    ·
                  </span>
                  <span>
                    Sensor detects the slip — centralized software can&rsquo;t
                    process the high-density data
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="shrink-0 text-[28px] leading-[1.2] text-accent">
                    ·
                  </span>
                  <span>
                    Stack too slow to close the actuator before the object falls
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex min-h-0 flex-col justify-center">
            <div className="shrink-0">
              <img
                src="/assets/case-study-xela-uskin-gripper.png"
                alt="XELA uSkin high-density 3-axis tactile sensors on a robotic hand and gripper"
                className="w-full -translate-y-44 object-contain"
              />
              <p className="-mt-10 text-center font-mono text-[13px] leading-[1.5] tracking-[0.04em] text-fg-caption">
                Type: USkin by XELA
                <br />
                Allegro Hand by WONIK Robotics.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="06 · The Sensor vs. The Stack" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  26 · Case Study — The Cost of a Dropped Object
// ---------------------------------------------------------------------
export function XelaCostCaseStudySlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <CaseStudyEyebrowRow />
          <div className="flex max-w-[1640px] items-start justify-between gap-12">
            <div className="min-w-0">
              <h2 className={`max-w-[960px] ${DECK_SLIDE_H2_CLASS}`}>
                The Cost of a Dropped Object
              </h2>
              <p className={`max-w-[820px] ${DECK_SLIDE_SUBTITLE_CLASS}`}>
                The financial bleed for XELA&rsquo;s clients.
              </p>
            </div>
            <div className="relative h-[280px] w-[680px] shrink-0 overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/dropped-object-cost-accent.png?v=6"
                alt=""
                width={640}
                height={480}
                decoding="async"
                aria-hidden
                className="absolute right-0 -bottom-16 h-[440px] w-[692px] object-contain object-right-bottom"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          <div className="shrink-0 border-b border-border pb-5">
            <p className="font-mono text-[15px] font-semibold uppercase tracking-[0.14em] text-fg-primary">
              The assembly line calculation
            </p>
          </div>

          <DenseSlideLedgerRow
            label="The Scenario"
            body={<>Industrial arms drop units due to stack latency</>}
          />
          <DenseSlideLedgerRow
            label="The Scrap Cost"
            body={
              <>
                <span className="font-semibold">2 units per week</span> at{" "}
                <span className="font-semibold">$500</span> per unit,{" "}
                <span className="font-semibold">$52,000/year</span> in scrapped
                material.
              </>
            }
          />
          <DenseSlideLedgerRow
            label="The Catastrophic Bleed"
            body={
              <>
                Triggers <span className="font-semibold">10-minute</span>{" "}
                recalibration and clearing protocol.
              </>
            }
          />
          <DenseSlideLedgerRow
            label="The Math"
            body={
              <>
                <span className="font-semibold">104 drops a year</span> ×{" "}
                <span className="font-semibold">10 minutes</span> ={" "}
                <span className="font-semibold">1,040 minutes</span> of downtime. At{" "}
                <span className="font-semibold">$15,000 per minute</span>, costs the
                client{" "}
                <span className="font-semibold">$15.6 Million annually</span> per
                factory line.
              </>
            }
          />
        </div>
      </div>

      <SlideFooter pageLabel="07 · The Cost of a Dropped Object" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  27 · Case Study — The Hinoki Solution
// ---------------------------------------------------------------------
export function XelaHinokiSolutionCaseStudySlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <CaseStudyEyebrowRow />
          <div className="flex max-w-[1640px] items-start justify-between gap-12">
            <div className="min-w-0">
              <h2 className={`max-w-[960px] ${DECK_SLIDE_H2_CLASS}`}>
                The <span className="italic">Arc</span> solution
              </h2>
              <p className={`max-w-[820px] ${DECK_SLIDE_SUBTITLE_CLASS}`}>
                Arresting the slip before it happens. Locally and safely.
              </p>
            </div>
            <div className="relative h-[280px] w-[680px] shrink-0 overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hinoki-solution-slip-arrest-accent.png?v=4"
                alt=""
                width={640}
                height={480}
                decoding="async"
                aria-hidden
                className="absolute right-0 -bottom-16 h-[440px] w-[692px] object-contain object-right-bottom"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          <DenseSlideLedgerRow
            label="The Sub-Millisecond Intercept"
            body={
              <>
                <span className="italic">Arc</span> can detect the microslips in
                real time
              </>
            }
          />
          <DenseSlideLedgerRow
            label="Intelligent Force Capping"
            body={
              <>
                <span className="italic">Arc</span>{" "}
                intelligently computes the exact minimal friction required to arrest
                the slip. Does not crush the object.
              </>
            }
          />
          <DenseSlideLedgerRow
            label="The Result"
            body={
              <>
                Prevents the <span className="font-semibold">$15.6M</span> production
                stop.
              </>
            }
          />
        </div>
      </div>

      <SlideFooter pageLabel="08 · The Arc Solution" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  28 · Case Study — Commercializing the Wedge
// ---------------------------------------------------------------------
export function XelaCommercialWedgeCaseStudySlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <CaseStudyEyebrowRow />
          <div className="max-w-[1640px]">
            <h2 className={`max-w-[960px] ${DECK_SLIDE_H2_CLASS}`}>
              Commercializing the Wedge
            </h2>
            <p className={`max-w-[820px] ${DECK_SLIDE_SUBTITLE_CLASS}`}>
              The deployment and revenue model for hardware partnerships.
            </p>
          </div>
        </div>

        <p className="mt-6 shrink-0 max-w-[1640px] text-[22px] font-normal leading-[1.55] text-fg-primary">
          Through XELA, we embed our architecture directly into a supply chain
          that feeds OEMs like Hitachi and Denso.
        </p>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          <DenseSlideLedgerRow
            label="Phase 1"
            subtitle="Paid Proof of Concept ($250K)"
            period="Mo. 6–9"
            body={
              <>
                Integrate <span className="italic">Arc</span>{" "}with XELA&rsquo;s
                uSkin
              </>
            }
          />
          <DenseSlideLedgerRow
            label="Phase 2"
            subtitle="Reference Design & Integration ($500K NRE)"
            period="Mo. 10–15"
            body={
              <>
                Build <span className="italic">Arc</span> directly into their
                catalog
              </>
            }
          />
          <DenseSlideLedgerRow
            label="Phase 3"
            subtitle="Scalable Licensing (10% per unit) due to partnership"
            period="Mo. 15+"
            body={
              <>
                High margin per unit royalty, data collection moat
              </>
            }
          />
        </div>
      </div>

      <SlideFooter pageLabel="09 · Commercializing the Wedge" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  29 · Case Study — The Volume Projection
// ---------------------------------------------------------------------
export function XelaVolumeProjectionCaseStudySlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <CaseStudyEyebrowRow />
          <div className="relative max-w-[1640px]">
            <h2 className={`max-w-[960px] ${DECK_SLIDE_H2_CLASS}`}>
              The Volume Projection
            </h2>
            <p className={`max-w-[820px] ${DECK_SLIDE_SUBTITLE_CLASS}`}>
              Unit economics of just one partnership.
            </p>
            <div
              className="absolute right-[80px] top-[36%] flex w-[900px] -translate-y-1/2 items-center justify-end gap-3"
              aria-hidden
            >
              <PartnerLogoPad
                src="/assets/partners/hitachi.png"
                className="px-2 py-1"
                imgClassName="block h-8 w-auto max-w-[112px] shrink-0 object-contain"
              />
              <PartnerLogoPad
                src="/assets/partners/denso.png"
                className="px-2 py-1"
                imgClassName="block h-8 w-auto max-w-[92px] shrink-0 object-contain"
              />
              <PartnerLogoPad
                src="/assets/partners/samsung.png"
                className="px-2 py-1"
                imgClassName="block h-9 w-auto max-w-[108px] shrink-0 object-contain"
              />
              <PartnerLogoPad
                src="/assets/partners/honda.png"
                className="px-2 py-1"
                imgClassName="block h-8 w-auto max-w-[112px] shrink-0 object-contain"
              />
              <PartnerLogoPad
                src="/assets/partners/robotiq.png"
                className="px-2 py-1"
                imgClassName="block h-8 w-auto max-w-[112px] shrink-0 object-contain"
              />
              <PartnerLogoPad
                src="/assets/partners/fanuc.png"
                className="px-2 py-1"
                imgClassName="block h-8 w-auto max-w-[96px] shrink-0 object-contain"
              />
              <PartnerLogoPad
                src="/assets/partners/agile-robots.png"
                className="px-2 py-1"
                imgClassName="block h-8 w-auto max-w-[120px] shrink-0 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          <DenseSlideLedgerRow
            label="The Addressable Volume"
            body={
              <>
                Over <span className="font-semibold">170 active clients</span>.
                Annual shipments at{" "}
                <span className="font-semibold">20,000–50,000 units</span> next{" "}
                <span className="font-semibold">36 months</span>.
              </>
            }
          />
          <DenseSlideLedgerRow
            label="The Unit Math"
            body={
              <>
                <span className="font-semibold">$500 per unit</span> on a conservative{" "}
                <span className="font-semibold">20,000</span> integrated units yields{" "}
                <span className="font-semibold">$10M</span> in high-margin ARR from 1
                partner ecosystem.
              </>
            }
          />
          <DenseSlideLedgerRow
            label="The Multiplier"
            body={
              <>
                We copy-paste this exact model across the entire{" "}
                <span className="font-semibold">
                  $11B (2030) Robot End-Effector Market
                </span>
                .
              </>
            }
          />
        </div>
      </div>

      <SlideFooter pageLabel="10 · The Volume Projection" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  Appendix · Investor deck slide 04 — architecture stack comparison
// ---------------------------------------------------------------------
export function InvestorDeckSolutionSlide() {
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

      <div className="mt-14">
        <ArcStackArchitectureDiagram />
      </div>
      <SlideFooter pageLabel="Appendix 11 · Solution" />
    </Slide>
  );
}

// =====================================================================
//  Ordered slide manifest — drives PitchDeck navigation
// =====================================================================
export const SLIDES: Array<() => React.JSX.Element> = [
  TitleSlide,
  TruePhysicalAIConceptSlide,
  ComputeGapSlide,
  SolutionSlide,
  IntelligentHardwareSlide,
  XelaCaseStudySlide,
  XelaCostCaseStudySlide,
  XelaHinokiSolutionCaseStudySlide,
  XelaCommercialWedgeCaseStudySlide,
  XelaVolumeProjectionCaseStudySlide,
  MarketSizingSummarySlide,
  ValueMultiplierSlide,
  GtmSlide,
  Vision2035Slide,
  ProductRoadmapSlide,
  WebsiteRoadmapSlide,
  PipelineTractionSlide,
  CapitalRoadmapSlide,
  TeamSlide,
  ThankYouSlide,
  UnfairAdvantageSlide,
  TechnicalNetworkSlide,
  DiscoverySlide,
  CompetitiveLandscapeSlide,
  Tam2030ModelSlide,
  Tam2035ModelSlide,
  TruePhysicalAIArcSlide,
];
