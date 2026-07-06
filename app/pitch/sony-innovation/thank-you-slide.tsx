import React from "react";
import { Slide, SlideFooter, HeroTag } from "./slides";

function NeuralMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      <style>{`
        .hn-node-antler {
          transform-box: fill-box;
          transform-origin: center;
          animation: hn-breathe-antler 2.6s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes hn-breathe-antler {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
      `}</style>
      <path
        d="M60 200 C120 140, 200 260, 300 180 S460 120, 520 160"
        stroke="#E8622A"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <path
        d="M40 240 C110 170, 220 300, 330 210 S490 150, 540 200"
        stroke="#C42B2B"
        strokeWidth="1.5"
        opacity="0.42"
      />
      <path
        d="M80 160 C150 100, 260 240, 360 150 S500 90, 550 120"
        stroke="#E8622A"
        strokeWidth="1.2"
        opacity="0.38"
      />
      <path
        d="M30 280 C100 200, 210 340, 310 240"
        stroke="#E8622A"
        strokeWidth="1.2"
        opacity="0.32"
      />
      <circle cx="60" cy="200" r="28" fill="#E8622A" opacity="0.16" />
      <circle cx="60" cy="200" r="16" fill="#E8622A" opacity="0.24" />
      <circle className="hn-node-antler" cx="60" cy="200" r="7" fill="#E8622A" opacity="1" />
      <circle cx="190" cy="155" r="20" fill="#C42B2B" opacity="0.14" />
      <circle cx="190" cy="155" r="10" fill="#C42B2B" opacity="0.22" />
      <circle
        className="hn-node-antler"
        style={{ animationDelay: "-430ms" }}
        cx="190"
        cy="155"
        r="5"
        fill="#C42B2B"
        opacity="0.98"
      />
      <circle cx="300" cy="185" r="22" fill="#E8622A" opacity="0.14" />
      <circle cx="300" cy="185" r="12" fill="#E8622A" opacity="0.22" />
      <circle
        className="hn-node-antler"
        style={{ animationDelay: "-860ms" }}
        cx="300"
        cy="185"
        r="6"
        fill="#E8622A"
        opacity="0.98"
      />
      <circle cx="420" cy="140" r="18" fill="#C42B2B" opacity="0.12" />
      <circle cx="420" cy="140" r="9" fill="#C42B2B" opacity="0.18" />
      <circle
        className="hn-node-antler"
        style={{ animationDelay: "-1210ms" }}
        cx="420"
        cy="140"
        r="4.5"
        fill="#C42B2B"
        opacity="0.95"
      />
      <circle cx="130" cy="260" r="14" fill="#E8622A" opacity="0.12" />
      <circle
        className="hn-node-antler"
        style={{ animationDelay: "-1570ms" }}
        cx="130"
        cy="260"
        r="4"
        fill="#E8622A"
        opacity="0.92"
      />
      <circle cx="500" cy="175" r="12" fill="#E8622A" opacity="0.12" />
      <circle
        className="hn-node-antler"
        style={{ animationDelay: "-1910ms" }}
        cx="500"
        cy="175"
        r="4"
        fill="#E8622A"
        opacity="0.92"
      />
      <line
        x1="60"
        y1="200"
        x2="130"
        y2="260"
        stroke="#E8622A"
        strokeWidth="1.2"
        opacity="0.48"
      />
      <line
        x1="60"
        y1="200"
        x2="190"
        y2="155"
        stroke="#C42B2B"
        strokeWidth="1.2"
        opacity="0.4"
      />
      <line
        x1="190"
        y1="155"
        x2="300"
        y2="185"
        stroke="#E8622A"
        strokeWidth="1.2"
        opacity="0.4"
      />
      <line
        x1="300"
        y1="185"
        x2="420"
        y2="140"
        stroke="#C42B2B"
        strokeWidth="1.2"
        opacity="0.4"
      />
      <line
        x1="420"
        y1="140"
        x2="500"
        y2="175"
        stroke="#E8622A"
        strokeWidth="1.2"
        opacity="0.4"
      />
    </svg>
  );
}

export function ThankYouSlide() {
  return (
    <Slide>
      <HeroTag>Hinoki Technologies</HeroTag>
      <h1 className="text-[112px] font-light leading-[1.0] tracking-[-0.025em] text-fg-primary">
        Thank you.
      </h1>
      <p className="mt-10 font-mono text-[20px] tracking-[0.08em] text-fg-tertiary">
        hinokitech.com
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[80px] top-[100px] opacity-95 [filter:drop-shadow(0_0_28px_rgba(232,98,42,0.22))]"
      >
        <NeuralMotif className="h-auto w-[780px]" />
      </div>

      <SlideFooter pageLabel="20 · Thank You" />
    </Slide>
  );
}
