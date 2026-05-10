import { ReflexCanvas } from "./reflex-canvas";

export const metadata = {
  title: "Hinoki Technologies — Physical Intelligence Architecture",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ReflexPage() {
  return (
    <main className="min-h-screen bg-bg-base text-fg-primary">
      <div className="mx-auto max-w-[1200px] px-12 py-10">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
          Physical Intelligence Architecture
        </div>
        <h1 className="text-[36px] font-light leading-[1.15] tracking-[-0.02em]">
          Discrete inference vs. continuous control.
        </h1>
        <p className="mt-4 max-w-[720px] text-[16px] leading-[1.7] text-fg-secondary">
          Reference animation from the design handoff, implemented as a single
          canvas. Left: discrete steps and accumulated latency. Right: a
          continuous sensor-to-actuator path.
        </p>
      </div>

      <ReflexCanvas />

      <div className="mx-auto max-w-[1200px] px-12 pb-16 pt-10 text-[12px] text-fg-tertiary">
        Tip: resize the window to see the layout adapt.
      </div>
    </main>
  );
}

