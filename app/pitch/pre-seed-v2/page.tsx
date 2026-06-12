import type { Metadata } from "next";
import PitchDeckPreSeedV2 from "./PitchDeckPreSeedV2";

export const metadata: Metadata = {
  title: "Hinoki — Pre-seed Deck (v2)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchPreSeedV2Page() {
  return <PitchDeckPreSeedV2 />;
}
