"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckPreSeedV2Jp from "./mobile-jp";
import { SLIDES_JP } from "./slides-jp";

export default function PitchDeckPreSeedV2Jp() {
  return (
    <PitchDeck
      slides={SLIDES_JP}
      mobileDeck={MobileDeckPreSeedV2Jp}
      altLang={{ href: "/pitch/pre-seed-v2", label: "EN" }}
      navHint="← → でスライド移動 · F でフルスクリーン"
    />
  );
}
