import type { Metadata } from "next";
import PitchDeckAntlerV4 from "./PitchDeckAntlerV4";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck (v4)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerV4Page() {
  return <PitchDeckAntlerV4 />;
}
