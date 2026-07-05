import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Investor Deck",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

/** Retired — frozen English pre-seed deck is no longer served at `/pitch`. */
export default function PitchPage() {
  notFound();
}
