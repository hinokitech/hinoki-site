import type { Metadata } from "next";
import PitchDeckAntlerV7 from "./PitchDeckAntlerV7";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck (v7)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerV7Page() {
  return <PitchDeckAntlerV7 />;
}
