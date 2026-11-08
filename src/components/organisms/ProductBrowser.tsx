"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Sheet } from "@/components/molecules/Sheet";
import { SearchInput } from "@/components/molecules/SearchInput";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Button } from "@/components/atoms/Button";
import { ProductCard } from "@/components/molecules/ProductCard";
import { ProductFilters } from "./ProductFilters";
import { ActiveFilters } from "./ActiveFilters";
import { SortSelect } from "./SortSelect";
import { useProducts } from "@/hooks/useProducts";
import { countActiveFilters } from "@/lib/product-filters";
import { useConciergeStore } from "@/store/concierge-store";
import type { Product, ProductFilterState } from "@/types/product";

/**
 * Search + filters + sort + grid. Used by Discover (all products) and the
 * category / collection listing pages.
 */
export function ProductBrowser({
  source,
  initialFilters,
  showSearch = true,
  hideCategoryFilter = false,
}: {
  source: Product[];
  initialFilters?: Partial<ProductFilterState>;
  showSearch?: boolean;
  hideCategoryFilter?: boolean;
}) {
  const controller = useProducts(source, initialFilters);
  const { results, filters, sort, setSort, setQuery, clearAll } = controller;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openConcierge = useConciergeStore((s) => s.open);
  const active = countActiveFilters(filters);

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr] xl:gap-14">
      {/* Desktop filters */}
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-[calc(var(--header-h)+1.5rem)] max-h-[calc(100dvh-var(--header-h)-3rem)] overflow-y-auto pb-8 pr-2">
          <p className="eyebrow border-b border-line pb-4 text-charcoal">Refine</p>
          <ProductFilters
            controller={controller}
            source={source}
            hideCategory={hideCategoryFilter}
            idPrefix="desk"
          />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
          {showSearch ? (
            <SearchInput
              id="discover-search"
              value={filters.query}
              onChange={setQuery}
              placeholder="Search by name, stone or style"
              className="w-full sm:max-w-xs"
            />
          ) : (
            <span />
          )}
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 items-center gap-2 border border-line px-4 text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal lg:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.4} />
              Filter{active > 0 && ` (${active})`}
            </button>
            <p className="hidden text-xs text-stone sm:block" aria-live="polite">
              {results.length} {results.length === 1 ? "piece" : "pieces"}
            </p>
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between sm:hidden">
          <p className="text-xs text-stone" aria-live="polite">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        <div className="mt-4">
          <ActiveFilters controller={controller} />
        </div>

        {results.length === 0 ? (
          <EmptyState
            title="No pieces match — yet."
            description="Try softening a filter, or let your concierge suggest something close to what you have in mind."
            primary={{ label: "Clear filters", onClick: () => { clearAll(); setQuery(""); } }}
            secondary={{ label: "Ask my concierge", onClick: () => openConcierge() }}
          />
        ) : (
          <motion.ul layout className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {results.map((p, i) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={p} index={i} priority={i < 3} sizes="(min-width: 1024px) 26vw, (min-width: 768px) 33vw, 50vw" />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>

      {/* Mobile filter drawer */}
      <Sheet open={drawerOpen} onClose={() => setDrawerOpen(false)} side="bottom" label="Filter and sort">
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
          <p className="font-serif text-2xl font-light text-charcoal">Filter &amp; sort</p>
          {active > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-[0.6875rem] uppercase tracking-[0.16em] text-stone underline underline-offset-4"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-4">
          <div className="border-b border-line py-4">
            <SortSelect id="sort-mobile" value={sort} onChange={setSort} />
          </div>
          <ProductFilters
            controller={controller}
            source={source}
            hideCategory={hideCategoryFilter}
            idPrefix="mob"
          />
        </div>
        <div className="shrink-0 border-t border-line px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4">
          <Button fullWidth size="lg" onClick={() => setDrawerOpen(false)}>
            Show {results.length} {results.length === 1 ? "piece" : "pieces"}
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
