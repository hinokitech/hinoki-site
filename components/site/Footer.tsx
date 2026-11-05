import Link from "next/link";
import type { SiteCopy } from "@/content/site.en";
import { FooterLogo } from "./Logo";

// The live site's footer: lockup on the left, then a hairline and the small
// print, which ends "Backed by" and Antler's own logo.
export function Footer({ nav, small }: { nav: SiteCopy["nav"]; small: SiteCopy["footer"] }) {
  const links = nav.links;

  return (
    <footer className="border-t border-line px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="self-start">
          <FooterLogo />
        </Link>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13px] text-fg-tertiary transition-colors duration-300 hover:text-fg-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-[1400px] border-t border-line pt-6 text-[11px] text-fg-tertiary">
        {/* One line from sm up; on phones "Backed by" and the logo take their
            own line, without a dangling separator. */}
        {small.text}
        <span aria-hidden className="max-sm:hidden"> · </span>
        <span className="inline-flex items-center gap-1.5 align-middle max-sm:mt-2 max-sm:flex">
          {small.backedBy}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/antler-wordmark.png"
            alt="Antler"
            width={458}
            height={110}
            loading="lazy"
            decoding="async"
            className="h-4 w-auto opacity-90"
          />
        </span>
      </div>
    </footer>
  );
}
