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
//  Copy source: client-provided JA strings. Sync mobile-1stround-jp.tsx after
//  desktop changes. English deck: ../1stround/slides-1stround.tsx
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

function BenefitPillar({
  title,
  body,
  outcome,
}: {
  title: string;
  body: string;
  outcome: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-7">
      <div className="text-[36px] font-light leading-[1.1] tracking-[-0.015em] text-accent">
        {title}
      </div>
      {/* Fixed min-height keeps outcome rows aligned across cards even when
          body copy wraps to a different number of lines. */}
      <div className="mt-5 min-h-[110px] text-[16px] leading-[1.6] text-fg-secondary">
        {body}
      </div>
      <div className="mt-auto pt-6">
        <div className="border-l-[3px] border-accent pl-4 text-[18px] font-medium leading-[1.4] text-fg-primary">
          {outcome}
        </div>
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
    <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-fg-tertiary">
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
            <span className="text-fg-tertiary">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------
//  Neural motif — borrowed from the website hero. Static SVG so the
//  motion is preserved on screen but the deck PDF/print stays calm.
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
          animation: hn-breathe-1st 2.6s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes hn-breathe-1st {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
      `}</style>
      <path d="M60 200 C120 140, 200 260, 300 180 S460 120, 520 160" stroke="#E8622A" strokeWidth="1" opacity="0.3" />
      <path d="M40 240 C110 170, 220 300, 330 210 S490 150, 540 200" stroke="#C42B2B" strokeWidth="1" opacity="0.2" />
      <path d="M80 160 C150 100, 260 240, 360 150 S500 90, 550 120" stroke="#E8622A" strokeWidth="0.8" opacity="0.2" />
      <path d="M30 280 C100 200, 210 340, 310 240" stroke="#E8622A" strokeWidth="0.8" opacity="0.15" />

      <circle cx="60" cy="200" r="28" fill="#E8622A" opacity="0.08" />
      <circle cx="60" cy="200" r="16" fill="#E8622A" opacity="0.12" />
      <circle className="hn-node-1st" cx="60" cy="200" r="7" fill="#E8622A" opacity="0.9" />

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
        ロボットシステムのための
        <br />
        物理知能
      </h1>
      <p className="mt-12 max-w-[1180px] text-[28px] font-normal leading-[1.55] text-fg-secondary">
        <span className="italic font-semibold text-fg-primary">Arc</span>
        は、既存のロボットコントローラを置き換えるのではなく、センサーデータを
        <span className="font-semibold text-fg-primary">より高速な物理応答</span>
        へ変換するニューロモルフィック・ローカル制御層です。
      </p>

      <p className="mt-4 max-w-[1180px] text-[20px] font-light italic leading-[1.5] text-fg-primary">
        ロボットには「脳」が与えられてきました。{" "}
        <span className="not-italic font-semibold">
          Arcは、そこに「神経系」を加えます。
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
        className="pointer-events-none absolute right-[80px] top-[120px] opacity-70"
      >
        <NeuralMotif className="h-auto w-[780px]" />
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
function ProblemSlide() {
  const examples = [
    "物体のスリップ",
    "不安定な把持",
    "ノイズのあるセンサー入力",
    "荷重変化",
    "変化する床面・接触面",
    "トルク制御／速度制御",
    "多様な対象物の取り扱い",
    "リアルタイム性が求められる精密動作",
  ];
  return (
    <Slide>
      <Eyebrow>Problem</Eyebrow>
      <h2 className="text-[72px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        ロボットは認識し、計画できるようになった。
        <br />
        しかし、物理的な応答の瞬間でまだ失敗する。
      </h2>
      <p className="mt-10 max-w-[1500px] text-[24px] font-normal leading-[1.6] text-fg-secondary">
        ロボットの認識、計画、AI能力は急速に進化しています。一方で、実環境での導入では、センサーデータを即時かつ信頼性のある物理行動へ変換する「物理ループ」に課題が残ります。
      </p>

      <div className="mt-10 max-w-[1500px]">
        <MutedLabel>現在、物理ループが破綻しやすい場面</MutedLabel>
        <div className="mt-4">
          <ChipList items={examples} />
        </div>
      </div>

      <p className="mt-10 max-w-[1500px] text-[20px] leading-[1.6] text-fg-secondary">
        ロボティクス企業にとって、これは
        <span className="font-semibold text-fg-primary">ピッキング失敗</span>、
        <span className="font-semibold text-fg-primary">不安定なハンドリング</span>、
        <span className="font-semibold text-fg-primary">導入の遅れ</span>、継続的な再調整負担、実環境での信頼性低下につながります。
      </p>

      <p className="mt-8 max-w-[1500px] text-[26px] font-normal leading-[1.5] tracking-[-0.01em] text-fg-primary">
        課題は「知能」だけではありません。{" "}
        <span className="font-semibold">
          センサーデータを、実環境で信頼できる物理行動へ変換すること
        </span>
        です。
      </p>
      <SlideFooter pageLabel="02 · 課題" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  03 · Discovery Signals
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
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-5">
      <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
        {label}
      </div>
      {/* Fixed min-height so bodies align across the row even when
          headlines wrap to a different number of lines. */}
      <div className="mt-3 min-h-[64px] text-[22px] font-light leading-[1.2] tracking-[-0.01em] text-fg-primary">
        {headline}
      </div>
      <div className="mt-3 text-[15px] leading-[1.55] text-fg-secondary">
        {body}
      </div>
    </div>
  );
}

function EngineerQuote({
  role,
  quote,
}: {
  role: string;
  quote: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle px-5 py-5">
      <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent leading-[1.35]">
        {role}
      </div>
      <div className="mt-2.5 flex flex-1 items-center">
        <p className="text-[16px] leading-[1.58] text-fg-secondary">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

function DiscoverySlide() {
  return (
    <Slide align="start">
      <Eyebrow>Discovery</Eyebrow>
      <h2 className="text-[60px] font-light leading-[1.05] tracking-[-0.02em] text-fg-primary">
        エンジニアから見えてきたこと
      </h2>
      <p className="mt-4 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        顧客ヒアリングを通じて、Arcは広いアーキテクチャ仮説から、測定可能な最初の制御ループ・ベンチマークへと絞り込まれています。
      </p>

      <div className="mt-6 grid max-w-[1640px] grid-cols-3 gap-5">
        <DiscoveryCard
          label="Signal 01"
          headline="レイテンシは、特定の物理的瞬間で重要になる。"
          body="エンジニアからは、応答性、精度、アクチュエータ側の速度が重要となる場面では、レイテンシがボトルネックになり得るとの声がありました。"
        />
        <DiscoveryCard
          label="Signal 02"
          headline="物理環境の変化が不安定性を生む。"
          body="変化する床面、荷重変化、車輪スリップ、ノイズのあるセンサー、予測しにくい環境は、計画ループだけでは解決しにくい制御課題を生みます。"
        />
        <DiscoveryCard
          label="Signal 03"
          headline="スリップ応答は、測定可能な最初の入り口になる。"
          body="触覚センシングとグリッパー制御では、課題が具体化します。スリップを検知し、より速く応答し、対象物を安定させ、従来のデジタル制御ベースラインと比較できます。"
        />
      </div>

      <div className="mt-5 flex min-h-0 flex-1 flex-col max-w-[1640px]">
        <MutedLabel>Independent confirmation — engineer voices</MutedLabel>
        <div className="mt-3 grid flex-1 grid-cols-4 items-stretch gap-4">
          <EngineerQuote
            role="AMRトルク制御エンジニア"
            quote="車輪スリップには、トルク制御と速度制御を切り替えることで対応してきたが、それは妥協であり根本解決ではない。車輪側でループを閉じられれば、まだ改善余地がある。"
          />
          <EngineerQuote
            role="グリッパー／マニピュレーションエンジニア"
            quote="スリップは触覚データ上では先に見えているが、把持ループの応答が遅れる。部品が動き始めてから把持力を上げることになる。センサーからグリッパーまでの遅延は繰り返し課題になる。"
          />
          <EngineerQuote
            role="二足歩行ヒューマノイド研究者"
            quote="一度足場が滑ると、歩容制御はすでに遅れている。今も同じ制御スタックを通っており、接触に対する独立した高速経路がない。"
          />
          <EngineerQuote
            role="支援ロボティクス研究者"
            quote="数値上の遅延は問題なさそうに見えても、実際にはユーザーが試行全体を通じて補正している。意図とアシストトルクが同じタイミングで動いている感覚にならない。"
          />
        </div>
      </div>

      <p className="mt-4 w-full max-w-[1640px] text-[22px] font-light italic leading-[1.45] text-fg-primary">
        これらの発見により、Hinokiは最初の検証ベンチマークを「
        <span className="not-italic font-semibold">
          触覚スリップ検知と高速グリッパー応答
        </span>
        」に絞りました。
      </p>
      <SlideFooter pageLabel="03 · 顧客発見" />
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
        触覚スリップ検知と高速グリッパー応答
      </h2>
      <p className="mt-4 text-[24px] font-light leading-[1.45] text-fg-secondary">
        スリップ検知は最初のベンチマークであり、最終市場ではありません。
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
          東京を拠点とする触覚センシング企業との議論で、触覚センシングとグリッパー応答は、強い初期検証テーマになり得ることが確認されました。同社CEOより、非拘束の技術的LOIドラフト作成に向けた書面での前向きな確認を得ており、最初の技術的関係を具体化しています。
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

      <SlideFooter pageLabel="04 · ベンチマーク" />
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
        <span className="italic">Arc</span>：ロボットシステムのためのローカル反射層
      </h2>
      <p className="mt-2 max-w-[1500px] text-[20px] font-light leading-[1.45] text-fg-secondary">
        Arcは、身体が感覚から応答へ向かう高速な局所経路である脊髄反射弧から着想を得ています。ロボットは既存のコントローラを維持し、Arcが選択されたセンサー・アクチュエータループに高速なローカル応答経路を加えます。
      </p>

      <div className="mt-5 max-w-[1640px] overflow-hidden rounded-[12px] border border-border">
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
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-fg-tertiary">
              Task-level control
            </span>
            <span>既存コントローラ → モーターコントローラ</span>
          </div>
          <div className="mt-1 flex gap-3">
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-fg-tertiary">
              Bounded correction
            </span>
            <span>Arc → モーターコントローラ</span>
          </div>
          <div className="mt-1 flex gap-3">
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-fg-tertiary">
              State feedback
            </span>
            <span>Arc → メインコントローラ</span>
          </div>
        </div>
      </div>

      <SlideFooter pageLabel="05 · アーキテクチャ" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  06 · Customer Benefits
// ---------------------------------------------------------------------
function BenefitsSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Customer Benefits</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        <span className="italic">Arc</span>が改善を目指すもの
      </h2>
      <p className="mt-5 max-w-[1500px] text-[22px] font-normal leading-[1.5] text-fg-secondary">
        Arcは、既存のコントローラを置き換えることなく、1つの重要な制御ループに追加され、センサーデータを
        <span className="font-semibold text-fg-primary">より高速な物理応答</span>
        へ変換します。
      </p>

      <div className="mt-8 grid max-w-[1640px] grid-cols-3 gap-5">
        <BenefitPillar
          title="Physical Response"
          body="接触、力の変化、スリップ、バランス崩れに対し、認識・計画ループが完了する前に応答することを目指します。Arcは、選択されたセンサーとアクチュエータの間でローカルに動作します。"
          outcome="人の近くで動くロボットの安全性向上。把持失敗や過補正の低減。"
        />
        <BenefitPillar
          title="Physical Adaptation"
          body="重量、表面、形状、センサーノイズ、動きの変化に対し、制御ループ内のセンサーフィードバックを使ってローカルに調整します。タスクごとの再調整負担の低減を目指します。"
          outcome="変化する実環境条件に対する安定したハンドリング。"
        />
        <BenefitPillar
          title="Physical Resilience"
          body="ノイズのあるセンサー、荷重変化、振動、部分的なハードウェア劣化に対し、システム全体が介入する前に、選択されたローカルループで安定化を図ります。"
          outcome="現場での稼働率向上。計算負荷と統合負担の低減。"
        />
      </div>

      <div className="mt-6 max-w-[1640px] rounded-[8px] border border-accent bg-accent-subtle px-6 py-5">
        <div className="grid grid-cols-[260px_1fr] items-start gap-6">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
              Architectural property
            </div>
            <div className="mt-1.5 text-[20px] font-light leading-[1.2] tracking-[-0.01em] text-fg-primary">
              Local by design
            </div>
          </div>
          <p className="text-[17px] leading-[1.55] text-fg-primary">
            3つの柱すべてにおいて、ArcはFPGA上で反射ループをローカルに処理します。
            <span className="font-semibold">
              すべてのイベントをCPU、GPU、クラウド推論へ送る必要を減らし、
            </span>
            高次コントローラは認識、計画、学習を担い続けます。
            <span className="font-semibold">
              これにより、選択された反射レベルの応答において、計算負荷と電力負荷の低減を目指します。
            </span>
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-[1640px] text-[20px] leading-[1.55] text-fg-secondary">
        これらの改善により、Arcは既存ロボットの全面再設計なしに、
        <span className="font-semibold text-fg-primary">より高速な物理応答</span>、
        <span className="font-semibold text-fg-primary">変化条件への適応</span>、
        <span className="font-semibold text-fg-primary">現場での信頼性向上</span>
        を実現することを目指します。
      </p>

      <SlideFooter pageLabel="06 · 顧客価値" />
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
        Phase 2では、物理応答を検証します。
      </h2>

      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-10">
        <div className="rounded-[8px] border border-border bg-bg-subtle p-7">
          <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-fg-tertiary">
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
            Phase 2 — next, 1stRound funds this
          </div>
          <div className="mt-4 text-[26px] font-light leading-[1.3] tracking-[-0.01em] text-fg-primary">
            実アクチュエータで閉ループを構築
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
            <li className="flex gap-3">
              <span className="text-accent">→</span>
              <span>応答時間、1回の応答あたりのエネルギー、適応性、安定性を測定</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent">→</span>
              <span>パートナーおよび投資家向けの検証データセットを作成</span>
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

      <SlideFooter pageLabel="07 · ステータス" />
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
      className={`flex h-[132px] flex-1 flex-col justify-between rounded-[8px] border px-4 py-3 ${
        emphasis
          ? "border-accent bg-accent-subtle"
          : "border-border bg-bg-subtle"
      }`}
    >
      <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
        Step {String(index).padStart(2, "0")}
      </div>
      <div className="text-[17px] leading-[1.3] text-fg-primary">{label}</div>
    </div>
  );
}

function FpgaSlide() {
  return (
    <Slide align="start">
      <Eyebrow>FPGA Strategy</Eyebrow>
      <h2 className="text-[64px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        FPGAは、HinokiのIP発見エンジンです。
      </h2>
      <p className="mt-6 max-w-[1500px] text-[24px] font-light leading-[1.45] text-fg-secondary">
        私たちは、アーキテクチャをシリコンへ固定する前に、FPGAを用いて発見・検証します。
      </p>

      <div className="mt-12 max-w-[1640px]">
        <MutedLabel>IP discovery loop</MutedLabel>
        <div className="mt-4 flex flex-wrap items-stretch gap-2">
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

      <div className="mt-12 grid max-w-[1640px] grid-cols-2 gap-x-12 gap-y-6">
        <div>
          <SectionLabel>What FPGA enables today</SectionLabel>
          <ul className="mt-4 space-y-2.5 text-[18px] leading-[1.5] text-fg-secondary">
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
          <SectionLabel>What FPGA unlocks downstream</SectionLabel>
          <ul className="mt-4 space-y-2.5 text-[18px] leading-[1.5] text-fg-secondary">
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

      <p className="mt-10 max-w-[1500px] text-[20px] font-light italic leading-[1.45] text-fg-primary">
        FPGAにより、Hinokiはアーキテクチャを固定する前に学習できます。
      </p>

      <p className="absolute bottom-[110px] left-[140px] right-[140px] text-[13px] leading-[1.5] text-fg-tertiary">
        FPGAは検証とIP発見のための手段であり、必ずしも最終的なコスト構造ではありません。検証後、ASIC、リファレンスデザイン、または組込みIPへ展開します。
      </p>

      <SlideFooter pageLabel="08 · FPGA" />
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
      <TractionSection title="Primary signal">
        <div className="rounded-[8px] border border-accent bg-accent-subtle px-4 py-3">
          <div className="text-[17px] font-semibold text-fg-primary">
            東京拠点の触覚センシングパートナー
          </div>
          <p className="mt-2 text-[16px] leading-[1.5] text-fg-primary">
            CEOとの面談を完了。非拘束の技術的LOI作成に向けた書面での前向きな確認を取得。スリップ検知と高速グリッパー応答が、最初の検証ベンチマークとして一致。
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

      <p className="mt-5 max-w-[1640px] text-[12px] italic leading-[1.5] text-fg-tertiary">
        ステータス表現は意図的に正確にしています。ここに記載された段階を超える投資、商業契約、パートナーシップ上のコミットメントを示すものではありません。
      </p>

      <SlideFooter pageLabel="09 · トラクション" />
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
          emphasis ? "text-accent" : "text-fg-tertiary"
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
      <div className="mt-auto pt-3 text-[11px] leading-[1.4] text-fg-tertiary">
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
        測定可能な最初の市場から、プラットフォーム全体の機会へ。
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

      <p className="mt-4 max-w-[1640px] text-[11px] leading-[1.45] text-fg-tertiary">
        ¹ 触覚・力覚センサー市場予測；業界アナリスト集計。² IFR World Robotics・Statista グローバルロボティクス市場（2024→2030）。³ Goldman Sachs Research ヒューマノイド市場 2024–2035；McKinsey。⁴ METI ロボット政策ビジョン（2024改訂）— 2035年までの産業インパクト目標。
      </p>

      <SlideFooter pageLabel="10 · 市場" />
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
        検証から、アーキテクチャライセンスへ。
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
            <div className="mt-2 text-[13px] leading-[1.5] text-fg-tertiary">
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

      <SlideFooter pageLabel="11 · ビジネスモデル" />
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
            : "text-[12px] tracking-[0.14em] text-fg-tertiary"
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
          emphasis ? "text-[14px] text-fg-primary" : "text-[14px] text-fg-tertiary"
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

      <p className="mt-8 max-w-[1500px] text-[22px] font-light italic leading-[1.45] text-fg-primary">
        センサーはデータを作ります。コントローラはタスクを実行します。{" "}
        <span className="not-italic font-semibold">
          Arcは、センシングと行動の間にある高速な物理ループに焦点を当てます。
        </span>
      </p>

      <SlideFooter pageLabel="12 · ポジショニング" />
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
          role="Co-founder / CEO"
          body={
            <>
              筑波大学で生物学を学ぶ。Arcの事業仮説の共同設計者として、物理知能の生物学的フレーミング、特に脊髄反射弧をアーキテクチャの着想として持ち込んだ。事業戦略、資金調達、顧客発見、投資家およびロボティクス企業との関係構築をリード。
            </>
          }
        />
        <FounderCard
          imageSrc="/team/bernardo.png"
          affiliation="筑波大学"
          name="Bernardo Gatto"
          role="Co-founder / CTO"
          body={
            <>
              PhDエンジニア。ロボティクス、コンピュータビジョン、組込みAI、ハードウェア統合に専門性を持つ。AISTでの研究経験、MEXT / JSPSのバックグラウンドを有する。FPGAとリザバーコンピューティングの実装を担当し、Phase 1を構築・検証。
            </>
          }
        />
        <FounderCard
          imageSrc="/team/mina.jpg"
          objectPosition="center 25%"
          affiliation="昭和女子大学"
          name="Mina Otsuka"
          role="Co-founder / Japan Market &amp; Ecosystem"
          body={
            <>
              日本市場戦略、エコシステム開発、顧客発見、企業・研究機関との関係構築を担当。日本企業におけるステークホルダーマネジメントに強みを持ち、つくばに長く根ざした地域・研究エコシステムとの深い接点を有する。
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

      <SlideFooter pageLabel="13 · チーム" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  14 · Technical Advisory Network
// ---------------------------------------------------------------------
function AdvisorCard({
  status,
  statusTone = "confirmed",
  name,
  credentials,
  value,
}: {
  status: string;
  statusTone?: "confirmed" | "expected" | "pending";
  name: string;
  credentials: string;
  value: string;
}) {
  const tone =
    statusTone === "confirmed"
      ? "text-accent"
      : statusTone === "expected"
        ? "text-fg-primary"
        : "text-fg-tertiary";
  return (
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-6">
      <div className={`font-mono text-[12px] uppercase tracking-[0.14em] ${tone}`}>
        {status}
      </div>
      <div className="mt-3 text-[22px] font-medium leading-[1.25] text-fg-primary">
        {name}
      </div>
      <div className="mt-2 text-[15px] leading-[1.5] text-fg-secondary">
        {credentials}
      </div>
      <div className="mt-4 border-t border-border pt-3 text-[14px] leading-[1.5] text-fg-tertiary">
        <span className="font-mono uppercase tracking-[0.1em]">Value · </span>
        {value}
      </div>
    </div>
  );
}

function AdvisorsSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Advisory</Eyebrow>
      <h2 className="text-[56px] font-light leading-[1.08] tracking-[-0.02em] text-fg-primary">
        初期技術アドバイザリーボード
      </h2>
      <p className="mt-6 max-w-[1500px] text-[22px] font-normal leading-[1.55] text-fg-secondary">
        Hinokiは、Physical HRI、メカトロニクス、ニューロモルフィックネットワーク、知能ロボティクス領域のアドバイザー体制を構築しています。
      </p>

      <div className="mt-10 max-w-[1640px]">
        <SectionLabel>Current advisor commitments</SectionLabel>
        <div className="mt-4 grid grid-cols-2 gap-5">
          <AdvisorCard
            status="Verbal agreement received"
            statusTone="confirmed"
            name="Physical HRI Advisor"
            credentials="PhD · University of Tsukuba · Professor, PUCP"
            value="ヒューマンロボットインタラクション、支援システム、身体的インタラクション、ロボティクス検証文脈。"
          />
          <AdvisorCard
            status="Verbal agreement received"
            statusTone="confirmed"
            name="Mechatronics Advisor"
            credentials="PhD · University of Tsukuba · Associate Professor, Nagoya University"
            value="メカトロニクス、ヒューマンインフォマティクス、ロボットシステム、学術的検証パス。"
          />
        </div>
      </div>

      <div className="mt-7 max-w-[1640px]">
        <SectionLabel>Upcoming &amp; pending advisor discussions</SectionLabel>
        <div className="mt-4 grid grid-cols-2 gap-5">
          <AdvisorCard
            status="Expected from July"
            statusTone="expected"
            name="Neuromorphic Networks Advisor"
            credentials="PhD · University of Tokyo"
            value="ニューロモルフィックアーキテクチャ、リザバー関連の技術支援。"
          />
          <AdvisorCard
            status="Pending discussion"
            statusTone="pending"
            name="AIST Robotics Researcher"
            credentials="PhD · University of Tsukuba · Senior Researcher, AIST"
            value="AISTロボティクスエコシステム、知能インタラクション、ロボティクス研究の信頼性。"
          />
        </div>
      </div>

      <SlideFooter pageLabel="14 · アドバイザリー" />
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
    <div className="flex h-full flex-col rounded-[8px] border border-border bg-bg-subtle p-6">
      <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-accent">
        {label}
      </div>
      <ul className="mt-3 space-y-2.5 text-[17px] leading-[1.52] text-fg-secondary">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="text-accent">·</span>
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
      <p className="mt-4 max-w-[1500px] text-[24px] font-light leading-[1.45] text-fg-secondary">
        1stRound資金により、顧客発見を技術検証データへ変換します。
      </p>

      <div className="mt-9 grid max-w-[1640px] grid-cols-4 gap-5">
        <PlanQuarter
          label="0〜3か月"
          items={[
            "スリップ検知ベンチマーク要件の定義",
            "触覚センサー、グリッパー、FPGA、アクチュエータ構成の調達",
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

      <div className="mt-10 max-w-[1640px]">
        <div className="font-mono text-[14px] uppercase tracking-[0.16em] text-accent">
          Use of funds
        </div>
        <div className="mt-3 grid grid-cols-4 gap-x-6 gap-y-2.5 text-[18px] leading-[1.52] text-fg-secondary">
          <div>· FPGA改良および組込み制御テスト</div>
          <div>· 触覚センサー／グリッパー／アクチュエータ構成</div>
          <div>· 閉ループベンチマーク装置</div>
          <div>· 検証データセット作成</div>
          <div>· エンジニアリングおよびハードウェア統合</div>
          <div>· 特許／IP相談</div>
          <div>· 顧客発見およびパートナー開発</div>
          <div className="text-fg-tertiary">· 技術ドキュメント作成</div>
        </div>
      </div>

      <SlideFooter pageLabel="15 · 12ヶ月計画" />
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
          emphasis ? "text-accent" : "text-fg-tertiary"
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
      <div className="text-[15px] leading-[1.5] text-fg-tertiary">
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
          <span className="font-semibold">Year 2</span>
          から有償検証および共同開発プロジェクトを開始する想定です。
          <span className="font-semibold">Year 3〜5</span>
          では、リファレンスデザインライセンス、統合フィー、組込みIPロイヤリティへ移行します。
          <span className="font-semibold">Year 5</span>
          の上振れは、Hinokiがロボットを製造・出荷することではなく、ロボティクスプラットフォームへのライセンス採用に依存します。
        </p>
        <p className="mt-2 text-[15px] leading-[1.5] text-fg-secondary">
          営業収益には、助成金およびVC投資は含めません。
        </p>
      </div>

      <div className="mt-5 max-w-[1640px]">
        <div className="grid grid-cols-[110px_200px_1.4fr_1.2fr] gap-5 border-b border-border-strong pb-2 font-mono text-[12px] uppercase tracking-[0.14em] text-fg-tertiary">
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

      <p className="mt-5 max-w-[1640px] text-[12px] italic leading-[1.5] text-fg-tertiary">
        これは方向性を示す計画であり、精密な財務予測ではありません。売上は、Phase 2検証の成功、パートナー転換、ライセンス採用に依存します。助成金およびVC資金は営業収益に含めません。
      </p>

      <SlideFooter pageLabel="16 · 5年計画" />
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
            1stRound資金で実現すること
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
              Hinokiは、触覚センシングとグリッパー応答の閉ループベンチマークを構築し、Arcを従来のデジタル制御ベースラインと比較し、パートナーLOI、技術協業、特許戦略、将来のライセンス協議に必要な検証データを作成するため、非希薄化の検証資金を求めています。
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

        <SlideFooter pageLabel="17 · 資金使途" />
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
