import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES_1STROUND_JP } from "../slides-1stround-jp";

export const metadata: Metadata = {
  title: "Hinoki — 1stRound 申請資料（PDF）",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function Pitch1stRoundJpPdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES_1STROUND_JP}
      ariaLabel="Hinoki 1stRound 申請資料 — 印刷用"
      slideAriaLabel={(i, total) => `スライド ${i + 1} / ${total}`}
    />
  );
}
