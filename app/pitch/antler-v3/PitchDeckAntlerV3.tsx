"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckAntler from "../antler/mobile-antler";
import { SLIDES_ANTLER_V3 } from "./slides-antler-v3";

export default function PitchDeckAntlerV3() {
  return (
    <PitchDeck
      slides={SLIDES_ANTLER_V3}
      mobileDeck={MobileDeckAntler}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
