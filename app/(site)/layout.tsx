// The homepage wrapper. This version wears the live site's type (DM Sans and
// DM Mono, loaded once in the root layout), so it loads no fonts of its own.

// Runs as the page is parsed, before anything paints, so the theme is right
// from the first frame: the visitor's saved choice, else their device setting.
// Without it (or without scripts) the page stays in its dark default.
const THEME_SCRIPT = `try{var t=localStorage.getItem("hinoki-theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.currentScript.parentElement.setAttribute("data-site-theme",t)}catch(e){}`;

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
