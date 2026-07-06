const SLIDE_W = 1920;
const SLIDE_H = 1080;

const PDF_THEMES = {
  light: {
    pageBg: "#f7f4ef",
    shadow: "0 4px 18px rgba(0, 0, 0, 0.06)",
  },
  dark: {
    pageBg: "#1e2124",
    shadow: "0 4px 18px rgba(0, 0, 0, 0.35)",
  },
} as const;

export type PdfDeckViewProps = {
  slides: Array<() => React.JSX.Element>;
  ariaLabel: string;
  slideAriaLabel: (index: number, total: number) => string;
  /** Match interactive deck surface — Sony Innovation uses dark. */
  theme?: keyof typeof PDF_THEMES;
};

export default function PdfDeckView({
  slides,
  ariaLabel,
  slideAriaLabel,
  theme = "light",
}: PdfDeckViewProps) {
  const { pageBg, shadow } = PDF_THEMES[theme];
  const lightTokenScope =
    theme === "light"
      ? `
        .pdf-deck {
          --color-bg-base: #f7f4ef;
          --color-bg-subtle: #ede9e3;
          --color-bg-recessed: #e6e1d9;
          --color-bg-inverse: #1e2124;
          --color-fg-primary: #252830;
          --color-fg-secondary: #5a5e6b;
          --color-fg-tertiary: #9099a8;
          --color-fg-caption: #78808f;
          --color-fg-inverse: #f4f1ed;
          --color-border: #d8d3cb;
          --color-border-strong: #b8b2a8;
          --color-accent-subtle: #f5e0d5;
          --color-data-bar: #7b8fab;
        }
      `
      : "";

  return (
    <>
      <style>{`
        @page {
          size: ${SLIDE_W}px ${SLIDE_H}px;
          margin: 0;
        }
        html, body {
          margin: 0;
          padding: 0;
          background: ${pageBg};
          color-scheme: ${theme === "dark" ? "dark" : "light"};
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        ${lightTokenScope}
        .pdf-deck {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          padding: 24px 0;
        }
        .pdf-slide {
          position: relative;
          overflow: hidden;
          width: ${SLIDE_W}px;
          height: ${SLIDE_H}px;
          background: ${pageBg};
          box-shadow: ${shadow};
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        @media print {
          .pdf-deck {
            gap: 0;
            padding: 0;
          }
          .pdf-slide {
            box-shadow: none;
            page-break-after: always;
            break-after: page;
          }
          .pdf-slide:last-child {
            page-break-after: auto;
            break-after: auto;
          }
        }
      `}</style>
      <main className="pdf-deck" aria-label={ariaLabel}>
        {slides.map((Slide, i) => (
          <section
            key={i}
            className="pdf-slide"
            aria-label={slideAriaLabel(i, slides.length)}
          >
            <Slide />
          </section>
        ))}
      </main>
    </>
  );
}
