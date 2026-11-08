"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { computeTotals, useCartStore } from "@/store/cart-store";
import { getProduct } from "@/data/products";
import { useUIStore } from "@/store/ui-store";
import { useHydrated } from "./useHydrated";
import type { Product } from "@/types/product";

export function useCart() {
  const hydrated = useHydrated();
  const { lines, addItem, removeItem, updateQuantity, updateSize, clearCart } =
    useCartStore(
      useShallow((s) => ({
        lines: s.lines,
        addItem: s.addItem,
        removeItem: s.removeItem,
        updateQuantity: s.updateQuantity,
        updateSize: s.updateSize,
        clearCart: s.clearCart,
      })),
    );

  const visibleLines = useMemo(() => (hydrated ? lines : []), [hydrated, lines]);
  const items = useMemo(
    () =>
      visibleLines
        .map((line) => ({ line, product: getProduct(line.productId) }))
        .filter((x): x is { line: typeof x.line; product: Product } => !!x.product),
    [visibleLines],
  );
  const totals = useMemo(() => computeTotals(visibleLines), [visibleLines]);

  return {
    hydrated,
    lines: visibleLines,
    items,
    totals,
    addItem,
    removeItem,
    updateQuantity,
    updateSize,
    clearCart,
  };
}

/** Add to bag with toast feedback — used by cards, PDP and quick view. */
export function useAddToBag() {
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useUIStore((s) => s.pushToast);
  return (product: Product, size: string, quantity = 1) => {
    addItem(product.id, size, quantity);
    pushToast({
      title: "Added to your bag",
      description: `${product.name}${size !== "One Size" ? ` · Size ${size}` : ""}${
        quantity > 1 ? ` · ×${quantity}` : ""
      }`,
      image: product.images[0],
      action: { label: "View bag", onClick: "open-cart" },
    });
  };
}
