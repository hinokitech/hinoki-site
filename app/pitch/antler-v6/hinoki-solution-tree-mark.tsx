import React from "react";

/** Decorative Hinoki tree — bottom aligns above Arc response; grows upward at full size. */
export function HinokiSolutionTreeMark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-[552px] top-[-8px] z-0"
    >
      <img
        src="/assets/logo-hinoki-tree.png"
        alt=""
        width={360}
        height={360}
        className="block h-[360px] w-[360px] max-w-none"
      />
    </div>
  );
}
