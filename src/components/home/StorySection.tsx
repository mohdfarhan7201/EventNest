import { Link } from "@tanstack/react-router";
import { useGsapContext, revealHeading, revealBlock, revealImage, parallax } from "@/lib/anim";
import { images, estate } from "@/data/estate";
import { ChapterMark, Section } from "@/components/site/Chapter";

export function StorySection() {
  const ref = useGsapContext<HTMLDivElement>(({ root, reduced }) => {
    const h = root.querySelector<HTMLElement>("[data-heading]");
    if (h) revealHeading(h, reduced);
    revealBlock(root.querySelectorAll("[data-fade]"), reduced);
    const frame = root.querySelector<HTMLElement>("[data-frame]");
    if (frame) {
      revealImage(frame, reduced);
      parallax(frame.querySelector("img"), reduced, 10);
    }
  });

  return (
    <Section labelledBy="story-heading" className="paper">
      <div ref={ref}>
        <ChapterMark number="02" title="A Place With a Memory" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="flex flex-col gap-12 lg:pt-4">
            <div>
              <p data-fade className="label">Archive note</p>
              <p data-fade className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Ledger 3, folio 118. The house is entered simply as <em>“Event Nest, under construction”</em> —
                and it would remain unfinished for two more seasons until the rain stopped.
              </p>
              <p data-fade className="label mt-10">{estate.city}, India</p>
            </div>

            <figure data-frame className="overflow-hidden rounded-md max-w-[280px] sm:max-w-sm">
              <img
                src={images.courtyard}
                alt="The inner courtyard colonnade of the house in morning haze"
                loading="lazy"
                width={600}
                height={750}
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="label mt-4">The courtyard, unchanged since {estate.established}</figcaption>
            </figure>
          </div>

          <div>
            <h2 id="story-heading" data-heading className="display anim-hidden text-[2.6rem] leading-[1.02] sm:text-[4rem] lg:text-[4.6rem]">
              Some houses are built. This one was remembered into being.
            </h2>
            <p data-fade className="mt-8 max-w-xl text-base leading-[1.85] text-muted-foreground">
              Event Nest was raised for a family that travelled often and returned slowly. Everything in it was made
              to survive absence: lime that breathes, teak that swells with the monsoon, stone floors that hold the cool
              of the night until noon.
            </p>
            <p data-fade className="mt-5 max-w-xl text-base leading-[1.85] text-muted-foreground">
              Nothing here has been styled to look old. It simply was not thrown away. What you walk through is a working
              archive — repaired in the same materials, by the same three families of craftsmen, for over a century.
            </p>
            <Link
              data-fade
              data-cursor="Open"
              to="/about"
              className="label mt-10 inline-flex items-center gap-3 border-b border-current pb-1 text-foreground transition-colors hover:text-brass"
            >
              Read the full history
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
