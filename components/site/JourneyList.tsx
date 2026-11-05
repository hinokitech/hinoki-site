import { Badge } from "@/components/ui/badge";
import { JOURNEY, isPlanned, whenLabel, type JourneyTag, type Milestone } from "@/content/journey";
import { cn } from "@/lib/utils";
import { delay, STEP } from "./Chapter";

const CHIP: Record<JourneyTag, "real" | "simulation" | "live" | "status"> = {
  MEASURED: "real",
  "REAL CAPTURE": "real",
  SIMULATION: "simulation",
  NOW: "live",
  NEXT: "status",
};

type Row = { kind: "year"; year: string } | { kind: "milestone"; m: Milestone; index: number };

// Milestones in order, with a year heading wherever the year changes.
function rows(): Row[] {
  const out: Row[] = [];
  JOURNEY.forEach((m, index) => {
    const year = m.when.slice(0, 4);
    if (index === 0 || JOURNEY[index - 1].when.slice(0, 4) !== year) out.push({ kind: "year", year });
    out.push({ kind: "milestone", m, index });
  });
  return out;
}

// One stretch of the timeline's spine: solid between done milestones, dashed
// on the way to a plan.
function Spine({ dashed, className }: { dashed: boolean; className: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute left-1/2 w-0 -translate-x-1/2 border-l",
        dashed ? "border-dashed border-edge-strong" : "border-edge-strong",
        className,
      )}
    />
  );
}

// The full chronology, styled after the reference timeline: date on the
// left, a diamond on the spine, then the milestone, what it meant and its label.
export function JourneyList() {
  const all = rows();
  const last = JOURNEY.length - 1;

  return (
    <ol className="mt-16 md:mt-20">
      {all.map((row, r) => {
        // The spine stretch leading into this row continues from the
        // milestone before it; it is dashed when it leads to a plan.
        const next = all.slice(r).find((x) => x.kind === "milestone");
        const before = all.slice(0, r).some((x) => x.kind === "milestone");
        const leadDashed = next?.kind === "milestone" && isPlanned(next.m);

        if (row.kind === "year") {
          return (
            <li
              key={`y${row.year}`}
              aria-hidden
              className="reveal grid grid-cols-[24px_minmax(0,1fr)] gap-x-5 lg:grid-cols-[240px_24px_minmax(0,1fr)] lg:gap-x-12"
            >
              <span className="hidden lg:block" />
              <span className="relative">{before ? <Spine dashed={leadDashed} className="inset-y-0" /> : null}</span>
              <p className="pb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{row.year}</p>
            </li>
          );
        }

        const { m, index } = row;
        const planned = isPlanned(m);
        const now = m.tag === "NOW";
        const nextDashed = index < last && isPlanned(JOURNEY[index + 1]);

        return (
          <li
            key={`${m.when}-${index}`}
            className="reveal grid grid-cols-[24px_minmax(0,1fr)] gap-x-5 lg:grid-cols-[240px_24px_minmax(0,1fr)] lg:gap-x-12"
            style={delay(Math.min(index, 6) * (STEP / 2))}
          >
            <p
              className={cn(
                "hidden pt-[7px] text-right font-mono text-[12px] uppercase tracking-[0.18em] lg:block",
                now ? "text-accent" : "text-fg-tertiary",
              )}
            >
              {whenLabel(m.when)}
            </p>

            <span className="relative">
              {before ? <Spine dashed={leadDashed} className="top-0 h-[13px]" /> : null}
              {index < last ? <Spine dashed={nextDashed} className="bottom-0 top-[13px]" /> : null}
              <span
                aria-hidden
                className={cn(
                  "absolute left-1/2 top-[13px] size-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 border",
                  planned ? "border-accent/70 bg-ground" : "border-accent bg-accent",
                )}
              />
              {now ? (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[13px] size-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 animate-ping bg-accent/60 motion-reduce:animate-none"
                />
              ) : null}
            </span>

            <div className="pb-12">
              <p
                className={cn(
                  "mb-1.5 font-mono text-[11px] uppercase tracking-[0.18em] lg:hidden",
                  now ? "text-accent" : "text-fg-tertiary",
                )}
              >
                {whenLabel(m.when)}
              </p>
              <h3 className="text-pretty text-[19px] font-medium leading-[1.35] tracking-[-0.015em] text-fg-primary md:text-[21px]">
                {m.title}
              </h3>
              {m.detail ? (
                <p className="mt-2 max-w-[64ch] text-pretty text-[15px] leading-[1.65] text-fg-secondary">{m.detail}</p>
              ) : null}
              {m.tag ? (
                <Badge variant={CHIP[m.tag]} className="mt-4">
                  {now ? (
                    <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
                  ) : null}
                  {m.tag}
                </Badge>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
