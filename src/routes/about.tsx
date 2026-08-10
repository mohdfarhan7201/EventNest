import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { HistoryTimeline } from "@/components/home/HistoryTimeline";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { images } from "@/data/estate";

const title = "The Story — Event Nest";
const description =
  "Discover the story behind Event Nest, Gorakhpur's premier banquet hall. Learn how we built a venue that blends premium facilities, elegant spaces, and an uncompromising commitment to your special days.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://www.eventnestbanquet.in/logo.png" },
      { property: "og:url", content: "https://www.eventnestbanquet.in/about" },
      { name: "twitter:card", content: "summary_large_image" },
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
        title="A vision for perfect celebrations, built from the ground up."
        intro="Event Nest was founded with a single purpose: to provide Gorakhpur with a celebration venue that blends premium facilities, elegant open spaces, and an uncompromising commitment to making your special days truly unforgettable. Every corner of our property is designed to host your most cherished moments."
        image={images.grandHall}
        alt="The long hall of the estate lit by dusty afternoon light"
      />
      <HistoryTimeline />
      <ArchitectureSection />
      <FinalInvitation />
    </>
  );
}
