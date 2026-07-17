import type { Metadata } from "next";
import PitchDeckGlobalStartupExpo from "./PitchDeckGlobalStartupExpo";

export const metadata: Metadata = {
  title: "Hinoki — Global Startup Expo Deck",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PitchGlobalStartupExpoPage() {
  return <PitchDeckGlobalStartupExpo />;
}
