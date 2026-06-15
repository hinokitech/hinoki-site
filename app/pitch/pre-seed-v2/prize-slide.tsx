import React from "react";
import { Slide, Eyebrow, SlideFooter } from "./slides";
import { MODEL_ASSUMPTIONS_LINE } from "./pitch-micro-label";

const PRIZE_LAYERS = [
  {
    label: "Wedge",
    subtitle: "Grounded today",
    body: (
      <>
        Embedded reflex in industrial grip &amp; slip. 20–30% of annual industrial
        + cobot shipments (~150–200K units/yr) × ¥45,000–¥75,000/unit ($300–500)
        →{" "}
        <span className="font-semibold">¥7–15B/yr royalty</span>.
      </>
    ),
    note: "On robots shipping today. No humanoids required.",
  },
  {
    label: "Platform",
    subtitle: "Same architecture",
    body: (
      <>
        The identical reflex core extends to balance, locomotion, impact safety,
        force control — across cobots, AMRs, quadrupeds, service robots. Each a
        new royalty stream from the same IP, near-zero incremental cost.
      </>
    ),
    note: "Multiplies the base across a $170B serviceable market.",
  },
  {
    label: "Humanoids",
    subtitle: "The call option",
    body: (
      <>
        The same primitive at humanoid scale. As humanoids reach volume next
        decade, unit count rises an order of magnitude.
      </>
    ),
    note: "Upside, not basis. $165B by 2034.",
  },
] as const;

function PrizeLayerBlock({
  label,
  subtitle,
  body,
  note,
}: {
  label: string;
  subtitle: string;
  body: React.ReactNode;
  note: string;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center border-b border-border py-5">
      <div className="grid grid-cols-[minmax(0,320px)_minmax(0,1fr)_minmax(0,240px)] items-start gap-x-10">
        <div>
          <div className="font-mono text-[15px] uppercase tracking-[0.14em] text-accent">
            {label}
          </div>
          <div className="mt-2 text-[20px] font-semibold leading-[1.35] text-fg-primary">
            {subtitle}
          </div>
        </div>
        <p className="text-[22px] font-normal leading-[1.55] text-fg-primary">
          {body}
        </p>
        <p className="text-[18px] leading-[1.45] text-fg-caption">{note}</p>
      </div>
    </div>
  );
}

export function PrizeSlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0">
          <Eyebrow className="mb-5">The Prize</Eyebrow>
          <h2 className="max-w-[1640px] text-[64px] font-light leading-[1.05] tracking-[-0.022em] text-fg-primary">
            Why this is a billion-dollar company.
          </h2>
          <p className="mt-3 max-w-[1640px] text-[24px] font-normal leading-[1.45] text-fg-secondary">
            The wedge alone gets there. The platform and humanoids are the upside.
          </p>
        </div>

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          {PRIZE_LAYERS.map((layer) => (
            <PrizeLayerBlock key={layer.label} {...layer} />
          ))}
        </div>

        <div className="mt-auto shrink-0 pt-6 max-w-[1640px]">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-fg-caption">
            The bridge
          </p>
          <p className="mt-4 text-[30px] font-semibold leading-[1.38] tracking-[-0.018em] text-fg-primary">
            Royalty revenue carries ~90% margins, and IP licensing trades at high
            multiples.{" "}
            <span className="font-mono">¥7–15B</span> royalty (~$50–100M) → a
            billion-dollar valuation. The wedge alone clears that bar — on
            industrial robots shipping today.
          </p>
        </div>

        <p className="mt-4 max-w-[1640px] shrink-0 text-[17px] leading-[1.45] text-fg-caption">
          {MODEL_ASSUMPTIONS_LINE}
        </p>

        <p className="mt-2 max-w-[1640px] shrink-0 text-[17px] leading-[1.45] text-fg-caption">
          Illustrative / at maturity. Adoption share is the assumption; switching
          cost once embedded in partner silicon and line blueprints is the moat
          (see Business Model).
        </p>
      </div>

      <SlideFooter pageLabel="Appendix 4 · The Prize" />
    </Slide>
  );
}
