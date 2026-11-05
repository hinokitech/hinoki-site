import { Noto_Sans_JP } from "next/font/google";

// Noto Sans JP for the decks, so their Japanese renders in a tone that matches
// DM Sans (Latin stays on DM Sans, first in the stack). It used to load for the
// whole site from the root layout; it lives here so the public pages don't
// carry its CSS. The wrapper takes no space (display: contents) and only
// re-points the font stack, so deck layouts are untouched.
const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function PitchLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${notoSansJp.variable} pitch-fonts contents`}>{children}</div>;
}
