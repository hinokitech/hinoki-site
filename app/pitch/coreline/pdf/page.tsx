import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES_CORELINE } from "../slides-coreline";

export const metadata: Metadata = {
  title: "Hinoki — Coreline Deck (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchCorelinePdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES_CORELINE}
      ariaLabel="Hinoki Coreline deck — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
