"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeroAnimation } from "./hero-animation";
import { ArcIntegrationCanvas } from "./reflex/ArcIntegrationCanvas";
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
      <Nav />
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

function Nav() {
  const links = [
    { label: "Architecture", href: "#architecture" },
    { label: "Applications", href: "#applications" },
  ];

  return (
    <nav className="sticky top-0 z-[100] h-[60px] border-b border-border bg-bg-base">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-5 md:px-12">
        <a href="#" className="flex items-center gap-[10px]">
          <img
            src="/assets/logo-hinoki-tree.png"
            alt="Hinoki"
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
          href="#contact"
          className="inline-flex items-center rounded-md bg-accent px-[18px] py-2 text-[12px] font-medium tracking-[0.01em] text-fg-inverse transition-colors duration-200 hover:bg-accent-hover"
        >
          Work with us
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
            ARC BY HINOKI · PHYSICAL INTELLIGENCE FOR ROBOTICS
          </div>
          <h1
            className={`reveal mb-6 text-[36px] font-light leading-[1.1] tracking-[-0.025em] text-fg-primary md:text-[52px] ${heroVisible ? "is-visible" : ""}`}
            style={{ ["--reveal-delay" as any]: "216ms" }}
          >
            The physical intelligence
            <br />
            robots have been missing.
          </h1>
          <p
            className={`reveal mb-9 max-w-[min(640px,100%)] text-pretty text-[16px] font-normal leading-[1.7] text-fg-secondary md:text-[17px] ${heroVisible ? "is-visible" : ""}`}
            style={{ ["--reveal-delay" as any]: "432ms" }}
          >
            <span className="block">
              Hinoki inserts a continuous-time neuromorphic control layer between
              sensors and actuators,
            </span>
            <span className="mt-2.5 block md:mt-3">
              allowing robotic systems to respond, adapt, and stabilize at the
              body level before the higher-level digital stack completes
              perception, inference, or planning.
            </span>
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
            <span className="inline-flex items-center gap-1.5">
              <img
                src="/assets/antler-mark.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] shrink-0 rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
              />
              <span>Antler Japan 2026</span>
            </span>
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
        label: "In the physical response loop",
        dramaticZero: true,
      },
      {
        prefix: "",
        value: 4,
        unit: "platforms",
        label: "Humanoid · Industrial · Defense · Wearable",
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
      // Trigger a bit later so the counters animate when the user reaches it,
      // especially on smaller mobile viewports.
      { threshold: 0.7, rootMargin: "0px 0px -15% 0px" },
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

function LatencyComparisonBar({ ready }: { ready: boolean }) {
  const inView = useInViewOnce<HTMLDivElement>({
    threshold: 0.5,
    rootMargin: "0px 0px -10% 0px",
  });
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!inView.visible || !ready) return;
    const t = window.setTimeout(() => setFilled(true), 450);
    return () => window.clearTimeout(t);
  }, [inView.visible, ready]);

  return (
    <div
      ref={inView.ref}
      className="mt-7 border-t border-[#E0DDD8] pt-5 md:mt-10 md:pt-7"
    >
      <div className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-tertiary md:mb-5">
        End-to-end latency  ·  same scale
      </div>

      <div className="mx-auto flex max-w-[600px] flex-col gap-3 md:gap-3.5">
        <div className="grid grid-cols-[78px_1fr_60px] items-center gap-2 md:grid-cols-[120px_1fr_72px] md:gap-4">
          <div className="text-right text-[10px] text-fg-secondary md:text-[12px]">
            Computational
          </div>
          <div className="relative h-2 overflow-hidden rounded-sm bg-[#E3DED7]">
            <div
              className="absolute inset-y-0 left-0 rounded-sm bg-[#7B8FAB] transition-[width] duration-[1500ms] ease-out"
              style={{ width: filled ? "100%" : "0%" }}
            />
          </div>
          <div className="text-[10px] font-medium text-fg-primary md:text-[12px]">
            ~50 ms
          </div>
        </div>

        <div className="grid grid-cols-[78px_1fr_60px] items-center gap-2 md:grid-cols-[120px_1fr_72px] md:gap-4">
          <div className="text-right text-[10px] text-fg-secondary md:text-[12px]">
            <span className="italic">Arc</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-sm bg-[#E3DED7]">
            <div
              className="absolute inset-y-0 left-0 rounded-sm bg-accent transition-[width] duration-1000 ease-out"
              style={{
                width: filled ? "2%" : "0%",
                transitionDelay: "260ms",
              }}
            />
          </div>
          <div className="text-[10px] font-medium text-fg-primary md:text-[12px]">
            &lt;1 ms
          </div>
        </div>
      </div>

      <div className="mx-auto mt-2 grid max-w-[600px] grid-cols-[78px_1fr_60px] gap-2 md:grid-cols-[120px_1fr_72px] md:gap-4">
        <div />
        <div className="flex justify-between text-[9px] uppercase tracking-[0.12em] text-fg-tertiary md:text-[10px]">
          <span>0 ms</span>
          <span>~50 ms</span>
        </div>
        <div />
      </div>
    </div>
  );
}

function FeatureSection() {
  const features = [
    {
      tag: "PHYSICAL RESPONSE",
      title: "Humanoid safety around humans.",
      paragraphs: [
        "Robots working near people need to react to contact, force change, imbalance, or unexpected movement faster than a full perception-to-planning loop can complete.",
        "Arc is designed to add a fast local response layer between selected sensors and actuators, so the system can react immediately while the main controller remains in charge.",
      ],
      useCases:
        "Use cases: Humanoids, collaborative robots, assistive systems, mobile manipulators",
    },
    {
      tag: "PHYSICAL ADAPTATION",
      title: "Gripper control under changing conditions.",
      paragraphs: [
        "Robotic grippers often struggle when objects vary in weight, surface, shape, or position. They may slip, crush delicate items, or require retuning between tasks.",
        "Arc is designed to adapt inside the control loop, using local sensor feedback to adjust grip response as physical conditions change.",
      ],
      useCases:
        "Use cases: Tactile sensing, adaptive grasping, pick-and-place, mobile manipulation",
    },
    {
      tag: "PHYSICAL RESILIENCE",
      title: "Stability when conditions degrade.",
      paragraphs: [
        "Robots operating in the real world face noisy sensors, shifting loads, vibration, and partial hardware degradation. Many systems slow down, stop, or require central intervention when conditions move outside expected parameters.",
        "Arc is designed to support local stabilization and compensation in selected hardware loops before the broader system needs to intervene.",
      ],
      useCases:
        "Use cases: Drones, mobile robots, quadrupeds, field robotics, assistive systems",
    },
  ];

  const archHeader = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  const archCards = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  const archAnim = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });

  // Desktop: panels are side-by-side, so a single observer fires a
  // choreographed sequence the user takes in as one composition.
  const desktopTrigger = useInViewOnce<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  });

  // Mobile: panels are stacked. Each panel has its own observer so the
  // reveal lands the moment the user scrolls to it — the Arc panel is
  // never wasted while the user is still on the computational panel above.
  const leftPanelInView = useInViewOnce<HTMLDivElement>({
    threshold: 0.5,
    rootMargin: "0px 0px -15% 0px",
  });
  const rightPanelInView = useInViewOnce<HTMLDivElement>({
    threshold: 0.5,
    rootMargin: "0px 0px -15% 0px",
  });

  // Tri-state so effects never fire before the viewport mode is known.
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const [panelsReady, setPanelsReady] = useState(false);

  // DESKTOP — one trigger, full choreography (~2.7s total).
  // Each beat has breathing room so the side-by-side comparison reads as
  // a clear sequence rather than a flicker of everything at once.
  useEffect(() => {
    if (isDesktop !== true || !desktopTrigger.visible) return;
    const timers = [
      window.setTimeout(() => setLeftVisible(true), 0),
      window.setTimeout(() => setLeftActive(true), 750),
      window.setTimeout(() => setRightVisible(true), 1100),
      window.setTimeout(() => setRightActive(true), 1850),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [isDesktop, desktopTrigger.visible]);

  // MOBILE LEFT — independent per-panel sequence on scroll-into-view.
  useEffect(() => {
    if (isDesktop !== false || !leftPanelInView.visible) return;
    const timers = [
      window.setTimeout(() => setLeftVisible(true), 0),
      window.setTimeout(() => setLeftActive(true), 750),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [isDesktop, leftPanelInView.visible]);

  // MOBILE RIGHT (Arc) — same self-contained sequence; fires when the user
  // actually arrives at the panel so the reveal is never missed.
  useEffect(() => {
    if (isDesktop !== false || !rightPanelInView.visible) return;
    const timers = [
      window.setTimeout(() => setRightVisible(true), 0),
      window.setTimeout(() => setRightActive(true), 750),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [isDesktop, rightPanelInView.visible]);

  // Latency-bar gate, derived from actual panel state. Identical logic on
  // desktop and mobile: once both canvases are running, give the user a
  // beat to take in the contrast, then flip the gate.
  useEffect(() => {
    if (!leftActive || !rightActive) return;
    const t = window.setTimeout(() => setPanelsReady(true), 800);
    return () => window.clearTimeout(t);
  }, [leftActive, rightActive]);

  return (
    <section
      id="architecture"
      className="scroll-mt-[80px] bg-bg-base px-5 pb-2 pt-14 md:px-12 md:pb-6 md:pt-[72px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <header
          ref={archHeader.ref as React.RefObject<HTMLDivElement>}
          className={`mb-10 max-w-[720px] md:mb-14 ${archHeader.visible ? "is-visible" : ""} reveal`}
        >
          <div className="mb-[14px] text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            THE BIOLOGY OF PHYSICAL INTELLIGENCE
          </div>
          <h2 className="mb-6 text-[28px] font-light leading-[1.1] tracking-[-0.03em] text-fg-primary md:mb-8 md:text-[44px]">
            Robots have been given brains.
            <br />
            <span className="italic">Arc</span> gives them a nervous system.
          </h2>
          <div className="max-w-[min(640px,100%)]">
            <div className="space-y-6 md:space-y-7">
              <p className="text-[16px] font-normal leading-[1.7] text-fg-secondary md:text-[17px]">
                In living systems, physical intelligence is not confined to the
                brain. It is distributed through the body, where sensation and
                response are tightly coupled in real time.
              </p>
              <p className="text-[16px] font-normal leading-[1.7] text-fg-secondary md:text-[17px]">
                That is why a hand pulls away from heat before conscious thought,
                and why a body can adapt instantly when the ground, load, or
                balance changes.
              </p>
              <p className="text-[16px] font-normal leading-[1.7] text-fg-secondary md:text-[17px]">
                <span className="italic text-fg-primary">Arc</span> brings this
                principle into robotic systems: a continuous-time control
                architecture that sits closer to sensors and actuators,{" "}
                <strong className="font-semibold text-fg-primary">
                  enabling faster response, adaptive behavior, and physical
                  resilience.
                </strong>
              </p>
            </div>
          </div>
        </header>

        <div
          ref={archAnim.ref as React.RefObject<HTMLDivElement>}
          className={`reveal ${archAnim.visible ? "is-visible" : ""}`}
        >
          <div className="my-12 rounded-2xl border border-[#E0DDD8] px-5 py-6 md:px-8 md:py-8">
            <p className="mb-4 text-center text-[13px] leading-[1.5] text-fg-secondary md:mb-6 md:text-[14px]">
              How robots respond today, and how{" "}
              <span className="italic text-fg-primary">Arc</span> responds.
            </p>
            <div ref={desktopTrigger.ref as React.RefObject<HTMLDivElement>}>
              <HeroAnimation
                leftVisible={leftVisible}
                rightVisible={rightVisible}
                leftActive={leftActive}
                rightActive={rightActive}
                leftRef={leftPanelInView.ref as React.RefObject<HTMLDivElement | null>}
                rightRef={rightPanelInView.ref as React.RefObject<HTMLDivElement | null>}
              />
            </div>
            <LatencyComparisonBar ready={panelsReady} />
          </div>

          <div className="my-12 rounded-2xl border border-[#E0DDD8] px-5 py-6 md:px-8 md:py-8">
            <div className="mb-4 text-center md:mb-6">
              <p className="text-[13px] leading-[1.5] text-fg-secondary md:text-[14px]">
                How{" "}
                <span className="italic text-fg-primary">Arc</span> integrates
                into existing robotic systems.
              </p>
              <p className="mt-2 text-[13px] leading-[1.5] text-fg-secondary md:text-[14px]">
                A fast local control layer for selected sensor–actuator loops.
              </p>
            </div>
            <ArcIntegrationCanvas />

            <div className="mx-auto mt-8 max-w-[640px] md:mt-10">
              <h3 className="flex items-center justify-center gap-2 text-center text-[17px] font-medium leading-tight tracking-[-0.02em] text-fg-primary md:justify-start md:text-left md:text-[18px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-[1.05em] shrink-0 text-accent"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-9.25 10.5a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l9.25-10.5a.75.75 0 0 1 .914-.092Z"
                    clipRule="evenodd"
                  />
                </svg>
                Power advantage
              </h3>
              <div className="mt-4 space-y-4 text-left text-[14px] leading-[1.7] text-fg-secondary md:text-[15px]">
                <p>
                  Conventional control loops often spend energy moving sensor
                  data through processors, memory, and inference layers before
                  actuation.{" "}
                  <span className="italic text-fg-primary">Arc</span> is designed
                  to handle fast physical responses locally, reducing unnecessary
                  data movement and compute for selected control loops.
                </p>
              </div>
              <p className="mt-4 text-[13px] leading-[1.65] text-fg-tertiary md:text-[14px]">
                Phase 2 benchmarks will measure latency, energy per response,
                and adaptive stability against a digital baseline.
              </p>
              <div className="mt-6">
                <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E7F99] md:text-left">
                  Phase 2 benchmark targets
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-[#E0DDD8] bg-bg-base px-3 py-2.5 text-left">
                    <div className="text-[11px] font-semibold text-fg-primary">
                      Latency
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-fg-secondary">
                      sub-ms response target
                    </div>
                  </div>
                  <div className="rounded-lg border border-[#E0DDD8] bg-bg-base px-3 py-2.5 text-left">
                    <div className="text-[11px] font-semibold text-fg-primary">
                      Energy
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-fg-secondary">
                      lower energy per response
                    </div>
                  </div>
                  <div className="rounded-lg border border-[#E0DDD8] bg-bg-base px-3 py-2.5 text-left">
                    <div className="text-[11px] font-semibold text-fg-primary">
                      Adaptation
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-fg-secondary">
                      stable control under variable conditions
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-10">
              <div className="mb-3 text-center md:mb-4 md:text-left">
                <h3 className="text-center text-[16px] font-medium leading-tight tracking-[-0.02em] text-fg-primary md:text-left md:text-[17px]">
                  Example applications
                </h3>
                <p className="mx-auto mt-1.5 max-w-[520px] text-center text-[12px] leading-snug text-fg-secondary md:mx-0 md:mt-2 md:text-left md:text-[13px]">
                  Three reflex-shaped paths: sensor →{" "}
                  <span className="text-accent">Arc</span> → response.
                </p>
              </div>
              <div className="overflow-hidden rounded-md border border-[#E0DDD8] bg-bg-base">
                <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="border-b border-[#E0DDD8] px-5 py-6 md:border-b-0 md:border-r md:px-6 md:py-7">
                  <div className="text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6E7F99]">
                    Gripper
                  </div>
                  <div className="mt-4 flex flex-col items-center gap-1 text-center text-[13px] leading-snug text-fg-primary md:mt-6 md:text-[14px]">
                    <span className="text-pretty">Tactile sensor</span>
                    <span className="text-[11px] leading-none text-fg-secondary">
                      ↓
                    </span>
                    <span className="text-accent">Arc</span>
                    <span className="text-[11px] leading-none text-fg-secondary">
                      ↓
                    </span>
                    <span>grip response</span>
                  </div>
                </div>
                <div className="border-b border-[#E0DDD8] px-5 py-6 md:border-b-0 md:border-r md:px-6 md:py-7">
                  <div className="text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6E7F99]">
                    Exoskeleton
                  </div>
                  <div className="mt-4 flex flex-col items-center gap-1 text-center text-[13px] leading-snug text-fg-primary md:mt-6 md:text-[14px]">
                    <span className="text-pretty">Joint / pressure sensor</span>
                    <span className="text-[11px] leading-none text-fg-secondary">
                      ↓
                    </span>
                    <span className="text-accent">Arc</span>
                    <span className="text-[11px] leading-none text-fg-secondary">
                      ↓
                    </span>
                    <span>assistive response</span>
                  </div>
                </div>
                <div className="px-5 py-6 md:px-6 md:py-7">
                  <div className="text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6E7F99]">
                    Mobile robot / drone
                  </div>
                  <div className="mt-4 flex flex-col items-center gap-1 text-center text-[13px] leading-snug text-fg-primary md:mt-6 md:text-[14px]">
                    <span className="text-pretty">IMU / vibration sensor</span>
                    <span className="text-[11px] leading-none text-fg-secondary">
                      ↓
                    </span>
                    <span className="text-accent">Arc</span>
                    <span className="text-[11px] leading-none text-fg-secondary">
                      ↓
                    </span>
                    <span>stabilization</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div ref={archCards.ref as React.RefObject<HTMLDivElement>} className="mt-10 md:mt-14">
          <div
            className={`reveal max-w-[800px] ${archCards.visible ? "is-visible" : ""}`}
          >
            <h2 className="text-[24px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary md:text-[32px]">
              Future Applications of{" "}
              <span className="italic text-fg-primary">Arc</span>
            </h2>
            <p className="mt-3 max-w-[min(640px,100%)] text-[15px] leading-[1.65] text-fg-secondary md:mt-4 md:text-[16px]">
              Arc is designed for robotic systems where faster response, lower
              power consumption, adaptation, or resilience can improve
              real-world performance in the physical world.
            </p>
          </div>

          <div
            className={`reveal mt-8 grid grid-cols-1 overflow-hidden rounded-md border border-border bg-bg-subtle md:mt-10 md:grid-cols-3 ${archCards.visible ? "is-visible" : ""}`}
            style={{ ["--reveal-delay" as any]: "100ms" }}
          >
            {features.map((f, idx) => (
              <div
                key={f.tag}
                className={`reveal reveal-card flex flex-col px-7 py-8 ${archCards.visible ? "is-visible" : ""} border-border ${
                  idx === 0 ? "" : "border-t md:border-t-0 md:border-l"
                }`}
                style={{ ["--reveal-delay" as any]: `${idx * 180 + 140}ms` }}
              >
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                  {f.tag}
                </div>
                <h3 className="mb-3 text-[18px] font-semibold leading-[1.3] text-fg-primary">
                  {f.title}
                </h3>
                <div className="mb-6 space-y-4 text-[14px] leading-[1.7] text-fg-secondary">
                  {f.paragraphs.map((p, pi) => (
                    <p key={`${f.tag}-${pi}`}>{p}</p>
                  ))}
                </div>
                <p className="mt-auto border-l-2 border-accent pl-3 text-[12px] font-normal leading-[1.55] text-fg-tertiary md:text-[13px]">
                  {f.useCases}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplicationsSection() {
  const apps = [
    {
      tag: "Humanoid Safety",
      claim:
        "Arc delivers physical response at the speed physics demands, making safe human-robot coexistence commercially viable.",
      desc: "Tesla is targeting 100,000 Optimus units in 2026, and every one of them will operate near humans. McKinsey identified real-time safety response as the primary bottleneck blocking commercial deployment at scale. Current digital stacks are too slow for this problem.",
    },
    {
      tag: "Industrial Manipulation",
      claim:
        "Arc delivers the physical adaptation that precision requires, unlocking a control layer opportunity no software stack has reached.",
      desc: "The global industrial robotics market exceeds $300 billion, and the capability gap at the control layer remains largely unsolved. Force-controlled assembly at production throughput requires sensor feedback at the actuator, not the server.",
    },
    {
      tag: "Defense & Autonomous",
      claim:
        "Lose a limb or a rotor — the platform keeps moving.",
      desc: "NATO and allied defense programs are actively procuring robotic platforms for contested environments. Unpredictable terrain, adversarial conditions, physical damage. In these environments, Arc delivers the physical resilience defense deployment demands.",
    },
    {
      tag: "Wearable & Assistive",
      claim:
        "Arc adapts to the body that's wearing it, closing the loop between intent and motion at the speed of human movement.",
      desc: "The global exoskeleton and prosthetic markets are projected to surpass $30 billion by 2032, and clinical adoption is gated on natural-feeling response. Standard adaptive control can't match the body's own timescale. Arc delivers the real-time coupling that intuitive assistive movement requires.",
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
            ONE ARCHITECTURE
          </div>
          <h2 className="mb-10 text-[28px] font-light leading-[1.15] tracking-[-0.02em] text-fg-inverse md:mb-12 md:text-[36px]">
            Every platform that moves.
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
                <div className="mb-2 text-[16px] font-medium text-fg-inverse">
                  {a.tag}
                </div>
                <p className="mb-3 max-w-[600px] border-l-2 border-accent pl-3 text-[16px] font-medium leading-[1.45] text-fg-inverse md:text-[17px]">
                  {a.claim}
                </p>
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
      className="scroll-mt-[80px] border-t border-border bg-bg-subtle px-5 py-20 md:px-12 md:py-24"
    >
      <div
        ref={cta.ref as React.RefObject<HTMLDivElement>}
        className={`mx-auto max-w-[640px] reveal reveal-slow ${cta.visible ? "is-visible" : ""}`}
      >
        <div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent md:mb-[18px] md:text-[14px] md:tracking-[0.12em]">
          Work with us
        </div>
        <h2 className="mb-4 text-[28px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary md:text-[36px]">
          Hardware validation is underway.
        </h2>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          For investors
        </div>
        <p className="mb-4 text-[16px] leading-[1.7] text-fg-secondary">
          We are raising a pre-seed round to complete the benchmark and bring
          physical intelligence to robotic platforms at scale. Selected for
          Antler Japan 2026 Residency.
        </p>
        <div className="mb-8">
          <img
            src="/assets/antler-wordmark.png"
            alt="Antler"
            width={220}
            height={48}
            className="h-7 w-auto max-w-full object-contain object-left md:h-8"
          />
        </div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          For partners
        </div>
        <p className="mb-8 text-[16px] leading-[1.7] text-fg-secondary">
          We are in active conversation with robotics engineers and research
          institutions across Japan, and selectively opening co-development
          discussions. If your platform could benefit from Arc, let&apos;s
          talk.
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
          <div className="-ml-3 mb-2.5 flex items-center gap-2">
            <img
              src="/assets/logo-hinoki-tree.png"
              alt="Hinoki"
              width={34}
              height={34}
              className="block h-[34px] w-[34px] object-contain"
            />
            <span className="text-[14px] font-medium text-fg-inverse">
              Hinoki Technologies
            </span>
          </div>
          <div className="text-[12px] text-fg-secondary">
            Arc — Physical Intelligence
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
        © {new Date().getFullYear()} Hinoki Technologies. All rights reserved.
      </div>
    </footer>
  );
}
