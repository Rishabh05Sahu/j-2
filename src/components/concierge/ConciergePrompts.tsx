"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Price } from "@/components/atoms/Price";
import { getProduct } from "@/data/products";
import { useConciergeStore } from "@/store/concierge-store";
import { useUIStore } from "@/store/ui-store";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/format-currency";
import type { Refinement } from "@/types/concierge";
import { cn } from "@/lib/cn";

function ActionButton({
  children,
  onClick,
  primary = false,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-5 text-[0.625rem] font-medium uppercase tracking-[0.16em] transition-colors disabled:opacity-40",
        primary
          ? "bg-espresso text-ivory hover:bg-charcoal"
          : "border border-charcoal/60 text-charcoal hover:bg-charcoal hover:text-ivory",
      )}
    >
      {children}
    </button>
  );
}

function MiniProduct({ productId }: { productId: string }) {
  const product = getProduct(productId);
  if (!product) return null;
  return (
    <div className="flex items-center gap-4 border border-line bg-ivory p-2.5 pr-5">
      <span className="relative h-20 w-16 shrink-0 overflow-hidden bg-cream">
        <SmartImage src={product.images[0]} alt="" fill sizes="64px" wrapperClassName="absolute inset-0" className="object-cover" />
      </span>
      <div className="min-w-0">
        <p className="font-serif text-lg leading-snug text-charcoal">{product.name}</p>
        <p className="text-xs text-stone">{product.metal}</p>
        <Price value={product.price} size="sm" />
      </div>
    </div>
  );
}

export function LovePromptActions({ productId, resolved }: { productId: string; resolved: boolean }) {
  const confirmAdd = useConciergeStore((s) => s.confirmAdd);
  const showMore = useConciergeStore((s) => s.showMore);
  const save = useConciergeStore((s) => s.saveForLater);
  const isTyping = useConciergeStore((s) => s.isTyping);
  return (
    <div className="space-y-4">
      <MiniProduct productId={productId} />
      {!resolved && (
        <div className="flex flex-wrap gap-2">
          <ActionButton primary disabled={isTyping} onClick={() => confirmAdd(productId)}>
            Yes, add to bag
          </ActionButton>
          <ActionButton disabled={isTyping} onClick={showMore}>
            Show me more
          </ActionButton>
          <ActionButton disabled={isTyping} onClick={() => save(productId)}>
            Save for later
          </ActionButton>
        </div>
      )}
    </div>
  );
}

export const REFINEMENTS: { label: string; reply: string; refinement: Refinement }[] = [
  { label: "More affordable", reply: "Show me more affordable options", refinement: { kind: "affordable" } },
  { label: "More minimal", reply: "Something more minimal", refinement: { kind: "minimal" } },
  { label: "More diamonds", reply: "More diamonds, please", refinement: { kind: "diamonds" } },
  { label: "Different gemstone", reply: "A different gemstone", refinement: { kind: "different-gemstone" } },
  { label: "Statement pieces", reply: "More statement pieces", refinement: { kind: "statement" } },
  { label: "Rose gold", reply: "I actually prefer rose gold", refinement: { kind: "metal", value: "18K Rose Gold" } },
  { label: "Yellow gold", reply: "I'd prefer yellow gold", refinement: { kind: "metal", value: "18K Yellow Gold" } },
  { label: "White gold", reply: "I'd prefer white gold", refinement: { kind: "metal", value: "18K White Gold" } },
];

export function RefineChips({
  disabled,
  compact = false,
}: {
  disabled?: boolean;
  compact?: boolean;
}) {
  const refine = useConciergeStore((s) => s.refine);
  const [seed] = useState(() => Math.floor(Math.random() * 900) + 100);
  return (
    <div
      className={cn(
        compact
          ? "no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
          : "flex flex-wrap gap-2",
      )}
    >
      {REFINEMENTS.map((r) => (
        <button
          key={r.label}
          type="button"
          disabled={disabled}
          onClick={() => refine(r.refinement, r.reply)}
          className="inline-flex min-h-9 shrink-0 items-center rounded-full border border-line bg-ivory px-4 text-xs text-charcoal transition-colors hover:border-charcoal/50 disabled:opacity-40"
        >
          {r.label}
        </button>
      ))}
      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          refine({ kind: "surprise", value: String(seed + Date.now() % 1000) }, "Surprise me")
        }
        className="inline-flex min-h-9 shrink-0 items-center rounded-full border border-champagne bg-champagne/30 px-4 text-xs text-espresso transition-colors hover:bg-champagne/60 disabled:opacity-40"
      >
        ✦ Surprise me
      </button>
    </div>
  );
}

export function AddedToBagCard({ productId }: { productId: string }) {
  const { items, totals } = useCart();
  const openCart = useUIStore((s) => s.openCart);
  const showMore = useConciergeStore((s) => s.showMore);
  const isTyping = useConciergeStore((s) => s.isTyping);
  const product = getProduct(productId);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-champagne bg-cream/60 p-5"
    >
      <div className="flex items-center gap-3">
        <motion.span
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso text-ivory"
        >
          <Check className="h-4 w-4" strokeWidth={2} />
        </motion.span>
        <div>
          <p className="eyebrow text-espresso">Added to your bag</p>
          <p className="text-sm text-stone">{product?.name}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <div className="flex -space-x-3">
          {items.slice(0, 4).map(({ line, product: p }) => (
            <span key={line.key} className="relative h-12 w-12 overflow-hidden rounded-full bg-cream ring-2 ring-ivory">
              <SmartImage src={p.images[0]} alt="" fill sizes="48px" wrapperClassName="absolute inset-0" className="object-cover" />
            </span>
          ))}
        </div>
        <div className="text-right">
          <p className="text-xs text-stone">
            {totals.itemCount} {totals.itemCount === 1 ? "piece" : "pieces"} in your bag
          </p>
          <p className="font-serif text-xl text-charcoal">{formatCurrency(totals.subtotal)}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <ActionButton primary onClick={openCart}>
          Review bag
        </ActionButton>
        <Link
          href="/checkout"
          className="inline-flex min-h-11 items-center justify-center border border-charcoal/60 px-5 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
        >
          Checkout
        </Link>
        <ActionButton disabled={isTyping} onClick={showMore}>
          Keep exploring
        </ActionButton>
      </div>
    </motion.div>
  );
}

export function ProductContextActions({ productId, resolved }: { productId: string; resolved: boolean }) {
  const productAction = useConciergeStore((s) => s.productAction);
  const isTyping = useConciergeStore((s) => s.isTyping);
  return (
    <div className="space-y-4">
      <MiniProduct productId={productId} />
      {!resolved && (
        <div className="grid gap-2 sm:grid-cols-2">
          {(
            [
              ["details", "Tell me about this piece"],
              ["similar", "Show me similar pieces"],
              ["add", "Add it to my bag"],
              ["other", "Help me find something else"],
            ] as const
          ).map(([action, label]) => (
            <button
              key={action}
              type="button"
              disabled={isTyping}
              onClick={() => productAction(action)}
              className={cn(
                "min-h-12 border px-4 text-left font-serif text-lg text-charcoal transition-colors disabled:opacity-40",
                action === "add"
                  ? "border-espresso bg-espresso font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ivory hover:bg-charcoal"
                  : "border-line bg-ivory hover:border-charcoal/50",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
