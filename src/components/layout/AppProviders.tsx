"use client";

import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useConciergeStore } from "@/store/concierge-store";
import { useOrderStore } from "@/store/order-store";
import { useUIStore } from "@/store/ui-store";
import { useHydrationStore } from "@/hooks/useHydrated";

/** Reads persisted stores after mount so server and client markup match. */
function StoreHydrator() {
  const setHydrated = useHydrationStore((s) => s.setHydrated);
  useEffect(() => {
    Promise.all([
      useCartStore.persist.rehydrate(),
      useWishlistStore.persist.rehydrate(),
      useConciergeStore.persist.rehydrate(),
      useOrderStore.persist.rehydrate(),
    ]).finally(setHydrated);

    // keep multiple tabs in sync
    const onStorage = (e: StorageEvent) => {
      if (e.key === "solenne-cart") useCartStore.persist.rehydrate();
      if (e.key === "solenne-wishlist") useWishlistStore.persist.rehydrate();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [setHydrated]);
  return null;
}

/** Close transient overlays whenever the route changes. */
function RouteChangeHandler() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    useUIStore.getState().closeAllOverlays();
    if (useConciergeStore.getState().isOpen) useConciergeStore.getState().close();
  }, [pathname]);
  return null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <StoreHydrator />
      <RouteChangeHandler />
      {children}
    </MotionConfig>
  );
}
