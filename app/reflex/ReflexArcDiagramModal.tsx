"use client";

import { useEffect, useId } from "react";
import { ReflexArcDiagram } from "./ReflexArcDiagram";

export function ReflexArcDiagramModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[210]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-0 overflow-y-auto p-3 sm:p-6 md:px-10 md:py-10">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="mx-auto w-full max-w-[1240px] rounded-lg border border-border bg-bg-base shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
            <p className="min-w-0 pr-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              Spinal Reflex Arc
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-bg-base text-fg-secondary transition-colors duration-200 hover:bg-bg-subtle hover:text-fg-primary"
              aria-label="Close diagram"
            >
              ×
            </button>
          </div>

          <div className="px-3 py-4 sm:px-5 sm:py-6 md:px-6 md:py-8">
            <ReflexArcDiagram variant="full" labelledBy={titleId} />
          </div>
        </div>
      </div>
    </div>
  );
}
