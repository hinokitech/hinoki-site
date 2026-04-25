"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeroAnimation } from "./hero-animation";
import { RequestAccessModal } from "./request-access-modal";

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
          <div className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Reflex control architecture
          </div>
          <h1 className="mb-6 text-[36px] font-light leading-[1.1] tracking-[-0.025em] text-fg-primary md:text-[52px]">
            The reflex layer
            <br />
            robots have been missing.
          </h1>
          <p className="mb-9 max-w-[520px] text-[16px] font-normal leading-[1.7] text-fg-secondary md:text-[17px]">
            Hinoki couples sensor input directly to actuation — continuously, at
            hardware speed — eliminating the discrete inference steps that make
            current robots brittle.
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
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

          <div className="flex flex-wrap items-center gap-[10px] text-[12px] text-fg-tertiary">
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
          <div key={m.label} className="flex items-center gap-6 md:flex-1">
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
                      durationMs={1200}
                    />
                  ) : (
                    <RollingInt
                      active={triggered}
                      value={m.value}
                      delayMs={i * 140}
                      durationMs={1500}
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
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => {
      // Add extra cycles to feel like an odometer.
      const loops = 2;
      setOffset(loops * 10 + (value % 10));
    }, delayMs);
    return () => window.clearTimeout(id);
  }, [active, delayMs, value]);

  return (
    <span className="relative inline-flex h-[1em] w-[1ch] overflow-hidden align-[-0.05em] tabular-nums">
      <span
        className="absolute left-0 top-0 w-full"
        style={{
          transform: `translateY(${-offset}em)`,
          transitionProperty: "transform",
          transitionDuration: `${durationMs}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {Array.from({ length: 30 }, (_, i) => (
          <span key={i} className="block h-[1em] leading-none">
            {i % 10}
          </span>
        ))}
      </span>
    </span>
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
  const [phase, setPhase] = useState<"idle" | "up" | "down">("idle");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    let t0: number | null = null;
    let raf = 0;
    let downTimer = 0;
    const start = window.setTimeout(() => {
      setPhase("up");
      const target = 5;
      const step = (ts: number) => {
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.max(0, Math.round(eased * target)));
        if (p < 1) raf = window.requestAnimationFrame(step);
        else {
          downTimer = window.setTimeout(() => {
            setPhase("down");
            let cur = target;
            const interval = window.setInterval(() => {
              cur -= 1;
              setN(Math.max(0, cur));
              if (cur <= 0) window.clearInterval(interval);
            }, 55);
          }, 120);
        }
      };
      raf = window.requestAnimationFrame(step);
    }, delayMs);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(downTimer);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [active, delayMs, durationMs]);

  return (
    <span className="inline-block w-[1ch] tabular-nums">
      {phase === "idle" ? 0 : n}
    </span>
  );
}

function FeatureSection() {
  const features = [
    {
      tag: "Architecture",
      title: "Direct sensor-actuation coupling",
      body: "Every control cycle reads sensors and commands actuators in the same hardware tick. No operating system scheduling. No network hops. No inference queue.",
    },
    {
      tag: "Performance",
      title: "Reflex speed at >1 kHz",
      body: "The control loop closes in under one millisecond — faster than a human blink reflex. This is not a software optimization; it is an architectural constraint. Continuous-time processing eliminates the memory access and inference overhead that drives power consumption in digital control stacks.",
    },
    {
      tag: "Safety",
      title: "Continuous, not episodic",
      body: "Traditional stacks respond to events. Hinoki's architecture adapts continuously. No discrete state transitions. No latency cliffs. Failure modes are bounded by physics, not software.",
    },
  ];

  return (
    <section id="architecture" className="bg-bg-base px-5 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 max-w-[600px] md:mb-14">
          <div className="mb-[14px] text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Core Architecture
          </div>
          <h2 className="mb-4 text-[28px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary md:text-[36px]">
            Built from biological principles.
          </h2>
          <p className="text-[16px] leading-[1.7] text-fg-secondary">
            Current robotic control stacks were designed for capability, not
            speed. Hinoki&apos;s architecture is designed around a single
            constraint: latency cannot exist in the reflex path.
          </p>
        </header>

        <HeroAnimation />

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border md:mt-0 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="bg-bg-subtle px-7 py-8">
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
      desc: "Real-time contact response. The robot reacts before the central controller finishes its first inference pass.",
    },
    {
      tag: "Industrial Manipulation",
      desc: "Force-controlled assembly at production throughput. Sensor feedback closes the loop at the actuator, not the server.",
    },
    {
      tag: "Defense & Autonomous",
      desc: "Unpredictable terrain, adversarial conditions. The reflex layer keeps the platform stable while high-level planning continues. Platforms that lose a limb or a rotor continue operating. The reflex layer adapts to the new physical state in real time.",
    },
  ];

  return (
    <section id="applications" className="bg-bg-inverse px-5 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[14px] text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          Target Applications
        </div>
        <h2 className="mb-10 text-[28px] font-light leading-[1.15] tracking-[-0.02em] text-fg-inverse md:mb-12 md:text-[36px]">
          Where latency is not optional.
        </h2>

        <div className="flex flex-col">
          {apps.map((a, i) => (
            <div
              key={a.tag}
              className="flex flex-col gap-3 border-t border-border-inverse py-7 md:flex-row md:gap-8"
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
  return (
    <section
      id="contact"
      className="border-t border-border bg-bg-subtle px-5 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[640px]">
        <div className="mb-[14px] text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          Work with us
        </div>
        <h2 className="mb-4 text-[28px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary md:text-[36px]">
          Hardware validation is underway.
        </h2>
        <p className="mb-8 text-[16px] leading-[1.7] text-fg-secondary">
          We are in active conversation with engineers and research institutions
          across humanoid, industrial, and defense robotics. If your platform
          requires reflex-speed control, let&apos;s talk.
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
            <a
              href="#architecture"
              className="text-[13px] text-fg-tertiary transition-colors duration-200 hover:text-fg-inverse"
            >
              Architecture
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
        © 2026 Hinoki Technologies K.K. All rights reserved.
      </div>
    </footer>
  );
}
