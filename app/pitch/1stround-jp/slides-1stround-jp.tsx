import React from "react";
import { ArcIntegrationCanvas } from "../../reflex/ArcIntegrationCanvas";
import {
  Slide,
  Eyebrow,
  SlideFooter,
  FounderCard,
} from "../slides";

// =====================================================================
//  HINOKI — 1stROUND APPLICATION DECK (日本語)
//
//  Copy source: client-provided JA strings. Keep mobile-1stround-jp.tsx in sync.
//  English deck: ../1stround/slides-1stround.tsx
//
//  Non-dilutive validation funding application. Same Hinoki design
//  language as the pre-seed deck (warm off-white background, dotted
//  grid, rounded cards, restrained orange accent, muted blue-gray
//  conventional-system elements, minimalist typography). Tone is
//  practical, technical, validation-focused — not VC hype.
//
//  Slide canvas: 1920×1080 (PitchDeck.tsx handles scaling).
//  Shared atoms (Slide, Eyebrow, SlideFooter, FounderCard) are imported
//  from ../slides so visual language stays in lock-step with the
//  pre-seed deck.
// =====================================================================

// ---------------------------------------------------------------------
//  Shared local atoms used across this deck
// ---------------------------------------------------------------------
function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span
          key={it}
          className="rounded-full border border-border bg-bg-subtle px-4 py-1.5 text-[18px] font-normal leading-[1.2] text-fg-secondary"
        >
          {it}
        </span>
      ))}
    </div>
  );
}

function RoboticsEconomicsCard({
  title,
  body,
  impact,
  impactLabel = "Business impact",
}: {
  title: string;
  body: string;
  impact: string;
  impactLabel?: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-5">
      <div className="text-[20px] font-medium leading-[1.25] tracking-[-0.01em] text-fg-primary">
        {title}
      </div>
      <p className="mt-2.5 flex-1 text-[14px] leading-[1.5] text-fg-secondary">
        {body}
      </p>
      <div className="mt-4 border-t border-border pt-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
          {impactLabel}
        </div>
        <p className="mt-1.5 text-[15px] font-medium leading-[1.4] text-fg-primary">
          {impact}
        </p>
      </div>
    </div>
  );
}

function FlowBox({
  label,
  emphasis = false,
}: {
  label: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-[88px] min-w-[180px] flex-1 items-center justify-center rounded-[8px] border px-5 text-center text-[18px] font-medium leading-[1.25] ${
        emphasis
          ? "border-accent bg-accent-subtle text-fg-primary"
          : "border-border bg-bg-subtle text-fg-primary"
      }`}
    >
      {label}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex shrink-0 items-center px-2 text-[28px] font-light text-fg-tertiary">
      →
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
      {children}
    </div>
  );
}

function MutedLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-fg-caption">
      {children}
    </div>
  );
}

function MetricGroup({
  group,
  items,
}: {
  group: string;
  items: string[];
}) {
  return (
    <div className="rounded-[8px] border border-border bg-bg-subtle px-5 py-4">
      <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
        {group}
      </div>
      <ul className="mt-2 space-y-1 text-[15px] leading-[1.5] text-fg-secondary">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="text-fg-caption">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------
//  Neural motif — live version aligned with the website hero (signal
//  pulses + breathing nodes). Animations pause for print / reduced motion.
// ---------------------------------------------------------------------
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
        .hn-node-1st {
          transform-box: fill-box;
          transform-origin: center;
          animation: hn-breathe-1st 2s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .hn-halo-1st {
          transform-box: fill-box;
          transform-origin: center;
          animation: hn-halo-1st 2.6s ease-in-out infinite;
        }
        @keyframes hn-breathe-1st {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes hn-halo-1st {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.18); opacity: 0.16; }
        }
        .hn-signal-1st {
          filter: drop-shadow(0 0 6px rgba(232, 98, 42, 0.55));
        }
        @media (prefers-reduced-motion: reduce), print {
          .hn-node-1st,
          .hn-halo-1st {
            animation: none !important;
          }
          .hn-signal-1st animate,
          .hn-signal-1st animateMotion {
            display: none;
          }
        }
      `}</style>

      <path
        id="hnp1-1st"
        d="M60 200 C120 140, 200 260, 300 180 S460 120, 520 160"
        stroke="#E8622A"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        id="hnp2-1st"
        d="M40 240 C110 170, 220 300, 330 210 S490 150, 540 200"
        stroke="#C42B2B"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        id="hnp3-1st"
        d="M80 160 C150 100, 260 240, 360 150 S500 90, 550 120"
        stroke="#E8622A"
        strokeWidth="0.8"
        opacity="0.2"
      />
      <path
        id="hnp4-1st"
        d="M30 280 C100 200, 210 340, 310 240"
        stroke="#E8622A"
        strokeWidth="0.8"
        opacity="0.15"
      />

      <circle className="hn-halo-1st" cx="60" cy="200" r="28" fill="#E8622A" opacity="0.08" />
      <circle className="hn-halo-1st" style={{ animationDelay: "-400ms" }} cx="60" cy="200" r="16" fill="#E8622A" opacity="0.12" />
      <circle className="hn-node-1st" style={{ animationDelay: "0ms" }} cx="60" cy="200" r="7" fill="#E8622A" opacity="0.9" />

      <circle cx="190" cy="155" r="20" fill="#C42B2B" opacity="0.08" />
      <circle cx="190" cy="155" r="10" fill="#C42B2B" opacity="0.12" />
      <circle className="hn-node-1st" style={{ animationDelay: "-430ms" }} cx="190" cy="155" r="5" fill="#C42B2B" opacity="0.85" />

      <circle cx="300" cy="185" r="22" fill="#E8622A" opacity="0.08" />
      <circle cx="300" cy="185" r="12" fill="#E8622A" opacity="0.12" />
      <circle className="hn-node-1st" style={{ animationDelay: "-860ms" }} cx="300" cy="185" r="6" fill="#E8622A" opacity="0.85" />

      <circle cx="420" cy="140" r="18" fill="#C42B2B" opacity="0.07" />
      <circle cx="420" cy="140" r="9" fill="#C42B2B" opacity="0.1" />
      <circle className="hn-node-1st" style={{ animationDelay: "-1210ms" }} cx="420" cy="140" r="4.5" fill="#C42B2B" opacity="0.8" />

      <circle cx="130" cy="260" r="14" fill="#E8622A" opacity="0.07" />
      <circle className="hn-node-1st" style={{ animationDelay: "-1570ms" }} cx="130" cy="260" r="4" fill="#E8622A" opacity="0.7" />

      <circle cx="500" cy="175" r="12" fill="#E8622A" opacity="0.07" />
      <circle className="hn-node-1st" style={{ animationDelay: "-1910ms" }} cx="500" cy="175" r="4" fill="#E8622A" opacity="0.7" />

      <g className="hn-signal-1st" opacity="0.95">
        <circle r="3.25" fill="#E8622A">
          <animateMotion dur="6.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1">
            <mpath href="#hnp1-1st" />
          </animateMotion>
          <animate attributeName="opacity" dur="6.4s" repeatCount="indefinite" values="0;0.9;0" keyTimes="0;0.12;1" />
        </circle>
        <circle r="2.75" fill="#E8622A" opacity="0">
          <animateMotion dur="7.2s" begin="-2.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1">
            <mpath href="#hnp2-1st" />
          </animateMotion>
          <animate attributeName="opacity" dur="7.2s" begin="-2.1s" repeatCount="indefinite" values="0;0.85;0" keyTimes="0;0.12;1" />
        </circle>
        <circle r="2.5" fill="#E8622A" opacity="0">
          <animateMotion dur="5.8s" begin="-1.3s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1">
            <mpath href="#hnp3-1st" />
          </animateMotion>
          <animate attributeName="opacity" dur="5.8s" begin="-1.3s" repeatCount="indefinite" values="0;0.8;0" keyTimes="0;0.12;1" />
        </circle>
      </g>

      <circle cx="300" cy="185" r="6" fill="#E8622A" opacity="0">
        <animate attributeName="opacity" dur="6.4s" repeatCount="indefinite" values="0;0;0.35;0" keyTimes="0;0.74;0.78;1" />
      </circle>
      <circle cx="420" cy="140" r="4.5" fill="#C42B2B" opacity="0">
        <animate attributeName="opacity" dur="6.4s" repeatCount="indefinite" values="0;0;0.28;0" keyTimes="0;0.86;0.90;1" />
      </circle>

      <line x1="60" y1="200" x2="130" y2="260" stroke="#E8622A" strokeWidth="0.8" opacity="0.25" />
      <line x1="60" y1="200" x2="190" y2="155" stroke="#C42B2B" strokeWidth="0.8" opacity="0.2" />
      <line x1="190" y1="155" x2="300" y2="185" stroke="#E8622A" strokeWidth="0.8" opacity="0.2" />
      <line x1="300" y1="185" x2="420" y2="140" stroke="#C42B2B" strokeWidth="0.8" opacity="0.2" />
      <line x1="420" y1="140" x2="500" y2="175" stroke="#E8622A" strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

// ---------------------------------------------------------------------
//  01 · Title / Company Summary
// ---------------------------------------------------------------------
function TitleSlide() {
  return (
    <Slide>
      <div className="mb-8 flex items-center gap-3 text-[20px] font-semibold uppercase tracking-[0.18em] text-accent">
        <img
          src="/assets/logo-hinoki-tree.png"
          alt=""
          width={50}
          height={50}
          className="block h-[50px] w-[50px] shrink-0 object-contain"
          aria-hidden
        />
        <span>Hinoki Technologies</span>
      </div>
      <h1 className="text-[88px] font-light leading-[1.08] tracking-[-0.025em] text-fg-primary">
        ロボットに「物理知能」を実装する
      </h1>
      <p className="mt-12 max-w-[1180px] text-[28px] font-normal leading-[1.55] text-fg-secondary">
        <span className="italic font-semibold text-fg-primary">Arc</span>
        は、既存のロボットコントローラを置き換えるものではありません。
        センサーデータを、より高速で信頼性の高い物理応答へと変換する「ニューロモルフィックなローカル制御層」です。
      </p>

      <p className="mt-4 max-w-[1180px] text-[20px] font-light italic leading-[1.5] text-fg-primary">
        これまでロボットには「脳（認識・計画）」が与えられてきました。{" "}
        <span className="not-italic font-semibold">
          Arcはそこに、「神経系（即時的な物理応答）」を加えます。
        </span>
      </p>

      <div className="mt-10 flex max-w-[1200px] flex-col gap-3 text-[20px] leading-[1.55] text-fg-secondary">
        <div className="flex gap-3">
          <span className="text-accent">·</span>
          <span>つくば発のdeep techスタートアップ</span>
        </div>
        <div className="flex gap-3">
          <span className="text-accent">·</span>
          <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
            <img
              src="/assets/antler-wordmark.png"
              alt="Antler"
              width={88}
              height={20}
              className="h-[20px] w-auto shrink-0 object-contain object-left"
            />
            <span>Japan Residency 2026 採択</span>
          </span>
        </div>
        <div className="flex gap-3">
          <span className="text-accent">·</span>
          <span>
            最初の検証ベンチマーク：触覚スリップ検知と高速グリッパー応答
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[1340px] top-[80px] w-[580px] opacity-70"
      >
        <NeuralMotif className="h-auto w-full" />
      </div>

      <div className="absolute bottom-[80px] left-[140px] font-mono text-[16px] tracking-[0.08em] text-fg-tertiary">
        1stRound application・2026年5月・hinokitech.com
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  02 · Problem
// ---------------------------------------------------------------------
function ProblemDriverCard({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-6">
      <div className="text-[19px] font-medium leading-[1.32] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <p className="mt-3 text-[15px] leading-[1.55] text-fg-secondary">{body}</p>
    </div>
  );
}

function ProblemSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Problem</Eyebrow>
      <h2 className="text-[60px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        ロボットは制御された環境では動作する。
        <br />
        しかし、変化する実環境では十分に機能しない。
      </h2>
      <p className="mt-5 max-w-[1640px] text-[20px] font-normal leading-[1.52] text-fg-secondary">
        ラボやシミュレーション、限定された条件下では高い性能を発揮できる一方で、
        実際の現場では、重量・接触・振動・環境変化などによって性能が大きく低下する。
        特に接触を伴うタスクでは、
        非線形な物理ダイナミクスやわずかな位置ずれが、安定した動作を難しくする。
      </p>

      <div className="mt-6 max-w-[1640px]">
        <div className="font-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-primary">
          なぜ現場で失敗するのか
        </div>
        <div className="mt-3 grid grid-cols-3 gap-5">
          <ProblemDriverCard
            headline="ラボでは動くが、現場では再現できない"
            body="構造化された環境で見える能力が、本番の対象物・接触・運用条件の変化で失敗し得る。"
          />
          <ProblemDriverCard
            headline="物理エッジでの応答が遅い"
            body="スリップ・接触・不均衡・力の変化は、認識から計画までの経路より速く起こり得る — 課題はセンサー・アクチュエータループでの応答である。"
          />
          <ProblemDriverCard
            headline="顧客ごとにチューニングが必要になり、スケールしない"
            body="新しい拠点ごとにカスタムチューニング、統合工数、低速運転、狭いユースケースが必要になり、反復可能な導入モデルにならない。"
          />
        </div>
      </div>

      <div className="mt-5 max-w-[1640px] rounded-[8px] border border-border bg-bg-subtle/80 px-5 py-3.5">
        <div className="font-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-primary">
          同じ傘の下にある技術的症状
        </div>
        <p className="mt-2 text-[15px] leading-[1.5] text-fg-secondary">
          エッジでのレイテンシ、センサノイズ、物理適応の不足、統合負荷、信頼性リスク、および重要ループにおける電力・計算負荷は、別個の問題ではない。いずれも同じ物理的一般化ギャップの症状である。
        </p>
      </div>

      <p className="mt-5 max-w-[1640px] text-[24px] font-normal leading-[1.45] tracking-[-0.01em] text-fg-primary">
        本質は認識だけではない。それは
        <span className="font-semibold">物理的一般化</span>
        である：世界が変化したとき、センサーデータを信頼できる適応的な物理行動へ変換すること。
      </p>

      <div className="mt-6 max-w-[1640px] rounded-[10px] border-2 border-accent bg-accent-subtle px-8 py-7">
        <p className="text-[26px] font-light leading-[1.4] tracking-[-0.02em] text-fg-primary">
          ロボティクス企業にとって、これは
          <span className="font-semibold">スケールの問題</span>
          である。狭い運用条件の外でロボットが失敗すると、導入は長期化し、現場エンジニアリングが増え、速度は低下し、顧客横断で収益性高く再現することが難しくなる。
        </p>
      </div>

      <SlideFooter pageLabel="02 · 課題" />
    </Slide>
  );
}

function SolutionPillarCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-5">
      <div className="text-[18px] font-medium leading-[1.28] tracking-[-0.01em] text-fg-primary">
        {title}
      </div>
      <p className="mt-2 text-[14px] leading-[1.5] text-fg-secondary">{body}</p>
    </div>
  );
}

function StackContrastStep({
  label,
  emphasis = false,
}: {
  label: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`rounded-[6px] border px-3 py-2 text-center text-[13px] font-medium leading-[1.32] ${
        emphasis
          ? "border-accent bg-accent-subtle text-fg-primary"
          : "border-border bg-bg-base text-fg-primary"
      }`}
    >
      {label}
    </div>
  );
}

function StackContrastArrow() {
  return (
    <span className="shrink-0 px-1 text-[18px] font-light leading-none text-fg-tertiary">
      →
    </span>
  );
}

function ArcStackContrastPanel({
  label,
  steps,
  caption,
  accent = false,
  captionBold = false,
}: {
  label: string;
  steps: Array<{ label: string; emphasis?: boolean }>;
  caption: string;
  accent?: boolean;
  captionBold?: boolean;
}) {
  return (
    <div
      className={`rounded-[8px] border p-4 ${
        accent
          ? "border-accent/50 bg-accent-subtle/70"
          : "border-border bg-bg-subtle/80"
      }`}
    >
      <div
        className={`font-mono text-[12px] font-semibold uppercase tracking-[0.12em] ${
          accent ? "text-accent" : "text-fg-primary"
        }`}
      >
        {label}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-y-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            {index > 0 ? <StackContrastArrow /> : null}
            <StackContrastStep label={step.label} emphasis={step.emphasis} />
          </React.Fragment>
        ))}
      </div>
      <p
        className={`mt-2.5 text-[13px] leading-[1.45] text-fg-caption ${
          captionBold ? "font-semibold text-fg-primary" : ""
        }`}
      >
        {caption}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------
//  03 · ソリューション — 物理応答レイヤー
// ---------------------------------------------------------------------
function PhysicalResponseSolutionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>ソリューション</Eyebrow>
      <h2 className="max-w-[1640px] text-[48px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        <span className="italic">Arc</span>
        は、不足している「物理応答レイヤー」を追加する。
      </h2>
      <p className="mt-3 max-w-[1640px] text-[18px] font-normal leading-[1.48] text-fg-secondary">
        Arcは、ニューロモルフィックなローカル制御アーキテクチャとして、
        既存のコントローラを維持したまま、特定のセンサー–アクチュエータループにおいて高速な応答を可能にする。
      </p>
      <p className="mt-3 max-w-[1640px] text-[16px] leading-[1.55] text-fg-secondary">
        ロボティクス企業はこれまで、認識・計画・AIの高度化に注力してきた。
        しかし実際の失敗の多くは、ロボットの身体に近いレイヤーで発生している。
        Arcは、センサーとアクチュエータの間に配置され、
        物理的な変化を、上位システムが介入する前に即時的な補正動作へ変換する。
      </p>

      <div className="mt-4 grid max-w-[1640px] grid-cols-3 gap-4">
        <SolutionPillarCard
          title="ローカル物理応答"
          body="スリップ・接触・力の変化・不均衡など、制御クリティカルループにおいて、センサー事象からアクチュエータ補正へのより速い経路を作る。"
        />
        <SolutionPillarCard
          title="適応的ニューロモーフィック動力学"
          body="リザーバコンピューティングを用い、ノイズの多い時系列センサ入力を動的な内部状態へ変換し、変化する物理条件の下でも安定した補正を狙う。"
        />
        <SolutionPillarCard
          title="実装可能な展開向け"
          body="既存コントローラと併用し、一つの測定可能なループから始め、FPGAファーストの検証でセンサー・プロトコル・ロボットプラットフォームを横断調整する。"
        />
      </div>

      <div className="mt-4 grid max-w-[1640px] grid-cols-2 gap-5">
        <ArcStackContrastPanel
          label="現状"
          steps={[
            { label: "センサーデータ" },
            { label: "認識 / 計画 / 制御スタック" },
            { label: "アクチュエータ応答" },
          ]}
          caption="物理事象は、より広いデジタルスタックを経由する"
          captionBold
        />
        <ArcStackContrastPanel
          label="Arc導入後"
          accent
          steps={[
            { label: "センサー事象" },
            { label: "Arcローカル反射層", emphasis: true },
            { label: "有界補正", emphasis: true },
            { label: "アクチュエータ応答" },
          ]}
          caption="選択した物理ループに、より速いローカル応答経路を与える"
          captionBold
        />
      </div>

      <p className="mt-3 max-w-[1640px] font-mono text-[13px] leading-[1.45] text-fg-caption">
        メインコントローラは、認識・計画・安全性・タスクロジックを引き続き担当する。
      </p>

      <div className="mt-4 max-w-[1640px]">
        <div className="font-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-primary">
          企業がHinokiと組む理由
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <SolutionPillarCard
            title="フル再設計なしで検証"
            body="Arcは、既存コントローラが主導権を持ったまま、一つの制御クリティカルループで評価できる。"
          />
          <SolutionPillarCard
            title="導入摩擦の低減"
            body="検証が成功すれば、Arcは可変環境における動作失敗、再チューニング負荷、現場エンジニアリング、信頼性問題を減らせる。"
          />
          <SolutionPillarCard
            title="早期にベンチマークを形成"
            body="パートナーは検証データを確認し、Arcが実際のロボティクスニーズに対してどこでテストされるかに影響できる。"
          />
        </div>
      </div>

      <div className="mt-4 max-w-[1640px] rounded-[10px] border-2 border-accent bg-accent-subtle px-7 py-5">
        <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
          要点
        </div>
        <p className="mt-2 text-[21px] font-light leading-[1.42] tracking-[-0.015em] text-fg-primary">
          Arcは「新しい脳」ではなく、
          ロボットに欠けていた「神経系」を提供する。
        </p>
      </div>

      <SlideFooter pageLabel="03 · ソリューション" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  04 · Discovery Signals
// ---------------------------------------------------------------------
function DiscoveryCard({
  label,
  headline,
  body,
}: {
  label: string;
  headline: string;
  body: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      <div className="mt-4 min-h-[64px] text-[24px] font-medium leading-[1.24] tracking-[-0.015em] text-fg-primary">
        {headline}
      </div>
      <div className="mt-3 text-[16px] leading-[1.58] text-fg-secondary">{body}</div>
    </div>
  );
}

function EngineerQuote({
  role,
  quote,
  variant = "supporting",
}: {
  role: string;
  quote: string;
  variant?: "primary" | "supporting";
}) {
  if (variant === "primary") {
    return (
      <div className="rounded-[10px] border-2 border-accent bg-accent-subtle px-10 py-8">
        <div className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
          {role}
        </div>
        <p className="mt-5 text-[19px] leading-[1.55] text-fg-primary">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle px-6 py-5">
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent leading-[1.35]">
        {role}
      </div>
      <p className="mt-3 text-[15px] leading-[1.55] text-fg-primary">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

function DiscoverySlide() {
  return (
    <Slide align="start">
      <Eyebrow>Discovery</Eyebrow>
      <h2 className="text-[60px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        顧客ヒアリングから得られた示唆
      </h2>
      <p className="mt-6 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        私たちはエンジニアへのヒアリングを通じて、
        Arcの構想を「測定可能な最初の検証課題」へと絞り込みました。
      </p>

      <div className="mt-8 flex min-h-0 flex-1 w-full max-w-[1640px] flex-col gap-8">
        <div className="grid grid-cols-3 gap-6">
          <DiscoveryCard
            label="Signal 01"
            headline="レイテンシは物理エッジで重要になる。"
            body="エンジニアから、精度・速度・アクチュエータタイミングが重要な場面では応答時間がクリティカルになるとの確認があった。"
          />
          <DiscoveryCard
            label="Signal 02"
            headline="物理的変動が不安定性を生む。"
            body="変化する床面、荷重変化、車輪スリップ、ノイズのあるセンサー、予測しにくい環境が、実用的な制御課題を生む。"
          />
          <DiscoveryCard
            label="Signal 03"
            headline="スリップ応答が最初の測定可能な入り口。"
            body="グリッパー制御では課題が具体化する。スリップを検知し、より速く応答し、対象物を安定させ、ベースラインと比較する。"
          />
        </div>

        <EngineerQuote
          variant="primary"
          role="グリッパー／マニピュレーションエンジニア"
          quote="スリップは触覚データ上では先に見えているが、把持ループの応答が遅れる。部品が動き始めてから把持力を上げることになる。センサーからグリッパーまでの遅延は繰り返し課題になる。"
        />

        <div className="grid grid-cols-2 gap-6">
          <EngineerQuote
            role="AMRトルク制御エンジニア"
            quote="車輪スリップはトルク制御と速度制御のトレードオフを強いる。車輪に近い場所でループを閉じられれば、依然として有効だ。"
          />
          <EngineerQuote
            role="二足歩行ヒューマノイド研究者"
            quote="一度足場が滑ると、歩容はすでに遅れている。接触のための独立した高速経路がない。"
          />
        </div>

        <div className="mt-auto rounded-[10px] border-2 border-accent bg-accent-subtle px-8 py-7">
          <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
            要点
          </div>
          <p className="mt-3 text-[21px] font-light leading-[1.42] tracking-[-0.015em] text-fg-primary">
            これにより、Hinokiは最初の検証ベンチマークを
            <span className="font-semibold">
              「触覚スリップ検知と高速グリッパー応答」
            </span>
            に絞った。
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="04 · 顧客発見" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  04 · First Validation Benchmark
// ---------------------------------------------------------------------
function BenchmarkSlide() {
  return (
    <Slide align="start">
      <Eyebrow>First Benchmark</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        最初の検証：スリップ検知と高速グリッパー応答
      </h2>
      <p className="mt-4 text-[24px] font-light leading-[1.45] text-fg-secondary">
        これは最終プロダクトではなく、
        Arcの有効性を検証するための最初のステップです。
      </p>

      <div className="mt-10 max-w-[1640px]">
        <MutedLabel>Closed-loop benchmark — tactile sensor to gripper</MutedLabel>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <FlowBox label="触覚センサー" />
          <FlowArrow />
          <FlowBox label="Arcローカル反射層" emphasis />
          <FlowArrow />
          <FlowBox label="有界補正出力" />
          <FlowArrow />
          <FlowBox label="モーターコントローラ" />
          <FlowArrow />
          <FlowBox label="グリッパー安定化" />
        </div>
      </div>

      <div className="mt-6 max-w-[1640px] rounded-[8px] border border-accent bg-accent-subtle px-6 py-4">
        <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
          Discovery validation · tactile-sensing partner
        </div>
        <p className="mt-2 text-[17px] leading-[1.55] text-fg-primary">
          東京を拠点とする触覚センシング企業との議論で、触覚センシングとグリッパー応答は、強い初期検証テーマになり得ることが確認されました。同社CEOと技術LOIを最終化中であり、最初の技術的関係を具体化しています。
        </p>
      </div>

      <div className="mt-8 grid max-w-[1640px] grid-cols-[1fr_1.15fr] gap-x-10">
        <div>
          <SectionLabel>Why this benchmark</SectionLabel>
          <ul className="mt-4 space-y-2.5 text-[17px] leading-[1.55] text-fg-secondary">
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>具体的で、測定可能で、商業的関連性が高い</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>日本国内の触覚センシング企業との関心と一致</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                ロボット全体の再設計を必要とせず、1つのセンサー・アクチュエータループでArcを検証可能
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                将来的に、より広いロボットマニピュレーションと物理応答へ自然に展開可能
              </span>
            </li>
          </ul>
        </div>

        <div>
          <SectionLabel>Metrics — what they prove</SectionLabel>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <MetricGroup
              group="Speed"
              items={["応答時間、スリップから補正まで", "グリッパー補正速度"]}
            />
            <MetricGroup
              group="Reliability"
              items={["把持安定性", "把持失敗／落下の低減"]}
            />
            <MetricGroup
              group="Efficiency"
              items={[
                "1回の補正応答あたりのエネルギー",
                "Arcと従来制御ベースラインの比較",
              ]}
            />
            <MetricGroup
              group="Adaptation"
              items={[
                "重量、表面、形状の変化",
                "動作・ノイズへのロバスト性",
              ]}
            />
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="05 · ベンチマーク" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  05 · Solution / Arc Architecture
// ---------------------------------------------------------------------
function SolutionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Architecture</Eyebrow>
      <h2 className="text-[48px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        <span className="italic">Arc</span>：ロボットのためのローカル反射層
      </h2>
      <p className="mt-2 max-w-[1500px] text-[20px] font-light leading-[1.45] text-fg-secondary">
        Arcは、生体の反射神経に着想を得た、
        高速なローカル応答経路を提供します。
      </p>

      <div className="mt-5 w-full min-w-0 max-w-[1640px] overflow-hidden rounded-[12px] border border-border">
        <ArcIntegrationCanvas compact highDpi />
      </div>

      <div className="mt-5 grid max-w-[1640px] grid-cols-[1.2fr_1fr] gap-x-10">
        <div>
          <div className="inline-block rounded-[8px] border border-accent bg-accent-subtle px-4 py-2 text-[18px] font-semibold leading-[1.25] text-fg-primary">
            置き換え型コントローラではありません。有界なローカル応答層です。
          </div>
          <p className="mt-3 text-[17px] leading-[1.5] text-fg-secondary">
            Arcは既存のロボティクススタックと連携し、特に
            <span className="font-semibold text-fg-primary">
              高速なローカル応答、適応、または低い計算負荷
            </span>
            が重要となるセンサー・アクチュエータループに焦点を当てます。
          </p>
        </div>
        <div className="text-[16px] leading-[1.5] text-fg-secondary">
          <div className="flex gap-3">
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-fg-caption">
              Task-level control
            </span>
            <span>既存コントローラ → モーターコントローラ</span>
          </div>
          <div className="mt-1 flex gap-3">
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-fg-caption">
              Bounded correction
            </span>
            <span>Arc → モーターコントローラ</span>
          </div>
          <div className="mt-1 flex gap-3">
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-fg-caption">
              State feedback
            </span>
            <span>Arc → メインコントローラ</span>
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="06 · アーキテクチャ" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  07 · Customer Benefits
// ---------------------------------------------------------------------
function BenefitsSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Customer Benefits</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        <span className="italic">Arc</span>はロボティクスの経済性をどう改善するか
      </h2>
      <p className="mt-4 max-w-[1500px] text-[21px] font-normal leading-[1.5] text-fg-secondary">
        Arcは選択した物理制御ループの改善を目指し、ロボティクス企業が導入コストを下げ、信頼性を高め、プラットフォームの対応範囲を広げることを支援します。
      </p>

      <div className="mt-6 flex max-w-[1640px] flex-1 flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <RoboticsEconomicsCard
            title="導入コストの削減"
            body="オブジェクト、表面、ペイロード、環境が変わると、ロボットは現場ごとのチューニングを必要とすることが多い。Arcは選択した制御ループ内のローカル適応を狙い、現場で信頼性高く動かすためのエンジニアリング負担を減らします。"
            impact="現場エンジニアリングの削減、導入サイクルの短縮、顧客あたりのマージン改善。"
            impactLabel="ビジネスインパクト"
          />
          <RoboticsEconomicsCard
            title="信頼性の向上"
            body="スリップ、不安定な接触、振動、センサノイズ、荷重変化などの物理的失敗は、ワークフローを止め、信頼を損ない、人の介入を招く。Arcは、より広いシステムが介入する前に、選択したローカルループを安定させるよう設計されています。"
            impact="失敗の低減、稼働率向上、顧客横断で再現しやすい導入。"
            impactLabel="ビジネスインパクト"
          />
          <RoboticsEconomicsCard
            title="対応可能なタスクの拡張"
            body="ロボティクス企業がより多様なタスクへ広がるには、物理的変化への応答が必要。Arcは、接触、力、スリップ、不均衡、ノイズ入力に対するより速いローカル応答層を追加します。"
            impact="より広いユースケース、強い製品差別化、高い顧客価値。"
            impactLabel="ビジネスインパクト"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <RoboticsEconomicsCard
            title="計算・エネルギー効率の改善"
            body="すべての物理事象をCPU、GPU、クラウド、重い推論で処理する必要はない。ArcはFPGA上で選択した反射レベルの応答をローカルに処理し、低レイテンシと低エネルギーでの修正を狙います。"
            impact="より効率的な組込み制御、モバイル、支援、ヒューマノイド、現場ロボティクスへの適合。"
            impactLabel="ビジネスインパクト"
          />
          <RoboticsEconomicsCard
            title="統合リスクの低減"
            body="Arcは代替コントローラではない。既存のロボットコントローラが主導権を持ったまま、一つの制御クリティカルループで試せます。"
            impact="導入摩擦の低減、明確なパイロット経路、パートナー評価のしやすさ。"
            impactLabel="ビジネスインパクト"
          />
        </div>

        <div className="mt-auto rounded-[10px] border-2 border-accent bg-accent-subtle px-7 py-5">
          <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
            Bottom line
          </div>
          <p className="mt-2 text-[22px] font-light leading-[1.4] tracking-[-0.015em] text-fg-primary">
            Arcはロボットをより速く反応させるだけではない。ロボティクスプラットフォームをより導入しやすく、現場でより信頼でき、より収益性高くスケールできるよう設計されている。
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="07 · 顧客価値" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  07 · Product / Technical Status
// ---------------------------------------------------------------------
function PhaseTargetCard({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  return (
    <div className="rounded-[8px] border border-border bg-bg-base px-5 py-4">
      <div className="text-[18px] font-semibold text-fg-primary">{label}</div>
      <div className="mt-1.5 text-[16px] leading-[1.5] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

function StatusSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Status</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        Phase 1では、基盤が実ハードウェア上で動作することを示しました。
        <br />
        Phase 2（次のステップ）：閉ループ構築、スリップ検知と応答検証、ベースライン比較
      </h2>

      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-10">
        <div className="rounded-[8px] border border-border bg-bg-subtle p-7">
          <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-fg-caption">
            Phase 1 — completed
          </div>
          <div className="mt-4 text-[26px] font-light leading-[1.3] tracking-[-0.01em] text-fg-primary">
            基盤は実ハードウェア上で動作済み
          </div>
          <ul className="mt-5 space-y-3 text-[18px] leading-[1.55] text-fg-secondary">
            <li className="flex gap-3">
              <span className="text-accent">✓</span>
              <span>FPGAハードウェア上でリザバーコンピューティングを実装</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">✓</span>
              <span>ライブセンサーストリームによる分類とモーショントラッキングを検証</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">✓</span>
              <span>シミュレーションではなく、実シリコン上でのハードウェア検証を完了</span>
            </li>
          </ul>
        </div>

        <div className="rounded-[8px] border border-accent bg-accent-subtle p-7">
          <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
            Phase 2（次のステップ）
          </div>
          <div className="mt-4 text-[26px] font-light leading-[1.3] tracking-[-0.01em] text-fg-primary">
            閉ループ構築、スリップ検知と応答検証、ベースライン比較
          </div>
          <ul className="mt-5 space-y-3 text-[18px] leading-[1.55] text-fg-primary">
            <li className="flex gap-3">
              <span className="text-accent">→</span>
              <span>触覚センサー＋グリッパーによる閉ループベンチマーク</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">→</span>
              <span>スリップ検知と高速ローカル応答</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">→</span>
              <span>従来のデジタル制御ベースラインとの比較</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 max-w-[1640px]">
        <MutedLabel>Phase 2 benchmark targets — not yet proven</MutedLabel>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <PhaseTargetCard
            label="Latency"
            body="アクチュエータ側でのサブミリ秒応答を目標"
          />
          <PhaseTargetCard
            label="Energy"
            body="ベースラインより低い1回の補正応答あたりのエネルギーを目標"
          />
          <PhaseTargetCard
            label="Adaptation"
            body="変化する物理条件下での安定制御を目標"
          />
        </div>
      </div>

      <SlideFooter pageLabel="08 · ステータス" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  08 · Why FPGA First
// ---------------------------------------------------------------------
function FpgaLoopStep({
  index,
  label,
  emphasis = false,
}: {
  index: number;
  label: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-[156px] min-w-[148px] flex-1 flex-col justify-between rounded-[8px] border px-5 py-4 ${
        emphasis
          ? "border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
        Step {String(index).padStart(2, "0")}
      </div>
      <div className="text-[18px] leading-[1.34] text-fg-primary">{label}</div>
    </div>
  );
}

function FpgaSlide() {
  return (
    <Slide align="start">
      <Eyebrow>FPGA Strategy</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        FPGAを活用した検証とIP構築
      </h2>
      <p className="mt-6 max-w-[1500px] text-[26px] font-light leading-[1.45] text-fg-secondary">
        私たちは、アーキテクチャを固定する前に、
        FPGA上で検証と改良を繰り返します。
      </p>

      <div className="mt-8 flex min-h-0 flex-1 w-full max-w-[1640px] flex-col gap-10">
        <div>
          <div className="font-mono text-[14px] font-semibold uppercase tracking-[0.12em] text-fg-caption">
            IP discovery loop
          </div>
          <div className="mt-5 flex flex-wrap items-stretch gap-3">
            <FpgaLoopStep index={1} label="FPGA検証" emphasis />
            <FlowArrow />
            <FpgaLoopStep index={2} label="実センサー・アクチュエータ実験" />
            <FlowArrow />
            <FpgaLoopStep index={3} label="独自ベンチマークデータ" />
            <FlowArrow />
            <FpgaLoopStep index={4} label="チューニング・ノウハウ" />
            <FlowArrow />
            <FpgaLoopStep index={5} label="特許化可能な手法" />
            <FlowArrow />
            <FpgaLoopStep index={6} label="リファレンスデザイン／ASIC／ライセンス" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-14 gap-y-8">
          <div>
            <div className="font-mono text-[15px] uppercase tracking-[0.16em] text-accent">
              What FPGA enables today
            </div>
            <ul className="mt-5 space-y-3.5 text-[19px] leading-[1.55] text-fg-secondary">
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>シリコンへ固定する前にアーキテクチャを反復可能</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>異なるセンサー、プロトコル、制御ループへ適応可能</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>将来のライセンスパートナー向け統合レシピを構築可能</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[15px] uppercase tracking-[0.16em] text-accent">
              What FPGA unlocks downstream
            </div>
            <ul className="mt-5 space-y-3.5 text-[19px] leading-[1.55] text-fg-secondary">
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>実ロボットシステムから独自ベンチマークデータを収集</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>特許化可能な制御手法とチューニング戦略を特定</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>ASIC、リファレンスデザイン、組込みIPへの明確な展開経路</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-auto max-w-[1500px] text-[23px] font-light italic leading-[1.45] text-fg-primary">
          FPGAにより、Hinokiはアーキテクチャを固定する前に学習できます。
        </p>
      </div>

      <p className="absolute bottom-[110px] left-[140px] right-[140px] text-[15px] leading-[1.55] text-fg-caption">
        FPGAは検証とIP発見のための手段であり、必ずしも最終的なコスト構造ではありません。検証後、ASIC、リファレンスデザイン、または組込みIPへ展開します。
      </p>

      <SlideFooter pageLabel="09 · FPGA" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  09 · Traction / External Validation
// ---------------------------------------------------------------------
function TractionCard({
  label,
  headline,
  children,
}: {
  label: string;
  headline?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-6">
      <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      {headline ? (
        <p className="mt-3 text-[21px] font-light leading-[1.3] tracking-[-0.01em] text-fg-primary">
          {headline}
        </p>
      ) : null}
      <div className={`flex flex-1 flex-col gap-3 ${headline ? "mt-4" : "mt-4"}`}>
        {children}
      </div>
    </div>
  );
}

function TractionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
        {title}
      </div>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function TractionProse({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16px] leading-[1.5] text-fg-primary">{children}</p>
  );
}

function TractionInvestorRow({
  name,
  status,
  logoSrc,
  logoMaxH = 28,
  logoMaxW = 124,
}: {
  name: string;
  status: string;
  logoSrc?: string;
  logoMaxH?: number;
  logoMaxW?: number;
}) {
  return (
    <div className="grid grid-cols-[132px_minmax(0,1fr)] items-center gap-x-4 border-b border-border/70 py-[8px] last:border-b-0">
      <div
        className="flex min-h-11 items-center justify-start"
        aria-hidden={!!logoSrc}
      >
        {logoSrc ? (
          <img
            src={logoSrc}
            alt=""
            className="block w-auto object-contain object-left"
            style={{ maxHeight: logoMaxH, maxWidth: logoMaxW }}
          />
        ) : (
          <span className="max-w-[132px] text-[13px] font-semibold leading-[1.25] tracking-[-0.01em] text-fg-primary">
            {name}
          </span>
        )}
      </div>
      <p className="text-[16px] leading-[1.4] text-fg-secondary">{status}</p>
    </div>
  );
}

function CustomerPartnerTractionCard() {
  return (
    <TractionCard label="Customer / Partner">
      <TractionSection title="現在の進展">
        <div className="rounded-[8px] border border-accent bg-accent-subtle px-4 py-3">
          <p className="text-[16px] leading-[1.5] text-fg-primary">
            東京の触覚センシング企業とLOIを進行中
          </p>
          <p className="mt-2 text-[16px] leading-[1.5] text-fg-primary">
            スリップ検知を最初の検証テーマとして合意
          </p>
        </div>
      </TractionSection>

      <TractionSection title="Additional discovery">
        <ul className="space-y-2.5 text-[16px] leading-[1.5] text-fg-primary">
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              支援ロボティクス企業：研究者との会話を完了。支援制御におけるリアルタイム応答遅延が障壁であることを確認。CEO面談を設定済み。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              認知ロボティクス企業：認知層と物理実行層の補完関係について、共同創業者との面談を調整中。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              視覚ベース触覚センシング企業：パートナーシップ協議に向けた紹介ルートを特定。
            </span>
          </li>
        </ul>
      </TractionSection>

      <TractionSection title="Engineer discovery">
        <TractionProse>
          AMR、ヒューマノイド、四足歩行、支援ロボティクス、海洋、サービスロボティクス領域のエンジニアから、レイテンシ、ノイズ入力、荷重変化、車輪スリップ、リアルタイム応答に関する課題を確認。
        </TractionProse>
      </TractionSection>
    </TractionCard>
  );
}

function InvestorProgramTractionCard() {
  return (
    <TractionCard
      label="Investor / Program Momentum"
      headline="スクリーニングと投資家対話が進行中"
    >
      <div className="border-t border-border/70">
        <TractionInvestorRow
          name="Antler Japan"
          logoSrc="/assets/antler-wordmark.png"
          logoMaxH={26}
          logoMaxW={108}
          status="2026年5月採択"
        />
        <TractionInvestorRow
          name="Coreline / Atlas"
          logoSrc="/assets/coreline-logo.png"
          logoMaxH={34}
          logoMaxW={132}
          status="一次スクリーニング通過、対面チーム面談を調整中"
        />
        <TractionInvestorRow
          name="Sony Innovation Fund"
          status="前向きな反応、deep techチームへ資料共有済み"
        />
        <TractionInvestorRow
          name="Co-Capital / Founder Institute Japan"
          logoSrc="/assets/co-capital-logo.png"
          logoMaxH={26}
          logoMaxW={132}
          status="継続的な対話中"
        />
        <TractionInvestorRow
          name="Spiral Capital"
          logoSrc="/assets/spiral-capital-logo.png"
          logoMaxH={44}
          logoMaxW={132}
          status="将来の投資対話に向けた関係構築開始"
        />
        <TractionInvestorRow
          name="The Ventures Award 2026"
          status="一次審査通過"
        />
      </div>
    </TractionCard>
  );
}

function TechnicalCredibilityTractionCard() {
  return (
    <TractionCard
      label="Technical Credibility"
      headline="実行に向けたハードウェア検証とアドバイザー体制が形成中"
    >
      <TractionSection title="Hardware status">
        <ul className="space-y-2 text-[16px] leading-[1.5] text-fg-primary">
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>ライブセンサー入力を用いたPhase 1 FPGAリザバー検証を完了</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>
              Antler Japan Residencyでの披露に向け、6週間のデモスプリントを進行中
            </span>
          </li>
        </ul>
      </TractionSection>

      <TractionSection title="Phase 2 path">
        <TractionProse>
          触覚センサー＋グリッパーによる閉ループベンチマークを計画中。
        </TractionProse>
        <p className="mt-2 text-[16px] leading-[1.5] text-fg-primary">
          測定項目：応答時間、1回の応答あたりのエネルギー、適応性、信号ロバスト性、ベースライン比較。
        </p>
      </TractionSection>

      <TractionSection title="Advisor network">
        <ul className="space-y-2 text-[16px] leading-[1.5] text-fg-primary">
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>Physical HRIおよびメカトロニクス分野のPhDアドバイザーから口頭承諾を取得</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>ニューロモルフィックネットワーク分野のPhDアドバイザーが7月より参加予定</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>AISTシニアロボティクス研究者と協議中</span>
          </li>
        </ul>
      </TractionSection>
    </TractionCard>
  );
}

function TractionSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Traction</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        初期検証シグナル
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        顧客発見、投資家・プログラム面での進展、技術アドバイザー体制が、同じ検証パスに向けて収束しています。
      </p>

      <div className="mt-8 grid max-w-[1640px] grid-cols-3 gap-5">
        <CustomerPartnerTractionCard />
        <InvestorProgramTractionCard />
        <TechnicalCredibilityTractionCard />
      </div>

      <p className="mt-5 max-w-[1640px] text-[12px] italic leading-[1.5] text-fg-caption">
        ステータス表現は意図的に正確にしています。ここに記載された段階を超える投資、商業契約、パートナーシップ上のコミットメントを示すものではありません。
      </p>

      <SlideFooter pageLabel="10 · トラクション" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  10 · Market / Expansion Path
// ---------------------------------------------------------------------
function MarketTier({
  tier,
  size,
  label,
  body,
  footnote,
  emphasis = false,
}: {
  tier: string;
  size: string;
  label: string;
  body: string;
  footnote: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-[8px] border p-5 ${
        emphasis
          ? "border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div
        className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
          emphasis ? "text-accent" : "text-fg-caption"
        }`}
      >
        {tier}
      </div>
      <div className="mt-3 text-[44px] font-light leading-[1.0] tracking-[-0.02em] text-fg-primary">
        {size}
      </div>
      <div className="mt-2 text-[17px] font-medium leading-[1.25] text-fg-primary">
        {label}
      </div>
      <div className="mt-2 text-[14px] leading-[1.5] text-fg-secondary">
        {body}
      </div>
      <div className="mt-auto pt-3 text-[11px] leading-[1.4] text-fg-caption">
        {footnote}
      </div>
    </div>
  );
}

function MarketSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Market</Eyebrow>
      <h2 className="text-[48px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        初期の検証市場から、ロボティクス全体へと展開していきます。
      </h2>
      <p className="mt-3 max-w-[1500px] text-[20px] font-normal leading-[1.5] text-fg-secondary">
        Hinokiは、狭く検証可能なウェッジから開始し、センサー・アクチュエータ応答が重要となるロボティクスプラットフォーム全体へ展開します。
      </p>

      <div className="mt-6 grid max-w-[1640px] grid-cols-3 gap-4">
        <MarketTier
          tier="Initial beachhead"
          size="$15B+"
          label="2030年までの触覚・力覚センシング市場"
          body="ロボットグリッパー、触覚センサー、産業用マニピュレーションは、Arcの最初の有償検証ウェッジです。"
          footnote="Industry analyst aggregates¹"
          emphasis
        />
        <MarketTier
          tier="Serviceable market"
          size="$170B"
          label="2030年までのグローバルロボティクス市場"
          body="産業オートメーションはすでに$300B+規模で導入されており、サービスロボティクスは2030年までに$40B+へ成長見込みです。Arcは、これらのプラットフォーム内のローカル応答層をライセンスします。"
          footnote="IFR World Robotics · Statista²"
        />
        <MarketTier
          tier="Long-term opportunity"
          size="$165B"
          label="2034年までのヒューマノイドロボット市場、50% CAGR"
          body="人と同じ空間で制限なく協働するロボットの普及には、リアルタイムな物理知能が必要です。Arcは、その層で動作します。"
          footnote="Goldman Sachs Research · McKinsey³"
        />
      </div>

      <div className="mt-5 max-w-[1640px] rounded-[8px] border border-accent bg-accent-subtle px-6 py-4">
        <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
          Japan strategic frame
        </div>
        <p className="mt-2 text-[17px] leading-[1.5] text-fg-primary">
          日本は、
          <span className="font-semibold">高齢化社会</span>、
          <span className="font-semibold">製造業の再興</span>、
          <span className="font-semibold">ヒューマノイド領域の進展</span>
          が交差する、構造的なロボティクス機会を持っています。METIは2035年までにロボット産業で約
          <span className="font-semibold">10兆円規模</span>
          のインパクトを目標としています。⁴ Hinokiは、日本がアーキテクチャレベルで保有し得る「ローカル物理応答層」を構築します。
        </p>
      </div>

      <div className="mt-4 max-w-[1640px]">
        <MutedLabel>Beachhead → expansion path</MutedLabel>
        <div className="mt-2 flex flex-wrap items-stretch gap-2">
          <FlowBox label="触覚スリップ・グリッパー応答" emphasis />
          <FlowArrow />
          <FlowBox label="産業・協働ロボット" />
          <FlowArrow />
          <FlowBox label="モバイル・ヒューマノイド" />
          <FlowArrow />
          <FlowBox label="支援機器・ドローン・四足歩行" />
        </div>
      </div>

      <p className="mt-4 max-w-[1640px] text-[11px] leading-[1.45] text-fg-caption">
        ¹ 触覚・力覚センサー市場予測；業界アナリスト集計。² IFR World Robotics・Statista グローバルロボティクス市場（2024→2030）。³ Goldman Sachs Research ヒューマノイド市場 2024–2035；McKinsey。⁴ METI ロボット政策ビジョン（2024改訂）— 2035年までの産業インパクト目標。
      </p>

      <SlideFooter pageLabel="11 · 市場" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  11 · Business Model
// ---------------------------------------------------------------------
function ModelPhaseCard({
  phase,
  title,
  items,
}: {
  phase: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
        {phase}
      </div>
      <div className="mt-4 text-[26px] font-light leading-[1.25] tracking-[-0.01em] text-fg-primary">
        {title}
      </div>
      <ul className="mt-5 space-y-2.5 text-[17px] leading-[1.55] text-fg-secondary">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span className="text-accent">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BusinessModelSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Business Model</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        検証から始め、最終的にライセンス展開へ
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-light leading-[1.45] text-fg-secondary">
        Hinokiはロボットを製造するのではなく、
        <span className="font-semibold text-fg-primary">
          ロボティクスプラットフォームの内部に入ることで価値を獲得
        </span>
        します。
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-5">
        <ModelPhaseCard
          phase="Near term — Phase 1"
          title="Validation &amp; co-development"
          items={[
            "非希薄化助成金およびR&D資金",
            "有償の技術検証プロジェクト",
            "ロボティクス企業との共同ベンチマーク",
          ]}
        />
        <ModelPhaseCard
          phase="Mid term — Phase 2"
          title="Reference design licensing"
          items={[
            "統合フィー＋リファレンスデザインライセンス",
            "Arc制御モジュール／組込み制御層",
            "センサー、グリッパー、プラットフォーム企業向け統合支援",
          ]}
        />
        <ModelPhaseCard
          phase="Long term — Phase 3"
          title="Embedded IP &amp; royalties"
          items={[
            "アーキテクチャライセンス",
            "プラットフォーム単位またはユニット単位のロイヤリティ",
            "ロボティクスプラットフォーム内の組込みIP",
          ]}
        />
      </div>

      <div className="mt-8 max-w-[1640px] rounded-[8px] border border-border bg-bg-subtle px-6 py-5">
        <div className="grid grid-cols-[220px_1fr] gap-6">
          <div>
            <SectionLabel>Cost structure</SectionLabel>
            <div className="mt-2 text-[13px] leading-[1.5] text-fg-caption">
              主な費用項目
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-[15px] leading-[1.5] text-fg-secondary">
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>R&amp;Dエンジニアリング</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>ハードウェア調達、FPGA、センサー、アクチュエータ</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>ベンチマーク装置および検証機材</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>センサー／アクチュエータ統合</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>IP／特許関連費用</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent">·</span>
              <span>パートナー検証支援</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-[1500px] text-[20px] font-light italic leading-[1.45] text-fg-primary">
        私たちはロボットを作る会社ではありません。{" "}
        <span className="not-italic font-semibold">
          ロボットがより良く物理応答するための制御アーキテクチャをライセンスする会社です。
        </span>
      </p>

      <SlideFooter pageLabel="12 · ビジネスモデル" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  12 · Competitive Positioning
// ---------------------------------------------------------------------
function StackLayer({
  layer,
  label,
  body,
  examples,
  emphasis = false,
}: {
  layer: string;
  label: string;
  body: string;
  examples: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[200px_1fr_1.3fr_1fr] items-center gap-6 rounded-[8px] border px-6 ${
        emphasis
          ? "border-accent border-2 bg-accent-subtle py-5 shadow-[0_2px_0_rgba(232,98,42,0.08)]"
          : "border-border bg-bg-subtle py-4"
      }`}
    >
      <div
        className={`font-mono uppercase ${
          emphasis
            ? "text-[14px] font-semibold tracking-[0.16em] text-accent"
            : "text-[12px] tracking-[0.14em] text-fg-caption"
        }`}
      >
        {layer}
      </div>
      <div
        className={`leading-[1.25] text-fg-primary ${
          emphasis
            ? "text-[22px] font-semibold"
            : "text-[20px] font-medium"
        }`}
      >
        {label}
      </div>
      <div
        className={`leading-[1.5] ${
          emphasis ? "text-[16px] text-fg-primary" : "text-[15px] text-fg-secondary"
        }`}
      >
        {body}
      </div>
      <div
        className={`italic leading-[1.5] ${
          emphasis ? "text-[14px] text-fg-primary" : "text-[14px] text-fg-caption"
        }`}
      >
        {examples}
      </div>
    </div>
  );
}

function PositioningSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Positioning</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        Hinokiはロボティクススタックのどこに位置するのか。
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-normal leading-[1.55] text-fg-secondary">
        市場はすでに活発ですが、センシングとアクチュエーションの間にある物理応答層は、まだ十分に開発されていません。
      </p>

      <div className="mt-10 flex max-w-[1640px] flex-col gap-2.5">
        <StackLayer
          layer="Cognition"
          label="AI / Planning"
          body="高次の自律性、認識、意思決定。"
          examples="認知ロボティクス、自律システム企業、VLAモデル"
        />
        <StackLayer
          layer="Control OS"
          label="Robot OS / Motion Control"
          body="タスクレベル制御、軌道計画、従来型コントローラ。"
          examples="PID、MPC、PLC、既存ロボットコントローラ"
        />
        <StackLayer
          layer="Sensing"
          label="Tactile / Vision / Event-based Sensing"
          body="力、スリップ、接触、視覚信号を取得。"
          examples="触覚センシングパートナー、視覚ベース触覚、イベントベースセンサー"
        />
        <StackLayer
          layer="Hinoki · Arc"
          label="Local Reflex Control"
          body="センサー入力 → Arc → 有界補正 → モーターコントローラ。センシングとアクチュエーションの間にある、欠けていた層。"
          examples="Neuromorphic · Reservoir Computing · FPGA-first"
          emphasis
        />
        <StackLayer
          layer="Hardware"
          label="Motors / Grippers / Actuators / Robot Body"
          body="Arcが応答と適応を支える物理プラットフォーム。"
          examples="産業、協働、モバイル、ヒューマノイド、支援機器"
        />
      </div>

      <p className="mt-8 max-w-[1500px] text-[22px] font-light leading-[1.45] text-fg-primary">
        <span className="font-semibold">Arcの位置づけ</span>
        <br />
        <span className="italic text-fg-secondary">
          センサー → Arc → コントローラ → アクチュエータ
        </span>
      </p>

      <SlideFooter pageLabel="13 · ポジショニング" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  13 · Team
// ---------------------------------------------------------------------
function TeamSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Team</Eyebrow>
      <h2 className="text-[52px] font-light leading-[1.12] tracking-[-0.02em] text-fg-primary">
        長期的な信頼関係と補完的な役割に基づく創業チーム
      </h2>

      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-6">
        <FounderCard
          imageSrc="/team/salvatore.jpg"
          objectPosition="center 30%"
          affiliation="筑波大学"
          name="Salvatore Martone"
          role="Co-founder / CEO · Commercial"
          body={
            <>
              筑波大学（生物科学群）。{" "}
              <span className="font-semibold text-fg-primary">
                Arc事業仮説の共同設計者
              </span>
              として生物学的フレーミングを導入。日本企業の
              <span className="font-semibold text-fg-primary">
                経営層（C-suite）
              </span>
              向けに企業支援実務をゼロから構築。Hinokiの
              <span className="font-semibold text-fg-primary">
                商業戦略および投資家関係
              </span>
              を統括。
            </>
          }
        />
        <FounderCard
          imageSrc="/team/bernardo.png"
          affiliation="筑波大学・AISTつくば"
          name="Bernardo Gatto"
          role="Co-founder / CTO · Industry &amp; Technical"
          body={
            <>
              <span className="font-semibold text-fg-primary">
                PhD（コンピュータビジョン）
              </span>
              。{" "}
              <span className="font-semibold text-fg-primary">
                Arc仮説の共同設計者
              </span>
              としてFPGA上で実装。
              <span className="font-semibold text-fg-primary">
                産業経験10年以上
              </span>
              （ロボティクス・組込みAI・ハードウェア統合）。JSPS研究助成・MEXT奨学生・AISTつくば研究員経験。Phase
              1を構築・検証。
            </>
          }
        />
        <FounderCard
          imageSrc="/team/mina.jpg"
          objectPosition="center 25%"
          affiliation="明治安田生命・昭和女子大学"
          name="Mina Otsuka"
          role="Co-founder / COO · Japan Operations"
          body={
            <>
              <span className="font-semibold text-fg-primary">
                日本語ネイティブ
              </span>
              。日本有数の金融大手
              <span className="font-semibold text-fg-primary">明治安田生命</span>
              にてビジネス開発・顧客関係
              <span className="font-semibold text-fg-primary">マネージャー</span>
              。日本企業文化への深い理解。全国の
              <span className="font-semibold text-fg-primary">
                ロボティクスエンジニア・研究機関
              </span>
              との関係構築を担当。
            </>
          }
        />
      </div>

      <div className="mt-8 max-w-[1640px] rounded-[8px] border border-border bg-bg-subtle/70 p-6">
        <div className="grid grid-cols-[200px_1fr] gap-6">
          <div>
            <SectionLabel>Founder connection</SectionLabel>
          </div>
          <ul className="space-y-2.5 text-[17px] leading-[1.55] text-fg-secondary">
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                <span className="font-semibold text-fg-primary">
                  SalvatoreとBernardo
                </span>
                は、筑波大学時代から
                <span className="font-semibold text-fg-primary">8年</span>
                来の関係
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                <span className="font-semibold text-fg-primary">Mina</span>
                は過去
                <span className="font-semibold text-fg-primary">4年間</span>
                にわたりチームと深い関係を構築。つくばに長く根ざした生活基盤を持つ
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                創業チームは、短期的なプログラムのために組成されたものではなく、
                <span className="font-semibold text-fg-primary">
                  長期的な信頼関係
                </span>
                に基づいている
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">·</span>
              <span>
                <span className="font-semibold text-fg-primary">共通のミッション：</span>
                つくばに根ざしたdeep tech企業をつくり、日本に貢献し、日本人研究者と海外研究者が共に働ける場をつくること
              </span>
            </li>
          </ul>
        </div>
      </div>

      <SlideFooter pageLabel="14 · チーム" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  14 · Technical Advisory Network
// ---------------------------------------------------------------------
function AdvisorCard({
  status,
  variant = "pending",
  area,
  background,
  deRisks,
  deRisksLabel = "De-risks",
  committedLabel = "Committed",
}: {
  status: string;
  variant?: "committed" | "expected" | "pending";
  area: string;
  background: string;
  deRisks: string;
  deRisksLabel?: string;
  committedLabel?: string;
}) {
  const isCommitted = variant === "committed";
  const statusTone = isCommitted
    ? "text-accent"
    : variant === "expected"
      ? "text-fg-secondary"
      : "text-fg-caption";

  return (
    <div
      className={`flex h-full flex-col rounded-[8px] p-6 ${
        isCommitted
          ? "border-2 border-accent bg-accent-subtle"
          : "border border-border bg-bg-subtle/70"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {isCommitted ? (
          <span className="rounded-[4px] border border-accent/40 bg-bg-base px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
            {committedLabel}
          </span>
        ) : null}
        <div
          className={`font-mono text-[11px] uppercase tracking-[0.12em] ${statusTone}`}
        >
          {status}
        </div>
      </div>
      <div
        className={`mt-4 font-medium leading-[1.25] tracking-[-0.01em] text-fg-primary ${
          isCommitted ? "text-[22px]" : "text-[18px] text-fg-primary/90"
        }`}
      >
        {area}
      </div>
      <p
        className={`mt-2 text-[14px] leading-[1.5] ${
          isCommitted ? "text-fg-secondary" : "text-fg-caption"
        }`}
      >
        {background}
      </p>
      <div className="mt-5 flex-1">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
          {deRisksLabel}
        </div>
        <p
          className={`mt-2 text-[15px] leading-[1.5] ${
            isCommitted
              ? "font-medium text-fg-primary"
              : "text-fg-secondary"
          }`}
        >
          {deRisks}
        </p>
      </div>
    </div>
  );
}

function AdvisorsSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Advisory</Eyebrow>
      <h2 className="text-[52px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        技術アドバイザーは実行リスクを下げる
      </h2>
      <p className="mt-4 max-w-[1500px] text-[21px] font-normal leading-[1.5] text-fg-secondary">
        アドバイザー支援は、Physical HRI、メカトロニクス、ニューロモルフィックアーキテクチャ、日本のロボティクス研究エコシステムにわたる。
      </p>

      <div className="mt-6 flex max-w-[1640px] flex-1 flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <AdvisorCard
            variant="committed"
            status="Verbal agreement received"
            area="Physical HRI Advisor"
            background="PhD, University of Tsukuba · Professor, PUCP"
            deRisks="ヒューマンロボットインタラクション、支援ロボティクス、ヒト近接システムの物理検証。"
            deRisksLabel="低減するリスク"
            committedLabel="確定"
          />
          <AdvisorCard
            variant="committed"
            status="Verbal agreement received"
            area="Mechatronics Advisor"
            background="PhD, University of Tsukuba · Associate Professor, Nagoya University"
            deRisks="センサー・アクチュエータ統合、メカトロニクス検証、アーキテクチャ概念からハードウェア試験への移行。"
            deRisksLabel="低減するリスク"
            committedLabel="確定"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <AdvisorCard
            variant="expected"
            status="Expected from July"
            area="Neuromorphic Networks Advisor"
            background="PhD, University of Tokyo"
            deRisks="ニューロモルフィックアーキテクチャ、リザバー関連設計、将来のIP開発。"
            deRisksLabel="低減するリスク"
          />
          <AdvisorCard
            variant="pending"
            status="Pending discussion"
            area="AIST Senior Robotics Researcher"
            background="PhD, University of Tsukuba · Senior Researcher, AIST"
            deRisks="応用ロボティクスの視点、AISTエコシステムへのアクセス、将来の検証パートナーシップ。"
            deRisksLabel="低減するリスク"
          />
        </div>

        <div className="mt-auto rounded-[10px] border-2 border-accent bg-accent-subtle px-7 py-4">
          <p className="text-[18px] font-light leading-[1.45] tracking-[-0.015em] text-fg-primary">
            このネットワークは、
            <span className="font-semibold">ヒューマンロボットインタラクション</span>、
            <span className="font-semibold">ハードウェア統合</span>、
            <span className="font-semibold">ニューロモルフィックアーキテクチャ</span>、
            <span className="font-semibold">日本ロボティクスエコシステムへのアクセス</span>
            という4つの検証リスクを支援します。
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="15 · アドバイザリー" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  15 · 12-Month Plan & Use of Funds
// ---------------------------------------------------------------------
function PlanQuarter({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="font-mono text-[14px] uppercase tracking-[0.14em] text-accent">
        {label}
      </div>
      <ul className="mt-5 flex-1 space-y-4 text-[19px] leading-[1.55] text-fg-secondary">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span className="mt-1 shrink-0 text-accent">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanSlide() {
  return (
    <Slide align="start">
      <Eyebrow>12-Month Plan</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.12] tracking-[-0.02em] text-fg-primary">
        顧客発見からハードウェア検証へ。
      </h2>
      <p className="mt-5 max-w-[1500px] text-[26px] font-light leading-[1.45] text-fg-secondary">
        1stRoundの資金を使い、顧客発見を実証可能な技術データへと変換していきます。
      </p>

      <div className="mt-8 flex max-w-[1640px] flex-1 flex-col gap-8">
        <div className="grid flex-1 grid-cols-4 gap-6">
        <PlanQuarter
          label="0〜3か月"
          items={[
            "スリップ検知ベンチマーク要件の定義",
            "触覚センサー、グリッパー、FPGA、アクチュエータ構成の調達 — 初回LOIパートナーからのハードウェア調達も検討",
          ]}
        />
        <PlanQuarter
          label="3〜6か月"
          items={[
            "触覚センサーからアクチュエータまでの閉ループ検証リグを構築",
            "従来のデジタル制御とのベースライン比較を実施",
            "応答時間、適応性、エネルギー、安定性を測定",
          ]}
        />
        <PlanQuarter
          label="6〜9か月"
          items={[
            "検証データをパートナーへ共有",
            "ベンチマーク結果をもとにArcアーキテクチャを改善",
            "特許／IP出願戦略を準備",
          ]}
        />
        <PlanQuarter
          label="9〜12か月"
          items={[
            "パートナーパイロット計画を開始",
            "追加助成金へ申請",
            "ベンチマークデータをもとにエンジェル／VCラウンドを準備",
          ]}
        />
        </div>

        <div className="max-w-[1640px]">
          <div className="font-mono text-[15px] uppercase tracking-[0.16em] text-accent">
            Use of funds
          </div>
          <div className="mt-4 grid grid-cols-4 gap-x-8 gap-y-3.5 text-[20px] leading-[1.55] text-fg-secondary">
            <div>· FPGA改良および組込み制御テスト</div>
            <div>· 触覚センサー／グリッパー／アクチュエータ構成</div>
            <div>· 閉ループベンチマーク装置</div>
            <div>· 検証データセット作成</div>
            <div>· エンジニアリングおよびハードウェア統合</div>
            <div>· 特許／IP相談</div>
            <div>· 顧客発見およびパートナー開発</div>
            <div className="text-[19px] text-fg-caption">
              · 技術ドキュメント作成
            </div>
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="16 · 12ヶ月計画" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  16 · Five-Year Revenue & Expenditure Plan
// ---------------------------------------------------------------------
function YearRow({
  year,
  revenue,
  focus,
  expenses,
  emphasis = false,
}: {
  year: string;
  revenue: string;
  focus: string;
  expenses: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[120px_220px_1.4fr_1.2fr] items-start gap-6 border-b py-5 ${
        emphasis ? "border-accent" : "border-border"
      }`}
    >
      <div
        className={`font-mono text-[16px] uppercase tracking-[0.12em] ${
          emphasis ? "text-accent" : "text-fg-caption"
        }`}
      >
        {year}
      </div>
      <div className="text-[24px] font-light leading-[1.2] tracking-[-0.01em] text-fg-primary">
        {revenue}
      </div>
      <div className="text-[17px] leading-[1.5] text-fg-secondary">
        {focus}
      </div>
      <div className="text-[15px] leading-[1.5] text-fg-caption">
        {expenses}
      </div>
    </div>
  );
}

function FinancialSlide() {
  return (
    <Slide align="start">
      <Eyebrow>5-Year Plan</Eyebrow>
      <h2 className="text-[52px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        売上・支出計画
      </h2>
      <p className="mt-3 max-w-[1500px] text-[20px] font-light leading-[1.45] text-fg-secondary">
        検証から、有償パイロット、ライセンスへ向かう方向性のある計画です。
      </p>

      <div className="mt-6 max-w-[1640px] rounded-[8px] border border-accent bg-accent-subtle px-6 py-4">
        <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
          Revenue assumptions
        </div>
        <p className="mt-2 text-[17px] leading-[1.55] text-fg-primary">
          Year 2から有償検証・共同開発を開始し、
          Year 3〜5でリファレンスデザインや統合ライセンス、組込みIPのロイヤリティモデルへと移行します。
          当社の成長は、ロボットの製造ではなく、ロボティクスプラットフォームへのライセンス展開へ移ります。
        </p>
        <p className="mt-2 text-[15px] leading-[1.5] text-fg-secondary">
          営業収益には、助成金およびVC投資は含めません。
        </p>
      </div>

      <div className="mt-5 max-w-[1640px]">
        <div className="grid grid-cols-[110px_200px_1.4fr_1.2fr] gap-5 border-b border-border-strong pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-fg-primary">
          <div>Year</div>
          <div>Operating revenue</div>
          <div>Focus</div>
          <div>Expenses</div>
        </div>
        <YearRow
          year="Year 1"
          revenue="¥0〜5M"
          focus="検証、LOI、ベンチマークデータセット、助成金支援"
          expenses="ハードウェア、エンジニアリング、IP相談、顧客発見"
          emphasis
        />
        <YearRow
          year="Year 2"
          revenue="¥15〜50M"
          focus="1〜3件の有償検証／共同開発プロジェクト"
          expenses="エンジニアリング、統合、パートナー支援、ハードウェア改善"
        />
        <YearRow
          year="Year 3"
          revenue="¥80〜200M"
          focus="3〜6件の有償パートナープロジェクト、初期リファレンスデザインライセンス"
          expenses="技術チーム、ハードウェア、IP、事業開発"
        />
        <YearRow
          year="Year 4"
          revenue="¥300〜700M"
          focus="プラットフォームライセンス、統合フィー、継続的パートナー導入"
          expenses="サポートエンジニアリング、市場拡大、特許ポートフォリオ"
        />
        <YearRow
          year="Year 5"
          revenue="¥1B+"
          focus="組込みIPライセンス、リファレンスデザイン採用、プラットフォーム／ユニット単位ロイヤリティ"
          expenses="エンジニアリング拡大、パートナー支援、グローバル連携、IP維持"
        />
      </div>

      <div className="mt-5 max-w-[1640px]">
        <SectionLabel>Unit logic, directional</SectionLabel>
        <div className="mt-3 grid grid-cols-4 gap-3">
          <div className="rounded-[8px] border border-border bg-bg-subtle px-4 py-3.5">
            <div className="text-[14px] font-semibold leading-[1.3] text-fg-primary">
              有償検証／共同開発
            </div>
            <div className="mt-1.5 text-[13px] leading-[1.45] text-fg-secondary">
              1件あたり ¥5〜15M
            </div>
          </div>
          <div className="rounded-[8px] border border-border bg-bg-subtle px-4 py-3.5">
            <div className="text-[14px] font-semibold leading-[1.3] text-fg-primary">
              リファレンスデザイン／統合ライセンス
            </div>
            <div className="mt-1.5 text-[13px] leading-[1.45] text-fg-secondary">
              1パートナーあたり ¥10〜30M
            </div>
          </div>
          <div className="rounded-[8px] border border-border bg-bg-subtle px-4 py-3.5">
            <div className="text-[14px] font-semibold leading-[1.3] text-fg-primary">
              プラットフォームライセンス
            </div>
            <div className="mt-1.5 text-[13px] leading-[1.45] text-fg-secondary">
              範囲に応じて1パートナーあたり ¥30〜100M+
            </div>
          </div>
          <div className="rounded-[8px] border border-border bg-bg-subtle px-4 py-3.5">
            <div className="text-[14px] font-semibold leading-[1.3] text-fg-primary">
              組込みIPロイヤリティ
            </div>
            <div className="mt-1.5 text-[13px] leading-[1.45] text-fg-secondary">
              プラットフォーム単位またはユニット単位
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 max-w-[1640px] text-[12px] italic leading-[1.5] text-fg-caption">
        これは方向性を示す計画であり、精密な財務予測ではありません。売上は、Phase 2検証の成功、パートナー転換、ライセンス採用に依存します。助成金およびVC資金は営業収益に含めません。
      </p>

      <SlideFooter pageLabel="17 · 5年計画" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  17 · Closing / Funding Purpose
// ---------------------------------------------------------------------
function OutcomeTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[92px] items-center justify-center rounded-[8px] border border-border bg-bg-subtle px-4 py-4 text-center text-[14px] leading-[1.45] text-fg-secondary">
      {children}
    </div>
  );
}

function ClosingSlide() {
  const outcomes = [
    "閉ループ検証リグの構築",
    "Arcとデジタル制御ベースラインの比較",
    "パートナー向け検証データの作成",
    "IP戦略およびパイロット導入パスの準備",
  ];

  return (
    <Slide align="start">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow>Funding Purpose</Eyebrow>
          <h2 className="max-w-[1400px] text-[52px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
            資金調達が実現すること
          </h2>
          <p className="mt-5 max-w-[1400px] text-[22px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary">
            顧客発見を、最初のパートナー向けベンチマークデータセットへ変換するための非希薄化検証資金です。
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-12">
          <div className="max-w-[1640px]">
            <MutedLabel>What funding enables</MutedLabel>
            <div className="mt-5 grid grid-cols-4 gap-4">
              {outcomes.map((label) => (
                <OutcomeTile key={label}>
                  <span className="font-semibold text-fg-primary">{label}</span>
                </OutcomeTile>
              ))}
            </div>
          </div>

          <div className="mt-14 max-w-[1500px] space-y-10">
            <p className="text-[19px] leading-[1.6] text-fg-secondary">
              Hinokiは、触覚とグリッパーの閉ループベンチマークを構築し、
              Arcの性能を従来制御と比較・実証します。
              この検証データをもとに、パートナー連携・特許・ライセンス展開へとつなげていきます。
              現在、そのための非希薄化資金を求めています。
            </p>

            <p className="text-[26px] font-light italic leading-[1.38] tracking-[-0.01em] text-fg-primary">
              1つの測定可能な反射ループが、より広い
              <span className="not-italic font-semibold">物理知能アーキテクチャ</span>
              の基盤になります。
            </p>

            <p className="text-[14px] leading-[1.55] text-fg-secondary">
              私たちはこの会社を
              <span className="italic text-fg-primary">Hinoki</span>
              と名付けました。日本の檜が持つ分散的な構造は、Arcの背後にあるアーキテクチャ原理と重なっています。
            </p>
          </div>
        </div>

        <SlideFooter pageLabel="18 · 資金使途" />
      </div>
    </Slide>
  );
}

// =====================================================================
//  Ordered slide manifest — drives PitchDeck navigation
// =====================================================================
export const SLIDES_1STROUND_JP: Array<() => React.JSX.Element> = [
  TitleSlide,
  ProblemSlide,
  PhysicalResponseSolutionSlide,
  DiscoverySlide,
  BenchmarkSlide,
  SolutionSlide,
  BenefitsSlide,
  StatusSlide,
  FpgaSlide,
  TractionSlide,
  MarketSlide,
  BusinessModelSlide,
  PositioningSlide,
  TeamSlide,
  AdvisorsSlide,
  PlanSlide,
  FinancialSlide,
  ClosingSlide,
];
