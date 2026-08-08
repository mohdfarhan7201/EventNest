import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/anim";
import { estate } from "@/data/estate";
import { Emblem } from "./Emblem";

const SEEN_KEY = "baradari:archive-opened";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || sessionStorage.getItem(SEEN_KEY)) {
      setDone(true);
      return;
    }
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || !root.current) return;
    document.body.style.overflow = "hidden";
    const progress = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SEEN_KEY, "1");
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    tl.from(root.current.querySelectorAll("[data-pre-fade]"), { opacity: 0, y: 14, duration: 0.7, ease: "power2.out", stagger: 0.12 })
      .to(progress, {
        value: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(progress.value);
          if (counter.current) counter.current.textContent = String(v).padStart(3, "0");
          if (bar.current) bar.current.style.transform = `scaleX(${progress.value / 100})`;
        },
      }, "-=0.2")
      .to(root.current.querySelector("[data-pre-status]"), { opacity: 0, duration: 0.3 })
      .set(root.current.querySelector("[data-pre-status]"), { textContent: "The archive opens" })
      .to(root.current.querySelector("[data-pre-status]"), { opacity: 1, duration: 0.4 })
      .to(root.current.querySelectorAll("[data-pre-fade]"), { opacity: 0, duration: 0.5, ease: "power2.in", stagger: 0.05 }, "+=0.35")
      .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "power3.inOut" }, "-=0.2");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show || done) return null;

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal px-6"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div data-pre-fade className="flex flex-col items-center gap-5">
        <Emblem className="h-12 w-12 text-brass" />
        <span className="display text-3xl tracking-[0.2em] text-ivory sm:text-4xl">{estate.name.toUpperCase()}</span>
      </div>
      <div data-pre-fade className="mt-12 w-full max-w-xs">
        <div className="h-px w-full bg-ivory/15">
          <div ref={bar} className="h-px origin-left bg-brass" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
      <div data-pre-fade className="mt-5 flex w-full max-w-xs items-baseline justify-between">
        <span data-pre-status className="label">Loading archive</span>
        <span ref={counter} className="label !tracking-[0.2em] text-brass">000</span>
      </div>
    </div>
  );
}
