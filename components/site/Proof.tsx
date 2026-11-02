import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell, CellBar, Section, SectionHeader } from "./Cell";
import { ProofMedia } from "./ProofMedia";

// Web exports of the demo footage, in the same order as copy.videos. Every
// Real capture clip must trace back to an original in assets/source/.
// Stereo 3D tracking and the forklift simulation are still awaiting files.
const MEDIA: { src: string | null; poster: string | null }[] = [
  { src: null, poster: null },
  { src: "/media/laser-tracking-3d.mp4", poster: "/media/laser-tracking-3d-poster.jpg" },
  { src: null, poster: null },
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

        <ProofMedia {...large} tall className="md:col-span-6 lg:col-span-8" />
        <div className="grid gap-px bg-white/[0.06] md:col-span-6 md:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {stacked.map((video) => (
            <ProofMedia key={video.title} {...video} />
          ))}
        </div>
      </Bento>
    </Section>
  );
}
