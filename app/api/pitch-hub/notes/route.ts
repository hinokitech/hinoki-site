import { NextResponse } from "next/server";
import { isPitchHubAuthenticated } from "@/lib/pitch-hub-auth";
import {
  getNotesPersistence,
  loadPitchHubNotes,
  MAX_NOTE_LENGTH,
  sanitizePitchHubNotes,
  savePitchHubNotes,
} from "@/lib/pitch-hub-notes-store";
import {
  PITCH_DECK_NOTE_IDS,
  resolveDeckNoteId,
} from "@/app/pitch/pitch-registry";
import { migrateLegacyHubNotes } from "@/lib/pitch-hub-notes-migrate";

async function requireHubAuth() {
  if (!(await isPitchHubAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const authError = await requireHubAuth();
  if (authError) return authError;

  let notes = await loadPitchHubNotes();
  const { notes: migrated, changed } = migrateLegacyHubNotes(notes);
  notes = migrated;
  if (changed) {
    const saved = await savePitchHubNotes(notes);
    if (!saved.ok) {
      notes = sanitizePitchHubNotes(notes, PITCH_DECK_NOTE_IDS);
    }
  } else {
    notes = sanitizePitchHubNotes(notes, PITCH_DECK_NOTE_IDS);
  }

  return NextResponse.json({
    notes,
    persistence: getNotesPersistence(),
  });
}

export async function PATCH(request: Request) {
  const authError = await requireHubAuth();
  if (authError) return authError;

  let body: { deckId?: string; text?: string };
  try {
    body = (await request.json()) as { deckId?: string; text?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const deckId = body.deckId;
  const text = body.text;

  const canonicalDeckId =
    typeof deckId === "string" ? resolveDeckNoteId(deckId) : undefined;
  if (!canonicalDeckId) {
    return NextResponse.json({ error: "Unknown deck." }, { status: 400 });
  }
  if (typeof text !== "string") {
    return NextResponse.json({ error: "Notes must be text." }, { status: 400 });
  }
  if (text.length > MAX_NOTE_LENGTH) {
    return NextResponse.json(
      { error: `Notes cannot exceed ${MAX_NOTE_LENGTH} characters.` },
      { status: 400 },
    );
  }

  let notes = migrateLegacyHubNotes(await loadPitchHubNotes()).notes;
  notes = sanitizePitchHubNotes(notes, PITCH_DECK_NOTE_IDS);
  if (text.trim()) {
    notes[canonicalDeckId] = text;
  } else {
    delete notes[canonicalDeckId];
  }

  const saved = await savePitchHubNotes(notes);
  if (!saved.ok) {
    return NextResponse.json({ error: saved.message }, { status: 503 });
  }

  return NextResponse.json({
    notes,
    persistence: getNotesPersistence(),
  });
}
