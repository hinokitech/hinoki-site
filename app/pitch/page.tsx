import type { Metadata } from "next";
import PitchDeck from "./PitchDeck";

export const metadata: Metadata = {
  title: "Investor Deck",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

/** English investor deck — canonical URL for sharing: `/pitch` */
export default function PitchPage() {
  return (
    <PitchDeck
      altLang={{ href: "/pitch-jp", label: "日本語" }}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
