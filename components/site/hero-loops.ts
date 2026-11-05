// Candidate hero background loops. Plain data, kept out of the client
// component so the server-rendered hero can read it.

export type LoopPart = { webm: string; mp4: string; mobile?: string };
// The frame the hero opens on, taken from the first part at `time` (and from
// its phone file at `mobileTime`); pressing play starts the video there.
export type LoopStill = { src: string; srcSet?: string; mobile?: string; time: number; mobileTime?: number };
// `then` lists parts that play after the first, in order, before it starts
// over; each should begin and end on black so the switches can't be seen.
export type LoopSources = LoopPart & { poster: string; still?: LoopStill; then?: LoopPart[] };

export const LOOPS = {
  // Higgsfield render (MiniMax H3) from the low camera of a warehouse robot,
  // run through the local event-camera simulator at 8 reads per frame: the
  // aisle draws itself while the robot drives, a worker steps out ahead in
  // brighter dots, and the robot stops for them, so the aisle vanishes and
  // only the worker remains. An intro visual, not sensor output.
  pov: {
    webm: "/assets/hero-pov-loop.webm",
    mp4: "/assets/hero-pov-loop.mp4",
    mobile: "/assets/hero-pov-loop-mobile.mp4",
    poster: "/assets/hero-pov-poster.jpg",
    // Sal's pick (2026-11-05): the hero opens on the worker mid-stride, 6.5 s
    // in (6.0 s in the phone file, where the same stride sits in its crop).
    still: {
      src: "/assets/hero-pov-still.webp",
      srcSet: "/assets/hero-pov-still-1280.webp 1280w, /assets/hero-pov-still.webp 1920w",
      mobile: "/assets/hero-pov-still-mobile.webp",
      time: 6.5,
      mobileTime: 6.0,
    },
    // Then the robot drives on and spots a forklift crossing ahead, and
    // finally stops at a sunlit dock door while a backlit worker walks past.
    then: [
      {
        webm: "/assets/hero-pov-forklift.webm",
        mp4: "/assets/hero-pov-forklift.mp4",
        mobile: "/assets/hero-pov-forklift-mobile.mp4",
      },
      {
        webm: "/assets/hero-pov-dock.webm",
        mp4: "/assets/hero-pov-dock.mp4",
        mobile: "/assets/hero-pov-dock-mobile.mp4",
      },
    ],
  },
  // Higgsfield render (MiniMax H3) of two workers in a warehouse aisle, run
  // through a local event-camera simulator: only moving edges draw, in dim
  // blue. An intro visual, not sensor output. The phone file is a centre
  // crop sized for the tall mobile panel.
  brand: {
    webm: "/assets/epic-brand-loop.webm",
    mp4: "/assets/epic-brand-loop.mp4",
    mobile: "/assets/epic-brand-loop-mobile.mp4",
    poster: "/assets/epic-brand-loop-poster.jpg",
  },
  // Real event-camera data: the raw right-hand stream of the 22-object
  // recording, slowed to half speed (no other edits).
  events: {
    webm: "/assets/event-field-loop.webm",
    mp4: "/assets/event-field-loop.mp4",
    poster: "/assets/event-field-poster.jpg",
  },
} satisfies Record<string, LoopSources>;
