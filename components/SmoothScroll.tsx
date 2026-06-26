"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";

/**
 * Page-wide smooth scrolling (Lenis). It drives the real document scroll with a
 * weighted, cinematic lerp — so position:sticky pins and every scroll-position
 * listener on the page keep working, but motion glides instead of snapping.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // Lower lerp = heavier / more "weighted". Tuned for an Apple/Linear glide.
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    setLenis(lenis);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
