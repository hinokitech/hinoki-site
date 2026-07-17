import React from "react";
import { Slide, SlideFooter, DeckSlideHeader } from "./slides";
import { XelaLogo, PartnerLogoPad } from "./xela-logo";

const DISCOVERY_QUOTES = [
  {
    logoSrc: "/assets/partners/accenture.svg",
    logoAlt: "Accenture",
    logoClassName:
      "mb-3 block h-auto w-auto max-h-8 max-w-[160px] object-contain object-left",
    subtitle: "Technical Lead · AI & Robotics",
    quote: "Latency matters at the physical edge.",
  },
  {
    logoSrc: "/assets/partners/rapyuta-robotics.png?v=3",
    logoAlt: "Rapyuta Robotics",
    logoClassName:
      "mb-3 block h-auto w-auto max-h-14 max-w-[280px] object-contain object-left",
    subtitle: "Field Application Engineer",
    quote: "Slip shows up before the control loop reacts.",
  },
  {
    logoSrc: "/assets/partners/xela-robotics.png",
    logoAlt: "XELA Robotics",
    logoClassName:
      "mb-3 block h-auto w-auto max-h-8 max-w-[160px] object-contain object-left",
    subtitle: "CEO",
    quote: "Our sensors are state of the art, but drops still happen.",
  },
] as const;

function DiscoveryQuoteBlock({
  logoSrc,
  logoAlt,
  logoClassName,
  subtitle,
  quote,
}: {
  logoSrc: string;
  logoAlt: string;
  logoClassName: string;
  subtitle: string;
  quote: string;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center border-b border-border py-5">
      <div className="grid grid-cols-[minmax(0,320px)_1fr] items-start gap-x-10">
        <div className="min-w-0 overflow-visible">
          {logoSrc.includes("xela-robotics") ? (
            <XelaLogo
              className="mb-3"
              imgClassName="h-8 w-auto max-w-[160px] object-contain object-left"
            />
          ) : logoSrc.includes("accenture") ? (
            <PartnerLogoPad
              src={logoSrc}
              className="mb-3"
              imgClassName="h-8 w-auto max-w-[160px] object-contain object-left"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={logoSrc}
              alt=""
              className={logoClassName}
              aria-hidden
            />
          )}
          <div className="text-[20px] font-semibold leading-[1.35] text-fg-primary">
            {subtitle}
          </div>
        </div>
        <p className="text-[22px] font-normal leading-[1.55] text-fg-primary">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

export function DiscoverySlide() {
  return (
    <Slide align="start" dense>
      <div className="flex min-h-0 flex-1 flex-col">
        <DeckSlideHeader
          eyebrow="Discovery"
          wide
          title="What engineers are telling us so far."
          subtitle="Discovery is narrowing Arc to one first measurable control loop."
        />

        <div className="mt-6 flex min-h-0 max-w-[1640px] flex-1 flex-col">
          {DISCOVERY_QUOTES.map((item) => (
            <DiscoveryQuoteBlock key={item.logoAlt} {...item} />
          ))}
        </div>
      </div>

      <SlideFooter pageLabel="Appendix 3 · Discovery" />
    </Slide>
  );
}
