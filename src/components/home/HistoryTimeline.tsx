import { useGsapContext, gsap } from "@/lib/anim";
import { timeline } from "@/data/estate";
import { ChapterMark } from "@/components/site/Chapter";

/**
 * Pinned cinematic timeline: the section holds while entries cross-dissolve,
 * the year counts up in scale, and the image behind it changes.
 */
export function HistoryTimeline() {
  const ref = useGsapContext<HTMLElement>(({ root, reduced }) => {
    const panels = gsap.utils.toArray<HTMLElement>("[data-entry]", root);
    root.querySelectorAll(".anim-hidden").forEach((el) => el.classList.remove("anim-hidden"));
    if (reduced || panels.length === 0) {
      gsap.set(panels, { opacity: 1, position: "relative" });
      return;
    }

    gsap.set(panels, { opacity: 0 });
    gsap.set(panels[0]!, { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${panels.length * 90}%`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    panels.forEach((panel, i) => {
      const img = panel.querySelector("[data-entry-img]");
      const year = panel.querySelector("[data-entry-year]");
      const text = panel.querySelectorAll("[data-entry-text]");
      if (i > 0) {
        tl.to(panels[i - 1]!, { opacity: 0, duration: 0.4 }, ">");
        tl.to(panel, { opacity: 1, duration: 0.5 }, "<");
      }
      tl.fromTo(img, { scale: 1.12, yPercent: 4 }, { scale: 1, yPercent: 0, duration: 1.4, ease: "none" }, i === 0 ? 0 : "<");
      tl.fromTo(year, { yPercent: 40, opacity: 0.2 }, { yPercent: 0, opacity: 1, duration: 0.6 }, "<");
      tl.fromTo(text, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, "<0.1");
      tl.to({}, { duration: 0.6 });
    });

    const bar = root.querySelector("[data-progress]");
    if (bar) {
      gsap.fromTo(bar, { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: () => `+=${panels.length * 90}%`, scrub: true },
      });
    }
  });

  return (
    <section ref={ref} aria-labelledby="timeline-heading" className="relative h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        {timeline.map((entry) => (
          <article
            key={entry.year}
            data-entry
            className="absolute inset-0"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                data-entry-img
                src={entry.image}
                alt={`${entry.year} — ${entry.title}`}
                loading="lazy"
                width={1600}
                height={1100}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-charcoal/72" />
            </div>

            <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-8">
              <span data-entry-year className="display block text-[5rem] leading-none text-brass sm:text-[10rem] lg:text-[13rem]">
                {entry.year}
              </span>
              <h3 data-entry-text className="display mt-4 text-3xl sm:text-5xl">{entry.title}</h3>
              <p data-entry-text className="mt-5 max-w-lg text-sm leading-[1.9] text-ivory/75 sm:text-base">{entry.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-28">
        <ChapterMark number="03" title="The Years That Shaped Us" />
        <h2 id="timeline-heading" className="sr-only">The years that shaped Event Nest</h2>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-ivory/15">
        <div data-progress className="h-px origin-left bg-brass" />
      </div>
    </section>
  );
}
