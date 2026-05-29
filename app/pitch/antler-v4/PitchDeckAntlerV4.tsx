"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckAntler from "../antler/mobile-antler";
import { SLIDES_ANTLER_V4 } from "./slides-antler-v4";

export default function PitchDeckAntlerV4() {
  return (
    <PitchDeck
      slides={SLIDES_ANTLER_V4}
      mobileDeck={MobileDeckAntler}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
