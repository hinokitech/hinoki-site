import type { Metadata } from "next";
import PitchDeckAntlerV3 from "./PitchDeckAntlerV3";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck (v3)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerV3Page() {
  return <PitchDeckAntlerV3 />;
}
