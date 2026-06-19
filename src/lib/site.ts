export const site = {
  name: "VIDA NOVA",
  tagline: "Everyone deserves a new beginning.",
  description:
    "Vida Nova is not clothing — it is transformation. A luxury movement built on purpose, identity and resilience. Garments as symbols of a new life.",
  url: "https://vidanova.studio",
  locale: "en",
} as const;

/** Primary navigation — kept intentionally lean. */
export const primaryNav = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Drops", href: "/drops" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Manifesto", href: "/manifesto" },
] as const;

export const footerNav = {
  Shop: [
    { label: "New Arrivals", href: "/shop?sort=new" },
    { label: "Essentials", href: "/collections/essentials" },
    { label: "Reborn", href: "/collections/reborn" },
    { label: "Accessories", href: "/collections/accessories" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  World: [
    { label: "Manifesto", href: "/manifesto" },
    { label: "Journal", href: "/journal" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Community", href: "/community" },
    { label: "Ambassadors", href: "/ambassadors" },
  ],
  Client: [
    { label: "Account", href: "/account" },
    { label: "Order Tracking", href: "/tracking" },
    { label: "Returns", href: "/returns" },
    { label: "Shipping", href: "/support" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const membershipTiers = [
  { name: "New Soul", note: "The beginning", points: 0 },
  { name: "Believer", note: "Early access", points: 500 },
  { name: "Disciple", note: "Private drops", points: 1500 },
  { name: "Reborn", note: "Exclusive products", points: 4000 },
  { name: "Legacy", note: "Lifetime", points: 10000 },
] as const;

export const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Spotify", href: "https://spotify.com" },
] as const;
