"use client";

import { useEffect, useState, type RefObject } from "react";
import { useNear } from "./useNear";

// Clips load before they're pressed, so play starts at once (Sal, 2026-11-05:
// "delays on hitting play"). They wait until the page has finished loading,
// so they never compete with its first paint. Visitors with Data Saver on, or
// on a 2G/3G connection, keep the old behavior: a clip loads when pressed.
export function canWarm() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !(c?.saveData || /2g|3g/.test(c?.effectiveType ?? ""));
}

// Runs `then` once the page has loaded and the browser has a quiet moment.
// Returns a function that cancels it.
export function afterLoad(then: () => void) {
  let timer = 0;
  let idle = 0;
  const go = () => {
    timer = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(then, { timeout: 2000 });
      else then();
    }, 600);
  };
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
  return () => {
    window.removeEventListener("load", go);
    window.clearTimeout(timer);
    if (idle) window.cancelIdleCallback(idle);
  };
}

// True once a clip should start loading: it's near the screen, the page has
// loaded and the connection can take it. It stays true.
export function useWarm(ref: RefObject<Element | null>) {
  const near = useNear(ref);
  const [warm, setWarm] = useState(false);

  useEffect(() => {
    if (!near || warm || !canWarm()) return;
    return afterLoad(() => setWarm(true));
  }, [near, warm]);

  return warm;
}
