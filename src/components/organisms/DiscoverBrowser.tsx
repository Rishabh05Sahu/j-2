"use client";

import { useSearchParams } from "next/navigation";
import { ProductBrowser } from "./ProductBrowser";
import { products } from "@/data/products";
import { getShopCategory } from "@/constants/navigation";
import type { ProductFilterState } from "@/types/product";

/** Reads ?category= and ?q= so links from nav and search land pre-filtered. */
export function DiscoverBrowser() {
  const params = useSearchParams();
  const categorySlug = params.get("category");
  const query = params.get("q") ?? "";
  const shopCategory = categorySlug ? getShopCategory(categorySlug) : undefined;

  const initial: Partial<ProductFilterState> = {
    query,
    categories: shopCategory ? [shopCategory.category] : [],
  };

  return <ProductBrowser key={params.toString()} source={products} initialFilters={initial} />;
}
