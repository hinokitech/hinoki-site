import type { Metadata } from "next";
import PitchDeckPreSeedV2Jp from "./PitchDeckPreSeedV2Jp";

export const metadata: Metadata = {
  title: "Hinoki — Pre-seed Deck v2（日本語）",
  alternates: {
    languages: {
      en: "/pitch/pre-seed-v2",
      ja: "/pitch/pre-seed-v2-jp",
    },
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchPreSeedV2JpPage() {
  return <PitchDeckPreSeedV2Jp />;
}
