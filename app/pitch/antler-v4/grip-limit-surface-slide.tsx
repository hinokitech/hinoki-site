import React from "react";
import gripLimitContactPatchSrc from "../../../public/assets/grip-limit-contact-patch.png";
import gripLimitRelaxationTimelineSrc from "../../../public/assets/grip-limit-relaxation-timeline.png";
import { Slide, Eyebrow, SlideFooter, SlideCitation } from "../slides";

export function GripLimitSurfaceSlide() {
  return (
    <Slide align="start">
      <Eyebrow>Physics</Eyebrow>

      <div className="grid max-w-[1640px] shrink-0 grid-cols-[minmax(0,1fr)_minmax(0,520px)] items-end gap-x-10">
        <h2 className="text-[56px] font-light leading-[1.06] tracking-[-0.022em] text-fg-primary">
          The Physics of the Grip Limit Surface
        </h2>
        <p className="pb-0.5 text-[20px] leading-[1.42] text-fg-secondary">
          Cattaneo–Mindlin partial slip — contact stability defined by the
          stick/slip boundary and viscoelastic normal-force decay on soft
          objects.
        </p>
      </div>

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-8">
        <div className="flex min-h-0 flex-col">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Contact patch · top view
          </div>
          <div className="mt-2 flex min-h-0 flex-1 items-center justify-center">
            <img
              src={gripLimitContactPatchSrc.src}
              alt="Circular contact patch with central stick zone and outer slip annulus"
              width={gripLimitContactPatchSrc.width}
              height={gripLimitContactPatchSrc.height}
              className="max-h-full max-w-full object-contain object-center"
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-col">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Core metric · relaxation timeline
          </div>
          <div className="mt-2 flex min-h-0 flex-1 items-center justify-center">
            <img
              src={gripLimitRelaxationTimelineSrc.src}
              alt="Timeline of normal force decay and stick region collapse within 15 ms"
              width={gripLimitRelaxationTimelineSrc.width}
              height={gripLimitRelaxationTimelineSrc.height}
              className="max-h-full max-w-full object-contain object-center"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 max-w-[1640px] shrink-0 rounded-[10px] border-2 border-accent bg-accent-subtle px-6 py-3">
        <p className="text-[18px] font-light leading-[1.35] tracking-[-0.015em] text-fg-primary">
          Viscoelastic stress relaxation decays normal force over{" "}
          <span className="font-semibold">~100 ms</span> on soft objects — but
          dynamic lift initiation collapses the stick region to{" "}
          <span className="font-mono font-semibold text-accent">c = 0</span>{" "}
          within{" "}
          <span className="font-semibold">15 ms</span>.
        </p>
      </div>

      <SlideCitation size="large">
        Mindlin &amp; Deresiewicz, J. Appl. Mech., 1951 · Johnson, Contact
        Mechanics, 1985 · Lakes, Viscoelastic Materials, 2009.
      </SlideCitation>

      <SlideFooter pageLabel="11 · Grip Limit Surface" />
    </Slide>
  );
}
