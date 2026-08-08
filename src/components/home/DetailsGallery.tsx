import { useGsapContext, revealHeading, gsap, parallax } from "@/lib/anim";
import { details } from "@/data/estate";
import { ChapterMark, Section } from "@/components/site/Chapter";

export function DetailsGallery() {
  const ref = useGsapContext<HTMLDivElement>(({ root, reduced }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);
    root.querySelectorAll<HTMLElement>("[data-detail]").forEach((fig, i) => {
      gsap.set(fig, { opacity: 1 });
      if (reduced) return;
      gsap.from(fig, {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: fig, start: "top 90%" },
        delay: (i % 2) * 0.1,
      });
      parallax(fig.querySelector("img"), reduced, 8 + (i % 3) * 5);
    });
  });

  return (
    <Section labelledBy="details-heading" className="paper">
      <div ref={ref}>
        <ChapterMark number="06" title="The Details" />
        <h2 id="details-heading" data-heading className="display anim-hidden mt-8 max-w-2xl text-[2.6rem] leading-[1.02] sm:text-[4.4rem]">
          It is in the details.
        </h2>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-12">
          {details.map((d, i) => {
            const layouts = [
              "sm:col-span-5 sm:col-start-1",
              "sm:col-span-4 sm:col-start-8 sm:mt-24",
              "sm:col-span-4 sm:col-start-2 sm:mt-4",
              "sm:col-span-5 sm:col-start-7 sm:mt-16",
            ];
            return (
              <figure key={d.caption} data-detail className={`opacity-0 ${layouts[i % layouts.length]}`}>
                <div className="overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.caption}
                    loading="lazy"
                    width={1000}
                    height={1200}
                    className="aspect-[4/5] w-full scale-110 object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-3">
                  <span className="label">{d.caption}</span>
                  <span className="label text-brass">{d.meta}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
