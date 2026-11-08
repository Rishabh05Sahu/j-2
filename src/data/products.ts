import type {
  Category,
  Gemstone,
  Metal,
  Occasion,
  Product,
  ProductSpec,
  StockStatus,
  Style,
} from "@/types/product";

const img = (name: string) => `/images/products/${name}.jpg`;

const RING_SIZES = ["4", "5", "6", "7", "8", "9"];
const NECKLACE_LENGTHS = ['16"', '18"', '20"'];
const BRACELET_SIZES = ["Small", "Medium", "Large"];
const ONE_SIZE = ["One Size"];

interface Seed {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  metal: Metal;
  gemstone: Gemstone;
  style: Style[];
  occasion: Occasion[];
  images: [string, string];
  shortDescription: string;
  description: string;
  sizes?: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  stockStatus?: StockStatus;
  tags?: string[];
  collections: string[];
  extraSpecs?: ProductSpec[];
  featuredRank: number;
  releasedAt: string;
}

function defaultSizes(category: Category): string[] {
  switch (category) {
    case "Rings":
    case "Engagement Rings":
      return RING_SIZES;
    case "Necklaces":
      return NECKLACE_LENGTHS;
    case "Bracelets":
      return BRACELET_SIZES;
    default:
      return ONE_SIZE;
  }
}

function buildSpecs(seed: Seed): ProductSpec[] {
  const specs: ProductSpec[] = [
    { label: "Metal", value: seed.metal },
    {
      label: "Gemstone",
      value: seed.gemstone === "None" ? "Polished metal, no stones" : seed.gemstone,
    },
  ];
  return [
    ...specs,
    ...(seed.extraSpecs ?? []),
    { label: "Finish", value: "Hand-polished in our atelier" },
    { label: "Reference", value: seed.id.toUpperCase() },
  ];
}

function make(seed: Seed): Product {
  return {
    id: seed.id,
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    price: seed.price,
    description: seed.description,
    shortDescription: seed.shortDescription,
    images: seed.images.map(img),
    metal: seed.metal,
    gemstone: seed.gemstone,
    style: seed.style,
    occasion: seed.occasion,
    sizes: seed.sizes ?? defaultSizes(seed.category),
    isBestSeller: seed.isBestSeller ?? false,
    isNewArrival: seed.isNewArrival ?? false,
    stockStatus: seed.stockStatus ?? "in-stock",
    tags: seed.tags ?? [],
    collections: seed.collections,
    specs: buildSpecs(seed),
    featuredRank: seed.featuredRank,
    releasedAt: seed.releasedAt,
  };
}

const seeds: Seed[] = [
  // ------------------------------------------------------------ Rings
  {
    id: "ring-001",
    slug: "celeste-diamond-ring",
    name: "The Celeste Diamond Ring",
    category: "Rings",
    price: 890,
    metal: "18K Yellow Gold",
    gemstone: "Diamond",
    style: ["Minimal", "Timeless"],
    occasion: ["Everyday", "Anniversary"],
    images: ["ring-stack", "ring-trio"],
    shortDescription: "A whisper of light, set in warm yellow gold.",
    description:
      "A delicate diamond ring crafted to capture timeless elegance. A single brilliant-cut diamond rests within a softly rounded bezel, finished by hand so the band feels as light as silk on the finger.",
    isBestSeller: true,
    tags: ["stackable", "diamond", "everyday"],
    collections: ["everyday-elegance", "timeless-diamonds"],
    extraSpecs: [{ label: "Diamond weight", value: "0.15 ct, VS clarity" }],
    featuredRank: 1,
    releasedAt: "2026-02-10",
  },
  {
    id: "ring-002",
    slug: "aurelia-stacking-trio",
    name: "Aurelia Stacking Trio",
    category: "Rings",
    price: 420,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Minimal", "Modern"],
    occasion: ["Everyday", "Gift"],
    images: ["ring-trio", "ring-boxed"],
    shortDescription: "Three fine bands, endlessly re-imagined.",
    description:
      "Three slender bands in polished, brushed and twisted gold. Wear them together for quiet texture, or scatter them across the hand — each finish catches the light in its own way.",
    isBestSeller: true,
    isNewArrival: true,
    tags: ["stackable", "gold", "set"],
    collections: ["everyday-elegance", "golden-hour", "gifts-to-remember"],
    featuredRank: 4,
    releasedAt: "2026-09-01",
  },
  {
    id: "ring-003",
    slug: "rosalind-pave-bands",
    name: "Rosalind Pavé Bands",
    category: "Rings",
    price: 1150,
    metal: "18K Rose Gold",
    gemstone: "Diamond",
    style: ["Romantic", "Delicate"],
    occasion: ["Anniversary", "Wedding"],
    images: ["ring-bands-rose", "ring-wedding"],
    shortDescription: "A pair of pavé bands in blush rose gold.",
    description:
      "Two rose gold bands, one set with a fine line of pavé diamonds and one left softly polished. Designed to be worn as a pair — a modern keepsake for a love worth celebrating.",
    tags: ["pavé", "rose gold", "wedding"],
    collections: ["bridal-edit", "timeless-diamonds"],
    extraSpecs: [{ label: "Diamond weight", value: "0.22 ct total" }],
    featuredRank: 9,
    releasedAt: "2025-11-12",
  },
  {
    id: "ring-004",
    slug: "isadora-pink-sapphire-ring",
    name: "Isadora Pink Sapphire Ring",
    category: "Rings",
    price: 2400,
    metal: "18K Rose Gold",
    gemstone: "Sapphire",
    style: ["Romantic", "Classic"],
    occasion: ["Anniversary", "Celebration"],
    images: ["ring-pink-sapphire", "ring-cluster"],
    shortDescription: "An emerald-cut pink sapphire framed in diamonds.",
    description:
      "A luminous emerald-cut pink sapphire, chosen for its soft rosé glow, framed by a halo of micro-pavé diamonds and carried on a diamond-set rose gold band.",
    stockStatus: "low-stock",
    tags: ["sapphire", "colour", "halo"],
    collections: ["modern-heirlooms"],
    extraSpecs: [{ label: "Centre stone", value: "1.4 ct pink sapphire" }],
    featuredRank: 7,
    releasedAt: "2026-04-20",
  },
  {
    id: "ring-005",
    slug: "florence-cocktail-ring",
    name: "Florence Cocktail Ring",
    category: "Rings",
    price: 3800,
    metal: "18K White Gold",
    gemstone: "Sapphire",
    style: ["Statement", "Bold"],
    occasion: ["Evening", "Celebration"],
    images: ["ring-flower", "ring-gemstones"],
    shortDescription: "A flower in bloom, in violet and golden sapphires.",
    description:
      "Pear-shaped violet and golden sapphires unfold like petals around a diamond heart. An evening ring with real presence, balanced so it sits comfortably all night.",
    stockStatus: "made-to-order",
    tags: ["cocktail", "statement", "sapphire"],
    collections: ["modern-heirlooms"],
    extraSpecs: [{ label: "Gemstones", value: "6 pear sapphires, 2.8 ct total" }],
    featuredRank: 14,
    releasedAt: "2025-10-02",
  },
  {
    id: "ring-006",
    slug: "talisman-ruby-ring",
    name: "Talisman Ruby Ring",
    category: "Rings",
    price: 640,
    metal: "18K Yellow Gold",
    gemstone: "Ruby",
    style: ["Modern", "Bold"],
    occasion: ["Everyday", "Birthday"],
    images: ["ring-gemstones", "ring-stack"],
    shortDescription: "A cabochon ruby on a sculpted gold band.",
    description:
      "A smooth cabochon ruby sits low on a sculpted yellow gold band — a modern talisman inspired by heirloom signet rings, made for everyday wear.",
    isNewArrival: true,
    tags: ["ruby", "colour", "talisman"],
    collections: ["golden-hour", "gifts-to-remember"],
    featuredRank: 12,
    releasedAt: "2026-08-14",
  },
  {
    id: "ring-007",
    slug: "heirloom-cluster-ring",
    name: "Heirloom Cluster Ring",
    category: "Rings",
    price: 1680,
    metal: "18K Rose Gold",
    gemstone: "Diamond",
    style: ["Vintage", "Statement"],
    occasion: ["Anniversary", "Celebration"],
    images: ["ring-cluster", "ring-pink-sapphire"],
    shortDescription: "Champagne diamonds gathered into a soft bloom.",
    description:
      "Inspired by Victorian cluster rings, champagne diamonds are gathered into a gentle dome and set in rose gold with a delicately pierced gallery.",
    tags: ["vintage", "cluster", "champagne diamond"],
    collections: ["modern-heirlooms", "timeless-diamonds"],
    extraSpecs: [{ label: "Diamond weight", value: "0.85 ct total" }],
    featuredRank: 16,
    releasedAt: "2025-12-01",
  },
  {
    id: "ring-008",
    slug: "eternal-wedding-band",
    name: "Eternal Wedding Band",
    category: "Rings",
    price: 760,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Classic", "Timeless"],
    occasion: ["Wedding", "Anniversary"],
    images: ["ring-wedding", "ring-bands-rose"],
    shortDescription: "A comfort-fit band, made for a lifetime.",
    description:
      "A classic court-profile wedding band in solid 18K gold, comfort-fit inside and polished to a mirror finish. Complimentary engraving of up to twelve characters.",
    isBestSeller: true,
    tags: ["wedding band", "engraving", "classic"],
    collections: ["bridal-edit", "golden-hour"],
    extraSpecs: [{ label: "Width", value: "3 mm, comfort fit" }],
    featuredRank: 8,
    releasedAt: "2025-06-18",
  },
  // ------------------------------------------------------- Engagement
  {
    id: "eng-001",
    slug: "lumiere-halo-engagement-ring",
    name: "Lumière Halo Engagement Ring",
    category: "Engagement Rings",
    price: 5400,
    metal: "Platinum",
    gemstone: "Diamond",
    style: ["Classic", "Timeless"],
    occasion: ["Engagement"],
    images: ["ring-halo", "ring-pear"],
    shortDescription: "A round brilliant diamond haloed in light.",
    description:
      "A round brilliant centre diamond, encircled by a halo of pavé and lifted on a split, diamond-set platinum shank. Designed to gather light from every angle.",
    isBestSeller: true,
    tags: ["halo", "engagement", "platinum"],
    collections: ["bridal-edit", "timeless-diamonds"],
    extraSpecs: [
      { label: "Centre stone", value: "1.0 ct round brilliant, F colour, VS1" },
      { label: "Certification", value: "Independently graded" },
    ],
    featuredRank: 2,
    releasedAt: "2025-09-09",
  },
  {
    id: "eng-002",
    slug: "seraphine-pear-engagement-ring",
    name: "Séraphine Pear Engagement Ring",
    category: "Engagement Rings",
    price: 6900,
    metal: "Platinum",
    gemstone: "Diamond",
    style: ["Statement", "Modern"],
    occasion: ["Engagement"],
    images: ["ring-pear", "ring-halo"],
    shortDescription: "A pear-cut diamond with a double halo.",
    description:
      "A graceful pear-cut diamond framed by a double halo and set in platinum. Modern in its silhouette, timeless in its spirit.",
    isNewArrival: true,
    stockStatus: "made-to-order",
    tags: ["pear", "engagement", "double halo"],
    collections: ["bridal-edit", "timeless-diamonds"],
    extraSpecs: [{ label: "Centre stone", value: "1.25 ct pear, G colour, VS2" }],
    featuredRank: 5,
    releasedAt: "2026-10-01",
  },
  {
    id: "eng-003",
    slug: "margaux-solitaire",
    name: "Margaux Solitaire",
    category: "Engagement Rings",
    price: 3200,
    metal: "18K Yellow Gold",
    gemstone: "Diamond",
    style: ["Minimal", "Timeless"],
    occasion: ["Engagement"],
    images: ["ring-boxed", "ring-stack"],
    shortDescription: "The purest expression of a promise.",
    description:
      "A four-claw solitaire on a slender knife-edge band. Nothing extraneous — only a beautifully cut diamond and the warmth of 18K gold.",
    tags: ["solitaire", "engagement", "minimal"],
    collections: ["bridal-edit"],
    extraSpecs: [{ label: "Centre stone", value: "0.7 ct round brilliant" }],
    featuredRank: 10,
    releasedAt: "2025-08-01",
  },
  {
    id: "eng-004",
    slug: "amelie-rose-engagement-ring",
    name: "Amélie Rose Engagement Ring",
    category: "Engagement Rings",
    price: 4200,
    metal: "18K Rose Gold",
    gemstone: "Sapphire",
    style: ["Romantic", "Vintage"],
    occasion: ["Engagement"],
    images: ["ring-pink-sapphire", "ring-bands-rose"],
    shortDescription: "A blush sapphire for an unconventional romance.",
    description:
      "An emerald-cut pink sapphire with a delicate diamond halo, set in rose gold. A romantic alternative for those who love colour.",
    stockStatus: "low-stock",
    tags: ["sapphire", "engagement", "coloured"],
    collections: ["bridal-edit", "modern-heirlooms"],
    extraSpecs: [{ label: "Centre stone", value: "1.6 ct pink sapphire" }],
    featuredRank: 13,
    releasedAt: "2026-03-14",
  },
  {
    id: "eng-005",
    slug: "odalie-vintage-engagement-ring",
    name: "Odalie Vintage Engagement Ring",
    category: "Engagement Rings",
    price: 2900,
    metal: "18K Rose Gold",
    gemstone: "Diamond",
    style: ["Vintage", "Romantic"],
    occasion: ["Engagement"],
    images: ["ring-cluster", "ring-boxed"],
    shortDescription: "An old-world cluster with modern brilliance.",
    description:
      "A softly domed cluster of diamonds with milgrain detailing and an open gallery, inspired by engagement rings of the 1920s.",
    tags: ["vintage", "engagement", "cluster"],
    collections: ["bridal-edit", "modern-heirlooms"],
    featuredRank: 18,
    releasedAt: "2025-05-05",
  },
  // ---------------------------------------------------------- Necklaces
  {
    id: "neck-001",
    slug: "soleil-coin-pendant",
    name: "Soleil Coin Pendant",
    category: "Necklaces",
    price: 380,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Minimal", "Modern"],
    occasion: ["Everyday", "Gift"],
    images: ["necklace-coin", "necklace-medallion"],
    shortDescription: "A hand-hammered disc of sunlit gold.",
    description:
      "A small hand-hammered gold disc on a fine cable chain. Wear it alone, or layer it — it was made to be the piece you never take off.",
    isBestSeller: true,
    tags: ["layering", "coin", "engravable"],
    collections: ["everyday-elegance", "golden-hour", "gifts-to-remember"],
    featuredRank: 3,
    releasedAt: "2025-04-11",
  },
  {
    id: "neck-002",
    slug: "perle-de-lune-strand",
    name: "Perle de Lune Strand",
    category: "Necklaces",
    price: 1450,
    metal: "18K White Gold",
    gemstone: "Pearl",
    style: ["Classic", "Timeless"],
    occasion: ["Wedding", "Evening"],
    images: ["necklace-pearl", "necklace-pearl-drop"],
    shortDescription: "Hand-knotted Akoya pearls with a diamond clasp.",
    description:
      "Lustrous Akoya pearls, each hand-knotted on silk and finished with a white gold clasp set with a single diamond. A strand to be passed down.",
    tags: ["pearl", "bridal", "heirloom"],
    collections: ["bridal-edit", "modern-heirlooms"],
    extraSpecs: [{ label: "Pearls", value: "7–7.5 mm Akoya, AAA lustre" }],
    featuredRank: 11,
    releasedAt: "2025-07-20",
  },
  {
    id: "neck-003",
    slug: "coeur-diamond-heart-pendant",
    name: "Cœur Diamond Heart Pendant",
    category: "Necklaces",
    price: 1290,
    metal: "18K White Gold",
    gemstone: "Diamond",
    style: ["Romantic", "Delicate"],
    occasion: ["Anniversary", "Gift", "Birthday"],
    images: ["necklace-heart", "necklace-halo"],
    shortDescription: "An open heart traced in pavé diamonds.",
    description:
      "An open heart outlined in pavé diamonds, floating on a fine white gold chain. Tender and light — a gift that says everything.",
    isBestSeller: true,
    tags: ["heart", "pavé", "gift"],
    collections: ["gifts-to-remember", "timeless-diamonds"],
    featuredRank: 6,
    releasedAt: "2025-12-20",
  },
  {
    id: "neck-004",
    slug: "aurora-halo-pendant",
    name: "Aurora Halo Pendant",
    category: "Necklaces",
    price: 2650,
    metal: "18K White Gold",
    gemstone: "Diamond",
    style: ["Classic", "Statement"],
    occasion: ["Evening", "Anniversary"],
    images: ["necklace-halo", "necklace-pendant"],
    shortDescription: "A cushion halo of diamonds, suspended in light.",
    description:
      "A round brilliant diamond within a cushion-shaped halo, suspended from a diamond-set bail. Built for evenings that deserve to be remembered.",
    tags: ["halo", "diamond", "evening"],
    collections: ["timeless-diamonds"],
    extraSpecs: [{ label: "Diamond weight", value: "1.1 ct total" }],
    featuredRank: 15,
    releasedAt: "2025-10-15",
  },
  {
    id: "neck-005",
    slug: "eden-emerald-pendant",
    name: "Eden Emerald Pendant",
    category: "Necklaces",
    price: 1980,
    metal: "18K Yellow Gold",
    gemstone: "Emerald",
    style: ["Modern", "Bold"],
    occasion: ["Celebration", "Birthday"],
    images: ["necklace-emerald", "necklace-drape"],
    shortDescription: "A deep green emerald in a sculpted gold frame.",
    description:
      "A rich Colombian-green emerald, set east-west in a sculpted gold frame with an open ring drop. Colour, worn with confidence.",
    isNewArrival: true,
    stockStatus: "low-stock",
    tags: ["emerald", "colour", "pendant"],
    collections: ["modern-heirlooms", "golden-hour"],
    extraSpecs: [{ label: "Emerald", value: "1.2 ct, octagonal step cut" }],
    featuredRank: 17,
    releasedAt: "2026-09-18",
  },
  {
    id: "neck-006",
    slug: "laurel-layered-necklace",
    name: "Laurel Layered Necklace",
    category: "Necklaces",
    price: 540,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Delicate", "Romantic"],
    occasion: ["Everyday", "Gift"],
    images: ["necklace-leaf", "necklace-delicate"],
    shortDescription: "A golden laurel sprig on a double chain.",
    description:
      "A sprig of hand-finished laurel leaves on a fine double chain — a symbol of quiet victories, made to be worn every day.",
    tags: ["layering", "nature", "laurel"],
    collections: ["everyday-elegance", "gifts-to-remember"],
    featuredRank: 20,
    releasedAt: "2026-01-30",
  },
  {
    id: "neck-007",
    slug: "petite-pearl-drop-necklace",
    name: "Petite Pearl Drop Necklace",
    category: "Necklaces",
    price: 220,
    metal: "18K Yellow Gold",
    gemstone: "Pearl",
    style: ["Delicate", "Minimal"],
    occasion: ["Everyday", "Gift", "Graduation"],
    images: ["necklace-pearl-drop", "necklace-bar"],
    shortDescription: "A single freshwater pearl on a whisper-fine chain.",
    description:
      "A single, perfectly round freshwater pearl suspended from a whisper-fine gold chain. Understated, luminous and wonderfully easy to wear.",
    isBestSeller: true,
    tags: ["pearl", "everyday", "gift"],
    collections: ["everyday-elegance", "gifts-to-remember"],
    featuredRank: 19,
    releasedAt: "2025-03-03",
  },
  {
    id: "neck-008",
    slug: "linea-diamond-bar-necklace",
    name: "Linea Diamond Bar Necklace",
    category: "Necklaces",
    price: 460,
    metal: "18K Rose Gold",
    gemstone: "Diamond",
    style: ["Minimal", "Modern"],
    occasion: ["Everyday", "Graduation"],
    images: ["necklace-bar", "necklace-delicate"],
    shortDescription: "A slim bar set with a single diamond.",
    description:
      "A slender rose gold bar with a single flush-set diamond, paired with a delicate disc charm. Modern minimalism with a flicker of light.",
    isNewArrival: true,
    tags: ["bar", "layering", "minimal"],
    collections: ["everyday-elegance"],
    featuredRank: 22,
    releasedAt: "2026-07-07",
  },
  {
    id: "neck-009",
    slug: "riviera-link-chain",
    name: "Riviera Link Chain",
    category: "Necklaces",
    price: 980,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Bold", "Modern"],
    occasion: ["Everyday", "Evening"],
    images: ["necklace-chain", "necklace-layers"],
    shortDescription: "Generous gold links with a fluid drape.",
    description:
      "Generous oval links, each one shaped and soldered by hand, create a chain that moves like liquid gold. Confident on its own, beautiful layered.",
    tags: ["chain", "links", "bold"],
    collections: ["golden-hour"],
    featuredRank: 21,
    releasedAt: "2026-05-28",
  },
  {
    id: "neck-010",
    slug: "heritage-medallion-necklace",
    name: "Héritage Medallion Necklace",
    category: "Necklaces",
    price: 1350,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Vintage", "Statement"],
    occasion: ["Celebration", "Gift"],
    images: ["necklace-medallion", "necklace-coin"],
    shortDescription: "An engraved medallion on layered paperclip chains.",
    description:
      "A hand-engraved medallion inspired by antique coins, worn on layered paperclip chains of different lengths. A future heirloom.",
    tags: ["medallion", "layering", "engraved"],
    collections: ["modern-heirlooms", "golden-hour"],
    featuredRank: 24,
    releasedAt: "2026-02-22",
  },
  {
    id: "neck-011",
    slug: "maharani-ruby-collar",
    name: "Maharani Ruby Collar",
    category: "Necklaces",
    price: 7800,
    metal: "18K Yellow Gold",
    gemstone: "Ruby",
    style: ["Statement", "Bold", "Vintage"],
    occasion: ["Wedding", "Celebration"],
    images: ["necklace-heritage", "necklace-drape"],
    shortDescription: "A ceremonial collar of rubies and textured gold.",
    description:
      "A ceremonial collar of textured gold beads and hand-set rubies, made by master artisans over more than ninety hours. For the most important days of a life.",
    stockStatus: "made-to-order",
    tags: ["bridal", "ruby", "ceremonial"],
    collections: ["bridal-edit", "modern-heirlooms"],
    extraSpecs: [{ label: "Craft time", value: "Approximately 90 hours" }],
    featuredRank: 26,
    releasedAt: "2025-11-30",
  },
  {
    id: "neck-012",
    slug: "whisper-layering-set",
    name: "Whisper Layering Set",
    category: "Necklaces",
    price: 310,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Delicate", "Minimal"],
    occasion: ["Everyday", "Gift"],
    images: ["necklace-layers", "necklace-delicate"],
    shortDescription: "Three fine chains, layered for you.",
    description:
      "Three whisper-fine chains — cable, satellite and box — pre-measured to layer perfectly. Each can also be worn alone.",
    tags: ["layering", "set", "chain"],
    collections: ["everyday-elegance", "gifts-to-remember"],
    featuredRank: 23,
    releasedAt: "2026-06-12",
  },
  // ----------------------------------------------------------- Earrings
  {
    id: "ear-001",
    slug: "azure-sapphire-drops",
    name: "Azure Sapphire Drops",
    category: "Earrings",
    price: 3400,
    metal: "18K White Gold",
    gemstone: "Sapphire",
    style: ["Statement", "Classic"],
    occasion: ["Evening", "Celebration"],
    images: ["earring-sapphire", "earring-blue"],
    shortDescription: "Pear sapphires within an Art Deco frame.",
    description:
      "Deep blue pear-shaped sapphires framed in a geometric halo of baguette and round diamonds — an Art Deco silhouette with modern clarity.",
    tags: ["sapphire", "art deco", "drop"],
    collections: ["modern-heirlooms", "timeless-diamonds"],
    extraSpecs: [{ label: "Sapphires", value: "2.2 ct total" }],
    featuredRank: 25,
    releasedAt: "2026-01-08",
  },
  {
    id: "ear-002",
    slug: "etoile-diamond-studs",
    name: "Étoile Diamond Studs",
    category: "Earrings",
    price: 1180,
    metal: "18K White Gold",
    gemstone: "Diamond",
    style: ["Classic", "Timeless", "Minimal"],
    occasion: ["Everyday", "Gift", "Anniversary"],
    images: ["earring-studs", "earring-drops"],
    shortDescription: "Halo diamond studs that glow from within.",
    description:
      "Round brilliant diamonds encircled by a fine halo, set in white gold. The studs every collection begins with.",
    isBestSeller: true,
    tags: ["studs", "diamond", "halo"],
    collections: ["timeless-diamonds", "gifts-to-remember", "everyday-elegance"],
    extraSpecs: [{ label: "Diamond weight", value: "0.6 ct total" }],
    featuredRank: 2.5,
    releasedAt: "2025-09-25",
  },
  {
    id: "ear-003",
    slug: "nova-sculpted-hoops",
    name: "Nova Sculpted Hoops",
    category: "Earrings",
    price: 450,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Modern", "Bold"],
    occasion: ["Everyday"],
    images: ["earring-hoops", "earring-twist"],
    shortDescription: "Organic hoops with a softly twisted form.",
    description:
      "Sculpted by hand from wax before casting in gold, each Nova hoop has a softly twisted, organic form that catches the light as you move.",
    isBestSeller: true,
    tags: ["hoops", "sculptural", "gold"],
    collections: ["golden-hour", "everyday-elegance"],
    featuredRank: 5.5,
    releasedAt: "2026-03-30",
  },
  {
    id: "ear-004",
    slug: "noeud-knot-earrings",
    name: "Nœud Knot Earrings",
    category: "Earrings",
    price: 290,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Minimal", "Modern"],
    occasion: ["Everyday", "Gift"],
    images: ["earring-knot", "earring-hoops"],
    shortDescription: "A loosely tied knot in polished gold.",
    description:
      "A loosely tied knot of polished gold — a modern symbol of connection, light enough to wear from morning to night.",
    isNewArrival: true,
    tags: ["knot", "studs", "gift"],
    collections: ["gifts-to-remember", "everyday-elegance"],
    featuredRank: 27,
    releasedAt: "2026-10-12",
  },
  {
    id: "ear-005",
    slug: "aria-twist-hoops",
    name: "Aria Twist Hoops",
    category: "Earrings",
    price: 360,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Bold", "Modern"],
    occasion: ["Everyday", "Evening"],
    images: ["earring-twist", "earring-hoop-model"],
    shortDescription: "Chunky twisted hoops with a lustrous finish.",
    description:
      "Rope-twisted hoops with real volume yet surprising lightness — a contemporary classic in warm gold.",
    tags: ["hoops", "twist", "bold"],
    collections: ["golden-hour"],
    featuredRank: 28,
    releasedAt: "2026-05-02",
  },
  {
    id: "ear-006",
    slug: "rose-pear-drop-earrings",
    name: "Rosé Pear Drop Earrings",
    category: "Earrings",
    price: 1890,
    metal: "18K Rose Gold",
    gemstone: "Diamond",
    style: ["Romantic", "Statement"],
    occasion: ["Wedding", "Evening"],
    images: ["earring-drops", "earring-studs"],
    shortDescription: "Champagne diamond pears beneath a pavé halo.",
    description:
      "Champagne-toned pear drops beneath a pavé halo, set in rose gold. Made for the bride, the guest, and every evening in between.",
    tags: ["drop", "bridal", "rose gold"],
    collections: ["bridal-edit"],
    featuredRank: 29,
    releasedAt: "2026-04-04",
  },
  {
    id: "ear-007",
    slug: "petit-coeur-sapphire-earrings",
    name: "Petit Cœur Sapphire Earrings",
    category: "Earrings",
    price: 240,
    metal: "18K Yellow Gold",
    gemstone: "Sapphire",
    style: ["Romantic", "Delicate"],
    occasion: ["Gift", "Birthday"],
    images: ["earring-blue", "earring-sapphire"],
    shortDescription: "Tiny blue hearts on fine gold hooks.",
    description:
      "Small heart-shaped blue sapphires dangling from fine gold hooks — playful, romantic and a lovely first piece of fine jewelry.",
    tags: ["heart", "sapphire", "gift"],
    collections: ["gifts-to-remember"],
    featuredRank: 30,
    releasedAt: "2026-02-14",
  },
  {
    id: "ear-008",
    slug: "lune-huggie-hoops",
    name: "Lune Huggie Hoops",
    category: "Earrings",
    price: 195,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Minimal", "Delicate"],
    occasion: ["Everyday", "Graduation"],
    images: ["earring-hoop-model", "earring-hoops"],
    shortDescription: "Small, sleek hoops for every single day.",
    description:
      "Sleek huggie hoops that sit close to the lobe. Designed to be slept in, showered in and loved for years.",
    isBestSeller: true,
    tags: ["huggies", "everyday", "hoops"],
    collections: ["everyday-elegance"],
    featuredRank: 31,
    releasedAt: "2025-02-01",
  },
  // ---------------------------------------------------------- Bracelets
  {
    id: "brac-001",
    slug: "infinity-tennis-bracelet",
    name: "Infinity Tennis Bracelet",
    category: "Bracelets",
    price: 4600,
    metal: "Platinum",
    gemstone: "Diamond",
    style: ["Classic", "Timeless"],
    occasion: ["Anniversary", "Wedding"],
    images: ["bracelet-tennis", "bracelet-diamond"],
    shortDescription: "An unbroken line of brilliant diamonds.",
    description:
      "Forty-eight round brilliant diamonds, individually set in platinum and finished with a hidden double-lock clasp.",
    isBestSeller: true,
    tags: ["tennis", "diamond", "classic"],
    collections: ["timeless-diamonds", "bridal-edit"],
    extraSpecs: [{ label: "Diamond weight", value: "3.0 ct total" }],
    featuredRank: 3.5,
    releasedAt: "2025-08-22",
  },
  {
    id: "brac-002",
    slug: "celestine-diamond-bracelet",
    name: "Celestine Diamond Bracelet",
    category: "Bracelets",
    price: 8900,
    metal: "18K White Gold",
    gemstone: "Diamond",
    style: ["Statement", "Classic"],
    occasion: ["Evening", "Celebration"],
    images: ["bracelet-diamond", "bracelet-tennis"],
    shortDescription: "Open links, each a constellation of diamonds.",
    description:
      "Open oval links paved with diamonds and joined by brilliant-cut stations. A bracelet of extraordinary light.",
    stockStatus: "made-to-order",
    tags: ["diamond", "statement", "evening"],
    collections: ["timeless-diamonds", "modern-heirlooms"],
    extraSpecs: [{ label: "Diamond weight", value: "5.4 ct total" }],
    featuredRank: 32,
    releasedAt: "2026-06-30",
  },
  {
    id: "brac-003",
    slug: "cadence-link-bracelet",
    name: "Cadence Link Bracelet",
    category: "Bracelets",
    price: 690,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Bold", "Modern"],
    occasion: ["Everyday", "Gift"],
    images: ["bracelet-chain", "bracelet-bangles"],
    shortDescription: "Hand-finished links with a satisfying weight.",
    description:
      "Rounded links with a satisfying weight, each hand-finished to a soft polish. A modern classic for stacking or wearing alone.",
    tags: ["chain", "links", "gold"],
    collections: ["golden-hour", "gifts-to-remember"],
    featuredRank: 33,
    releasedAt: "2026-01-19",
  },
  {
    id: "brac-004",
    slug: "golden-hour-bangle-set",
    name: "Golden Hour Bangle Set",
    category: "Bracelets",
    price: 1250,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Statement", "Vintage"],
    occasion: ["Celebration", "Wedding"],
    images: ["bracelet-bangles", "bracelet-chain"],
    shortDescription: "Textured bangles that chime softly together.",
    description:
      "A set of four textured bangles, each with a different hand-chased pattern, that chime softly together as you move.",
    isNewArrival: true,
    tags: ["bangles", "set", "textured"],
    collections: ["golden-hour", "modern-heirlooms"],
    featuredRank: 34,
    releasedAt: "2026-10-20",
  },
  {
    id: "brac-005",
    slug: "rosette-filigree-bracelet",
    name: "Rosette Filigree Bracelet",
    category: "Bracelets",
    price: 1580,
    metal: "18K Rose Gold",
    gemstone: "Diamond",
    style: ["Romantic", "Vintage"],
    occasion: ["Anniversary", "Wedding"],
    images: ["bracelet-rose", "bracelet-hand"],
    shortDescription: "Rose gold filigree scattered with diamonds.",
    description:
      "Interlacing rose gold filigree, inspired by antique lace, scattered with diamonds. Romantic and quietly intricate.",
    tags: ["filigree", "rose gold", "vintage"],
    collections: ["bridal-edit", "modern-heirlooms"],
    featuredRank: 35,
    releasedAt: "2025-12-12",
  },
  {
    id: "brac-006",
    slug: "fil-dor-chain-bracelet",
    name: "Fil d'Or Chain Bracelet",
    category: "Bracelets",
    price: 180,
    metal: "18K Yellow Gold",
    gemstone: "None",
    style: ["Delicate", "Minimal"],
    occasion: ["Everyday", "Gift", "Graduation"],
    images: ["bracelet-hand", "bracelet-chain"],
    shortDescription: "A thread of gold for the wrist.",
    description:
      "A fine thread of gold with an adjustable slider. So light you will forget it is there — until it catches the sun.",
    isBestSeller: true,
    tags: ["chain", "everyday", "gift"],
    collections: ["everyday-elegance", "gifts-to-remember"],
    featuredRank: 36,
    releasedAt: "2025-01-15",
  },
];

export const products: Product[] = seeds.map(make);

export const productById = new Map(products.map((p) => [p.id, p]));
export const productBySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(id: string): Product | undefined {
  return productById.get(id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function getBestSellers(limit = 8): Product[] {
  return products
    .filter((p) => p.isBestSeller)
    .sort((a, b) => a.featuredRank - b.featuredRank)
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (p.category === product.category) score += 4;
      if (p.metal === product.metal) score += 2;
      if (p.gemstone === product.gemstone) score += 2;
      score += p.collections.filter((c) => product.collections.includes(c)).length;
      score += p.style.filter((s) => product.style.includes(s)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || a.p.featuredRank - b.p.featuredRank)
    .slice(0, limit)
    .map(({ p }) => p);
}

export const ALL_CATEGORIES: Category[] = [
  "Rings",
  "Engagement Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
];
export const ALL_METALS: Metal[] = [
  "18K Yellow Gold",
  "18K White Gold",
  "18K Rose Gold",
  "Platinum",
];
export const ALL_GEMSTONES: Gemstone[] = [
  "Diamond",
  "Emerald",
  "Sapphire",
  "Ruby",
  "Pearl",
  "None",
];
export const ALL_STYLES: Style[] = [
  "Minimal",
  "Timeless",
  "Classic",
  "Modern",
  "Bold",
  "Romantic",
  "Delicate",
  "Statement",
  "Vintage",
];
export const ALL_OCCASIONS: Occasion[] = [
  "Everyday",
  "Anniversary",
  "Engagement",
  "Wedding",
  "Birthday",
  "Gift",
  "Evening",
  "Celebration",
  "Graduation",
];
