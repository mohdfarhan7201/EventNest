import { Link } from "@tanstack/react-router";
import { useGsapContext, gsap, revealHeading } from "@/lib/anim";
import { diningWords, images } from "@/data/estate";
import { ChapterMark } from "@/components/site/Chapter";

export function DiningSection() {
  const ref = useGsapContext<HTMLElement>(({ root, reduced }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);
    const words = gsap.utils.toArray<HTMLElement>("[data-word-cue]", root);
    const frame = root.querySelector<HTMLElement>("[data-dish]");
    gsap.set(root.querySelectorAll("[data-venue]"), { opacity: 1 });

    if (reduced) {
      gsap.set(words, { opacity: 1 });
      gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    gsap.set(words, { opacity: 0, y: 30 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.querySelector("[data-cue-stage]"), start: "top 70%", end: "bottom 45%", scrub: 0.6 },
    });
    words.forEach((w, i) => {
      tl.to(w, { opacity: 1, y: 0, duration: 0.5 }, i * 0.8);
      if (i < words.length - 1) tl.to(w, { opacity: 0.18, y: -20, duration: 0.5 }, i * 0.8 + 0.55);
    });

    if (frame) {
      gsap.fromTo(frame, { clipPath: "inset(0% 0% 100% 0%)" }, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top 85%", end: "top 35%", scrub: 0.6 },
      });
      gsap.fromTo(frame.querySelector("img"), { scale: 1.2 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  });

  return (
    <section ref={ref} aria-labelledby="dining-heading" className="px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <ChapterMark number="07" title="Dining" />
        <h2 id="dining-heading" data-heading className="display anim-hidden mt-8 text-[3rem] leading-none sm:text-[5.5rem] lg:text-[7rem]">
          The table
        </h2>

        <div data-cue-stage className="mt-20 flex flex-col items-start gap-2 sm:mt-28 sm:gap-4">
          {diningWords.map((word, i) => (
            <span
              key={word}
              data-word-cue
              className="display text-[2.4rem] leading-none text-brass sm:text-[4.5rem]"
              style={{ marginLeft: `${i * 6}vw` }}
            >
              {word}
            </span>
          ))}
        </div>

        <figure data-dish className="mt-20 overflow-hidden sm:mt-28">
          <img
            src={images.dining}
            alt="A brass thali of Bundelkhandi dishes lit by a single oil lamp"
            loading="lazy"
            width={1408}
            height={1008}
            className="aspect-[16/10] w-full object-cover"
          />
          <figcaption className="label mt-4">One seating. One menu. Served at twenty hundred hours.</figcaption>
        </figure>

      </div>
    </section>
  );
}
