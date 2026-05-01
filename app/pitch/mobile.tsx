import Link from "next/link";

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

function SmallGrid({
  items,
}: {
  items: Array<{ k: string; v: string }>;
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-2 text-[15px] leading-[1.6] text-fg-secondary">
      {items.map((it) => (
        <div key={it.k} className="flex gap-3">
          <div className="w-[112px] shrink-0 font-semibold text-fg-primary">
            {it.k}
          </div>
          <div>{it.v}</div>
        </div>
      ))}
    </div>
  );
}

export default function MobileDeck() {
  return (
    <main className="min-h-dvh bg-bg-base px-5 pb-20 pt-10 text-fg-primary">
      <header className="mx-auto max-w-[720px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Hinoki Technologies · Investor Deck
          </div>
          <Link
            href="/pitch-jp"
            className="rounded-md border border-border bg-bg-subtle px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-secondary transition-colors hover:border-accent hover:text-accent"
          >
            日本語
          </Link>
        </div>
        <h1 className="text-[38px] font-light leading-[1.1] tracking-[-0.03em] md:text-[52px]">
          The physical intelligence robots have been missing.
        </h1>
        <p className="mt-5 text-[16px] leading-[1.65] text-fg-secondary">
          When your hand touches something hot, you pull back before you think.
          That&rsquo;s physical intelligence — and every robot ever built is
          missing it.{" "}
          <span className="font-semibold text-fg-primary">
            <span className="italic">Arc</span> is the architecture that builds
            it in.
          </span>
        </p>
        <div className="mt-5 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary">
          Pre-Seed · April 2026
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-[720px] space-y-10">
        <Card tag="01 · Problem" title="Robots can think. They can’t react.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Today&rsquo;s robots run control loops through a layered digital
            stack. Each layer adds latency and energy cost — turning perception
            into action too slowly for human-proximate safety.
          </p>
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Cage-free deployment isn&rsquo;t blocked by better models. It&rsquo;s
            blocked by the architecture between sensing and actuation.
          </p>
        </Card>

        <Card tag="02 · Insight" title="Physical intelligence lives in the body.">
          <ul className="mt-4 space-y-3 text-[15px] leading-[1.6] text-fg-secondary">
            <li>
              <span className="font-semibold text-fg-primary">Response:</span>{" "}
              touch something hot — your hand pulls back before you think.
            </li>
            <li>
              <span className="font-semibold text-fg-primary">Adaptation:</span>{" "}
              an animal adjusts gait instantly on a new surface.
            </li>
            <li>
              <span className="font-semibold text-fg-primary">Resilience:</span>{" "}
              a three-legged dog keeps running — redistribution without a
              command.
            </li>
          </ul>
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Three behaviors of one substrate — continuous-time, distributed,
            physical.
          </p>
        </Card>

        <Card
          tag="03 · Solution"
          title={
            <>
              <span className="italic">Arc</span> — the architecture for physical
              intelligence.
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            A hybrid physical–digital control layer that runs as a
            continuous-time dynamical substrate — coupling sensor input to
            actuation without inference, memory access, or a digital round
            trip.
          </p>
          <SmallGrid
            items={[
              { k: "Today", v: "ADC → MCU/GPU → memory → inference → actuator" },
              { k: "Arc", v: "sensor → continuous dynamics → light digital → actuator" },
            ]}
          />
        </Card>

        <Card tag="04 · Behaviors" title="Three behaviors. One architecture.">
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">Response:</span>{" "}
                sub-millisecond reaction to slip, contact, force change
              </>,
              <>
                <span className="font-semibold text-fg-primary">Adaptation:</span>{" "}
                in-loop adjustment to new objects, surfaces, and loads
              </>,
              <>
                <span className="font-semibold text-fg-primary">Resilience:</span>{" "}
                graceful redistribution under noise or partial failure
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Reflex is the wedge. Adaptation and resilience extend on the same
            substrate.
          </p>
        </Card>

        <Card tag="05 · Product" title="Phase 1 is working.">
          <BulletList
            items={[
              "Reservoir computing implemented on FPGA fabric",
              "Live sensor stream validated on hardware (not simulation)",
              "Real-time object classification + motion tracking confirmed",
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Phase 2 closes the loop: connect RC output to an actuator and
            benchmark against a digital PID baseline across latency, energy per
            cycle, and stability under noise.
          </p>
        </Card>

        <Card tag="06 · Technology" title="Why FPGA. Why now.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Reservoir computing is a chaotic dynamical substrate. To find the
            right architecture, you have to iterate the substrate itself — not
            just software on top.
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">Silicon-first:</span>{" "}
                topology frozen at tape-out
              </>,
              <>
                <span className="font-semibold text-fg-primary">FPGA-first:</span>{" "}
                topology iterable weekly → then ASIC/IP
              </>,
            ]}
          />
        </Card>

        <Card tag="07 · Market Size" title="A control layer inside every robot.">
          <BulletList
            items={[
              "$300B+ industrial automation",
              "$100B+ robotics platforms",
              "$165B humanoids by 2034 (50% CAGR projected)",
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Every robotic platform needs a control module. We license the
            architecture layer that gives them physical intelligence.
          </p>
        </Card>

        <Card tag="08 · Target Applications" title="Every platform that moves.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            <span className="italic">Arc</span> is a general-purpose control
            layer. Phase 2 lands in industrial first; humanoid, defense, and
            assistive systems extend on the same substrate.
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Humanoid:
                </span>{" "}
                operate near humans without a cage
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Industrial:
                </span>{" "}
                adapt to a new SKU without retooling the line
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Defense/autonomous:
                </span>{" "}
                keep moving under partial failure
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Wearable/assistive:
                </span>{" "}
                adapt to the body that&rsquo;s wearing it
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] italic leading-[1.65] text-fg-secondary">
            Wherever a body must respond, adapt, and stay standing — Arc becomes
            the architecture layer.
          </p>
        </Card>

        <Card tag="09 · Competitors" title="Where we sit in the landscape.">
          <BulletList
            items={[
              "Digital adaptive control (PID/MPC): deterministic, slow adaptation",
              "TinyML/embedded ML: discrete inference, latency-bound",
              "Neuromorphic: strong in perception, less mature in actuation loops",
              "TDK analog RC: silicon-first, topology locked",
              "Hinoki Arc: physical intelligence control",
            ]}
          />
        </Card>

        <Card tag="10 · Business Model" title="ARM for robotics.">
          <BulletList
            items={[
              "Phase 1: co-development revenue + proprietary validation data",
              "Phase 2: platform licensing (annual)",
              "Phase 3: per-unit royalties (ARM model applied to control)",
            ]}
          />
        </Card>

        <Card tag="11 · Go-to-Market" title="Japan first. By design.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Japan is the world&rsquo;s most concentrated robotics ecosystem.
            We&rsquo;re based in{" "}
            <span className="font-semibold text-fg-primary">
              Tsukuba Science City
            </span>
            , next to AIST and NIMS, and already inside the relationships
            that matter.
          </p>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            Customer development
          </div>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Customer discovery — active:
                </span>{" "}
                control-layer adaptation pain confirmed across multiple
                robotics engineers
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Cyberdyne researcher:
                </span>{" "}
                early conversation on assistive exoskeleton applications
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Nagoya University Robotics Lab:
                </span>{" "}
                early dialogue on assistive exoskeleton collaboration
              </>,
            ]}
          />
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            Capital pathway
          </div>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Antler Japan 2026 Residency:
                </span>{" "}
                May 2026 cohort begins
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  SusHi Tech Tokyo 2026:
                </span>{" "}
                investor relationships initiated across deep-tech VCs,
                corporate venture arms, and government innovation programs
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  NEDO grant pathway:
                </span>{" "}
                targeted post-Phase-2 for non-dilutive runway extension
              </>,
            ]}
          />
        </Card>

        <Card tag="12 · Traction" title="What’s already de-risked.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Two independent signals — one internal, one external — pointing
            at the same architectural direction.
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Internal proof — Phase 1 hardware validated:
                </span>{" "}
                FPGA + live sensor stream with classification and motion
                tracking. Hardware, not simulation.
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  External validation — TDK CEATEC 2025 award:
                </span>{" "}
                independent confirmation of the technology direction. We took
                the complementary architectural bet: FPGA-first, iterable,
                then licensable IP.
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] italic leading-[1.65] text-fg-secondary">
            Phase 2 closes the loop between them.
          </p>
        </Card>

        <Card tag="13 · Team" title="Biology meets hardware AI.">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            We think modern compute is architecturally wrong for embodied
            systems. Nature doesn&rsquo;t run on von Neumann. We apply biological
            architecture to the segment where digital systems fail hardest:
            real-time, embodied, physical control.
          </p>
          <div className="mt-4 grid gap-3 text-[15px] leading-[1.6] text-fg-secondary">
            <div>
              <span className="font-semibold text-fg-primary">Salvatore:</span>{" "}
              biology (Tsukuba), co-architect of thesis, commercial strategy &amp;
              Japan investor relations
            </div>
            <div>
              <span className="font-semibold text-fg-primary">Bernardo:</span>{" "}
              PhD CV, JSPS/MEXT, ex-AIST, co-architect, built Phase 1 on FPGA
            </div>
            <div>
              <span className="font-semibold text-fg-primary">Mina:</span> Japan
              market &amp; ecosystem, native fluency, relationship building with
              robotics engineers
            </div>
          </div>
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Hinoki is named after the Japanese cypress — a metaphor for
            distributed biological intelligence.
          </p>
        </Card>

        <Card
          tag="14 · Financial Model"
          title="Three phases. One royalty thesis."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            ARM Holdings commands 1–2% royalty on $20–$200 chip prices. Hinoki
            targets the equivalent on $20K–$150K robotic platforms and
            $30K–$100K assistive devices — upfront licensing fees plus
            per-unit royalties scaling with adoption across humanoid,
            industrial, defense, and wearable/assistive markets.
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Phase 1 · Years 1–2 post-validation:
                </span>{" "}
                3–5 paid co-development engagements →{" "}
                <span className="font-semibold text-fg-primary">
                  $1.5M–$5M cumulative
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Phase 2 · Years 2–5:
                </span>{" "}
                reference design licensing across 12–25 platform manufacturers
                at $250K–$1M annual fees →{" "}
                <span className="font-semibold text-fg-primary">
                  $7M–$25M ARR
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Phase 3 · Years 5+:
                </span>{" "}
                per-unit royalties of $5–$50 per platform shipped →{" "}
                <span className="font-semibold text-fg-primary">
                  $30M–$250M ARR
                </span>
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            <span className="font-semibold text-fg-primary">
              Adoption anchors.
            </span>{" "}
            10M+ humanoid units projected annually by 2030. Industrial
            robotics ships 600K+ units annually today. Exoskeleton and
            prosthetic markets projected to surpass $30B by 2032. Royalty-
            based IP licensing carries 90%+ gross margins.
          </p>
          <p className="mt-3 text-[14px] italic leading-[1.6] text-fg-tertiary">
            Assistive market adoption lags robotics by 18–24 months on
            clinical validation cycles. Phase 3 wearable contribution is
            modeled with that delay.
          </p>
        </Card>

        <Card
          tag="15 · The Ask"
          title="$400k pre-seed — validation runway."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            <span className="font-semibold text-fg-primary">
              12-month milestone:
            </span>{" "}
            benchmark measurable improvement in latency, energy, and adaptive
            stability vs the digital baseline — closed-loop, on hardware. The
            first hardware benchmark of physical intelligence as a control
            layer.
          </p>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            Funding structure
          </div>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  up to $100K
                </span>
                <br />
                <span className="font-semibold text-fg-primary">
                  Vendor credits during residency
                </span>
                <br />
                Preferential credits and rates with AWS, Google Cloud, IBM and
                other Antler partners — accessible throughout the program,
                non-dilutive.
              </>,
              <>
                <span className="font-semibold text-fg-primary">$150K</span> ·
                Antler post-IC: $100K J-KISS/SAFE at $1M cap (~10% post-ESOP) +
                $50K uncapped MFN SAFE — if Investment Committee approves after
                the program
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  up to $250K
                </span>{" "}
                · Antler ARC matching, unlocks on $200K third-party investment
              </>,
              <>Open to additional pre-seed investors</>,
            ]}
          />
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            Use of funds
          </div>
          <p className="mt-2 text-[15px] leading-[1.6] text-fg-secondary">
            Founder runway; hardware integration and
            embedded systems expertise; FPGA refinement and benchmarking
            platform; force sensor and actuator validation rig; dataset
            generation; provisional patent filing; NEDO/JST grant application
            support.
          </p>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            12-month outcomes — unlocks Phase 1 revenue
          </div>
          <BulletList
            items={[
              "Validated benchmark dataset for licensing conversations",
              "First co-development LOI with a Japanese robotics manufacturer",
              "Provisional patent filed",
              "NEDO grant application submitted",
            ]}
          />
        </Card>

        <div className="pt-4 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary">
          Full presenter deck is available on desktop.
        </div>
      </div>
    </main>
  );
}

