import type { Metadata } from "next";
import PitchDeckCorelineV2 from "./PitchDeckCorelineV2";

export const metadata: Metadata = {
  title: "Hinoki — Coreline Deck (v2)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchCorelineV2Page() {
  return <PitchDeckCorelineV2 />;
}
