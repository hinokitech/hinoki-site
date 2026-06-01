import type { Metadata } from "next";
import PitchDeckAntlerV5 from "./PitchDeckAntlerV5";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck (v5)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerV5Page() {
  return <PitchDeckAntlerV5 />;
}
