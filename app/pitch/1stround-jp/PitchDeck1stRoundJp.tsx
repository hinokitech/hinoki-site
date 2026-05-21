"use client";

import PitchDeck from "../PitchDeck";
import MobileDeck1stRoundJp from "./mobile-1stround-jp";
import { SLIDES_1STROUND_JP } from "./slides-1stround-jp";

export default function PitchDeck1stRoundJp() {
  return (
    <PitchDeck
      slides={SLIDES_1STROUND_JP}
      mobileDeck={MobileDeck1stRoundJp}
      altLang={{ href: "/pitch/1stround", label: "EN" }}
      navHint="← → でスライド移動 · F でフルスクリーン"
    />
  );
}
