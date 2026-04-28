"use client";

import type { RefObject } from "react";
import { ReflexCanvas } from "./reflex/reflex-canvas";

export function HeroAnimation({
  leftVisible,
  rightVisible,
  leftActive,
  rightActive,
  leftRef,
  rightRef,
}: {
  leftVisible: boolean;
  rightVisible: boolean;
  leftActive: boolean;
  rightActive: boolean;
  leftRef?: RefObject<HTMLDivElement | null>;
  rightRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="w-full">
      <div className="flex w-full justify-center">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
            <div
              ref={leftRef}
              className={`reveal ${leftVisible ? "is-visible" : ""}`}
            >
              <ReflexCanvas active={leftActive} panel="left" />
            </div>
            <div
              ref={rightRef}
              className={`reveal ${rightVisible ? "is-visible" : ""} md:border-l md:border-border`}
              style={{ ["--reveal-delay" as never]: "280ms" }}
            >
              <ReflexCanvas active={rightActive} panel="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
