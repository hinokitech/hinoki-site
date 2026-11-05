import { Badge } from "@/components/ui/badge";
import { JOURNEY, isPlanned, whenLabel, type JourneyTag } from "@/content/journey";
import { cn } from "@/lib/utils";
import { delay, STEP } from "./Chapter";

const CHIP: Record<JourneyTag, "real" | "simulation" | "live" | "status"> = {
  MEASURED: "real",
  "REAL CAPTURE": "real",
  SIMULATION: "simulation",
  NOW: "live",
  NEXT: "status",
};

// The full chronology, set like the homepage Progress list: one hairline with
// an orange node per milestone (hollow for a plan, pulsing for now), the date
// in orange mono with its label beside it, then the milestone and what it
// meant. Aligned with the section's text column on wide screens.
export function JourneyTimeline() {
  return (
    <ol className="relative mt-12 max-w-[720px] md:mt-16 lg:ml-[288px]">
      <span aria-hidden className="absolute bottom-7 left-0 top-7 w-px bg-edge md:bottom-8 md:top-8" />
      {JOURNEY.map((m, index) => {
        const planned = isPlanned(m);
        const now = m.tag === "NOW";
        return (
          <li
            key={`${m.when}-${index}`}
            className="reveal relative py-5 pl-8 md:py-6 md:pl-10"
            style={delay(Math.min(index, 6) * (STEP / 2))}
          >
            <span
              aria-hidden
              className={cn(
                "absolute left-0 top-[26px] size-2 -translate-x-1/2 rounded-full md:top-[30px]",
                planned ? "border border-accent/60 bg-ground" : "bg-accent",
              )}
            />
            {now ? (
              <span
                aria-hidden
                className="absolute left-0 top-[26px] size-2 -translate-x-1/2 animate-ping rounded-full bg-accent/70 motion-reduce:animate-none md:top-[30px]"
              />
            ) : null}
            <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              <span className="tabular-nums">{whenLabel(m.when)}</span>
              {m.tag ? (
                <Badge variant={CHIP[m.tag]}>
                  {now ? (
                    <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
                  ) : null}
                  {m.tag}
                </Badge>
              ) : null}
            </p>
            <h3 className="mt-2 text-pretty text-[16px] leading-[1.6] text-fg-primary md:text-[17px]">{m.title}</h3>
            {m.detail ? (
              <p className="mt-1 max-w-[62ch] text-pretty text-[14px] leading-[1.65] text-fg-secondary">{m.detail}</p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
