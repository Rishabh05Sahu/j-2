import type { Category } from "@/types/product";

export interface ShopCategory {
  slug: string;
  category: Category;
  label: string;
  title: string;
  description: string;
  image: string;
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: "engagement",
    category: "Engagement Rings",
    label: "Engagement",
    title: "Engagement Rings",
    description:
      "Solitaires, halos and coloured gemstones — each one set by hand for the moment you'll never forget.",
    image: "/images/products/ring-pear.jpg",
  },
  {
    slug: "rings",
    category: "Rings",
    label: "Rings",
    title: "Rings",
    description:
      "From whisper-fine stacking bands to sculptural cocktail rings, crafted in solid 18K gold and platinum.",
    image: "/images/products/ring-stack.jpg",
  },
  {
    slug: "necklaces",
    category: "Necklaces",
    label: "Necklaces",
    title: "Necklaces",
    description:
      "Pendants, pearls and layering chains that frame the face and hold your stories close.",
    image: "/images/editorial/hero-coin.jpg",
  },
  {
    slug: "earrings",
    category: "Earrings",
    label: "Earrings",
    title: "Earrings",
    description:
      "Diamond studs, sculpted hoops and evening drops — light-catching from every angle.",
    image: "/images/products/earring-twist.jpg",
  },
  {
    slug: "bracelets",
    category: "Bracelets",
    label: "Bracelets",
    title: "Bracelets",
    description:
      "Tennis bracelets, textured bangles and fine chains, made to be stacked and treasured.",
    image: "/images/products/bracelet-hand.jpg",
  },
];

export function getShopCategory(slug: string) {
  return SHOP_CATEGORIES.find((c) => c.slug === slug);
}

export function categoryToSlug(category: Category): string {
  return SHOP_CATEGORIES.find((c) => c.category === category)?.slug ?? "rings";
}

export const PRIMARY_NAV = [
  { label: "Collections", href: "/collections", hasMenu: true },
  ...SHOP_CATEGORIES.map((c) => ({
    label: c.label,
    href: `/shop/${c.slug}`,
    hasMenu: false,
  })),
];

export const INFO_PAGES = [
  { slug: "customer-care", label: "Customer care" },
  { slug: "contact", label: "Contact" },
  { slug: "shipping", label: "Shipping" },
  { slug: "returns", label: "Returns" },
  { slug: "privacy", label: "Privacy" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Maison",
    links: [
      { label: "About Solenne", href: "/about" },
      { label: "Collections", href: "/collections" },
      { label: "Discover jewelry", href: "/discover" },
      { label: "Personal concierge", href: "/concierge" },
    ],
  },
  {
    title: "Client care",
    links: [
      { label: "Customer care", href: "/care/customer-care" },
      { label: "Contact", href: "/care/contact" },
      { label: "Shipping", href: "/care/shipping" },
      { label: "Returns", href: "/care/returns" },
    ],
  },
  {
    title: "Your account",
    links: [
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping bag", href: "/cart" },
      { label: "Checkout", href: "/checkout" },
      { label: "Privacy", href: "/care/privacy" },
    ],
  },
];

export const FREE_SHIPPING_THRESHOLD = 500;
export const STANDARD_SHIPPING = 25;
