"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { CartItem } from "@/components/molecules/CartItem";
import { EmptyState } from "@/components/molecules/EmptyState";
import { FreeShippingProgress, OrderTotals } from "@/components/molecules/OrderTotals";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { Spinner } from "@/components/atoms/Spinner";
import { useCart } from "@/hooks/useCart";
import { useConciergeStore } from "@/store/concierge-store";
import { getBestSellers } from "@/data/products";

export function CartTemplate() {
  const { hydrated, items, totals, updateQuantity, removeItem, updateSize } = useCart();
  const openConcierge = useConciergeStore((s) => s.open);
  const suggestions = getBestSellers(8)
    .filter((p) => !items.some((i) => i.product.id === p.id))
    .slice(0, 4);

  return (
    <div className="container-lux pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shopping bag" }]} className="pt-6" />
      <h1 className="mt-10 font-serif text-5xl font-light text-charcoal sm:text-6xl">Your bag</h1>

      {!hydrated ? (
        <div className="flex justify-center py-24 text-stone">
          <Spinner label="Loading your bag" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="Your collection is waiting to begin."
          description="Every treasured piece starts somewhere. Explore the maison, or let your concierge guide you."
          primary={{ label: "Discover jewelry", href: "/discover" }}
          secondary={{ label: "Meet your concierge", onClick: () => openConcierge() }}
        />
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          <div>
            <div className="border-b border-line pb-5">
              <FreeShippingProgress totals={totals} />
            </div>
            <ul className="divide-y divide-line">
              <AnimatePresence initial={false}>
                {items.map(({ line, product }) => (
                  <motion.li
                    key={line.key}
                    layout
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.25 } }}
                  >
                    <CartItem
                      line={line}
                      product={product}
                      onQuantity={(q) => updateQuantity(line.key, q)}
                      onRemove={() => removeItem(line.key)}
                      onSize={(s) => updateSize(line.key, s)}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
          <aside aria-label="Order summary" className="h-fit bg-cream p-6 sm:p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <h2 className="font-serif text-2xl font-light text-charcoal">Order summary</h2>
            <OrderTotals totals={totals} className="mt-6" />
            <Button
              href="/checkout"
              size="lg"
              fullWidth
              className="mt-7"
              icon={<ArrowRight className="h-4 w-4" strokeWidth={1.4} />}
            >
              Checkout
            </Button>
            <Button href="/discover" variant="secondary" fullWidth className="mt-2.5">
              Continue shopping
            </Button>
            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-stone">
              <Lock className="h-3 w-3" strokeWidth={1.5} /> Demo checkout — no payment is taken
            </p>
          </aside>
        </div>
      )}

      {hydrated && suggestions.length > 0 && (
        <section aria-labelledby="cart-suggestions" className="mt-24 border-t border-line pt-16">
          <h2 id="cart-suggestions" className="font-serif text-3xl font-light text-charcoal sm:text-4xl">
            You may also love
          </h2>
          <ProductGrid products={suggestions} className="mt-10" />
        </section>
      )}
    </div>
  );
}
