import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/anim";

/**
 * Desktop-only decorative cursor. Purely additive — the native cursor and all
 * pointer/keyboard interaction remain intact underneath.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 1024;
    if (!fine || prefersReducedMotion()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current) return;
    const el = dot.current;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const next = target?.dataset["cursor"] ?? "";
      setLabel(next);
      setActive(Boolean(next));
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden items-center justify-center rounded-full border border-brass/70 bg-brass/10 backdrop-blur-[1px] transition-[width,height] duration-300 lg:flex"
      style={{ width: active ? 76 : 12, height: active ? 76 : 12 }}
    >
      <span className="label !text-[0.5rem] !tracking-[0.3em] text-brass transition-opacity duration-200" style={{ opacity: active ? 1 : 0 }}>
        {label}
      </span>
    </div>
  );
}
