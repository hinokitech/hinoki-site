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
    id: "antler-ic-final",
    title: "ANTLER IC Final",
    description:
      "Final Antler IC deck — 20-slide main path plus 11 appendix slides (XELA case studies, 2035 vision, product roadmap, capital roadmap, unfair advantage, technical network). Pre-Seed · June 2026.",
    audience: "Antler Japan Pre-IC / IC",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/antler-ic-final",
      },
    ],
  },
  {
    id: "pre-seed",
    title: "Pre-seed · full deck",
    description:
      "16-slide investor deck — problem through ask. Frozen snapshot; iterate on v2.",
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
    id: "pre-seed-v2",
    title: "Pre-seed · full deck · v2",
    description:
      "Current working copy — 20-slide main deck plus 7 appendix slides (English and Japanese).",
    audience: "VCs, angels, NEDO, domestic partners",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/pre-seed-v2",
      },
      {
        lang: "ja",
        label: "日本語",
        path: "/pitch/pre-seed-v2-jp",
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
      "15-slide investment-conviction deck for Antler Japan Pre-IC / IC (frozen snapshot).",
    audience: "Antler Japan Pre-IC / IC",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/antler",
      },
    ],
  },
  {
    id: "antler-v2",
    title: "Antler IC Deck · v2",
    description:
      "IC deck snapshot — case studies, business model, market, GTM. Frozen for reference; iterate on v3.",
    audience: "Antler Japan Pre-IC / IC",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/antler-v2",
      },
    ],
  },
  {
    id: "antler-v3",
    title: "Antler IC Deck · v3",
    description:
      "IC deck snapshot — frozen for reference; iterate on v4.",
    audience: "Antler Japan Pre-IC / IC",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/antler-v3",
      },
    ],
  },
  {
    id: "antler-v4",
    title: "Antler IC Deck · v4",
    description:
      "IC deck snapshot — frozen for reference; iterate on v5.",
    audience: "Antler Japan Pre-IC / IC",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/antler-v4",
      },
    ],
  },
  {
    id: "antler-v5",
    title: "Antler IC Deck · v5",
    description:
      "IC deck snapshot — frozen for reference; iterate on v6.",
    audience: "Antler Japan Pre-IC / IC",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/antler-v5",
      },
    ],
  },
  {
    id: "antler-v6",
    title: "Antler IC Deck · v6",
    description:
      "Current working copy — Prize slide, market/GTM/business-model matrix layouts, updated unit economics, and arc-status LOI traction.",
    audience: "Antler Pre-IC / IC",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/antler-v6",
      },
    ],
  },
  {
    id: "coreline",
    title: "Coreline Deck",
    description:
      "Initial Coreline/Atlas branch from Antler IC v4 — frozen snapshot.",
    audience: "Coreline / Atlas",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/coreline",
      },
    ],
  },
  {
    id: "coreline-v2",
    title: "Coreline Deck · v2",
    description:
      "Current working copy — problem chain, FPGA strategy, arc status, ask pipeline, and modeled performance labels.",
    audience: "Coreline / Atlas",
    locales: [
      {
        lang: "en",
        label: "English",
        path: "/pitch/coreline-v2",
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
