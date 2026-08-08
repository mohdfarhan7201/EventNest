import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap, prefersReducedMotion } from "@/lib/anim";

/** Curtain wipe between routes. */
export function PageTransition() {
  const curtain = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = curtain.current;
    if (!el || prefersReducedMotion()) return;
    const tl = gsap.timeline();
    tl.set(el, { transformOrigin: "bottom", scaleY: 0, opacity: 1 })
      .to(el, { scaleY: 1, duration: 0.45, ease: "power3.inOut" })
      .set(el, { transformOrigin: "top" })
      .to(el, { scaleY: 0, duration: 0.6, ease: "power3.inOut", delay: 0.05 })
      .set(el, { opacity: 0 });
    return () => { tl.kill(); };
  }, [pathname]);

  return <div ref={curtain} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[92] origin-bottom scale-y-0 bg-charcoal opacity-0" />;
}
