"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { sessionJSONStorage } from "@/lib/storage";
import type { DemoOrder } from "@/types/cart";

interface OrderState {
  lastOrder: DemoOrder | null;
  setLastOrder: (order: DemoOrder | null) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      lastOrder: null,
      setLastOrder: (order) => set({ lastOrder: order }),
    }),
    { name: "solenne-last-order", storage: sessionJSONStorage, skipHydration: true },
  ),
);
