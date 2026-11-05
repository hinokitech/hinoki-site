import { cn } from "@/lib/utils";

// The office on Google's map, pinned at the building's own point, used on the
// About page and in the contact card. Google's embed can't be themed, so on
// the dark theme it is inverted and its hues turned back, and on the light
// theme it is softened toward the paper. It loads only when scrolled near.
// Its size comes from className.
export function OfficeMap({ title, coords, className }: { title: string; coords: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-edge bg-raise", className)}>
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${coords}&z=15&hl=en&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block size-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.75)_contrast(0.9)] light:[filter:grayscale(0.35)_contrast(0.95)]"
      />
    </div>
  );
}
