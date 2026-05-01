import type { Metadata } from "next";
import PitchDeckJp from "./PitchDeckJp";

export const metadata: Metadata = {
  title: "投資家向け資料 — Hinoki",
  description:
    "Hinoki の Arc は、ロボットにフィジカルインテリジェンスを与えるアーキテクチャ層です。サブミリ秒、適応的、ゼロ推論。ハードウェア検証進行中。",
  alternates: {
    languages: {
      en: "/pitch",
      ja: "/pitch-jp",
    },
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "投資家向け資料 — Hinoki",
    description:
      "Hinoki の Arc は、ロボットにフィジカルインテリジェンスを与えるアーキテクチャ層です。",
    locale: "ja_JP",
  },
};

export default function PitchJpPage() {
  return <PitchDeckJp />;
}
