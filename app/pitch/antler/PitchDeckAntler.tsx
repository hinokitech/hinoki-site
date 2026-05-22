"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckAntler from "./mobile-antler";
import { SLIDES_ANTLER } from "./slides-antler";

export default function PitchDeckAntler() {
  return (
    <PitchDeck
      slides={SLIDES_ANTLER}
      mobileDeck={MobileDeckAntler}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
