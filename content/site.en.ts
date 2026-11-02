// Approved homepage copy (website build brief, Appendix A). Use verbatim:
// wording changes need Sal's sign-off. A Japanese file will mirror this shape.

const en = {
  meta: {
    title: "Hinoki Technologies — Fast vision for machines.",
    description:
      "Hinoki turns fast motion into real-time answers for machines, at the edge.",
  },

  nav: {
    links: [
      { href: "#problem", label: "Problem" },
      { href: "#how", label: "How it works" },
      { href: "#proof", label: "Proof" },
      { href: "#application", label: "First application" },
      { href: "#team", label: "Team" },
    ],
    cta: "Talk to us",
  },

  hero: {
    eyebrow: "EVENT-BASED VISION · EDGE AI · TSUKUBA, JAPAN",
    headline: { lead: "Fast vision for", accent: "machines." },
    lede: "Hinoki turns fast motion into real-time answers for machines, at the edge.",
    subLede:
      "Our systems are built for what normal cameras struggle with: fast movement, sudden changes and harsh light. They run on the machine itself, with no cloud connection.",
    startingWith: {
      label: "Starting with",
      text: "Autonomous forklifts and mobile robots",
    },
    primaryCta: "Talk to us",
    secondaryCta: "See it working",
    toggle: { event: "Event camera", frame: "Normal camera, 30 fps" },
    readout: {
      event: "≈ {n} events/s · Still pixels send nothing",
      frame: "30 frames/s · Every pixel, every frame",
    },
    caption:
      "Illustration, not recorded data. A normal camera captures every pixel 30 times a second, so fast motion blurs and bright light washes the image out. An event camera reports only the pixels that change, the moment they change. Orange dots show brightness going up; grey dots show it going down.",
  },

  problem: {
    label: "Problem",
    heading: "Cameras struggle exactly when it matters.",
    body: "Forklifts, mobile robots and production lines work close to people, often at speed. Most of them see through cameras that take about 30 snapshots a second. Between snapshots, fast motion blurs or goes unseen, and bright light at a dock door or window can wash out the whole image. Large AI models can make sense of a scene, but they are too slow and power-hungry to run on every machine.",
    facts: [
      {
        tag: "33 ms",
        title: "Gaps between frames",
        text: "At 30 frames a second, a fast object can travel a long way between one snapshot and the next.",
      },
      {
        tag: "~100,000 lux",
        title: "Glare",
        text: "Direct sunlight at a doorway can wash out a normal camera's image completely.",
      },
      {
        tag: "100s of ms",
        title: "Slow decisions",
        text: "Large AI models running on edge hardware often take hundreds of milliseconds per decision.",
      },
    ],
  },

  how: {
    label: "How it works",
    heading: "Sensor, edge hardware and our own models, built as one system.",
    steps: [
      {
        step: "1 · Sensor",
        title: "Event camera.",
        text: "Each pixel reports a change in brightness the moment it happens, with microsecond timing and very high dynamic range. A still scene produces almost no data.",
      },
      {
        step: "2 · Edge hardware",
        title: "Real-time processing.",
        text: "An FPGA next to the sensor processes the stream as it arrives, using a few watts and no cloud connection.",
      },
      {
        step: "3 · Models",
        title: "Hinoki models.",
        text: "Our own compact AI models turn motion into structured results, each with a confidence score.",
      },
      {
        step: "4 · Output",
        title: "Answers.",
        text: "What moved, where, how fast, and what just happened, ready for a machine to act on or a person to review.",
      },
    ],
    note: "We started with event cameras and also work with high-speed frame cameras. The system is built to take on more sensor types over time.",
  },

  proof: {
    label: "Proof",
    heading: "We ran it on real hardware. Here's what happened.",
    stats: [
      {
        value: "0.68",
        unit: "ms",
        text: "Mean processing latency on FPGA hardware, measured on a single-target tracking benchmark",
      },
      {
        value: "22",
        unit: "",
        text: "Fast-moving objects tracked in 3D at once with two event cameras, from a real recording",
      },
      {
        value: "6.4",
        unit: "W",
        text: "Mean module power during the same benchmark, cameras excluded",
      },
    ],
    videos: [
      {
        kind: "real",
        chip: "REAL CAPTURE",
        title: "Stereo 3D tracking",
        caption: "Two event cameras tracking 22 fast-moving, colliding objects in 3D.",
      },
      // Replaces "High-speed laser tracking" to match the upgraded stereo
      // event-camera clip (approved by Sal, 2026-11-03).
      {
        kind: "real",
        chip: "REAL CAPTURE",
        title: "3D laser tracking",
        caption:
          "Two event cameras locking on to a hand-held laser dot and tracking it in 3D.",
      },
      {
        kind: "simulation",
        chip: "SIMULATION",
        title: "Blind-corner scenario",
        caption:
          "A person stepping out at a blind corner in front of an autonomous forklift. Next, we test this on a real vehicle.",
      },
    ],
    // Toggle between the two runs of the blind-corner simulation (Sal, 2026-11-03).
    compare: { baseline: "Without Hinoki", hinoki: "With Hinoki" },
  },

  application: {
    label: "First application",
    heading: "Starting where machines and people share space.",
    body: "Autonomous forklifts and mobile robots work alongside people at blind corners, busy crossings and sunlit dock doors. That's where we're starting, from INNOBASE in Prologis Park Tsukuba, a hub for logistics technology.",
    values: [
      {
        label: "VEHICLE BUILDERS",
        text: "See why your vehicles stop at customer sites.",
      },
      { label: "OPERATORS", text: "See where near-misses happen, and why." },
    ],
    safetyNote:
      "Our system works alongside a vehicle's existing safety equipment. It doesn't replace it.",
    alsoSuited: {
      label: "Also suited to",
      items: [
        "High-speed production lines",
        "Robots handling fast-moving objects",
        "Machines working in harsh or changing light",
      ],
    },
    offer: {
      title: "What a trial looks like",
      rows: [
        { term: "Scope", detail: "One vehicle or one location." },
        { term: "Duration", detail: "Four weeks." },
        {
          term: "Setup",
          detail:
            "Recording only. Nothing is wired into your vehicle's safety system.",
        },
        {
          term: "You get",
          detail:
            "A report on what caused stops and near-misses, and where fast motion or glare caused problems.",
        },
      ],
      cta: "Ask about a trial",
    },
  },

  progress: {
    label: "Progress",
    heading: { lead: "Where we are, and", accent: "what's next." },
    milestones: [
      {
        status: "Done",
        date: "Q2 2026",
        text: "High-speed frame-camera tracking running on the edge device",
        current: false,
      },
      {
        status: "Done",
        date: "Q3 2026",
        text: "Event-camera tracking measured on FPGA hardware",
        current: false,
      },
      {
        status: "Done",
        date: "Q3 2026",
        text: "Stereo event-camera 3D tracking of many fast-moving objects",
        current: false,
      },
      {
        status: "Now",
        date: "Q4 2026",
        text: "Direct camera-to-FPGA pipeline with our own models",
        current: true,
      },
      {
        status: "Next",
        date: "Q1 2027",
        text: "First recording-only trial on a real vehicle, compared with a conventional high-speed camera",
        current: false,
      },
      {
        status: "Later",
        date: "2027",
        text: "Multi-sensor fusion, and a module partners can build into their own machines",
        current: false,
      },
    ],
  },

  team: {
    label: "Team",
    heading: "The people building it.",
    people: [
      {
        role: "CO-FOUNDER · CTO",
        name: "Bernardo Gatto.",
        bio: "PhD in computer vision, working in AI since 2013. Former researcher at AIST, Japan's National Institute of Advanced Industrial Science and Technology. Specialist in geometric computer vision.",
      },
      {
        role: "CO-FOUNDER · CEO",
        name: "Salvatore Martone.",
        bio: "Previously one of Asia's leading executive recruiters at a global search firm. Leads partnerships and commercial work.",
      },
      {
        role: "CO-FOUNDER · COO",
        name: "Mina Otsuka.",
        bio: "Leads operations and partnerships in Japan. Former business development manager at Meiji Yasuda Life.",
      },
    ],
    backing:
      "Backed by Antler. Based at INNOBASE, Prologis Park Tsukuba, Ibaraki, Japan.",
  },

  contact: {
    label: "Contact",
    heading: "Talk to us.",
    body: "We're looking for partners with fast-moving machines or difficult light: vehicle and robot makers, logistics operators and manufacturers. Investors who want to follow our first field results are welcome too.",
    // Placeholder until Sal provides the address.
    email: null as string | null,
    location: "INNOBASE, Prologis Park Tsukuba, Ibaraki, Japan",
  },

  footer: "© 2026 Hinoki Technologies · Tsukuba, Japan",
};

export type SiteCopy = typeof en;

export const siteCopy: SiteCopy = en;
