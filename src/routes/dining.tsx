import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { DiningSection } from "@/components/home/DiningSection";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { images } from "@/data/estate";

const title = "Banquet — Event Nest";
const description =
  "One seating, one menu, everyone together. Bundelkhandi home cooking at the long table, courtyard breakfasts and roof suppers by arrangement.";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/dining" },
    ],
    links: [{ rel: "canonical", href: "/dining" }],
  }),
  component: Dining,
});

function Dining() {
  return (
    <>
      <PageHero
        label="04 — Dining"
        title="The table"
        intro="The kitchen cooks what the season gives it, in copper the household has used for a century."
        image={images.dining}
        alt="A brass thali of regional dishes on a carved wooden table by lamplight"
      />
      <DiningSection />
      <FinalInvitation />
    </>
  );
}
