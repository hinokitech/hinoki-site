import React from "react";
import {
  ApplicationCard,
  BehaviorCard,
  CompetitorRow,
  EcosystemTile,
  Eyebrow,
  FounderCard,
  FundingTier,
  GTMSectionLabel,
  InsightExample,
  MarketTier,
  OutcomeTile,
  PhaseCard,
  ProofRow,
  RevenuePhase,
  Slide,
  SlideFooter,
  StackArrow,
  StackBox,
  TractionPanel,
} from "../pitch/slides";

// =====================================================================
//  HINOKI — INVESTOR DECK SLIDES (日本語版)
//
//  Structure mirrors /app/pitch/slides.tsx 1:1 — same components, same
//  layout, same accent color. Only the text content is replaced with the
//  Japanese translation. Numerical figures, comparison tables, and
//  visual layout are deliberately identical to the English version.
// =====================================================================

// ---------------------------------------------------------------------
//  01 · Title
// ---------------------------------------------------------------------
function TitleSlide() {
  return (
    <Slide>
      <Eyebrow>Hinoki Technologies</Eyebrow>
      <h1 className="text-[112px] font-light leading-[1.05] tracking-[-0.025em] text-fg-primary">
        ロボットに欠けていた、
        <br />
        フィジカルインテリジェンス。
      </h1>
      <p className="mt-14 max-w-[1320px] text-[30px] font-normal leading-[1.7] text-fg-secondary">
        熱いものに触れた瞬間、考える前に手を引く。それが
        <span className="font-semibold text-fg-primary">
          フィジカルインテリジェンス
        </span>
        です。今までのロボットには、これが欠けていました。
        <span className="font-semibold text-fg-primary">
          <span className="italic">Arc</span>{" "}
          は、それを実装するアーキテクチャです。
        </span>
      </p>
      <div className="absolute bottom-[80px] left-[140px] font-mono text-[16px] tracking-[0.08em] text-fg-tertiary">
        Pre-Seed · 2026 年 4 月 · hinokitech.com
      </div>
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  02 · Problem
// ---------------------------------------------------------------------
function ProblemSlide() {
  return (
    <Slide>
      <Eyebrow>課題</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.1] tracking-[-0.02em] text-fg-primary">
        ロボットは「考える」ことはできても、
        <br />
        「反応する」ことができません。
      </h2>
      <div className="mt-14 grid max-w-[1500px] grid-cols-2 gap-x-16">
        <p className="text-[24px] font-normal leading-[1.8] text-fg-secondary">
          現在のロボットは、クラウドコンピューティングと同じデジタルスタックで動作しています。センサー入力は
          ADC、マイクロコントローラー、外部メモリ、推論層を経て、ようやくアクチュエーターに到達します。各層が遅延、エネルギーコスト、そして知覚と行動の間にデジタルラウンドトリップを生み出します。
        </p>
        <p className="text-[24px] font-normal leading-[1.8] text-fg-secondary">
          ヒューマノイドが人間と同じ空間で働き始めると、課題の性質が根本的に変わります。もはやスペックや性能の問題だけではなく、人と機械が安全に共存できるかという問題です。これが現在、ケージレス展開を本格的に普及させる上での最大のボトルネックとなっています。
        </p>
      </div>
      <p className="mt-12 max-w-[1500px] text-[26px] font-normal leading-[1.7] tracking-[-0.01em] text-fg-primary">
        ケージレス展開の問題は、ソフトウェアの問題ではありません。
        <span className="font-semibold">アーキテクチャの問題です。</span>
      </p>
      <SlideFooter pageLabel="02 · 課題" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  03 · Insight
// ---------------------------------------------------------------------
function InsightSlide() {
  return (
    <Slide>
      <Eyebrow>洞察</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary">
        フィジカルインテリジェンスは、
        <br />
        脳ではなく、
        <span className="font-normal">身体に宿る。</span>
      </h2>
      <div className="mt-12 max-w-[1500px] space-y-6">
        <InsightExample
          label="反応 / Response"
          body="熱いものに触れる。脳が認識する前に、手は引かれている。"
        />
        <InsightExample
          label="適応 / Adaptation"
          body="動物は初めて踏む地面でも、ミリ秒単位で足の感触を読み取り、瞬時に歩き方を調整しています。"
        />
        <InsightExample
          label="回復力 / Resilience"
          body="三本足の犬は、それでも走り続けます。脳からの指令がなくても、身体が自然に重心とバランスを再分配するからです。"
        />
      </div>
      <p className="mt-12 max-w-[1500px] text-[24px] font-normal italic leading-[1.7] text-fg-primary">
        一つの基板に宿る、三つの振る舞い。連続時間、分散、物理的なもの。フォン・ノイマン型ではありません。
      </p>
      <SlideFooter pageLabel="03 · 洞察" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  04 · Solution
// ---------------------------------------------------------------------
function SolutionSlide() {
  return (
    <Slide>
      <Eyebrow>ソリューション</Eyebrow>
      <h2 className="text-[96px] font-light leading-[1.0] tracking-[-0.02em] text-fg-primary">
        <span className="italic">Arc.</span>
      </h2>
      <p className="mt-4 text-[36px] font-light leading-[1.3] tracking-[-0.015em] text-fg-secondary">
        フィジカルインテリジェンスのためのアーキテクチャ。
      </p>
      <p className="mt-10 max-w-[1500px] text-[24px] font-normal leading-[1.75] text-fg-secondary">
        ハイブリッド型のフィジカル・デジタル制御層。連続時間の動的基板として動作し、推論、メモリアクセス、デジタルラウンドトリップを介さずに、センサー入力をアクチュエーションに直結させます。
      </p>

      <div className="mt-12 space-y-10">
        <div>
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-fg-tertiary">
            現在のデジタル制御スタック
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StackBox>センサー</StackBox>
            <StackArrow />
            <StackBox>ADC</StackBox>
            <StackArrow />
            <StackBox>MCU / GPU</StackBox>
            <StackArrow />
            <StackBox>外部メモリ</StackBox>
            <StackArrow />
            <StackBox>制御アルゴリズム</StackBox>
            <StackArrow />
            <StackBox>アクチュエーター</StackBox>
          </div>
          <div className="mt-3 text-[18px] text-fg-tertiary">
            離散的 · メモリ依存 · 制御の上に推論層
          </div>
        </div>

        <div>
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-accent">
            Arc — フィジカルインテリジェンス・スタック
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StackBox>センサー</StackBox>
            <StackArrow />
            <StackBox emphasis>連続時間適応動力学</StackBox>
            <StackArrow />
            <StackBox>軽量デジタル層</StackBox>
            <StackArrow />
            <StackBox>アクチュエーター</StackBox>
          </div>
          <div className="mt-3 text-[18px] text-fg-tertiary">
            連続的 · 組込み型 · サブミリ秒応答
          </div>
        </div>
      </div>
      <SlideFooter pageLabel="04 · ソリューション" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  05 · Behaviors
// ---------------------------------------------------------------------
function BehaviorsSlide() {
  return (
    <Slide>
      <Eyebrow>振る舞い</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary">
        三つの能力。一つのアーキテクチャ。
      </h2>
      <p className="mt-10 max-w-[1500px] text-[24px] font-normal leading-[1.7] text-fg-secondary">
        基板を正しく設計すれば、フィジカルインテリジェンスは三つの構成可能な機能として現れます。Phase 2では、『変化する条件下での把持』という一つのベンチマークで、この三つの能力をまとめて証明します。
      </p>
      <div className="mt-10 grid max-w-[1640px] grid-cols-3 gap-6">
        <BehaviorCard
          label="反応 / Response"
          headline="脳が判断する前に動く身体。"
          body="AIによる判断を挟まず、滑り・接触・力の変化をサブミリ秒で直接検知し、反応します。"
        />
        <BehaviorCard
          label="適応 / Adaptation"
          headline="瞬時に接触から学ぶ身体。"
          body="事前の学習や調整なしに、初めて触れる物体や表面にも、リアルタイムで対応できます。"
        />
        <BehaviorCard
          label="回復力 / Resilience"
          headline="部品が故障しても止まらない身体。"
          body="中央のフェイルオーバーシステムを使わず、センサーノイズや部分的なアクチュエーター故障に対しても、自然に動作を再分配します。"
        />
      </div>
      <p className="mt-8 max-w-[1500px] text-[20px] font-light italic leading-[1.7] text-fg-secondary">
        突破口は、反射にあります。適応と回復力は、その延長線上に自然と生まれるものです。
      </p>
      <SlideFooter pageLabel="05 · 振る舞い" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  06 · Product
// ---------------------------------------------------------------------
function ProductSlide() {
  return (
    <Slide>
      <Eyebrow>プロダクト</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.1] tracking-[-0.02em] text-fg-primary">
        Phase 1は、すでに稼働しています。
      </h2>
      <div className="mt-12 grid max-w-[1640px] grid-cols-[1.1fr_1fr] gap-x-20">
        <div className="space-y-7 text-[22px] font-normal leading-[1.75] text-fg-secondary">
          <p>
            リザバーコンピューティングを FPGA
            ファブリック上に実装。
            <span className="font-semibold text-fg-primary">
              ライブビデオセンサー入力
            </span>
            からのリアルタイム物体分類とモーション追跡を、シミュレーションではなくハードウェア上で検証済み。
          </p>
          <p>
            アーキテクチャが実機で動くことは、すでに証明されています。次に検証すべきは、実際のアクチュエーターを制御したときのリアルタイム性能です。
          </p>
          <p className="font-semibold text-fg-primary">それが Phase 2 です。</p>
        </div>
        <div className="space-y-4 self-start">
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-fg-tertiary">
            現時点で検証済みの内容
          </div>
          <ProofRow label="FPGA ハードウェア上で動作するリザバーコンピューター" />
          <ProofRow label="ハードウェア上でのライブセンサーストリーム検証" />
          <ProofRow label="リアルタイム分類とモーション追跡の確認" />
          <p className="mt-5 text-[16px] italic leading-[1.6] text-fg-tertiary">
            技術デューデリジェンス用の検証ベンチをご用意しております。
          </p>
        </div>
      </div>

      <SlideFooter pageLabel="06 · プロダクト" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  07 · Technology
// ---------------------------------------------------------------------
function TechnologySlide() {
  return (
    <Slide>
      <Eyebrow>技術</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.1] tracking-[-0.02em] text-fg-primary">
        なぜ FPGA か。なぜ今か。
      </h2>
      <p className="mt-10 max-w-[1500px] text-[24px] font-normal leading-[1.75] text-fg-secondary">
        リザバーコンピューターは、予測困難な動的な基板です。最適な設計を見つけるには、その上で動くソフトウェアだけでなく、基板そのものを繰り返し試行・改良する必要があります。
      </p>

      <div className="mt-10 grid max-w-[1640px] grid-cols-2 gap-10">
        <div className="rounded-[8px] border border-border bg-bg-subtle p-8">
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-fg-tertiary">
            シリコンファースト(TDK)
          </div>
          <div className="space-y-2 text-[20px] leading-[1.6] text-fg-primary">
            <div>· テープアウト時にアーキテクチャ確定</div>
            <div>· 最適トポロジを事前に仮定</div>
            <div>· 複数年の製造サイクル</div>
            <div>· 反復に大規模資本が必要</div>
          </div>
        </div>
        <div className="rounded-[8px] border border-accent bg-accent-subtle p-8">
          <div className="mb-3 font-mono text-[14px] uppercase tracking-[0.12em] text-accent">
            FPGA ファースト(Hinoki)
          </div>
          <div className="space-y-2 text-[20px] leading-[1.6] text-fg-primary">
            <div>· 週次でアーキテクチャを反復可能</div>
            <div>· 最適トポロジを実証的に発見</div>
            <div>· 即日再構築サイクル</div>
            <div>
              · 資本効率の高い検証 → ASIC テープアウトまたはライセンス可能 IP
            </div>
          </div>
        </div>
      </div>

      <p className="mt-10 max-w-[1500px] text-[26px] font-light italic leading-[1.5] tracking-[-0.01em] text-fg-primary">
        業界の前提を、私たちは問い直します。
      </p>
      <SlideFooter pageLabel="07 · 技術" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  08 · Market
// ---------------------------------------------------------------------
function MarketSlide() {
  return (
    <Slide>
      <Eyebrow>市場規模</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary">
        すべてのロボットの中に、制御層を。
      </h2>
      <div className="mt-12 grid max-w-[1640px] grid-cols-3 gap-12">
        <MarketTier
          size="3,000億ドル超"
          label="産業オートメーション"
          note="現在展開中の市場¹"
        />
        <MarketTier
          size="1,000億ドル超"
          label="グローバルロボティクスプラットフォーム"
          note="ハードウェア + 統合²"
        />
        <MarketTier
          size="1,650億ドル"
          label="2034 年までのヒューマノイド市場"
          note="50% CAGR 予測³"
        />
      </div>
      <p className="mt-12 max-w-[1500px] text-[26px] font-light leading-[1.6] tracking-[-0.01em] text-fg-primary">
        すべてのロボティクスプラットフォームには、制御モジュールが必要です。
        <br />
        <span className="font-semibold">
          私たちは、それらにフィジカルインテリジェンスを与える制御モジュールをライセンスします。
        </span>
      </p>
      <p className="mt-7 max-w-[1500px] text-[19px] leading-[1.7] text-fg-secondary">
        McKinseyは、ヒューマノイドの商用展開における最大の壁は安全性だと指摘しています。人間とロボットがケージなしで共に働くには、リアルタイムで身体を制御するインテリジェンスが不可欠です。それこそが、Arcが動く領域です。
      </p>
      <div className="absolute bottom-[110px] left-[140px] right-[140px] font-mono text-[12px] leading-[1.6] tracking-[0.04em] text-fg-tertiary">
        ¹ IFR World Robotics 及び業界アナリスト集計。² IFR / Statista
        グローバルロボティクス市場。³ ゴールドマン・サックス・リサーチ「Humanoid
        Robot Market 2024–2035」。McKinsey Global Institute、Embodied AI
        安全性研究 2024。
      </div>
      <SlideFooter pageLabel="08 · 市場" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  09 · Target Applications
// ---------------------------------------------------------------------
function ApplicationsSlide() {
  return (
    <Slide>
      <Eyebrow>ターゲットアプリケーション</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary">
        動くすべてのプラットフォームへ。
      </h2>
      <p className="mt-10 max-w-[1500px] text-[22px] font-normal leading-[1.7] text-fg-secondary">
        <span className="italic">Arc</span> は汎用制御層です。Phase 2
        はまず産業領域に着地し、ヒューマノイド、防衛、アシスティブシステムへと同一基板上で拡張します。
      </p>
      <div className="mt-10 grid max-w-[1640px] grid-cols-2 gap-6">
        <ApplicationCard
          label="ヒューマノイドロボティクス"
          headline="ケージなしで、人間の近くで動作する。"
          body="人間の隣で安全に動くには、圧倒的な応答速度が必要です。既存のシステムはその速度に追いつけていません。Arcは、制御の根幹でその問題を解決します。"
        />
        <ApplicationCard
          label="産業オートメーション"
          headline="ラインを再構築せずに、新しい SKU に適応する。"
          body="現在、部品が変わるたびに再教育と再調整が必要で、切り替えのたびに数時間の生産停止が発生します。Arcは制御ループ自体で適応するため、条件が変わってもラインを止めません。"
        />
        <ApplicationCard
          label="防衛・自律システム"
          headline="手足や回転翼を失っても、プラットフォームは動き続ける。"
          body="手足を失っても、ドローンが回転翼を一つ失っても、動きは止まりません。回復力は中央システムではなく、身体全体に分散しています。故障が起きた瞬間、ネットワークも切り替えも介さず、残りのハードウェア全体でリアルタイムに動作を再分配します。"
        />
        <ApplicationCard
          label="ウェアラブル・アシスティブ"
          headline="それを着用する身体に適応する。"
          body="今の外骨格・義肢は、動かそうとしてから実際に動くまでが遅く、不自然に感じられます。その遅延が普及の壁になっています。Arcは身体と同じ速さでリアルタイムに適応し、機械ではなく、自分の一部として感じられる動きを実現します。"
        />
      </div>
      <p className="mt-8 max-w-[1500px] text-[19px] font-light italic leading-[1.7] text-fg-secondary">
        身体が反応し、適応し、立ち続ける必要があるすべての場所で、Arc
        はアーキテクチャ層となります。
      </p>
      <SlideFooter pageLabel="09 · アプリケーション" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  10 · Competition
// ---------------------------------------------------------------------
function CompetitionSlide() {
  return (
    <Slide>
      <Eyebrow>競合</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.1] tracking-[-0.02em] text-fg-primary">
        私たちが立つ位置。
      </h2>
      <div className="mt-10 max-w-[1640px]">
        <div className="grid grid-cols-[1.1fr_1.2fr_1.3fr_1.6fr] gap-6 border-b border-border-strong py-3 font-mono text-[13px] uppercase tracking-[0.12em] text-fg-tertiary">
          <div>アプローチ</div>
          <div>フォーカス</div>
          <div>アーキテクチャ</div>
          <div>トレードオフ</div>
        </div>
        <CompetitorRow
          approach="デジタル適応制御"
          focus="産業制御ループ"
          arch="離散型(PID / MPC)"
          tradeoff="静的チューニング、適応が遅い"
        />
        <CompetitorRow
          approach="TinyML / 組込み ML"
          focus="デバイス上推論"
          arch="メモリ駆動、離散型"
          tradeoff="推論サイクルに律速"
        />
        <CompetitorRow
          approach="ニューロモーフィック"
          focus="知覚、イベント駆動センシング"
          arch="スパイキング、イベントベース"
          tradeoff="閉ループアクチュエーションでは未成熟"
        />
        <CompetitorRow
          approach="TDK アナログ RC"
          focus="組込みリザバー計算"
          arch="シリコン(テープアウト時に確定)"
          tradeoff="最適解の前にトポロジが固定"
        />
        <CompetitorRow
          approach="Hinoki Arc"
          focus="フィジカルインテリジェンス制御"
          arch="FPGA 連続時間基板"
          tradeoff="現時点で反復可能 → 後に ASIC / ライセンス可能 IP"
          highlight
        />
      </div>
      <p className="mt-9 max-w-[1500px] text-[22px] font-normal leading-[1.7] text-fg-primary">
        業界が知覚を競っている間、商用化された制御層は手つかずのまま残されてきました。私たちは、研究と産業の間に誰も架けてこなかった層を最適化しています。
      </p>
      <SlideFooter pageLabel="10 · 競合" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  11 · Business Model
// ---------------------------------------------------------------------
function BusinessModelSlide() {
  return (
    <Slide>
      <Eyebrow>ビジネスモデル</Eyebrow>
      <h2 className="text-[88px] font-light leading-[1.1] tracking-[-0.02em] text-fg-primary">
        ロボティクス業界の ARM へ。
      </h2>
      <p className="mt-8 max-w-[1500px] text-[28px] font-light leading-[1.55] tracking-[-0.01em] text-fg-primary">
        私たちはロボットを作りません。
        <span className="font-semibold">
          ロボットを賢くするアーキテクチャ層をライセンスします。
        </span>
      </p>

      <div className="mt-12 grid max-w-[1640px] grid-cols-3 gap-6">
        <PhaseCard
          phase="フェーズ 1"
          range="検証完了後 1〜2 年"
          title="共同開発"
          body="ロボティクスパートナーが、各社固有の制御問題への Arc の適応に資金を提供。早期収益と独自の検証データを生成します。"
        />
        <PhaseCard
          phase="フェーズ 2"
          range="2〜5 年目"
          title="リファレンスデザインライセンス"
          body="Arc 制御アーキテクチャを自社製品に統合するメーカーから、プラットフォームごとの年間ライセンス料。"
        />
        <PhaseCard
          phase="フェーズ 3"
          range="5〜10 年目"
          title="ユニット単位ロイヤリティ"
          body="Arc のフィジカルインテリジェンス層を使用するロボット 1 台あたりのロイヤリティ。ロボット制御に適用された ARM モデル。"
        />
      </div>

      <p className="mt-10 max-w-[1500px] text-[22px] font-light italic leading-[1.7] text-fg-secondary">
        コンピューティング企業は、デバイスを売ることで価値を獲得しません。他社のすべての中に存在することで価値を獲得します。
      </p>
      <SlideFooter pageLabel="11 · ビジネスモデル" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  12 · Go-to-Market
// ---------------------------------------------------------------------
function GTMSlide() {
  return (
    <Slide>
      <Eyebrow>ゴー・トゥ・マーケット</Eyebrow>
      <h2 className="text-[72px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary">
        日本から始める。意図的に、必然的に。
      </h2>
      <p className="mt-7 max-w-[1500px] text-[20px] font-normal leading-[1.75] text-fg-secondary">
        日本は世界で最も集積されたロボティクスエコシステムです。ファナック、安川電機、川崎重工、三菱電機、ソニー、そしてヒューマノイドプラットフォーム各社。私たちは
        <span className="font-semibold text-fg-primary">
          つくばサイエンスシティ
        </span>
        に拠点を置き、産業技術総合研究所(AIST)と物質・材料研究機構(NIMS)の隣で、すでに重要な関係性の中に立っています。
      </p>

      <div className="mt-8">
        <GTMSectionLabel>顧客開発</GTMSectionLabel>
        <div className="mt-3 grid max-w-[1640px] grid-cols-3 gap-4">
          <EcosystemTile
            title="カスタマーディスカバリー — 進行中"
            body="産業およびヒューマノイドアプリケーション領域のロボティクスエンジニアと直接対話。複数の実運用システム間で、制御層の適応に関する課題を確認。"
          />
          <EcosystemTile
            title="サイバーダイン研究者"
            body="アシスティブ外骨格アプリケーションに関する、サイバーダイン研究者との初期対話。フィジカルインテリジェンスが臨床的動作支援に適合するシグナル。"
          />
          <EcosystemTile
            title="名古屋大学ロボティクス研究室"
            body="アシスティブ外骨格における共同研究の初期対話。学術発表、およびウェアラブル領域での共同検証への道筋。"
          />
        </div>
      </div>

      <div className="mt-7">
        <GTMSectionLabel>資金調達経路</GTMSectionLabel>
        <div className="mt-3 grid max-w-[1640px] grid-cols-3 gap-4">
          <EcosystemTile
            title="Antler Japan 2026 レジデンシー"
            body="2026 年 5 月開講のコホート。ディープテック創業者向けプログラム。フォローオン投資の可能性、および日本のハードウェア投資家ネットワークへのアクセス。"
          />
          <EcosystemTile
            title="SusHi Tech Tokyo 2026"
            body="ディープテック VC、コーポレートベンチャー、政府イノベーションプログラムにわたる投資家関係を開始。"
          />
          <EcosystemTile
            title="NEDO 助成金経路"
            body="日本のディープテック検証資金調達のための国家機関。Phase 2 後の申請を予定し、希薄化を伴わない資金調達を延長。"
          />
        </div>
      </div>
      <SlideFooter pageLabel="12 · ゴー・トゥ・マーケット" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  13 · Traction
// ---------------------------------------------------------------------
function TractionSlide() {
  return (
    <Slide>
      <Eyebrow>トラクションと外部検証</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary">
        すでにリスク低減されているもの。
      </h2>
      <p className="mt-8 max-w-[1500px] text-[22px] font-normal leading-[1.75] text-fg-secondary">
        二つの独立したシグナルが、内部と外部の両方から、同じアーキテクチャの方向性を指し示しています。
      </p>
      <div className="mt-10 grid max-w-[1640px] grid-cols-2 gap-8">
        <TractionPanel
          label="内部での実証"
          headline="Phase 1 ハードウェア検証済み。"
          body="ライブセンサーストリームによる分類とモーション追跡を実装したリザバーコンピューターが FPGA 上で動作。シミュレーションではなく、ハードウェアでの動作。アーキテクチャの仮説は実シリコン上で動いています。"
        />
        <TractionPanel
          label="外部による検証"
          headline="市場の方向性を確認。"
          body="TDKのアナログRCチップがCEATEC 2025イノベーションアワードを受賞し、この技術の方向性が独立した形で証明されました。私たちは補完的なアーキテクチャを選択しました。FPGAファーストで反復し、その後ライセンス可能なIPへと展開します。"
        />
      </div>
      <p className="mt-10 max-w-[1500px] text-[22px] font-light italic leading-[1.7] text-fg-secondary">
        仮説はハードウェアで証明されました。市場の方向性は外部からも裏付けられています。Phase 2で、その二つをつなぎます。
      </p>
      <SlideFooter pageLabel="13 · トラクション" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  14 · Team
// ---------------------------------------------------------------------
function TeamSlide() {
  return (
    <Slide>
      <Eyebrow>チーム</Eyebrow>
      <h2 className="text-[72px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary">
        生物学とハードウェア AI の交差点。
      </h2>
      <p className="mt-6 max-w-[1500px] text-[20px] font-normal leading-[1.75] text-fg-secondary">
        問題は性能ではなく、設計思想です。自然はフォン・ノイマン型では動いていない。私たちはコンピューティングを作り直すのではなく、デジタルが最も苦手とする場所に、自然の設計を持ち込みます。
      </p>
      <div className="mt-8 grid max-w-[1640px] grid-cols-3 gap-6">
        <FounderCard
          imageSrc="/team/salvatore.jpg"
          objectPosition="center 30%"
          name="Salvatore Martone"
          role="戦略・資金調達"
          body="筑波大学生物学卒。アーキテクチャの共同設計者であり、生物学的視点をもたらす。日本拠点のエンタープライズ事業をゼロから構築し、日本の主要機関の経営層と協働。Hinokiの商業戦略と日本投資家関係を主導。"
        />
        <FounderCard
          imageSrc="/team/bernardo.png"
          name="Bernardo Gatto"
          role="技術"
          body="コンピュータビジョン博士。アーキテクチャの共同設計者であり、FPGAハードウェア上で実装を担う。ロボティクス・組込みAI・ハードウェア統合における10年以上の経験。日本学術振興会(JSPS)研究助成金受給者。文部科学省(MEXT)奨学生。元産業技術総合研究所(AIST)研究員。Phase 1を構築・検証。"
        />
        <FounderCard
          imageSrc="/team/mina.jpg"
          objectPosition="center 25%"
          name="大塚 美奈"
          role="日本市場・エコシステム"
          body="日本語ネイティブ。明治安田生命保険株式会社にてマネージャーとして事業開発・顧客対応に従事。日本企業文化への深い理解。日本全国のロボティクスエンジニアおよび研究機関との関係構築を担当。"
        />
      </div>
      <p className="mt-7 max-w-[1500px] text-[18px] font-light italic leading-[1.7] text-fg-secondary">
        社名 Hinoki
        は、日本の檜から名付けています。檜は分散型の「神経系」を持つ有機体であり、Arc
        の根底にある原理を体現しています。私たち三人は以前、応用 AI
        ベンチャーを共に立ち上げ、顧客との後期契約交渉段階まで到達しましたが、フィジカルインテリジェンスの検証における時間的猶予を踏まえ、Hinoki
        に全面的に集中するために方向転換しました。
      </p>
      <SlideFooter pageLabel="14 · チーム" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  15 · Financial Model
// ---------------------------------------------------------------------
function FinancialModelSlide() {
  return (
    <Slide>
      <Eyebrow>財務モデル</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.15] tracking-[-0.02em] text-fg-primary">
        三つのフェーズ。一つのロイヤリティ仮説。
      </h2>
      <p className="mt-7 max-w-[1500px] text-[20px] font-normal leading-[1.75] text-fg-secondary">
        ARM Holdings は、20〜200 ドルのチップ価格に対して 1〜2%
        のロイヤリティを獲得しています。Hinoki は、20,000〜150,000
        ドルのロボティクスプラットフォーム、および 30,000〜100,000
        ドルのアシスティブデバイスに対して、同等のロイヤリティを目指します。前払いライセンス料に加えて、ヒューマノイド、産業、防衛、ウェアラブル・アシスティブ市場における採用に応じてスケールするユニット単位のロイヤリティです。
      </p>

      <div className="mt-9 grid max-w-[1640px] grid-cols-3 gap-6">
        <RevenuePhase
          phase="フェーズ 1"
          range="検証完了後 1〜2 年"
          title="共同開発エンゲージメント"
          body="ロボティクスパートナーとの 3〜5 件の有償統合プロジェクト。早期収益、独自の検証データ、リファレンス顧客を生成。"
          revenue="150〜500 万ドル"
          revenueLabel="累計"
        />
        <RevenuePhase
          phase="フェーズ 2"
          range="2〜5 年目"
          title="リファレンスデザインライセンス"
          body="12〜25 社のプラットフォームメーカーが、プラットフォーム 1 件あたり年間 250,000〜1,000,000 ドルのライセンス料で Arc リファレンスデザインを統合。"
          revenue="700〜2,500 万ドル"
          revenueLabel="ARR"
        />
        <RevenuePhase
          phase="フェーズ 3"
          range="5 年目以降"
          title="ユニット単位ロイヤリティ"
          body="プラットフォーム 1 台あたり 5〜50 ドル。ARM モデル。価値の獲得は、人員数ではなく、業界での採用に応じてスケールします。"
          revenue="3,000〜25,000 万ドル"
          revenueLabel="ARR"
        />
      </div>

      <div className="mt-9 grid max-w-[1640px] grid-cols-[1.25fr_1fr] gap-12">
        <p className="text-[17px] leading-[1.75] text-fg-secondary">
          <span className="font-semibold text-fg-primary">採用基準。</span>{" "}
          2030 年までにヒューマノイドは年間 1,000
          万台以上が予測されています。産業ロボティクスは現在、年間 60
          万台以上を出荷しています。外骨格と義肢の市場は 2032 年までに 300
          億ドルを超えると予測されています。ロイヤリティベースの IP ライセンスは
          90% 以上の粗利率を持ちます。
        </p>
        <p className="text-[16px] italic leading-[1.75] text-fg-tertiary">
          アシスティブ市場の採用は、臨床検証サイクルにより、ロボティクスより
          18〜24 ヶ月遅れます。Phase 3
          のウェアラブル貢献は、その遅延を考慮してモデル化されています。
        </p>
      </div>
      <SlideFooter pageLabel="15 · 財務モデル" />
    </Slide>
  );
}

// ---------------------------------------------------------------------
//  16 · The Ask
// ---------------------------------------------------------------------
function AskSlide() {
  return (
    <Slide align="start">
      <Eyebrow>調達</Eyebrow>
      <h2 className="text-[80px] font-light leading-[1.05] tracking-[-0.025em] text-fg-primary">
        400,000 ドル。プレシード。
      </h2>
      <p className="mt-3 text-[28px] font-light leading-[1.3] tracking-[-0.015em] text-fg-secondary">
        検証ランウェイ。
      </p>

      <div className="mt-6 grid max-w-[1640px] grid-cols-[1.1fr_1fr] gap-10">
        <div>
          <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
            12 ヶ月のマイルストーン
          </div>
          <p className="mt-3 text-[19px] leading-[1.7] text-fg-primary">
            デジタルベースラインに対する遅延、エネルギー、適応的安定性の測定可能な改善のベンチマーク。閉ループ、ハードウェア上で。フィジカルインテリジェンスを商用化可能な制御層として実装した、世界初の産業ベンチマーク。
          </p>

          <div className="mt-7 font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
            資金の用途
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] leading-[1.6] text-fg-secondary">
            <div>· 創業者ランウェイ</div>
            <div>· FPGA 改善およびベンチマークプラットフォーム</div>
            <div>· ハードウェア統合および組込みシステム</div>
            <div>· 力センサーおよびアクチュエーター検証リグ</div>
            <div>· 遅延 / エネルギー / 適応データセット</div>
            <div>· 仮特許出願</div>
            <div>· NEDO / JST 助成金申請支援</div>
          </div>
        </div>

        <div>
          <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
            資金調達構成
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2">
            <FundingTier
              amount="最大 100,000 ドル"
              source="レジデンシー期間中のベンダークレジット"
              detail="AWS、Google Cloud、IBM 等の Antler パートナーとの優遇クレジットおよびレート。プログラム期間中に利用可能、希薄化なし。"
            />
            <FundingTier
              amount="150,000 ドル"
              source="Antler 投資委員会承認後の投資"
              detail="1,000,000 ドルのバリュエーションキャップで 100,000 ドル post-money J-KISS/SAFE(ESOP 後約 10%)+ 50,000 ドル uncapped MFN SAFE。プログラム終了時に投資委員会が承認した場合。"
            />
            <FundingTier
              amount="最大 250,000 ドル"
              source="Antler ARC マッチング"
              detail="第三者投資家から 200,000 ドルの調達でアンロック。"
            />
            <FundingTier
              amount="オープン"
              source="追加のプレシード投資家"
              detail="戦略的なディープテックおよびハードウェア投資家を歓迎。"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 max-w-[1640px]">
        <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-accent">
          12 ヶ月後のアウトカム — フェーズ 1 収益のアンロック
        </div>
        <div className="mt-1.5 grid grid-cols-4 gap-2">
          <OutcomeTile>
            ライセンス交渉のための検証済みベンチマークデータセット
          </OutcomeTile>
          <OutcomeTile>
            日本のロボティクスメーカーとの初の共同開発 LOI
          </OutcomeTile>
          <OutcomeTile>仮特許出願完了</OutcomeTile>
          <OutcomeTile>NEDO 助成金申請提出</OutcomeTile>
        </div>
      </div>

      <SlideFooter pageLabel="16 · 調達" />
    </Slide>
  );
}

// =====================================================================
//  Ordered Japanese slide manifest
// =====================================================================
export const SLIDES_JP: Array<() => React.JSX.Element> = [
  TitleSlide,
  ProblemSlide,
  InsightSlide,
  SolutionSlide,
  BehaviorsSlide,
  ProductSlide,
  TechnologySlide,
  MarketSlide,
  ApplicationsSlide,
  CompetitionSlide,
  BusinessModelSlide,
  GTMSlide,
  TractionSlide,
  TeamSlide,
  FinancialModelSlide,
  AskSlide,
];
