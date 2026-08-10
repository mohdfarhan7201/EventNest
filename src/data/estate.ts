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
    body: "Event Nest is raised as a premium destination in Gorakhpur, offering a single open courtyard and elegant banquet facilities.",
    image: images.courtyard,
  },
  {
    year: "2024",
    title: "The Doors Open",
    body: "We welcomed our first guests. Dedicated air-conditioned spaces are provided for the host family to get ready and relax during the events.",
    image: images.grandHall,
  },
  {
    year: "2024",
    title: "The Banquet Experience",
    body: "A beautiful space created for weddings, birthday parties, receptions, and family celebrations.",
    image: images.garden,
  },
  {
    year: "2024",
    title: "The Premium Upgrade",
    body: "Adding modern facilities and AC to all our private changing spaces to ensure the highest comfort for the host family.",
    image: images.detailCarving,
  },
  {
    year: "Today",
    title: "The Event Nest Receives",
    body: "Spacious getting-ready spaces. Clean environments. The same welcoming atmosphere. Nothing has been added that the space did not already ask for.",
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
  { id: "banquet", name: "The Banquet Hall", note: "Elegant banquet facilities for weddings and receptions, beautifully decorated.", meta: "Plate 01 — Banquet Hall", image: images.courtyard },
  { id: "spaces", name: "Host Spaces", note: "Spacious & comfortable changing areas for the host family.", meta: "Plate 02 — Spaces", image: images.detailCarving },
  { id: "hall", name: "The Grand Hall", note: "A single unbroken run, lit end to end for your special occasions.", meta: "Plate 03 — Grand Hall", image: images.grandHall },
  { id: "parking", name: "The Parking Area", note: "Ample parking space for all your guests and visitors.", meta: "Plate 04 — Facilities", image: images.garden },
  { id: "support", name: "Guest Support", note: "Very supportive staff to make your stay relaxing and memorable.", meta: "Plate 05 — Support", image: images.terrace },
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
  { id: "weddings", title: "Weddings & Receptions", body: "Perfect venue for weddings & receptions. Beautiful banquet hall with excellent arrangements.", image: images.celebration },
  { id: "birthdays", title: "Birthday Parties", body: "Ideal place for birthdays. Celebrate special moments with your loved ones.", image: images.grandHall },
  { id: "corporate", title: "Corporate Events", body: "Small offsites and retreats, with the whole property taken privately.", image: images.terrace },
  { id: "gatherings", title: "Family Gatherings", body: "Perfect for family functions and celebrations in a comfortable environment.", image: images.garden },
];

export type Experience = { id: string; kind: string; title: string; body: string; image: string };

export const experiences: Experience[] = [
  { id: "weddings", kind: "Events", title: "Wedding Venue", body: "Premium arrangements for your special day.", image: images.detailCarving },
  { id: "family", kind: "Gathering", title: "Family Events", body: "Celebrate special moments with family in our spacious halls.", image: images.dining },
  { id: "stay", kind: "Stay", title: "Comfortable Facilities", body: "Relax in our dedicated spaces with AC and support.", image: images.garden },
  { id: "leisure", kind: "Leisure", title: "Relaxing Atmosphere", body: "Enjoy a wonderful atmosphere for your events and stays.", image: images.heroEstate },
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
  { id: "g1", category: "Architecture", caption: "The Event Nest facade", year: "2024", image: facadeNight, span: "wide", featured: true },
  { id: "g2", category: "Architecture", caption: "The grand entrance", year: "2024", image: entranceNight, span: "tall", featured: true },
  { id: "g3", category: "Architecture", caption: "Courtyard view", year: "2024", image: entranceGate, featured: true },
  { id: "g4", category: "Details", caption: "Bridal Space", year: "2024", image: hotelRoom, featured: true },
  { id: "g5", category: "Architecture", caption: "The grand hall", year: "2024", image: grandHallSeating, featured: true },
  { id: "g6", category: "Celebrations", caption: "Wedding stage setup", year: "Today", image: weddingStage, span: "wide" },
  { id: "g7", category: "Details", caption: "Elegant seating", year: "2024", image: seatingTable },
  { id: "g8", category: "Details", caption: "Buffet details", year: "2024", image: buffetDetails },
  { id: "g9", category: "Dining", caption: "The buffet setup", year: "Today", image: buffetSetup, featured: true },
];

export const galleryFilters = ["All", "Architecture", "Dining", "Celebrations", "People", "Details"] as const;

export type Testimonial = { quote: string; name: string; occasion: string; year: string; image: string };

export const testimonials: Testimonial[] = [
  { quote: "Beautiful banquet hall with excellent arrangements and a wonderful atmosphere. Perfect place for weddings and family celebrations.", name: "Rahul Sharma", occasion: "Wedding", year: "2024", image: images.celebration },
  { quote: "Comfortable getting-ready spaces, clean environment, and very supportive staff. Highly recommended for special events.", name: "Priya Verma", occasion: "Stay & Event", year: "2024", image: images.courtyard },
  { quote: "The best venue in Gorakhpur for any large gathering. We arrived as guests and left completely satisfied.", name: "The Mehta family", occasion: "Family Celebration", year: "2024", image: images.grandHall },
];

export type JournalEntry = { slug: string; title: string; excerpt: string; date: string; category: string; image: string };

export const journal: JournalEntry[] = [
  { slug: "welcome", title: "Welcome To Event Nest", excerpt: "Premium Event Venue In Gorakhpur. Event Nest is a premium destination.", date: "2024", category: "Stay", image: images.detailCarving },
  { slug: "banquet", title: "The Best Banquet Experience", excerpt: "A house with great spaces and a beautiful banquet hall.", date: "2024", category: "The Hall", image: images.dining },
  { slug: "celebration", title: "Celebrate With Us", excerpt: "Notes on the events we hosted and the memories made.", date: "2024", category: "Events", image: images.garden },
];

export const details = [
  { image: images.detailBrass, caption: "Brass details", meta: "Hand finished" },
  { image: images.detailCarving, caption: "Carved panel", meta: "Premium Decor" },
  { image: images.courtyard, caption: "Marble chequer", meta: "Courtyard floor" },
  { image: images.dining, caption: "Copper service", meta: "Kitchen — in use daily" },
];

export type NearbyLocation = {
  id: string;
  name: string;
  description: string;
  time: string;
  icon: any; // We will map this in the component
};

export const nearbyLocations: Omit<NearbyLocation, 'icon'>[] = [
  { id: "railway-station", name: "Gorakhpur Railway Station", description: "Main railway junction", time: "10 MIN" },
  { id: "airport", name: "Mahayogi Gorakhnath Airport", description: "Domestic airport", time: "25 MIN" },
  { id: "bus-stand", name: "Nausadh Bus Stand", description: "Major bus terminus", time: "05 MIN" },
  { id: "gorakhnath-temple", name: "Gorakhnath Temple", description: "Famous historic temple", time: "20 MIN" },
  { id: "city-mall", name: "City Mall", description: "Shopping and entertainment hub", time: "15 MIN" },
  { id: "aiims", name: "AIIMS Gorakhpur", description: "Premier medical institute", time: "12 MIN" },
];
