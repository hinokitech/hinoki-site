"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ComparePlayer, type CompareClip, type PlayerHandle, type PlayerState, type Run } from "./ComparePlayer";
import { FIGURE } from "./ProofMedia";

// The blind-corner simulation, run twice: without Hinoki (camera + AI + LiDAR)
// and with it. The expanded view is the same player, larger, and hands its
// run and position back when it closes.
export function SimCompare({
  chip,
  title,
  caption,
  labels,
  runs,
  duration,
  className,
}: {
  chip: string;
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
        title={title}
        labels={labels}
        runs={runs}
        duration={duration}
        playWhenVisible
        onExpand={expand}
      />

      <figcaption className="mt-auto border-t border-white/[0.06] p-5 md:p-6">
        <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</span>
        <span className="mt-2 block text-[14px] leading-[1.6] text-muted">{caption}</span>
      </figcaption>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onClose={collapse}
        onClick={(e) => {
          if (e.target === e.currentTarget) collapse();
        }}
        className="m-auto w-[min(94vw,1600px)] max-w-none border border-white/[0.08] bg-transparent p-0 text-ink backdrop:bg-ground/90 backdrop:backdrop-blur-sm"
      >
        {expanded ? (
          <ComparePlayer
            ref={largeRef}
            chip={chip}
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
