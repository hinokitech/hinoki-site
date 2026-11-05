// Approved About page copy (Sal, 2026-11-04). Use verbatim: wording changes
// need Sal's sign-off. Square brackets mark placeholders still to come. The
// journey's milestones live in journey.ts.

export const aboutCopy = {
  meta: {
    title: "About",
    description: "Working toward machines with reflexes.",
  },

  about: {
    label: "About us",
    heading: "Working toward machines with reflexes.",
    // The body, in order, with the pull line between the two halves.
    before: [
      // Founders' line added by Sal (2026-11-05).
      "Hinoki was founded by University of Tsukuba alumni whose long-term goal is reflex systems for robots and other machines: vision that catches fast motion and sudden change, so a machine can respond in the moment, with everything running on the Hinoki module.",
      "Event cameras make that possible in principle. Each pixel reports a change the moment it happens, with microsecond timing. In practice they’re hard to use: they produce a fast, irregular stream of data that most AI hardware isn’t built to handle, which is one reason they’re still rare on real machines.",
      "That’s the part we build. We write our own event-processing algorithms to run directly in FPGA logic, and our own compact AI models on top of them. Together they turn the raw stream into answers a machine can use, on about 6 W and with no cloud connection. The camera is a component. The algorithms, the models and the system around them are ours, and they aren’t tied to one sensor.",
      // Added by Sal (2026-11-05).
      "A reflex has to arrive on time, every time. That’s why we process in FPGA logic, one event at a time, instead of in batches on a GPU.",
      "A reflex is only worth having if it can be trusted. Before a machine acts on what it sees, its vision has to prove itself in the real world: in glare, in clutter, over long hours, with very few false alarms.",
    ],
    pull: "So we’re starting by watching, not acting.",
    after: [
      "Our first application is logistics, from our office at INNOBASE, Tsukuba. In a trial, the Hinoki module rides along on an autonomous forklift or mobile robot and records what happens and why, without being wired into the vehicle’s safety system. Operators and vehicle builders get a clear picture of what caused stops and near-misses. We get what a reflex needs: real-world data, measured false-alarm rates, and evidence of where event cameras beat normal cameras, and where they don’t.",
      "Beyond logistics, we’re looking at other places where fast motion or difficult light holds machines back: high-speed production lines, robots that handle moving objects, and machines working in changing light.",
      // Reworded 2026-11-05: the hero's numbers no longer carry their note.
      "We measure before we claim. Each result on this site comes from a measurement we can show, and simulations are labeled as simulations.",
    ],
  },

  journey: {
    label: "Our journey",
    heading: "From thesis to measured hardware in six months.",
    sub: "Every technical milestone below is something we built and measured. Simulations are labeled, and future steps are marked as plans.",
    // Was "Each burst is a milestone"; Sal swapped the bursts for plain dots
    // (2026-11-04). The month strip, kept for comparison, still has bursts.
    caption: "Each dot is a milestone · Hollow dots are planned",
    stripCaption: "Each burst is a milestone · Hollow dots are planned",
  },

  company: {
    label: "Company",
    labelJa: "会社概要",
    // Sal's update (2026-11-05): new heading, no representative director, the
    // full address, capital (資本金), a shorter business line, partners by
    // logo and a small map.
    heading: "Company information",
    rows: [
      { term: "Company", detail: "Hinoki Technologies KK" },
      { term: "Established", detail: "August 2026" },
      { term: "Capital", detail: "¥23,000,000" },
      { term: "Address", detail: "INNOBASE, Prologis Park Tsukuba 3, 34 Miyukigaoka, Tsukuba, Ibaraki 305-0841, Japan" },
      { term: "Business", detail: "Real-time vision and AI systems for machines" },
    ],
    // Logos from each program's own source: AWS's "Powered by AWS" customer
    // badge (aws.amazon.com/co-marketing), Google for Startups' lockup
    // (Wikimedia Commons; "for Startups" turned white for the dark theme).
    // NVIDIA's member badge (full colour, from the Inception brand guide's
    // download, 2026-11-05) works on both themes as is: white panel, black
    // frame. Its file carries clear space, so 40 px keeps the visible badge
    // over NVIDIA's 30 px minimum. `h` is each logo's display height, set by
    // eye so they look the same size. No logo's colours are altered.
    // Sal, 2026-11-05: Antler under Partners; the three startup programs
    // under Programs.
    logoRows: [
      {
        term: "Partners",
        items: [{ name: "Antler", logo: "/assets/antler-wordmark.png", width: 458, height: 110, h: 24 }],
      },
      {
        term: "Programs",
        items: [
          { name: "NVIDIA Inception", logo: "/assets/partners/nvidia-inception-badge.svg", width: 500, height: 216, h: 40 },
          {
            name: "Google for Startups",
            logo: "/assets/partners/google-for-startups.svg",
            logoOnDark: "/assets/partners/google-for-startups-on-dark.svg",
            width: 824,
            height: 100,
            h: 19,
          },
          {
            name: "Powered by AWS",
            logo: "/assets/partners/powered-by-aws.png",
            logoOnDark: "/assets/partners/powered-by-aws-white.png",
            width: 200,
            height: 72,
            h: 34,
          },
        ],
      },
    ] as {
      term: string;
      items: { name: string; logo?: string; logoOnDark?: string; width?: number; height?: number; h?: number }[];
    }[],
    map: {
      title: "Map of INNOBASE, Prologis Park Tsukuba 3",
      // The building's own point (34 Miyukigaoka), so the pin carries no
      // other tenant's name.
      coords: "36.0712512,140.0786364",
      link: "Open in Google Maps",
    },
  },

  closing: {
    heading: "Talk to us.",
    body: "For trials, partnerships, or to follow our first field results.",
    trial: "Ask about a trial",
    contact: "Get in touch",
  },
};
