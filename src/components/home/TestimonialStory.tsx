import { useEffect, useRef, useState } from "react";
import { useGsapContext, gsap, prefersReducedMotion } from "@/lib/anim";
import { testimonials } from "@/data/estate";
import { ChapterMark } from "@/components/site/Chapter";

export function TestimonialStory() {
  const [active, setActive] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  const ref = useGsapContext<HTMLElement>(({ root, reduced }) => {
    if (reduced) return;
    gsap.from(root.querySelectorAll("[data-fade]"), {
      opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: root, start: "top 75%" },
    });
  });

  useEffect(() => {
    if (!quoteRef.current || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      quoteRef.current.children,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" },
    );
    return () => { tween.kill(); };
  }, [active]);

  // Auto-play the testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);


  const t = testimonials[active] ?? testimonials[0]!;

  return (
    <section ref={ref} aria-labelledby="voices-heading" className="relative overflow-hidden">
      <div className="absolute inset-0">
        {testimonials.map((item, i) => (
          <img
            key={item.name}
            src={item.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
            style={{ opacity: active === i ? 0.35 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40">
        <div data-fade><ChapterMark number="11" title="Voices of Our Guests" /></div>
        <h2 id="voices-heading" className="sr-only">What guests have said</h2>

        <div ref={quoteRef} className="mt-14 max-w-4xl min-h-[220px] sm:min-h-[260px]">
          <blockquote className="display text-[1.9rem] leading-[1.18] text-ivory sm:text-[3.4rem]">
            “{t.quote}”
          </blockquote>
          <p className="label mt-10 !text-brass">{t.name}</p>
          <p className="label mt-2">{t.occasion} — {t.year}</p>
        </div>

        <div className="mt-14 flex gap-3" role="group" aria-label="Choose a guest account">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Read the account from ${item.name}`}
              aria-pressed={active === i}
              className="h-11 w-14 pt-5"
            >
              <span className={`block h-px w-full transition-colors ${active === i ? "bg-brass" : "bg-ivory/25"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
