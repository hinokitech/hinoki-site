import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Hinoki — Deck (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

/** Retired — PDF export for the frozen English deck at `/pitch`. */
export default function PitchPdfPage() {
  notFound();
}
