"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

// The logo's link home. On the home page itself, a router link to "/" points
// at the page you're already on and does nothing, so there it scrolls back to
// the top instead (smoothly, or at once under reduced motion, per the page's
// scroll-behavior) and drops any #section from the address (Sal, 2026-11-05:
// after scrolling down, the logo "no longer brings to a home position").
// Clicks that open a new tab or window are left to the browser.
export function HomeLink({ className, children }: { className?: string; children: ReactNode }) {
  const pathname = usePathname();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/" || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (window.location.hash) window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0 });
  };

  return (
    <Link href="/" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
