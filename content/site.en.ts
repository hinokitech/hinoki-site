// Approved homepage copy (website build brief, Appendix A), revised by Sal on
// 2026-11-04. Use verbatim: wording changes need Sal's sign-off. Square
// brackets mark placeholders still to come. A Japanese file will mirror this shape.

const en = {
  meta: {
    title: "Hinoki Technologies | Fast vision for forklifts and mobile robots",
    description:
      "Hinoki turns fast motion into real-time answers for machines, at the edge.",
  },

  // Sal's site update (2026-11-05): nav, hero, Problem stats, What we build,
  // Proof, Trial and About, with "the Hinoki module" wording throughout.
  nav: {
    links: [
      { href: "/#how", label: "What we build" },
      { href: "/#proof", label: "Proof" },
      { href: "/#trial", label: "Trial" },
      { href: "/about", label: "About" },
      // Straight to the About page's company information (Sal, 2026-11-05),
      // the way Japanese company sites link 会社概要 from the top.
      { href: "/about#company", label: "Company" },
      { href: "/#contact", label: "Contact" },
    ],
    cta: { href: "/#trial", label: "Ask about a trial" },
  },

  hero: {
    eyebrow: "FAST VISION FOR MACHINES · TSUKUBA, JAPAN",
    // The accent part is set in accent orange. Edge AI first, then event
    // vision (Sal, 2026-11-05); "event camera" stays wherever the page means
    // the physical camera.
    headline: {
      lead: "",
      accent: "Edge AI",
      tail: "that brings event vision to forklifts and mobile robots.",
    },
    subhead:
      "A normal camera takes 30 pictures a second. An event camera reports every change the moment it happens. Hinoki builds the processing and AI that turn that stream into answers on our own module, in under a millisecond, on about 6 W, with no GPU or cloud.",
    trialLine:
      "Start with a four-week, recording-only trial on one vehicle or one location. You get a tailored report on what caused stops and near-misses, plus a hazard log. It works alongside your existing safety equipment and isn't connected to it.",
    primaryCta: "Ask about a trial",
    secondaryCta: "See the real captures",
    // Under the hero frame, in place of the old "Starting with" strip.
    proofStrip: {
      items: [
        "0.68 ms mean processing latency",
        "6.4 W module, cameras excluded",
        "22 objects tracked in 3D",
        // "Backed by Antler" moved to Contact, as on the live site (Sal, 2026-11-05).
      ],
      // The measurement note was removed here at Sal's request (2026-11-05);
      // Proof keeps it.
    },
    toggle: { compare: "Compare", event: "Event camera", frame: "Normal camera, 30 fps", frameShort: "Normal camera" },
    badge: "Illustration",
    controls: {
      speed: "Speed",
      sun: "Sunlight",
      hold: "Hold still",
      release: "Let it move",
      divider: "Compare the two cameras",
    },
    readout: {
      event: "{n} events/s · Still pixels send nothing",
      frame: "30 frames/s · {n} pixel values/s",
    },
    // "With Hinoki" on the event camera's side: planned output, drawn by the
    // page. Its figures are projections.
    hinoki: {
      toggle: "With Hinoki",
      tag: "01 · ball · {c}%",
      track: "Track 01",
      coords: "Coordinates",
      pixels: "Pixels",
      gps: "GPS",
      waiting: "Waiting for motion",
      lock: "Lock",
      holding: "Holding",
      px: { pos: "x {x} · y {y} px", motion: "{v} px/s · {d}°", time: "t {t} s" },
      geo: {
        pos: "{lat}° N · {lon}° E",
        height: "Height {h} m · climb {c} m/s",
        motion: "{v} m/s · heading {hd}°",
        range: "Range {r} m · bearing {b}°",
        note: "Needs two calibrated cameras",
      },
      board: "Board",
      simulated: "Simulated",
      latency: "Latency",
      jitter: "Jitter",
      power: "Power",
      eventsIn: "Events in",
      model: "Model",
      idle: "Idle",
      answering: "Answers · every 0.1 s",
      stream: {
        title: "To the main board",
        tokens: "Tokens",
        words: "Words",
        // Rows come at a readable pace: one every half second (Sal, 2026-11-05).
        stats: "32 bytes · 1,000 a second · 1 in 500 shown",
        projected: "Projected",
        raw: "Raw, latest message",
        waiting: "No track yet: nothing is moving.",
        reading: "One message, in words",
      },
      // The Words view reads the newest message out from the same answers
      // the Tokens view shows (audit, 2026-11-05).
      reading: {
        still: "Track 01 is a ball ({c}% sure), standing still {zone}.",
        moving: "Track 01 is a ball ({c}% sure), moving {dir} at {v} m/s, {level}, {zone}.",
        bounce: "It’s bouncing right now.",
        backlit: "It’s backlit by the sunlit door.",
        light: "The light just changed.",
        levels: { SLOW: "slow", MEDIUM: "medium", FAST: "fast", "VERY FAST": "very fast", STILL: "still" } as Record<string, string>,
        zones: { LEFT: "on the left", DOOR: "in the doorway", RIGHT: "on the right" } as Record<string, string>,
      },
      // Shows off only with claims the site already makes (Proof: under a
      // millisecond; What we build: about 6 W, confidence scores; hero: no
      // cloud) or that are framed as what the system is built to do.
      footnote:
        "With Hinoki shows what our system is built to deliver: tracking that updates in under a millisecond on about 6 W, as measured on our hardware, with every moving object given an ID and compact, confidence-scored answers a vehicle's main board can act on directly. All on the Hinoki module, with no cloud and no images leaving it. This layer is drawn by the page, and the figures in it are projections.",
      lines: {
        start: "New track 01: a ball, about {size} cm across, heading {dir}.",
        waiting: "Nothing is moving, so the event camera sees nothing to track yet.",
        rhythm: "Bouncing about {rate} times a second. Next bounce in {t} s, {d} m ahead.",
        door: "Crossing the sunlit door. A normal camera is washed out here; track 01 is still clear.",
        speed: "Now crossing the bay at {speed} m/s, about {gap} cm between normal-camera frames. Track 01 still updates every millisecond.",
        sun: "Daylight at the door just changed. A burst of {n} events, then quiet. No exposure change needed.",
        hold: "Track 01 has stopped. With nothing changing, events fell to {n} a second and the model has gone idle.",
        release: "Track 01 is moving again, heading {dir}.",
        lamps: "The dots by the ceiling are the lamps flickering at 100 Hz. Recognized as lighting and ignored.",
        summary: "Last {s} s: one object, {b} bounces, {d} door crossings, top speed {v} m/s. Nothing else moved.",
        left: "left",
        right: "right",
      },
    },
    // The column beside the interactive (approved by Sal, 2026-11-04): what
    // the visitor is looking at, what to try, why event vision is hard and
    // how Hinoki makes it work, without naming methods or parts.
    explain: {
      heading: "Two cameras, one scene.",
      intro:
        "On the left, a normal camera takes 30 snapshots a second, so fast motion blurs and bright light washes the picture out. On the right, an event camera reports only the pixels that change, the moment they change: orange where it gets brighter, gray where it gets darker.",
      tryIt: {
        title: "Try it",
        items: [
          { action: "Drag the divider", result: "to compare the two." },
          { action: "Turn up Sunlight.", result: "The normal camera loses the ball in the glare; the event camera doesn't." },
          { action: "Raise Speed.", result: "The snapshots blur and skip; the events keep up." },
          { action: "Hold the ball still.", result: "The event camera goes quiet, because nothing is changing." },
          { action: "Switch on With Hinoki", result: "to see what we're building." },
        ],
      },
      hard: {
        title: "The hard part",
        text: "Event cameras don't make pictures. They send millions of separate events a second, each timed to the microsecond, and nothing at all from anything standing still. Ordinary vision software and AI are built for pictures, so they can't use this directly.",
      },
      how: {
        title: "How we make it work",
        items: [
          {
            lead: "Algorithms on the Hinoki module",
            text: "handle every event as it arrives, filtering out noise and flicker and tracking each moving object, with updates in under a millisecond.",
          },
          {
            lead: "Brain-inspired processing",
            text: "works the way the sensor does, only when something changes, and remembers the motion it has just seen.",
          },
          {
            lead: "Compact AI models, trained in-house,",
            text: "turn that motion into answers with confidence scores, ready for a machine to act on.",
          },
        ],
        link: { href: "/#how", label: "See what we build" },
      },
      note: "Illustration, not recorded data. Rates are worked out for a 1280×720 sensor.",
    },
    // The demo's guided tour (prototype for Sal, 2026-11-05): learn the
    // controls, power up Hinoki, see what it does, then try to break it.
    // Light and friendly; it shows once per browser and can be replayed.
    tour: {
      replay: "Show me around",
      skip: "Skip tour",
      next: "Next",
      start: "Start",
      done: "Done",
      trial: { href: "/#trial", label: "Ask about a trial" },
      parts: { start: "Quick tour", learn: "Warm-up", power: "Power-up", magic: "What Hinoki does", last: "Final challenge" },
      // Every tip waits for Next, so nothing moves on before it's read. On a
      // first visit the demo waits for play, and the first tip says so.
      steps: {
        play: { title: "Press play to begin.", body: "We’ll walk you through it, one step at a time." },
        divider: { title: "Grab the divider and slide it.", reaction: "Nice." },
        center: { title: "Now slide it back to the middle.", reaction: "Perfect." },
        sun: { title: "Now turn up the sun.", reaction: "Bright. The normal camera just lost the ball." },
        speed: { title: "Crank up the speed.", reaction: "The normal camera blurs. The event camera doesn’t." },
        hold: { title: "Hold the ball still.", reaction: "Quiet. Nothing moves, so there’s nothing to report." },
        hinoki: { title: "Ready? Switch on Hinoki.", reaction: "Hinoki is on." },
        track: { title: "Meet track 01.", body: "Hinoki spotted the ball, gave it an ID, and follows it every millisecond." },
        arc: { title: "See the dashed arc?", body: "That’s Hinoki’s guess for where the ball lands next." },
        board: {
          title: "Its numbers, live.",
          body: "How fast it answers and how little power it uses, projected for the finished module.",
        },
        tokens: {
          title: "This is all it sends the vehicle.",
          body: "Each line is one message, a thousand a second: the ball’s speed, then Hinoki’s answers, each with how sure it is. MOVING YES 99% means moving, 99% sure.",
        },
        words: {
          title: "Now tap Words.",
          body: "It reads a message out in plain English.",
          reaction: "No video. Just answers.",
        },
        finale: {
          title: "Now try to lose it.",
          body: "Push Speed and Sunlight all the way up.",
          reaction: "Still locked on. That’s Hinoki.",
        },
      } as Record<string, { title: string; body?: string; reaction?: string }>,
    },
  },

  problem: {
    label: "Problem",
    heading: "Cameras struggle exactly when it matters.",
    // Sal, 2026-11-05: automatic stops come from laser scanners, not cameras,
    // so the body says so, and the fourth card covers stops nobody can explain.
    body: "Forklifts, mobile robots and production lines work close to people, often at speed. Those that stop on their own mostly rely on laser scanners, with cameras alongside. The scanners see shapes, not what’s happening. The cameras take about 30 snapshots a second. Between snapshots, fast motion blurs or goes unseen, and bright light at a dock door can wash out the whole image. So when a vehicle stops suddenly or a near-miss happens, there’s often no clear record of why. Large AI models could explain it, but they’re too slow and power-hungry to run on every machine.",
    facts: [
      { tag: "33 ms", text: "The wait for the next picture at 30 frames a second." },
      { tag: "45 ms", text: "Average time a frame-based AI pipeline on a Jetson Nano took per update, in our tests." },
      { tag: "~100,000 lux", text: "Glare that washes out a normal camera at a dock door." },
      { tag: "No reason", text: "Scanners stop for a box or a person alike, and log only that something was there." },
    ],
  },

  // Renamed from "How it works" (Sal, 2026-11-05). The anchor stays #how.
  how: {
    label: "What we build",
    heading: "Where the time goes.",
    // Two bars on the same scale.
    chart: {
      bars: [
        { label: "Frame-based AI pipeline, Jetson Nano", ms: 45, value: "45 ms" },
        { label: "Hinoki, AMD Kria FPGA", ms: 0.68, value: "0.68 ms" },
      ],
      caption:
        "Mean latency, measured pipeline against pipeline on the same single-target task. Technical report, 20 August 2026.",
    },
    definition: {
      term: "The Hinoki module:",
      text: "an event camera connected to a small FPGA board running our own algorithms and models. It mounts on the vehicle, draws about 6 W, and doesn't use your vehicle's computer, a GPU or the cloud.",
    },
    steps: [
      {
        step: "1 · Sensor",
        title: "Event camera.",
        text: "Each pixel reports a change in brightness the moment it happens, with microsecond timing and very high dynamic range. A still scene produces almost no data.",
      },
      {
        step: "2 · Edge hardware",
        title: "Real-time processing.",
        text: "Our own algorithms run directly in FPGA logic on the Hinoki module, processing the stream in real time on about 6 W, with no cloud connection.",
      },
      {
        step: "3 · Models",
        title: "Hinoki models.",
        text: "Our own compact AI models turn motion into structured results, designed to give each result a confidence score.",
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
    heading: "We ran it on real hardware. Here’s what happened.",
    // The first three come from the same benchmark; `note` sits under them.
    stats: [
      {
        value: "0.68",
        unit: "ms",
        // 45 ms ÷ 0.68 ms = 66.2.
        text: "Mean processing latency, about 66 times faster than the frame-based pipeline we tested.",
      },
      { value: "0.85", unit: "ms", text: "95% of updates. Deterministic timing, with no batching." },
      { value: "6.4", unit: "W", text: "The whole compute module, cameras excluded." },
      // Sal (2026-11-05): run on the device, IDs assigned by our own system.
      { value: "22", unit: "objects", text: "Each with its own ID, tracked in 3D at once on the Hinoki module. From a real recording." },
    ],
    note: "Measured on AMD Kria FPGA. Technical report, 20 August 2026.",
    videos: [
      {
        kind: "real",
        chip: "REAL CAPTURE",
        title: "Stereo 3D tracking",
        // Beefed up with Sal's facts (2026-11-05): run on the device, and the
        // system assigns the IDs itself.
        caption:
          "22 fast-moving, colliding objects, tracked on the Hinoki module with two event cameras. An early version of our processing gives each one its own ID, keeps it through the collisions, and measures its distance and speed in 3D.",
      },
      // Replaces "High-speed laser tracking" to match the upgraded stereo
      // event-camera clip (approved by Sal, 2026-11-03).
      {
        kind: "real",
        chip: "REAL CAPTURE",
        title: "3D laser tracking",
        // The clip's readout runs from about 1.7 to 2.7 m.
        caption:
          "A laser dot moved by hand, tracked on the Hinoki module with two event cameras. Our processing locks on to it in both cameras and reports its X, Y, Z position as it moves, up to about 3 m away.",
      },
    ],
  },

  application: {
    label: "First application",
    heading: "Starting where machines and people share space.",
    body: "Autonomous forklifts and mobile robots work alongside people at blind corners, busy crossings and sunlit dock doors. These are also the places where unexplained stops and unrecorded near-misses happen. That’s where we’re starting, from our office at INNOBASE, Tsukuba.",
    values: [
      {
        label: "VEHICLE BUILDERS",
        text: "See why your vehicles stop at customer sites.",
      },
      { label: "OPERATORS", text: "See where near-misses happen, and why." },
    ],
    bridge:
      "Before anyone can make these places safer, they need to see what actually happens there.",
    safetyNote:
      "Our system works alongside a vehicle’s existing safety equipment. It doesn’t replace it.",
    alsoSuited: {
      label: "Also suited to",
      items: [
        "High-speed production lines",
        "Robots handling fast-moving objects",
        "Machines working in harsh or changing light",
      ],
    },
    // Above the trial card (Sal, 2026-11-05).
    stopLogs: "Most stop logs tell you the vehicle stopped. They don't tell you what it saw.",
    offer: {
      title: "What a trial looks like",
      rows: [
        { term: "Scope", detail: "One vehicle or one location." },
        { term: "Duration", detail: "Four weeks." },
        {
          term: "Setup",
          detail:
            "Recording only. Nothing is wired into your vehicle’s safety system.",
        },
        {
          term: "You get",
          // Tailored report and hazard log (Sal, 2026-11-05).
          detail:
            "A report tailored to the data we agree on with you beforehand, for example what caused stops and near-misses, or where fast motion or glare caused problems. It comes with a hazard log.",
        },
      ],
      cta: "Ask about a trial",
    },
    // Moved here from Proof (Sal, 2026-11-04).
    simulation: {
      chip: "SIMULATION",
      title: "Blind-corner scenario",
      // Sal, 2026-11-05: the trial only records, so the clip is labeled as
      // future potential, in the player itself so the enlarged view shows it too.
      note: "Demonstration of future potential only",
      caption:
        "A person stepping out at a blind corner in front of an autonomous forklift. Next, we measure this on a real vehicle, recording only.",
    },
    // Toggle between the two runs of the blind-corner simulation (Sal, 2026-11-03).
    compare: { baseline: "Without Hinoki", hinoki: "With Hinoki" },
  },

  progress: {
    label: "Progress",
    heading: { lead: "Where we are, and", accent: "what’s next." },
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
        text: "First recording-only trial with early logistics partners, compared with a conventional high-speed camera",
        current: false,
      },
      {
        status: "Later",
        date: "2027",
        text: "Multi-sensor fusion, and a module partners can build into their own machines",
        current: false,
      },
    ],
    link: { href: "/about#journey", label: "See the full timeline" },
  },

  contact: {
    label: "Contact",
    heading: "Talk to us.",
    body: "We’re looking for partners with fast-moving machines or difficult light: vehicle and robot makers, logistics operators and manufacturers. Investors who want to follow our first field results are welcome too.",
    // Sal, 2026-11-05: contact@ (shorter and more standard than contactus@).
    email: "contact@hinokitech.com" as string | null,
    emailPlaceholder: "[email address]",
    location: "INNOBASE, Prologis Park Tsukuba, Ibaraki, Japan",
    // Shown above Antler's wordmark, as on the live site (Sal, 2026-11-05).
    portfolio: "Antler portfolio company",
    topic: {
      label: "What’s this about?",
      placeholder: "Choose one",
      options: ["A trial", "A partnership", "Investment", "Something else"],
    },
  },

  // The small print. "Backed by" is followed by Antler's logo (Sal, 2026-11-05).
  footer: { text: "© 2026 Hinoki Technologies · Tsukuba, Japan", backedBy: "Backed by" },
};

export type SiteCopy = typeof en;

export const siteCopy: SiteCopy = en;
