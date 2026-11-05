"use client";

import { useState } from "react";

export function EmailCopy({ email, placeholder }: { email: string | null; placeholder: string }) {
  const [copied, setCopied] = useState(false);

  // Shown as-is until Sal provides the address.
  if (!email) {
    return <span className="text-[15px] text-fg-tertiary">{placeholder}</span>;
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
      <a href={`mailto:${email}`} className="text-[16px] text-fg-primary underline-offset-4 hover:underline">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="rounded-full border border-edge px-3.5 py-1.5 text-[12px] font-medium text-fg-secondary transition-colors duration-300 hover:border-accent/40 hover:text-accent"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </span>
  );
}
