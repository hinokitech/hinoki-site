import type { Metadata } from "next";
import PitchDeckAntler from "./PitchDeckAntler";

export const metadata: Metadata = {
  title: "Hinoki — Antler IC Deck",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchAntlerPage() {
  return <PitchDeckAntler />;
}
