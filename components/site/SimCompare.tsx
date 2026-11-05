"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ComparePlayer, type CompareClip, type PlayerHandle, type PlayerState, type Run } from "./ComparePlayer";
import { CAPTION, FIGURE } from "./ProofMedia";

// The blind-corner simulation, run twice: without Hinoki (camera + AI + LiDAR)
// and with it. The expanded view is the same player, larger, and hands its
// run and position back when it closes.
export function SimCompare({
  chip,
  note,
  title,
  caption,
  labels,
  runs,
  duration,
  className,
}: {
  chip: string;
  note?: string;
  title: string;
  caption: string;
  labels: Record<Run, string>;
  runs: Record<Run, CompareClip>;
  duration: number;
  className?: string;
}) {
  const inlineRef = useRef<PlayerHandle>(null);
  const largeRef = useRef<PlayerHandle>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState<PlayerState | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (expanded && !dialog.open) dialog.showModal();
    if (!expanded && dialog.open) dialog.close();
  }, [expanded]);

  const expand = () => {
    const state = inlineRef.current?.getState();
    if (!state) return;
    inlineRef.current?.setState({ ...state, playing: false });
    setExpanded({ ...state, playing: true });
  };

  const collapse = () => {
    const state = largeRef.current?.getState();
    if (state) inlineRef.current?.setState({ ...state, playing: false });
    setExpanded(null);
  };

  return (
    <figure className={cn(FIGURE, className)}>
      <ComparePlayer
        ref={inlineRef}
        chip={chip}
        note={note}
        title={title}
        labels={labels}
        runs={runs}
        duration={duration}
        onExpand={expand}
      />

      <figcaption className={CAPTION}>
        <span className="block text-[17px] font-medium tracking-[-0.01em] text-fg-primary">{title}</span>
        <span className="mt-1.5 block text-[14px] leading-[1.65] text-fg-secondary">{caption}</span>
      </figcaption>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onClose={collapse}
        onClick={(e) => {
          if (e.target === e.currentTarget) collapse();
        }}
        className="stay-dark m-auto w-[min(94vw,1600px)] max-w-none overflow-hidden rounded-xl border border-edge bg-transparent p-0 text-fg-primary backdrop:bg-[#0a0b0d]/90 backdrop:backdrop-blur-sm"
      >
        {expanded ? (
          <ComparePlayer
            ref={largeRef}
            chip={chip}
            note={note}
            title={title}
            labels={labels}
            runs={runs}
            duration={duration}
            initial={expanded}
            size="large"
            onClose={collapse}
          />
        ) : null}
      </dialog>
    </figure>
  );
}
