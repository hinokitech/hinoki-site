"use client";

import { useSyncExternalStore } from "react";

// A real live value, not mock telemetry: the current time in Tsukuba.
const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Tokyo",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

const now = () => format.format(new Date());
const placeholder = () => "--:--:--";

export function TsukubaClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, now, placeholder);
  return (
    <time suppressHydrationWarning className={className}>
      {time}
    </time>
  );
}
