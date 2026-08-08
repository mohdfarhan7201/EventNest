import { Link } from "@tanstack/react-router";
import { useGsapContext, gsap, revealHeading } from "@/lib/anim";
import { diningVenues, diningWords, images } from "@/data/estate";
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

    gsap.from(root.querySelectorAll("[data-venue]"), {
      opacity: 0, y: 34, duration: 0.9, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: root.querySelector("[data-venues]"), start: "top 85%" },
    });
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

        <div data-venues className="mt-20 grid gap-10 md:grid-cols-3">
          {diningVenues.map((venue) => (
            <article key={venue.id} data-venue className="border-t border-border pt-6 opacity-0">
              <div className="overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  loading="lazy"
                  width={1400}
                  height={1000}
                  className="aspect-[5/4] w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.04]"
                />
              </div>
              <h3 className="display mt-6 text-2xl">{venue.name}</h3>
              <dl className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex gap-3"><dt className="label w-20 shrink-0">Cuisine</dt><dd>{venue.cuisine}</dd></div>
                <div className="flex gap-3"><dt className="label w-20 shrink-0">Room</dt><dd>{venue.atmosphere}</dd></div>
                <div className="flex gap-3"><dt className="label w-20 shrink-0">Hours</dt><dd>{venue.hours}</dd></div>
              </dl>
              <Link to="/dining" data-cursor="Open" className="label mt-6 inline-flex border-b border-current pb-1 transition-colors hover:text-brass">
                Reserve the table
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
