import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES_ANTLER_V2 } from "../slides-antler-v2";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck v2 (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerV2PdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES_ANTLER_V2}
      ariaLabel="Hinoki Antler IC deck v2 — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
