import type { Metadata } from "next";
import PitchDeckCoreline from "./PitchDeckCoreline";

export const metadata: Metadata = {
  title: "Hinoki — Coreline Deck",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchCorelinePage() {
  return <PitchDeckCoreline />;
}
