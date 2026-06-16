import type { Metadata } from "next";
import PitchDeckPreSeedV2 from "../pre-seed-v2/PitchDeckPreSeedV2";

export const metadata: Metadata = {
  title: "Hinoki — ANTLER IC Final",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerIcFinalPage() {
  return <PitchDeckPreSeedV2 />;
}
