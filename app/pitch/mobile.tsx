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
        <section className="rounded-xl border border-border bg-bg-subtle p-5">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            Problem
          </div>
          <h2 className="text-[24px] font-light leading-[1.2] tracking-[-0.02em]">
            Robots can think. They can&rsquo;t react.
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Today&rsquo;s robots run control loops through a layered digital
            stack. Each layer adds latency and energy cost — turning perception
            into action too slowly for human-proximate safety.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-bg-subtle p-5">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            Insight
          </div>
          <h2 className="text-[24px] font-light leading-[1.2] tracking-[-0.02em]">
            Physical intelligence lives in the body.
          </h2>
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
        </section>

        <section className="rounded-xl border border-border bg-bg-subtle p-5">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            Solution
          </div>
          <h2 className="text-[24px] font-light leading-[1.2] tracking-[-0.02em]">
            <span className="italic">Arc</span> — the architecture for physical
            intelligence.
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            A hybrid physical–digital control layer that runs as a
            continuous-time dynamical substrate — coupling sensor input to
            actuation without inference, memory access, or a digital round
            trip.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-bg-subtle p-5">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            Product
          </div>
          <h2 className="text-[24px] font-light leading-[1.2] tracking-[-0.02em]">
            Phase 1 is working.
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.6] text-fg-secondary">
            <li>Reservoir computing implemented on FPGA fabric</li>
            <li>Live video sensor stream input validated on hardware</li>
            <li>Real-time object classification + motion tracking confirmed</li>
          </ul>
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Phase 2 closes the loop: connect RC output to an actuator and
            benchmark against a digital PID baseline across latency, energy per
            cycle, and stability under noise.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-bg-subtle p-5">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            Ask
          </div>
          <h2 className="text-[26px] font-light leading-[1.2] tracking-[-0.02em]">
            $400k pre-seed — validation runway.
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            12-month milestone: benchmark measurable latency + energy
            improvement vs digital baseline in a closed-loop actuator system.
          </p>
        </section>

        <div className="pt-4 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary">
          Desktop presenter deck is available on a larger screen.
        </div>
      </div>
    </main>
  );
}

