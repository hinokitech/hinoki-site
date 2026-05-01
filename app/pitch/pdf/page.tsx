import type { Metadata } from "next";
import { SLIDES } from "../slides";

export const metadata: Metadata = {
  title: "Hinoki — Deck (PDF export)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const SLIDE_W = 1920;
const SLIDE_H = 1080;

/**
 * Print-friendly view of the entire deck.
 *
 * Stacks every slide vertically on screen for visual confirmation, and uses
 * print CSS to break each slide onto its own page at exact 1920x1080. Open
 * this route, then `Ctrl/Cmd + P` -> "Save as PDF" with:
 *   - Paper size: 1920x1080 (Custom) or any 16:9 preset
 *   - Margins: None
 *   - Background graphics: ON
 *   - Scale: 100% / Default
 */
export default function PdfDeckPage() {
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
          background: #f7f4ef;
        }
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
          background: #f7f4ef;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
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
      <main className="pdf-deck" aria-label="Hinoki investor deck — printable">
        {SLIDES.map((Slide, i) => (
          <section
            key={i}
            className="pdf-slide"
            aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
          >
            <Slide />
          </section>
        ))}
      </main>
    </>
  );
}
