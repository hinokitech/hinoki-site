"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckAntler from "../antler/mobile-antler";
import { SLIDES_CORELINE } from "./slides-coreline";

export default function PitchDeckCorelineV2() {
  return (
    <PitchDeck
      slides={SLIDES_CORELINE}
      mobileDeck={MobileDeckAntler}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
