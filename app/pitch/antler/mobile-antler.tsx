// Mobile fallback for /pitch/antler — synced with slides-antler.tsx (desktop is source of truth).
// Slide order follows Antler's expected pitch structure:
//   Cover · Problem · Solution · Validation · Why Now · Business Model ·
//   Market Size · Competition · GTM · Vision · Team · Ask

import React from "react";

function Card({
  tag,
  title,
  children,
}: {
  tag: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-bg-subtle p-5">
      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
        {tag}
      </div>
      <h2 className="text-[24px] font-light leading-[1.2] tracking-[-0.02em]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({
  items,
  className = "space-y-2 text-[15px] leading-[1.6]",
}: {
  items: React.ReactNode[];
  className?: string;
}) {
  return (
    <ul className={`mt-4 list-disc pl-5 text-fg-secondary ${className}`}>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
      {children}
    </div>
  );
}

function AccentCallout({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-lg border border-accent bg-accent-subtle p-4">
      {label ? (
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          {label}
        </div>
      ) : null}
      <div className={`${label ? "mt-2" : ""} text-[14px] leading-[1.55] text-fg-primary`}>
        {children}
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-bg-base px-3 py-1.5 text-[12px] leading-[1.3] text-fg-secondary">
      {children}
    </span>
  );
}

export default function MobileDeckAntler() {
  return (
    <main className="min-h-dvh bg-bg-base px-5 pb-20 pt-10 text-fg-primary">
      <header className="mx-auto max-w-[720px]">
        <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          Hinoki Technologies · Antler IC Deck
        </div>
        <h1 className="text-[36px] font-light leading-[1.1] tracking-[-0.03em] md:text-[48px]">
          Robots are getting brains.
          <br />
          <span className="italic">Arc</span> gives them reflexes.
        </h1>
        <p className="mt-5 text-[15px] leading-[1.65] text-fg-secondary">
          Hinoki is building the{" "}
          <span className="font-semibold text-fg-primary">
            physical response layer
          </span>{" "}
          robots have been missing — a neuromorphic local control architecture
          that turns sensor data into fast, adaptive physical action, without
          replacing the existing controller.
        </p>
        <div className="mt-5 font-mono text-[11px] tracking-[0.06em] text-fg-caption">
          Antler Japan · Pre-IC / IC · May 2026
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-[720px] space-y-10">
        <Card
          tag="02 · Problem"
          title={
            <>
              Robots can think.
              <br />
              They still can&rsquo;t reliably react.
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Performance degrades when weight, contact, payload, vibration, or
            environment changes.
          </p>
          <BulletList
            items={[
              "Works in the lab, fails in the field",
              "Too slow at the physical edge",
              "Hard to repeat across customers",
            ]}
          />
          <AccentCallout label="Bottom line">
            For robotics companies, this is a scaling problem. Deployments
            take longer, run at lower speeds, and become harder to repeat
            profitably.
          </AccentCallout>
        </Card>

        <Card
          tag="03 · Solution"
          title="Arc — the missing physical response layer."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            A neuromorphic local control layer between selected sensors and
            actuators — alongside, not instead of, the existing controller.
          </p>
          <SubLabel>Today</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Sensor data → perception / planning / control → actuator response
          </p>
          <SubLabel>With Arc</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Sensor event → Arc local reflex → bounded correction → actuator
          </p>
          <BulletList
            items={[
              "Faster local response",
              "Adaptive physical dynamics",
              "Works alongside existing controllers",
            ]}
          />
          <AccentCallout label="Bottom line">
            Not another robot brain. A nervous-system-like control layer that
            can be validated in one physical loop, then licensed across
            robotic systems.
          </AccentCallout>
        </Card>

        <Card
          tag="04 · Demand Validation"
          title="The market is pulling us toward the same first loop."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Discovery narrowed Arc to a measurable first benchmark: tactile
            slip detection and fast gripper response.
          </p>
          <SubLabel>Customer pull</SubLabel>
          <BulletList
            items={[
              "Tokyo-based tactile sensing partner — technical LOI being finalized",
              "Assistive robotics company — CEO meeting scheduled",
              "Cognitive robotics company — co-founder meeting being set",
              "Vision-based tactile sensing — warm route identified",
            ]}
          />
          <SubLabel>Engineer signal</SubLabel>
          <BulletList
            items={[
              "AMR, humanoid, quadruped, assistive, marine, and service robotics engineers",
              "Confirmed pain around latency, noisy input, variable loads, wheel slip, and real-time response",
            ]}
          />
          <SubLabel>Momentum</SubLabel>
          <BulletList
            items={[
              "Phase 1 FPGA validation completed",
              "6-week demo sprint underway",
              "Coreline / Atlas — first screening passed",
              "Sony Innovation Fund — materials shared with deep-tech team",
              "The Ventures Award — first round passed",
            ]}
          />
        </Card>

        <Card
          tag="05 · Why Now"
          title="The body-control bottleneck is becoming urgent."
        >
          <BulletList
            items={[
              "AI is pushing robots into less structured environments",
              "Tactile, force, and event-based sensors create richer physical data than the control layer can use",
              "Japan's aging society, labor shortage, and manufacturing pressure make robotics a national priority",
              "FPGA-first validation lets us test adaptive response before moving to ASIC, reference design, or embedded IP",
            ]}
          />
          <AccentCallout label="Bottom line">
            The world is building better robot brains. Hinoki is building the
            response layer that lets those robots work in the real world.
          </AccentCallout>
        </Card>

        <Card
          tag="06 · Business Model"
          title="ARM for robotics."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            We don&rsquo;t build robots. We license the architecture layer that
            helps them physically respond.
          </p>
          <SubLabel>Phase 1 — paid validation &amp; co-development</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Creates early revenue, proprietary data, and reference customers.
          </p>
          <SubLabel>Phase 2 — reference design licensing</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Annual license fees for platform partners integrating Arc.
          </p>
          <SubLabel>Phase 3 — embedded IP royalties</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Per-platform or per-unit royalties as Arc becomes embedded.
          </p>
          <SubLabel>Unit logic</SubLabel>
          <BulletList
            items={[
              "Paid validation / co-development: ¥5–15M per project",
              "Reference design / integration: ¥10–30M per partner",
              "Platform license: ¥30–100M+ per partner",
              "Embedded IP royalties: per-platform / per-unit",
            ]}
          />
          <AccentCallout>
            Compute companies don&rsquo;t capture value by selling devices.
            They capture value by sitting inside everyone else&rsquo;s.
          </AccentCallout>
        </Card>

        <Card tag="07 · Market Size" title="Every platform that moves.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Arc starts in a measurable wedge and expands across the robotics
            platforms where physical response is performance-critical.
          </p>
          <SubLabel>Beachhead — $15B+</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Tactile &amp; force sensing by 2030. Robotic grippers, tactile
            sensors, industrial manipulation — the first paid validation
            wedge.
          </p>
          <SubLabel>Serviceable — $170B</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Global robotics market by 2030. Industrial automation is $300B+
            deployed today.
          </p>
          <SubLabel>Long-term — $165B</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Humanoid robots by 2034 at 50% CAGR. Cage-free human-robot
            collaboration is gated on the layer Arc operates in.
          </p>
          <SubLabel>Expansion path</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Tactile slip &amp; gripper response → industrial &amp; collaborative →
            mobile &amp; humanoids → assistive · drones · quadrupeds.
          </p>
        </Card>

        <Card
          tag="08 · Competition"
          title="The physical response layer is uncrowded."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Cognition, sensing, and motion control are all active. The local
            response layer between sensing and actuation remains
            underdeveloped.
          </p>
          <BulletList
            items={[
              "Digital adaptive control (PID / MPC) — static tuning, slow adaptation",
              "TinyML / Embedded ML — latency-bound by inference cycle",
              "Neuromorphic spiking — less mature in closed-loop actuation",
              "Silicon-first RC — topology locked before optimum found",
              "Hinoki Arc — FPGA-first continuous-time substrate, iterable now → ASIC / IP licensable later",
            ]}
          />
          <AccentCallout>
            The incumbents bet on the answer. We bet on the question.
          </AccentCallout>
        </Card>

        <Card
          tag="09 · Go-to-Market"
          title="Japan first. By design, not default."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Japan is the world&rsquo;s most concentrated robotics ecosystem.
            We&rsquo;re based in Tsukuba Science City — next to AIST and NIMS —
            and already inside the relationships that matter.
          </p>
          <SubLabel>Customer development</SubLabel>
          <BulletList
            items={[
              "Tactile sensing partner — Tokyo-based, technical LOI being finalized",
              "Assistive &amp; cognitive robotics — CEO and co-founder meetings",
              "Engineer discovery across AMR, humanoid, quadruped, assistive, marine, and service robotics",
            ]}
          />
          <SubLabel>Capital &amp; ecosystem pathway</SubLabel>
          <BulletList
            items={[
              "Antler Japan 2026 Residency — selected",
              "Coreline / Atlas first screening passed; Sony Innovation Fund materials shared",
              "NEDO grant pathway targeted post-benchmark to extend non-dilutive runway",
            ]}
          />
        </Card>

        <Card
          tag="10 · Vision"
          title={
            <>
              Physical intelligence doesn&rsquo;t live in the brain.
              <br />
              It lives in the body.
            </>
          }
        >
          <SubLabel>Response</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            A body that acts before the brain decides. Touch something hot —
            your hand pulls back before you think.
          </p>
          <SubLabel>Adaptation</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            A body that learns from contact, instantly. No replanning. No
            retraining.
          </p>
          <SubLabel>Resilience</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            A body that keeps going when a part fails. Intelligence in the
            substrate, not the central plan.
          </p>
          <AccentCallout>
            Hinoki is building the physical intelligence infrastructure every
            robotic platform of the next decade will need — three behaviors,
            one architecture.
          </AccentCallout>
        </Card>

        <Card tag="11 · Team" title="Biology meets hardware AI.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            A Tsukuba-rooted team built to turn physical intelligence from
            architecture thesis into commercial robotics infrastructure.
          </p>
          <SubLabel>Salvatore · CEO / Commercial</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Biology background, University of Tsukuba. Co-architect of Arc
            thesis. Built a Japan-based enterprise practice from zero. Leads
            commercial strategy, investor relations, and customer development.
          </p>
          <SubLabel>Bernardo · CTO / Technical</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            PhD computer vision engineer. Robotics, embedded AI, FPGA /
            reservoir implementation. Former AIST Tsukuba researcher. Built
            and validated Phase 1.
          </p>
          <SubLabel>Mina · COO / Japan Operations</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Native Japanese. Former manager at Meiji Yasuda Life Insurance.
            Japanese corporate stakeholder management, operations, and Japan
            ecosystem development.
          </p>
          <SubLabel>Unfair advantage</SubLabel>
          <div className="mt-2 flex flex-wrap gap-2">
            <Pill>Tsukuba Science City launchpad</Pill>
            <Pill>Japan timing</Pill>
            <Pill>Researcher network</Pill>
            <Pill>Long-standing trust</Pill>
            <Pill>FPGA-to-IP loop</Pill>
          </div>
        </Card>

        <Card
          tag="12 · Milestones / Ask"
          title="Antler capital unlocks the benchmark that unlocks the next round."
        >
          <SubLabel>Now → IC</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Finalize first technical LOI, define benchmark, continue demo
            sprint.
          </p>
          <SubLabel>0–3 months</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Build closed-loop tactile-to-actuation validation rig. Run Arc
            vs. conventional baseline.
          </p>
          <SubLabel>3–6 months</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Share validation data with partners. Secure 1–2 deeper partner
            pilot paths. Prepare initial IP filing.
          </p>
          <SubLabel>6–9 months</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
            Raise from professional investors using benchmark data, LOIs, and
            IP strategy.
          </p>
          <AccentCallout>
            One measurable reflex loop becomes the foundation for physical
            intelligence infrastructure.
          </AccentCallout>
        </Card>
      </div>

      <footer className="mx-auto mt-12 max-w-[720px] text-center font-mono text-[11px] tracking-[0.08em] text-fg-tertiary">
        Hinoki Technologies · Antler IC Deck · hinokitech.com
      </footer>
    </main>
  );
}
