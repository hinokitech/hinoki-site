"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const KEY = "hinoki-theme";

const site = () => document.querySelector<HTMLElement>(".site");
const read = (): Theme => (site()?.getAttribute("data-site-theme") === "light" ? "light" : "dark");
const apply = (theme: Theme) => site()?.setAttribute("data-site-theme", theme);

// The visitor's switch, for this visit only: each new visit opens in the
// device's setting (Sal, 2026-11-05).
function stored(): Theme | null {
  try {
    const value = sessionStorage.getItem(KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

// Follows the attribute the layout's script sets, so the button always
// matches what is on screen.
function subscribe(onChange: () => void) {
  const el = site();
  if (!el) return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(el, { attributes: true, attributeFilter: ["data-site-theme"] });
  return () => observer.disconnect();
}

// Switches the homepage between its dark and light themes for the rest of
// the visit. Until someone switches, the page follows the device setting,
// even when it changes. The icons swap in CSS, so they are right before
// hydration.
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, () => null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const follow = () => {
      if (!stored()) apply(query.matches ? "light" : "dark");
    };
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, []);

  const toggle = () => {
    const next: Theme = read() === "light" ? "dark" : "light";
    try {
      sessionStorage.setItem(KEY, next);
    } catch {
      // Storage blocked: the switch still works on this page.
    }
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!still && "startViewTransition" in document) document.startViewTransition(() => apply(next));
    else apply(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Light mode"
      aria-pressed={theme === null ? undefined : theme === "light"}
      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-edge bg-tint text-fg-secondary transition-colors duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
    >
      {/* Sun while dark (go light), moon while light (go dark). */}
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="size-4 light:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="hidden size-4 light:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      >
        <path d="M13.5 9.6A5.75 5.75 0 0 1 6.4 2.5a5.75 5.75 0 1 0 7.1 7.1Z" />
      </svg>
    </button>
  );
}
