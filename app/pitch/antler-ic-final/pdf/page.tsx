import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES } from "../../pre-seed-v2/slides";

export const metadata: Metadata = {
  title: "Hinoki — ANTLER IC Final (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerIcFinalPdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES}
      ariaLabel="Hinoki ANTLER IC Final deck — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
