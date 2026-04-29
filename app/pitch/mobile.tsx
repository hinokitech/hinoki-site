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
        <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          Hinoki Technologies · Investor Deck
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
          <BulletList
            items={[
              "Embedded in Tsukuba Science City (AIST/NIMS proximity)",
              "Early dialogue with Nagoya University robotics lab",
              "NEDO grant pathway post-Phase-2",
              "Customer discovery active with robotics engineers in Japan",
            ]}
          />
        </Card>

        <Card tag="12 · Traction" title="What’s already de-risked.">
          <BulletList
            items={[
              "Phase 1 hardware validated (FPGA + live sensor stream)",
              "Antler Japan residency (May 2026)",
              "Customer discovery confirms control-layer adaptation pain",
              "Market direction validated (TDK CEATEC 2025 award)",
              "Investor dialogue live after SusHi Tech Tokyo 2026",
            ]}
          />
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
          tag="14 · Financial Model / Ask"
          title="$400k pre-seed — validation runway."
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            12-month milestone: benchmark measurable latency + energy
            improvement vs digital baseline in a closed-loop actuator system.
          </p>
          <BulletList
            items={[
              "Founder runway",
              "FPGA refinement + benchmarking",
              "Validation platform build",
              "Latency/energy/adaptation dataset generation",
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

