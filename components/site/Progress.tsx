import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { SiteCopy } from "@/content/site.en";
import { cn } from "@/lib/utils";
import { Chapter, ChapterLabel, ChapterTitle, delay } from "./Chapter";
import { Reveal } from "./Reveal";

// Set like the live site's Roadmap: centred heading, then one vertical
// hairline with an orange node per milestone.
export function Progress({ copy }: { copy: SiteCopy["progress"] }) {
  return (
    <Chapter id="progress" glow="center" className="film-grain overflow-hidden">
      <Reveal className="flex flex-col items-center text-center">
        <ChapterLabel index="05" label={copy.label} className="reveal justify-center" />
        <ChapterTitle
          id="progress"
          className="reveal mx-auto max-w-[760px] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.035em]"
        >
          {copy.heading.lead} <span className="text-gradient-logo">{copy.heading.accent}</span>
        </ChapterTitle>

        <ol className="relative mx-auto mt-12 w-full max-w-[640px] text-left md:mt-16">
          <span aria-hidden className="absolute bottom-7 left-0 top-7 w-px bg-edge md:bottom-8 md:top-8" />
          {copy.milestones.map((m, i) => {
            const done = m.status === "Done";
            return (
              <li
                key={`${m.date} ${m.text}`}
                className="reveal relative py-5 pl-8 md:py-6 md:pl-10"
                style={delay(i * 100 + 120)}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-[26px] size-2 -translate-x-1/2 rounded-full md:top-[30px]",
                    done || m.current ? "bg-accent" : "border border-accent/60 bg-ground",
                  )}
                />
                {m.current ? (
                  <span
                    aria-hidden
                    className="absolute left-0 top-[26px] size-2 -translate-x-1/2 animate-ping rounded-full bg-accent/70 motion-reduce:animate-none md:top-[30px]"
                  />
                ) : null}
                <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  <span className="tabular-nums">{m.date}</span>
                  <Badge variant={done ? "done" : m.current ? "live" : "status"}>
                    {done ? (
                      <svg
                        viewBox="0 0 12 12"
                        className="size-2.5 stroke-current"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M2.5 6l2.5 2.5 4.5-4.5" />
                      </svg>
                    ) : null}
                    {m.current ? (
                      <span
                        aria-hidden
                        className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none"
                      />
                    ) : null}
                    {m.status}
                  </Badge>
                </p>
                <p className="mt-2 text-pretty text-[16px] leading-[1.6] text-fg-primary md:text-[17px]">{m.text}</p>
              </li>
            );
          })}
        </ol>

        <Link
          href={copy.link.href}
          className="reveal mt-10 inline-block text-[14px] text-accent underline decoration-accent/40 underline-offset-[6px] transition-colors duration-300 hover:decoration-accent md:mt-12"
          style={delay(copy.milestones.length * 100 + 120)}
        >
          {copy.link.label}
        </Link>
      </Reveal>
    </Chapter>
  );
}
