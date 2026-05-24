import type { Metadata } from "next";
import PitchDeckAntlerV2 from "./PitchDeckAntlerV2";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck (v2)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerV2Page() {
  return <PitchDeckAntlerV2 />;
}
