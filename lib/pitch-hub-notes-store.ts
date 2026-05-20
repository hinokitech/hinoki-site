import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { BlobNotFoundError, get, put } from "@vercel/blob";

export type PitchHubNotes = Record<string, string>;

export type NotesPersistence = "blob" | "local" | "none";

const BLOB_PATHNAME = "pitch-hub/notes.json";
const LOCAL_RELATIVE = path.join("data", "pitch-hub-notes.json");
export const MAX_NOTE_LENGTH = 8000;

function localFilePath(): string {
  return path.join(process.cwd(), LOCAL_RELATIVE);
}

export function getNotesPersistence(): NotesPersistence {
  if (process.env.BLOB_READ_WRITE_TOKEN) return "blob";
  if (process.env.NODE_ENV === "development") return "local";
  return "none";
}

function parseNotesJson(raw: string): PitchHubNotes {
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }
  const notes: PitchHubNotes = {};
  for (const [key, value] of Object.entries(parsed)) {
    if (typeof value === "string") notes[key] = value;
  }
  return notes;
}

async function readLocalNotes(): Promise<PitchHubNotes> {
  const filePath = localFilePath();
  if (!existsSync(filePath)) return {};
  const raw = await readFile(filePath, "utf8");
  return parseNotesJson(raw);
}

async function writeLocalNotes(notes: PitchHubNotes): Promise<void> {
  const filePath = localFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(notes, null, 2)}\n`, "utf8");
}

async function readBlobNotes(): Promise<PitchHubNotes> {
  try {
    const result = await get(BLOB_PATHNAME, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) return {};
    const raw = await new Response(result.stream).text();
    if (!raw.trim()) return {};
    return parseNotesJson(raw);
  } catch (error) {
    if (error instanceof BlobNotFoundError) return {};
    throw error;
  }
}

async function writeBlobNotes(notes: PitchHubNotes): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(notes, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function loadPitchHubNotes(): Promise<PitchHubNotes> {
  const mode = getNotesPersistence();
  if (mode === "blob") return readBlobNotes();
  if (mode === "local") return readLocalNotes();
  return {};
}

export async function savePitchHubNotes(
  notes: PitchHubNotes,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const mode = getNotesPersistence();
  if (mode === "blob") {
    await writeBlobNotes(notes);
    return { ok: true };
  }
  if (mode === "local") {
    await writeLocalNotes(notes);
    return { ok: true };
  }
  return {
    ok: false,
    message:
      "Notes storage is not configured for production. Add a Vercel Blob store (BLOB_READ_WRITE_TOKEN).",
  };
}

export function sanitizePitchHubNotes(
  notes: PitchHubNotes,
  allowedDeckIds: Set<string>,
): PitchHubNotes {
  const sanitized: PitchHubNotes = {};
  for (const [deckId, text] of Object.entries(notes)) {
    if (!allowedDeckIds.has(deckId)) continue;
    sanitized[deckId] = text.slice(0, MAX_NOTE_LENGTH);
  }
  return sanitized;
}
