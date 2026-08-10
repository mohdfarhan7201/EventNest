import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ArchiveGallery } from "@/components/home/ArchiveGallery";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { images } from "@/data/estate";

const title = "Gallery — Photos of Premium Banquet Hall | Event Nest Gorakhpur";
const description =
  "Explore the visual archive of Event Nest. See the stunning architecture of our grand banquet hall, elegant decor, and beautiful celebration moments.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://www.eventnestbanquet.in/logo.png" },
      { property: "og:url", content: "https://www.eventnestbanquet.in/gallery" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.eventnestbanquet.in/gallery" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eventnestbanquet.in/" },
            { "@type": "ListItem", "position": 2, "name": "Gallery", "item": "https://www.eventnestbanquet.in/gallery" }
          ]
        })
      }
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <>
      <PageHero
        label="04 — Gallery"
        title="The archive, opened."
        intro="Take a visual journey through Event Nest. Explore our beautifully designed architecture, glimpse into the lavish dining setups, and see how our versatile spaces come alive during grand celebrations. Each photograph captures the elegance and scale of the experiences we help create."
        image={images.courtyard}
        alt="The colonnaded inner courtyard in morning haze"
      />
      <ArchiveGallery heading="Every plate in the record" chapter={null} />
      <FinalInvitation />
    </>
  );
}
