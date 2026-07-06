"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckSonyInnovation from "./mobile";
import { SLIDES } from "./slides";

export default function PitchDeckSonyInnovation() {
  return (
    <PitchDeck
      slides={SLIDES}
      mobileDeck={MobileDeckSonyInnovation}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
