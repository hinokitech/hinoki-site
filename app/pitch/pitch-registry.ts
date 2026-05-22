export type PitchDeckLocale = {
  lang: "en" | "ja";
  /** Short label for hub UI */
  label: string;
  path: string;
  /** Print / Save-as-PDF route. Defaults to `{path}/pdf` when omitted. */
  pdfPath?: string;
};

export type PitchDeckEntry = {
  id: string;
  title: string;
  description: string;
  audience: string;
  locales: PitchDeckLocale[];
};

/** Single source of truth for pitch routes — hub UI reads this list. */
export const PITCH_DECKS: PitchDeckEntry[] = [
  {
    id: "pre-seed",
    title: "Pre-seed · full deck",
    description:
      "16-slide investor deck — problem through ask. Same deck in English and Japanese.",
    audience: "VCs, angels, NEDO, domestic partners",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch",
      },
      {
        lang: "ja",
        label: "日本語",
        path: "/pitch-jp",
      },
    ],
  },
  {
    id: "1stround",
    title: "1stRound Application Deck",
    description:
      "17-slide non-dilutive application deck — customer pain through first-benchmark validation. Practical, technical, fundable.",
    audience: "1stRound / university-linked non-dilutive funding",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/1stround",
      },
      {
        lang: "ja",
        label: "日本語",
        path: "/pitch/1stround-jp",
      },
    ],
  },
  {
    id: "antler",
    title: "Antler IC Deck",
    description:
      "12-slide investment-conviction deck for Antler Japan Pre-IC / IC.",
    audience: "Antler Japan Pre-IC / IC",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/antler",
      },
    ],
  },
];

/** Deck ids that were merged or renamed — notes API may still receive these once. */
export const LEGACY_DECK_NOTE_IDS: Record<string, string> = {
  jp: "pre-seed",
};

export function getPitchDeckById(id: string): PitchDeckEntry | undefined {
  return PITCH_DECKS.find((d) => d.id === id);
}

export function resolveDeckNoteId(deckId: string): string | undefined {
  const canonical = LEGACY_DECK_NOTE_IDS[deckId] ?? deckId;
  return getPitchDeckById(canonical) ? canonical : undefined;
}

export const PITCH_DECK_NOTE_IDS = new Set(PITCH_DECKS.map((d) => d.id));

/** Resolved PDF export URL for a locale variant. */
export function resolveLocalePdfPath(locale: PitchDeckLocale): string {
  if (locale.pdfPath) return locale.pdfPath;
  const base = locale.path.replace(/\/$/, "");
  return `${base}/pdf`;
}
