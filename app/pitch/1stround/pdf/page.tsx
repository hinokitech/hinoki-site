import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES_1STROUND } from "../slides-1stround";

export const metadata: Metadata = {
  title: "Hinoki — 1stRound Application Deck (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function Pitch1stRoundPdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES_1STROUND}
      ariaLabel="Hinoki 1stRound application deck — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
