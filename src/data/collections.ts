import type { Collection } from "@/types/product";
import { products } from "./products";

export const collections: Collection[] = [
  {
    slug: "bridal-edit",
    name: "The Bridal Edit",
    tagline: "For the promises that last a lifetime",
    description:
      "Engagement rings, wedding bands and heirloom pearls for the day you say yes — and every day after.",
    image: "/images/products/ring-halo.jpg",
  },
  {
    slug: "everyday-elegance",
    name: "Everyday Elegance",
    tagline: "Pieces you never take off",
    description:
      "Fine chains, small hoops and quiet diamonds, designed to move through life with you.",
    image: "/images/editorial/story-delicate.jpg",
  },
  {
    slug: "golden-hour",
    name: "Golden Hour",
    tagline: "Warm gold, softly lit",
    description:
      "Sculpted links, textured bangles and sunlit coins in our warmest 18K yellow gold.",
    image: "/images/products/bracelet-bangles.jpg",
  },
  {
    slug: "timeless-diamonds",
    name: "Timeless Diamonds",
    tagline: "Brilliance, distilled",
    description:
      "Studs, tennis bracelets and halos — the diamond essentials, cut and set to perfection.",
    image: "/images/products/bracelet-tennis.jpg",
  },
  {
    slug: "modern-heirlooms",
    name: "Modern Heirlooms",
    tagline: "Tomorrow's treasures, made today",
    description:
      "Coloured gemstones and vintage-inspired craft, made to be handed down.",
    image: "/images/products/ring-flower.jpg",
  },
  {
    slug: "gifts-to-remember",
    name: "Gifts to Remember",
    tagline: "Thoughtful, from the first glance",
    description:
      "Hearts, knots and pearls — gifts with meaning, beautifully wrapped in our signature box.",
    image: "/images/products/necklace-heart.jpg",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProducts(slug: string) {
  return products
    .filter((p) => p.collections.includes(slug))
    .sort((a, b) => a.featuredRank - b.featuredRank);
}
