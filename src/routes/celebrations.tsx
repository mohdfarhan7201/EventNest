import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CelebrationSection } from "@/components/home/CelebrationSection";
import { ContactSection } from "@/components/site/ContactSection";
import { images } from "@/data/estate";

const title = "Celebrations & Weddings — Event Venue in Gorakhpur | Event Nest";
const description =
  "Host grand weddings, milestone birthdays, and corporate retreats at Event Nest. Experience Gorakhpur's finest celebration venue with unmatched hospitality.";

export const Route = createFileRoute("/celebrations")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://www.eventnestbanquet.in/logo.png" },
      { property: "og:url", content: "https://www.eventnestbanquet.in/celebrations" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.eventnestbanquet.in/celebrations" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eventnestbanquet.in/" },
            { "@type": "ListItem", "position": 2, "name": "Celebrations", "item": "https://www.eventnestbanquet.in/celebrations" }
          ]
        })
      }
    ],
  }),
  component: Celebrations,
});

function Celebrations() {
  return (
    <>
      <PageHero
        label="05 — Celebrations"
        title="A premium venue that turns gatherings into unforgettable celebrations."
        intro="Whether you are planning a grand wedding, an intimate family gathering, or a corporate retreat, Event Nest provides the perfect canvas. Take over our expansive open courtyard, our beautifully lit banquet hall, or the entire property to create an unforgettable experience for you and your guests."
        image={images.celebration}
        alt="The courtyard set with lanterns and a long candlelit table for an evening celebration"
      />
      <CelebrationSection />
      <ContactSection />
    </>
  );
}
