"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckAntlerIcFinal from "./mobile";
import { SLIDES } from "./slides";

export default function PitchDeckAntlerIcFinal() {
  return (
    <PitchDeck
      slides={SLIDES}
      mobileDeck={MobileDeckAntlerIcFinal}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
