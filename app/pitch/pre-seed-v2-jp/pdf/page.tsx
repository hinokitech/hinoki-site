import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES_JP } from "../slides-jp";

export const metadata: Metadata = {
  title: "Hinoki — Pre-seed Deck v2（PDF）",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchPreSeedV2JpPdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES_JP}
      ariaLabel="Hinoki pre-seed deck v2 — 印刷用"
      slideAriaLabel={(i, total) => `スライド ${i + 1} / ${total}`}
    />
  );
}
