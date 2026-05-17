"use client";

export function ReflexArcDiagramCta({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="mt-6 md:mt-7">
      <button
        type="button"
        onClick={onOpen}
        className="group inline-flex max-w-full flex-col items-start gap-0.5 text-left"
        aria-haspopup="dialog"
      >
        <span className="text-[14px] font-medium text-accent underline decoration-accent/35 underline-offset-[5px] transition-colors group-hover:text-accent-hover group-hover:decoration-accent/55 md:text-[15px]">
          See how the spinal reflex arc maps to Arc
        </span>
        <span className="text-[12px] leading-snug text-fg-tertiary md:text-[13px]">
          Biology on the left, robotics on the right — click to open the full
          diagram
        </span>
      </button>
    </div>
  );
}
