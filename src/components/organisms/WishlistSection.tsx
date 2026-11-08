"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Price } from "@/components/atoms/Price";
import { Spinner } from "@/components/atoms/Spinner";
import { EmptyState } from "@/components/molecules/EmptyState";
import { sizeLabel } from "@/components/molecules/SizeSelector";
import { useWishlist } from "@/hooks/useWishlist";
import { useAddToBag } from "@/hooks/useCart";
import { useConciergeStore } from "@/store/concierge-store";
import type { Product } from "@/types/product";

export function WishlistSection() {
  const { hydrated, products, remove } = useWishlist();
  const openConcierge = useConciergeStore((s) => s.open);

  if (!hydrated)
    return (
      <div className="flex justify-center py-24 text-stone">
        <Spinner label="Loading your wishlist" />
      </div>
    );

  if (products.length === 0)
    return (
      <EmptyState
        title="Nothing saved — yet."
        description="Tap the heart on any piece to keep it close. Your wishlist is saved on this device."
        primary={{ label: "Discover jewelry", href: "/discover" }}
        secondary={{ label: "Ask my concierge", onClick: () => openConcierge() }}
      />
    );

  return (
    <ul className="grid grid-cols-1 gap-x-5 gap-y-12 min-[430px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence initial={false}>
        {products.map((p) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
          >
            <WishlistCard product={p} onRemove={() => remove(p.id)} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

function WishlistCard({ product, onRemove }: { product: Product; onRemove: () => void }) {
  const [size, setSize] = useState(product.sizes[Math.floor((product.sizes.length - 1) / 2)]);
  const addToBag = useAddToBag();

  return (
    <article className="flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="absolute inset-0">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
            wrapperClassName="absolute inset-0"
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        </Link>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${product.name} from wishlist`}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/85 text-charcoal backdrop-blur hover:bg-ivory"
        >
          <X className="h-4 w-4" strokeWidth={1.4} />
        </button>
      </div>
      <h2 className="mt-4 font-serif text-xl leading-snug text-charcoal">
        <Link href={`/product/${product.slug}`} className="hover:underline hover:underline-offset-4">
          {product.name}
        </Link>
      </h2>
      <p className="text-xs text-stone">{product.metal}</p>
      <Price value={product.price} size="sm" className="mt-1" />
      {product.sizes.length > 1 && (
        <label className="mt-3 flex items-center gap-2 text-xs text-stone">
          {sizeLabel(product.category)}
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="cursor-pointer border-b border-line bg-transparent py-0.5 text-xs text-charcoal focus:outline-none"
          >
            {product.sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      )}
      <div className="mt-auto grid gap-2 pt-4">
        <button
          type="button"
          onClick={() => {
            addToBag(product, size);
            onRemove();
          }}
          className="h-11 bg-espresso text-[0.625rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-charcoal"
        >
          Move to bag
        </button>
        <Link
          href={`/product/${product.slug}`}
          className="flex h-11 items-center justify-center border border-line text-[0.625rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-charcoal/60"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
