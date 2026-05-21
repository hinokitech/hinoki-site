"use client";

import PitchDeck from "../PitchDeck";
import MobileDeck1stRound from "./mobile-1stround";
import { SLIDES_1STROUND } from "./slides-1stround";

export default function PitchDeck1stRound() {
  return (
    <PitchDeck
      slides={SLIDES_1STROUND}
      mobileDeck={MobileDeck1stRound}
      altLang={{ href: "/pitch/1stround-jp", label: "日本語" }}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
