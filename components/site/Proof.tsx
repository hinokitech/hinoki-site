import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell, CellBar, Section, SectionHeader } from "./Cell";
import { ProofMedia } from "./ProofMedia";
import { SimCompare } from "./SimCompare";

// Web exports of the demo footage. Every Real capture clip must trace back to
// an original (kept in site-rebuild-inputs/videos until the repo is private).
const STEREO = { src: "/media/stereo-3d-tracking.mp4", poster: "/media/stereo-3d-tracking-poster.jpg" };
const LASER = { src: "/media/laser-tracking-3d.mp4", poster: "/media/laser-tracking-3d-poster.jpg" };
// Sim 1A (without Hinoki) and Sim 1B (with Hinoki), cut to the same span of
// simulation time so the toggle can swap them mid-play.
const BLIND_CORNER = {
  baseline: { src: "/media/blind-corner-baseline.mp4", poster: "/media/blind-corner-baseline-poster.jpg" },
  hinoki: { src: "/media/blind-corner-hinoki.mp4", poster: "/media/blind-corner-hinoki-poster.jpg" },
};

export function Proof({ copy }: { copy: SiteCopy["proof"] }) {
  const [stereo, laser, simulation] = copy.videos;

  return (
    <Section id="proof">
      <SectionHeader id="proof" index="03" label={copy.label}>
        {copy.heading}
      </SectionHeader>
      <Bento>
        {copy.stats.map((stat, i) => (
          <Cell key={stat.value} className="flex flex-col md:col-span-2 lg:col-span-4">
            <CellBar aside={<span className="tabular-nums">0{i + 1}</span>}>Measured</CellBar>
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <p className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-extrabold leading-none tracking-[-0.055em] text-ink wdth-125">
                {stat.value}
                {stat.unit ? (
                  <>
                    {" "}
                    <span className="font-label text-[0.26em] font-normal tracking-normal text-accent">
                      {stat.unit}
                    </span>
                  </>
                ) : null}
              </p>
              <p className="mt-6 max-w-[34ch] text-[14px] leading-[1.6] text-muted">{stat.text}</p>
            </div>
          </Cell>
        ))}

        {/* The ultra-wide stereo recording runs full width like a cinema strip;
            below it, the laser clip and the with/without simulation. */}
        <ProofMedia
          {...stereo}
          {...STEREO}
          viewport="aspect-[1304/536]"
          className="md:col-span-6 lg:col-span-12"
        />
        <ProofMedia {...laser} {...LASER} viewport="aspect-[4/3]" className="md:col-span-6 lg:col-span-5" />
        <SimCompare
          chip={simulation.chip}
          title={simulation.title}
          caption={simulation.caption}
          labels={copy.compare}
          runs={BLIND_CORNER}
          className="md:col-span-6 lg:col-span-7"
        />
      </Bento>
    </Section>
  );
}
