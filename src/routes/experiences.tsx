import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { images } from "@/data/estate";

const title = "Premium Experiences & Amenities | Event Nest Gorakhpur";
const description =
  "Discover premium amenities at Event Nest. From dedicated host spaces to impeccable guest support, we curate experiences for your utmost comfort and joy.";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://www.eventnestbanquet.in/logo.png" },
      { property: "og:url", content: "https://www.eventnestbanquet.in/experiences" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.eventnestbanquet.in/experiences" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eventnestbanquet.in/" },
            { "@type": "ListItem", "position": 2, "name": "Experiences", "item": "https://www.eventnestbanquet.in/experiences" }
          ]
        })
      }
    ],
  }),
  component: Experiences,
});

function Experiences() {
  return (
    <>
      <PageHero
        label="06 — Experiences"
        title="Offered, never scheduled."
        intro="Beyond just providing a venue, Event Nest offers a complete premium experience. From dedicated, air-conditioned rooms for the host family to prepare in peace, to highly trained staff ready to assist at every moment, we ensure your time here is as relaxing as it is grand."
        image={images.terrace}
        alt="The rooftop terrace of the estate at golden hour behind carved screens"
      />
      <ExperienceSection />
      <FinalInvitation />
    </>
  );
}
