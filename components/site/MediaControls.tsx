"use client";

import { useEffect, useRef } from "react";

export const stamp = (t: number) =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}.${String(
    Math.floor((t % 1) * 100),
  ).padStart(2, "0")}`;

// Round, like the live site's play button and pills.
const ICON_BUTTON =
  "flex size-8 items-center justify-center rounded-full border border-edge bg-ground/70 text-fg-secondary backdrop-blur-sm transition-colors duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent";

export function PlayToggle({
  playing,
  title,
  onClick,
}: {
  playing: boolean;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${playing ? "Pause" : "Play"}: ${title}`}
      className={ICON_BUTTON}
    >
      {playing ? (
        <span aria-hidden className="flex gap-[3px]">
          <span className="h-2.5 w-[2px] rounded-full bg-current" />
          <span className="h-2.5 w-[2px] rounded-full bg-current" />
        </span>
      ) : (
        <span
          aria-hidden
          className="ml-0.5 size-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-current"
        />
      )}
    </button>
  );
}

export function ExpandButton({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={`Expand: ${title}`} className={ICON_BUTTON}>
      <svg aria-hidden viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M1 4.5V1h3.5M11 4.5V1H7.5M1 7.5V11h3.5M11 7.5V11H7.5" />
      </svg>
    </button>
  );
}

// Full-size view of a clip with native controls. Built on <dialog>, so focus
// handling, Escape and the backdrop come from the browser. The video only
// exists while open, so nothing loads until someone asks for it.
export function VideoLightbox({
  open,
  src,
  title,
  startAt,
  onClose,
}: {
  open: boolean;
  src: string;
  title: string;
  startAt: number;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="stay-dark m-auto w-[min(94vw,1600px)] max-w-none overflow-hidden rounded-xl border border-edge bg-[#0a0b0d] p-0 text-fg-primary backdrop:bg-[#0a0b0d]/90 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-secondary">{title}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-edge px-4 py-1.5 text-[12px] font-medium text-fg-secondary transition-colors duration-300 hover:border-accent/40 hover:text-accent"
        >
          Close
        </button>
      </div>
      {open ? (
        <video
          key={src}
          src={src}
          controls
          autoPlay
          muted
          playsInline
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = startAt;
          }}
          className="block max-h-[82vh] w-full bg-[#0a0b0d]"
        />
      ) : null}
    </dialog>
  );
}
