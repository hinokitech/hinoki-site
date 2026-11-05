import type { SiteCopy } from "@/content/site.en";
import { Chapter, ChapterLabel, ChapterTitle, delay } from "./Chapter";
import { ProofMedia } from "./ProofMedia";
import { Reveal } from "./Reveal";

// Web exports of the demo footage. Every Real capture clip must trace back to
// an original (kept in site-rebuild-inputs/videos until the repo is private).
const STEREO = { src: "/media/stereo-3d-tracking.mp4", poster: "/media/stereo-3d-tracking-poster.jpg" };
const LASER = { src: "/media/laser-tracking-3d.mp4", poster: "/media/laser-tracking-3d-poster.jpg" };

type StatCopy = SiteCopy["proof"]["stats"][number];

function Stat({ stat, n }: { stat: StatCopy; n: number }) {
  return (
    <div
      className="reveal group h-full bg-card p-8 transition-colors duration-500 hover:bg-raise md:p-10"
      style={delay(n * 100 - 20)}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-tertiary">
        Measured <span className="tabular-nums">· 0{n}</span>
      </p>
      <div className="mt-4 border-t border-accent/70 pt-5">
        <p className="font-mono text-[clamp(2.5rem,4.4vw,3.75rem)] font-light leading-none tracking-[-0.04em] text-accent">
          {stat.value}
          <span className="ml-2 text-[0.3em] tracking-normal text-fg-secondary">{stat.unit}</span>
        </p>
        <p className="mt-6 max-w-[38ch] text-pretty text-[15px] leading-[1.6] text-fg-primary">{stat.text}</p>
      </div>
    </div>
  );
}

export function Proof({ copy }: { copy: SiteCopy["proof"] }) {
  const [stereo, laser] = copy.videos;
  const benchmark = copy.stats.slice(0, 3);
  const recording = copy.stats[3];
  // The live site sets its Proven heading as a statement and a quieter reply.
  const [claim, ...reply] = copy.heading.split(/(?<=\.)\s+/);

  return (
    <Chapter id="proof">
      <Reveal>
        <ChapterLabel index="03" label={copy.label} className="reveal" />
        <ChapterTitle id="proof" className="reveal max-w-[760px]">
          {claim}
          {reply.length ? (
            <>
              <br />
              <span className="text-fg-secondary">{reply.join(" ")}</span>
            </>
          ) : null}
        </ChapterTitle>
      </Reveal>

      {/* Each measured number with what it means. The first three come from
          one benchmark, with how they were measured underneath them; the
          fourth, from a real recording, sits beside them on wide screens and
          after that line on narrow ones. */}
      <Reveal className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-4 lg:items-start">
        <div className="lg:col-span-3">
          <div className="stat-frame grid gap-px overflow-hidden rounded-lg bg-line md:grid-cols-3">
            {benchmark.map((stat, i) => (
              <Stat key={stat.value} stat={stat} n={i + 1} />
            ))}
          </div>
          <p className="reveal mt-3 text-pretty text-[13px] leading-[1.6] text-fg-tertiary" style={delay(400)}>
            {copy.note}
          </p>
        </div>
        <div className="stat-frame overflow-hidden rounded-lg bg-line">
          <Stat stat={recording} n={4} />
        </div>
      </Reveal>

      {/* The two real recordings side by side. */}
      <Reveal className="mt-8 grid gap-6 md:mt-10 md:gap-8 lg:grid-cols-12">
        <ProofMedia {...stereo} {...STEREO} viewport="aspect-video" className="reveal lg:col-span-7" />
        <ProofMedia
          {...laser}
          {...LASER}
          viewport="aspect-[4/3]"
          className="reveal [--reveal-delay:120ms] lg:col-span-5"
        />
      </Reveal>
    </Chapter>
  );
}
