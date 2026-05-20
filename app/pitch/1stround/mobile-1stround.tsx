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
          a neuromorphic local control layer that helps robots respond
          faster, adapt locally, and act on sensor data{" "}
          <span className="font-semibold text-fg-primary">
            without replacing the existing controller
          </span>
          .
        </p>
        <ul className="mt-5 list-disc space-y-1.5 pl-5 text-[14px] leading-[1.6] text-fg-secondary">
          <li>Tsukuba-based deep-tech startup</li>
          <li>Selected for Antler Japan Residency</li>
          <li>
            First benchmark: tactile slip detection &amp; fast gripper response
          </li>
          <li>
            Applications across industrial, collaborative, mobile, humanoid
            &amp; assistive systems
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
                  Customers want specificity
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
            Slip detection is the first benchmark, not the final market. A
            concrete, measurable sensor-actuator loop: tactile sensing →
            local response → gripper correction.
          </p>
          <SubLabel>Why this benchmark</SubLabel>
          <BulletList
            items={[
              "Concrete, measurable, commercially relevant",
              "Aligned with tactile sensing companies — XELA, FingerVision",
              "Proves Arc in one loop without full robot redesign",
              "Expands into broader manipulation and physical response",
            ]}
          />
          <SubLabel>What we measure</SubLabel>
          <BulletList
            items={[
              "Response time from slip / contact to correction",
              "Gripper response speed & grasp stability",
              "Reduction in failed grasps / dropped objects",
              "Adaptation to variable weight, surface, shape, motion",
              "Energy per response · Arc vs. digital baseline",
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
            FPGA lets us discover and validate the architecture before
            freezing it into silicon.
          </p>
          <BulletList
            items={[
              "Iterate architecture before locking into silicon",
              "Adapt to different sensors, protocols, control loops",
              "Collect proprietary benchmark data from real robotic systems",
              "Identify patentable control methods and tuning strategies",
              "Build integration recipes for future licensing",
              "Later path to ASIC, reference design, or embedded IP",
            ]}
          />
          <p className="mt-3 text-[14px] italic leading-[1.65] text-fg-tertiary">
            FPGA is the validation and IP-discovery vehicle — not necessarily
            the final cost structure.
          </p>
        </Card>

        <Card tag="08 · Traction" title="Early validation signals.">
          <SubLabel>Customer / Partner</SubLabel>
          <BulletList
            items={[
              "XELA Robotics — written go-ahead to draft non-binding technical relationship / LOI",
              "Slip detection identified as first validation benchmark",
              "Forcesteed Robotics co-founder meeting lined up",
              "Cyberdyne CEO / Prof. Yoshiyuki Sankai replied; meeting path opened",
              "FingerVision CEO outreach & warm technical route",
              "Engineer discovery across AMR, humanoid, quadruped, assistive, simulation, service robotics",
            ]}
          />
          <SubLabel>Investor / Program</SubLabel>
          <BulletList
            items={[
              "Selected for Antler Japan Residency",
              "Coreline / Atlas VC — first screening passed, in-person team interview being scheduled",
              "SusHi Tech Tokyo investor follow-ups initiated",
              "Sony Ventures contact responded positively; materials shared with deep-tech team",
              "Spiral Capital acknowledged receipt",
              "Co-Capital / Founder Institute Japan conversation initiated",
            ]}
          />
          <SubLabel>Technical / Ecosystem</SubLabel>
          <BulletList
            items={[
              "Phase 1 FPGA validation completed",
              "6-week demo sprint underway",
              "Early technical advisory board forming",
              "Network across University of Tsukuba, Nagoya, U-Tokyo, AIST",
            ]}
          />
        </Card>

        <Card
          tag="09 · Market"
          title="First customer problem is slip response. Platform opportunity is physical response across robotics."
        >
          <BulletList
            items={[
              "Tactile slip detection / gripper response (first benchmark)",
              "Robotic manipulation / industrial automation",
              "Collaborative robots / mobile manipulators",
              "Humanoids · assistive devices · drones · quadrupeds",
            ]}
          />
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Every robotic system has sensor-actuator loops. Arc starts with
            one measurable loop, then expands.
          </p>
        </Card>

        <Card
          tag="10 · Business Model"
          title="From validation to architecture licensing."
        >
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Phase 1 — Validation / co-development:
                </span>{" "}
                grants, paid validation projects, joint benchmark work,
                partner integration support.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Phase 2 — Reference design licensing:
                </span>{" "}
                Arc control module / embedded control layer, reference
                design licenses, integration support.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Phase 3 — Embedded IP / royalties:
                </span>{" "}
                architecture licensing, per-platform / per-unit royalties,
                embedded IP inside robotics platforms.
              </>,
            ]}
          />
          <p className="mt-3 text-[15px] italic leading-[1.65] text-fg-primary">
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
              "Hinoki Arc — local physical response layer (sensor → Arc → bounded correction → motor controller)",
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
          title="A founder team built on long-standing trust."
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
            </div>
          </div>
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Salvatore + Bernardo: 8-year shared history since U. Tsukuba.
            Mina: 4 years with the team. Founding team built on long-standing
            trust — not assembled only for an accelerator.
          </p>
        </Card>

        <Card tag="13 · Advisory" title="Early technical advisory board.">
          <SubLabel>Verbal go-ahead</SubLabel>
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
          <SubLabel>Expected from July</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Cedric Caremel
                </span>{" "}
                — PhD Neuromorphic Networks, U. Tokyo. Neuromorphic /
                reservoir-adjacent technical support.
              </>,
            ]}
          />
          <SubLabel>Pending discussion</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Rafael Cisneros Limón
                </span>{" "}
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
              "Finalize XELA non-binding LOI",
              "Continue customer discovery",
              "Define slip-detection benchmark requirements",
              "Source tactile sensor, gripper, FPGA, actuator setup",
            ]}
          />
          <SubLabel>3–6 months</SubLabel>
          <BulletList
            items={[
              "Build closed-loop tactile-to-actuation validation rig",
              "Baseline comparison vs. conventional digital control",
              "Measure response time, adaptation, energy, stability",
            ]}
          />
          <SubLabel>6–9 months</SubLabel>
          <BulletList
            items={[
              "Share validation data with XELA and other partners",
              "Refine Arc architecture from benchmark results",
              "Prepare patent / IP filing strategy",
              "Secure additional LOIs or collaborations",
            ]}
          />
          <SubLabel>9–12 months</SubLabel>
          <BulletList
            items={[
              "Begin partner pilot planning",
              "Apply for additional grants",
              "Prepare angel / VC round using benchmark data",
              "Expand validation into adjacent sensor-actuator loops",
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
          <p className="mt-3 text-[14px] italic leading-[1.65] text-fg-tertiary">
            Directional plan — not a precise financial forecast.
          </p>
        </Card>

        <Card
          tag="16 · The Ask"
          title="What 1stRound funding unlocks."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            The first benchmark dataset that moves Hinoki from thesis to
            technical validation.
          </p>
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Hinoki is seeking non-dilutive validation funding to build the
            closed-loop tactile sensing and gripper response benchmark,
            compare Arc against a conventional digital control baseline, and
            generate the dataset required for partner LOIs, technical
            collaboration, patent strategy, and future licensing
            conversations.
          </p>
          <SubLabel>12-month outcomes</SubLabel>
          <BulletList
            items={[
              "Closed-loop Arc validation rig",
              "Slip detection / gripper response benchmark",
              "Dataset shared with XELA and relevant partners",
              "Stronger LOI / pilot pathway",
              "Initial patent strategy",
              "Better position for grants, angels, and VC",
            ]}
          />
          <p className="mt-4 text-[15px] italic leading-[1.65] text-fg-primary">
            Arc starts with one measurable reflex loop. The long-term
            opportunity is physical intelligence infrastructure for robotic
            systems.
          </p>
        </Card>

        <div className="pt-4 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary">
          Full presenter deck is available on desktop.
        </div>
      </div>
    </main>
  );
}
