import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES_ANTLER } from "../slides-antler";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerPdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES_ANTLER}
      ariaLabel="Hinoki Antler IC deck — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
