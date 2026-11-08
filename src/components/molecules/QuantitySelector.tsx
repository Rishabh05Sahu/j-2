"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
  label = "Quantity",
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  const btn = cn(
    "flex items-center justify-center text-charcoal transition-colors hover:bg-cream disabled:opacity-30 disabled:hover:bg-transparent",
    size === "md" ? "h-12 w-11" : "h-9 w-9",
  );
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex items-center border border-line", className)}
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <span
        aria-live="polite"
        className={cn("min-w-8 text-center text-sm tabular-nums", size === "sm" && "min-w-6 text-[0.8125rem]")}
      >
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
