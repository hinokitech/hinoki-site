import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Mono, DM_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

// Noto Sans JP is loaded as a fallback so Japanese characters across the site
// (and the /pitch-jp deck) render in a tone that matches DM Sans. Latin glyphs
// stay on DM Sans because it appears first in the --font-sans stack; the
// browser falls through to Noto for CJK code points.
const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hinokitech.com";

const SITE_TITLE = "Hinoki — Reaction intelligence for robotics";
const SITE_DESCRIPTION =
  "Arc by Hinoki is the architecture layer that gives robots reaction intelligence. Sub-millisecond, adaptive, zero inference.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Hinoki",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Hinoki",
  keywords: [
    "reaction intelligence",
    "robotics",
    "reflex control",
    "humanoid robotics",
    "industrial robotics",
    "defense robotics",
    "Hinoki",
    "Arc",
  ],
  authors: [{ name: "Hinoki Technologies" }],
  creator: "Hinoki Technologies",
  publisher: "Hinoki Technologies",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Hinoki",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
