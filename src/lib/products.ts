export type Collection = {
  slug: string;
  name: string;
  index: string;
  tagline: string;
  description: string;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  collection: string;
  price: number;
  currency: string;
  colorway: string;
  category: "Outerwear" | "Knitwear" | "Tops" | "Bottoms" | "Accessories";
  image: string;
  story: string;
  materials: string[];
  fit: string;
  weight: string;
  care: string;
  sustainability: string;
  status: "available" | "soldout" | "drop";
};

/* Curated editorial photography — art-directed, monochrome-leaning. */
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1400`;

export const collections: Collection[] = [
  {
    slug: "reborn",
    name: "Reborn",
    index: "01",
    tagline: "From ruin, a new form.",
    description:
      "The flagship line. Heavyweight construction and sculptural silhouettes that speak to transformation — garments designed to outlive the season and the self that bought them.",
    image: img("1483985988355-763728e1935b"),
  },
  {
    slug: "essentials",
    name: "Essentials",
    index: "02",
    tagline: "The quiet foundation.",
    description:
      "Considered basics refined to their purest expression. Perfect weight, perfect drape, nothing to prove.",
    image: img("1521572163474-6864f9cf17ab"),
  },
  {
    slug: "faith",
    name: "Faith",
    index: "03",
    tagline: "Belief, made visible.",
    description:
      "An editorial capsule exploring devotion through cut and symbol. Tonal palettes, ecclesiastical proportions.",
    image: img("1490481651871-ab68de25d43d"),
  },
  {
    slug: "legacy",
    name: "Legacy",
    index: "04",
    tagline: "What you leave behind.",
    description:
      "Archive-grade pieces produced in limited runs. Numbered, documented, made to be inherited.",
    image: img("1539109136881-3be0616acf4b"),
  },
];

export const products: Product[] = [
  {
    slug: "reborn-heavyweight-hoodie",
    name: "Reborn Heavyweight Hoodie",
    collection: "Reborn",
    price: 280,
    currency: "EUR",
    colorway: "Washed Black",
    category: "Tops",
    image: img("1556821840-3a63f95609a7"),
    story:
      "Cut from 580gsm Japanese loopback and garment-dyed in small batches, no two pieces wear the same. A hood built with intent — a place to disappear and begin again.",
    materials: ["580gsm Japanese loopback cotton", "Garment dyed", "Tonal woven label"],
    fit: "Boxy, dropped shoulder. Take your usual size.",
    weight: "580 gsm",
    care: "Cold wash inside-out. Dry flat. The fade is the point.",
    sustainability: "Low-impact dye, OEKO-TEX certified mill.",
    status: "available",
  },
  {
    slug: "essential-mockneck",
    name: "Essential Mockneck",
    collection: "Essentials",
    price: 145,
    currency: "EUR",
    colorway: "Bone",
    category: "Knitwear",
    image: img("1620799140408-edc6dcb6d633"),
    story:
      "A long-staple merino mockneck engineered to sit close without restraint. The base layer for a considered life.",
    materials: ["100% extra-fine merino wool", "Fully fashioned"],
    fit: "Slim, true to size.",
    weight: "320 gsm",
    care: "Hand wash cold, reshape, dry flat.",
    sustainability: "RWS-certified, mulesing-free wool.",
    status: "available",
  },
  {
    slug: "faith-wool-overcoat",
    name: "Faith Wool Overcoat",
    collection: "Faith",
    price: 690,
    currency: "EUR",
    colorway: "Charcoal",
    category: "Outerwear",
    image: img("1539533018447-63fcce2678e3"),
    story:
      "An unstructured overcoat with ecclesiastical length. Double-faced Italian wool, hand-finished seams, a silhouette that moves like liturgy.",
    materials: ["Double-faced Italian virgin wool", "Cupro lining", "Horn buttons"],
    fit: "Relaxed, layer-ready. Size down for a cleaner line.",
    weight: "Heavy",
    care: "Professional dry clean only.",
    sustainability: "Woven in a GOTS-aligned Biella mill.",
    status: "drop",
  },
  {
    slug: "legacy-cargo-trouser",
    name: "Legacy Cargo Trouser",
    collection: "Legacy",
    price: 320,
    currency: "EUR",
    colorway: "Stone",
    category: "Bottoms",
    image: img("1473966968600-fa801b869a1a"),
    story:
      "Archive cargo built from dry organic ripstop. Articulated knee, anatomical pockets, a number stitched inside the waistband.",
    materials: ["Dry organic cotton ripstop", "YKK hardware", "Numbered tab"],
    fit: "Tapered wide. Take your usual size.",
    weight: "340 gsm",
    care: "Machine wash cold. Hang dry.",
    sustainability: "Numbered limited run of 200.",
    status: "available",
  },
  {
    slug: "reborn-zip-bomber",
    name: "Reborn Zip Bomber",
    collection: "Reborn",
    price: 420,
    currency: "EUR",
    colorway: "Obsidian",
    category: "Outerwear",
    image: img("1551028719-00167b16eac5"),
    story:
      "A weather-sealed bomber with a matte technical shell and a brushed interior. Engineered for the in-between seasons of a life in motion.",
    materials: ["3-layer technical shell", "Brushed tricot lining", "Storm zip"],
    fit: "True to size with room to layer.",
    weight: "Mid",
    care: "Wipe clean. Wash sparingly, cold.",
    sustainability: "PFC-free water repellency.",
    status: "available",
  },
  {
    slug: "essential-relaxed-tee",
    name: "Essential Relaxed Tee",
    collection: "Essentials",
    price: 85,
    currency: "EUR",
    colorway: "Off-White",
    category: "Tops",
    image: img("1581655353564-df123a1eb820"),
    story:
      "The tee, reconsidered. Heavyweight long-staple cotton with a clean rolled hem and a collar that holds its shape across hundreds of wears.",
    materials: ["240gsm long-staple cotton", "Ribbed collar"],
    fit: "Relaxed boxy. Size down for fitted.",
    weight: "240 gsm",
    care: "Machine wash cold, tumble low.",
    sustainability: "Organic cotton, fair-trade cut & sew.",
    status: "available",
  },
  {
    slug: "faith-cashmere-scarf",
    name: "Faith Cashmere Scarf",
    collection: "Faith",
    price: 190,
    currency: "EUR",
    colorway: "Ash",
    category: "Accessories",
    image: img("1601924994987-69e26d50dc26"),
    story:
      "An oversized Mongolian cashmere scarf, brushed to a cloud. Worn as wrap, hood, or quiet armour.",
    materials: ["100% grade-A Mongolian cashmere", "Hand-rolled edge"],
    fit: "One size, 200 × 70 cm.",
    weight: "Light",
    care: "Dry clean or hand wash with cashmere shampoo.",
    sustainability: "Traceable single-origin fibre.",
    status: "available",
  },
  {
    slug: "legacy-archive-cap",
    name: "Legacy Archive Cap",
    collection: "Legacy",
    price: 95,
    currency: "EUR",
    colorway: "Black",
    category: "Accessories",
    image: img("1588850561407-ed78c282e89b"),
    story:
      "A six-panel cap in dry waxed cotton with an embroidered seal. Quietly built, made to be worn until it tells your story.",
    materials: ["Waxed organic cotton", "Brass slider", "Embroidered seal"],
    fit: "Adjustable, one size.",
    weight: "Light",
    care: "Spot clean only.",
    sustainability: "Solvent-free wax finish.",
    status: "soldout",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
