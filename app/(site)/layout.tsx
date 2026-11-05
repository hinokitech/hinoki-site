// The homepage wrapper. This version wears the live site's type (DM Sans and
// DM Mono, loaded once in the root layout), so it loads no fonts of its own.

// Runs as the page is parsed, before anything paints, so the theme is right
// from the first frame. Every visit opens in the device's light or dark
// setting (Sal, 2026-11-05); a switch made with the header button holds for
// the rest of that visit only (sessionStorage). A choice remembered the old
// way, for good (localStorage), is cleared so it can't override the device.
// Without it (or without scripts) the page stays in its dark default.
const THEME_SCRIPT = `try{localStorage.removeItem("hinoki-theme")}catch(e){}try{var t=sessionStorage.getItem("hinoki-theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.currentScript.parentElement.setAttribute("data-site-theme",t)}catch(e){}`;

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The script sets data-site-theme before React hydrates, hence the warning opt-out.
    <div className="site" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      {children}
    </div>
  );
}
