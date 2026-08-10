import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { HistoryTimeline } from "@/components/home/HistoryTimeline";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { DetailsGallery } from "@/components/home/DetailsGallery";
import { CelebrationSection } from "@/components/home/CelebrationSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { ArchiveGallery } from "@/components/home/ArchiveGallery";
import { TestimonialStory } from "@/components/home/TestimonialStory";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { ContactSection } from "@/components/site/ContactSection";
import { NearbyLocations } from "@/components/home/NearbyLocations";

const title = "Event Nest — Premium Banquet Hall & Event Venue in Gorakhpur";
const description =
  "Welcome to Event Nest, Gorakhpur's most premium banquet hall. We offer elegant courtyards and lavish banquets for your grand celebrations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://www.eventnestbanquet.in/logo.png" },
      { property: "og:url", content: "https://www.eventnestbanquet.in" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.eventnestbanquet.in" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eventnestbanquet.in/" }
          ]
        })
      }
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <CelebrationSection />
      <HistoryTimeline />
      <ArchitectureSection />
      <DetailsGallery />
      <ExperienceSection />
      <ArchiveGallery featuredOnly={true} />
      <TestimonialStory />
      <FinalInvitation />
      <NearbyLocations />
      <ContactSection chapter="14" />
    </>
  );
}
