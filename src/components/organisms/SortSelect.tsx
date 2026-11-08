"use client";

import { SORT_OPTIONS } from "@/lib/product-filters";
import type { SortKey } from "@/types/product";

export function SortSelect({
  value,
  onChange,
  id = "sort",
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
  id?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="eyebrow hidden text-stone sm:block">
        Sort by
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="h-10 cursor-pointer appearance-none border-b border-line bg-transparent bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2324211E%22 stroke-width=%221.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:11px] bg-[right_0_center] bg-no-repeat pr-5 text-sm text-charcoal focus:border-charcoal focus:outline-none"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
