import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES_ANTLER_V4 } from "../slides-antler-v4";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck v4 (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerV4PdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES_ANTLER_V4}
      ariaLabel="Hinoki Antler IC deck v4 — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
