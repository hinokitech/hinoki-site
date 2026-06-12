import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES } from "../slides";

export const metadata: Metadata = {
  title: "Hinoki — Pre-seed Deck v2 (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchPreSeedV2PdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES}
      ariaLabel="Hinoki pre-seed deck v2 — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
