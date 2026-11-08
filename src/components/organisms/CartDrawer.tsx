"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Sheet } from "@/components/molecules/Sheet";
import { CartItem } from "@/components/molecules/CartItem";
import { FreeShippingProgress, OrderTotals } from "@/components/molecules/OrderTotals";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { useCart } from "@/hooks/useCart";
import { useUIStore } from "@/store/ui-store";
import { useConciergeStore } from "@/store/concierge-store";
import { EmptyState } from "@/components/molecules/EmptyState";

export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const close = useUIStore((s) => s.closeCart);
  const openConcierge = useConciergeStore((s) => s.open);
  const { items, totals, updateQuantity, removeItem, updateSize } = useCart();

  return (
    <Sheet open={open} onClose={close} side="right" label="Shopping bag">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-7">
        <h2 className="font-serif text-2xl font-light text-charcoal">
          Your bag{" "}
          {totals.itemCount > 0 && (
            <span className="font-sans text-sm text-stone">({totals.itemCount})</span>
          )}
        </h2>
        <IconButton label="Close bag" onClick={close} className="-mr-2.5">
          <X className="h-5 w-5" strokeWidth={1.3} />
        </IconButton>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 items-center px-6">
          <EmptyState
            title="Your collection is waiting to begin."
            description="Discover pieces chosen to complement your individuality — or let your concierge guide you."
            primary={{ label: "Discover jewelry", href: "/discover", onClick: close }}
            secondary={{
              label: "Ask my concierge",
              onClick: () => {
                close();
                openConcierge();
              },
            }}
          />
        </div>
      ) : (
        <>
          <div className="shrink-0 border-b border-line px-5 py-4 sm:px-7">
            <FreeShippingProgress totals={totals} />
          </div>
          <div className="flex-1 overflow-y-auto px-5 sm:px-7">
            <ul className="divide-y divide-line">
              <AnimatePresence initial={false}>
                {items.map(({ line, product }) => (
                  <motion.li
                    key={line.key}
                    layout
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.25 } }}
                  >
                    <CartItem
                      compact
                      line={line}
                      product={product}
                      onQuantity={(q) => updateQuantity(line.key, q)}
                      onRemove={() => removeItem(line.key)}
                      onSize={(s) => updateSize(line.key, s)}
                      onNavigate={close}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
          <div className="shrink-0 border-t border-line bg-cream/60 px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-5 sm:px-7">
            <OrderTotals totals={totals} />
            <div className="mt-5 grid gap-2.5">
              <Button href="/checkout" onClick={close} fullWidth size="lg">
                Checkout
              </Button>
              <div className="grid grid-cols-2 gap-2.5">
                <Button href="/cart" onClick={close} variant="secondary" size="sm">
                  View bag
                </Button>
                <Button onClick={close} variant="ghost" size="sm" className="border border-line">
                  Continue shopping
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Sheet>
  );
}
