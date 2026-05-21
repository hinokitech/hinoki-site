import type { Metadata } from "next";
import PitchDeck1stRoundJp from "./PitchDeck1stRoundJp";

export const metadata: Metadata = {
  title: "Hinoki — 1stRound 申請資料",
  description:
    "Arcは、ロボットシステムのための物理知能レイヤー。非希薄化検証資金申請向け17スライド資料。",
  alternates: {
    languages: {
      en: "/pitch/1stround",
      ja: "/pitch/1stround-jp",
    },
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Hinoki — 1stRound 申請資料",
    description:
      "Arcは、ロボットシステムのための物理知能レイヤー。触覚スリップ検知と高速グリッパー応答を最初の検証ベンチマークとする。",
    locale: "ja_JP",
  },
};

export default function Pitch1stRoundJpPage() {
  return <PitchDeck1stRoundJp />;
}
