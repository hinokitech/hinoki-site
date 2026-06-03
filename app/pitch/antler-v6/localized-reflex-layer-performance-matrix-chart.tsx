import React from "react";

/** Vector chart for slide 12 — inline SVG stays sharp at any display scale. */
export function LocalizedReflexLayerPerformanceMatrixChart({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1640 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Localized reflex layer performance comparison matrix"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="1640" height="520" rx="12" fill="#1c1f26" />

      <text
        x="40"
        y="52"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        letterSpacing="0.14em"
      >
        PHASE / METRIC
      </text>
      <text
        x="430"
        y="52"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        letterSpacing="0.14em"
      >
        STANDARD EDGE CPU / GPU STACK
      </text>
      <text
        x="820"
        y="52"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        letterSpacing="0.14em"
      >
        ARC LOCALIZED FABRIC TARGET
      </text>
      <text
        x="1180"
        y="52"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        letterSpacing="0.14em"
      >
        THE BARE-METAL ADVANTAGE
      </text>
      <line
        x1="40"
        y1="72"
        x2="1600"
        y2="72"
        stroke="rgba(247, 244, 239, 0.14)"
        strokeWidth="1"
      />

      <text
        x="40"
        y="118"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="500"
      >
        1. Core Compute Speed
      </text>
      <text
        x="40"
        y="142"
        fill="rgba(247, 244, 239, 0.72)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontStyle="italic"
      >
        (Raw ESN Matrix Math)
      </text>
      <text
        x="430"
        y="132"
        fill="rgba(247, 244, 239, 0.88)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
      >
        2.0 to 5.0 ms
      </text>
      <text
        x="820"
        y="124"
        fill="#e8622a"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
      >
        {"< 0.05 ms"}
      </text>
      <text
        x="820"
        y="148"
        fill="rgba(247, 244, 239, 0.72)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontStyle="italic"
      >
        (50 µs)
      </text>
      <text
        x="1180"
        y="124"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
      >
        100× Faster Compute
      </text>
      <text
        x="1180"
        y="148"
        fill="rgba(247, 244, 239, 0.62)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontStyle="italic"
      >
        (UltraScale+ execution)
      </text>
      <line
        x1="40"
        y1="172"
        x2="1600"
        y2="172"
        stroke="rgba(247, 244, 239, 0.14)"
        strokeWidth="1"
      />

      <text
        x="40"
        y="218"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="500"
      >
        2. System / OS Overhead
      </text>
      <text
        x="40"
        y="242"
        fill="rgba(247, 244, 239, 0.72)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontStyle="italic"
      >
        (Drivers, Kernels, Thread Queues)
      </text>
      <text
        x="430"
        y="232"
        fill="rgba(247, 244, 239, 0.88)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
      >
        18.0 to 35.0 ms
      </text>
      <text
        x="820"
        y="224"
        fill="#e8622a"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
      >
        0.00 ms
      </text>
      <text
        x="820"
        y="248"
        fill="rgba(247, 244, 239, 0.72)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontStyle="italic"
      >
        (Bypassed)
      </text>
      <text
        x="1180"
        y="224"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
      >
        Eliminated Entirely
      </text>
      <text
        x="1180"
        y="248"
        fill="rgba(247, 244, 239, 0.62)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontStyle="italic"
      >
        (No Operating System)
      </text>
      <line
        x1="40"
        y1="272"
        x2="1600"
        y2="272"
        stroke="rgba(247, 244, 239, 0.14)"
        strokeWidth="1"
      />

      <text
        x="40"
        y="318"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="500"
      >
        Total End-to-End Latency
      </text>
      <text
        x="430"
        y="322"
        fill="rgba(247, 244, 239, 0.88)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
      >
        20.0 to 40.0 ms
      </text>
      <text
        x="820"
        y="314"
        fill="#e8622a"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
      >
        {"< 0.15 ms"}
      </text>
      <text
        x="820"
        y="338"
        fill="rgba(247, 244, 239, 0.72)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontStyle="italic"
      >
        (150 µs)
      </text>
      <text
        x="1180"
        y="314"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
      >
        130× to 260× Shorter Loop
      </text>
      <text
        x="1180"
        y="338"
        fill="rgba(247, 244, 239, 0.62)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontStyle="italic"
      >
        (Fits within 5.0 kHz window)
      </text>
      <line
        x1="40"
        y1="362"
        x2="1600"
        y2="362"
        stroke="rgba(247, 244, 239, 0.14)"
        strokeWidth="1"
      />

      <text
        x="40"
        y="408"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="500"
      >
        Total Dynamic Energy
      </text>
      <text
        x="430"
        y="412"
        fill="rgba(247, 244, 239, 0.88)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
      >
        6.31 to 35.6 mJ
      </text>
      <text
        x="820"
        y="404"
        fill="#e8622a"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
      >
        0.14 mJ
      </text>
      <text
        x="820"
        y="428"
        fill="rgba(247, 244, 239, 0.72)"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontStyle="italic"
      >
        (Isolated Core)
      </text>
      <text
        x="1180"
        y="404"
        fill="#f7f4ef"
        fontFamily="var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
      >
        45× to 250× More Efficient
      </text>
      <line
        x1="40"
        y1="452"
        x2="1600"
        y2="452"
        stroke="rgba(247, 244, 239, 0.14)"
        strokeWidth="1"
      />
    </svg>
  );
}
