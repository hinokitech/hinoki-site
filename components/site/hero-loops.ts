// Candidate hero background loops. Plain data, kept out of the client
// component so the server-rendered hero can read it.

export type LoopSources = { webm: string; mp4: string; mobile?: string; poster: string };

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
