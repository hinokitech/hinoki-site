import type { Metadata } from "next";
import PdfDeckView from "../../pitch/PdfDeckView";
import { SLIDES_JP } from "../slides-jp";

export const metadata: Metadata = {
  title: "Hinoki — Deck（PDF出力・日本語）",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PdfDeckJpPage() {
  return (
    <PdfDeckView
      slides={SLIDES_JP}
      ariaLabel="Hinoki 投資家向け資料（日本語）— 印刷用"
      slideAriaLabel={(i, total) => `スライド ${i + 1} / ${total}`}
    />
  );
}
