"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// The live site's "Scroll to explore" cue: an orange line drifting down a
// hairline track. It fades away once the page moves.
export function ScrollCue({ target, className }: { target: string; className?: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY < 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = () => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(target)?.scrollIntoView({ behavior: still ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scroll}
      aria-label="Scroll to explore"
      className={cn(
        "flex flex-col items-center gap-4 transition-all duration-1000",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        className,
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-primary/60">
        Scroll to explore
      </span>
      <span className="relative flex h-14 w-px items-start justify-center overflow-hidden rounded-full bg-edge-strong">
        <span className="scroll-line absolute top-0 h-5 w-px rounded-full bg-accent/90" />
      </span>
    </button>
  );
}
