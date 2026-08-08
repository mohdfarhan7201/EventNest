import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ContactSection } from "@/components/site/ContactSection";
import { images } from "@/data/estate";

const title = "Contact & Enquiries — Event Nest";
const description =
  "Write to the house: reservations, celebrations and full property enquiries at Event Nest, Gorakhpur, Uttar Pradesh.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        label="09 — Contact"
        title="Write to the house."
        intro="Enquiries are read by the family, not a call centre. Expect a reply within one working day."
        image={images.heroEstate}
        alt="The lamplit entrance doors of the estate at dusk"
      />
      <ContactSection />
    </>
  );
}
