"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { localJSONStorage } from "@/lib/storage";
import { getProduct } from "@/data/products";
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
} from "@/constants/navigation";
import type { CartLine, CartTotals } from "@/types/cart";

interface CartState {
  lines: CartLine[];
  addItem: (productId: string, size: string, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  updateSize: (key: string, size: string) => void;
  clearCart: () => void;
}

export const lineKey = (productId: string, size: string) => `${productId}__${size}`;
export const MAX_QUANTITY = 10;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      addItem: (productId, size, quantity = 1) =>
        set((state) => {
          const key = lineKey(productId, size);
          const existing = state.lines.find((l) => l.key === key);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.key === key
                  ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + quantity) }
                  : l,
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              { key, productId, size, quantity: Math.min(MAX_QUANTITY, quantity) },
            ],
          };
        }),
      removeItem: (key) =>
        set((state) => ({ lines: state.lines.filter((l) => l.key !== key) })),
      updateQuantity: (key, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.key !== key)
              : state.lines.map((l) =>
                  l.key === key
                    ? { ...l, quantity: Math.min(MAX_QUANTITY, quantity) }
                    : l,
                ),
        })),
      updateSize: (key, size) =>
        set((state) => {
          const line = state.lines.find((l) => l.key === key);
          if (!line || line.size === size) return state;
          const newKey = lineKey(line.productId, size);
          const merged = state.lines.find((l) => l.key === newKey);
          if (merged) {
            return {
              lines: state.lines
                .filter((l) => l.key !== key)
                .map((l) =>
                  l.key === newKey
                    ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + line.quantity) }
                    : l,
                ),
            };
          }
          return {
            lines: state.lines.map((l) =>
              l.key === key ? { ...l, key: newKey, size } : l,
            ),
          };
        }),
      clearCart: () => set({ lines: [] }),
    }),
    {
      name: "solenne-cart",
      storage: localJSONStorage,
      skipHydration: true,
      version: 1,
    },
  ),
);

export function computeTotals(lines: CartLine[]): CartTotals {
  let subtotal = 0;
  let itemCount = 0;
  for (const line of lines) {
    const product = getProduct(line.productId);
    if (!product) continue;
    subtotal += product.price * line.quantity;
    itemCount += line.quantity;
  }
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  return {
    itemCount,
    subtotal,
    shipping,
    total: subtotal + shipping,
    freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  };
}
