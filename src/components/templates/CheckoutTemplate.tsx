"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Spinner } from "@/components/atoms/Spinner";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { EmptyState } from "@/components/molecules/EmptyState";
import { OrderTotals } from "@/components/molecules/OrderTotals";
import { CheckoutForm, EXPRESS_FEE, type CheckoutValues } from "@/components/organisms/CheckoutForm";
import { ConciergeCharacter } from "@/components/concierge/ConciergeCharacter";
import { useCart } from "@/hooks/useCart";
import { useOrderStore } from "@/store/order-store";
import { getProduct } from "@/data/products";
import { formatCurrency } from "@/lib/format-currency";
import type { CartTotals, DemoOrder } from "@/types/cart";
import { easeLux } from "@/constants/design-tokens";
import { cn } from "@/lib/cn";

const PAYMENT_LABELS: Record<CheckoutValues["paymentMethod"], string> = {
  "demo-card": "Demo card",
  "demo-wallet": "Demo digital wallet",
  boutique: "Pay at the boutique",
};

function generateOrderNumber() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `SOL-${out}`;
}

export function CheckoutTemplate() {
  const { hydrated, items, totals, lines, clearCart } = useCart();
  const lastOrder = useOrderStore((s) => s.lastOrder);
  const setLastOrder = useOrderStore((s) => s.setLastOrder);
  const [express, setExpress] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [confirmed, setConfirmed] = useState<DemoOrder | null>(null);

  const adjusted: CartTotals = express
    ? { ...totals, shipping: EXPRESS_FEE, total: totals.subtotal + EXPRESS_FEE }
    : totals;

  if (!hydrated)
    return (
      <div className="flex justify-center py-32 text-stone">
        <Spinner label="Preparing checkout" />
      </div>
    );

  const order = confirmed ?? (items.length === 0 ? lastOrder : null);
  if (order) return <Confirmation order={order} onDone={() => setLastOrder(null)} />;

  if (items.length === 0)
    return (
      <div className="container-lux py-16">
        <EmptyState
          title="Your collection is waiting to begin."
          description="Add a piece to your bag to begin the demo checkout."
          primary={{ label: "Discover jewelry", href: "/discover" }}
        />
      </div>
    );

  const summary = (
    <div>
      <ul className="divide-y divide-line">
        {items.map(({ line, product }) => (
          <li key={line.key} className="flex items-center gap-4 py-4">
            <span className="relative h-20 w-16 shrink-0 overflow-hidden bg-ivory">
              <SmartImage src={product.images[0]} alt="" fill sizes="64px" wrapperClassName="absolute inset-0" className="object-cover" />
              <span className="absolute -right-0 -top-0 flex h-5 min-w-5 items-center justify-center bg-espresso px-1 text-[10px] text-ivory">
                {line.quantity}
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-serif text-base text-charcoal">{product.name}</span>
              <span className="block text-xs text-stone">
                {product.metal}
                {line.size !== "One Size" && ` · ${line.size}`}
              </span>
            </span>
            <span className="text-sm tabular-nums text-charcoal">{formatCurrency(product.price * line.quantity)}</span>
          </li>
        ))}
      </ul>
      <OrderTotals totals={adjusted} className="mt-4 border-t border-line pt-5" />
    </div>
  );

  return (
    <div className="container-lux pb-24">
      <div className="flex items-center justify-between pt-8">
        <h1 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">Checkout</h1>
        <p className="hidden text-xs text-stone sm:block">Demo checkout · no payment taken</p>
      </div>

      {/* Mobile summary toggle */}
      <div className="mt-6 border-y border-line lg:hidden">
        <button
          type="button"
          onClick={() => setSummaryOpen((o) => !o)}
          aria-expanded={summaryOpen}
          className="flex w-full items-center justify-between py-4 text-sm text-charcoal"
        >
          <span className="flex items-center gap-2">
            {summaryOpen ? "Hide" : "Show"} order summary
            <ChevronDown className={cn("h-4 w-4 transition-transform", summaryOpen && "rotate-180")} strokeWidth={1.4} />
          </span>
          <span className="font-serif text-lg">{formatCurrency(adjusted.total)}</span>
        </button>
        {summaryOpen && <div className="pb-5">{summary}</div>}
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
        <CheckoutForm
          shippingCost={totals.shipping}
          onStepChange={(_, v) => setExpress(v.shippingMethod === "express")}
          reviewSlot={<div className="lg:hidden">{summary}</div>}
          onComplete={(values) => {
            const finalTotals: CartTotals =
              values.shippingMethod === "express"
                ? { ...totals, shipping: EXPRESS_FEE, total: totals.subtotal + EXPRESS_FEE }
                : totals;
            const newOrder: DemoOrder = {
              number: generateOrderNumber(),
              placedAt: new Date().toISOString(),
              email: values.email,
              name: values.firstName,
              city: values.city,
              paymentMethod: PAYMENT_LABELS[values.paymentMethod],
              lines,
              totals: finalTotals,
            };
            setConfirmed(newOrder);
            setLastOrder(newOrder);
            clearCart();
            window.scrollTo({ top: 0 });
          }}
        />
        <aside aria-label="Order summary" className="hidden h-fit bg-cream p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:block">
          <h2 className="font-serif text-2xl font-light text-charcoal">Your order</h2>
          {summary}
        </aside>
      </div>
    </div>
  );
}

function Confirmation({ order, onDone }: { order: DemoOrder; onDone: () => void }) {
  return (
    <div className="container-lux py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeLux }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mx-auto w-40">
          <ConciergeCharacter mood="delighted" />
        </div>
        <Divider ornament className="mx-auto mt-8 w-40" />
        <p className="eyebrow mt-8 text-stone">Demo order confirmed</p>
        <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-charcoal sm:text-6xl">
          Thank you, <em className="italic">{order.name}</em>.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-stone">
          Your pieces are being prepared with care. A confirmation would be sent to{" "}
          <span className="text-charcoal">{order.email}</span> — this is a demonstration, so nothing
          will be charged or shipped.
        </p>

        <dl className="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-6 border-y border-line py-6 text-left sm:grid-cols-3">
          <div>
            <dt className="text-xs text-stone">Order number</dt>
            <dd className="mt-1 font-serif text-xl text-charcoal">{order.number}</dd>
          </div>
          <div>
            <dt className="text-xs text-stone">Total</dt>
            <dd className="mt-1 font-serif text-xl text-charcoal">{formatCurrency(order.totals.total)}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-xs text-stone">Payment</dt>
            <dd className="mt-1 text-sm text-charcoal">{order.paymentMethod}</dd>
          </div>
        </dl>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {order.lines.map((l) => {
            const p = getProduct(l.productId);
            if (!p) return null;
            return (
              <li key={l.key}>
                <Link href={`/product/${p.slug}`} className="block w-24 text-left" aria-label={p.name}>
                  <span className="relative block aspect-[4/5] overflow-hidden bg-cream">
                    <SmartImage src={p.images[0]} alt="" fill sizes="96px" wrapperClassName="absolute inset-0" className="object-cover" />
                  </span>
                  <span className="mt-2 block truncate text-xs text-stone">
                    {p.name} {l.quantity > 1 && `×${l.quantity}`}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/discover" onClick={onDone}>
            Continue exploring
          </Button>
          <Button href="/" variant="secondary" onClick={onDone}>
            Return home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
