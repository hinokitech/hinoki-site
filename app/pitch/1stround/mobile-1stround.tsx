// Mobile fallback for /pitch/1stround — keep in sync with slides-1stround.tsx
// (one pass after desktop deck changes are done; desktop is source of truth).

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

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.6] text-fg-secondary">
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
        <div className="mt-5 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary">
          1stRound application · May 2026
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-[720px] space-y-10">
        <Card
          tag="01 · Problem"
          title="Robots can sense and plan, but still fail in physical response moments."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Robots are improving rapidly in perception, planning, and AI. But
            real-world deployment still breaks down in the physical loop —
            where sensor data must become immediate, reliable action.
          </p>
          <BulletList
            items={[
              "Object slip · unstable grasps",
              "Noisy sensor input · load changes",
              "Changing surfaces · torque / velocity control",
              "Variable object handling · real-time precision",
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            For robotics companies, this creates{" "}
            <span className="font-semibold text-fg-primary">failed picks</span>
            ,{" "}
            <span className="font-semibold text-fg-primary">
              unstable handling
            </span>
            , slower deployment, ongoing retuning burden, and reduced
            reliability in real-world environments.
          </p>
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-primary">
            The bottleneck is not only intelligence. It is converting sensor
            data into reliable physical action under real-world conditions.
          </p>
        </Card>

        <Card tag="02 · Discovery" title="What engineers are telling us.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Customer discovery is narrowing Arc from a broad architecture
            thesis into a measurable first control-loop benchmark.
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Latency matters
                </span>{" "}
                in specific physical moments — engineers confirmed it can be a
                bottleneck under tight real-time constraints.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Physical variability creates instability
                </span>{" "}
                — surfaces, loads, slip, noise.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Engineers want specificity
                </span>{" "}
                — latency of what, which loop, which robot, against which
                baseline.
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] italic leading-[1.65] text-fg-primary">
            This pushed Hinoki toward a specific first validation benchmark:
            tactile slip detection and fast gripper response.
          </p>
        </Card>

        <Card
          tag="03 · First Benchmark"
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
          <div className="mt-4 rounded-lg border border-accent bg-accent-subtle p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Discovery validation · XELA Robotics
            </div>
            <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
              In discussion with{" "}
              <span className="font-semibold">XELA Robotics</span>, tactile
              sensing and gripper response were identified as a strong initial
              validation direction.{" "}
              <span className="font-semibold">
                Finalizing the technical LOI with XELA.
              </span>
            </p>
          </div>
          <SubLabel>Why this benchmark</SubLabel>
          <BulletList
            items={[
              "Concrete, measurable, commercially relevant",
              "Aligned with tactile sensing companies — XELA, FingerVision",
              "Proves Arc in one loop without full robot redesign",
              "Expands into broader manipulation and physical response",
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
          tag="04 · Architecture"
          title="Arc — a local reflex layer for robotic systems."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            The robot keeps its existing controller. Arc adds a faster local
            response loop between selected sensors and actuators.
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
            Arc focuses on selected sensor-actuator loops where{" "}
            <span className="font-semibold text-fg-primary">
              fast local response, adaptation, or lower compute burden
            </span>{" "}
            matter.
          </p>
        </Card>

        <Card
          tag="05 · Customer Benefits"
          title="What customers gain if Arc works."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Arc turns sensor data into faster physical response —{" "}
            <span className="font-semibold text-fg-primary">
              without requiring a full robot redesign.
            </span>
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Faster physical response
                </span>{" "}
                — react to slip, contact, force change, instability.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Better adaptation
                </span>{" "}
                — adjust locally to weight, surface, shape, noise.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Higher reliability
                </span>{" "}
                — fewer failed grasps, dropped objects, manual retuning.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Lower compute burden
                </span>{" "}
                — handle reflex-level response locally, not via CPU/GPU/cloud.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Easier integration
                </span>{" "}
                — add Arc to one loop while the existing controller stays in
                charge.
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            For customers, this means{" "}
            <span className="font-semibold text-fg-primary">
              fewer failed operations
            </span>
            , less integration friction, and{" "}
            <span className="font-semibold text-fg-primary">
              more reliable deployment
            </span>{" "}
            in variable physical environments.
          </p>
          <p className="mt-4 text-[15px] italic leading-[1.65] text-fg-primary">
            Arc helps robotics companies convert sensor data into faster, more
            adaptive physical response —{" "}
            <span className="not-italic font-semibold">
              without replacing their existing controller.
            </span>
          </p>
        </Card>

        <Card
          tag="06 · Status"
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
          <p className="mt-3 text-[14px] italic leading-[1.65] text-fg-tertiary">
            Phase 2 benchmark targets — not yet proven:{" "}
            <span className="not-italic">Latency (sub-ms target)</span>,{" "}
            <span className="not-italic">Energy (lower per response)</span>,{" "}
            <span className="not-italic">
              Adaptation (stable under variable conditions)
            </span>
            .
          </p>
        </Card>

        <Card tag="07 · FPGA Strategy" title="FPGA is Hinoki’s IP discovery engine.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            We use FPGA to discover and validate the architecture before
            freezing it into silicon.
          </p>
          <SubLabel>IP discovery loop</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            FPGA validation → real sensor-actuator experiments → proprietary
            benchmark data → tuning know-how → patentable methods → reference
            design / ASIC / licensing
          </p>
          <SubLabel>What FPGA enables today</SubLabel>
          <BulletList
            items={[
              "Iterate architecture before locking into silicon",
              "Adapt to different sensors, protocols, and control loops",
              "Build integration recipes for future licensing partners",
            ]}
          />
          <SubLabel>What FPGA unlocks downstream</SubLabel>
          <BulletList
            items={[
              "Collect proprietary benchmark data from real robotic systems",
              "Identify patentable control methods and tuning strategies",
              "Clear path to ASIC, reference design, or embedded IP",
            ]}
          />
          <p className="mt-4 text-[15px] italic leading-[1.65] text-fg-primary">
            FPGA lets Hinoki learn the architecture before freezing the
            architecture.
          </p>
          <p className="mt-3 text-[14px] leading-[1.65] text-fg-tertiary">
            FPGA is the validation and IP-discovery vehicle — not necessarily
            the final cost structure. ASIC, reference design, or embedded IP
            follow validation.
          </p>
        </Card>

        <Card tag="08 · Traction" title="Early validation signals.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Customer discovery, investor momentum, and technical advisory
            support are converging around the same validation path.
          </p>
          <p className="mt-3 text-[14px] font-medium leading-[1.5] text-fg-primary">
            Customer / Partner — discovery is narrowing on slip detection.
          </p>
          <SubLabel>Completed</SubLabel>
          <BulletList
            items={[
              "Finalizing technical LOI with CEO",
              "Slip detection & fast gripper response aligned as first validation benchmark",
            ]}
          />
          <SubLabel>Scheduled / active</SubLabel>
          <BulletList
            items={[
              "Forcesteed Robotics — co-founder meeting lined up",
              "Cyberdyne — Prof. Sankai replied, meeting path opened",
              "FingerVision — CEO outreach & warm technical route",
            ]}
          />
          <SubLabel>Ongoing discovery</SubLabel>
          <BulletList
            items={[
              "Engineer interviews across AMR, humanoid, quadruped, assistive, simulation, service robotics",
            ]}
          />
          <SubLabel>Investor / Program</SubLabel>
          <BulletList
            items={[
              "Selected for Antler Japan Residency",
              "Coreline / Atlas VC — first screening passed, team interview being scheduled",
              "Sony Innovation Fund — positive response, materials shared with deep-tech team",
              "Co-Capital / Founder Institute Japan — active continued conversation",
              "Spiral Capital — warm relationship; open for future investment discussions",
              "The Ventures Award 2026 — first-round screening passed",
            ]}
          />
          <SubLabel>Technical / Ecosystem</SubLabel>
          <BulletList
            items={[
              "Phase 1 FPGA validation completed",
              "6-week demo sprint underway for showcase at Antler Japan Residency",
              "Early technical advisory board forming",
              "Network across University of Tsukuba, Nagoya, U-Tokyo, AIST",
            ]}
          />
          <p className="mt-4 text-[13px] italic leading-[1.55] text-fg-tertiary">
            Status language is intentionally precise — no commitments are
            implied.
          </p>
        </Card>

        <Card
          tag="09 · Market"
          title={
            <>
              The first customer problem is slip response.
              <br />
              The platform opportunity is physical response across robotics.
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Every robotic system has sensor-actuator loops. Arc starts with one
            narrow, measurable beachhead, then expands across robotics platforms
            where sensor-actuator response is performance-critical.
          </p>
          <SubLabel>Beachhead → expansion path</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Initial beachhead
                </span>{" "}
                — tactile sensing &amp; gripper response. Robotic grippers,
                tactile sensors, industrial manipulation (first benchmark).
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Industrial &amp; collaborative robotics
                </span>{" "}
                — pick-and-place, force-controlled assembly, adaptive
                grasping, collaborative manipulation.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Collaborative robots
                </span>{" "}
                / mobile manipulators.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Humanoids · assistive devices · drones · quadrupeds.
                </span>
              </>,
            ]}
          />
          <div className="mt-4 rounded-lg border border-accent bg-accent-subtle p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Market sizing approach
            </div>
            <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
              Hinoki starts in a{" "}
              <span className="font-semibold">narrow validation wedge</span> —
              tactile / gripper control — then expands across robotics
              platforms where sensor-actuator response is performance-critical.
              The addressable opportunity scales with the number of platforms
              that adopt a local physical-response layer.
            </p>
          </div>
          <SubLabel>Initial · expansion · business-model markets</SubLabel>
          <BulletList
            items={[
              "Initial: tactile sensing, robotic gripping, industrial manipulation.",
              "Expansion: industrial, collaborative, mobile robotics, humanoids, assistive devices.",
              "Business model: architecture licensing embedded inside robotics platforms.",
            ]}
          />
        </Card>

        <Card
          tag="10 · Business Model"
          title="From validation to architecture licensing."
        >
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Near term — Phase 1 · Validation / co-development:
                </span>{" "}
                non-dilutive grants, paid validation projects, joint benchmark
                work.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Mid term — Phase 2 · Reference design licensing:
                </span>{" "}
                integration fees + reference design licensing, Arc control
                module / embedded control layer.
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
          tag="11 · Positioning"
          title="Where Hinoki sits in the robotics stack."
        >
          <BulletList
            items={[
              "AI / cognition / planning — Forcesteed, autonomy companies, VLA models",
              "Robot OS / motion control — PID, MPC, PLC, existing controllers",
              "Sensing — XELA, FingerVision, event-based sensors",
              <>
                <span className="font-semibold text-fg-primary">
                  Hinoki · Arc — local reflex control
                </span>{" "}
                (sensor → Arc → bounded correction → motor controller). The
                missing layer between sensing and actuation.
              </>,
              "Motors, grippers, actuators, robot body",
            ]}
          />
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Sensors create data. Controllers execute tasks. Arc focuses on
            the fast physical loop between sensing and action.
          </p>
        </Card>

        <Card
          tag="12 · Team"
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
                Salvatore Martone — Co-founder / CEO:
              </span>{" "}
              team building, strategy, fundraising, customer discovery,
              investor + robotics relationships. Biology background, U.
              Tsukuba — brought the biological framing.
            </div>
            <div>
              <span className="font-semibold text-fg-primary">
                Bernardo Gatto — Co-founder / CTO:
              </span>{" "}
              PhD engineer. Robotics, computer vision, embedded AI, hardware
              integration. AIST · MEXT / JSPS. FPGA + reservoir computing
              implementation. Built and validated Phase 1.
            </div>
            <div>
              <span className="font-semibold text-fg-primary">
                Mina Otsuka — Co-founder / Japan Market &amp; Ecosystem:
              </span>{" "}
              Japan market strategy, ecosystem development, customer
              discovery, corporate + research institution relationships.
              Lifelong Tsukuba resident.
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

        <Card tag="13 · Advisory" title="Early technical advisory board.">
          <SubLabel>Current advisor commitments — verbal agreement received</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Denis Peña
                </span>{" "}
                — PhD Physical HRI, U. Tsukuba · Professor, PUCP. HRI,
                assistive, validation context.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Takayuki Miyamoto
                </span>{" "}
                — PhD Mechatronics, U. Tsukuba · Assoc. Prof., Nagoya
                University. Mechatronics, human informatics, academic
                validation path.
              </>,
            ]}
          />
          <SubLabel>Upcoming &amp; pending advisor discussions</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Cedric Caremel
                </span>{" "}
                <span className="text-fg-tertiary">· expected from July</span>{" "}
                — PhD Neuromorphic Networks, U. Tokyo. Neuromorphic /
                reservoir-adjacent technical support.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Rafael Cisneros Limón
                </span>{" "}
                <span className="text-fg-tertiary">· pending discussion</span>{" "}
                — PhD Intelligent Interaction / Robotics, U. Tsukuba · Senior
                Researcher, AIST. AIST robotics ecosystem, robotics research
                credibility.
              </>,
            ]}
          />
        </Card>

        <Card
          tag="14 · 12-Month Plan"
          title="From discovery to hardware validation."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            1stRound funding converts customer discovery into technical
            validation data.
          </p>
          <SubLabel>0–3 months</SubLabel>
          <BulletList
            items={[
              "Finalize XELA LOI / technical relationship",
              "Define slip-detection benchmark requirements",
              "Source tactile sensor, gripper, FPGA, actuator setup",
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
              "Share validation data with XELA & partners",
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
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            FPGA refinement &amp; embedded control testing · tactile sensor /
            gripper / actuator setup · closed-loop benchmark rig · validation
            dataset · engineering &amp; hardware integration · patent / IP
            consultation · customer discovery &amp; partner development.
          </p>
        </Card>

        <Card
          tag="15 · 5-Year Plan"
          title="Revenue and expenditure plan."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Directional plan — from validation, to paid pilots, to licensing.
          </p>
          <div className="mt-4 rounded-lg border border-accent bg-accent-subtle p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Revenue assumptions
            </div>
            <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
              <span className="font-semibold">Year 2</span> begins with paid
              validation / co-development projects.{" "}
              <span className="font-semibold">Years 3–5</span> shift toward
              reference design licensing, integration fees, and embedded IP
              royalties.{" "}
              <span className="font-semibold">Year 5 ¥500M+</span> depends on
              licensing adoption across robotics platforms — not on Hinoki
              shipping product.
            </p>
          </div>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Year 1 · ¥0–5M:
                </span>{" "}
                validation, grants, LOIs, benchmark dataset. Expenses:
                hardware, engineering, IP, customer discovery.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Year 2 · ¥10–30M:
                </span>{" "}
                1–3 paid validation / co-development projects.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Year 3 · ¥50–100M:
                </span>{" "}
                early reference design licensing, 3–6 partner projects.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Year 4 · ¥150–300M:
                </span>{" "}
                platform licensing / repeat partner integrations.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Year 5 · ¥500M+:
                </span>{" "}
                embedded IP / royalty model, reference design adoption.
              </>,
            ]}
          />
          <SubLabel>Unit logic — directional</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Paid validation projects:
                </span>{" "}
                ¥5–15M per project.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Reference design / integration licensing:
                </span>{" "}
                ¥10–30M per partner.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Embedded IP royalties:
                </span>{" "}
                per-platform or per-unit basis.
              </>,
            ]}
          />
          <p className="mt-3 text-[14px] italic leading-[1.65] text-fg-tertiary">
            Directional plan — not a precise financial forecast.
          </p>
        </Card>

        <Card
          tag="16 · Funding Purpose"
          title="What 1stRound funding unlocks."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Non-dilutive validation funding that converts customer discovery
            into the first partner-ready benchmark dataset.
          </p>
          <SubLabel>What 1stRound funding unlocks</SubLabel>
          <BulletList
            items={[
              "Build the closed-loop validation rig",
              "Benchmark Arc against a digital baseline",
              "Generate partner-ready validation data",
              "Advance XELA LOI / technical relationship",
              "Prepare IP strategy & pilot pathway",
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Hinoki is seeking non-dilutive validation funding to build the
            closed-loop tactile sensing and gripper response benchmark,
            compare Arc against a conventional digital control baseline, and
            generate the dataset required for partner LOIs, technical
            collaboration, patent strategy, and future licensing
            conversations.
          </p>
          <p className="mt-5 text-[15px] italic leading-[1.65] text-fg-primary">
            One measurable reflex loop becomes the foundation for a broader{" "}
            <span className="not-italic font-semibold">
              physical intelligence architecture
            </span>
            .
          </p>
        </Card>

        <div className="pt-4 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary">
          Full presenter deck is available on desktop.
        </div>
      </div>
    </main>
  );
}
