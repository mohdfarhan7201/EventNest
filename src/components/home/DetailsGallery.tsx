import { useGsapContext, revealHeading, gsap, parallax } from "@/lib/anim";
import { details } from "@/data/estate";
import { ChapterMark, Section } from "@/components/site/Chapter";

export function DetailsGallery() {
  const ref = useGsapContext<HTMLDivElement>(({ root, reduced }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);
    
    const figures = root.querySelectorAll<HTMLElement>("[data-detail]");
    if (reduced) {
      gsap.set(figures, { opacity: 1, clipPath: "inset(0%)", scale: 1 });
      return;
    }
    
    gsap.from(figures, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: root,
        start: "top 80%",
      },
    });

    figures.forEach((fig) => {
      parallax(fig.querySelector("img"), reduced, 8);
    });
  });

  return (
    <Section labelledBy="details-heading" className="paper">
      <div ref={ref}>
        <ChapterMark number="06" title="The Details" />
        <h2 id="details-heading" data-heading className="display anim-hidden mt-8 max-w-2xl text-[2.6rem] leading-[1.02] sm:text-[4.4rem]">
          It is in the details.
        </h2>

        {/* Tight grid layout for less space, group for hover animations, subtle stagger for premium feel */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-12">
          {details.map((d, i) => (
            <figure
              key={d.caption}
              data-detail
              className={`group relative overflow-hidden ${
                i % 2 !== 0 ? "lg:mt-16" : ""
              }`}
            >
              <div className="overflow-hidden">
                <img
                  src={d.image}
                  alt={d.caption}
                  loading="lazy"
                  width={1000}
                  height={1200}
                  // Clean, slightly taller aspect ratio with smooth hover zoom
                  className="aspect-[3/4] w-full scale-110 object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-125"
                />
              </div>
              <figcaption className="mt-5 flex flex-col gap-1 border-t border-border/60 pt-4">
                <span className="label font-medium">{d.caption}</span>
                <span className="text-[10px] uppercase tracking-widest text-brass transition-colors duration-500 group-hover:text-black">
                  {d.meta}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
