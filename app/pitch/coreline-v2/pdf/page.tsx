import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES_CORELINE } from "../slides-coreline";

export const metadata: Metadata = {
  title: "Hinoki — Coreline Deck v2 (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchCorelineV2PdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES_CORELINE}
      ariaLabel="Hinoki Coreline deck v2 — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
