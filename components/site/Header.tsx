import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import type { SiteCopy } from "@/content/site.en";

export function Header({ nav }: { nav: SiteCopy["nav"] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ground/80 backdrop-blur-xl">
      <div className="site-container flex h-16 items-center justify-between gap-6">
        <a href="#top" className="group flex items-center gap-3">
          <Image
            src="/assets/logo-hinoki-tree.png"
            alt=""
            width={28}
            height={28}
            loading="eager"
            className="size-7 transition-[rotate] duration-500 ease-out group-hover:rotate-[8deg] motion-reduce:transition-none"
          />
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
            Hinoki Technologies
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block font-label text-[11px] uppercase tracking-[0.14em] text-muted transition-[color,translate] duration-200 ease-out hover:translate-x-0.5 hover:text-ink motion-reduce:transition-none motion-reduce:hover:translate-x-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className={buttonVariants({ size: "sm" })}>
          {nav.cta}
        </a>
      </div>
    </header>
  );
}
