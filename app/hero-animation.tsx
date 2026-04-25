import { ReflexCanvas } from "./reflex/reflex-canvas";

export function HeroAnimation() {
  return (
    <div className="w-full">
      <div className="flex w-full justify-center">
        <div className="w-full">
          <ReflexCanvas />
        </div>
      </div>
    </div>
  );
}

