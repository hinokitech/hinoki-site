"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeroAnimation } from "./hero-animation";
import { RequestAccessModal } from "./request-access-modal";

function useInViewOnce<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25, ...(options ?? {}) },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options, visible]);

  return { ref, visible };
}

export default function Home() {
  const [requestOpen, setRequestOpen] = useState(false);
  const openRequest = useCallback(() => setRequestOpen(true), []);
  const closeRequest = useCallback(() => setRequestOpen(false), []);

  return (
    <div className="flex min-h-full flex-col bg-bg-base text-fg-primary">
      <Nav onRequestAccess={openRequest} />
      <Hero onRequestAccess={openRequest} />
      <MetricBar />
      <FeatureSection />
      <ApplicationsSection />
      <CTASection onRequestAccess={openRequest} />
      <Footer onRequestAccess={openRequest} />
      <RequestAccessModal open={requestOpen} onClose={closeRequest} />
    </div>
  );
}

function Nav({ onRequestAccess }: { onRequestAccess: () => void }) {
  const links = [
    { label: "Architecture", href: "#architecture" },
    { label: "Applications", href: "#applications" },
  ];

  return (
    <nav className="sticky top-0 z-[100] h-[60px] border-b border-border bg-bg-base">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-5 md:px-12">
        <a href="#" className="flex items-center gap-[10px]">
          <img
            src="/assets/logo-mark-light.png"
            alt="Hinoki mark"
            width={34}
            height={34}
            className="block h-[34px] w-[34px] object-contain"
          />
          <span className="text-[16px] font-semibold tracking-[-0.01em] text-fg-primary">
            Hinoki
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] font-normal text-fg-secondary transition-colors duration-200 hover:text-fg-primary"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onRequestAccess();
          }}
          className="inline-flex items-center rounded-md bg-accent px-[18px] py-2 text-[12px] font-medium tracking-[0.01em] text-fg-inverse transition-colors duration-200 hover:bg-accent-hover"
        >
          Request Access
        </a>
      </div>
    </nav>
  );
}

function Hero({ onRequestAccess }: { onRequestAccess: () => void }) {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setHeroVisible(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className="relative min-h-[520px] overflow-hidden overflow-x-hidden bg-bg-base px-5 pb-20 pt-4 md:px-12 md:pt-24">
      <div className="relative z-[1] mx-auto max-w-[1200px]">
        {/* Mobile: full-width motif at top (above text) */}
        <div
          aria-hidden="true"
          className="pointer-events-none -mb-10 flex h-[200px] w-full items-center justify-center overflow-hidden opacity-40 md:hidden"
        >
          <NeuralMotif className="h-auto w-full max-w-[560px]" />
        </div>

        <div className="max-w-[640px]">
          <div
            className={`reveal mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent ${heroVisible ? "is-visible" : ""}`}
            style={{ ["--reveal-delay" as any]: "0ms" }}
          >
            ARC BY HINOKI
          </div>
          <h1
            className={`reveal mb-6 text-[36px] font-light leading-[1.1] tracking-[-0.025em] text-fg-primary md:text-[52px] ${heroVisible ? "is-visible" : ""}`}
            style={{ ["--reveal-delay" as any]: "216ms" }}
          >
            The reflex layer
            <br />
            robots have been missing.
          </h1>
          <p
            className={`reveal mb-9 max-w-[520px] text-[16px] font-normal leading-[1.7] text-fg-secondary md:text-[17px] ${heroVisible ? "is-visible" : ""}`}
            style={{ ["--reveal-delay" as any]: "432ms" }}
          >
            Hinoki couples sensor input directly to actuation — continuously, at
            hardware speed — eliminating the discrete inference steps that make
            current robots brittle.
          </p>

          <div
            className={`reveal mb-8 flex flex-wrap gap-3 ${heroVisible ? "is-visible" : ""}`}
            style={{ ["--reveal-delay" as any]: "648ms" }}
          >
            <a
              href="#architecture"
              className="inline-flex items-center rounded-md bg-accent px-6 py-3 text-[13px] font-medium text-fg-inverse transition-colors duration-200 hover:bg-accent-hover"
            >
              Explore the Architecture
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onRequestAccess();
              }}
              className="inline-flex items-center rounded-md border border-border bg-transparent px-[23px] py-[11px] text-[13px] font-normal text-fg-primary transition-colors duration-200 hover:bg-bg-subtle"
            >
              Request Access
            </a>
          </div>

          <div
            className={`reveal flex flex-wrap items-center gap-[10px] text-[12px] text-fg-tertiary ${heroVisible ? "is-visible" : ""}`}
            style={{ ["--reveal-delay" as any]: "864ms" }}
          >
            <span>Tsukuba, Japan</span>
            <span className="text-border">·</span>
            <span>Antler Japan 2026</span>
            <span className="text-border">·</span>
            <span>Hardware validation underway</span>
          </div>
        </div>

        {/* Desktop: keep existing inline motif placement */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-10 hidden justify-center opacity-55 md:absolute md:right-0 md:top-1/2 md:mt-0 md:flex md:-translate-y-1/2"
        >
          <NeuralMotif className="h-auto w-[min(420px,90vw)] max-w-[420px] md:w-[min(560px,70vw)] md:max-w-[560px]" />
        </div>
      </div>
    </section>
  );
}

function NeuralMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <style>{`
        .hn-node {
          transform-box: fill-box;
          transform-origin: center;
          animation: hn-breathe 2s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes hn-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .hn-signal {
          filter: drop-shadow(0 0 6px rgba(232, 98, 42, 0.55));
        }
      `}</style>

      <path
        id="hnp1"
        d="M60 200 C120 140, 200 260, 300 180 S460 120, 520 160"
        stroke="#E8622A"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        id="hnp2"
        d="M40 240 C110 170, 220 300, 330 210 S490 150, 540 200"
        stroke="#C42B2B"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        id="hnp3"
        d="M80 160 C150 100, 260 240, 360 150 S500 90, 550 120"
        stroke="#E8622A"
        strokeWidth="0.8"
        opacity="0.2"
      />
      <path
        id="hnp4"
        d="M30 280 C100 200, 210 340, 310 240"
        stroke="#E8622A"
        strokeWidth="0.8"
        opacity="0.15"
      />

      <circle cx="60" cy="200" r="28" fill="#E8622A" opacity="0.08" />
      <circle cx="60" cy="200" r="16" fill="#E8622A" opacity="0.12" />
      <circle
        className="hn-node"
        style={{ animationDelay: "0ms" }}
        cx="60"
        cy="200"
        r="7"
        fill="#E8622A"
        opacity="0.9"
      />

      <circle cx="190" cy="155" r="20" fill="#C42B2B" opacity="0.08" />
      <circle cx="190" cy="155" r="10" fill="#C42B2B" opacity="0.12" />
      <circle
        className="hn-node"
        style={{ animationDelay: "-430ms" }}
        cx="190"
        cy="155"
        r="5"
        fill="#C42B2B"
        opacity="0.85"
      />

      <circle cx="300" cy="185" r="22" fill="#E8622A" opacity="0.08" />
      <circle cx="300" cy="185" r="12" fill="#E8622A" opacity="0.12" />
      <circle
        className="hn-node"
        style={{ animationDelay: "-860ms" }}
        cx="300"
        cy="185"
        r="6"
        fill="#E8622A"
        opacity="0.85"
      />

      <circle cx="420" cy="140" r="18" fill="#C42B2B" opacity="0.07" />
      <circle cx="420" cy="140" r="9" fill="#C42B2B" opacity="0.1" />
      <circle
        className="hn-node"
        style={{ animationDelay: "-1210ms" }}
        cx="420"
        cy="140"
        r="4.5"
        fill="#C42B2B"
        opacity="0.8"
      />

      <circle cx="130" cy="260" r="14" fill="#E8622A" opacity="0.07" />
      <circle
        className="hn-node"
        style={{ animationDelay: "-1570ms" }}
        cx="130"
        cy="260"
        r="4"
        fill="#E8622A"
        opacity="0.7"
      />

      <circle cx="500" cy="175" r="12" fill="#E8622A" opacity="0.07" />
      <circle
        className="hn-node"
        style={{ animationDelay: "-1910ms" }}
        cx="500"
        cy="175"
        r="4"
        fill="#E8622A"
        opacity="0.7"
      />

      <g className="hn-signal" opacity="0.95">
        <circle r="3.25" fill="#E8622A">
          <animateMotion dur="6.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1">
            <mpath href="#hnp1" />
          </animateMotion>
          <animate attributeName="opacity" dur="6.4s" repeatCount="indefinite" values="0;0.9;0" keyTimes="0;0.12;1" />
        </circle>
        <circle r="2.75" fill="#E8622A" opacity="0">
          <animateMotion dur="7.2s" begin="-2.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1">
            <mpath href="#hnp2" />
          </animateMotion>
          <animate attributeName="opacity" dur="7.2s" begin="-2.1s" repeatCount="indefinite" values="0;0.85;0" keyTimes="0;0.12;1" />
        </circle>
        <circle r="2.5" fill="#E8622A" opacity="0">
          <animateMotion dur="5.8s" begin="-1.3s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1">
            <mpath href="#hnp3" />
          </animateMotion>
          <animate attributeName="opacity" dur="5.8s" begin="-1.3s" repeatCount="indefinite" values="0;0.8;0" keyTimes="0;0.12;1" />
        </circle>
      </g>

      {/* Subtle node brighten timed with signal arrival */}
      <circle cx="300" cy="185" r="6" fill="#E8622A" opacity="0">
        <animate attributeName="opacity" dur="6.4s" repeatCount="indefinite" values="0;0;0.35;0" keyTimes="0;0.74;0.78;1" />
      </circle>
      <circle cx="420" cy="140" r="4.5" fill="#C42B2B" opacity="0">
        <animate attributeName="opacity" dur="6.4s" repeatCount="indefinite" values="0;0;0.28;0" keyTimes="0;0.86;0.90;1" />
      </circle>

      <line
        x1="60"
        y1="200"
        x2="130"
        y2="260"
        stroke="#E8622A"
        strokeWidth="0.8"
        opacity="0.25"
      />
      <line
        x1="60"
        y1="200"
        x2="190"
        y2="155"
        stroke="#C42B2B"
        strokeWidth="0.8"
        opacity="0.2"
      />
      <line
        x1="190"
        y1="155"
        x2="300"
        y2="185"
        stroke="#E8622A"
        strokeWidth="0.8"
        opacity="0.2"
      />
      <line
        x1="300"
        y1="185"
        x2="420"
        y2="140"
        stroke="#C42B2B"
        strokeWidth="0.8"
        opacity="0.2"
      />
      <line
        x1="420"
        y1="140"
        x2="500"
        y2="175"
        stroke="#E8622A"
        strokeWidth="0.8"
        opacity="0.2"
      />
    </svg>
  );
}

function MetricBar() {
  const metrics = useMemo(
    () => [
      { prefix: ">", value: 1, unit: "kHz", label: "Control frequency" },
      { prefix: "<", value: 1, unit: "ms", label: "End-to-end latency" },
      {
        prefix: "",
        value: 0,
        unit: "inference steps",
        label: "In the reflex path",
        dramaticZero: true,
      },
      {
        prefix: "",
        value: 3,
        unit: "target markets",
        label: "Humanoid · Industrial · Defense",
      },
    ],
    [],
  );

  const wrapRef = useRef<HTMLElement | null>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (triggered) return;
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTriggered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggered]);

  return (
    <section
      ref={wrapRef}
      className="border-y border-border bg-bg-subtle px-5 py-7 md:px-12"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-6 gap-y-6 md:flex md:items-center md:justify-between md:gap-6">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={`reveal flex items-center gap-6 md:flex-1 ${triggered ? "is-visible" : ""}`}
            style={{ ["--reveal-delay" as any]: `${i * 150}ms` }}
          >
            <div className="flex flex-1 flex-col gap-1">
              <div className="font-mono text-[28px] font-normal leading-none tracking-[-0.01em] text-fg-primary">
                {m.prefix ? (
                  <span className="inline-block" aria-hidden="true">
                    {m.prefix}
                  </span>
                ) : null}
                <span className="inline-block">
                  {m.dramaticZero ? (
                    <DramaticZeroRoll
                      active={triggered}
                      delayMs={i * 140}
                      durationMs={1350}
                    />
                  ) : (
                    <RollingInt
                      active={triggered}
                      value={m.value}
                      delayMs={i * 140}
                      durationMs={1700}
                    />
                  )}
                </span>
                <span className="text-[14px] font-normal text-fg-tertiary">
                  {" "}
                  {m.unit}
                </span>
              </div>
              <div className="text-[12px] leading-[1.4] text-fg-tertiary">
                {m.label}
              </div>
            </div>
            {i < metrics.length - 1 ? (
              <div className="hidden h-10 w-px flex-shrink-0 bg-border md:block" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function RollingInt({
  active,
  value,
  durationMs,
  delayMs,
}: {
  active: boolean;
  value: number;
  durationMs: number;
  delayMs: number;
}) {
  const [display, setDisplay] = useState<number>(value);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!active || ranRef.current) return;
    ranRef.current = true;
    let raf = 0;
    let t0: number | null = null;
    const start = window.setTimeout(() => {
      const from = 0;
      const to = value;
      setDisplay(from);
      const step = (ts: number) => {
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setDisplay(Math.round(from + (to - from) * eased));
        if (p < 1) raf = window.requestAnimationFrame(step);
      };
      raf = window.requestAnimationFrame(step);
    }, delayMs);
    return () => {
      window.clearTimeout(start);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [active, delayMs, durationMs, value]);

  return (
    <span className="inline-block w-[1ch] tabular-nums">{display}</span>
  );
}

function DramaticZeroRoll({
  active,
  delayMs,
  durationMs,
}: {
  active: boolean;
  delayMs: number;
  durationMs: number;
}) {
  const [display, setDisplay] = useState<number>(0);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!active || ranRef.current) return;
    ranRef.current = true;
    let t0: number | null = null;
    let raf = 0;
    let downTimer = 0;
    let interval = 0;
    const start = window.setTimeout(() => {
      const target = 5;
      const step = (ts: number) => {
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.max(0, Math.round(eased * target)));
        if (p < 1) raf = window.requestAnimationFrame(step);
        else {
          downTimer = window.setTimeout(() => {
            let cur = target;
            interval = window.setInterval(() => {
              cur -= 1;
              setDisplay(Math.max(0, cur));
              if (cur <= 0) window.clearInterval(interval);
            }, 65);
          }, 160);
        }
      };
      raf = window.requestAnimationFrame(step);
    }, delayMs);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(downTimer);
      if (interval) window.clearInterval(interval);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [active, delayMs, durationMs]);

  return <span className="inline-block w-[1ch] tabular-nums">{display}</span>;
}

function FeatureSection() {
  const features = [
    {
      tag: "THE MOAT",
      title: "Sensor-actuation coupling",
      body: "Every control cycle reads sensors and commands actuators in the same hardware tick. No operating system scheduling. No network hops. No inference queue. This is not a software feature. It must be rebuilt from scratch to replicate.",
    },
    {
      tag: "THE TIMING",
      title: "Reflex speed at >1 kHz",
      body: "The control loop closes in under one millisecond, faster than a human blink reflex. Humanoid robots are shipping at scale for the first time. Every platform needs this layer. None of them have it yet.",
    },
    {
      tag: "THE POSITION",
      title: "Continuous, not episodic",
      body: "Traditional stacks respond to events. Arc adapts continuously. No discrete state transitions. No latency cliffs. Failure modes are bounded by physics, not software. The reflex layer becomes infrastructure. Infrastructure gets licensed.",
    },
  ];

  const archHeader = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  const archCards = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  const archAnim = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  const [archAnimActive, setArchAnimActive] = useState(false);

  useEffect(() => {
    if (!archAnim.visible) return;
    const id = window.setTimeout(() => setArchAnimActive(true), 700);
    return () => window.clearTimeout(id);
  }, [archAnim.visible]);

  return (
    <section
      id="architecture"
      className="bg-bg-base px-5 pb-10 pt-14 md:px-12 md:pb-14 md:pt-[72px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <header
          ref={archHeader.ref as React.RefObject<HTMLDivElement>}
          className={`mb-10 max-w-[600px] md:mb-14 ${archHeader.visible ? "is-visible" : ""} reveal`}
        >
          <div className="mb-[14px] text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            INTRODUCING ARC — HINOKI&apos;S REFLEX CONTROL ARCHITECTURE
          </div>
          <h2 className="mb-4 text-[28px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary md:text-[36px]">
            Built from what nature already solved.
          </h2>
          <div className="text-[16px] leading-[1.7] text-fg-secondary">
            Biological reflex systems achieve real-time physical response
            without a central processor. No inference layer. No memory lookup.
            Just continuous dynamics coupling sensation directly to response.
            <br />
            <br />
            This principle has existed for hundreds of millions of years. It
            has never been implemented in hardware.
            <p className="mt-6">Until now.</p>
          </div>
        </header>

        <div
          ref={archAnim.ref as React.RefObject<HTMLDivElement>}
          className={`reveal ${archAnim.visible ? "is-visible" : ""}`}
        >
          <div className="my-12 rounded-2xl border border-[#E0DDD8] p-8">
            <HeroAnimation active={archAnimActive} />
          </div>
        </div>

        <div
          ref={archCards.ref as React.RefObject<HTMLDivElement>}
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border md:mt-0 md:grid-cols-3"
        >
          {features.map((f, idx) => (
            <div
              key={f.title}
              className={`reveal reveal-card bg-bg-subtle px-7 py-8 ${archCards.visible ? "is-visible" : ""}`}
              style={{ ["--reveal-delay" as any]: `${idx * 180}ms` }}
            >
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                {f.tag}
              </div>
              <h3 className="mb-3 text-[18px] font-medium leading-[1.3] text-fg-primary">
                {f.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-fg-secondary">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationsSection() {
  const apps = [
    {
      tag: "Humanoid Safety",
      desc: "Tesla is targeting 100,000 Optimus units in 2026. Every humanoid operating near humans needs a real-time collision response layer. Current digital stacks are too slow. McKinsey identified safety as the primary bottleneck blocking commercial deployment. Arc closes that gap at the hardware level.",
    },
    {
      tag: "Industrial Manipulation",
      desc: "The global industrial robotics market exceeds $300 billion. Force-controlled assembly at production throughput requires sensor feedback at the actuator, not the server. Every major manufacturer is looking for this capability. Most are still waiting for it.",
    },
    {
      tag: "Defense & Autonomous",
      desc: "NATO and allied defense programs are actively procuring robotic platforms for contested environments. Unpredictable terrain, adversarial conditions, physical damage. The reflex layer keeps the platform operational while high-level planning continues. Damage a limb or lose a rotor. The platform keeps moving.",
    },
  ];

  const appsHead = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  const appsList = useInViewOnce<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section id="applications" className="bg-bg-inverse px-5 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div
          ref={appsHead.ref as React.RefObject<HTMLDivElement>}
          className={`reveal reveal-slow ${appsHead.visible ? "is-visible" : ""}`}
        >
          <div className="mb-[14px] text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Target Applications
          </div>
          <h2 className="mb-10 text-[28px] font-light leading-[1.15] tracking-[-0.02em] text-fg-inverse md:mb-12 md:text-[36px]">
            Where latency is not optional.
          </h2>
        </div>

        <div ref={appsList.ref as React.RefObject<HTMLDivElement>} className="flex flex-col">
          {apps.map((a, i) => (
            <div
              key={a.tag}
              className={`reveal reveal-slow flex flex-col gap-3 border-t border-border-inverse py-7 md:flex-row md:gap-8 ${appsList.visible ? "is-visible" : ""}`}
              style={{ ["--reveal-delay" as any]: `${i * 150}ms` }}
            >
              <div className="min-w-8 pt-0.5 font-mono text-[13px] text-fg-secondary">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div className="mb-1.5 text-[16px] font-medium text-fg-inverse">
                  {a.tag}
                </div>
                <p className="max-w-[600px] text-[14px] leading-[1.7] text-fg-tertiary">
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onRequestAccess }: { onRequestAccess: () => void }) {
  const cta = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section
      id="contact"
      className="border-t border-border bg-bg-subtle px-5 py-20 md:px-12 md:py-24"
    >
      <div
        ref={cta.ref as React.RefObject<HTMLDivElement>}
        className={`mx-auto max-w-[640px] reveal reveal-slow ${cta.visible ? "is-visible" : ""}`}
      >
        <div className="mb-[14px] text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          Work with us
        </div>
        <h2 className="mb-4 text-[28px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary md:text-[36px]">
          Hardware validation is underway.
        </h2>
        <p className="mb-8 text-[16px] leading-[1.7] text-fg-secondary">
          We are in active conversation with robotics engineers and research
          institutions across Japan, and selectively opening co-development
          discussions. If your platform requires reflex-speed control,
          let&apos;s talk.
        </p>
        <button
          type="button"
          onClick={onRequestAccess}
          className="inline-flex items-center rounded-md bg-accent px-6 py-3 text-[13px] font-medium text-fg-inverse transition-colors duration-200 hover:bg-accent-hover"
        >
          Request Access
        </button>
      </div>
    </section>
  );
}

function Footer({ onRequestAccess }: { onRequestAccess: () => void }) {
  return (
    <footer className="border-t border-border-inverse bg-bg-inverse px-5 pb-8 pt-14 md:px-12">
      <div className="mx-auto mb-12 flex max-w-[1200px] flex-col justify-between gap-12 md:flex-row md:gap-12">
        <div>
          <div className="mb-2.5 flex items-center gap-2">
            <img
              src="/assets/logo-mark-cropped.png"
              alt="Hinoki mark"
              width={34}
              height={34}
              className="block h-[34px] w-[34px] object-contain"
            />
            <span className="text-[14px] font-medium text-fg-inverse">
              Hinoki Technologies
            </span>
          </div>
          <div className="text-[12px] text-fg-secondary">
            Reflex Control Architecture
          </div>
          <div className="text-[12px] text-fg-secondary">Tsukuba, Japan</div>
        </div>

        <div className="flex flex-col gap-12 sm:flex-row">
          <div className="flex flex-col gap-2.5">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-secondary">
              Company
            </div>
            <a
              href="#architecture"
              className="text-[13px] text-fg-tertiary transition-colors duration-200 hover:text-fg-inverse"
            >
              Architecture
            </a>
            <a
              href="#applications"
              className="text-[13px] text-fg-tertiary transition-colors duration-200 hover:text-fg-inverse"
            >
              Applications
            </a>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-secondary">
              Connect
            </div>
            <button
              type="button"
              onClick={onRequestAccess}
              className="text-left text-[13px] text-fg-tertiary transition-colors duration-200 hover:text-fg-inverse"
            >
              Request Access
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] border-t border-border-inverse pt-6 text-[11px] text-fg-secondary">
        © 2026 Hinoki Technologies. All rights reserved.
      </div>
    </footer>
  );
}
