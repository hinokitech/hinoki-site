import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell, CellBar, Section, SectionHeader } from "./Cell";
import { ProofMedia } from "./ProofMedia";

// Web exports of the demo footage, in the same order as copy.videos. Every
// Real capture clip must trace back to an original in assets/source/
// (kept in site-rebuild-inputs/videos until the repo is private).
// The simulation is the scene only: no HUD, readouts or result banners,
// with SIMULATION burned into the picture (build brief §3, §5E).
const MEDIA: { src: string | null; poster: string | null }[] = [
  { src: "/media/stereo-3d-tracking.mp4", poster: "/media/stereo-3d-tracking-poster.jpg" },
  { src: "/media/laser-tracking-3d.mp4", poster: "/media/laser-tracking-3d-poster.jpg" },
  { src: "/media/blind-corner-sim.mp4", poster: "/media/blind-corner-sim-poster.jpg" },
];

export function Proof({ copy }: { copy: SiteCopy["proof"] }) {
  const [large, ...stacked] = copy.videos.map((video, i) => ({ ...video, ...MEDIA[i] }));

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

        {/* The ultra-wide stereo clip runs the full width like a cinema strip;
            the other two sit side by side in frames close to their shape. */}
        <ProofMedia
          {...large}
          viewport="aspect-[1304/536]"
          className="md:col-span-6 lg:col-span-12"
        />
        {stacked.map((video) => (
          <ProofMedia
            key={video.title}
            {...video}
            viewport="aspect-[4/3]"
            className="md:col-span-3 lg:col-span-6"
          />
        ))}
      </Bento>
    </Section>
  );
}
