import type {
  PriceRange,
  Product,
  ProductFilterState,
  SortKey,
} from "@/types/product";

export const PRICE_RANGES: PriceRange[] = [
  { id: "under-250", label: "Under $250", min: 0, max: 249.99 },
  { id: "250-500", label: "$250 – $500", min: 250, max: 500 },
  { id: "500-1000", label: "$500 – $1,000", min: 500, max: 1000 },
  { id: "1000-3000", label: "$1,000 – $3,000", min: 1000, max: 3000 },
  { id: "3000-plus", label: "Above $3,000", min: 3000, max: Infinity },
];

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "newest", label: "New arrivals" },
  { value: "best-sellers", label: "Best sellers" },
];

export const STOCK_LABELS: Record<Product["stockStatus"], string> = {
  "in-stock": "In stock",
  "low-stock": "Only a few left",
  "made-to-order": "Made to order",
};

export const EMPTY_FILTERS: ProductFilterState = {
  query: "",
  categories: [],
  priceRange: null,
  metals: [],
  gemstones: [],
  styles: [],
  occasions: [],
  availability: [],
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function matchesQuery(product: Product, query: string): boolean {
  const q = normalize(query.trim());
  if (!q) return true;
  const haystack = normalize(
    [
      product.name,
      product.category,
      product.metal,
      product.gemstone,
      product.shortDescription,
      ...product.style,
      ...product.occasion,
      ...product.tags,
    ].join(" "),
  );
  return q.split(/\s+/).every((term) => haystack.includes(term.replace(/s$/, "")));
}

export function filterProducts(
  items: Product[],
  filters: ProductFilterState,
): Product[] {
  const range = PRICE_RANGES.find((r) => r.id === filters.priceRange);
  return items.filter((p) => {
    if (!matchesQuery(p, filters.query)) return false;
    if (filters.categories.length && !filters.categories.includes(p.category))
      return false;
    if (range && (p.price < range.min || p.price > range.max)) return false;
    if (filters.metals.length && !filters.metals.includes(p.metal)) return false;
    if (filters.gemstones.length && !filters.gemstones.includes(p.gemstone))
      return false;
    if (filters.styles.length && !p.style.some((s) => filters.styles.includes(s)))
      return false;
    if (
      filters.occasions.length &&
      !p.occasion.some((o) => filters.occasions.includes(o))
    )
      return false;
    if (
      filters.availability.length &&
      !filters.availability.includes(p.stockStatus)
    )
      return false;
    return true;
  });
}

export function sortProducts(items: Product[], sort: SortKey): Product[] {
  const list = [...items];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "newest":
      return list.sort(
        (a, b) =>
          Number(b.isNewArrival) - Number(a.isNewArrival) ||
          b.releasedAt.localeCompare(a.releasedAt),
      );
    case "best-sellers":
      return list.sort(
        (a, b) =>
          Number(b.isBestSeller) - Number(a.isBestSeller) ||
          a.featuredRank - b.featuredRank,
      );
    default:
      return list.sort((a, b) => a.featuredRank - b.featuredRank);
  }
}

export function countActiveFilters(filters: ProductFilterState): number {
  return (
    filters.categories.length +
    (filters.priceRange ? 1 : 0) +
    filters.metals.length +
    filters.gemstones.length +
    filters.styles.length +
    filters.occasions.length +
    filters.availability.length
  );
}

export function gemstoneLabel(gem: Product["gemstone"]): string {
  return gem === "None" ? "No gemstone" : gem;
}
