import type { Metadata } from "next";
import PdfDeckView from "../PdfDeckView";
import { SLIDES } from "../slides";

export const metadata: Metadata = {
  title: "Hinoki — Deck (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

/** English deck — print / Save-as-PDF: `/pitch/pdf` */
export default function PitchPdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES}
      ariaLabel="Hinoki investor deck — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
