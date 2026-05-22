// Mobile fallback for /pitch/1stround — synced with slides-1stround.tsx (desktop is source of truth).

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
    <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
      {children}
    </div>
  );
}

function EngineerQuote({
  role,
  quote,
  variant = "supporting",
}: {
  role: string;
  quote: string;
  variant?: "primary" | "supporting";
}) {
  if (variant === "primary") {
    return (
      <div className="rounded-lg border-2 border-accent bg-accent-subtle px-4 py-4">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
          {role}
        </div>
        <p className="mt-3 text-[16px] leading-[1.55] text-fg-primary">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-bg-base/80 px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
        {role}
      </div>
      <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

function AccentCallout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-lg border border-accent bg-accent-subtle p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
        {label}
      </div>
      <div className="mt-2 text-[14px] leading-[1.55] text-fg-primary">{children}</div>
    </div>
  );
}

export default function MobileDeck1stRound() {
  return (
    <main className="min-h-dvh bg-bg-base px-5 pb-20 pt-10 text-fg-primary">
      <header className="mx-auto max-w-[720px]">
        <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          Hinoki Technologies · 1stRound Application
        </div>
        <h1 className="text-[36px] font-light leading-[1.12] tracking-[-0.03em] md:text-[48px]">
          Physical intelligence for robotic systems.
        </h1>
        <p className="mt-5 text-[16px] leading-[1.65] text-fg-secondary">
          <span className="italic font-semibold text-fg-primary">Arc</span> is
          a neuromorphic local control layer that helps robots convert sensor
          data into{" "}
          <span className="font-semibold text-fg-primary">
            faster physical response
          </span>
          ,{" "}
          <span className="font-semibold text-fg-primary">
            without replacing the existing controller
          </span>
          .
        </p>
        <p className="mt-4 text-[15px] font-light italic leading-[1.55] text-fg-primary">
          Robots have been given brains.{" "}
          <span className="not-italic font-semibold">
            Arc gives them a nervous system.
          </span>
        </p>
        <ul className="mt-5 space-y-1.5 text-[14px] leading-[1.6] text-fg-secondary">
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>Tsukuba-based deep-tech startup</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Selected for</span>
              <img
                src="/assets/antler-wordmark.png"
                alt="Antler"
                width={72}
                height={16}
                className="h-[16px] w-auto shrink-0 object-contain"
              />
              <span>Japan Residency, May 2026</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              First benchmark: tactile slip detection &amp; fast gripper
              response
            </span>
          </li>
        </ul>
        <div className="mt-5 font-mono text-[11px] tracking-[0.06em] text-fg-caption">
          1stRound application · May 2026
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-[720px] space-y-10">
        <Card
          tag="02 · Problem"
          title={
            <>
              Robots work in controlled environments.
              <br />
              Scaling into variable real-world conditions remains hard.
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Robots can perform well in demos, labs, simulations, and narrow
            deployments, but performance often degrades when weight, contact,
            payload, vibration, or environment changes.{" "}
            <span className="font-semibold text-fg-primary">
              Contact-rich tasks are especially difficult: nonlinear dynamics and
              small positional errors make physical interaction hard to
              generalize.
            </span>
          </p>
          <div className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-primary">
            What breaks when conditions change
          </div>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-border bg-bg-base/60 p-4">
              <p className="text-[15px] font-medium text-fg-primary">
                Works in the lab, fails in the field
              </p>
              <p className="mt-2 text-[14px] leading-[1.55] text-fg-secondary">
                Capable behavior in structured settings can fail when contact or
                operating conditions shift in production.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-base/60 p-4">
              <p className="text-[15px] font-medium text-fg-primary">
                Too slow at the physical edge
              </p>
              <p className="mt-2 text-[14px] leading-[1.55] text-fg-secondary">
                Slip or force change can outpace the full perception-to-planning
                path — the gap is response at the sensor-actuator loop.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-base/60 p-4">
              <p className="text-[15px] font-medium text-fg-primary">
                Hard to repeat across customers
              </p>
              <p className="mt-2 text-[14px] leading-[1.55] text-fg-secondary">
                Each site can mean custom tuning, more integration work, slower
                speeds, and narrower use cases.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-bg-base/60 p-4">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-primary">
              Technical symptoms under the same umbrella
            </div>
            <p className="mt-2 text-[13px] leading-[1.55] text-fg-secondary">
              Latency at the edge, sensor noise, poor physical adaptation,
              integration burden, reliability risk, and power / compute load in
              critical loops are not separate problems. They are symptoms of the
              same physical generalization gap.
            </p>
          </div>
          <p className="mt-4 text-[17px] leading-[1.6] text-fg-primary">
            The core issue is not perception alone. It is{" "}
            <span className="font-semibold">physical generalization</span>:
            turning sensor data into reliable, adaptive physical action when the
            world changes.
          </p>
          <div className="mt-5 rounded-lg border-2 border-accent bg-accent-subtle p-5">
            <p className="text-[17px] font-light leading-[1.45] text-fg-primary">
              For robotics companies, this is a{" "}
              <span className="font-semibold">scaling problem</span>. When robots
              fail outside narrow operating conditions, deployments take longer,
              require more field engineering, run at lower speeds, and become
              harder to repeat profitably across customers.
            </p>
          </div>
        </Card>

        <Card
          tag="03 · Solution"
          title={
            <>
              <span className="italic">Arc</span> adds the missing physical
              response layer.
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            A neuromorphic local control architecture that helps robots respond
            inside selected sensor-actuator loops, while the existing controller
            remains in charge.
          </p>
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Robotics companies are improving perception, planning, and AI, but
            many failures happen closer to the body of the robot. Arc sits
            between selected sensors and actuators, turning changing physical
            signals into bounded corrective action before the broader digital
            stack needs to intervene.
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Local physical response.
                </span>{" "}
                Creates a faster path from sensor event to actuator correction
                for control-critical loops such as slip, contact, force change,
                or imbalance.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Adaptive neuromorphic dynamics.
                </span>{" "}
                Uses reservoir computing to transform noisy, time-varying sensor
                input into a dynamic internal state, targeting stable correction
                under changing physical conditions.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Built for practical deployment.
                </span>{" "}
                Works alongside existing controllers, starts with one measurable
                loop, and uses FPGA-first validation to tune across sensors,
                protocols, and robotic platforms.
              </>,
            ]}
          />
          <SubLabel>Today</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            Sensor data → perception / planning / control stack → actuator
            response
          </p>
          <p className="mt-1 text-[13px] font-semibold leading-[1.5] text-fg-primary">
            Physical events are routed through the broader digital stack
          </p>
          <SubLabel>With Arc</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            Sensor event → Arc local reflex layer → bounded correction →
            actuator response
          </p>
          <p className="mt-1 text-[13px] font-semibold leading-[1.5] text-fg-primary">
            Selected physical loops receive a faster local response path
          </p>
          <p className="mt-4 font-mono text-[11px] leading-[1.5] text-fg-caption">
            The main controller remains in charge of perception, planning,
            safety, and task logic.
          </p>
          <SubLabel>Why companies work with Hinoki</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Test without full redesign.
                </span>{" "}
                Arc can be evaluated on one control-critical loop while the
                existing controller remains in charge.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Reduce deployment friction.
                </span>{" "}
                If validated, Arc can reduce failed actions, retuning burden,
                field engineering, and reliability issues in variable
                environments.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Shape the benchmark early.
                </span>{" "}
                Partners can review validation data and influence where Arc is
                tested against real robotics needs.
              </>,
            ]}
          />
          <div className="mt-5 rounded-lg border-2 border-accent bg-accent-subtle p-5">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              Bottom line
            </div>
            <p className="mt-2 text-[16px] font-light leading-[1.45] text-fg-primary">
              Hinoki&apos;s strength is architectural: not another robot brain,
              but a nervous-system-like control layer that can be validated in
              one physical loop and then licensed across robotic systems.
            </p>
          </div>
        </Card>

        <Card tag="04 · Discovery" title="What engineers are telling us so far.">
          <p className="mt-4 text-[15px] leading-[1.7] text-fg-secondary">
            Customer discovery is narrowing Arc from a broad architecture
            thesis into a measurable first control-loop benchmark.
          </p>
          <BulletList
            className="space-y-2.5 text-[16px] leading-[1.62]"
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Latency matters at the physical edge.
                </span>{" "}
                Engineers confirmed response time becomes critical when
                precision, speed, or actuator timing matter.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Physical variability creates instability.
                </span>{" "}
                Changing surfaces, variable loads, wheel slip, noisy sensors,
                and unpredictable environments create practical control
                challenges.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Slip response is the first measurable wedge.
                </span>{" "}
                In gripper control, the problem is concrete: detect slip,
                respond faster, stabilize the object, and compare against
                baseline.
              </>,
            ]}
          />
          <div className="mt-5 space-y-4">
            <EngineerQuote
              variant="primary"
              role="Gripper / manipulation engineer"
              quote="Slip shows up in the tactile stream before the grasp loop reacts. We increase grasp force after the part is already moving. Sensor-to-gripper latency keeps coming up."
            />
            <EngineerQuote
              role="AMR torque-control engineer"
              quote="Wheel slip forces tradeoffs between torque and velocity control. Closing the loop closer to the wheel would still help."
            />
            <EngineerQuote
              role="Bipedal humanoid researcher"
              quote="One slipped foothold and the gait is already behind. There is no separate fast path for contact."
            />
          </div>
          <div className="mt-6 rounded-lg border-2 border-accent bg-accent-subtle p-6">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              Bottom line
            </div>
            <p className="mt-2 text-[16px] font-light leading-[1.45] text-fg-primary">
              This pushed Hinoki toward a specific first validation benchmark:{" "}
              <span className="font-semibold">
                tactile slip detection and fast gripper response.
              </span>
            </p>
          </div>
        </Card>

        <Card
          tag="05 · First Benchmark"
          title="Tactile slip detection and fast gripper response."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Slip detection is the first benchmark — not the final market.
          </p>
          <SubLabel>Closed-loop benchmark — tactile sensor to gripper</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            Tactile sensor → Arc local reflex layer → bounded correction →
            motor controller → gripper stabilizes
          </p>
          <AccentCallout label="Discovery validation · Tactile-sensing partner">
            Tactile sensing and gripper response identified as a strong initial
            validation direction with a{" "}
            <span className="font-semibold">Tokyo-based tactile-sensing leader</span>
            .{" "}
            <span className="font-semibold">
              Finalizing technical LOI with CEO. Slip detection and fast gripper
              response aligned as first validation benchmark.
            </span>
          </AccentCallout>
          <SubLabel>Why this benchmark</SubLabel>
          <BulletList
            items={[
              "Concrete, measurable, commercially relevant",
              "Aligned with tactile sensing partners in Japan",
              "Proves Arc in one sensor-actuator loop without requiring full robot redesign",
              "Expands naturally into broader robotic manipulation and physical response",
            ]}
          />
          <SubLabel>Metrics — grouped by what they prove</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">Speed</span> —
                response time (slip → correction), gripper correction speed.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Reliability
                </span>{" "}
                — grasp stability, failed grasp / drop reduction.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Efficiency
                </span>{" "}
                — energy per response, Arc vs. conventional baseline.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Adaptation
                </span>{" "}
                — variable weight, surface, shape, motion, noise.
              </>,
            ]}
          />
        </Card>

        <Card
          tag="06 · Architecture"
          title={
            <>
              <span className="italic">Arc</span> — a local reflex layer for
              robotic systems.
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            <span className="font-semibold text-fg-primary">
              Inspired by the spinal reflex arc
            </span>{" "}
            — the body&apos;s fast local pathway from sensation to response. The
            robot keeps its existing controller; Arc adds a faster local response
            loop in selected sensor-actuator loops.
          </p>
          <div className="mt-4 rounded-lg border border-accent bg-accent-subtle px-4 py-3 text-[15px] font-semibold leading-[1.35] text-fg-primary">
            Not a replacement controller. A bounded local response layer.
          </div>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Existing controller
                </span>{" "}
                → task-level control → motor controller
              </>,
              <>
                <span className="font-semibold text-fg-primary">Arc</span> →
                bounded correction → motor controller
              </>,
              <>
                <span className="font-semibold text-fg-primary">Arc</span> →
                state feedback → main controller
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Arc works alongside existing robotics stacks, focusing on selected
            sensor-actuator loops where{" "}
            <span className="font-semibold text-fg-primary">
              fast local response, adaptation, or lower compute burden
            </span>{" "}
            matter.
          </p>
        </Card>

        <Card
          tag="07 · Customer Benefits"
          title={
            <>
              How <span className="italic">Arc</span> improves robotics
              economics.
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Arc is designed to improve selected physical control loops, helping
            robotics companies reduce deployment cost, improve reliability, and
            expand what their platforms can handle.
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Reduce deployment cost
                </span>{" "}
                — local adaptation in selected control loops reduces field
                engineering when objects, surfaces, payloads, or environments
                change.{" "}
                <span className="text-fg-tertiary">
                  Business impact: less field engineering, shorter deployment
                  cycles, better margins per customer.
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Increase reliability and uptime
                </span>{" "}
                — stabilize selected local loops before slip, unstable contact,
                vibration, sensor noise, or load changes stop workflows.{" "}
                <span className="text-fg-tertiary">
                  Business impact: fewer failures, higher uptime, more
                  repeatable customer deployments.
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Improve product capability
                </span>{" "}
                — faster local response for contact, force, slip, imbalance,
                and noisy input expands what platforms can handle.{" "}
                <span className="text-fg-tertiary">
                  Business impact: broader use cases, stronger product
                  differentiation, higher customer value.
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Lower compute and energy burden
                </span>{" "}
                — selected reflex-level responses run locally on FPGA instead
                of CPU, GPU, cloud, or heavy inference.{" "}
                <span className="text-fg-tertiary">
                  Business impact: more efficient embedded control, better fit
                  for mobile, assistive, humanoid, and field robotics.
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  De-risk integration
                </span>{" "}
                — test on one control-critical loop while the existing robot
                controller stays in charge.{" "}
                <span className="text-fg-tertiary">
                  Business impact: lower adoption friction, clearer pilot path,
                  easier partner evaluation.
                </span>
              </>,
            ]}
          />
          <AccentCallout label="Bottom line">
            Arc does not just make robots react faster. It is designed to make
            robotics platforms easier to deploy, more reliable in the field,
            and more profitable to scale.
          </AccentCallout>
        </Card>

        <Card
          tag="08 · Status"
          title="Phase 1 proved the substrate runs. Phase 2 proves physical response."
        >
          <SubLabel>Phase 1 — completed</SubLabel>
          <BulletList
            items={[
              "Reservoir computing implemented on FPGA hardware",
              "Live sensor stream classification + motion tracking validated",
              "Hardware validated on real silicon, not only simulation",
            ]}
          />
          <SubLabel>Phase 2 — next, 1stRound funds this</SubLabel>
          <BulletList
            items={[
              "Closed-loop tactile sensor + gripper benchmark",
              "Slip detection and fast local response",
              "Compare Arc against conventional digital baseline",
              "Measure response time, energy, adaptation, stability",
              "Generate validation dataset for partners and investors",
            ]}
          />
          <p className="mt-3 text-[14px] italic leading-[1.65] text-fg-caption">
            Phase 2 benchmark targets — not yet proven:{" "}
            <span className="not-italic">Latency (sub-ms target)</span>,{" "}
            <span className="not-italic">Energy (lower per response)</span>,{" "}
            <span className="not-italic">
              Adaptation (stable under variable conditions)
            </span>
            .
          </p>
        </Card>

        <Card tag="09 · FPGA Strategy" title="FPGA is Hinoki’s IP discovery engine.">
          <p className="mt-4 text-[16px] leading-[1.65] text-fg-secondary">
            We use FPGA to discover and validate the architecture before
            freezing it into silicon.
          </p>
          <SubLabel>IP discovery loop</SubLabel>
          <p className="mt-2 text-[15px] leading-[1.62] text-fg-secondary">
            FPGA validation → real sensor-actuator experiments → proprietary
            benchmark data → tuning know-how → patentable methods → reference
            design / ASIC / licensing
          </p>
          <SubLabel>What FPGA enables today</SubLabel>
          <BulletList
            className="space-y-2.5 text-[16px] leading-[1.62]"
            items={[
              "Iterate architecture before locking into silicon",
              "Adapt to different sensors, protocols, and control loops",
              "Build integration recipes for future licensing partners",
            ]}
          />
          <SubLabel>What FPGA unlocks downstream</SubLabel>
          <BulletList
            className="space-y-2.5 text-[16px] leading-[1.62]"
            items={[
              "Collect proprietary benchmark data from real robotic systems",
              "Identify patentable control methods and tuning strategies",
              "Clear path to ASIC, reference design, or embedded IP",
            ]}
          />
          <p className="mt-5 text-[16px] italic leading-[1.65] text-fg-primary">
            FPGA lets Hinoki learn the architecture before freezing the
            architecture.
          </p>
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-caption">
            FPGA is the validation and IP-discovery vehicle — not necessarily
            the final cost structure. ASIC, reference design, or embedded IP
            follow validation.
          </p>
        </Card>

        <Card tag="10 · Traction" title="Early validation signals.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Customer discovery, investor momentum, and technical advisory support
            are converging around the same validation path.
          </p>
          <SubLabel>Customer / Partner</SubLabel>
          <AccentCallout label="Primary signal · Tokyo-based tactile sensing partner">
            Finalizing technical LOI with CEO. Slip detection and fast gripper
            response aligned as first validation benchmark.
          </AccentCallout>
          <BulletList
            items={[
              "Assistive robotics company — researcher conversation completed; CEO meeting scheduled",
              "Cognitive robotics company — co-founder meeting being set around cognition vs physical execution",
              "Vision-based tactile sensing company — warm route identified for partnership discussion",
            ]}
          />
          <p className="mt-3 text-[14px] leading-[1.6] text-fg-secondary">
            AMR, humanoid, quadruped, assistive, marine, and service robotics
            engineers confirmed pain around latency, noisy input, variable loads,
            wheel slip, and real-time response.
          </p>
          <SubLabel>Investor / Program Momentum</SubLabel>
          <BulletList
            items={[
              "Antler Japan — Selected for Japan Residency, May 2026",
              "Coreline / Atlas — First screening passed, in-person team interview being scheduled",
              "Sony Innovation Fund — Positive response, materials shared with deep-tech team",
              "Co-Capital / Founder Institute Japan — Active continued conversation",
              "Spiral Capital — Warm relationship; open for future investment discussions",
              "The Ventures Award 2026 — First-round screening passed",
            ]}
          />
          <SubLabel>Technical Credibility</SubLabel>
          <BulletList
            items={[
              "Phase 1 FPGA reservoir validation completed on live sensor input",
              "6-week demo sprint underway for showcase at Antler Japan Residency",
              "Closed-loop tactile sensor + gripper benchmark planned",
              "Verbal go-ahead from Physical HRI and Mechatronics PhD advisors",
              "Neuromorphic Networks PhD expected from July",
              "AIST senior robotics researcher discussion pending",
            ]}
          />
          <p className="mt-4 text-[13px] italic leading-[1.55] text-fg-caption">
            Status language is intentionally precise. No investment, commercial,
            or partnership commitments are implied beyond the stated stage.
          </p>
        </Card>

        <Card
          tag="11 · Market"
          title="A measurable beachhead inside a platform-wide opportunity."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Hinoki starts in a narrow, validated wedge and expands across
            robotics platforms where sensor-actuator response is
            performance-critical.
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-accent bg-accent-subtle p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                Initial beachhead · $15B+
              </div>
              <p className="mt-2 text-[15px] font-medium text-fg-primary">
                Tactile &amp; force sensing by 2030
              </p>
              <p className="mt-1 text-[14px] leading-[1.55] text-fg-secondary">
                Robotic grippers, tactile sensors, industrial manipulation —
                the first paid validation wedge for Arc.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-base/60 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-caption">
                Serviceable market · $170B
              </div>
              <p className="mt-2 text-[15px] font-medium text-fg-primary">
                Global robotics market by 2030
              </p>
              <p className="mt-1 text-[14px] leading-[1.55] text-fg-secondary">
                Arc licenses the local response layer inside industrial and
                service robotics platforms.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-base/60 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-caption">
                Long-term opportunity · $165B
              </div>
              <p className="mt-2 text-[15px] font-medium text-fg-primary">
                Humanoid robots by 2034 (50% CAGR)
              </p>
              <p className="mt-1 text-[14px] leading-[1.55] text-fg-secondary">
                Cage-free human–robot collaboration is gated on real-time
                physical intelligence — the layer Arc operates in.
              </p>
            </div>
          </div>
          <AccentCallout label="Japan strategic frame">
            Japan faces a structural robotics opportunity at the intersection of
            an aging society, manufacturing renaissance, and humanoid
            leadership. METI targets approximately ¥10 trillion in robotics
            industry impact by 2035. Hinoki contributes a layer Japan can own at
            the architecture level — the local physical response layer every
            robotic platform needs.
          </AccentCallout>
          <SubLabel>Beachhead → expansion path</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            Tactile slip &amp; gripper response → Industrial &amp; collaborative
            → Mobile &amp; humanoids → Assistive · drones · quadrupeds
          </p>
        </Card>

        <Card
          tag="12 · Business Model"
          title="From validation to architecture licensing."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Hinoki captures value by{" "}
            <span className="font-semibold text-fg-primary">
              sitting inside robotics platforms
            </span>{" "}
            — not by building robots.
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Near term — Phase 1 · Validation &amp; co-development:
                </span>{" "}
                non-dilutive grants, paid technical validation projects, joint
                benchmark work with robotics companies.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Mid term — Phase 2 · Reference design licensing:
                </span>{" "}
                integration fees + reference design licensing, Arc control module
                / embedded control layer.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Long term — Phase 3 · Embedded IP / royalties:
                </span>{" "}
                architecture licensing, per-platform / per-unit royalties,
                embedded IP inside robotics platforms.
              </>,
            ]}
          />
          <SubLabel>Cost structure — main expense categories</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            R&amp;D engineering · hardware procurement (FPGA, sensors,
            actuators) · benchmark rig &amp; testing equipment · sensor /
            actuator integration · IP / patent costs · partner validation
            support.
          </p>
          <p className="mt-4 text-[15px] italic leading-[1.65] text-fg-primary">
            We do not build robots. We license the control architecture that
            helps them physically respond.
          </p>
        </Card>

        <Card
          tag="13 · Positioning"
          title="Where Hinoki sits in the robotics stack."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            The market is active, but the physical response layer between sensing
            and actuation remains underdeveloped.
          </p>
          <BulletList
            items={[
              "Cognition — AI / planning. Cognitive robotics, autonomy companies, VLA models.",
              "Control OS — Robot OS / motion control. PID, MPC, PLC, existing controllers.",
              "Sensing — Tactile / vision / event-based sensing. Tactile partners, vision-based touch, event-based sensors.",
              <>
                <span className="font-semibold text-fg-primary">
                  Hinoki · Arc — local reflex control
                </span>{" "}
                Sensor → Arc → bounded correction → motor controller. The
                missing layer between sensing and actuation.
              </>,
              "Hardware — Motors, grippers, actuators, robot body.",
            ]}
          />
          <p className="mt-3 text-[15px] italic leading-[1.65] text-fg-primary">
            Sensors create data. Controllers execute tasks.{" "}
            <span className="not-italic font-semibold">
              Arc focuses on the fast physical loop between sensing and action.
            </span>
          </p>
        </Card>

        <Card
          tag="14 · Team"
          title={
            <>
              A founder team built on long-standing trust
              <br />
              and complementary roles.
            </>
          }
        >
          <div className="mt-3 grid gap-3 text-[15px] leading-[1.6] text-fg-secondary">
            <div>
              <span className="font-semibold text-fg-primary">
                Salvatore Martone — Co-founder / CEO · Commercial:
              </span>{" "}
              University of Tsukuba (College of Biological Sciences).
              Co-architect of the Arc thesis — brought the biology
              framing. Built a Japan-based enterprise practice from zero,
              working with C-suite executives at major Japanese institutions.
              Drives Hinoki&apos;s commercial strategy and investor
              relations.
            </div>
            <div>
              <span className="font-semibold text-fg-primary">
                Bernardo Gatto — Co-founder / CTO · Industry &amp; Technical:
              </span>{" "}
              PhD Computer Vision Engineer. Co-architect of the Arc thesis —
              operationalized it on FPGA hardware. 10+ years of industry
              experience in robotics,
              embedded AI, and hardware integration. JSPS Research Grant
              recipient · MEXT Scholar · former AIST Tsukuba researcher. Built
              and validated Phase 1.
            </div>
            <div>
              <span className="font-semibold text-fg-primary">
                Mina Otsuka — Co-founder / COO · Japan Operations:
              </span>{" "}
              Native Japanese fluency. Former Manager, business development and
              client relations at Meiji Yasuda Life Insurance — one of
              Japan&apos;s largest financial corporations. Deep understanding of
              Japanese corporate culture. Building relationships with robotics
              engineers and research institutions across Japan.
            </div>
          </div>
          <SubLabel>Founder connection</SubLabel>
          <BulletList
            items={[
              <>
                Salvatore and Bernardo have known each other for{" "}
                <span className="font-semibold text-fg-primary">8 years</span>{" "}
                since their time at the University of Tsukuba.
              </>,
              <>
                <span className="font-semibold text-fg-primary">Mina</span> has
                known the team for{" "}
                <span className="font-semibold text-fg-primary">4 years</span>.
                Lifelong Tsukuba resident.
              </>,
              <>
                The team is built on{" "}
                <span className="font-semibold text-fg-primary">
                  long-standing trust
                </span>
                .
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Shared mission:
                </span>{" "}
                build a Tsukuba-rooted deep-tech company contributing to Japan
                and creating a place where Japanese and international
                researchers can work together.
              </>,
            ]}
          />
        </Card>

        <Card
          tag="15 · Advisory"
          title="Technical advisors de-risk execution."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Advisor support spans physical HRI, mechatronics, neuromorphic
            architecture, and Japan&apos;s robotics research ecosystem.
          </p>
          <SubLabel>Committed · Physical HRI Advisor</SubLabel>
          <BulletList
            items={[
              "Verbal agreement received · PhD, University of Tsukuba · Professor, PUCP",
              <>
                <span className="font-semibold text-fg-primary">De-risks:</span>{" "}
                Human-robot interaction, assistive robotics, and physical
                validation for human-proximate systems.
              </>,
            ]}
          />
          <SubLabel>Committed · Mechatronics Advisor</SubLabel>
          <BulletList
            items={[
              "Verbal agreement received · PhD, University of Tsukuba · Associate Professor, Nagoya University",
              <>
                <span className="font-semibold text-fg-primary">De-risks:</span>{" "}
                Sensor-actuator integration, mechatronics validation, and the
                transition from architecture concept to hardware testing.
              </>,
            ]}
          />
          <SubLabel>Neuromorphic Networks Advisor · Expected from July</SubLabel>
          <BulletList
            items={[
              "PhD, University of Tokyo",
              <>
                <span className="font-semibold text-fg-primary">De-risks:</span>{" "}
                Neuromorphic architecture, reservoir-adjacent design, and future
                IP development.
              </>,
            ]}
          />
          <SubLabel>AIST Senior Robotics Researcher · Pending discussion</SubLabel>
          <BulletList
            items={[
              "PhD, University of Tsukuba · Senior Researcher, AIST",
              <>
                <span className="font-semibold text-fg-primary">De-risks:</span>{" "}
                Applied robotics perspective, AIST ecosystem access, and future
                validation partnerships.
              </>,
            ]}
          />
          <AccentCallout label="Together">
            This network supports four validation risks: human-robot
            interaction, hardware integration, neuromorphic architecture, and
            Japan robotics ecosystem access.
          </AccentCallout>
        </Card>

        <Card
          tag="16 · 12-Month Plan"
          title="From discovery to hardware validation."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            1stRound funding converts customer discovery into technical
            validation data.
          </p>
          <SubLabel>0–3 months</SubLabel>
          <BulletList
            items={[
              "Define slip-detection benchmark requirements",
              "Source tactile sensor, gripper, FPGA, actuator setup — may include hardware from first LOI partner",
            ]}
          />
          <SubLabel>3–6 months</SubLabel>
          <BulletList
            items={[
              "Build closed-loop tactile-to-actuation validation rig",
              "Run baseline vs. conventional digital control",
              "Measure response time, adaptation, energy, stability",
            ]}
          />
          <SubLabel>6–9 months</SubLabel>
          <BulletList
            items={[
              "Share validation data with partners",
              "Refine Arc architecture from benchmark results",
              "Prepare patent / IP filing strategy",
            ]}
          />
          <SubLabel>9–12 months</SubLabel>
          <BulletList
            items={[
              "Begin partner pilot planning",
              "Apply for additional grants",
              "Prepare angel / VC round on benchmark data",
            ]}
          />
          <SubLabel>Use of funds</SubLabel>
          <BulletList
            items={[
              "FPGA refinement & embedded control testing",
              "Tactile sensor / gripper / actuator setup",
              "Closed-loop benchmark rig",
              "Validation dataset creation",
              "Engineering time & hardware integration",
              "Patent / IP consultation",
              "Customer discovery & partner development",
              "Documentation & technical write-up",
            ]}
          />
        </Card>

        <Card
          tag="17 · 5-Year Plan"
          title="Revenue and expenditure plan."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Directional plan — from validation, to paid pilots, to licensing.
          </p>
          <AccentCallout label="Revenue assumptions">
            <span className="font-semibold">Year 2</span> begins with paid
            validation and co-development projects.{" "}
            <span className="font-semibold">Years 3–5</span> shift toward
            reference design licensing, integration fees, and embedded IP
            royalties. <span className="font-semibold">Year 5 upside</span>{" "}
            depends on licensing adoption across robotics platforms, not Hinoki
            manufacturing or shipping robots. Operating revenue excludes grants
            and VC investment.
          </AccentCallout>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">Year 1 · ¥0–5M:</span>{" "}
                Validation, LOIs, benchmark dataset, grant funding support.
                Expenses: hardware, engineering, IP consultation, customer
                discovery.
              </>,
              <>
                <span className="font-semibold text-fg-primary">Year 2 · ¥15–50M:</span>{" "}
                1–3 paid validation / co-development projects.
              </>,
              <>
                <span className="font-semibold text-fg-primary">Year 3 · ¥80–200M:</span>{" "}
                3–6 paid partner projects, early reference design licensing.
              </>,
              <>
                <span className="font-semibold text-fg-primary">Year 4 · ¥300–700M:</span>{" "}
                Platform licensing, integration fees, repeat partner
                deployments.
              </>,
              <>
                <span className="font-semibold text-fg-primary">Year 5 · ¥1B+:</span>{" "}
                Embedded IP licensing, reference design adoption, per-platform /
                per-unit royalties.
              </>,
            ]}
          />
          <SubLabel>Unit logic — directional</SubLabel>
          <BulletList
            items={[
              "Paid validation / co-development — ¥5–15M per project",
              "Reference design / integration licensing — ¥10–30M per partner",
              "Platform licensing — ¥30–100M+ per partner depending on scope",
              "Embedded IP royalties — per-platform or per-unit basis",
            ]}
          />
          <p className="mt-3 text-[14px] italic leading-[1.65] text-fg-caption">
            Directional plan — not a precise financial forecast.
          </p>
        </Card>

        <Card
          tag="18 · Funding Purpose"
          title="What 1stRound funding unlocks."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Non-dilutive validation funding that converts customer discovery
            into the first partner-ready benchmark dataset.
          </p>
          <SubLabel>What funding enables</SubLabel>
          <BulletList
            items={[
              "Build the closed-loop validation rig",
              "Benchmark Arc against a digital baseline",
              "Generate partner-ready validation data",
              "Prepare IP strategy & pilot pathway",
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Hinoki is seeking non-dilutive validation funding to build the
            closed-loop tactile sensing and gripper response benchmark,
            compare Arc against a conventional digital control baseline, and
            generate the dataset required for partner LOIs, technical
            collaboration, patent strategy, and future licensing conversations.
          </p>
          <p className="mt-5 text-[15px] italic leading-[1.65] text-fg-primary">
            One measurable reflex loop becomes the foundation for a broader{" "}
            <span className="not-italic font-semibold">
              physical intelligence architecture
            </span>
            .
          </p>
          <p className="mt-4 text-[14px] leading-[1.6] text-fg-secondary">
            We named the company{" "}
            <span className="italic text-fg-primary">Hinoki</span> — after the
            Japanese cypress, whose distributed structure mirrors the
            architectural principle behind Arc.
          </p>
        </Card>

        <div className="pt-4 font-mono text-[11px] tracking-[0.06em] text-fg-caption">
          Full presenter deck is available on desktop.
        </div>
      </div>
    </main>
  );
}
