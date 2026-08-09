import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { RoomsScroller } from "@/components/home/RoomsScroller";
import { DetailsGallery } from "@/components/home/DetailsGallery";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { images } from "@/data/estate";

const title = "Rooms & Suites — Event Nest";
const description =
  "Four heritage chambers: the Durbar Suite, the Garden Chamber, the Shutter Room and the Terrace Room. Sizes, beds and capacity in full.";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://www.eventnestbanquet.in/rooms" },
    ],
    links: [{ rel: "canonical", href: "https://www.eventnestbanquet.in/rooms" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eventnestbanquet.in/" },
            { "@type": "ListItem", "position": 2, "name": "Rooms & Suites", "item": "https://www.eventnestbanquet.in/rooms" }
          ]
        })
      }
    ],
  }),
  component: Rooms,
});

function Rooms() {
  return (
    <>
      <PageHero
        label="03 — Rooms & Suites"
        title="Chambers of rest"
        intro="No two rooms in the house are alike. Each was a room before it was a guest room, and each has kept its original name."
        image={images.room1}
        alt="A four-poster teak bed in the Durbar Suite, lit through tall shutters"
      />
      <RoomsScroller />
      <DetailsGallery />
      <FinalInvitation />
    </>
  );
}
