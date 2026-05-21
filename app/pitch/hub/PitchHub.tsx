"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  LEGACY_DECK_NOTE_IDS,
  PITCH_DECKS,
  resolveLocalePdfPath,
  type PitchDeckEntry,
  type PitchDeckLocale,
} from "../pitch-registry";

const NOTES_PREFIX = "pitch-hub-notes:";
const SAVE_MODE_KEY = "pitch-hub-notes-save-mode";
const SAVE_DEBOUNCE_MS = 1800;
const SAVED_INDICATOR_MS = 2800;

type NotesPersistence = "blob" | "local" | "none";
type NotesSaveMode = "auto" | "manual";
type GlobalSaveState = "idle" | "pending" | "saving" | "saved" | "error";
type TimerId = ReturnType<typeof setTimeout>;

function deckUrl(path: string, origin: string): string {
  return `${origin}${path}`;
}

function LocaleLinks({
  locale,
  origin,
}: {
  locale: PitchDeckLocale;
  origin: string;
}) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const pdfPath = resolveLocalePdfPath(locale);
  const deckFullUrl = deckUrl(locale.path, origin);
  const pdfFullUrl = deckUrl(pdfPath, origin);
  const copyId = (kind: "deck" | "pdf") => `${locale.lang}-${kind}`;

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      window.prompt("Copy this link:", text);
    }
  }

  const btnClass =
    "rounded-md border border-border bg-bg-base px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-secondary transition-colors hover:border-accent hover:text-accent";

  return (
    <div className="rounded-lg border border-border/80 bg-bg-base/60 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
        {locale.label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={locale.path}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
        >
          Open deck
        </Link>
        <Link
          href={pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
        >
          Open PDF
        </Link>
        <button
          type="button"
          onClick={() => void copy(deckFullUrl, copyId("deck"))}
          className={btnClass}
        >
          {copiedKey === copyId("deck") ? "Copied" : "Copy deck"}
        </button>
        <button
          type="button"
          onClick={() => void copy(pdfFullUrl, copyId("pdf"))}
          className={btnClass}
        >
          {copiedKey === copyId("pdf") ? "Copied" : "Copy PDF"}
        </button>
      </div>
      <p className="mt-3 break-all font-mono text-[11px] text-fg-tertiary">
        Deck: {deckFullUrl}
      </p>
      <p className="mt-0.5 break-all font-mono text-[11px] text-fg-tertiary">
        PDF: {pdfFullUrl}
      </p>
    </div>
  );
}

function DeckCard({
  deck,
  origin,
  notes,
  onNotesChange,
  onNotesBlur,
  notesReadOnly,
  saveMode,
  isDirty,
  onSaveNow,
  isSaving,
}: {
  deck: PitchDeckEntry;
  origin: string;
  notes: string;
  onNotesChange: (deckId: string, text: string) => void;
  onNotesBlur: (deckId: string, text: string) => void;
  notesReadOnly: boolean;
  saveMode: NotesSaveMode;
  isDirty: boolean;
  onSaveNow: (deckId: string) => void;
  isSaving: boolean;
}) {
  return (
    <article className="rounded-xl border border-border bg-bg-subtle p-6">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-tertiary">
          {deck.audience}
        </span>
        <h2 className="mt-2 text-[22px] font-light tracking-[-0.02em] text-fg-primary">
          {deck.title}
        </h2>
        <p className="mt-2 max-w-[560px] text-[14px] leading-[1.6] text-fg-secondary">
          {deck.description}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {deck.locales.map((locale) => (
          <LocaleLinks key={locale.lang} locale={locale} origin={origin} />
        ))}
      </div>

      <label className="mt-5 block">
        <span className="mb-2 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-tertiary">
            Notes (synced across devices)
          </span>
          {saveMode === "manual" && isDirty && !notesReadOnly && (
            <button
              type="button"
              onClick={() => onSaveNow(deck.id)}
              disabled={isSaving}
              className="shrink-0 rounded-md border border-border bg-bg-base px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-secondary transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
            >
              {isSaving ? "Saving…" : "Save"}
            </button>
          )}
        </span>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(deck.id, e.target.value)}
          onBlur={(e) => onNotesBlur(deck.id, e.target.value)}
          rows={2}
          disabled={notesReadOnly}
          placeholder="e.g. Sent EN to Acme VC · JP to NEDO on May 20"
          className="w-full resize-y rounded-md border border-border bg-bg-base px-3 py-2 text-[14px] leading-[1.5] text-fg-primary outline-none placeholder:text-fg-tertiary focus:border-accent focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </label>
    </article>
  );
}

async function migrateLocalNotesToServer(
  serverNotes: Record<string, string>,
): Promise<Record<string, string>> {
  const merged = { ...serverNotes };
  let changed = false;

  for (const deck of PITCH_DECKS) {
    const local = localStorage.getItem(`${NOTES_PREFIX}${deck.id}`);
    if (!local?.trim()) continue;
    if (!merged[deck.id]?.trim()) {
      merged[deck.id] = local;
      changed = true;
    }
    localStorage.removeItem(`${NOTES_PREFIX}${deck.id}`);
  }

  for (const [legacyId, canonicalId] of Object.entries(LEGACY_DECK_NOTE_IDS)) {
    const local = localStorage.getItem(`${NOTES_PREFIX}${legacyId}`);
    if (!local?.trim()) continue;
    if (!merged[canonicalId]?.trim()) {
      merged[canonicalId] = local;
      changed = true;
    }
    localStorage.removeItem(`${NOTES_PREFIX}${legacyId}`);
  }

  if (!changed) return serverNotes;

  for (const deck of PITCH_DECKS) {
    const text = merged[deck.id];
    if (!text?.trim()) continue;
    await fetch("/api/pitch-hub/notes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deckId: deck.id, text }),
    });
  }

  return merged;
}

export default function PitchHub({
  passwordConfigured,
}: {
  passwordConfigured: boolean;
}) {
  const [origin, setOrigin] = useState("");
  const [notesByDeck, setNotesByDeck] = useState<Record<string, string>>({});
  const [persistence, setPersistence] = useState<NotesPersistence>("none");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveMode, setSaveMode] = useState<NotesSaveMode>("auto");
  const [globalSave, setGlobalSave] = useState<GlobalSaveState>("idle");
  const [dirtyDecks, setDirtyDecks] = useState<Record<string, boolean>>({});
  const [savingDeckId, setSavingDeckId] = useState<string | null>(null);
  const saveTimers = useRef<Record<string, TimerId>>({});
  const savedFadeTimer = useRef<TimerId | null>(null);
  const notesByDeckRef = useRef(notesByDeck);

  useEffect(() => {
    notesByDeckRef.current = notesByDeck;
  }, [notesByDeck]);

  useEffect(() => {
    setOrigin(window.location.origin);
    const stored = localStorage.getItem(SAVE_MODE_KEY);
    if (stored === "auto" || stored === "manual") setSaveMode(stored);
  }, []);

  function setSaveModeAndStore(mode: NotesSaveMode) {
    setSaveMode(mode);
    localStorage.setItem(SAVE_MODE_KEY, mode);
    for (const timer of Object.values(saveTimers.current)) clearTimeout(timer);
    saveTimers.current = {};
  }

  const globalSaveLabel = (() => {
    if (persistence === "none") return null;
    if (globalSave === "error") return "Could not save — try again";
    if (globalSave === "saving") return "Saving…";
    if (globalSave === "saved") return "All changes saved";
    if (globalSave === "pending" || Object.keys(dirtyDecks).length > 0) {
      return saveMode === "manual" ? "Unsaved changes" : "Will save shortly";
    }
    return saveMode === "auto" ? "Auto-save on" : null;
  })();

  const loadNotes = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch("/api/pitch-hub/notes");
      if (!res.ok) {
        setLoadError("Could not load notes.");
        return;
      }
      const data = (await res.json()) as {
        notes: Record<string, string>;
        persistence: NotesPersistence;
      };
      let notes = data.notes ?? {};
      setPersistence(data.persistence);

      if (data.persistence !== "none") {
        notes = await migrateLocalNotesToServer(notes);
      }

      setNotesByDeck(notes);
      setDirtyDecks({});
      setGlobalSave("idle");
    } catch {
      setLoadError("Could not load notes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotes();
  }, [loadNotes]);

  const scheduleSavedFade = useCallback(() => {
    if (savedFadeTimer.current) clearTimeout(savedFadeTimer.current);
    savedFadeTimer.current = setTimeout(() => {
      setGlobalSave((s) => (s === "saved" ? "idle" : s));
    }, SAVED_INDICATOR_MS) as TimerId;
  }, []);

  const persistNotes = useCallback(
    async (deckId: string, text: string) => {
      if (persistence === "none") return;

      setSavingDeckId(deckId);
      setGlobalSave("saving");
      try {
        const res = await fetch("/api/pitch-hub/notes", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deckId, text }),
        });
        if (!res.ok) {
          setGlobalSave("error");
          return;
        }
        const data = (await res.json()) as { persistence: NotesPersistence };
        setPersistence(data.persistence);
        setDirtyDecks((prev) => {
          const next = { ...prev };
          delete next[deckId];
          return next;
        });
        setGlobalSave("saved");
        scheduleSavedFade();
      } catch {
        setGlobalSave("error");
      } finally {
        setSavingDeckId(null);
      }
    },
    [persistence, scheduleSavedFade],
  );

  const queueSave = useCallback(
    (deckId: string, text: string, immediate = false) => {
      if (persistence === "none") return;

      const existing = saveTimers.current[deckId];
      if (existing) clearTimeout(existing);

      const run = () => {
        delete saveTimers.current[deckId];
        void persistNotes(deckId, text);
      };

      if (immediate) {
        run();
        return;
      }

      setGlobalSave((s) => (s === "saving" ? s : "pending"));
      saveTimers.current[deckId] = setTimeout(run, SAVE_DEBOUNCE_MS) as TimerId;
    },
    [persistence, persistNotes],
  );

  const onNotesChange = useCallback(
    (deckId: string, text: string) => {
      setNotesByDeck((prev) => ({ ...prev, [deckId]: text }));
      setDirtyDecks((prev) => ({ ...prev, [deckId]: true }));

      if (saveMode === "auto" && persistence !== "none") {
        queueSave(deckId, text);
      } else if (persistence !== "none") {
        setGlobalSave((s) => (s === "saving" ? s : "pending"));
      }
    },
    [saveMode, persistence, queueSave],
  );

  const onNotesBlur = useCallback(
    (deckId: string, text: string) => {
      if (saveMode !== "auto" || persistence === "none") return;
      const pending = saveTimers.current[deckId];
      if (pending) {
        clearTimeout(pending);
        delete saveTimers.current[deckId];
        void persistNotes(deckId, text);
      }
    },
    [saveMode, persistence, persistNotes],
  );

  const onSaveNow = useCallback(
    (deckId: string) => {
      const text = notesByDeckRef.current[deckId] ?? "";
      queueSave(deckId, text, true);
    },
    [queueSave],
  );

  useEffect(() => {
    const timers = saveTimers.current;
    return () => {
      for (const timer of Object.values(timers)) clearTimeout(timer);
      if (savedFadeTimer.current) clearTimeout(savedFadeTimer.current);
    };
  }, []);

  async function signOut() {
    await fetch("/api/pitch-hub/auth", { method: "DELETE" });
    window.location.reload();
  }

  return (
    <main className="min-h-dvh bg-bg-base px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-[800px]">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              Hinoki · Pitch hub
            </p>
            <h1 className="mt-2 text-[36px] font-light tracking-[-0.025em] text-fg-primary md:text-[44px]">
              Deck index
            </h1>
            <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-fg-secondary">
              Copy a deck link and send it directly. Recipients only see the
              presentation — not this page.
            </p>
            {persistence !== "none" && (
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <fieldset className="flex items-center gap-0 rounded-md border border-border p-0.5">
                  <legend className="sr-only">Note saving mode</legend>
                  <button
                    type="button"
                    onClick={() => setSaveModeAndStore("auto")}
                    className={`rounded px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                      saveMode === "auto"
                        ? "bg-bg-base text-fg-primary shadow-sm"
                        : "text-fg-tertiary hover:text-fg-secondary"
                    }`}
                  >
                    Auto-save
                  </button>
                  <button
                    type="button"
                    onClick={() => setSaveModeAndStore("manual")}
                    className={`rounded px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                      saveMode === "manual"
                        ? "bg-bg-base text-fg-primary shadow-sm"
                        : "text-fg-tertiary hover:text-fg-secondary"
                    }`}
                  >
                    Save manually
                  </button>
                </fieldset>
                <span
                  className="min-h-[1.25rem] min-w-[10rem] font-mono text-[10px] uppercase tracking-[0.1em] text-fg-tertiary"
                  aria-live="polite"
                >
                  {globalSaveLabel ? (
                    <span
                      className={
                        globalSave === "error" ? "text-accent" : undefined
                      }
                    >
                      {globalSaveLabel}
                    </span>
                  ) : (
                    <span className="invisible" aria-hidden>
                      —
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>
          {passwordConfigured && (
            <button
              type="button"
              onClick={signOut}
              className="rounded-md border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-tertiary transition-colors hover:border-border-strong hover:text-fg-secondary"
            >
              Sign out
            </button>
          )}
        </header>

        {persistence === "none" && (
          <p className="mb-6 rounded-md border border-border bg-bg-subtle px-4 py-3 text-[13px] leading-[1.55] text-fg-secondary">
            Notes cannot be saved on this deployment yet. In Vercel, create a{" "}
            <strong className="font-medium text-fg-primary">Blob store</strong>{" "}
            (Storage → Blob) so{" "}
            <code className="font-mono text-[12px]">BLOB_READ_WRITE_TOKEN</code>{" "}
            is available in production.
          </p>
        )}

        {persistence === "local" && (
          <p className="mb-6 rounded-md border border-border bg-bg-subtle px-4 py-3 text-[13px] leading-[1.55] text-fg-secondary">
            Notes are saved to{" "}
            <code className="font-mono text-[12px]">data/pitch-hub-notes.json</code>{" "}
            on this machine. Add Vercel Blob in production to sync across
            devices.
          </p>
        )}

        {loadError && (
          <p className="mb-6 text-[13px] text-accent" role="alert">
            {loadError}
          </p>
        )}

        <section className="space-y-5">
          {PITCH_DECKS.map((deck) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              origin={origin}
              notes={loading ? "" : (notesByDeck[deck.id] ?? "")}
              onNotesChange={onNotesChange}
              onNotesBlur={onNotesBlur}
              notesReadOnly={persistence === "none"}
              saveMode={saveMode}
              isDirty={Boolean(dirtyDecks[deck.id])}
              onSaveNow={onSaveNow}
              isSaving={savingDeckId === deck.id}
            />
          ))}
        </section>

        <p className="mt-10 font-mono text-[11px] leading-[1.6] text-fg-tertiary">
          Add deck versions in{" "}
          <code className="text-fg-secondary">app/pitch/pitch-registry.ts</code>
          . Each locale needs routes under{" "}
          <code className="text-fg-secondary">app/…/page.tsx</code> and{" "}
          <code className="text-fg-secondary">app/…/pdf/page.tsx</code>. Hub
          lives at{" "}
          <code className="text-fg-secondary">app/hub/page.tsx</code> (
          <code className="text-fg-secondary">/hub</code>).
        </p>
      </div>
    </main>
  );
}
