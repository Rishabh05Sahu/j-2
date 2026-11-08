"use client";

import Link from "next/link";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Price } from "@/components/atoms/Price";
import { QuantitySelector } from "./QuantitySelector";
import { sizeLabel } from "./SizeSelector";
import { MAX_QUANTITY } from "@/store/cart-store";
import type { CartLine } from "@/types/cart";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";

export function CartItem({
  line,
  product,
  onQuantity,
  onRemove,
  onSize,
  onNavigate,
  compact = false,
}: {
  line: CartLine;
  product: Product;
  onQuantity: (q: number) => void;
  onRemove: () => void;
  onSize: (size: string) => void;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  return (
    <div className="flex gap-4 py-5">
      <Link
        href={`/product/${product.slug}`}
        onClick={onNavigate}
        className={cn("relative shrink-0 bg-cream", compact ? "h-28 w-[5.5rem]" : "h-36 w-28 sm:h-44 sm:w-36")}
        aria-label={product.name}
      >
        <SmartImage
          src={product.images[0]}
          alt=""
          fill
          sizes="150px"
          wrapperClassName="absolute inset-0"
          className="object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${product.slug}`}
              onClick={onNavigate}
              className="font-serif text-lg leading-snug text-charcoal hover:underline hover:underline-offset-4"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-stone">{product.metal}</p>
          </div>
          <Price value={product.price * line.quantity} size="sm" className="shrink-0" />
        </div>

        {product.sizes.length > 1 ? (
          <label className="mt-2 flex items-center gap-2 text-xs text-stone">
            {sizeLabel(product.category)}
            <select
              value={line.size}
              onChange={(e) => onSize(e.target.value)}
              className="cursor-pointer border-b border-line bg-transparent py-0.5 pr-1 text-xs text-charcoal focus:border-charcoal focus:outline-none"
            >
              {product.sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <p className="mt-2 text-xs text-stone">One size</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantitySelector
            size="sm"
            value={line.quantity}
            min={1}
            max={MAX_QUANTITY}
            onChange={onQuantity}
            label={`Quantity for ${product.name}`}
          />
          <button
            type="button"
            onClick={onRemove}
            className="text-[0.625rem] uppercase tracking-[0.16em] text-stone underline-offset-4 transition-colors hover:text-charcoal hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
