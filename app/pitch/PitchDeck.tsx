"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SLIDES as DEFAULT_SLIDES } from "./slides";
import DefaultMobileDeck from "./mobile";

/** Prefer CSS `zoom` over `transform: scale()` — the transform path re-samples
 *  raster content (photos) and reads as softness / “artifacts” at deck scale.
 *  Chromium/Edge/Safari support `zoom`; Firefox falls back to transform. */
function useCssZoomSupported() {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    setSupported("zoom" in document.documentElement.style);
  }, []);
  return supported;
}

export type PitchDeckProps = {
  /** Optional slide manifest. Defaults to the English deck. */
  slides?: Array<() => React.JSX.Element>;
  /** Optional mobile deck override. Defaults to the English mobile deck. */
  mobileDeck?: React.ComponentType;
  /** Optional language toggle (renders top-right). */
  altLang?: { href: string; label: string };
  /** Hint string shown bottom-left on slide 1 (varies by language). */
  navHint?: string;
};

export default function PitchDeck({
  slides = DEFAULT_SLIDES,
  mobileDeck: MobileDeck = DefaultMobileDeck,
  altLang,
  navHint = "← → to navigate · F for fullscreen",
}: PitchDeckProps) {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const cssZoomSupported = useCssZoomSupported();
  const [isMobile, setIsMobile] = useState(false);
  const [nativeScale, setNativeScale] = useState(false);

  useEffect(() => {
    function recompute() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const params = new URLSearchParams(window.location.search);
      const native = params.has("native");
      setNativeScale(native);

      const sx = window.innerWidth / 1920;
      const sy = window.innerHeight / 1080;
      // Desktop: fit full slide in view.
      // Mobile: prioritize legibility by fitting width only; allow vertical scroll.
      const raw = mobile ? sx : Math.min(sx, sy);

      // Scaling raster content by arbitrary factors (e.g. 0.8732) can produce
      // visible edge artifacts. Snap to a small increment for cleaner sampling.
      // 1/64 gives a good balance between fit and fidelity.
      const snapped = Math.max(0.1, Math.round(raw * 64) / 64);

      setScale(native ? 1 : snapped);
    }
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowDown" ||
        e.key === " " ||
        e.key === "PageDown"
      ) {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, slides.length - 1));
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowUp" ||
        e.key === "PageUp"
      ) {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Home") {
        setIndex(0);
      } else if (e.key === "End") {
        setIndex(slides.length - 1);
      } else if (e.key.toLowerCase() === "f") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const Slide = slides[index];

  if (isMobile) {
    return <MobileDeck />;
  }

  return (
    <main
      className={`fixed inset-0 bg-bg-base ${
        nativeScale ? "overflow-auto" : "overflow-hidden"
      }`}
    >
      <div
        className={`${
          nativeScale
            ? "flex min-h-full min-w-full items-start justify-center p-8"
            : "flex h-full w-full items-center justify-center"
        }`}
      >
      <div
        style={
          cssZoomSupported
            ? {
                width: 1920,
                height: 1080,
                zoom: scale,
              }
            : {
                width: 1920,
                height: 1080,
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }
        }
        className="relative shrink-0 bg-bg-base"
      >
        <Slide />
      </div>
      </div>

      {altLang && (
        <Link
          href={altLang.href}
          className="fixed right-7 top-6 rounded-md border border-border bg-bg-subtle px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-secondary transition-colors hover:border-accent hover:text-accent"
        >
          {altLang.label}
        </Link>
      )}

      <div className="pointer-events-none fixed bottom-6 right-7 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary">
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

      {index === 0 && (
        <div className="pointer-events-none fixed bottom-6 left-7 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary">
          {navHint}
        </div>
      )}
    </main>
  );
}
