import React from "react";

export const MICRO_LABEL_CLASS =
  "font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-fg-tertiary";

export function MicroLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`${MICRO_LABEL_CLASS} ${className}`}>{children}</span>
  );
}

export const PER_UNIT_ROYALTY_RANGE = "¥45,000–¥75,000/unit";

export const MODEL_ASSUMPTIONS_LINE =
  "Model: ¥45–75K/unit (~1–2% of unit value) · ~50K units/partner/yr · ~700K addressable shipments/yr · ~90% royalty margin · 15–20× revenue multiple";
