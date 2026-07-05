"use client";

import PitchDeck from "../pitch/PitchDeck";
import MobileDeckJp from "./mobile-jp";
import { SLIDES_JP } from "./slides-jp";

export default function PitchDeckJp() {
  return (
    <PitchDeck
      slides={SLIDES_JP}
      mobileDeck={MobileDeckJp}
      altLang={{ href: "/pitch/pre-seed-v2", label: "EN" }}
      navHint="← → でスライド移動 · F でフルスクリーン"
    />
  );
}
