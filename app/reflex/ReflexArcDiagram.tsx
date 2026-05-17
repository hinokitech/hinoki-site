"use client";

import "./reflex-arc-diagram-scoped.css";

const MAPPING = [
  { bio: "Sensory receptor", arc: "Sensor" },
  { bio: "Spinal reflex loop", arc: "Arc FPGA" },
  { bio: "Motor neuron", arc: "Correction output" },
  { bio: "Muscle", arc: "Actuator" },
  { bio: "Brain", arc: "Main controller" },
] as const;

function FlowArrow({ strokeWidth = 1.4 }: { strokeWidth?: number }) {
  return (
    <div className="arrow" aria-hidden="true">
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
        <path
          d="M0 5 H14 M10 1 L14 5 L10 9"
          stroke="#E8622A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function BioColumn() {
  return (
    <div className="col" data-screen-label="Biological reflex arc">
      <div className="col-label bio">Biological reflex arc</div>
      <div className="col-title">
        How the body responds before the mind catches up.
      </div>

      <div className="diagram" id="diagram-bio">
        <svg viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true">
          <g
            stroke="#7B8FAB"
            strokeWidth="1"
            strokeDasharray="3 4"
            strokeOpacity="0.7"
            fill="none"
          >
            <line x1="300" y1="260" x2="300" y2="56" />
            <polyline points="296,62 300,56 304,62" strokeOpacity="0.8" />
          </g>
        </svg>

        <div className="sup">Brain</div>
        <div
          className="uplabel bio"
          style={{ top: "145px", left: "50%", transform: "translateX(-50%)" }}
        >
          awareness follows response
        </div>

        <div className="flow">
          <div className="node">Contact / heat / pressure</div>
          <FlowArrow />
          <div className="node">Sensory receptor</div>
          <FlowArrow />
          <div className="node reflex">
            <span className="tag">Reflex</span>
            Spinal cord reflex loop
          </div>
          <FlowArrow />
          <div className="node">Motor neuron</div>
          <FlowArrow />
          <div className="node">Muscle response</div>
        </div>

        <div className="col-meta bio">
          Local loop · pre-cognitive · protective
        </div>
      </div>

      <div className="col-caption">
        The body responds before conscious thought.
      </div>
    </div>
  );
}

function ArcColumn() {
  return (
    <div className="col" data-screen-label="Arc robotic reflex layer">
      <div className="col-label arc">Arc robotic reflex layer</div>
      <div className="col-title">
        The same principle, adapted for robotic control.
      </div>

      <div className="diagram" id="diagram-arc">
        <svg viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true">
          <g
            stroke="#E8622A"
            strokeWidth="1"
            strokeDasharray="3 4"
            strokeOpacity="0.6"
            fill="none"
          >
            <line x1="300" y1="260" x2="300" y2="56" />
            <polyline points="296,62 300,56 304,62" strokeOpacity="0.75" />
          </g>
        </svg>

        <div className="sup">Robot OS / PLC / Planner</div>
        <div
          className="uplabel arc"
          style={{ top: "145px", left: "50%", transform: "translateX(-50%)" }}
        >
          state feedback to main controller
        </div>

        <div className="flow">
          <div className="node">Contact / slip / force change</div>
          <FlowArrow strokeWidth={1.6} />
          <div className="node">Sensor</div>
          <FlowArrow strokeWidth={1.6} />
          <div className="node reflex">
            <span className="tag">Reflex</span>
            Arc FPGA reflex layer
          </div>
          <FlowArrow strokeWidth={1.6} />
          <div className="node">Bounded correction output</div>
          <FlowArrow strokeWidth={1.6} />
          <div className="node">Motor controller / actuator</div>
        </div>

        <div className="col-meta arc">
          Local loop · sub-ms target · bounded output
        </div>
      </div>

      <div className="col-caption">
        The robot responds before the full digital stack completes planning.
      </div>
    </div>
  );
}

export type ReflexArcDiagramVariant = "full" | "compact";

export function ReflexArcDiagram({
  variant = "full",
  className = "",
  labelledBy,
}: {
  variant?: ReflexArcDiagramVariant;
  className?: string;
  labelledBy?: string;
}) {
  const rootClass = [
    "reflexArcRoot",
    variant === "compact" ? "is-compact" : "",
    labelledBy ? "is-modal" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClass}
      role="img"
      aria-labelledby={labelledBy}
      aria-label={
        labelledBy
          ? undefined
          : "Diagram comparing biological reflex arcs to Arc robotic reflex control"
      }
    >
      <div className="wrap">
        <header className="header">
          {!labelledBy ? (
            <div className="eyebrow">Architecture · 03</div>
          ) : null}
          <h1 id={labelledBy}>
            From biological reflex arcs to robotic reflex control.
          </h1>
          <div className="subtitle">
            Arc applies the principle of fast local sensor-to-motor response to
            robotic systems.
          </div>
        </header>

        <div className="card">
          <div className="columns">
            <BioColumn />
            <div className="vdiv" aria-hidden="true" />
            <ArcColumn />
          </div>
        </div>

        {variant === "full" ? (
          <>
            <p className="footnote">
              Biology uses local reflex loops to protect and stabilize the body.{" "}
              <span className="italic text-fg-primary">Arc</span> applies the
              same architectural principle to robotic
              systems — adding a fast local pathway alongside the existing
              controller, not replacing it.
            </p>

            <div className="mapping" aria-label="Biology to robotics mapping">
              <div className="map-head">
                <span>Biology</span>
                <span>Robotics</span>
              </div>
              {MAPPING.map((row) => (
                <div className="map-cell" key={row.bio}>
                  <div className="bio-term">{row.bio}</div>
                  <div className="map-arrow" aria-hidden="true">
                    ↓
                  </div>
                  <div className="arc-term">{row.arc}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
