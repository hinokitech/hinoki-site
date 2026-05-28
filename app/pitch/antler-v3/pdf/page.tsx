import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES_ANTLER_V3 } from "../slides-antler-v3";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck v3 (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerV3PdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES_ANTLER_V3}
      ariaLabel="Hinoki Antler IC deck v3 — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
