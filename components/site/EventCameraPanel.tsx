"use client";

import { useState } from "react";
import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell, CellBar } from "./Cell";

type Mode = "event" | "frame";

const MODES: Mode[] = ["event", "frame"];

// The interactive event-camera instrument. The canvas itself is ported from
// hinoki-site-reference.html once that file arrives; its 16:10 box is
// reserved now so nothing shifts when it paints.
export function EventCameraPanel({ copy }: { copy: SiteCopy["hero"] }) {
  const [mode, setMode] = useState<Mode>("event");

  return (
    <section aria-label={copy.toggle.event} className="mt-px">
      <Bento>
        <Cell className="md:col-span-4 lg:col-span-8">
          <CellBar>
            <div role="group" aria-label="Camera view" className="flex gap-1">
              {MODES.map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => setMode(m)}
                  className={`h-8 rounded-[2px] border px-3 font-label text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 ${
                    mode !== m
                      ? "border-white/[0.08] text-muted hover:text-ink"
                      : m === "event"
                        ? "border-accent/30 bg-accent/10 text-accent"
                        : "border-white/[0.16] bg-white/[0.06] text-ink"
                  }`}
                >
                  {copy.toggle[m]}
                </button>
              ))}
            </div>
          </CellBar>
          <div className="relative aspect-[16/10] bg-ground bg-[linear-gradient(rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-[size:48px_48px]">
            <p className="absolute inset-0 m-auto h-fit w-fit bg-ground px-3 py-2 font-label text-[10px] uppercase tracking-[0.16em] text-faint">
              Illustration · ported from reference file
            </p>
          </div>
          <p
            aria-live="polite"
            className="border-t border-white/[0.06] px-5 py-4 font-label text-[10px] uppercase tracking-[0.08em] text-muted md:px-6"
          >
            {mode === "event"
              ? copy.readout.event.replace("{n}", "—")
              : copy.readout.frame}
          </p>
        </Cell>

        <Cell className="flex flex-col justify-end gap-5 p-6 md:col-span-2 md:p-8 lg:col-span-4">
          <p className="font-label text-[10px] uppercase tracking-[0.18em] text-accent">
            {copy.toggle.event}
          </p>
          <p className="text-[15px] leading-[1.7] text-muted">{copy.caption}</p>
        </Cell>
      </Bento>
    </section>
  );
}
