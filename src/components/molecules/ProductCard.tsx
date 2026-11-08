"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Price } from "@/components/atoms/Price";
import { WishlistButton } from "./WishlistButton";
import { ProductBadges } from "./ProductBadges";
import { useUIStore } from "@/store/ui-store";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";
import { easeLux } from "@/constants/design-tokens";

export function ProductCard({
  product,
  priority = false,
  index = 0,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  className,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
  sizes?: string;
  className?: string;
}) {
  const openQuickView = useUIStore((s) => s.openQuickView);
  const [primary, secondary] = product.images;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: easeLux, delay: (index % 4) * 0.06 }}
      className={cn("group relative flex flex-col", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 block"
          aria-label={`${product.name}, ${product.metal}`}
        >
          <SmartImage
            src={primary}
            alt={product.name}
            fill
            sizes={sizes}
            priority={priority}
            wrapperClassName="absolute inset-0"
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-lux)] group-hover:scale-[1.04]"
          />
          {secondary && (
            <SmartImage
              src={secondary}
              alt=""
              fill
              sizes={sizes}
              wrapperClassName="absolute inset-0 opacity-0 transition-opacity duration-700 ease-[var(--ease-lux)] group-hover:opacity-100 bg-transparent!"
              className="object-cover"
            />
          )}
        </Link>

        <ProductBadges product={product} className="pointer-events-none absolute left-3 top-3" />
        <WishlistButton product={product} className="absolute right-3 top-3" />

        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="absolute inset-x-3 bottom-3 hidden h-10 items-center justify-center gap-2 bg-ivory/95 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-charcoal opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:opacity-100 sm:flex sm:translate-y-2"
        >
          <Eye aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
          Quick view
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg leading-snug text-charcoal sm:text-xl">
            <Link href={`/product/${product.slug}`} className="hover:underline hover:decoration-1 hover:underline-offset-4">
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="text-xs text-stone">{product.metal}</p>
        <div className="mt-1 flex items-center justify-between">
          <Price value={product.price} size="sm" />
          <button
            type="button"
            onClick={() => openQuickView(product.id)}
            className="text-[0.625rem] uppercase tracking-[0.16em] text-stone underline-offset-4 hover:text-charcoal hover:underline sm:hidden"
          >
            Quick view
          </button>
        </div>
      </div>
    </motion.article>
  );
}
