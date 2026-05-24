"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckAntler from "../antler/mobile-antler";
import { SLIDES_ANTLER_V2 } from "./slides-antler-v2";

export default function PitchDeckAntlerV2() {
  return (
    <PitchDeck
      slides={SLIDES_ANTLER_V2}
      mobileDeck={MobileDeckAntler}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
