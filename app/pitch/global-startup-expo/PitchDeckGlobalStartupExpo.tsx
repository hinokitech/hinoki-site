"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckGlobalStartupExpo from "./mobile";
import { SLIDES } from "./slides";

export default function PitchDeckGlobalStartupExpo() {
  return (
    <PitchDeck
      slides={SLIDES}
      mobileDeck={MobileDeckGlobalStartupExpo}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
