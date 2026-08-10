import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ArchiveGallery } from "@/components/home/ArchiveGallery";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { images } from "@/data/estate";

const title = "The Archive — Event Nest Gallery";
const description =
  "Photographs of Event Nest: architecture, celebrations, dining and elegant details.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <>
      <PageHero
        label="07 — Gallery"
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
