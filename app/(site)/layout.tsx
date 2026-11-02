import { Archivo, Hanken_Grotesk, Martian_Mono } from "next/font/google";

// The homepage's own type system (build brief §2). Loaded here rather than in
// the root layout so the /pitch decks don't download these fonts.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  display: "swap",
});

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${archivo.variable} ${hanken.variable} ${martian.variable} site`}
    >
      {children}
    </div>
  );
}
