import Image from "next/image";
import type { SiteCopy } from "@/content/site.en";

export function Header({ nav }: { nav: SiteCopy["nav"] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground/85 backdrop-blur-md">
      <div className="site-container flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/assets/logo-hinoki-tree.png"
            alt=""
            width={28}
            height={28}
            loading="eager"
            className="size-7"
          />
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
            Hinoki Technologies
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-label text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="btn btn-primary h-10 px-4">
          {nav.cta}
        </a>
      </div>
    </header>
  );
}
