"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteCopy } from "@/content/site.en";
import { cn } from "@/lib/utils";
import { HomeLink } from "./HomeLink";
import { HeaderLogo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

// The live site's nav: clear over the hero, frosted once the page scrolls.
// `current` is the href of the page being shown, marked in the nav.
export function Header({ nav, current }: { nav: SiteCopy["nav"]; current?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // Fades in with the page's opening (globals.css, .intro-fade).
        "intro-fade fixed inset-x-0 top-0 z-[100] border-b transition-all duration-500",
        scrolled ? "border-line bg-ground/90 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-6 md:px-10">
        <HomeLink className="flex items-center">
          <HeaderLogo />
        </HomeLink>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.href === current ? "page" : undefined}
                  className="text-[13px] tracking-[0.01em] text-fg-secondary transition-colors duration-300 hover:text-fg-primary aria-[current=page]:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href={nav.cta.href}
            className="rounded-full border border-edge bg-tint px-5 py-2 text-[12px] font-medium tracking-[0.02em] text-fg-primary transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
          >
            {nav.cta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
