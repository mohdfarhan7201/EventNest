import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CelebrationSection } from "@/components/home/CelebrationSection";
import { ContactSection } from "@/components/site/ContactSection";
import { images } from "@/data/estate";

const title = "Celebrations — Event Nest";
const description =
  "Weddings, private events, corporate retreats and family gatherings at a heritage estate in Bundelkhand. The courtyard seats one hundred and forty.";

export const Route = createFileRoute("/celebrations")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/celebrations" },
    ],
    links: [{ rel: "canonical", href: "/celebrations" }],
  }),
  component: Celebrations,
});

function Celebrations() {
  return (
    <>
      <PageHero
        label="05 — Celebrations"
        title="A premium venue that turns gatherings into unforgettable celebrations."
        intro="Take the courtyard, the hall, the garden — or the whole property, and everyone in your life with it."
        image={images.celebration}
        alt="The courtyard set with lanterns and a long candlelit table for an evening celebration"
      />
      <CelebrationSection />
      <ContactSection />
    </>
  );
}
