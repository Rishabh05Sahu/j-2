"use client";

import { create } from "zustand";

export type ToastTone = "success" | "info";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  image?: string;
  tone: ToastTone;
  action?: { label: string; href?: string; onClick?: "open-cart" | "open-wishlist" };
}

interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  quickViewProductId: string | null;
  toasts: Toast[];
  openCart: () => void;
  closeCart: () => void;
  setSearchOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
  pushToast: (toast: Omit<Toast, "id" | "tone"> & { tone?: ToastTone }) => void;
  dismissToast: (id: number) => void;
  closeAllOverlays: () => void;
}

let toastId = 0;

export const useUIStore = create<UIState>()((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  quickViewProductId: null,
  toasts: [],
  openCart: () =>
    set({ cartOpen: true, searchOpen: false, mobileMenuOpen: false, quickViewProductId: null }),
  closeCart: () => set({ cartOpen: false }),
  setSearchOpen: (open) => set({ searchOpen: open, mobileMenuOpen: false }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  openQuickView: (id) => set({ quickViewProductId: id }),
  closeQuickView: () => set({ quickViewProductId: null }),
  pushToast: (toast) => {
    const id = ++toastId;
    set((s) => ({
      toasts: [...s.toasts.slice(-2), { tone: "success", ...toast, id }],
    }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4200);
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  closeAllOverlays: () =>
    set({
      cartOpen: false,
      searchOpen: false,
      mobileMenuOpen: false,
      quickViewProductId: null,
    }),
}));
