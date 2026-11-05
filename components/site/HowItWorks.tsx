import type { CSSProperties } from "react";
import type { SiteCopy } from "@/content/site.en";
import { cn } from "@/lib/utils";
import { Chapter, ChapterLabel, ChapterTitle, delay } from "./Chapter";
import { Reveal } from "./Reveal";

// "45 ms" -> ["45", "ms"], so the unit can be set small, as in the Proof stats.
function splitUnit(value: string) {
  const at = value.lastIndexOf(" ");
  return at > 0 ? [value.slice(0, at), value.slice(at + 1)] : [value, ""];
}

// The bars load up one after the other as the chart scrolls into view (Sal,
// 2026-11-05: calm, elegant, staggered). A bar fills in time with its value,
// never quicker than SHORT, so the 45 ms bar takes its time and Hinoki's
// sliver lands almost at once; the next bar starts as the last one settles,
// and each figure fades in as its bar arrives. Milliseconds; the motion
// itself is in globals.css (.time-bar).
const FIRST_AT = 400, LONG = 2000, SHORT = 650, BREATH = 300;
function timeline(values: number[], max: number) {
  let at = FIRST_AT;
  return values.map((v) => {
    const grow = Math.max(SHORT, LONG * (v / max));
    const t = { at, grow, show: at + grow * 0.75 };
    at += grow * 0.85 + BREATH;
    return t;
  });
}

// The section the nav calls "What we build" (it keeps the #how anchor).
export function HowItWorks({ copy }: { copy: SiteCopy["how"] }) {
  const { bars, caption } = copy.chart;
  const max = Math.max(...bars.map((b) => b.ms));
  const times = timeline(
    bars.map((b) => b.ms),
    max,
  );

  return (
    <Chapter id="how">
      <Reveal>
        <ChapterLabel index="02" label={copy.label} className="reveal" />
        <ChapterTitle id="how" className="reveal max-w-[900px]">
          {copy.heading}
        </ChapterTitle>
      </Reveal>

      {/* Pipeline against pipeline on one scale: each row is a hairline for
          the full 0 to 45 ms, with a thin bar on it that starts square at zero
          and ends rounded at its value. The last bar is Hinoki's, in accent
          with a soft glow; at this scale it is a sliver, so it keeps a minimum
          length. The figures are set like the Proof stats: light, small unit. */}
      <Reveal className="mt-14 md:mt-16">
        <figure className="reveal">
          <div className="flex flex-col gap-9 md:gap-10">
            {bars.map((bar, i) => {
              const ours = i === bars.length - 1;
              const [figure, unit] = splitUnit(bar.value);
              const t = times[i];
              return (
                <div key={bar.label}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[14px] leading-[1.4] text-fg-secondary md:text-[15px]">{bar.label}</p>
                    <p
                      className={cn(
                        "time-value shrink-0 font-mono text-[clamp(1.5rem,2.6vw,2.125rem)] font-light leading-none tracking-[-0.03em]",
                        ours ? "text-accent" : "text-fg-primary",
                      )}
                      style={{ "--show": `${Math.round(t.show)}ms` } as CSSProperties}
                    >
                      {figure}
                      {unit ? <span className="ml-1.5 text-[13px] tracking-normal text-fg-secondary">{unit}</span> : null}
                    </p>
                  </div>
                  <div aria-hidden className="relative mt-4 h-1">
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-edge" />
                    <span
                      className={cn(
                        "time-bar absolute inset-y-0 left-0 rounded-r-full",
                        ours ? "time-bar-ours bg-accent" : "bg-fg-secondary/60",
                      )}
                      style={
                        {
                          "--w": `${(bar.ms / max) * 100}%`,
                          "--at": `${Math.round(t.at)}ms`,
                          "--grow": `${Math.round(t.grow)}ms`,
                        } as CSSProperties
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <figcaption className="mt-7 max-w-[720px] text-pretty text-[13px] leading-[1.6] text-fg-tertiary">
            {caption}
          </figcaption>
        </figure>
      </Reveal>

      <Reveal className="mt-12 md:mt-14">
        <p className="reveal max-w-[780px] text-pretty text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-[1.7] text-fg-secondary">
          <strong className="font-medium text-fg-primary">{copy.definition.term}</strong> {copy.definition.text}
        </p>
      </Reveal>

      {/* The four stages hang off one hairline, an orange node per stage, like
          the live site's roadmap turned on its side. */}
      <Reveal className="mt-16 md:mt-20">
        <ol className="grid md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:gap-x-0">
          {copy.steps.map((step, i) => (
            <li
              key={step.step}
              className="reveal relative border-t border-edge pb-12 pt-10 lg:pb-0 lg:pr-10"
              style={delay(i * 120)}
            >
              {/* Hollow nodes for the stages, a filled one for the answer. */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-0 size-2.5 -translate-y-1/2 rounded-full border border-accent",
                  i === copy.steps.length - 1 ? "bg-accent shadow-[0_0_14px_rgb(232_98_42/0.7)]" : "bg-ground",
                )}
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{step.step}</p>
              <h3 className="mt-5 text-[20px] font-medium tracking-[-0.02em] text-fg-primary md:text-[22px]">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-fg-secondary">{step.text}</p>
            </li>
          ))}
        </ol>
        <p
          className="reveal mt-4 flex max-w-[720px] gap-4 text-[14px] leading-[1.7] text-fg-tertiary md:mt-16"
          style={delay(480)}
        >
          <span aria-hidden className="mt-[0.8em] h-px w-5 shrink-0 bg-accent" />
          {copy.note}
        </p>
      </Reveal>
    </Chapter>
  );
}
