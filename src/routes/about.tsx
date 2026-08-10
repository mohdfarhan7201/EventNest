import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { HistoryTimeline } from "@/components/home/HistoryTimeline";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { images } from "@/data/estate";

const title = "The Story — Event Nest";
const description =
  "How a twelve-doored house in Bundelkhand was built, emptied, repaired and reopened by four generations of the same family.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://www.eventnestbanquet.in/about" },
    ],
    links: [{ rel: "canonical", href: "https://www.eventnestbanquet.in/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eventnestbanquet.in/" },
            { "@type": "ListItem", "position": 2, "name": "The Story", "item": "https://www.eventnestbanquet.in/about" }
          ]
        })
      }
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        label="01 — The Story"
        title="A house that was never finished, only continued."
        intro="Four generations, three families of craftsmen, one courtyard. What follows is the record as the house keeps it."
        image={images.grandHall}
        alt="The long hall of the estate lit by dusty afternoon light"
      />
      <HistoryTimeline />
      <ArchitectureSection />
      <FinalInvitation />
    </>
  );
}
