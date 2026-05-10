import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hinokitech.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/pitch", "/pitch/", "/pitch-jp", "/pitch-jp/", "/reflex"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

