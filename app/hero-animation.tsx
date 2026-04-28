"use client";

import { useEffect, useRef, useState } from "react";
import { ReflexCanvas } from "./reflex/reflex-canvas";

export function HeroAnimation({ active }: { active: boolean }) {
  const leftInView = useInViewOnce<HTMLDivElement>({
    threshold: 0.45,
    rootMargin: "0px 0px -10% 0px",
  });
  const rightInView = useInViewOnce<HTMLDivElement>({
    threshold: 0.45,
    rootMargin: "0px 0px -10% 0px",
  });

  const [isDesktop, setIsDesktop] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Desktop: staggered load on mount (scroll observer isn't useful when already visible).
  useEffect(() => {
    if (!isDesktop || !active) return;
    const t1 = window.setTimeout(() => setLeftVisible(true), 0);
    const t2 = window.setTimeout(() => setRightVisible(true), 216);
    const t3 = window.setTimeout(() => setLeftActive(true), 750);
    const t4 = window.setTimeout(() => setRightActive(true), 950);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [active, isDesktop]);

  // Mobile/tablet: scroll-activated per panel.
  useEffect(() => {
    if (isDesktop) return;
    if (!leftInView.visible) return;
    const t1 = window.setTimeout(() => setLeftVisible(true), 0);
    const t2 = window.setTimeout(() => setLeftActive(true), 750);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isDesktop, leftInView.visible]);

  useEffect(() => {
    if (isDesktop) return;
    if (!rightInView.visible) return;
    const t1 = window.setTimeout(() => setRightVisible(true), 216);
    const t2 = window.setTimeout(() => setRightActive(true), 950);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isDesktop, rightInView.visible]);

  return (
    <div className="w-full">
      <div className="flex w-full justify-center">
        <div className="w-full">
          {/* Two independent panels, each scroll-activated */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
            <div
              ref={leftInView.ref}
              className={`reveal ${leftVisible ? "is-visible" : ""}`}
            >
              <ReflexCanvas active={active && leftActive} panel="left" />
            </div>
            <div
              ref={rightInView.ref}
              className={`reveal ${rightVisible ? "is-visible" : ""} md:border-l md:border-border`}
              style={{ ["--reveal-delay" as any]: isDesktop ? "0ms" : "216ms" }}
            >
              <ReflexCanvas active={active && rightActive} panel="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function useInViewOnce<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25, ...(options ?? {}) },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options, visible]);

  return { ref, visible };
}

