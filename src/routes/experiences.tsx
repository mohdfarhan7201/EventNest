import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { images } from "@/data/estate";

const title = "Experiences — Event Nest";
const description =
  "The archive, the copper kitchen, dawn in the garden and a walk through the town — offered, never scheduled.";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/experiences" },
    ],
    links: [{ rel: "canonical", href: "/experiences" }],
  }),
  component: Experiences,
});

function Experiences() {
  return (
    <>
      <PageHero
        label="06 — Experiences"
        title="Offered, never scheduled."
        intro="Premium amenities and dedicated spaces, curated to make your event seamless and grand."
        image={images.terrace}
        alt="The rooftop terrace of the estate at golden hour behind carved screens"
      />
      <ExperienceSection />
      <FinalInvitation />
    </>
  );
}
