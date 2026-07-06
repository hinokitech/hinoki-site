import type { Metadata } from "next";
import PitchDeckSonyInnovation from "./PitchDeckSonyInnovation";

export const metadata: Metadata = {
  title: "Hinoki — Sony Innovation Deck",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchSonyInnovationPage() {
  return <PitchDeckSonyInnovation />;
}
