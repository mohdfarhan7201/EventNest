/**
 * CONTENT LAYER — Event Nest
 *
 * All copy, imagery metadata and structured content for the site lives here so
 * the UI stays presentational. Replace these records with the property's real
 * archive material (dates, provenance, room specs) before launch — every field
 * maps 1:1 to what is rendered.
 */
import facadeNight from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_55__1_.webp";
import buffetSetup from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_55.webp";
import entranceGate from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56.webp";
import entranceNight from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__1_.webp";
import weddingStage from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__2_.webp";
import hotelRoom from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__3_.webp";
import seatingTable from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__4_.webp";
import buffetDetails from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__5_.webp";
import grandHallSeating from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__6_.webp";

export const images = {
  heroEstate: facadeNight,
  courtyard: entranceGate,
  grandHall: grandHallSeating,
  terrace: entranceNight,
  garden: entranceGate,
  room1: hotelRoom,
  room2: hotelRoom,
  room3: hotelRoom,
  dining: buffetSetup,
  celebration: weddingStage,
  detailBrass: buffetDetails,
  detailCarving: seatingTable,
};

export const estate = {
  name: "Event Nest",
  shortName: "Event Nest",
  established: "2024",
  descriptor: "Premium Banquet Hall & Event Venue",
  location: "Event Nest, Kunraghat, Gorakhpur, Uttar Pradesh, India",
  city: "Gorakhpur",
  phone: "+91 7525033416",
  email: "eventnest12@gmail.com",
  mapQuery: "Event+Nest+Kunraghat+Gorakhpur+Uttar+Pradesh",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/eventnestbanquethall?igsh=MW5oOWtxdmo5ZnE5cQ==" },
    { label: "Facebook", href: "https://www.facebook.com/people/EventNest-Best-Banquet-Hall-in-Gorakhpur/61588769416706/#" },
    { label: "WhatsApp", href: "https://wa.me/917525033416" },
  ],
};

export const navItems = [
  { index: "01", label: "The Story", to: "/about", image: images.courtyard },
  { index: "02", label: "The Property", to: "/about", image: images.grandHall },
  { index: "03", label: "Celebrations", to: "/celebrations", image: images.celebration },
  { index: "04", label: "Experiences", to: "/experiences", image: images.terrace },
  { index: "05", label: "Gallery", to: "/gallery", image: images.detailCarving },
  { index: "06", label: "Journal", to: "/journal", image: images.garden },
  { index: "07", label: "Contact", to: "/contact", image: images.heroEstate },
] as const;

export type TimelineEntry = {
  year: string;
  title: string;
  body: string;
  image: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "2024",
    title: "The First Stone",
    body: "Event Nest was envisioned as a premium destination in Gorakhpur to redefine celebrations. From the very beginning, our goal was to offer a single, expansive open courtyard coupled with an elegantly designed banquet facility that could host the grandest of events while maintaining an intimate, welcoming atmosphere.",
    image: images.courtyard,
  },
  {
    year: "2024",
    title: "The Banquet Experience",
    body: "We officially opened our doors to become the city's most sought-after celebration space. With an unbroken run of beautifully lit halls, customized decor setups, and a highly professional hospitality team, Event Nest quickly became the signature venue for weddings, milestone birthdays, and lavish family receptions.",
    image: images.grandHall,
  },
  {
    year: "Today",
    title: "The Event Nest Receives",
    body: "Today, we continue to elevate the standard of hospitality. We offer spacious, air-conditioned getting-ready rooms for the host family, ensuring absolute comfort amidst the celebration. Our clean environments, ample parking, and unwavering commitment to quality mean that your special day is executed flawlessly from start to finish.",
    image: images.terrace,
  },
];

export type ArchitectureDetail = {
  id: string;
  name: string;
  note: string;
  meta: string;
  image: string;
};

export const architecture: ArchitectureDetail[] = [
  { id: "banquet", name: "The Banquet Hall", note: "An expansive, elegantly designed hall featuring premium lighting, modern acoustics, and flexible seating arrangements tailored for grand weddings and receptions.", meta: "Space 01 — Banquet Hall", image: images.courtyard },
  { id: "spaces", name: "Host Spaces", note: "Dedicated, air-conditioned changing areas ensuring the host family can relax, prepare, and enjoy moments of quiet before the celebrations begin.", meta: "Space 02 — Private Rooms", image: images.detailCarving },
  { id: "hall", name: "The Grand Hall", note: "A single, unbroken stretch of beautiful architecture, lit end-to-end to create a majestic backdrop for your most important photographs and ceremonies.", meta: "Space 03 — Grand Hall", image: images.grandHall },
  { id: "parking", name: "The Parking Area", note: "Convenience is key. We offer ample, secure parking space to accommodate all your guests, ensuring a hassle-free arrival and departure experience.", meta: "Space 04 — Facilities", image: images.garden },
  { id: "support", name: "Guest Support", note: "A highly trained and supportive on-ground staff dedicated to catering to your every need, making your event seamless, relaxing, and truly memorable.", meta: "Space 05 — Hospitality", image: images.terrace },
];

export type DiningVenue = {
  id: string;
  name: string;
  cuisine: string;
  atmosphere: string;
  hours: string;
  image: string;
};

export const diningVenues: DiningVenue[] = [
  { id: "banquet-hall", name: "Event Nest Banquet", cuisine: "Various Catering Options", atmosphere: "Elegant Celebration Space", hours: "By Booking", image: images.dining },
  { id: "breakfast", name: "Morning Breakfast", cuisine: "Regional & Continental", atmosphere: "Relaxing environment", hours: "07:00 — 10:30, daily", image: images.courtyard },
  { id: "supper", name: "Special Supper", cuisine: "Custom Menu", atmosphere: "Open sky, by arrangement", hours: "By reservation", image: images.terrace },
];

export const diningWords = ["Elegant", "Premium", "Comfortable", "Memorable"];

export type Celebration = { id: string; title: string; body: string; image: string };

export const celebrationTypes: Celebration[] = [
  { id: "weddings", title: "Weddings & Receptions", body: "Step into a venue where fairytales come to life. With our breathtaking banquet hall, customizable decor options, and flawless catering arrangements, your wedding day will be a majestic celebration remembered by all your guests for years to come.", image: images.celebration },
  { id: "birthdays", title: "Milestone Birthdays", body: "Whether it is a sweet sixteen, a golden jubilee, or a fun-filled kid's party, our vibrant spaces can be transformed to match any theme. Celebrate life's most precious milestones with your loved ones in absolute style and comfort.", image: images.grandHall },
  { id: "corporate", title: "Corporate Events", body: "Take your business gatherings out of the boardroom. Event Nest provides a professional yet refreshing environment for corporate offsites, product launches, and annual company retreats, complete with high-end facilities and catering.", image: images.terrace },
  { id: "gatherings", title: "Family Gatherings", body: "Bring the whole family together under one roof. Our spacious layouts and warm hospitality make Event Nest the perfect setting for anniversaries, engagements, and grand family reunions where every moment is cherished.", image: images.garden },
];

export type Experience = { id: string; kind: string; title: string; body: string; image: string };

export const experiences: Experience[] = [
  { id: "weddings", kind: "Events", title: "The Perfect Wedding Venue", body: "Experience unparalleled luxury with our premium wedding arrangements. From the grand entrance to the spectacular stage setup, every corner of Event Nest is designed to make your special day feel like royalty.", image: images.detailCarving },
  { id: "family", kind: "Gathering", title: "Grand Family Events", body: "Host large-scale family celebrations without compromising on intimacy. Our spacious halls are thoughtfully designed to keep the energy high and the conversations flowing among all your guests.", image: images.dining },
  { id: "stay", kind: "Stay", title: "Comfortable Facilities", body: "We understand that hosting an event is tiring. That is why we offer dedicated, fully air-conditioned preparation rooms where you and your close family can relax, refresh, and get ready in peace.", image: images.garden },
  { id: "leisure", kind: "Leisure", title: "A Relaxing Atmosphere", body: "Beyond the grandeur, Event Nest offers a serene and welcoming vibe. Enjoy the evening breeze in our open courtyards and let our attentive staff take care of every minor detail while you celebrate.", image: images.heroEstate },
];

export type GalleryItem = {
  id: string;
  category: "Architecture" | "Dining" | "Celebrations" | "People" | "Details";
  caption: string;
  year: string;
  image: string;
  span?: "tall" | "wide";
  featured?: boolean;
};

export const gallery: GalleryItem[] = [
  { id: "g1", category: "Architecture", caption: "The Event Nest facade at night", year: "2024", image: facadeNight, span: "wide", featured: true },
  { id: "g2", category: "Architecture", caption: "The grand entrance doors", year: "2024", image: entranceNight, span: "tall", featured: true },
  { id: "g3", category: "Architecture", caption: "Courtyard view", year: "2024", image: entranceGate, featured: true },
  { id: "g4", category: "Details", caption: "Host & Bridal Space", year: "2024", image: hotelRoom, featured: true },
  { id: "g5", category: "Architecture", caption: "The grand hall seating", year: "2024", image: grandHallSeating, featured: true },
  { id: "g6", category: "Celebrations", caption: "Wedding stage setup", year: "Today", image: weddingStage, span: "wide" },
  { id: "g7", category: "Details", caption: "Elegant banquet seating", year: "2024", image: seatingTable },
  { id: "g8", category: "Details", caption: "Premium buffet details", year: "2024", image: buffetDetails },
  { id: "g9", category: "Dining", caption: "The lavish buffet setup", year: "Today", image: buffetSetup, featured: true },
];

export const galleryFilters = ["All", "Architecture", "Dining", "Celebrations", "People", "Details"] as const;

export type Testimonial = { quote: string; name: string; occasion: string; year: string; image: string };

export const testimonials: Testimonial[] = [
  { quote: "Event Nest completely transformed our wedding day. The banquet hall is absolutely beautiful, the arrangements were flawless, and the atmosphere was magical. It is truly the perfect place for grand celebrations.", name: "Rahul Sharma", occasion: "Wedding", year: "2024", image: images.celebration },
  { quote: "What impressed us the most were the comfortable getting-ready spaces and the incredibly supportive staff. The clean environment and attention to detail made our event absolutely stress-free. Highly recommended!", name: "Priya Verma", occasion: "Engagement Ceremony", year: "2024", image: images.courtyard },
  { quote: "Hands down the best venue in Gorakhpur for any large gathering. We hosted a massive family reunion, and the space accommodated everyone perfectly. We arrived as guests and left with lifelong memories.", name: "The Mehta family", occasion: "Family Celebration", year: "2024", image: images.grandHall },
];

export type JournalEntry = { slug: string; title: string; excerpt: string; date: string; category: string; image: string };

export const journal: JournalEntry[] = [
  { slug: "welcome", title: "Welcome To Event Nest", excerpt: "Discover Gorakhpur's newest premium destination. Event Nest is redefining how celebrations are hosted, blending modern luxury with warm, traditional hospitality.", date: "2024", category: "Updates", image: images.detailCarving },
  { slug: "banquet", title: "The Ultimate Banquet Experience", excerpt: "Take a closer look at our beautifully designed banquet hall. From expansive open spaces to intricate interior decor, see why Event Nest is the perfect backdrop for your events.", date: "2024", category: "The Venue", image: images.dining },
  { slug: "celebration", title: "Celebrate Your Big Day With Us", excerpt: "A look back at some of the most magical weddings and events we have hosted. Read the stories, see the decor, and get inspired for your own upcoming celebration.", date: "2024", category: "Events", image: images.garden },
];

export const details = [
  { image: images.detailBrass, caption: "Premium Finishes", meta: "Elegant Decor" },
  { image: images.detailCarving, caption: "Spacious Layouts", meta: "Designed for comfort" },
  { image: images.courtyard, caption: "Grand Entrance", meta: "A welcoming vibe" },
  { image: images.dining, caption: "Lavish Buffets", meta: "Professional catering space" },
];

export type NearbyLocation = {
  id: string;
  name: string;
  description: string;
  time: string;
  icon: any; // We will map this in the component
};

export const nearbyLocations: Omit<NearbyLocation, 'icon'>[] = [
  { id: "railway-station", name: "Gorakhpur Railway Station", description: "Main railway junction for easy guest arrivals", time: "10 MIN" },
  { id: "airport", name: "Mahayogi Gorakhnath Airport", description: "Domestic airport for out-of-town guests", time: "25 MIN" },
  { id: "bus-stand", name: "Nausadh Bus Stand", description: "Major bus terminus connecting nearby cities", time: "05 MIN" },
  { id: "gorakhnath-temple", name: "Gorakhnath Temple", description: "The famous historic temple of Gorakhpur", time: "20 MIN" },
  { id: "city-mall", name: "City Mall", description: "Premium shopping and entertainment hub", time: "15 MIN" },
  { id: "aiims", name: "AIIMS Gorakhpur", description: "Premier medical institute and landmark", time: "12 MIN" },
];
