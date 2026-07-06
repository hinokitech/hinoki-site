import React from "react";

function BenchmarkSlideImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#0a0e12]">
      {/* 1024×769 deck screenshots — fill slide, no artificial upscale cap */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={1024}
        height={769}
        decoding="sync"
        className="h-full w-full object-contain object-center"
      />
    </div>
  );
}

export function DualCameraBenchmarkHardwareSetupSlide() {
  return (
    <BenchmarkSlideImage
      src="/assets/dual-camera-benchmark-hardware-setup.png?v=4"
      alt="Dual-camera sensorimotor benchmark hardware and experimental setup"
    />
  );
}

export function DualCameraBenchmarkVisualResultsSlide() {
  return (
    <BenchmarkSlideImage
      src="/assets/dual-camera-benchmark-visual-results.png?v=4"
      alt="Dual-camera sensorimotor benchmark visual results comparison"
    />
  );
}

export function DualCameraBenchmarkBaselineFailsSlide() {
  return (
    <BenchmarkSlideImage
      src="/assets/dual-camera-benchmark-baseline-fails.png?v=4"
      alt="Dual-camera benchmark results where the baseline fails"
    />
  );
}
