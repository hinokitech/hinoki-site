"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckPreSeedV2 from "./mobile";
import { SLIDES } from "./slides";

export default function PitchDeckPreSeedV2() {
  return (
    <PitchDeck
      slides={SLIDES}
      mobileDeck={MobileDeckPreSeedV2}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
