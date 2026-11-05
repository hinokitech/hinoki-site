"use client";

import { useEffect, useState, type RefObject } from "react";

// True once the element comes within `rootMargin` of the screen, and stays
// true. Used to hold back what sits far down the page (video posters) so it
// doesn't compete with the first paint for bandwidth.
export function useNear(ref: RefObject<Element | null>, rootMargin = "800px 0px") {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, near]);

  return near;
}
