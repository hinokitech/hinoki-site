import type { Metadata } from "next";
import PitchDeckAntlerIcFinal from "../antler-ic-final-deck/PitchDeckAntlerIcFinal";

export const metadata: Metadata = {
  title: "Hinoki — ANTLER IC Final",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerIcFinalPage() {
  return <PitchDeckAntlerIcFinal />;
}
