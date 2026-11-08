export type Category =
  | "Rings"
  | "Necklaces"
  | "Earrings"
  | "Bracelets"
  | "Engagement Rings";

export type Metal =
  | "18K Yellow Gold"
  | "18K White Gold"
  | "18K Rose Gold"
  | "Platinum";

export type Gemstone =
  | "Diamond"
  | "Emerald"
  | "Sapphire"
  | "Ruby"
  | "Pearl"
  | "None";

export type Style =
  | "Minimal"
  | "Timeless"
  | "Classic"
  | "Modern"
  | "Bold"
  | "Romantic"
  | "Delicate"
  | "Statement"
  | "Vintage";

export type Occasion =
  | "Everyday"
  | "Anniversary"
  | "Engagement"
  | "Wedding"
  | "Birthday"
  | "Gift"
  | "Evening"
  | "Celebration"
  | "Graduation";

export type StockStatus = "in-stock" | "low-stock" | "made-to-order";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  metal: Metal;
  gemstone: Gemstone;
  style: Style[];
  occasion: Occasion[];
  sizes: string[];
  isBestSeller: boolean;
  isNewArrival: boolean;
  stockStatus: StockStatus;
  tags: string[];
  collections: string[];
  specs: ProductSpec[];
  /** Lower is more prominent in "Featured" sorting. */
  featuredRank: number;
  /** ISO date used for "New arrivals" sorting. */
  releasedAt: string;
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "best-sellers";

export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface ProductFilterState {
  query: string;
  categories: Category[];
  priceRange: string | null;
  metals: Metal[];
  gemstones: Gemstone[];
  styles: Style[];
  occasions: Occasion[];
  availability: StockStatus[];
}
