import type { Metadata } from "next";
import { SLIDES_JP } from "../slides-jp";

export const metadata: Metadata = {
  title: "Hinoki — Deck（PDF出力・日本語）",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const SLIDE_W = 1920;
const SLIDE_H = 1080;

/**
 * 日本語デッキの印刷用ページ。
 *
 * すべてのスライドを縦に並べて表示し、印刷時は 1 ページ = 1 スライドに分割します。
 * このページを開いて `Ctrl/Cmd + P` → 「PDFに保存」。
 *
 * 推奨設定:
 * - 余白: なし
 * - 背景のグラフィック: ON
 * - 拡大/縮小: 100%（または「既定」）
 */
export default function PdfDeckJpPage() {
  return (
    <>
      <style>{`
        @page {
          size: ${SLIDE_W}px ${SLIDE_H}px;
          margin: 0;
        }
        html, body {
          margin: 0;
          padding: 0;
          background: #f7f4ef;
        }
        .pdf-deck {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          padding: 24px 0;
        }
        .pdf-slide {
          position: relative;
          overflow: hidden;
          width: ${SLIDE_W}px;
          height: ${SLIDE_H}px;
          background: #f7f4ef;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
        }
        @media print {
          .pdf-deck {
            gap: 0;
            padding: 0;
          }
          .pdf-slide {
            box-shadow: none;
            page-break-after: always;
            break-after: page;
          }
          .pdf-slide:last-child {
            page-break-after: auto;
            break-after: auto;
          }
        }
      `}</style>
      <main className="pdf-deck" aria-label="Hinoki 投資家向け資料（日本語）— 印刷用">
        {SLIDES_JP.map((Slide, i) => (
          <section
            key={i}
            className="pdf-slide"
            aria-label={`スライド ${i + 1} / ${SLIDES_JP.length}`}
          >
            <Slide />
          </section>
        ))}
      </main>
    </>
  );
}

