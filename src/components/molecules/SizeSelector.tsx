"use client";

import { cn } from "@/lib/cn";
import type { Category } from "@/types/product";

export function sizeLabel(category: Category) {
  if (category === "Rings" || category === "Engagement Rings") return "Ring size";
  if (category === "Necklaces") return "Chain length";
  if (category === "Bracelets") return "Wrist size";
  return "Size";
}

export function SizeSelector({
  sizes,
  value,
  onChange,
  category,
  name,
}: {
  sizes: string[];
  value: string;
  onChange: (size: string) => void;
  category: Category;
  name: string;
}) {
  if (sizes.length <= 1) return null;
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-stone">
        {sizeLabel(category)}: <span className="text-charcoal">{value}</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <label key={size} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={size}
              checked={value === size}
              onChange={() => onChange(size)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "flex h-11 min-w-11 items-center justify-center border px-3 text-[0.8125rem] transition-colors peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-espresso",
                value === size
                  ? "border-espresso bg-espresso text-ivory"
                  : "border-line text-charcoal hover:border-charcoal/60",
              )}
            >
              {size}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
