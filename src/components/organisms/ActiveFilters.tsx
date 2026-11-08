"use client";

import { FilterChip } from "@/components/molecules/FilterChip";
import { PRICE_RANGES, STOCK_LABELS, countActiveFilters, gemstoneLabel } from "@/lib/product-filters";
import type { ProductsController } from "@/hooks/useProducts";

export function ActiveFilters({ controller }: { controller: ProductsController }) {
  const { filters, toggleValue, setPriceRange, clearAll } = controller;
  if (countActiveFilters(filters) === 0) return null;
  const price = PRICE_RANGES.find((r) => r.id === filters.priceRange);

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Active filters">
      {filters.categories.map((v) => (
        <FilterChip key={v} removable onClick={() => toggleValue("categories", v)}>
          {v}
        </FilterChip>
      ))}
      {price && (
        <FilterChip removable onClick={() => setPriceRange(null)}>
          {price.label}
        </FilterChip>
      )}
      {filters.metals.map((v) => (
        <FilterChip key={v} removable onClick={() => toggleValue("metals", v)}>
          {v}
        </FilterChip>
      ))}
      {filters.gemstones.map((v) => (
        <FilterChip key={v} removable onClick={() => toggleValue("gemstones", v)}>
          {gemstoneLabel(v)}
        </FilterChip>
      ))}
      {filters.styles.map((v) => (
        <FilterChip key={v} removable onClick={() => toggleValue("styles", v)}>
          {v}
        </FilterChip>
      ))}
      {filters.occasions.map((v) => (
        <FilterChip key={v} removable onClick={() => toggleValue("occasions", v)}>
          {v}
        </FilterChip>
      ))}
      {filters.availability.map((v) => (
        <FilterChip key={v} removable onClick={() => toggleValue("availability", v)}>
          {STOCK_LABELS[v]}
        </FilterChip>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="ml-1 text-[0.6875rem] uppercase tracking-[0.16em] text-stone underline underline-offset-4 hover:text-charcoal"
      >
        Clear all
      </button>
    </div>
  );
}
