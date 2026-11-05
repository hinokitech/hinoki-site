// The lockup comes pre-sized for each height it is shown at (CSS px) and each
// pixel density, and is served as-is: letting next/image resize and re-encode
// a logo this small makes it look soft on standard screens. One file set per
// theme: off-white lettering on dark, charcoal on light.
const THEMES = [
  { file: "logo-hinoki-lockup-on-dark", className: "light:hidden" },
  { file: "logo-hinoki-lockup", className: "hidden light:block" },
];

export function logoSrcSet(file: string) {
  return [1, 2, 3].map((d) => `/assets/${file}-${d}x.png ${d}x`).join(", ");
}

// Header: 40 px tall on phones, 44 px from md up.
export function HeaderLogo() {
  return THEMES.map(({ file, className }) => (
    <picture key={file} className={className}>
      <source media="(min-width: 768px)" srcSet={logoSrcSet(`${file}-44`)} width={145} height={44} />
      <img
        src={`/assets/${file}-40-2x.png`}
        srcSet={logoSrcSet(`${file}-40`)}
        alt="Hinoki Technologies"
        width={131}
        height={40}
        className="h-10 w-auto md:h-11"
      />
    </picture>
  ));
}

// Footer: 40 px tall.
export function FooterLogo() {
  return THEMES.map(({ file, className }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={file}
      src={`/assets/${file}-40-2x.png`}
      srcSet={logoSrcSet(`${file}-40`)}
      alt="Hinoki Technologies"
      width={131}
      height={40}
      className={`h-10 w-auto ${className}`}
    />
  ));
}
