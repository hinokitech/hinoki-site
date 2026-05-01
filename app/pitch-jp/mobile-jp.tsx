import Link from "next/link";

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
      <h2 className="text-[24px] font-light leading-[1.35] tracking-[-0.02em]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.75] text-fg-secondary">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

function SmallGrid({
  items,
}: {
  items: Array<{ k: string; v: string }>;
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-2 text-[15px] leading-[1.7] text-fg-secondary">
      {items.map((it) => (
        <div key={it.k} className="flex gap-3">
          <div className="w-[112px] shrink-0 font-semibold text-fg-primary">
            {it.k}
          </div>
          <div>{it.v}</div>
        </div>
      ))}
    </div>
  );
}

export default function MobileDeckJp() {
  return (
    <main className="min-h-dvh bg-bg-base px-5 pb-20 pt-10 text-fg-primary">
      <header className="mx-auto max-w-[720px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Hinoki Technologies · 投資家向け資料
          </div>
          <Link
            href="/pitch"
            className="rounded-md border border-border bg-bg-subtle px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-secondary transition-colors hover:border-accent hover:text-accent"
          >
            EN
          </Link>
        </div>
        <h1 className="text-[34px] font-light leading-[1.3] tracking-[-0.02em] md:text-[48px]">
          ロボットに欠けていた、フィジカルインテリジェンス。
        </h1>
        <p className="mt-5 text-[16px] leading-[1.85] text-fg-secondary">
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
        <div className="mt-5 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary">
          Pre-Seed · 2026 年 4 月
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-[720px] space-y-10">
        <Card
          tag="01 · 課題"
          title="ロボットは「考える」ことはできても、「反応する」ことができません。"
        >
          <p className="mt-3 text-[15px] leading-[1.85] text-fg-secondary">
            現在のロボットは、層化されたデジタルスタックを通して制御ループを実行します。各層が遅延とエネルギーコストを加え、知覚を行動に変換する速度が、人間近接の安全性には遅すぎます。
          </p>
          <p className="mt-3 text-[15px] leading-[1.85] text-fg-secondary">
            ケージレス展開を阻んでいるのは、より良いモデルではありません。センシングとアクチュエーションの間のアーキテクチャです。
          </p>
        </Card>

        <Card tag="02 · 洞察" title="フィジカルインテリジェンスは身体に宿る。">
          <ul className="mt-4 space-y-3 text-[15px] leading-[1.8] text-fg-secondary">
            <li>
              <span className="font-semibold text-fg-primary">反応:</span>{" "}
              熱いものに触れる。考える前に手は引かれている。
            </li>
            <li>
              <span className="font-semibold text-fg-primary">適応:</span>{" "}
              動物は新しい表面で瞬時に歩様を調整する。
            </li>
            <li>
              <span className="font-semibold text-fg-primary">回復力:</span>{" "}
              三本足の犬は走り続ける。指令なしの再分配。
            </li>
          </ul>
          <p className="mt-4 text-[15px] leading-[1.85] text-fg-secondary">
            一つの基板に宿る三つの振る舞い。連続時間、分散、物理的なもの。
          </p>
        </Card>

        <Card
          tag="03 · ソリューション"
          title={
            <>
              <span className="italic">Arc</span> —
              フィジカルインテリジェンスのためのアーキテクチャ。
            </>
          }
        >
          <p className="mt-3 text-[15px] leading-[1.85] text-fg-secondary">
            ハイブリッド型のフィジカル・デジタル制御層。連続時間の動的基板として動作し、推論、メモリアクセス、デジタルラウンドトリップを介さずに、センサー入力をアクチュエーションに直結させます。
          </p>
          <SmallGrid
            items={[
              {
                k: "現在",
                v: "ADC → MCU/GPU → メモリ → 推論 → アクチュエーター",
              },
              {
                k: "Arc",
                v: "センサー → 連続時間動力学 → 軽量デジタル → アクチュエーター",
              },
            ]}
          />
        </Card>

        <Card tag="04 · 振る舞い" title="三つの振る舞い。一つのアーキテクチャ。">
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">反応:</span>{" "}
                滑り、接触、力の変化にサブミリ秒で反応
              </>,
              <>
                <span className="font-semibold text-fg-primary">適応:</span>{" "}
                新しい物体、表面、負荷にループ内で適応
              </>,
              <>
                <span className="font-semibold text-fg-primary">回復力:</span>{" "}
                ノイズや部分的な故障下での優雅な再分配
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.85] text-fg-secondary">
            反射が突破口です。適応と回復力は、同じ基板上での自然な拡張です。
          </p>
        </Card>

        <Card tag="05 · プロダクト" title="Phase 1 は、すでに動いています。">
          <BulletList
            items={[
              "FPGA ファブリック上に実装されたリザバーコンピューティング",
              "ハードウェア上で検証済みのライブセンサーストリーム(シミュレーションではない)",
              "リアルタイム物体分類とモーション追跡を確認",
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.85] text-fg-secondary">
            Phase 2 はループを閉じます。RC
            出力をアクチュエーターに接続し、デジタル PID
            ベースラインに対して、遅延、サイクルあたりエネルギー、ノイズ下での安定性をベンチマークします。
          </p>
        </Card>

        <Card tag="06 · 技術" title="なぜ FPGA か。なぜ今か。">
          <p className="mt-3 text-[15px] leading-[1.85] text-fg-secondary">
            リザバーコンピューティングは、カオス的な動的基板です。最適なアーキテクチャを見出すには、その上で動作するソフトウェアだけでなく、基板そのものを反復する必要があります。
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  シリコンファースト:
                </span>{" "}
                テープアウト時にトポロジが固定
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  FPGA ファースト:
                </span>{" "}
                週次でトポロジを反復可能 → 後に ASIC/IP
              </>,
            ]}
          />
        </Card>

        <Card tag="07 · 市場規模" title="すべてのロボットの中に、制御層を。">
          <BulletList
            items={[
              "3,000 億ドル超の産業オートメーション",
              "1,000 億ドル超のロボティクスプラットフォーム",
              "2034 年までに 1,650 億ドルのヒューマノイド(50% CAGR 予測)",
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.85] text-fg-secondary">
            すべてのロボティクスプラットフォームには制御モジュールが必要です。私たちは、それらにフィジカルインテリジェンスを与えるアーキテクチャ層をライセンスします。
          </p>
        </Card>

        <Card
          tag="08 · ターゲットアプリケーション"
          title="動くすべてのプラットフォームへ。"
        >
          <p className="mt-3 text-[15px] leading-[1.85] text-fg-secondary">
            <span className="italic">Arc</span> は汎用制御層です。Phase 2
            はまず産業領域に着地し、ヒューマノイド、防衛、アシスティブシステムへと同一基板上で拡張します。
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  ヒューマノイド:
                </span>{" "}
                ケージなしで人間の近くで動作する
              </>,
              <>
                <span className="font-semibold text-fg-primary">産業:</span>{" "}
                ラインを再構築せずに新しい SKU に適応する
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  防衛・自律:
                </span>{" "}
                部分的な故障下でも動き続ける
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  ウェアラブル・アシスティブ:
                </span>{" "}
                それを着用する身体に適応する
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] italic leading-[1.85] text-fg-secondary">
            身体が反応し、適応し、立ち続ける必要があるすべての場所で、Arc
            はアーキテクチャ層となります。
          </p>
        </Card>

        <Card tag="09 · 競合" title="私たちが立つ位置。">
          <BulletList
            items={[
              "デジタル適応制御(PID/MPC):決定論的、適応が遅い",
              "TinyML / 組込み ML:離散的推論、遅延律速",
              "ニューロモーフィック:知覚に強いが、アクチュエーションループでは未成熟",
              "TDK アナログ RC:シリコンファースト、トポロジが固定",
              "Hinoki Arc:フィジカルインテリジェンス制御",
            ]}
          />
        </Card>

        <Card tag="10 · ビジネスモデル" title="ロボティクス業界の ARM へ。">
          <BulletList
            items={[
              "フェーズ 1:共同開発収益 + 独自の検証データ",
              "フェーズ 2:プラットフォームライセンス(年次)",
              "フェーズ 3:ユニット単位ロイヤリティ(制御に適用された ARM モデル)",
            ]}
          />
        </Card>

        <Card
          tag="11 · ゴー・トゥ・マーケット"
          title="日本から始める。意図的に。"
        >
          <p className="mt-3 text-[15px] leading-[1.85] text-fg-secondary">
            日本は世界で最も集積されたロボティクスエコシステムです。私たちは
            <span className="font-semibold text-fg-primary">
              つくばサイエンスシティ
            </span>
            に拠点を置き、AIST と NIMS
            の隣で、すでに重要な関係性の中に立っています。
          </p>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            顧客開発
          </div>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  カスタマーディスカバリー — 進行中:
                </span>{" "}
                複数のロボティクスエンジニアにわたって制御層の適応に関する課題を確認
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  サイバーダイン研究者:
                </span>{" "}
                アシスティブ外骨格アプリケーションに関する初期対話
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  名古屋大学ロボティクス研究室:
                </span>{" "}
                アシスティブ外骨格における共同研究の初期対話
              </>,
            ]}
          />
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            資金調達経路
          </div>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  Antler Japan 2026 レジデンシー:
                </span>{" "}
                2026 年 5 月コホート開講
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  SusHi Tech Tokyo 2026:
                </span>{" "}
                ディープテック VC、コーポレートベンチャー、政府イノベーションプログラムにわたる投資家関係を開始
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  NEDO 助成金経路:
                </span>{" "}
                Phase 2 後の申請を予定し、希薄化を伴わない資金調達を延長
              </>,
            ]}
          />
        </Card>

        <Card tag="12 · トラクション" title="すでにリスク低減されているもの。">
          <p className="mt-3 text-[15px] leading-[1.85] text-fg-secondary">
            二つの独立したシグナルが、内部と外部の両方から、同じアーキテクチャの方向性を指し示しています。
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  内部での実証 — Phase 1 ハードウェア検証済み:
                </span>{" "}
                FPGA + ライブセンサーストリームで分類とモーション追跡。シミュレーションではなく、ハードウェア。
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  外部による検証 — TDK CEATEC 2025 受賞:
                </span>{" "}
                技術の方向性を独立した形で確認。私たちは補完的なアーキテクチャの賭けを選びました:FPGA
                ファースト、反復可能、その後ライセンス可能な IP へ。
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] italic leading-[1.85] text-fg-secondary">
            Phase 2 が、その間のループを閉じます。
          </p>
        </Card>

        <Card
          tag="13 · チーム"
          title="生物学とハードウェア AI の交差点。"
        >
          <p className="mt-3 text-[15px] leading-[1.85] text-fg-secondary">
            私たちは、現代のコンピューティングがアーキテクチャ的に間違っていると考えています。自然はフォン・ノイマンで動いていません。デジタルシステムが最も苦手とする領域、すなわちリアルタイム、身体性、物理制御に、生物学的アーキテクチャを適用します。
          </p>
          <div className="mt-4 grid gap-3 text-[15px] leading-[1.7] text-fg-secondary">
            <div>
              <span className="font-semibold text-fg-primary">
                Salvatore Martone:
              </span>{" "}
              筑波大学生物学卒、仮説の共同設計者、商業戦略・日本投資家関係
            </div>
            <div>
              <span className="font-semibold text-fg-primary">
                Bernardo B. Gatti:
              </span>{" "}
              コンピュータビジョン博士、JSPS/MEXT、元 AIST、共同設計者、Phase 1 を
              FPGA 上で構築
            </div>
            <div>
              <span className="font-semibold text-fg-primary">大塚 美奈:</span>{" "}
              日本市場・エコシステム、日本語ネイティブ、ロボティクスエンジニアとの関係構築
            </div>
          </div>
          <p className="mt-4 text-[15px] leading-[1.85] text-fg-secondary">
            社名 Hinoki
            は日本の檜から名付けています。檜は分散型生物学的知能のメタファーです。
          </p>
        </Card>

        <Card
          tag="14 · 財務モデル"
          title="三つのフェーズ。一つのロイヤリティ仮説。"
        >
          <p className="mt-3 text-[15px] leading-[1.85] text-fg-secondary">
            ARM Holdings は、20〜200 ドルのチップ価格に対して 1〜2%
            のロイヤリティを獲得しています。Hinoki は、20,000〜150,000
            ドルのロボティクスプラットフォーム、および 30,000〜100,000
            ドルのアシスティブデバイスに対して、同等のロイヤリティを目指します。前払いライセンス料に加えて、ヒューマノイド、産業、防衛、ウェアラブル・アシスティブ市場における採用に応じてスケールするユニット単位のロイヤリティです。
          </p>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  フェーズ 1 · 検証完了後 1〜2 年:
                </span>{" "}
                3〜5 件の有償共同開発エンゲージメント →{" "}
                <span className="font-semibold text-fg-primary">
                  累計 150〜500 万ドル
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  フェーズ 2 · 2〜5 年目:
                </span>{" "}
                12〜25 社のプラットフォームメーカーへの、年間 250,000〜1,000,000
                ドルのリファレンスデザインライセンス →{" "}
                <span className="font-semibold text-fg-primary">
                  ARR 700〜2,500 万ドル
                </span>
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  フェーズ 3 · 5 年目以降:
                </span>{" "}
                プラットフォーム 1 台あたり 5〜50 ドルのユニット単位ロイヤリティ
                →{" "}
                <span className="font-semibold text-fg-primary">
                  ARR 3,000〜25,000 万ドル
                </span>
              </>,
            ]}
          />
          <p className="mt-4 text-[15px] leading-[1.85] text-fg-secondary">
            <span className="font-semibold text-fg-primary">採用基準。</span>{" "}
            2030 年までにヒューマノイドは年間 1,000
            万台以上が予測されています。産業ロボティクスは現在、年間 60
            万台以上を出荷しています。外骨格と義肢の市場は 2032 年までに 300
            億ドルを超えると予測されています。ロイヤリティベースの IP
            ライセンスは 90% 以上の粗利率を持ちます。
          </p>
          <p className="mt-3 text-[14px] italic leading-[1.7] text-fg-tertiary">
            アシスティブ市場の採用は、臨床検証サイクルにより、ロボティクスより
            18〜24 ヶ月遅れます。Phase 3
            のウェアラブル貢献は、その遅延を考慮してモデル化されています。
          </p>
        </Card>

        <Card
          tag="15 · 調達"
          title="400,000 ドル プレシード — 検証ランウェイ。"
        >
          <p className="mt-3 text-[15px] leading-[1.85] text-fg-secondary">
            <span className="font-semibold text-fg-primary">
              12 ヶ月のマイルストーン:
            </span>{" "}
            デジタルベースラインに対する遅延、エネルギー、適応的安定性の測定可能な改善のベンチマーク。閉ループ、ハードウェア上で。フィジカルインテリジェンスを制御層として実装した、世界初のハードウェアベンチマーク。
          </p>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            資金調達構成
          </div>
          <BulletList
            items={[
              <>
                <span className="font-semibold text-fg-primary">
                  最大 100,000 ドル
                </span>
                <br />
                <span className="font-semibold text-fg-primary">
                  レジデンシー期間中のベンダークレジット
                </span>
                <br />
                AWS、Google Cloud、IBM 等の Antler
                パートナーとの優遇クレジットおよびレート。プログラム期間中に利用可能、希薄化なし。
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  150,000 ドル
                </span>{" "}
                · Antler 投資委員会承認後の投資:1,000,000
                ドルのバリュエーションキャップで 100,000 ドル post-money
                J-KISS/SAFE(ESOP 後約 10%)+ 50,000 ドル uncapped MFN SAFE
              </>,
              <>
                <span className="font-semibold text-fg-primary">
                  最大 250,000 ドル
                </span>{" "}
                · Antler ARC マッチング、第三者投資家から 200,000
                ドルの調達でアンロック
              </>,
              <>追加のプレシード投資家を歓迎</>,
            ]}
          />
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            資金の用途
          </div>
          <p className="mt-2 text-[15px] leading-[1.7] text-fg-secondary">
            創業者ランウェイ、ハードウェア統合および組込みシステム、FPGA
            改善およびベンチマークプラットフォーム、力センサーおよびアクチュエーター検証リグ、データセット生成、仮特許出願、NEDO/JST
            助成金申請支援。
          </p>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            12 ヶ月後のアウトカム — フェーズ 1 収益のアンロック
          </div>
          <BulletList
            items={[
              "ライセンス交渉のための検証済みベンチマークデータセット",
              "日本のロボティクスメーカーとの初の共同開発 LOI",
              "仮特許出願完了",
              "NEDO 助成金申請提出",
            ]}
          />
        </Card>

        <div className="pt-4 font-mono text-[11px] tracking-[0.06em] text-fg-tertiary">
          フルプレゼンタービューはデスクトップでご覧いただけます。
        </div>
      </div>
    </main>
  );
}
