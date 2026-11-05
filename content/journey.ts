// The company journey, oldest first: the About page draws both its chart and
// its list from this. One milestone per line, so a monthly update is a
// one-line change. `when` is "YYYY-MM", or "YYYY-Qn" for a quarter.
// Tags: MEASURED and REAL CAPTURE take the orange-tint chip, SIMULATION the
// dashed grey one; NOW and NEXT match the homepage Progress list. NEXT marks
// a plan. Approved copy (Sal, 2026-11-04): wording changes need sign-off.
// Sal's 2026-11-05 changes: founders' detail, thesis wording, the Antler
// investment line and the Q1 2027 trial partners.

export type JourneyTag = "MEASURED" | "REAL CAPTURE" | "SIMULATION" | "NOW" | "NEXT";

export type Milestone = { when: string; title: string; detail?: string; tag?: JourneyTag };

export const JOURNEY: Milestone[] = [
  { when: "2025-12", title: "Founding team forms.", detail: "University of Tsukuba alumni." },
  { when: "2026-02", title: "Thesis formulated.", detail: "Machines that work around people need to process what they see locally, fast enough to react in the moment." },
  { when: "2026-04", title: "Selected for the Antler Japan residency." },
  { when: "2026-05", title: "First tracking on an edge device.", detail: "A high-speed frame camera locks on to a randomly moving laser dot, with our algorithm running entirely on the device.", tag: "REAL CAPTURE" },
  { when: "2026-05", title: "Selected for early investment by Antler." },
  { when: "2026-06", title: "Event-camera tracking running live." },
  { when: "2026-07", title: "Stereo 3D from events.", detail: "Two event cameras recover full X, Y, Z position, with depth computed entirely in the FPGA design." },
  { when: "2026-07", title: "FPGA design verified.", detail: "Verified cycle by cycle, bit-identical to the software model, at about 200 million events per second.", tag: "SIMULATION" },
  { when: "2026-08", title: "Hinoki Technologies KK incorporated.", detail: "Pre-seed funding received." },
  { when: "2026-08", title: "Running on real FPGA hardware.", detail: "From verified design to real hardware in about a month. On an AMD Kria FPGA: 0.68 ms mean processing latency, 95% of updates in under 0.85 ms, and 6.4 W for the whole compute module. Technical report, 20 August.", tag: "MEASURED" },
  { when: "2026-08", title: "22 objects tracked in 3D at once.", detail: "Two hardware-synced event cameras connected to our edge device. An early version of our processing gives each fast-moving, colliding object its own ID, keeps it through the collisions, and measures its distance and speed.", tag: "REAL CAPTURE" },
  { when: "2026-09", title: "Office opened at INNOBASE, Tsukuba." },
  { when: "2026-10", title: "Forklift hazard scenarios.", detail: "Three scenarios in a 1 kHz physics simulation: a pedestrian at a blind corner, a fast-approaching vehicle and 100,000-lux glare.", tag: "SIMULATION" },
  { when: "2026-11", title: "Direct camera-to-FPGA pipeline.", detail: "With our own models, built to run in FPGA logic at the sensor’s full rate.", tag: "NOW" },
  { when: "2027-Q1", title: "First recording-only trial with early logistics partners.", detail: "Compared with a conventional high-speed camera.", tag: "NEXT" },
];

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// "2026-05" -> "MAY 2026"; "2027-Q1" -> "Q1 2027".
export function whenLabel(when: string) {
  const [year, part] = when.split("-");
  return part.startsWith("Q") ? `${part} ${year}` : `${MONTHS[Number(part) - 1]} ${year}`;
}

export const isPlanned = (m: Milestone) => m.tag === "NEXT";
