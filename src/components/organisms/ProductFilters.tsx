"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Checkbox, Radio } from "@/components/atoms/Checkbox";
import {
  ALL_CATEGORIES,
  ALL_GEMSTONES,
  ALL_METALS,
  ALL_OCCASIONS,
  ALL_STYLES,
} from "@/data/products";
import { PRICE_RANGES, STOCK_LABELS, gemstoneLabel } from "@/lib/product-filters";
import type { ProductsController } from "@/hooks/useProducts";
import type { Product, StockStatus } from "@/types/product";

function count<T>(items: Product[], pick: (p: Product) => T | T[], value: T) {
  return items.filter((p) => {
    const v = pick(p);
    return Array.isArray(v) ? v.includes(value) : v === value;
  }).length;
}

function Group({
  title,
  children,
  defaultOpen = true,
  activeCount = 0,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  activeCount?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <fieldset className="border-b border-line py-4">
      <legend className="contents">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between py-1 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal"
        >
          <span>
            {title}
            {activeCount > 0 && <span className="ml-2 text-gold-deep">({activeCount})</span>}
          </span>
          {open ? (
            <Minus aria-hidden className="h-3.5 w-3.5" strokeWidth={1.4} />
          ) : (
            <Plus aria-hidden className="h-3.5 w-3.5" strokeWidth={1.4} />
          )}
        </button>
      </legend>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </fieldset>
  );
}

export function ProductFilters({
  controller,
  source,
  hideCategory = false,
  idPrefix = "f",
}: {
  controller: ProductsController;
  source: Product[];
  hideCategory?: boolean;
  idPrefix?: string;
}) {
  const { filters, toggleValue, setPriceRange } = controller;
  const availability: StockStatus[] = ["in-stock", "low-stock", "made-to-order"];

  return (
    <div>
      {!hideCategory && (
        <Group title="Category" activeCount={filters.categories.length}>
          {ALL_CATEGORIES.map((c) => (
            <Checkbox
              key={c}
              label={c}
              hint={count(source, (p) => p.category, c)}
              checked={filters.categories.includes(c)}
              onChange={() => toggleValue("categories", c)}
            />
          ))}
        </Group>
      )}
      <Group title="Price" activeCount={filters.priceRange ? 1 : 0}>
        <Radio
          name={`${idPrefix}-price`}
          label="All prices"
          checked={!filters.priceRange}
          onChange={() => setPriceRange(null)}
        />
        {PRICE_RANGES.map((r) => (
          <Radio
            key={r.id}
            name={`${idPrefix}-price`}
            label={r.label}
            hint={source.filter((p) => p.price >= r.min && p.price <= r.max).length}
            checked={filters.priceRange === r.id}
            onChange={() => setPriceRange(r.id)}
          />
        ))}
      </Group>
      <Group title="Metal" activeCount={filters.metals.length}>
        {ALL_METALS.map((m) => (
          <Checkbox
            key={m}
            label={m}
            hint={count(source, (p) => p.metal, m)}
            checked={filters.metals.includes(m)}
            onChange={() => toggleValue("metals", m)}
          />
        ))}
      </Group>
      <Group title="Gemstone" activeCount={filters.gemstones.length}>
        {ALL_GEMSTONES.map((g) => (
          <Checkbox
            key={g}
            label={gemstoneLabel(g)}
            hint={count(source, (p) => p.gemstone, g)}
            checked={filters.gemstones.includes(g)}
            onChange={() => toggleValue("gemstones", g)}
          />
        ))}
      </Group>
      <Group title="Style" defaultOpen={false} activeCount={filters.styles.length}>
        {ALL_STYLES.map((s) => (
          <Checkbox
            key={s}
            label={s}
            hint={count(source, (p) => p.style, s)}
            checked={filters.styles.includes(s)}
            onChange={() => toggleValue("styles", s)}
          />
        ))}
      </Group>
      <Group title="Occasion" defaultOpen={false} activeCount={filters.occasions.length}>
        {ALL_OCCASIONS.map((o) => (
          <Checkbox
            key={o}
            label={o}
            hint={count(source, (p) => p.occasion, o)}
            checked={filters.occasions.includes(o)}
            onChange={() => toggleValue("occasions", o)}
          />
        ))}
      </Group>
      <Group title="Availability" defaultOpen={false} activeCount={filters.availability.length}>
        {availability.map((a) => (
          <Checkbox
            key={a}
            label={STOCK_LABELS[a]}
            hint={count(source, (p) => p.stockStatus, a)}
            checked={filters.availability.includes(a)}
            onChange={() => toggleValue("availability", a)}
          />
        ))}
      </Group>
    </div>
  );
}
