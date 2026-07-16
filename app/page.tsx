"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
      { threshold: 0.15, ...(options ?? {}) },
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
    <div className="flex min-h-full flex-col bg-[#0a0b0d] text-fg-primary">
      <Nav onRequestAccess={openRequest} />
      <VideoIntro />
      <BeliefChapter />
      <ProofChapter />
      <PilotsChapter />
      <ContactChapter onRequestAccess={openRequest} />
      <Footer />
      <RequestAccessModal open={requestOpen} onClose={closeRequest} />
    </div>
  );
}

function Nav({ onRequestAccess }: { onRequestAccess: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#0a0b0d]/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 md:px-10">
        <a href="#" className="flex items-center gap-3">
          <img
            src="/assets/logo-hinoki-tree.png"
            alt="Hinoki Technologies"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="text-[15px] font-medium tracking-[-0.02em] text-fg-primary/90">
            Hinoki Technologies
          </span>
        </a>

        <button
          type="button"
          onClick={onRequestAccess}
          className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-[12px] font-medium tracking-[0.02em] text-fg-primary transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
        >
          Request Access
        </button>
      </div>
    </nav>
  );
}

function VideoIntro() {
  const [ready, setReady] = useState(false);
  const [showCue, setShowCue] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 450);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowCue(window.scrollY < 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContent = useCallback(() => {
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="film-grain relative max-md:min-h-[100svh] max-md:px-0 max-md:pb-0 max-md:pt-0 px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28">
      <div className="mx-auto w-full max-w-[1400px] max-md:max-w-none">
        <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0b0d] shadow-[0_0_72px_color-mix(in_srgb,var(--color-logo-mid)_10%,transparent)] max-md:min-h-[100svh] max-md:rounded-none max-md:border-0 max-md:shadow-none">
          <HeroBackdrop />

          <div className="pointer-events-none absolute inset-0 z-[1]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d]/92 via-[#0a0b0d]/50 to-[#0a0b0d]/10 max-md:from-[#0a0b0d]/90 max-md:via-[#0a0b0d]/62 max-md:to-[#0a0b0d]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d]/70 via-transparent to-[#0a0b0d]/30 max-md:from-[#0a0b0d]/82 max-md:via-[#0a0b0d]/20" />

            <div className="relative flex h-full items-center px-6 py-10 md:px-10 md:py-14 lg:px-14 max-md:absolute max-md:inset-x-[18px] max-md:top-[9.5rem] max-md:min-h-0 max-md:px-0 max-md:py-0 max-md:items-start">
              <div className="max-w-[1100px] max-md:max-w-[354px] max-md:translate-y-0 -translate-y-5 md:-translate-y-7">
                <p
                  className={`reveal reveal-hero mb-6 font-mono uppercase tracking-[0.28em] text-accent max-md:mb-4 max-md:translate-y-4 max-md:text-[13px] max-md:tracking-[0.24em] md:text-[16px] md:tracking-[0.24em] lg:text-[18px] ${ready ? "is-visible" : ""}`}
                  style={{ ["--reveal-delay" as any]: "0ms" }}
                >
                  Neuromorphic Edge AI
                </p>

                <h1 className="font-light leading-[0.95] tracking-[-0.04em] text-fg-primary max-md:mt-8 max-md:text-[2.625rem] md:text-[clamp(2.75rem,9vw,7.5rem)]">
                  <span className="block">
                    <span
                      className={`reveal reveal-hero inline-block ${ready ? "is-visible" : ""}`}
                      style={{ ["--reveal-delay" as any]: "140ms" }}
                    >
                      Building
                    </span>{" "}
                    <span
                      className={`reveal reveal-hero inline-block ${ready ? "is-visible" : ""}`}
                      style={{ ["--reveal-delay" as any]: "260ms" }}
                    >
                      the
                    </span>
                  </span>
                  <span
                    className={`reveal reveal-hero block text-gradient-logo ${ready ? "is-visible" : ""}`}
                    style={{ ["--reveal-delay" as any]: "360ms" }}
                  >
                    future.
                  </span>
                </h1>

                <div className="mt-6 flex max-w-[520px] flex-col gap-1 leading-[1.65] text-fg-secondary max-md:mt-0 max-md:max-w-none max-md:gap-0.5 max-md:text-[14px] max-md:leading-[1.55] md:mt-8 md:gap-1.5 md:text-[clamp(1rem,2.2vw,1.25rem)]">
                  <div className="max-md:-translate-y-4">
                    <span
                      className={`reveal reveal-hero text-fg-primary max-md:mt-4 ${ready ? "is-visible" : ""}`}
                      style={{ ["--reveal-delay" as any]: "400ms" }}
                    >
                      Edge intelligence for physical systems.
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 max-md:mt-6 max-md:gap-0.5 md:contents">
                  <span
                    className={`reveal reveal-hero ${ready ? "is-visible" : ""}`}
                    style={{ ["--reveal-delay" as any]: "1650ms" }}
                  >
                    Real-time.
                  </span>
                  <span
                    className={`reveal reveal-hero ${ready ? "is-visible" : ""}`}
                    style={{ ["--reveal-delay" as any]: "2500ms" }}
                  >
                    Adaptive.
                  </span>
                  <span
                    className={`reveal reveal-hero ${ready ? "is-visible" : ""}`}
                    style={{ ["--reveal-delay" as any]: "3350ms" }}
                  >
                    Power-efficient.
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToContent}
        aria-label="Scroll to explore"
        className={`mx-auto mt-10 flex flex-col items-center gap-4 transition-all duration-1000 max-md:absolute max-md:bottom-5 max-md:left-1/2 max-md:z-[2] max-md:mt-0 max-md:-translate-x-1/2 md:mt-12 ${
          showCue
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-primary/60">
          Scroll to explore
        </span>
        <span className="relative flex h-14 w-px items-start justify-center overflow-hidden rounded-full bg-white/15">
          <span className="scroll-line absolute top-0 h-5 w-px rounded-full bg-accent/90" />
        </span>
      </button>
    </section>
  );
}

function useHeroVideoSources() {
  const [sources, setSources] = useState<{
    webm: string;
    mp4: string;
    preload: "auto" | "metadata";
  } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const pick = () => {
      const mobile = mq.matches;
      setSources(
        mobile
          ? {
              webm: "/assets/hero-bg-mobile.webm?v=4",
              mp4: "/assets/hero-bg-mobile.mp4?v=4",
              preload: "metadata",
            }
          : {
              webm: "/assets/hero-bg.webm?v=4",
              mp4: "/assets/hero-bg-fallback.mp4?v=4",
              preload: "auto",
            },
      );
    };
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  return sources;
}

const HERO_VIDEO_END_TRIM_SEC = 1;

function HeroBackdrop() {
  const sources = useHeroVideoSources();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let stopped = false;
    let frameId = 0;

    const lockBeforeEnd = () => {
      if (stopped) return;

      const { duration, currentTime } = video;
      if (!Number.isFinite(duration) || duration <= HERO_VIDEO_END_TRIM_SEC) return;

      const endAt = duration - HERO_VIDEO_END_TRIM_SEC;
      if (currentTime < endAt - 0.04) return;

      stopped = true;
      video.pause();

      // Only seek back if we overshot — avoids a visible hitch on a clean stop.
      if (currentTime > endAt + 0.02) {
        video.currentTime = endAt;
      }
    };

    const watchFrame = () => {
      lockBeforeEnd();
      if (!stopped) {
        if ("requestVideoFrameCallback" in video) {
          frameId = video.requestVideoFrameCallback(() => watchFrame());
        } else {
          frameId = window.requestAnimationFrame(watchFrame);
        }
      }
    };

    const onPlay = () => {
      stopped = false;
      watchFrame();
    };

    const onEnded = (event: Event) => {
      event.preventDefault();
      lockBeforeEnd();
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("timeupdate", lockBeforeEnd);
    video.addEventListener("ended", onEnded);
    if (!video.paused) onPlay();

    return () => {
      if ("cancelVideoFrameCallback" in video) {
        video.cancelVideoFrameCallback(frameId);
      } else {
        window.cancelAnimationFrame(frameId);
      }
      video.removeEventListener("play", onPlay);
      video.removeEventListener("timeupdate", lockBeforeEnd);
      video.removeEventListener("ended", onEnded);
    };
  }, [sources?.mp4]);

  return (
    <div
      aria-hidden
      className="pointer-events-none relative bg-[#0a0b0d] max-md:absolute max-md:inset-0 max-md:h-full max-md:w-full"
    >
      {sources ? (
        <video
          ref={videoRef}
          key={sources.mp4}
          autoPlay
          muted
          playsInline
          preload={sources.preload}
          className="w-full bg-black object-cover max-md:h-full max-md:min-h-[100svh] md:aspect-video"
        >
          <source src={sources.mp4} type="video/mp4" />
          <source src={sources.webm} type="video/webm" />
        </video>
      ) : (
        <div className="w-full bg-[#0a0b0d] max-md:min-h-[100svh] md:aspect-video" />
      )}
    </div>
  );
}

function ChapterLabel({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-10 flex items-center gap-4 md:mb-14">
      <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
        {number}
      </span>
      <div className="chapter-line w-12 md:w-20" />
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">
        {title}
      </span>
    </div>
  );
}

function ProofDemoVideo({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!active) {
      video.pause();
      video.currentTime = 0;
      setPlaying(false);
    }
  }, [active]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (video.ended) {
        video.currentTime = 0;
      }
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <div
      className={`reveal mx-auto mb-12 w-full max-w-[900px] md:mb-16 ${active ? "is-visible" : ""}`}
      style={{ ["--reveal-delay" as any]: "200ms" }}
    >
      <div className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0b0d] shadow-[0_0_72px_color-mix(in_srgb,var(--color-logo-mid)_10%,transparent)]">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="aspect-video w-full bg-black object-cover"
          src="/assets/website-demo.mp4?v=3"
        />

        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause demo" : "Play demo"}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            playing
              ? "bg-transparent opacity-0 group-hover:bg-black/25 group-hover:opacity-100"
              : "bg-black/35 opacity-100"
          }`}
        >
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#0a0b0d]/80 backdrop-blur-sm transition-all duration-300 md:h-16 md:w-16 ${
              playing ? "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100" : "glow-button scale-100"
            }`}
          >
            {playing ? (
              <span className="flex gap-1">
                <span className="h-5 w-1 rounded-full bg-fg-primary" />
                <span className="h-5 w-1 rounded-full bg-fg-primary" />
              </span>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="ml-0.5 h-5 w-5 fill-fg-primary"
                aria-hidden
              >
                <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.02-7.36a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
              </svg>
            )}
          </span>
        </button>
      </div>
      <p className="mt-3 max-w-[320px] font-mono text-[10px] uppercase leading-[1.6] tracking-[0.16em] text-fg-tertiary md:max-w-none">
        Recorded on hardware — No CPU, GPU, or cloud in the loop
      </p>
    </div>
  );
}

function ProofChapter() {
  const section = useInViewOnce<HTMLElement>({ threshold: 0.12 });
  const outcomes = [
    {
      value: "Real-time",
      detail: "Continuous response at the edge — not after the cloud returns.",
    },
    {
      value: "Zero jitter",
      detail: "Deterministic. No OS, No CPU, No GPU.",
    },
    {
      value: "100% lock",
      detail: "Sustained acquisition on high-speed vision — proven on hardware.",
    },
    {
      value: "Fractional power",
      detail: "Edge-native intelligence. Fraction of the energy. No inference tax.",
    },
  ];

  return (
    <section
      ref={section.ref as React.RefObject<HTMLElement>}
      className="relative border-t border-white/[0.06] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <ChapterLabel number="02" title="Proven" />

        <div
          className={`reveal mb-16 max-w-[640px] ${section.visible ? "is-visible" : ""}`}
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.08] tracking-[-0.03em] text-fg-primary">
            We ran it on hardware.
            <br />
            <span className="text-fg-secondary">This is what happened.</span>
          </h2>
        </div>

        <div className="mb-12 grid gap-px overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.04] md:mb-16 md:grid-cols-2">
          {outcomes.map((o, i) => (
            <div
              key={o.value}
              className={`reveal group bg-[#0a0b0d] p-8 transition-colors duration-500 hover:bg-[#12141a] md:p-10 ${section.visible ? "is-visible" : ""}`}
              style={{ ["--reveal-delay" as any]: `${i * 100 + 80}ms` }}
            >
              <div className="mb-4 font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-normal tracking-[-0.02em] text-gradient-logo">
                {o.value}
              </div>
              <p className="max-w-[360px] text-[14px] leading-[1.7] text-fg-secondary">
                {o.detail}
              </p>
            </div>
          ))}
        </div>

        <ProofDemoVideo active={section.visible} />
      </div>
    </section>
  );
}

function BeliefChapter() {
  const section = useInViewOnce<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="intro"
      ref={section.ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-[85svh] items-center border-t border-white/[0.06] px-6 py-24 md:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,color-mix(in_srgb,var(--color-logo-mid)_8%,transparent),transparent)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <ChapterLabel number="01" title="Belief" />

        <div className={`reveal max-w-[1100px] ${section.visible ? "is-visible" : ""}`}>
          <blockquote className="text-[clamp(2.25rem,6.5vw,4.75rem)] font-light leading-[1.08] tracking-[-0.035em] text-fg-primary">
            The next leap in intelligent systems won&rsquo;t come from bigger
            models alone.
          </blockquote>
          <p
            className={`reveal mt-12 max-w-[640px] text-[clamp(1.125rem,2.4vw,1.5rem)] leading-[1.7] text-fg-secondary md:mt-14 ${section.visible ? "is-visible" : ""}`}
            style={{ ["--reveal-delay" as any]: "200ms" }}
          >
            It will come from architectures that respond where it matters — at
            the edge, in real time, in the physical world.
          </p>
        </div>
      </div>
    </section>
  );
}

function PilotsChapter() {
  const section = useInViewOnce<HTMLElement>({ threshold: 0.1 });
  const pilots = [
    {
      index: "I",
      title: "Tactile sensing",
      line: "Sensor integration as the first step toward a unified edge platform.",
    },
    {
      index: "II",
      title: "Space & vision",
      line: "Event-based camera integration for real-time edge tracking.",
    },
    {
      index: "III",
      title: "Deep tech",
      line: "In conversation with global innovation leaders for what comes next.",
    },
  ];

  return (
    <section
      ref={section.ref as React.RefObject<HTMLElement>}
      className="border-t border-white/[0.06] bg-[#0e1014] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center text-center">
        <div className="mb-10 flex w-full max-w-[640px] items-center justify-center gap-4 md:mb-14">
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
            03
          </span>
          <div className="chapter-line w-12 md:w-20" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">
            Pilots
          </span>
        </div>

        <div
          className={`reveal mx-auto mb-16 max-w-[560px] ${section.visible ? "is-visible" : ""}`}
        >
          <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-light leading-[1.1] tracking-[-0.03em] text-fg-primary">
            Already in the room.
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.7] text-fg-secondary">
            Active conversations with leaders across robotics, sensing, and
            deep technology — without naming names.
          </p>
        </div>

        <div className="w-full max-w-[560px] space-y-0">
          {pilots.map((p, i) => (
            <div
              key={p.title}
              className={`reveal group border-t border-white/[0.06] py-10 md:py-12 ${section.visible ? "is-visible" : ""}`}
              style={{ ["--reveal-delay" as any]: `${i * 120}ms` }}
            >
              <div className="font-mono text-[12px] tracking-[0.15em] text-accent/80">
                {p.index}
              </div>
              <h3 className="mt-4 text-[20px] font-medium tracking-[-0.02em] text-fg-primary md:text-[22px]">
                {p.title}
              </h3>
              <p className="mx-auto mt-2 max-w-[520px] text-[15px] leading-[1.65] text-fg-secondary transition-colors duration-300 group-hover:text-fg-primary/80">
                {p.line}
              </p>
            </div>
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>
      </div>
    </section>
  );
}

function ContactChapter({ onRequestAccess }: { onRequestAccess: () => void }) {
  const section = useInViewOnce<HTMLElement>({ threshold: 0.25 });
  const roadmap = [
    {
      period: "2026 · Q2",
      title: "Integration with High FPS cameras",
      completed: true,
    },
    {
      period: "2026 · Q3",
      title: "Integration with Event Based Visual cameras",
    },
    {
      period: "2026 · Q4",
      title: "Integration with High Fidelity tactile sensors",
    },
    {
      period: "2027 · Q1",
      title: "Sensor Fusion — Multi-stream sensors",
    },
  ];

  return (
    <section
      id="contact"
      ref={section.ref as React.RefObject<HTMLElement>}
      className="film-grain relative flex min-h-[70svh] items-center overflow-hidden border-t border-white/[0.06] px-6 py-24 md:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_100%,color-mix(in_srgb,var(--color-logo-bottom)_15%,transparent),transparent)]"
      />

      <div
        className={`reveal relative mx-auto flex w-full max-w-[1400px] flex-col items-center text-center ${section.visible ? "is-visible" : ""}`}
      >
        <div className="mb-10 flex w-full max-w-[640px] items-center justify-center gap-4 md:mb-14">
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
            04
          </span>
          <div className="chapter-line w-12 md:w-20" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">
            Roadmap
          </span>
        </div>

        <h2 className="mx-auto max-w-[700px] text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.035em] text-fg-primary">
          Mapping the{" "}
          <span className="text-gradient-logo">path forward.</span>
        </h2>

        <ol className="relative mx-auto mt-12 w-full max-w-[560px] text-left md:mt-14">
          <span
            aria-hidden
            className="absolute bottom-6 left-0 top-6 w-px bg-white/[0.08] md:bottom-8 md:top-8"
          />
          {roadmap.map((item, i) => (
            <li
              key={item.period}
              className={`reveal relative py-5 pl-8 md:py-6 md:pl-10 ${section.visible ? "is-visible" : ""}`}
              style={{ ["--reveal-delay" as any]: `${i * 100 + 120}ms` }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-7 h-2 w-2 -translate-x-1/2 rounded-full bg-accent md:top-8"
              />
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                <span>{item.period}</span>
                {item.completed ? (
                  <span
                    className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent/15"
                    aria-label="Completed"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="h-2.5 w-2.5 stroke-accent"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M2.5 6l2.5 2.5 4.5-4.5" />
                    </svg>
                  </span>
                ) : null}
              </p>
              <p className="mt-2 text-[16px] leading-[1.6] text-fg-primary md:text-[17px]">
                {item.title}
              </p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-[440px] text-[16px] leading-[1.7] text-fg-secondary md:mt-12">
          Selectively engaging aligned partners and investors.
        </p>

        <button
          type="button"
          onClick={onRequestAccess}
          className="glow-button mt-10 rounded-full bg-accent px-10 py-4 text-[14px] font-medium text-fg-inverse transition-colors duration-300 hover:bg-accent-hover"
        >
          Request Access
        </button>
      </div>
    </section>
  );
}

function AntlerPortfolio({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-tertiary">
        Antler portfolio company
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/antler-wordmark.png"
        alt="Antler"
        width={320}
        height={80}
        decoding="async"
        className="h-7 w-auto max-w-[132px] object-contain opacity-90 md:h-8 md:max-w-[152px]"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-3 flex h-8 items-center gap-2">
            <img
              src="/assets/logo-hinoki-tree.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 origin-left -ml-2 scale-110 object-contain"
            />
            <span className="text-[14px] font-medium text-fg-primary">
              Hinoki Technologies
            </span>
          </div>
          <p className="text-[12px] text-fg-tertiary">
            Neuromorphic Edge AI · Tsukuba, Japan
          </p>
        </div>

        <AntlerPortfolio className="flex flex-col md:items-end" />
      </div>

      <div className="mx-auto mt-10 max-w-[1400px] border-t border-white/[0.06] pt-6 text-[11px] text-fg-tertiary">
        © {new Date().getFullYear()} Hinoki Technologies
      </div>
    </footer>
  );
}
