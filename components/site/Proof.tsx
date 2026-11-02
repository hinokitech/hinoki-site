import type { SiteCopy } from "@/content/site.en";
import { Section, SectionHeading } from "./Section";
import { VideoFrame } from "./VideoFrame";

// Web exports of the demo footage, in the same order as copy.videos. Every
// Real capture clip must trace back to an original in assets/source/.
// Stereo 3D tracking and the forklift simulation are still awaiting files.
const MEDIA: { src: string | null; poster: string | null }[] = [
  { src: null, poster: null },
  { src: "/media/laser-tracking.mp4", poster: "/media/laser-tracking-poster.jpg" },
  { src: null, poster: null },
];

export function Proof({ copy }: { copy: SiteCopy["proof"] }) {
  return (
    <Section id="proof" index="03" label={copy.label}>
      <SectionHeading id="proof" className="max-w-[18ch]">
        {copy.heading}
      </SectionHeading>

      <ul className="mt-16 grid border-y border-line md:mt-20 md:grid-cols-3">
        {copy.stats.map((stat, i) => (
          <li
            key={stat.value}
            className={`py-8 md:py-10 md:pr-8 ${
              i > 0 ? "border-t border-line md:border-l md:border-t-0 md:pl-8" : ""
            }`}
          >
            <p className="font-display text-[clamp(3rem,5.6vw,5rem)] font-extrabold leading-none tracking-[-0.045em] text-ink wdth-125">
              {stat.value}
              {stat.unit ? (
                <>
                  {" "}
                  <span className="font-label text-[0.3em] font-normal tracking-normal text-muted">
                    {stat.unit}
                  </span>
                </>
              ) : null}
            </p>
            <p className="mt-5 max-w-[32ch] text-[14px] leading-[1.6] text-muted">
              {stat.text}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-16 grid gap-x-6 gap-y-14 md:mt-24 lg:grid-cols-2">
        {copy.videos.map((video, i) => (
          <VideoFrame
            key={video.title}
            {...video}
            {...MEDIA[i]}
            className={i === 0 ? "lg:col-span-2" : ""}
          />
        ))}
      </div>
    </Section>
  );
}
