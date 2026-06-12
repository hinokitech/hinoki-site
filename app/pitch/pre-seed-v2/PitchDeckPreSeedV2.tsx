"use client";

import PitchDeck from "../PitchDeck";
import MobileDeckPreSeedV2 from "./mobile";
import { SLIDES } from "./slides";

export default function PitchDeckPreSeedV2() {
  return (
    <PitchDeck
      slides={SLIDES}
      mobileDeck={MobileDeckPreSeedV2}
      altLang={{ href: "/pitch/pre-seed-v2-jp", label: "日本語" }}
      navHint="← → to navigate · F for fullscreen"
    />
  );
}
