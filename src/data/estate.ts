/**
 * CONTENT LAYER — Event Nest
 *
 * All copy, imagery metadata and structured content for the site lives here so
 * the UI stays presentational. Replace these records with the property's real
 * archive material (dates, provenance, room specs) before launch — every field
 * maps 1:1 to what is rendered.
 */
import heroEstate from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_55__1_.webp";
import courtyard from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_55.webp";
import grandHall from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__1_.webp";
import terrace from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__2_.webp";
import garden from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__3_.webp";
import room1 from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__4_.webp";
import room2 from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__5_.webp";
import room3 from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__6_.webp";
import dining from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56.webp";
import celebration from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_56__1_.webp";
import detailBrass from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_55__1_.webp";
import detailCarving from "@/assets/Event/whatsapp_image_2026_08_08_at_15_18_55__1_.webp";

export const images = {
  heroEstate,
  courtyard,
  grandHall,
  terrace,
  garden,
  room1,
  room2,
  room3,
  dining,
  celebration,
  detailBrass,
  detailCarving,
};

export const estate = {
  name: "Event Nest",
  shortName: "Event Nest",
  established: "2024",
  descriptor: "Premium Banquet Hall & Deluxe Rooms",
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
  { index: "01", label: "The Story", to: "/about", image: courtyard },
  { index: "02", label: "The Property", to: "/about", image: grandHall },
  { index: "03", label: "Rooms & Suites", to: "/rooms", image: room1 },
  { index: "04", label: "Dining", to: "/dining", image: dining },
  { index: "05", label: "Celebrations", to: "/celebrations", image: celebration },
  { index: "06", label: "Experiences", to: "/experiences", image: terrace },
  { index: "07", label: "Gallery", to: "/gallery", image: detailCarving },
  { index: "08", label: "Journal", to: "/journal", image: garden },
  { index: "09", label: "Contact", to: "/contact", image: heroEstate },
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
    image: courtyard,
  },
  {
    year: "2024",
    title: "The Doors Open",
    body: "We welcomed our first guests. The west wing is given over to comfortable deluxe rooms, providing a relaxing and memorable stay.",
    image: grandHall,
  },
  {
    year: "2024",
    title: "The Banquet Experience",
    body: "A beautiful space created for weddings, birthday parties, receptions, and family celebrations.",
    image: garden,
  },
  {
    year: "2024",
    title: "The Premium Upgrade",
    body: "Adding modern facilities and AC to all our deluxe rooms to ensure the highest comfort for our guests.",
    image: detailCarving,
  },
  {
    year: "Today",
    title: "The Event Nest Receives",
    body: "Comfortable deluxe rooms. Clean environments. The same welcoming atmosphere. Nothing has been added that the space did not already ask for.",
    image: terrace,
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
  { id: "banquet", name: "The Banquet Hall", note: "Elegant banquet facilities for weddings and receptions, beautifully decorated.", meta: "Plate 01 — Banquet Hall", image: courtyard },
  { id: "rooms", name: "The Deluxe Rooms", note: "Clean, spacious & comfortable deluxe rooms with modern facilities.", meta: "Plate 02 — Accommodation", image: detailCarving },
  { id: "hall", name: "The Grand Hall", note: "A single unbroken run, lit end to end for your special occasions.", meta: "Plate 03 — Grand Hall", image: grandHall },
  { id: "parking", name: "The Parking Area", note: "Ample parking space for all your guests and visitors.", meta: "Plate 04 — Facilities", image: garden },
  { id: "support", name: "Guest Support", note: "Very supportive staff to make your stay relaxing and memorable.", meta: "Plate 05 — Support", image: terrace },
];

export type Room = {
  id: string;
  index: string;
  name: string;
  description: string;
  image: string;
  size: string;
  guests: string;
  bed: string;
  feature: string;
};

export const rooms: Room[] = [
  {
    id: "premium-deluxe-room",
    index: "01",
    name: "Premium Deluxe Room",
    description: "The primary stay experience. Spacious, clean, and comfortable deluxe rooms with AC facility and modern amenities.",
    image: room1,
    size: "82 sq m",
    guests: "2 guests",
    bed: "King Size",
    feature: "AC Facility",
  },
  {
    id: "classic-deluxe-room",
    index: "02",
    name: "Classic Deluxe Room",
    description: "A well-appointed room featuring elegant decor, offering a peaceful and restful environment for guests with easy access.",
    image: room2,
    size: "54 sq m",
    guests: "2 guests",
    bed: "Carved daybed & king",
    feature: "Easy Access",
  },
  {
    id: "family-deluxe-suite",
    index: "03",
    name: "Family Deluxe Suite",
    description: "Ideal for family gatherings and celebrations, this suite provides ample space and top-notch amenities. Corner room with great views.",
    image: room3,
    size: "46 sq m",
    guests: "4 guests",
    bed: "2 Queen Size",
    feature: "Family Friendly",
  },
  {
    id: "executive-suite",
    index: "04",
    name: "Executive Suite",
    description: "Luxury accommodations for those seeking the very best. Features a dedicated sitting area and premium services.",
    image: terrace,
    size: "61 sq m",
    guests: "2 guests + 1",
    bed: "King Size",
    feature: "Lounge Area",
  },
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
  { id: "banquet-hall", name: "Event Nest Banquet", cuisine: "Various Catering Options", atmosphere: "Elegant Celebration Space", hours: "By Booking", image: dining },
  { id: "breakfast", name: "Morning Breakfast", cuisine: "Regional & Continental", atmosphere: "Relaxing environment", hours: "07:00 — 10:30, daily", image: courtyard },
  { id: "supper", name: "Special Supper", cuisine: "Custom Menu", atmosphere: "Open sky, by arrangement", hours: "By reservation", image: terrace },
];

export const diningWords = ["Elegant", "Premium", "Comfortable", "Memorable"];

export type Celebration = { id: string; title: string; body: string; image: string };

export const celebrationTypes: Celebration[] = [
  { id: "weddings", title: "Weddings & Receptions", body: "Perfect venue for weddings & receptions. Beautiful banquet hall with excellent arrangements.", image: celebration },
  { id: "birthdays", title: "Birthday Parties", body: "Ideal place for birthdays. Celebrate special moments with your loved ones.", image: grandHall },
  { id: "corporate", title: "Corporate Events", body: "Small offsites and retreats, with the whole property taken privately.", image: terrace },
  { id: "gatherings", title: "Family Gatherings", body: "Perfect for family functions and celebrations in a comfortable environment.", image: garden },
];

export type Experience = { id: string; kind: string; title: string; body: string; image: string };

export const experiences: Experience[] = [
  { id: "weddings", kind: "Events", title: "Wedding Venue", body: "Premium arrangements for your special day.", image: detailCarving },
  { id: "family", kind: "Gathering", title: "Family Events", body: "Celebrate special moments with family in our spacious halls.", image: dining },
  { id: "stay", kind: "Stay", title: "Comfortable Stay", body: "Relax in our deluxe rooms with AC and guest support.", image: garden },
  { id: "leisure", kind: "Leisure", title: "Relaxing Atmosphere", body: "Enjoy a wonderful atmosphere for your events and stays.", image: heroEstate },
];

export type GalleryItem = {
  id: string;
  category: "Architecture" | "Rooms" | "Dining" | "Celebrations" | "People" | "Details";
  caption: string;
  year: string;
  image: string;
  span?: "tall" | "wide";
  featured?: boolean;
};

export const gallery: GalleryItem[] = [
  { id: "g1", category: "Architecture", caption: "The Event Nest facade", year: "2024", image: heroEstate, span: "wide", featured: true },
  { id: "g2", category: "Rooms", caption: "The Premium Deluxe Suite", year: "2024", image: room1, span: "tall", featured: true },
  { id: "g3", category: "Architecture", caption: "Courtyard view", year: "2024", image: courtyard, featured: true },
  { id: "g4", category: "Architecture", caption: "The grand hall", year: "2024", image: grandHall, featured: true },
  { id: "g5", category: "Architecture", caption: "The garden area", year: "2024", image: garden, featured: true },
  { id: "g6", category: "People", caption: "The terrace at dusk", year: "Today", image: terrace, span: "wide" },
  { id: "g7", category: "Rooms", caption: "The Classic Chamber", year: "2024", image: room2 },
  { id: "g8", category: "Rooms", caption: "The Family Suite", year: "2024", image: room3 },
  { id: "g9", category: "Dining", caption: "The dining setup", year: "Today", image: dining, featured: true },
];

export const galleryFilters = ["All", "Architecture", "Rooms", "Dining", "Celebrations", "People", "Details"] as const;

export type Testimonial = { quote: string; name: string; occasion: string; year: string; image: string };

export const testimonials: Testimonial[] = [
  { quote: "Beautiful banquet hall with excellent arrangements and a wonderful atmosphere. Perfect place for weddings and family celebrations.", name: "Rahul Sharma", occasion: "Wedding", year: "2024", image: celebration },
  { quote: "Comfortable deluxe rooms, clean environment, and very supportive staff. Highly recommended for special events and stays.", name: "Priya Verma", occasion: "Stay & Event", year: "2024", image: courtyard },
  { quote: "The best venue in Gorakhpur for any large gathering. We arrived as guests and left completely satisfied.", name: "The Mehta family", occasion: "Family Celebration", year: "2024", image: grandHall },
];

export type JournalEntry = { slug: string; title: string; excerpt: string; date: string; category: string; image: string };

export const journal: JournalEntry[] = [
  { slug: "welcome", title: "Welcome To Event Nest", excerpt: "Deluxe Stay In Gorakhpur. Event Nest is a premium destination.", date: "2024", category: "Stay", image: detailCarving },
  { slug: "banquet", title: "The Best Banquet Experience", excerpt: "A house with great rooms and a beautiful banquet hall.", date: "2024", category: "The Hall", image: dining },
  { slug: "celebration", title: "Celebrate With Us", excerpt: "Notes on the events we hosted and the memories made.", date: "2024", category: "Events", image: garden },
];

export const details = [
  { image: detailBrass, caption: "Brass details", meta: "Hand finished" },
  { image: detailCarving, caption: "Carved panel", meta: "Premium Decor" },
  { image: courtyard, caption: "Marble chequer", meta: "Courtyard floor" },
  { image: dining, caption: "Copper service", meta: "Kitchen — in use daily" },
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
