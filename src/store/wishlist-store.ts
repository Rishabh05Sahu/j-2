"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { localJSONStorage } from "@/lib/storage";

interface WishlistState {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) =>
        set((s) => (s.ids.includes(id) ? s : { ids: [id, ...s.ids] })),
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
      toggle: (id) => {
        const has = get().ids.includes(id);
        if (has) get().remove(id);
        else get().add(id);
        return !has;
      },
      clear: () => set({ ids: [] }),
    }),
    {
      name: "solenne-wishlist",
      storage: localJSONStorage,
      skipHydration: true,
      version: 1,
    },
  ),
);
