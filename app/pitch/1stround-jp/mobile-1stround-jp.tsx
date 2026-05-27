// Mobile fallback for /pitch/1stround-jp — synced with slides-1stround-jp.tsx (desktop is source of truth).

import React from "react";

function Card({
  tag,
  title,
  children,
}: {
  tag: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-bg-subtle p-5">
      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
        {tag}
      </div>
      <h2 className="text-[24px] font-light leading-[1.2] tracking-[-0.02em]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({
  items,
  className = "space-y-2 text-[15px] leading-[1.6]",
}: {
  items: React.ReactNode[];
  className?: string;
}) {
  return (
    <ul className={`mt-4 list-disc pl-5 text-fg-secondary ${className}`}>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
      {children}
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
      <div className="rounded-lg border-2 border-accent bg-accent-subtle px-4 py-4">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
          {role}
        </div>
        <p className="mt-3 text-[16px] leading-[1.55] text-fg-primary">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-bg-base/80 px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
        {role}
      </div>
      <p className="mt-2 text-[14px] leading-[1.55] text-fg-primary">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

function AccentCallout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-lg border border-accent bg-accent-subtle p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
        {label}
      </div>
      <div className="mt-2 text-[14px] leading-[1.55] text-fg-primary">{children}</div>
    </div>
  );
}

export default function MobileDeck1stRoundJp() {
  return (
    <main className="min-h-dvh bg-bg-base px-5 pb-20 pt-10 text-fg-primary">
      <header className="mx-auto max-w-[720px]">
        <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          Hinoki Technologies · 1stRound Application
        </div>
        <h1 className="text-[36px] font-light leading-[1.12] tracking-[-0.03em] md:text-[48px]">
          ロボットシステムのための物理知能
        </h1>
        <p className="mt-5 text-[16px] leading-[1.65] text-fg-secondary">
          <span className="italic font-semibold text-fg-primary">Arc</span>
          は、既存のロボットコントローラを置き換えるのではなく、センサーデータを
          <span className="font-semibold text-fg-primary">より高速な物理応答</span>
          へ変換するニューロモルフィック・ローカル制御層です。
        </p>
        <p className="mt-4 text-[15px] font-light italic leading-[1.55] text-fg-primary">
          ロボットには「脳」が与えられてきました。{" "}
          <span className="not-italic font-semibold">
            Arcは、そこに「神経系」を加えます。
          </span>
        </p>
        <ul className="mt-5 space-y-1.5 text-[14px] leading-[1.6] text-fg-secondary">
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>つくば発のdeep techスタートアップ</span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
              <img
                src="/assets/antler-wordmark.png"
                alt="Antler"
                width={72}
                height={16}
                className="h-[16px] w-auto shrink-0 object-contain"
              />
              <span>Japan Residency 2026 採択</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">·</span>
            <span>最初の検証ベンチマーク：触覚スリップ検知と高速グリッパー応答</span>
          </li>
        </ul>
        <div className="mt-5 font-mono text-[11px] tracking-[0.06em] text-fg-caption">
          1stRound application・2026年5月
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-[720px] space-y-10">
        <Card
          tag="02 · 課題"
          title={
            <>
              ロボットは制御された環境では動く。
              <br />
              変動する実環境へスケールすることは依然として難しい。
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            ロボットはデモ、ラボ、シミュレーション、狭い導入設定では十分に性能を発揮できるが、重量・接触・ペイロード・振動、環境の変化では性能がしばしば低下する。{" "}
            <span className="font-semibold text-fg-primary">
              接触を伴うタスクは特に難しく、非線形ダイナミクスと微小な位置ずれが物理相互作用の一般化を妨げる。
            </span>
          </p>
          <div className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-primary">
            条件が変わると何が破綻するか
          </div>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-border bg-bg-base/60 p-4">
              <p className="text-[15px] font-medium text-fg-primary">
                ラボでは動く、現場では失敗する
              </p>
              <p className="mt-2 text-[14px] leading-[1.55] text-fg-secondary">
                構造化された環境での能力が、本番の接触・運用条件の変化で失敗し得る。
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-base/60 p-4">
              <p className="text-[15px] font-medium text-fg-primary">
                物理エッジでの応答が遅い
              </p>
              <p className="mt-2 text-[14px] leading-[1.55] text-fg-secondary">
                スリップや力の変化が、認識から計画までの経路より速く起こり得る。
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-base/60 p-4">
              <p className="text-[15px] font-medium text-fg-primary">
                顧客横断で再現しにくい
              </p>
              <p className="mt-2 text-[14px] leading-[1.55] text-fg-secondary">
                拠点ごとにチューニング・統合・低速運転が必要になり、反復可能な導入にならない。
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-bg-base/60 p-4">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-primary">
              同じ傘の下にある技術的症状
            </div>
            <p className="mt-2 text-[13px] leading-[1.55] text-fg-secondary">
              エッジでのレイテンシ、センサノイズ、物理適応の不足、統合負荷、信頼性リスク、および重要ループにおける電力・計算負荷は、別個の問題ではない。いずれも同じ物理的一般化ギャップの症状である。
            </p>
          </div>
          <p className="mt-4 text-[17px] leading-[1.6] text-fg-primary">
            本質は認識だけではない。それは
            <span className="font-semibold">物理的一般化</span>
            である：世界が変化したとき、センサーデータを信頼できる適応的な物理行動へ変換すること。
          </p>
          <div className="mt-5 rounded-lg border-2 border-accent bg-accent-subtle p-5">
            <p className="text-[17px] font-light leading-[1.45] text-fg-primary">
              ロボティクス企業にとって、これは
              <span className="font-semibold">スケールの問題</span>
              である。狭い運用条件の外でロボットが失敗すると、導入は長期化し、現場エンジニアリングが増え、速度は低下し、顧客横断で収益性高く再現することが難しくなる。
            </p>
          </div>
        </Card>

        <Card
          tag="03 · ソリューション"
          title={
            <>
              <span className="italic">Arc</span>
              は、不足している物理応答レイヤーを追加する。
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            ニューロモーフィックなローカル制御アーキテクチャ。既存コントローラが主導権を持ったまま、選択したセンサー–アクチュエータループ内でロボットが応答できる。
          </p>
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            ロボティクス企業は認識・計画・AIを改善しているが、多くの失敗はロボット本体に近い場所で起きる。Arcは選択したセンサーとアクチュエータの間に位置し、変化する物理信号を、より広いデジタルスタックが介入する前に有界な修正動作へ変換する。
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  ローカル物理応答。
                </span>{" "}
                スリップ・接触・力の変化・不均衡など、制御クリティカルループにおいて、センサー事象からアクチュエータ補正へのより速い経路を作る。
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  適応的ニューロモーフィック動力学。
                </span>{" "}
                リザーバコンピューティングを用い、ノイズの多い時系列センサ入力を動的な内部状態へ変換し、変化する物理条件の下でも安定した補正を狙う。
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  実装可能な展開向け。
                </span>{" "}
                既存コントローラと併用し、一つの測定可能なループから始め、FPGAファーストの検証でセンサー・プロトコル・ロボットプラットフォームを横断調整する。
              </>,
            ]}
          />
          <SubLabel>現状</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            センサーデータ → 認識 / 計画 / 制御スタック → アクチュエータ応答
          </p>
          <p className="mt-1 text-[13px] font-semibold leading-[1.5] text-fg-primary">
            物理事象は、より広いデジタルスタックを経由する
          </p>
          <SubLabel>Arc導入後</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            センサー事象 → Arcローカル反射層 → 有界補正 → アクチュエータ応答
          </p>
          <p className="mt-1 text-[13px] font-semibold leading-[1.5] text-fg-primary">
            選択した物理ループに、より速いローカル応答経路を与える
          </p>
          <p className="mt-4 font-mono text-[11px] leading-[1.5] text-fg-caption">
            メインコントローラは、認識・計画・安全性・タスクロジックを引き続き担当する。
          </p>
          <SubLabel>企業がHinokiと組む理由</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  フル再設計なしで検証。
                </span>{" "}
                Arcは、既存コントローラが主導権を持ったまま、一つの制御クリティカルループで評価できる。
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  導入摩擦の低減。
                </span>{" "}
                検証が成功すれば、Arcは可変環境における動作失敗、再チューニング負荷、現場エンジニアリング、信頼性問題を減らせる。
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  早期にベンチマークを形成。
                </span>{" "}
                パートナーは検証データを確認し、Arcが実際のロボティクスニーズに対してどこでテストされるかに影響できる。
              </>,
            ]}
          />
          <div className="mt-5 rounded-lg border-2 border-accent bg-accent-subtle p-5">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              要点
            </div>
            <p className="mt-2 text-[16px] font-light leading-[1.45] text-fg-primary">
              Hinokiの強みはアーキテクチャにある。別のロボット脳ではなく、一つの物理ループで検証でき、ロボットシステム横断でライセンスできる神経系のような制御層である。
            </p>
          </div>
        </Card>

        <Card tag="04 · 顧客発見" title="エンジニアから、これまでに聞こえてきたこと">
          <p className="mt-4 text-[15px] leading-[1.7] text-fg-secondary">
            顧客ヒアリングを通じて、Arcは広いアーキテクチャ仮説から、測定可能な最初の制御ループ・ベンチマークへと絞り込まれています。
          </p>
          <BulletList
            className="space-y-2.5 text-[16px] leading-[1.62]"
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  レイテンシは物理エッジで重要になる。
                </span>{" "}
                エンジニアから、精度・速度・アクチュエータタイミングが重要な場面では応答時間がクリティカルになるとの確認があった。
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  物理的変動が不安定性を生む。
                </span>{" "}
                変化する床面、荷重変化、車輪スリップ、ノイズのあるセンサー、予測しにくい環境が、実用的な制御課題を生む。
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  スリップ応答が最初の測定可能な入り口。
                </span>{" "}
                グリッパー制御では課題が具体化する。スリップを検知し、より速く応答し、対象物を安定させ、ベースラインと比較する。
              </>,
            ]}
          />
          <div className="mt-5 space-y-4">
            <EngineerQuote
              variant="primary"
              role="グリッパー／マニピュレーションエンジニア"
              quote="スリップは触覚データ上では先に見えているが、把持ループの応答が遅れる。部品が動き始めてから把持力を上げることになる。センサーからグリッパーまでの遅延は繰り返し課題になる。"
            />
            <EngineerQuote
              role="AMRトルク制御エンジニア"
              quote="車輪スリップはトルク制御と速度制御のトレードオフを強いる。車輪に近い場所でループを閉じられれば、依然として有効だ。"
            />
            <EngineerQuote
              role="二足歩行ヒューマノイド研究者"
              quote="一度足場が滑ると、歩容はすでに遅れている。接触のための独立した高速経路がない。"
            />
          </div>
          <div className="mt-6 rounded-lg border-2 border-accent bg-accent-subtle p-6">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              要点
            </div>
            <p className="mt-2 text-[16px] font-light leading-[1.45] text-fg-primary">
              これにより、Hinokiは最初の検証ベンチマークを
              <span className="font-semibold">
                「触覚スリップ検知と高速グリッパー応答」
              </span>
              に絞った。
            </p>
          </div>
        </Card>

        <Card
          tag="05 · ベンチマーク"
          title="触覚スリップ検知と高速グリッパー応答"
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            スリップ検知は最初のベンチマークであり、最終市場ではありません。
          </p>
          <SubLabel>Closed-loop benchmark — tactile sensor to gripper</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            触覚センサー → Arcローカル反射層 → 有界補正出力 → モーターコントローラ → グリッパー安定化
          </p>
          <AccentCallout label="Discovery validation · tactile-sensing partner">
            東京を拠点とする触覚センシング企業との議論で、触覚センシングとグリッパー応答は、強い初期検証テーマになり得ることが確認されました。同社CEOと技術LOIを最終化中であり、最初の技術的関係を具体化しています。
          </AccentCallout>
          <SubLabel>Why this benchmark</SubLabel>
          <BulletList
            items={[
              "具体的で、測定可能で、商業的関連性が高い",
              "日本国内の触覚センシング企業との関心と一致",
              "ロボット全体の再設計を必要とせず、1つのセンサー・アクチュエータループでArcを検証可能",
              "将来的に、より広いロボットマニピュレーションと物理応答へ自然に展開可能",
            ]}
          />
          <SubLabel>Metrics — what they prove</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">Speed</span> —
                応答時間、スリップから補正まで、グリッパー補正速度
              </>,
              <>
                <span className="font-semibold text-fg-primary">Reliability</span>{" "}
                — 把持安定性、把持失敗／落下の低減
              </>,
              <>
                <span className="font-semibold text-fg-primary">Efficiency</span>{" "}
                — 1回の補正応答あたりのエネルギー、Arcと従来制御ベースラインの比較
              </>,
              <>
                <span className="font-semibold text-fg-primary">Adaptation</span>{" "}
                — 重量、表面、形状の変化、動作・ノイズへのロバスト性
              </>,
            ]}
          />
        </Card>

        <Card
          tag="06 · アーキテクチャ"
          title={
            <>
              <span className="italic">Arc</span>
              ：ロボットシステムのためのローカル反射層
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Arcは、身体が感覚から応答へ向かう高速な局所経路である
            <span className="font-semibold text-fg-primary">脊髄反射弧から着想を得ています</span>
            。ロボットは既存のコントローラを維持し、Arcが選択されたセンサー・アクチュエータループに高速なローカル応答経路を加えます。
          </p>
          <div className="mt-4 rounded-lg border border-accent bg-accent-subtle px-4 py-3 text-[15px] font-semibold leading-[1.35] text-fg-primary">
            置き換え型コントローラではありません。有界なローカル応答層です。
          </div>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">既存コントローラ</span>{" "}
                → モーターコントローラ
              </>,
              <>
                <span className="font-semibold text-fg-primary">Arc</span> → 有界補正
                → モーターコントローラ
              </>,
              <>
                <span className="font-semibold text-fg-primary">Arc</span> →
                状態フィードバック → メインコントローラ
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Arcは既存のロボティクススタックと連携し、特に
            <span className="font-semibold text-fg-primary">
              高速なローカル応答、適応、または低い計算負荷
            </span>
            が重要となるセンサー・アクチュエータループに焦点を当てます。
          </p>
        </Card>

        <Card
          tag="07 · 顧客価値"
          title={
            <>
              <span className="italic">Arc</span>はロボティクスの経済性をどう改善するか
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Arcは選択した物理制御ループの改善を目指し、ロボティクス企業が導入コストを下げ、信頼性を高め、プラットフォームの対応範囲を広げることを支援します。
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">導入コストの低減</span>{" "}
                — 選択した制御ループ内のローカル適応により、現場ごとのチューニング負担を減らします。{" "}
                <span className="text-fg-tertiary">
                  ビジネスインパクト: 現場エンジニアリングの削減、導入サイクルの短縮、顧客あたりのマージン改善。
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">信頼性と稼働率の向上</span>{" "}
                — スリップ、不安定な接触、振動、センサノイズ、荷重変化などを、より広いシステムが介入する前に安定化します。{" "}
                <span className="text-fg-tertiary">
                  ビジネスインパクト: 失敗の低減、稼働率向上、顧客横断で再現しやすい導入。
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">製品能力の向上</span>{" "}
                — 接触、力、スリップ、不均衡、ノイズ入力に対するより速いローカル応答層を追加します。{" "}
                <span className="text-fg-tertiary">
                  ビジネスインパクト: より広いユースケース、強い製品差別化、高い顧客価値。
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">計算・エネルギー負荷の低減</span>{" "}
                — 選択した反射レベルの応答をFPGA上でローカルに処理し、CPU、GPU、クラウド、重い推論への依存を減らします。{" "}
                <span className="text-fg-tertiary">
                  ビジネスインパクト: より効率的な組込み制御、モバイル、支援、ヒューマノイド、現場ロボティクスへの適合。
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">統合リスクの低減</span>{" "}
                — 既存のロボットコントローラが主導権を持ったまま、一つの制御クリティカルループで試せます。{" "}
                <span className="text-fg-tertiary">
                  ビジネスインパクト: 導入摩擦の低減、明確なパイロット経路、パートナー評価のしやすさ。
                </span>
              </>,
            ]}
          />
          <AccentCallout label="Bottom line">
            Arcはロボットをより速く反応させるだけではない。ロボティクスプラットフォームをより導入しやすく、現場でより信頼でき、より収益性高くスケールできるよう設計されている。
          </AccentCallout>
        </Card>

        <Card
          tag="08 · ステータス"
          title="Phase 1では、基盤が実ハードウェア上で動作することを示しました。Phase 2では、物理応答を検証します。"
        >
          <SubLabel>Phase 1 — completed</SubLabel>
          <BulletList
            items={[
              "FPGAハードウェア上でリザバーコンピューティングを実装",
              "ライブセンサーストリームによる分類とモーショントラッキングを検証",
              "シミュレーションではなく、実シリコン上でのハードウェア検証を完了",
            ]}
          />
          <SubLabel>Phase 2 — next, 1stRound funds this</SubLabel>
          <BulletList
            items={[
              "触覚センサー＋グリッパーによる閉ループベンチマーク",
              "スリップ検知と高速ローカル応答",
              "従来のデジタル制御ベースラインとの比較",
              "応答時間、1回の応答あたりのエネルギー、適応性、安定性を測定",
              "パートナーおよび投資家向けの検証データセットを作成",
            ]}
          />
          <p className="mt-3 text-[14px] italic leading-[1.65] text-fg-caption">
            Phase 2 benchmark targets — not yet proven:{" "}
            <span className="not-italic">Latency</span>（アクチュエータ側でのサブミリ秒応答を目標）、{" "}
            <span className="not-italic">Energy</span>（ベースラインより低い1回の補正応答あたりのエネルギーを目標）、{" "}
            <span className="not-italic">Adaptation</span>（変化する物理条件下での安定制御を目標）。
          </p>
        </Card>

        <Card tag="09 · FPGA" title="FPGAは、HinokiのIP発見エンジンです。">
          <p className="mt-4 text-[16px] leading-[1.65] text-fg-secondary">
            私たちは、アーキテクチャをシリコンへ固定する前に、FPGAを用いて発見・検証します。
          </p>
          <SubLabel>IP discovery loop</SubLabel>
          <p className="mt-2 text-[15px] leading-[1.62] text-fg-secondary">
            FPGA検証 → 実センサー・アクチュエータ実験 → 独自ベンチマークデータ → チューニング・ノウハウ → 特許化可能な手法 → リファレンスデザイン／ASIC／ライセンス
          </p>
          <SubLabel>What FPGA enables today</SubLabel>
          <BulletList
            className="space-y-2.5 text-[16px] leading-[1.62]"
            items={[
              "シリコンへ固定する前にアーキテクチャを反復可能",
              "異なるセンサー、プロトコル、制御ループへ適応可能",
              "将来のライセンスパートナー向け統合レシピを構築可能",
            ]}
          />
          <SubLabel>What FPGA unlocks downstream</SubLabel>
          <BulletList
            className="space-y-2.5 text-[16px] leading-[1.62]"
            items={[
              "実ロボットシステムから独自ベンチマークデータを収集",
              "特許化可能な制御手法とチューニング戦略を特定",
              "ASIC、リファレンスデザイン、組込みIPへの明確な展開経路",
            ]}
          />
          <p className="mt-5 text-[16px] italic leading-[1.65] text-fg-primary">
            FPGAにより、Hinokiはアーキテクチャを固定する前に学習できます。
          </p>
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-caption">
            FPGAは検証とIP発見のための手段であり、必ずしも最終的なコスト構造ではありません。検証後、ASIC、リファレンスデザイン、または組込みIPへ展開します。
          </p>
        </Card>

        <Card tag="10 · トラクション" title="初期検証シグナル">
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            顧客発見、投資家・プログラム面での進展、技術アドバイザー体制が、同じ検証パスに向けて収束しています。
          </p>
          <SubLabel>Customer / Partner</SubLabel>
          <AccentCallout label="Primary signal · 東京拠点の触覚センシングパートナー">
            CEOとの技術LOIを最終化中。スリップ検知と高速グリッパー応答を、最初の検証ベンチマークとして合意。
          </AccentCallout>
          <SubLabel>Additional discovery</SubLabel>
          <BulletList
            items={[
              "支援ロボティクス企業：研究者との会話を完了。支援制御におけるリアルタイム応答遅延が障壁であることを確認。CEO面談を設定済み。",
              "認知ロボティクス企業：認知層と物理実行層の補完関係について、共同創業者との面談を調整中。",
              "視覚ベース触覚センシング企業：パートナーシップ協議に向けた紹介ルートを特定。",
            ]}
          />
          <p className="mt-3 text-[14px] leading-[1.6] text-fg-secondary">
            AMR、ヒューマノイド、四足歩行、支援ロボティクス、海洋、サービスロボティクス領域のエンジニアから、レイテンシ、ノイズ入力、荷重変化、車輪スリップ、リアルタイム応答に関する課題を確認。
          </p>
          <SubLabel>Investor / Program Momentum</SubLabel>
          <p className="mt-2 text-[14px] font-medium text-fg-primary">
            スクリーニングと投資家対話が進行中
          </p>
          <BulletList
            items={[
              "Antler Japan — 2026年5月採択",
              "Coreline / Atlas — 一次スクリーニング通過、対面チーム面談を調整中",
              "Sony Innovation Fund — 前向きな反応、deep techチームへ資料共有済み",
              "Co-Capital / Founder Institute Japan — 継続的な対話中",
              "Spiral Capital — 将来の投資対話に向けた関係構築開始",
              "The Ventures Award 2026 — 一次審査通過",
            ]}
          />
          <SubLabel>Technical Credibility</SubLabel>
          <p className="mt-2 text-[14px] font-medium text-fg-primary">
            実行に向けたハードウェア検証とアドバイザー体制が形成中
          </p>
          <BulletList
            items={[
              "ライブセンサー入力を用いたPhase 1 FPGAリザバー検証を完了",
              "Antler Japan Residencyでの披露に向け、6週間のデモスプリントを進行中",
              "触覚センサー＋グリッパーによる閉ループベンチマークを計画中",
              "Physical HRIおよびメカトロニクス分野のPhDアドバイザーから口頭承諾を取得",
              "ニューロモルフィックネットワーク分野のPhDアドバイザーが7月より参加予定",
              "AISTシニアロボティクス研究者と協議中",
            ]}
          />
          <p className="mt-4 text-[13px] italic leading-[1.55] text-fg-caption">
            ステータス表現は意図的に正確にしています。ここに記載された段階を超える投資、商業契約、パートナーシップ上のコミットメントを示すものではありません。
          </p>
        </Card>

        <Card
          tag="11 · 市場"
          title="測定可能な最初の市場から、プラットフォーム全体の機会へ。"
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Hinokiは、狭く検証可能なウェッジから開始し、センサー・アクチュエータ応答が重要となるロボティクスプラットフォーム全体へ展開します。
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-accent bg-accent-subtle p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                Initial beachhead · $15B+
              </div>
              <p className="mt-2 text-[15px] font-medium text-fg-primary">
                2030年までの触覚・力覚センシング市場
              </p>
              <p className="mt-1 text-[14px] leading-[1.55] text-fg-secondary">
                ロボットグリッパー、触覚センサー、産業用マニピュレーションは、Arcの最初の有償検証ウェッジです。
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-base/60 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-caption">
                Serviceable market · $170B
              </div>
              <p className="mt-2 text-[15px] font-medium text-fg-primary">
                2030年までのグローバルロボティクス市場
              </p>
              <p className="mt-1 text-[14px] leading-[1.55] text-fg-secondary">
                産業オートメーションはすでに$300B+規模で導入されており、サービスロボティクスは2030年までに$40B+へ成長見込みです。Arcは、これらのプラットフォーム内のローカル応答層をライセンスします。
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg-base/60 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-caption">
                Long-term opportunity · $165B
              </div>
              <p className="mt-2 text-[15px] font-medium text-fg-primary">
                2034年までのヒューマノイドロボット市場、50% CAGR
              </p>
              <p className="mt-1 text-[14px] leading-[1.55] text-fg-secondary">
                人と同じ空間で制限なく協働するロボットの普及には、リアルタイムな物理知能が必要です。Arcは、その層で動作します。
              </p>
            </div>
          </div>
          <AccentCallout label="Japan strategic frame">
            日本は、
            <span className="font-semibold">高齢化社会</span>、
            <span className="font-semibold">製造業の再興</span>、
            <span className="font-semibold">ヒューマノイド領域の進展</span>
            が交差する、構造的なロボティクス機会を持っています。METIは2035年までにロボット産業で約
            <span className="font-semibold">10兆円規模</span>
            のインパクトを目標としています。Hinokiは、日本がアーキテクチャレベルで保有し得る「ローカル物理応答層」を構築します。
          </AccentCallout>
          <SubLabel>Beachhead → expansion path</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            触覚スリップ・グリッパー応答 → 産業・協働ロボット → モバイル・ヒューマノイド → 支援機器・ドローン・四足歩行
          </p>
        </Card>

        <Card
          tag="12 · ビジネスモデル"
          title="検証から、アーキテクチャライセンスへ。"
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            Hinokiはロボットを製造するのではなく、
            <span className="font-semibold text-fg-primary">
              ロボティクスプラットフォームの内部に入ることで価値を獲得
            </span>
            します。
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Near term — Phase 1 · Validation &amp; co-development:
                </span>{" "}
                非希薄化助成金およびR&D資金、有償の技術検証プロジェクト、ロボティクス企業との共同ベンチマーク
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Mid term — Phase 2 · Reference design licensing:
                </span>{" "}
                統合フィー＋リファレンスデザインライセンス、Arc制御モジュール／組込み制御層、センサー・グリッパー・プラットフォーム企業向け統合支援
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  Long term — Phase 3 · Embedded IP &amp; royalties:
                </span>{" "}
                アーキテクチャライセンス、プラットフォーム単位またはユニット単位のロイヤリティ、ロボティクスプラットフォーム内の組込みIP
              </>,
            ]}
          />
          <SubLabel>Cost structure · 主な費用項目</SubLabel>
          <p className="mt-2 text-[14px] leading-[1.6] text-fg-secondary">
            R&amp;Dエンジニアリング · ハードウェア調達、FPGA、センサー、アクチュエータ · ベンチマーク装置および検証機材 · センサー／アクチュエータ統合 · IP／特許関連費用 · パートナー検証支援
          </p>
          <p className="mt-4 text-[15px] italic leading-[1.65] text-fg-primary">
            私たちはロボットを作る会社ではありません。{" "}
            <span className="not-italic font-semibold">
              ロボットがより良く物理応答するための制御アーキテクチャをライセンスする会社です。
            </span>
          </p>
        </Card>

        <Card
          tag="13 · ポジショニング"
          title="Hinokiはロボティクススタックのどこに位置するのか。"
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            市場はすでに活発ですが、センシングとアクチュエーションの間にある物理応答層は、まだ十分に開発されていません。
          </p>
          <BulletList
            items={[
              "Cognition — AI / Planning：高次の自律性、認識、意思決定（認知ロボティクス、自律システム企業、VLAモデル）",
              "Control OS — Robot OS / Motion Control：タスクレベル制御、軌道計画、従来型コントローラ（PID、MPC、PLC）",
              "Sensing — 触覚／視覚／イベントベース：力、スリップ、接触、視覚信号（触覚センシングパートナー、視覚ベース触覚、イベントベースセンサー）",
              <>
                <span className="font-semibold text-fg-primary">
                  Hinoki · Arc — Local Reflex Control
                </span>{" "}
                — センサー入力 → Arc → 有界補正 → モーターコントローラ。センシングとアクチュエーションの間にある、欠けていた層。
              </>,
              "Hardware — Motors / Grippers / Actuators：産業、協働、モバイル、ヒューマノイド、支援機器",
            ]}
          />
          <p className="mt-3 text-[15px] italic leading-[1.65] text-fg-primary">
            センサーはデータを作ります。コントローラはタスクを実行します。{" "}
            <span className="not-italic font-semibold">
              Arcは、センシングと行動の間にある高速な物理ループに焦点を当てます。
            </span>
          </p>
        </Card>

        <Card
          tag="14 · チーム"
          title="長期的な信頼関係と補完的な役割に基づく創業チーム"
        >
          <div className="mt-3 grid gap-3 text-[15px] leading-[1.6] text-fg-secondary">
            <div>
              <span className="font-semibold text-fg-primary">
                Salvatore Martone — Co-founder / CEO · Commercial:
              </span>{" "}
              筑波大学（生物科学群）。Arc事業仮説の共同設計者として生物学的フレーミングを導入。日本企業の経営層（C-suite）向けに企業支援実務をゼロから構築。Hinokiの商業戦略および投資家関係を統括。
            </div>
            <div>
              <span className="font-semibold text-fg-primary">
                Bernardo Gatto — Co-founder / CTO · Industry &amp; Technical:
              </span>{" "}
              PhD（コンピュータビジョン）。Arc仮説の共同設計者としてFPGA上で実装。産業経験10年以上（ロボティクス・組込みAI・ハードウェア統合）。JSPS研究助成・MEXT奨学生・AISTつくば研究員経験。Phase
              1を構築・検証。
            </div>
            <div>
              <span className="font-semibold text-fg-primary">
                Mina Otsuka — Co-founder / COO · Japan Operations:
              </span>{" "}
              日本語ネイティブ。日本有数の金融大手明治安田生命にてビジネス開発・顧客関係マネージャー。日本企業文化への深い理解。全国のロボティクスエンジニア・研究機関との関係構築を担当。
            </div>
          </div>
          <SubLabel>Founder connection</SubLabel>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">SalvatoreとBernardo</span>
                は、筑波大学時代から
                <span className="font-semibold text-fg-primary">8年</span>
                来の関係
              </>,
              <>
                <span className="font-semibold text-fg-primary">Mina</span>
                は過去
                <span className="font-semibold text-fg-primary">4年間</span>
                にわたりチームと深い関係を構築。つくばに長く根ざした生活基盤を持つ
              </>,
              <>
                創業チームは、短期的なプログラムのために組成されたものではなく、
                <span className="font-semibold text-fg-primary">長期的な信頼関係</span>
                に基づいている
              </>,
              <>
                <span className="font-semibold text-fg-primary">共通のミッション：</span>
                つくばに根ざしたdeep tech企業をつくり、日本に貢献し、日本人研究者と海外研究者が共に働ける場をつくること
              </>,
            ]}
          />
        </Card>

        <Card
          tag="15 · アドバイザリー"
          title="技術アドバイザーは実行リスクを下げる"
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            アドバイザー支援は、Physical HRI、メカトロニクス、ニューロモルフィックアーキテクチャ、日本のロボティクス研究エコシステムにわたる。
          </p>
          <SubLabel>確定 · Physical HRI Advisor</SubLabel>
          <BulletList
            items={[
              "Verbal agreement received · PhD, University of Tsukuba · Professor, PUCP",
              <>
                <span className="font-semibold text-fg-primary">低減するリスク:</span>{" "}
                ヒューマンロボットインタラクション、支援ロボティクス、ヒト近接システムの物理検証。
              </>,
            ]}
          />
          <SubLabel>確定 · Mechatronics Advisor</SubLabel>
          <BulletList
            items={[
              "Verbal agreement received · PhD, University of Tsukuba · Associate Professor, Nagoya University",
              <>
                <span className="font-semibold text-fg-primary">低減するリスク:</span>{" "}
                センサー・アクチュエータ統合、メカトロニクス検証、アーキテクチャ概念からハードウェア試験への移行。
              </>,
            ]}
          />
          <SubLabel>Neuromorphic Networks Advisor · Expected from July</SubLabel>
          <BulletList
            items={[
              "PhD, University of Tokyo",
              <>
                <span className="font-semibold text-fg-primary">低減するリスク:</span>{" "}
                ニューロモルフィックアーキテクチャ、リザバー関連設計、将来のIP開発。
              </>,
            ]}
          />
          <SubLabel>AIST Senior Robotics Researcher · Pending discussion</SubLabel>
          <BulletList
            items={[
              "PhD, University of Tsukuba · Senior Researcher, AIST",
              <>
                <span className="font-semibold text-fg-primary">低減するリスク:</span>{" "}
                応用ロボティクスの視点、AISTエコシステムへのアクセス、将来の検証パートナーシップ。
              </>,
            ]}
          />
          <AccentCallout label="Together">
            このネットワークは、ヒューマンロボットインタラクション、ハードウェア統合、ニューロモルフィックアーキテクチャ、日本ロボティクスエコシステムへのアクセスという4つの検証リスクを支援します。
          </AccentCallout>
        </Card>

        <Card
          tag="16 · 12ヶ月計画"
          title="顧客発見からハードウェア検証へ。"
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            1stRound資金により、顧客発見を技術検証データへ変換します。
          </p>
          <SubLabel>0〜3か月</SubLabel>
          <BulletList
            items={[
              "スリップ検知ベンチマーク要件の定義",
              "触覚センサー、グリッパー、FPGA、アクチュエータ構成の調達 — 初回LOIパートナーからのハードウェア調達も検討",
            ]}
          />
          <SubLabel>3〜6か月</SubLabel>
          <BulletList
            items={[
              "触覚センサーからアクチュエータまでの閉ループ検証リグを構築",
              "従来のデジタル制御とのベースライン比較を実施",
              "応答時間、適応性、エネルギー、安定性を測定",
            ]}
          />
          <SubLabel>6〜9か月</SubLabel>
          <BulletList
            items={[
              "検証データをパートナーへ共有",
              "ベンチマーク結果をもとにArcアーキテクチャを改善",
              "特許／IP出願戦略を準備",
            ]}
          />
          <SubLabel>9〜12か月</SubLabel>
          <BulletList
            items={[
              "パートナーパイロット計画を開始",
              "追加助成金へ申請",
              "ベンチマークデータをもとにエンジェル／VCラウンドを準備",
            ]}
          />
          <SubLabel>Use of funds</SubLabel>
          <BulletList
            items={[
              "FPGA改良および組込み制御テスト",
              "触覚センサー／グリッパー／アクチュエータ構成",
              "閉ループベンチマーク装置",
              "検証データセット作成",
              "エンジニアリングおよびハードウェア統合",
              "特許／IP相談",
              "顧客発見およびパートナー開発",
              "技術ドキュメント作成",
            ]}
          />
        </Card>

        <Card
          tag="17 · 5年計画"
          title="売上・支出計画"
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            検証から、有償パイロット、ライセンスへ向かう方向性のある計画です。
          </p>
          <AccentCallout label="Revenue assumptions">
            <span className="font-semibold">Year 2</span>
            から有償検証および共同開発プロジェクトを開始する想定です。
            <span className="font-semibold"> Year 3〜5</span>
            では、リファレンスデザインライセンス、統合フィー、組込みIPロイヤリティへ移行します。
            <span className="font-semibold"> Year 5</span>
            の上振れは、Hinokiがロボットを製造・出荷することではなく、ロボティクスプラットフォームへのライセンス採用に依存します。営業収益には、助成金およびVC投資は含めません。
          </AccentCallout>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">Year 1 · ¥0〜5M:</span>{" "}
                検証、LOI、ベンチマークデータセット、助成金支援。支出：ハードウェア、エンジニアリング、IP相談、顧客発見
              </>,
              <>
                <span className="font-semibold text-fg-primary">Year 2 · ¥15〜50M:</span>{" "}
                1〜3件の有償検証／共同開発プロジェクト
              </>,
              <>
                <span className="font-semibold text-fg-primary">Year 3 · ¥80〜200M:</span>{" "}
                3〜6件の有償パートナープロジェクト、初期リファレンスデザインライセンス
              </>,
              <>
                <span className="font-semibold text-fg-primary">Year 4 · ¥300〜700M:</span>{" "}
                プラットフォームライセンス、統合フィー、継続的パートナー導入
              </>,
              <>
                <span className="font-semibold text-fg-primary">Year 5 · ¥1B+:</span>{" "}
                組込みIPライセンス、リファレンスデザイン採用、プラットフォーム／ユニット単位ロイヤリティ
              </>,
            ]}
          />
          <SubLabel>Unit logic, directional</SubLabel>
          <BulletList
            items={[
              "有償検証／共同開発 — 1件あたり ¥5〜15M",
              "リファレンスデザイン／統合ライセンス — 1パートナーあたり ¥10〜30M",
              "プラットフォームライセンス — 範囲に応じて1パートナーあたり ¥30〜100M+",
              "組込みIPロイヤリティ — プラットフォーム単位またはユニット単位",
            ]}
          />
          <p className="mt-3 text-[14px] italic leading-[1.65] text-fg-caption">
            これは方向性を示す計画であり、精密な財務予測ではありません。売上は、Phase 2検証の成功、パートナー転換、ライセンス採用に依存します。
          </p>
        </Card>

        <Card
          tag="18 · 資金使途"
          title="資金調達が実現すること"
        >
          <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">
            顧客発見を、最初のパートナー向けベンチマークデータセットへ変換するための非希薄化検証資金です。
          </p>
          <SubLabel>What funding enables</SubLabel>
          <BulletList
            items={[
              "閉ループ検証リグの構築",
              "Arcとデジタル制御ベースラインの比較",
              "パートナー向け検証データの作成",
              "IP戦略およびパイロット導入パスの準備",
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-secondary">
            Hinokiは、触覚センシングとグリッパー応答の閉ループベンチマークを構築し、Arcを従来のデジタル制御ベースラインと比較し、パートナーLOI、技術協業、特許戦略、将来のライセンス協議に必要な検証データを作成するため、非希薄化の検証資金を求めています。
          </p>
          <p className="mt-5 text-[15px] italic leading-[1.65] text-fg-primary">
            1つの測定可能な反射ループが、より広い
            <span className="not-italic font-semibold">物理知能アーキテクチャ</span>
            の基盤になります。
          </p>
          <p className="mt-4 text-[14px] leading-[1.6] text-fg-secondary">
            私たちはこの会社を
            <span className="italic text-fg-primary">Hinoki</span>
            と名付けました。日本の檜が持つ分散的な構造は、Arcの背後にあるアーキテクチャ原理と重なっています。
          </p>
        </Card>

        <div className="pt-4 font-mono text-[11px] tracking-[0.06em] text-fg-caption">
          プレゼンター用の全スライドはデスクトップ表示でご覧いただけます。
        </div>
      </div>
    </main>
  );
}
