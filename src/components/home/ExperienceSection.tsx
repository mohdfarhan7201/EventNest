import { useGsapContext, revealHeading, revealImage, parallax } from "@/lib/anim";
import { experiences } from "@/data/estate";
import { ChapterMark, Section } from "@/components/site/Chapter";

export function ExperienceSection() {
  const ref = useGsapContext<HTMLDivElement>(({ root, reduced }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);
    root.querySelectorAll<HTMLElement>("[data-exp-frame]").forEach((frame) => {
      revealImage(frame, reduced);
      parallax(frame.querySelector("img"), reduced, 10);
    });
  });

  return (
    <Section labelledBy="experiences-heading">
      <div ref={ref}>
        <ChapterMark number="09" title="Experiences" />
        <h2 id="experiences-heading" data-heading className="display anim-hidden mt-8 max-w-3xl text-[2.6rem] leading-[1.02] sm:text-[4.4rem]">
          Days here are offered, never scheduled.
        </h2>

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {experiences.map((exp, i) => (
            <article
              key={exp.id}
              className={`grid items-center gap-8 sm:gap-14 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>figure]:order-2" : ""}`}
            >
              <figure data-exp-frame className="overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  width={1500}
                  height={1000}
                  className="aspect-[5/4] w-full scale-105 object-cover"
                />
              </figure>
              <div className={i % 2 === 1 ? "lg:pr-10" : "lg:pl-10"}>
                <p className="label text-brass">{exp.kind}</p>
                <h3 className="display mt-4 text-[2rem] leading-tight sm:text-[3rem]">{exp.title}</h3>
                <p className="mt-5 max-w-md text-sm leading-[1.9] text-muted-foreground sm:text-base">{exp.body}</p>
                <p className="label mt-8">By arrangement — on request at reservation</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
