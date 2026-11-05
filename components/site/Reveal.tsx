"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// The live site's slow fade-up. When this block scrolls into view (or, for the
// hero, `afterMs` after the page loads), every .reveal inside it rises into
// place, each after its own --reveal-delay.
export function Reveal({
  afterMs,
  className,
  children,
}: {
  afterMs?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (afterMs !== undefined) {
      const id = window.setTimeout(() => setVisible(true), afterMs);
      return () => window.clearTimeout(id);
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [afterMs]);

  return (
    <div ref={ref} className={cn(className, visible && "is-visible")}>
      {children}
    </div>
  );
}
