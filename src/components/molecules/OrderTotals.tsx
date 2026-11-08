import { formatCurrency } from "@/lib/format-currency";
import type { CartTotals } from "@/types/cart";
import { cn } from "@/lib/cn";

export function OrderTotals({ totals, className }: { totals: CartTotals; className?: string }) {
  return (
    <dl className={cn("space-y-2.5 text-sm", className)}>
      <div className="flex justify-between">
        <dt className="text-stone">Subtotal</dt>
        <dd className="tabular-nums text-charcoal">{formatCurrency(totals.subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-stone">Shipping estimate</dt>
        <dd className="tabular-nums text-charcoal">
          {totals.shipping === 0 ? "Complimentary" : formatCurrency(totals.shipping)}
        </dd>
      </div>
      <div className="flex justify-between border-t border-line pt-3.5">
        <dt className="eyebrow text-charcoal">Total</dt>
        <dd className="font-serif text-xl tabular-nums text-charcoal">
          {formatCurrency(totals.total)}
        </dd>
      </div>
    </dl>
  );
}

export function FreeShippingProgress({ totals }: { totals: CartTotals }) {
  const pct = Math.min(100, ((500 - totals.freeShippingRemaining) / 500) * 100);
  return (
    <div>
      <p className="text-xs text-stone">
        {totals.freeShippingRemaining > 0 ? (
          <>
            You are <span className="text-charcoal">{formatCurrency(totals.freeShippingRemaining)}</span>{" "}
            away from complimentary shipping.
          </>
        ) : (
          <>Your order ships complimentary, beautifully gift-wrapped.</>
        )}
      </p>
      <div className="mt-2 h-px w-full bg-line" aria-hidden>
        <div
          className="h-full bg-gold transition-[width] duration-700 ease-[var(--ease-lux)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
