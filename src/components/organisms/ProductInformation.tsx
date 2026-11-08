"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gift, RotateCcw, Sparkles, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Price } from "@/components/atoms/Price";
import { Button } from "@/components/atoms/Button";
import { ProductBadges } from "@/components/molecules/ProductBadges";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { WishlistButton } from "@/components/molecules/WishlistButton";
import { AccordionItem } from "@/components/molecules/Accordion";
import { ConciergeAvatar } from "@/components/concierge/ConciergeCharacter";
import { useAddToBag } from "@/hooks/useCart";
import { useConciergeStore } from "@/store/concierge-store";
import { gemstoneLabel, STOCK_LABELS } from "@/lib/product-filters";
import { FREE_SHIPPING_THRESHOLD } from "@/constants/navigation";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";

export function ProductInformation({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[Math.floor((product.sizes.length - 1) / 2)]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);
  const addToBag = useAddToBag();
  const openConcierge = useConciergeStore((s) => s.open);

  useEffect(() => {
    const el = addRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), {
      rootMargin: "0px 0px -40px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleAdd = () => {
    addToBag(product, size, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const shipping =
    product.stockStatus === "made-to-order"
      ? "Handcrafted to order — ships in 4–6 weeks."
      : "Ships in 1–2 business days.";

  return (
    <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
      <ProductBadges product={product} className="mb-5" />
      <p className="eyebrow text-stone">{product.category}</p>
      <h1 className="mt-3 font-serif text-[2.4rem] font-light leading-[1.05] text-charcoal sm:text-5xl">
        {product.name}
      </h1>
      <Price value={product.price} size="lg" className="mt-4 block" />
      <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-stone">{product.shortDescription}</p>

      <dl className="mt-7 grid grid-cols-2 border-y border-line py-5 text-sm">
        <div>
          <dt className="text-xs text-stone">Material</dt>
          <dd className="mt-1 text-charcoal">{product.metal}</dd>
        </div>
        <div>
          <dt className="text-xs text-stone">Gemstone</dt>
          <dd className="mt-1 text-charcoal">{gemstoneLabel(product.gemstone)}</dd>
        </div>
      </dl>

      <div className="mt-7 space-y-7">
        <SizeSelector
          name={`size-${product.id}`}
          sizes={product.sizes}
          value={size}
          onChange={setSize}
          category={product.category}
        />
        <div className="flex items-center gap-5">
          <QuantitySelector value={quantity} onChange={setQuantity} max={10} />
          <p
            className={cn(
              "flex items-center gap-2 text-xs",
              product.stockStatus === "in-stock" ? "text-stone" : "text-gold-deep",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                product.stockStatus === "in-stock" ? "bg-emerald-700/70" : "bg-gold",
              )}
            />
            {STOCK_LABELS[product.stockStatus]}
          </p>
        </div>
      </div>

      <div ref={addRef} className="mt-8 grid gap-2.5">
        <Button size="lg" fullWidth onClick={handleAdd} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? "added" : "add"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {added ? "Added to your bag ✓" : "Add to bag"}
            </motion.span>
          </AnimatePresence>
        </Button>
        <WishlistButton product={product} variant="inline" />
      </div>

      <button
        type="button"
        onClick={() => openConcierge({ productId: product.id })}
        className="group mt-6 flex w-full items-center gap-4 border border-champagne bg-cream/70 p-3 text-left transition-colors hover:bg-cream"
      >
        <ConciergeAvatar className="h-12 w-12" />
        <span className="flex-1">
          <span className="block font-serif text-lg text-charcoal">Ask My Concierge About This Piece</span>
          <span className="block text-xs text-stone">Styling, sizing, pairings — Amara is here to help.</span>
        </span>
      </button>

      <ul className="mt-8 grid grid-cols-1 gap-3 text-xs text-stone sm:grid-cols-2">
        <li className="flex items-start gap-3">
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-charcoal" strokeWidth={1.3} />
          <span>
            {shipping} Complimentary over ${FREE_SHIPPING_THRESHOLD}.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-charcoal" strokeWidth={1.3} />
          <span>30-day returns and one complimentary resizing.</span>
        </li>
        <li className="flex items-start gap-3">
          <Gift className="mt-0.5 h-4 w-4 shrink-0 text-charcoal" strokeWidth={1.3} />
          <span>Presented in our signature ivory box.</span>
        </li>
        <li className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-charcoal" strokeWidth={1.3} />
          <span>Lifetime cleaning and inspection.</span>
        </li>
      </ul>

      <div className="mt-8 border-t border-line">
        <AccordionItem title="Description" defaultOpen>
          <p>{product.description}</p>
          <p className="mt-3">
            Style: {product.style.join(", ")} · Perfect for {product.occasion.join(", ").toLowerCase()}.
          </p>
        </AccordionItem>
        <AccordionItem title="Specifications">
          <dl className="divide-y divide-line">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-6 py-2.5">
                <dt>{s.label}</dt>
                <dd className="text-right text-charcoal">{s.value}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-6 py-2.5">
              <dt>Available sizes</dt>
              <dd className="text-right text-charcoal">{product.sizes.join(", ")}</dd>
            </div>
          </dl>
        </AccordionItem>
        <AccordionItem title="Delivery & returns">
          <p>
            {shipping} Orders above ${FREE_SHIPPING_THRESHOLD} ship complimentary with full insurance and
            signature on delivery. Express delivery is available at checkout. Unworn pieces may be
            returned within 30 days in their original packaging.
          </p>
        </AccordionItem>
        <AccordionItem title="Care instructions">
          <p>
            Store your piece in its pouch, away from other jewelry. Remove before swimming, bathing or
            exercising, and apply perfume and lotion before putting it on. Clean gently with a soft,
            lint-free cloth — and visit us any time for a complimentary professional clean.
          </p>
        </AccordionItem>
      </div>

      {/* Sticky mobile add-to-bag */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur lg:hidden"
          >
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-base leading-tight text-charcoal">{product.name}</p>
                <p className="text-xs text-stone">
                  <Price value={product.price} size="sm" className="text-stone" />
                  {product.sizes.length > 1 && ` · ${size}`}
                </p>
              </div>
              <Button onClick={handleAdd} size="md" className="shrink-0">
                {added ? "Added ✓" : "Add to bag"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
