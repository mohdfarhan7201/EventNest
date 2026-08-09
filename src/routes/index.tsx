import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { StorySection } from "@/components/home/StorySection";
import { HistoryTimeline } from "@/components/home/HistoryTimeline";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { RoomsScroller } from "@/components/home/RoomsScroller";
import { DetailsGallery } from "@/components/home/DetailsGallery";
import { DiningSection } from "@/components/home/DiningSection";
import { CelebrationSection } from "@/components/home/CelebrationSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { ArchiveGallery } from "@/components/home/ArchiveGallery";
import { TestimonialStory } from "@/components/home/TestimonialStory";
import { FinalInvitation } from "@/components/home/FinalInvitation";
import { ContactSection } from "@/components/site/ContactSection";
import { NearbyLocations } from "@/components/home/NearbyLocations";

const title = "Event Nest — Premium Banquet Hall & Deluxe Rooms in Gorakhpur";
const description =
  "Nine rooms around one open courtyard, kept by the same family since 1911. A heritage estate in Bundelkhand, India — repaired, never reinvented.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <StorySection />
      <HistoryTimeline />
      <ArchitectureSection />
      <RoomsScroller />
      <DetailsGallery />
      <DiningSection />
      <CelebrationSection />
      <ExperienceSection />
      <ArchiveGallery featuredOnly={true} />
      <TestimonialStory />
      <FinalInvitation />
      <NearbyLocations />
      <ContactSection chapter="14" />
    </>
  );
}
