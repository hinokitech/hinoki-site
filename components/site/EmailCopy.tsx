"use client";

import { useState } from "react";

export function EmailCopy({ email }: { email: string | null }) {
  const [copied, setCopied] = useState(false);

  // Placeholder until Sal provides the address.
  if (!email) {
    return <span className="text-[16px] text-faint">[Email to come]</span>;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(email!);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the address is still visible and selectable.
    }
  }

  return (
    <span className="flex flex-wrap items-center gap-4">
      <a href={`mailto:${email}`} className="text-[16px] text-ink underline-offset-4 hover:underline">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="rounded-[2px] border border-line-strong px-2.5 py-1.5 font-label text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </span>
  );
}
