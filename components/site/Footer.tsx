import Image from "next/image";

export function Footer({ text }: { text: string }) {
  return (
    <footer className="border-t border-line">
      <div className="site-container flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/assets/logo-hinoki-tree.png"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
          <span className="text-[14px] font-semibold tracking-[-0.01em] text-ink">
            Hinoki Technologies
          </span>
        </a>
        <p className="font-label text-[10px] uppercase tracking-[0.16em] text-faint">{text}</p>
      </div>
    </footer>
  );
}
