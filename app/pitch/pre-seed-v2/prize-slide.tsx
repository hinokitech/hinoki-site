import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";
import { MODEL_ASSUMPTIONS_LINE } from "./pitch-micro-label";

const PRIZE_LAYERS = [
  {
    header: "Wedge · grounded today",
    body: (
      <>
        Embedded reflex in industrial grip &amp; slip. 20–30% of annual industrial
        + cobot shipments (~150–200K units/yr) × ¥45,000–¥75,000/unit ($300–500)
        →{" "}
        <span className="font-semibold text-accent">¥7–15B/yr royalty</span>.
      </>
    ),
    note: "On robots shipping today. No humanoids required.",
    accentClass: "border-accent/70 bg-accent-subtle/35",
    headerClass: "text-[22px] font-semibold text-fg-primary",
    bodyClass:
      "text-[20px] font-normal leading-[1.45] tracking-[-0.01em] text-fg-primary",
    step: 0 as const,
  },
  {
    header: "Platform · same architecture",
    body: (
      <>
        The identical reflex core extends to balance, locomotion, impact safety,
        force control — across cobots, AMRs, quadrupeds, service robots. Each a
        new royalty stream from the same IP, near-zero incremental cost.
      </>
    ),
    note: "Multiplies the base across a $170B serviceable market.",
    accentClass: "border-accent/45 bg-fg-primary/[0.02]",
    headerClass: "text-[22px] font-normal text-fg-primary",
    bodyClass:
      "text-[20px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary",
    step: 1 as const,
  },
  {
    header: "Humanoids · the call option",
    body: (
      <>
        The same primitive at humanoid scale. As humanoids reach volume next
        decade, unit count rises an order of magnitude.
      </>
    ),
    note: "Upside, not basis. $165B by 2034.",
    accentClass: "border-accent/25 bg-transparent",
    headerClass: "text-[22px] font-light text-fg-secondary",
    bodyClass:
      "text-[20px] font-light leading-[1.45] tracking-[-0.01em] text-fg-secondary/90",
    step: 2 as const,
  },
] as const;

function PrizeLayerRow({
  header,
  body,
  note,
  accentClass,
  headerClass,
  bodyClass,
}: {
  header: string;
  body: React.ReactNode;
  note: string;
  accentClass: string;
  headerClass: string;
  bodyClass: string;
  step: 0 | 1 | 2;
}) {
  return (
    <div
      className={`grid grid-cols-[22%_58%_20%] items-start gap-x-12 border-l-2 py-4 pl-6 ${accentClass}`}
    >
      <p className={`font-mono uppercase tracking-[0.12em] ${headerClass}`}>
        {header}
      </p>
      <p className={bodyClass}>{body}</p>
      <p className="text-[17px] leading-[1.45] text-fg-caption">{note}</p>
    </div>
  );
}

export function PrizeSlide() {
  return (
    <Slide align="start">
      <Eyebrow>The Prize</Eyebrow>
      <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
        Why this is a billion-dollar company.
      </h2>
      <p className="mt-5 max-w-[1320px] text-[28px] font-light leading-[1.45] tracking-[-0.015em] text-fg-secondary">
        The wedge alone gets there. The platform and humanoids are the upside.
      </p>

      <div className="mt-10 flex min-h-0 flex-1 max-w-[1640px] flex-col justify-center gap-6">
        {PRIZE_LAYERS.map((layer) => (
          <PrizeLayerRow key={layer.header} {...layer} />
        ))}
      </div>

      <div className="mt-10 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-10 py-7">
        <p className="text-[24px] font-light leading-[1.45] tracking-[-0.015em] text-fg-primary">
          <span className="font-semibold text-accent">The bridge:</span> Royalty
          revenue carries ~90% margins, and IP licensing trades at high
          multiples.{" "}
          <span className="font-semibold text-accent">
            ¥7–15B royalty (~$50–100M)
          </span>{" "}
          → a billion-dollar valuation.{" "}
          <span className="font-semibold text-accent">
            The wedge alone clears that bar — on industrial robots shipping
            today.
          </span>
        </p>
      </div>

      <p className="mt-3 max-w-[1640px] shrink-0 text-[17px] leading-[1.45] text-fg-caption">
        {MODEL_ASSUMPTIONS_LINE}
      </p>

      <p className="mt-4 max-w-[1640px] shrink-0 text-[17px] leading-[1.45] text-fg-caption">
        Illustrative / at maturity. Adoption share is the assumption; switching
        cost once embedded in partner silicon and line blueprints is the moat
        (see Business Model).
      </p>

      <SlideFooter pageLabel="21 · The Prize" />
    </Slide>
  );
}
