import logo from "@/assets/pvr-logo.png";

export const heroSlides = [
  {
    id: 1,
    image: "/images/hero/hero-1.jpg",
    alt: "Heavy construction infrastructure site with machinery and structural foundations",
    eyebrow: "Your foundation. Our commitment.",
    title: ["Building Strong Foundations", "for a Better Tomorrow."],
    description:
      "Your Trusted Partner for Quality Construction Materials. Delivering reliable materials, superior quality, and dependable service for every construction project.",
    tag: "PVR TRADERS / CONSTRUCTION MATERIALS",
    badge: "Building Infrastructure",
  },
  {
    id: 2,
    image: "/images/iron-steel-supply.jpg",
    alt: "High-grade reinforcement steel and iron TMT bars on construction site",
    eyebrow: "Strength & Durability",
    title: ["Premium Iron & Steel Supplies", "for Heavy Structural Builds."],
    description:
      "Engineered reinforcement steel and TMT bars manufactured for extreme load capacities and seismic safety across commercial and residential structures.",
    tag: "IRON & STEEL SUPPLY",
    badge: "TMT Rebars & Structural Iron",
  },
  {
    id: 3,
    image: "/images/cement-supply.jpg",
    alt: "Top quality cement supply and active concrete construction work",
    eyebrow: "Dependable Bonding",
    title: ["High-Grade Cement for Lasting Strength", "& Solid Foundations."],
    description:
      "Direct supply of certified cement brands with proven compressive strength, fast setting times, and reliable bulk delivery to your site.",
    tag: "CEMENT SUPPLY",
    badge: "Quality Certified Cement",
  },
  {
    id: 4,
    image: "/images/sand-supply.jpg",
    alt: "Filtered sand quarry and crusher chips aggregate materials",
    eyebrow: "Screened & Graded",
    title: ["Quality Sand & Durable Crusher Chips", "Ready for Concrete."],
    description:
      "High-grade filtered river and manufactured sand alongside precision-graded crushed stone aggregates for concrete work, masonry, and road projects.",
    tag: "SAND & CRUSHER CHIPS",
    badge: "River Sand & Crusher Aggregates",
  },
  {
    id: 5,
    image: "/images/cement-bricks-supply.jpg",
    alt: "Modern architecture and robust cement bricks building construction",
    eyebrow: "Precision Manufacturing",
    title: ["Strong Cement Bricks for Resilient Walls", "& Modern Structures."],
    description:
      "High-density concrete bricks and solid blocks ensuring superior thermal insulation, dimensional accuracy, and lifelong wall strength.",
    tag: "CEMENT BRICKS SUPPLY",
    badge: "Solid Cement Bricks & Blocks",
  },
];

export const images = {
  construction: "/images/hero/hero-1.jpg",
  site: "/images/hero/hero-5.jpg",
  logo: logo || "/pvr-logo.png",
};
export const navigation = [
  { id: "home", path: "/", label: "Home" },
  { id: "about", path: "/about", label: "About Us" },
  { id: "services", path: "/services", label: "Products" },
  { id: "clients", path: "/clients", label: "Clients" },
  { id: "projects", path: "/projects", label: "Project Categories" },
  { id: "contact", path: "/contact", label: "Contact Us" },
];

export const clientStats = [
  { value: "500+", label: "Projects Supplied" },
  { value: "150+", label: "Builders & Contractors" },
  { value: "100%", label: "Lab Tested Quality" },
  { value: "99.8%", label: "On-Time Dispatch" },
];

export const clientPartners = [
  {
    name: "Apex Urban Infratech",
    category: "Gated Townships & High-Rises",
    materialSupplied: "OPC 53 Cement & Fe-550D TMT",
    badge: "Tier-1 Developer",
    scope: "Residential Towers",
  },
  {
    name: "Varun Civil & Highways",
    category: "Flyovers & Highway Corridors",
    materialSupplied: "River Sand & 20/40mm Crusher Chips",
    badge: "Govt Infrastructure",
    scope: "Roadways & Bridges",
  },
  {
    name: "Sri Krishna Commercial Hubs",
    category: "IT Parks & Shopping Malls",
    materialSupplied: "High-Grade Cement & Structural Steel",
    badge: "Commercial Builder",
    scope: "Commercial Complexes",
  },
  {
    name: "Vanguard Industrial EPC",
    category: "Heavy Warehouses & Manufacturing Units",
    materialSupplied: "Solid Cement Bricks & Heavy Aggregates",
    badge: "Industrial Contractor",
    scope: "Logistics & Plants",
  },
  {
    name: "Deccan Urban Builders",
    category: "Smart City Infrastructure & Pavements",
    materialSupplied: "Sub-Base Aggregates & M-Sand",
    badge: "Civic Infrastructure",
    scope: "Urban Development",
  },
  {
    name: "Greenfield Real Estates",
    category: "Luxury Villa Communities",
    materialSupplied: "Full Batch Supply (Cement, Sand, Bricks)",
    badge: "Housing Developer",
    scope: "Premium Estates",
  },
];

export const clientBrands = [
  "Apex Infratech",
  "Varun Civil Works",
  "Sri Krishna Constructions",
  "Vanguard EPC",
  "Deccan Urban Projects",
  "Greenfield Estates",
  "Navaratna Builders",
  "Coastal Infra Lines",
];
export const materials = [
  {
    title: "Cement Supply",
    short: "Cement",
    tag: "Grade 53 / 43 OPC & PPC",
    spec: "Certified high-strength binder",
    image: "/images/cement-supply.jpg",
    description:
      "Quality cement for lasting strength, dependable bonding, and a solid foundation for every build.",
  },
  {
    title: "Iron & Steel Supply",
    short: "Iron & Steel",
    tag: "Fe-550D TMT & Structurals",
    spec: "Corrosion-resistant reinforcement",
    image: "/images/iron-steel-supply.jpg",
    description:
      "Reliable reinforcement materials that bring structural strength and durability to your project.",
  },
  {
    title: "Sand Supply",
    short: "Sand",
    tag: "Graded River & M-Sand",
    spec: "Washed concrete & plaster grade",
    image: "/images/sand-supply.jpg",
    description:
      "Quality sand for concrete, masonry, and plastering, supplied to suit your construction needs.",
  },
  {
    title: "Crusher Chips Supply",
    short: "Crusher Chips",
    tag: "10mm / 20mm / 40mm",
    spec: "High compressive aggregate",
    image: "/images/stone-chips-supply.jpg",
    description:
      "Durable stone aggregates for concrete work, road construction, and strong foundations.",
  },
  {
    title: "Cement Bricks Supply",
    short: "Cement Bricks",
    tag: "Solid & Hollow Blocks",
    spec: "Uniform density & strength",
    image: "/images/cement-bricks-supply.jpg",
    description:
      "Strong, consistent cement bricks for dependable walls and efficient building construction.",
  },
];
export const carouselItems = [...materials];
export const projects = [
  {
    title: "Residential Construction",
    sector: "Homes & Gated Communities",
    spec: "Bricks, Cement & River Sand",
    image: "/images/cement-bricks-supply.jpg",
  },
  {
    title: "Commercial Construction",
    sector: "Corporate & Retail Hubs",
    spec: "Engineered Concrete & Framing",
    image: "/images/hero/hero-1.jpg",
  },
  {
    title: "Industrial Construction",
    sector: "Heavy Plants & Warehouses",
    spec: "Fe-550D TMT & Section Steel",
    image: "/images/iron-steel-supply.jpg",
  },
  {
    title: "Infrastructure Projects",
    sector: "Bridges & Civil Foundations",
    spec: "Machine Crushed Crusher Chips",
    image: "/images/stone-chips-supply.jpg",
  },
  {
    title: "Building Construction",
    sector: "Multi-Storey Civil Builds",
    spec: "Grade 53/43 Tested Cement",
    image: "/images/cement-supply.jpg",
  },
  {
    title: "Road Construction",
    sector: "Highways & Heavy Pavements",
    spec: "Screened Sand & Sub-Base Aggregates",
    image: "/images/sand-supply.jpg",
  },
];
export const contact = {
  phone: "+91 81212 77575 / +91 98667 23820",
  primaryPhone: "+91 81212 77575",
  secondaryPhone: "+91 98667 23820",
  primaryPhoneRaw: "918121277575",
  secondaryPhoneRaw: "919866723820",
  whatsappPhone: "+91 95023 62950",
  whatsappPhoneRaw: "919502362950",
  email: "pvrtraders@gmail.com",
  address: "16°39'28.2\"N 80°57'44.0\"E",
  coordinates: "16°39'28.2\"N 80°57'44.0\"E",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=16.657833,80.962222",
  mapEmbedUrl: "https://maps.google.com/maps?q=16.657833,80.962222&hl=en&z=15&output=embed",
  hours: "Mon - Sat: 8:00 AM - 8:00 PM",
};
export const staticContactNotice =
  "Messages cannot be sent yet. Business contact details will be available here soon. Your message has not been sent or saved.";
export function getContactSubmissionResult() {
  return { sent: false, stored: false, message: staticContactNotice };
}
