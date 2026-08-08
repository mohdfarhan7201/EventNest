import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { images, journal } from "@/data/estate";
import { Section } from "@/components/site/Chapter";
import { useGsapContext, revealImage, revealBlock } from "@/lib/anim";

const title = "Journal — Event Nest";
const description =
  "Notes from the house: on lime plaster, the argument for one table, and the hour the garden was designed around.";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/journal" },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: Journal,
});

function Journal() {
  const ref = useGsapContext<HTMLDivElement>(({ root, reduced }) => {
    root.querySelectorAll<HTMLElement>("[data-frame]").forEach((f) => revealImage(f, reduced));
    revealBlock(root.querySelectorAll("[data-fade]"), reduced, 0.08);
  });

  return (
    <>
      <PageHero
        label="08 — Journal"
        title="Notes kept by the house."
        intro="Occasional writing on materials, meals and repair, by whoever is keeping the archive that season."
        image={images.garden}
        alt="The estate garden at dawn with its water channel filling"
      />
      <Section labelledBy="journal-heading">
        <h2 id="journal-heading" className="sr-only">Journal entries</h2>
        <div ref={ref} className="flex flex-col gap-16 sm:gap-24">
          {journal.map((entry) => (
            <article key={entry.slug} className="grid gap-8 sm:grid-cols-[0.9fr_1.1fr] sm:gap-14">
              <figure data-frame className="overflow-hidden">
                <img src={entry.image} alt={entry.title} loading="lazy" width={1400} height={1000} className="aspect-[4/3] w-full object-cover" />
              </figure>
              <div data-fade className="sm:pt-4">
                <p className="label text-brass">{entry.category} — {entry.date}</p>
                <h3 className="display mt-4 text-[1.9rem] leading-tight sm:text-[2.8rem]">{entry.title}</h3>
                <p className="mt-5 max-w-md text-sm leading-[1.9] text-muted-foreground sm:text-base">{entry.excerpt}</p>
                <p className="label mt-7">Full entry available at the house</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <FinalInvitation />
    </>
  );
}
