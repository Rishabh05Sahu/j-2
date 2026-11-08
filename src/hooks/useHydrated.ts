"use client";

import { create } from "zustand";

interface HydrationState {
  hydrated: boolean;
  setHydrated: () => void;
}

/** Flips to true once persisted stores have been read from storage. */
export const useHydrationStore = create<HydrationState>()((set) => ({
  hydrated: false,
  setHydrated: () => set({ hydrated: true }),
}));

export function useHydrated() {
  return useHydrationStore((s) => s.hydrated);
}
