"use client";

import { useState } from "react";
import type { SiteCopy } from "@/content/site.en";

type Mode = "event" | "frame";

const MODES: Mode[] = ["event", "frame"];

export function EventCameraPanel({
  toggle,
  readout,
  caption,
}: Pick<SiteCopy["hero"], "toggle" | "readout" | "caption">) {
  const [mode, setMode] = useState<Mode>("event");

  return (
    <figure>
      {/* The 16:10 box is reserved up front so the canvas can't shift layout. */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] border border-line bg-panel">
        <PendingIllustration />
      </div>

      <div className="mt-4 flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Camera view"
          className="flex rounded-[2px] border border-line-strong p-1"
        >
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`min-h-9 flex-1 rounded-[1px] px-4 font-label text-[10px] uppercase tracking-[0.1em] transition-colors sm:flex-none ${
                mode !== m
                  ? "text-muted hover:text-ink"
                  : m === "event"
                    ? "bg-accent text-accent-ink"
                    : "bg-line-strong text-ink"
              }`}
            >
              {toggle[m]}
            </button>
          ))}
        </div>

        <p
          aria-live="polite"
          className="font-label text-[10px] uppercase leading-5 tracking-[0.08em] text-muted sm:text-right"
        >
          {mode === "event" ? readout.event.replace("{n}", "—") : readout.frame}
        </p>
      </div>

      <figcaption className="mt-4 max-w-[68ch] text-[13px] leading-[1.6] text-faint">
        {caption}
      </figcaption>
    </figure>
  );
}

// Stand-in until the canvas is ported from hinoki-site-reference.html (step 3).
function PendingIllustration() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-[size:48px_48px]">
      <p className="bg-panel px-3 py-2 font-label text-[10px] uppercase tracking-[0.16em] text-faint">
        Illustration · ported from reference file
      </p>
    </div>
  );
}
