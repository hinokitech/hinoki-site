// Candidate hero background loops. Plain data, kept out of the client
// component so the server-rendered hero can read it.

export type LoopSources = { webm: string; mp4: string; mobile?: string; poster: string };

export const LOOPS = {
  // Higgsfield render: abstract light, never a stand-in for real footage.
  brand: {
    webm: "/assets/epic-brand-loop.webm",
    mp4: "/assets/epic-brand-loop.mp4",
    mobile: "/assets/epic-brand-loop-720.mp4",
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
