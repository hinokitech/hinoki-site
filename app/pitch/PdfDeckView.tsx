const SLIDE_W = 1920;
const SLIDE_H = 1080;

export type PdfDeckViewProps = {
  slides: Array<() => React.JSX.Element>;
  ariaLabel: string;
  slideAriaLabel: (index: number, total: number) => string;
};

export default function PdfDeckView({
  slides,
  ariaLabel,
  slideAriaLabel,
}: PdfDeckViewProps) {
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
