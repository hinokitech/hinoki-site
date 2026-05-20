"use client";

import { useState } from "react";

export default function PitchHubLogin({
  passwordRequired,
}: {
  passwordRequired: boolean;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/pitch-hub/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Could not sign in.");
        return;
      }
      window.location.reload();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg-base px-5 py-16">
      <div className="w-full max-w-[420px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          Hinoki · Pitch hub
        </p>
        <h1 className="mt-3 text-[32px] font-light tracking-[-0.02em] text-fg-primary">
          Sign in
        </h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-fg-secondary">
          Private index of investor decks. Share individual deck links with
          recipients — not this page.
        </p>

        {!passwordRequired && (
          <p className="mt-6 rounded-md border border-border bg-bg-subtle px-4 py-3 text-[13px] leading-[1.55] text-fg-secondary">
            No <code className="font-mono text-[12px]">PITCH_HUB_PASSWORD</code>{" "}
            is set. Hub is open in development only. Set a password before
            deploying.
          </p>
        )}

        {passwordRequired && (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-fg-tertiary">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-border bg-bg-subtle px-3 py-2.5 text-[15px] text-fg-primary outline-none transition-colors focus:border-accent"
              />
            </label>
            {error && (
              <p className="text-[13px] text-accent" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-accent px-4 py-2.5 text-[14px] font-medium text-fg-inverse transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Enter hub"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
