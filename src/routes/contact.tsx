import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ContactSection } from "@/components/site/ContactSection";
import { images } from "@/data/estate";

const title = "Contact & Enquiries — Event Nest";
const description =
  "Contact Event Nest: reservations, celebrations and full property enquiries in Gorakhpur, Uttar Pradesh.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://www.eventnestbanquet.in/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.eventnestbanquet.in/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eventnestbanquet.in/" },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.eventnestbanquet.in/contact" }
          ]
        })
      }
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        label="09 — Contact"
        title="Reach out to Event Nest."
        intro="We believe that every grand event begins with a great conversation. Enquiries are handled directly by our dedicated management team to ensure you get personalized attention. Reach out to discuss your upcoming celebrations, and expect a prompt, detailed reply within one working day."
        image={images.heroEstate}
        alt="The lamplit entrance doors of the estate at dusk"
      />
      <ContactSection />
    </>
  );
}
