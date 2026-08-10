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
    
    // Premium stagger reveal animation for the whole grid
    gsap.fromTo(
      figures,
      {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 40,
        opacity: 0,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: root.querySelector(".grid"),
          start: "top 80%",
        },
      }
    );

    figures.forEach((fig, i) => {
      // Gentle parallax on each image to keep it dynamic
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

        {/* Tight grid layout for less space, group for hover animations */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((d) => (
            <figure key={d.caption} data-detail className="group opacity-0 relative overflow-hidden">
              <div className="overflow-hidden">
                <img
                  src={d.image}
                  alt={d.caption}
                  loading="lazy"
                  width={1000}
                  height={1200}
                  // Clean, square-ish aspect ratio with smooth hover zoom
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
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
