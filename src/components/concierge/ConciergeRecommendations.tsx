"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Price } from "@/components/atoms/Price";
import { getProduct } from "@/data/products";
import { gemstoneLabel } from "@/lib/product-filters";
import { useConciergeStore } from "@/store/concierge-store";
import { easeLux } from "@/constants/design-tokens";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";

export function ConciergeRecommendations({ productIds }: { productIds: string[] }) {
  const products = productIds.map((id) => getProduct(id)).filter((p): p is Product => !!p);
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
      {products.map((p, i) => (
        <RecommendationCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}

function RecommendationCard({ product, index }: { product: Product; index: number }) {
  const score = useConciergeStore((s) => s.matchScores[product.id]);
  const rejected = useConciergeStore((s) => s.rejectedIds.includes(product.id));
  const isTyping = useConciergeStore((s) => s.isTyping);
  const love = useConciergeStore((s) => s.loveProduct);
  const reject = useConciergeStore((s) => s.rejectProduct);
  const confirmAdd = useConciergeStore((s) => s.confirmAdd);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeLux, delay: 0.1 + index * 0.09 }}
      className={cn(
        "relative flex w-[78vw] max-w-[320px] shrink-0 snap-start flex-col border border-line bg-ivory sm:w-auto sm:max-w-none",
        rejected && "opacity-55",
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <SmartImage
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 78vw"
          wrapperClassName="absolute inset-0"
          className="object-cover"
        />
        {score && (
          <span className="absolute left-3 top-3 bg-ivory/95 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-espresso">
            {score.matchPercent}% match
          </span>
        )}
        {rejected && (
          <span className="absolute inset-0 flex items-center justify-center bg-ivory/60 font-serif text-xl italic text-charcoal">
            Noted — not for you
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl leading-snug text-charcoal">{product.name}</h3>
          <Price value={product.price} size="sm" className="mt-1 shrink-0" />
        </div>
        <p className="mt-1 text-xs text-stone">
          {product.metal} · {gemstoneLabel(product.gemstone)}
        </p>
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-stone">{product.shortDescription}</p>
        {score?.reasons.length ? (
          <ul className="mt-3 space-y-1">
            {score.reasons.map((r) => (
              <li key={r} className="flex items-start gap-2 text-xs text-espresso">
                <span aria-hidden className="mt-[5px] h-1 w-1 shrink-0 rotate-45 bg-gold" />
                {r}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-5">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={isTyping || rejected}
              onClick={() => love(product.id)}
              className="inline-flex h-10 items-center justify-center gap-1.5 border border-charcoal/70 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory disabled:opacity-40"
            >
              <Heart className="h-3.5 w-3.5" strokeWidth={1.5} /> Love it
            </button>
            <button
              type="button"
              disabled={isTyping || rejected}
              onClick={() => reject(product.id)}
              className="inline-flex h-10 items-center justify-center gap-1.5 border border-line text-[0.625rem] font-medium uppercase tracking-[0.14em] text-stone transition-colors hover:border-charcoal/50 hover:text-charcoal disabled:opacity-40"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} /> Not for me
            </button>
          </div>
          <button
            type="button"
            disabled={isTyping}
            onClick={() => confirmAdd(product.id)}
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 bg-espresso text-[0.625rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-charcoal disabled:opacity-40"
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} /> Add to bag
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="mt-3 block text-center text-[0.625rem] uppercase tracking-[0.16em] text-charcoal underline-offset-4 hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
