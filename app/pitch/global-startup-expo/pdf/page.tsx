import type { Metadata } from "next";
import PdfDeckView from "../../PdfDeckView";
import { SLIDES } from "../slides";

export const metadata: Metadata = {
  title: "Hinoki — Global Startup Expo Deck (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchGlobalStartupExpoPdfPage() {
  return (
    <PdfDeckView
      slides={SLIDES}
      theme="dark"
      ariaLabel="Hinoki Global Startup Expo deck — printable"
      slideAriaLabel={(i, total) => `Slide ${i + 1} of ${total}`}
    />
  );
}
