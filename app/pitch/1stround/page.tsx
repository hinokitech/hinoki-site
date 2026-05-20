import type { Metadata } from "next";
import PitchDeck1stRound from "./PitchDeck1stRound";

export const metadata: Metadata = {
  title: "Hinoki — 1stRound Application Deck",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function Pitch1stRoundPage() {
  return <PitchDeck1stRound />;
}
