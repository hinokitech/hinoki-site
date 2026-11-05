import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Mono, DM_Sans } from "next/font/google";
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

// Noto Sans JP now loads in app/pitch/layout.tsx, for the decks that use it.
// Japanese web fonts come in about 120 character slices per weight, so here
// it added roughly 150 KB of render-blocking CSS to every page, while the site
// itself has only a four-character label in Japanese (system fonts cover it).

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hinokitech.com";

// Homepage defaults, from the approved copy (build brief Appendix A).
const SITE_TITLE = "Hinoki Technologies | Fast vision for forklifts and mobile robots";
const SITE_DESCRIPTION =
  "Hinoki turns fast motion into real-time answers for machines, at the edge.";
const OG_IMAGE_ALT = "Hinoki Technologies | Fast vision for forklifts and mobile robots";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Hinoki Technologies",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Hinoki Technologies",
  keywords: [
    "Hinoki Technologies",
    "event-based vision",
    "event camera",
    "edge AI",
    "FPGA",
    "autonomous forklifts",
    "mobile robots",
    "Tsukuba",
  ],
  authors: [{ name: "Hinoki Technologies" }],
  creator: "Hinoki Technologies",
  publisher: "Hinoki Technologies",
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=2", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Hinoki Technologies",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image"],
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

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
