import type { Metadata } from "next";
import PitchDeckAntlerV6 from "./PitchDeckAntlerV6";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck (v6)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerV6Page() {
  return <PitchDeckAntlerV6 />;
}
