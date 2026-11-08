"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { Sheet } from "@/components/molecules/Sheet";
import { IconButton } from "@/components/atoms/IconButton";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Price } from "@/components/atoms/Price";
import { Button } from "@/components/atoms/Button";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { WishlistButton } from "@/components/molecules/WishlistButton";
import { ProductBadges } from "@/components/molecules/ProductBadges";
import { getProduct } from "@/data/products";
import { useUIStore } from "@/store/ui-store";
import { useAddToBag } from "@/hooks/useCart";
import { gemstoneLabel, STOCK_LABELS } from "@/lib/product-filters";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";

export function QuickViewModal() {
  const id = useUIStore((s) => s.quickViewProductId);
  const close = useUIStore((s) => s.closeQuickView);
  const product = id ? getProduct(id) : undefined;

  return (
    <Sheet
      open={!!product}
      onClose={close}
      side="center"
      label={product ? `Quick view: ${product.name}` : "Quick view"}
      className="overflow-hidden"
    >
      {product && <QuickViewBody key={product.id} product={product} onClose={close} />}
    </Sheet>
  );
}

function QuickViewBody({ product, onClose }: { product: Product; onClose: () => void }) {
  const [size, setSize] = useState(product.sizes[Math.floor((product.sizes.length - 1) / 2)]);
  const [imageIndex, setImageIndex] = useState(0);
  const addToBag = useAddToBag();

  return (
    <div className="grid max-h-[90dvh] overflow-y-auto md:grid-cols-2">
      <div className="relative">
        <div className="relative aspect-[4/5] bg-cream md:aspect-auto md:h-full md:min-h-[560px]">
          {product.images.map((src, i) => (
            <SmartImage
              key={src + i}
              src={src}
              alt={i === 0 ? product.name : ""}
              fill
              sizes="(min-width: 768px) 450px, 100vw"
              wrapperClassName={cn(
                "absolute inset-0 transition-opacity duration-500",
                i === imageIndex ? "opacity-100" : "opacity-0",
              )}
              className="object-cover"
            />
          ))}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {product.images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImageIndex(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={i === imageIndex}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    i === imageIndex ? "bg-espresso" : "bg-ivory",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="relative flex flex-col p-6 sm:p-10">
        <IconButton label="Close quick view" onClick={onClose} className="absolute right-3 top-3">
          <X className="h-5 w-5" strokeWidth={1.3} />
        </IconButton>
        <ProductBadges product={product} className="mb-4" />
        <p className="eyebrow text-stone">{product.category}</p>
        <h2 className="mt-2 pr-8 font-serif text-3xl font-light leading-tight text-charcoal sm:text-4xl">
          {product.name}
        </h2>
        <Price value={product.price} size="lg" className="mt-3" />
        <p className="mt-5 text-sm leading-relaxed text-stone">{product.shortDescription}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-line py-4 text-xs">
          <div>
            <dt className="text-stone">Metal</dt>
            <dd className="mt-0.5 text-charcoal">{product.metal}</dd>
          </div>
          <div>
            <dt className="text-stone">Gemstone</dt>
            <dd className="mt-0.5 text-charcoal">{gemstoneLabel(product.gemstone)}</dd>
          </div>
        </dl>
        <div className="mt-6">
          <SizeSelector
            name={`qv-size-${product.id}`}
            sizes={product.sizes}
            value={size}
            onChange={setSize}
            category={product.category}
          />
        </div>
        <p className="mt-4 text-xs text-stone">{STOCK_LABELS[product.stockStatus]}</p>
        <div className="mt-auto flex gap-2.5 pt-6">
          <Button
            size="lg"
            fullWidth
            onClick={() => {
              addToBag(product, size);
              onClose();
            }}
          >
            Add to bag
          </Button>
          <WishlistButton product={product} className="h-14! w-14! shrink-0 rounded-none! border border-line" />
        </div>
        <Link
          href={`/product/${product.slug}`}
          onClick={onClose}
          className="mt-4 self-center text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal underline underline-offset-4"
        >
          View full details
        </Link>
      </div>
    </div>
  );
}
