import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES_CORELINE } from "../slides-coreline";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck v6 (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerV6PdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES_CORELINE}
      ariaLabel="Hinoki Antler IC deck v6 — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
