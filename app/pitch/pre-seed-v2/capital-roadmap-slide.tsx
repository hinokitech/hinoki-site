import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";

function FlyingMoneyStacksIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      <path
        d="M34 58c10-8 22-4 28 6"
        stroke="#E8622A"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M42 50c8-6 18-2 22 5"
        stroke="#E8622A"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.18"
      />
      <circle cx="24" cy="44" r="2" fill="#E8622A" opacity="0.35" />
      <circle cx="52" cy="36" r="1.5" fill="#E8622A" opacity="0.28" />

      <g opacity="0.92">
        <rect
          x="58"
          y="44"
          width="52"
          height="30"
          rx="4"
          fill="#F5E0D5"
          stroke="#D8D3CB"
          strokeWidth="1.2"
        />
        <rect
          x="62"
          y="40"
          width="52"
          height="30"
          rx="4"
          fill="#EDE9E3"
          stroke="#D8D3CB"
          strokeWidth="1.2"
        />
        <rect
          x="66"
          y="36"
          width="52"
          height="30"
          rx="4"
          fill="#F7F4EF"
          stroke="#B8B2A8"
          strokeWidth="1.3"
        />
        <text
          x="92"
          y="56"
          textAnchor="middle"
          fill="#E8622A"
          fontSize="14"
          fontFamily="var(--font-dm-mono), monospace"
          fontWeight="600"
        >
          $
        </text>
        <path
          d="M58 50c-14-6-22 2-20 12c8-2 14-6 20-12Z"
          fill="#E8622A"
          opacity="0.22"
        />
        <path
          d="M118 50c14-6 22 2 20 12c-8-2-14-6-20-12Z"
          fill="#E8622A"
          opacity="0.22"
        />
      </g>

      <g>
        <rect
          x="138"
          y="30"
          width="64"
          height="36"
          rx="5"
          fill="#F5E0D5"
          stroke="#D8D3CB"
          strokeWidth="1.2"
        />
        <rect
          x="142"
          y="25"
          width="64"
          height="36"
          rx="5"
          fill="#EDE9E3"
          stroke="#D8D3CB"
          strokeWidth="1.2"
        />
        <rect
          x="146"
          y="20"
          width="64"
          height="36"
          rx="5"
          fill="#F7F4EF"
          stroke="#B8B2A8"
          strokeWidth="1.4"
        />
        <text
          x="178"
          y="42"
          textAnchor="middle"
          fill="#E8622A"
          fontSize="16"
          fontFamily="var(--font-dm-mono), monospace"
          fontWeight="600"
        >
          $$
        </text>
        <path
          d="M138 36c-18-8-28 4-24 16c10-3 18-9 24-16Z"
          fill="#E8622A"
          opacity="0.28"
        />
        <path
          d="M210 36c18-8 28 4 24 16c-10-3-18-9-24-16Z"
          fill="#E8622A"
          opacity="0.28"
        />
        <path
          d="M168 14c0-2 1.5-3.5 3.5-3.5"
          stroke="#E8622A"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M186 10c0-2 1.5-3.5 3.5-3.5"
          stroke="#E8622A"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.35"
        />
      </g>

      <g opacity="0.88">
        <rect
          x="222"
          y="48"
          width="44"
          height="26"
          rx="4"
          fill="#F5E0D5"
          stroke="#D8D3CB"
          strokeWidth="1.1"
        />
        <rect
          x="225"
          y="44"
          width="44"
          height="26"
          rx="4"
          fill="#F7F4EF"
          stroke="#B8B2A8"
          strokeWidth="1.2"
        />
        <text
          x="247"
          y="61"
          textAnchor="middle"
          fill="#E8622A"
          fontSize="12"
          fontFamily="var(--font-dm-mono), monospace"
          fontWeight="600"
        >
          $
        </text>
        <path
          d="M222 54c-10-4-16 2-14 10c6-1 10-4 14-10Z"
          fill="#E8622A"
          opacity="0.18"
        />
        <path
          d="M266 54c10-4 16 2 14 10c-6-1-10-4-14-10Z"
          fill="#E8622A"
          opacity="0.18"
        />
      </g>
    </svg>
  );
}

const CAPITAL_ROADMAP_STAGES = [
  {
    label: "Stage 1",
    timing: "Now — during / just after Antler · 0–6 months",
    items: [
      <>
        Apply to{" "}
        <span className="font-semibold">NEDO NEP Yakushin 3000</span>; target{" "}
        <span className="font-semibold">$188K non-dilutive</span> at 100% subsidy.
      </>,
      <>
        <span className="font-semibold">1stRound</span> — $63K non-dilutive grant
        applied.
      </>,
      <>
        <span className="font-semibold">Aichi DeepTech</span> — $313K grant
        applied.
      </>,
      <>
        <span className="font-semibold">Coreline ATLAS</span> — second stage,
        $1M pre-seed
      </>,
    ],
  },
  {
    label: "Stage 2",
    timing: "6–15 months — bridge to seed",
    items: [
      <>
        Draw a{" "}
        <span className="font-semibold">JFC Capital Subordinated Loan</span>{" "}
        (target $188K–$450K) for equity-treated bullet repayment.
      </>,
      <>
        File foundation grant applications through AIST partnership.
      </>,
      <>
        <span className="font-semibold">
          SBIR (NEDO) FY2027 / Monozukuri 23rd-round
        </span>
      </>,
    ],
  },
  {
    label: "Stage 3",
    timing: "12–24 months — seed round",
    items: [
      <>
        <span className="font-semibold">Warm VCs</span> (
        <span className="font-semibold">Sony Innovation</span>,{" "}
        <span className="font-semibold">Spiral Capital</span>,{" "}
        <span className="font-semibold">Co-capital</span>)
      </>,
      <>
        <span className="font-semibold">NEDO DTSU STS</span> ($3.1M · 2/3 subsidy ·
        1/3 VC-equity requirement).
      </>,
      <>
        Pursue <span className="font-semibold">METI J-Startup</span> designation
        for branding.
      </>,
    ],
  },
] as const;

function CapitalRoadmapStageRow({
  label,
  timing,
  items,
}: (typeof CAPITAL_ROADMAP_STAGES)[number]) {
  return (
    <div className="flex flex-1 flex-col justify-center border-b border-border py-5">
      <div className="grid grid-cols-[minmax(0,320px)_1fr] items-start gap-x-10">
        <div>
          <div className="font-mono text-[15px] uppercase tracking-[0.14em] text-accent">
            {label}
          </div>
          <div className="mt-2 text-[20px] font-semibold leading-[1.35] text-fg-primary">
            {timing}
          </div>
        </div>
        <ul className="space-y-2 text-[22px] font-normal leading-[1.55] text-fg-primary">
          {items.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="shrink-0 text-accent">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CapitalRoadmapSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">Capital Roadmap</Eyebrow>
          <div className="flex max-w-[1640px] items-center justify-between gap-12">
            <h2 className="min-w-0 max-w-[1180px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
              Staged path from Antler to seed.
            </h2>
            <FlyingMoneyStacksIllustration className="h-[84px] w-[252px] shrink-0 -translate-x-32 translate-y-1 opacity-95" />
          </div>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          {CAPITAL_ROADMAP_STAGES.map((stage) => (
            <CapitalRoadmapStageRow key={stage.label} {...stage} />
          ))}
        </div>
      </div>

      <SlideFooter pageLabel="18 · Capital Roadmap" />
    </Slide>
  );
}
