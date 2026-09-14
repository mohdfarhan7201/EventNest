import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/anim";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker and synchronised with
 * ScrollTrigger. Disabled entirely when the user prefers reduced motion.
 */
export function SmoothScroll() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
