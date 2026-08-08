import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type RefObject } from "react";

let registered = false;

/** Register GSAP plugins once, client-side only. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktop() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 1024px)").matches;
}

/**
 * Scoped GSAP context bound to a container ref. Everything created inside the
 * callback is reverted (and its ScrollTriggers killed) on unmount.
 */
export function useGsapContext<T extends HTMLElement>(
  setup: (ctx: { root: T; reduced: boolean; desktop: boolean }) => void,
  deps: unknown[] = [],
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    registerGsap();
    const reduced = prefersReducedMotion();
    const desktop = isDesktop();
    const ctx = gsap.context(() => setup({ root, reduced, desktop }), root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/** Split an element's text into word spans (each wrapped for masked reveal). */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset["split"] === "true") {
    return Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
  }
  const words = (el.textContent ?? "").split(/\s+/).filter(Boolean);
  el.textContent = "";
  const nodes: HTMLElement[] = [];
  words.forEach((word, i) => {
    const mask = document.createElement("span");
    mask.style.display = "inline-block";
    mask.style.overflow = "hidden";
    mask.style.verticalAlign = "top";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.dataset["word"] = "";
    inner.textContent = word;
    mask.appendChild(inner);
    el.appendChild(mask);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    nodes.push(inner);
  });
  el.dataset["split"] = "true";
  return nodes;
}

/** Standard heading reveal: masked words rising into place on scroll. */
export function revealHeading(el: HTMLElement, reduced: boolean) {
  el.classList.remove("anim-hidden");
  if (reduced) return;
  const words = splitWords(el);
  gsap.set(words, { yPercent: 110 });
  gsap.to(words, {
    yPercent: 0,
    duration: 1.1,
    ease: "power3.out",
    stagger: 0.055,
    scrollTrigger: { trigger: el, start: "top 85%" },
  });
}

/** Fade-and-rise for supporting content. */
export function revealBlock(targets: gsap.TweenTarget, reduced: boolean, stagger = 0.08) {
  gsap.set(targets, { opacity: 1 });
  if (reduced) return;
  gsap.from(targets, {
    opacity: 0,
    y: 28,
    duration: 0.9,
    ease: "power2.out",
    stagger,
    scrollTrigger: { trigger: targets as gsap.DOMTarget, start: "top 88%" },
  });
}

/** Clip-path + scale reveal for editorial imagery. */
export function revealImage(wrapper: HTMLElement, reduced: boolean) {
  const img = wrapper.querySelector("img");
  if (reduced) {
    gsap.set(wrapper, { clipPath: "inset(0% 0% 0% 0%)" });
    return;
  }
  gsap
    .timeline({ scrollTrigger: { trigger: wrapper, start: "top 85%" } })
    .fromTo(wrapper, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.out" })
    .fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
}

/** Gentle vertical parallax on an image inside an overflow-hidden frame. */
export function parallax(img: Element | null, reduced: boolean, amount = 12) {
  if (!img || reduced) return;
  gsap.fromTo(
    img,
    { yPercent: -amount / 2 },
    {
      yPercent: amount / 2,
      ease: "none",
      scrollTrigger: { trigger: img.parentElement ?? img, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}

export { gsap, ScrollTrigger };
