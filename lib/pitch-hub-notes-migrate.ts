import {
  LEGACY_DECK_NOTE_IDS,
  PITCH_DECK_NOTE_IDS,
} from "@/app/pitch/pitch-registry";
import type { PitchHubNotes } from "@/lib/pitch-hub-notes-store";

/** Merge notes from retired deck ids (e.g. separate `jp` entry) into canonical ids. */
export function migrateLegacyHubNotes(notes: PitchHubNotes): {
  notes: PitchHubNotes;
  changed: boolean;
} {
  const next = { ...notes };
  let changed = false;

  for (const [legacyId, canonicalId] of Object.entries(LEGACY_DECK_NOTE_IDS)) {
    const legacy = next[legacyId]?.trim();
    if (!legacy) {
      if (legacyId in next) {
        delete next[legacyId];
        changed = true;
      }
      continue;
    }
    if (!next[canonicalId]?.trim()) {
      next[canonicalId] = legacy;
      changed = true;
    }
    delete next[legacyId];
    changed = true;
  }

  for (const key of Object.keys(next)) {
    if (!PITCH_DECK_NOTE_IDS.has(key)) {
      delete next[key];
      changed = true;
    }
  }

  return { notes: next, changed };
}
