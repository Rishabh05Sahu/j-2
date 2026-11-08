"use client";

import { useMemo, useState } from "react";
import {
  EMPTY_FILTERS,
  filterProducts,
  sortProducts,
} from "@/lib/product-filters";
import type { Product, ProductFilterState, SortKey } from "@/types/product";

type ArrayKeys = {
  [K in keyof ProductFilterState]: ProductFilterState[K] extends unknown[] ? K : never;
}[keyof ProductFilterState];

export function useProducts(source: Product[], initial?: Partial<ProductFilterState>) {
  const [filters, setFilters] = useState<ProductFilterState>({
    ...EMPTY_FILTERS,
    ...initial,
  });
  const [sort, setSort] = useState<SortKey>("featured");

  const results = useMemo(
    () => sortProducts(filterProducts(source, filters), sort),
    [source, filters, sort],
  );

  function toggleValue<K extends ArrayKeys>(key: K, value: ProductFilterState[K][number]) {
    setFilters((f) => {
      const list = f[key] as unknown[];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...f, [key]: next };
    });
  }

  return {
    filters,
    setFilters,
    sort,
    setSort,
    results,
    toggleValue,
    setQuery: (query: string) => setFilters((f) => ({ ...f, query })),
    setPriceRange: (priceRange: string | null) => setFilters((f) => ({ ...f, priceRange })),
    clearAll: () => setFilters((f) => ({ ...EMPTY_FILTERS, query: f.query })),
  };
}

export type ProductsController = ReturnType<typeof useProducts>;
