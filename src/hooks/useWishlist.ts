"use client";

import { useMemo } from "react";
import { useWishlistStore } from "@/store/wishlist-store";
import { getProduct } from "@/data/products";
import { useUIStore } from "@/store/ui-store";
import { useHydrated } from "./useHydrated";
import type { Product } from "@/types/product";

export function useWishlist() {
  const hydrated = useHydrated();
  const ids = useWishlistStore((s) => s.ids);
  const add = useWishlistStore((s) => s.add);
  const remove = useWishlistStore((s) => s.remove);
  const visibleIds = useMemo(() => (hydrated ? ids : []), [hydrated, ids]);
  const products = useMemo(
    () => visibleIds.map((id) => getProduct(id)).filter((p): p is Product => !!p),
    [visibleIds],
  );
  return { hydrated, ids: visibleIds, products, add, remove };
}

export function useIsWishlisted(productId: string) {
  const hydrated = useHydrated();
  const has = useWishlistStore((s) => s.ids.includes(productId));
  return hydrated && has;
}

export function useToggleWishlist() {
  const toggle = useWishlistStore((s) => s.toggle);
  const pushToast = useUIStore((s) => s.pushToast);
  return (product: Product) => {
    const added = toggle(product.id);
    pushToast({
      tone: added ? "success" : "info",
      title: added ? "Saved to your wishlist" : "Removed from your wishlist",
      description: product.name,
      image: product.images[0],
      action: added ? { label: "View wishlist", href: "/wishlist" } : undefined,
    });
    return added;
  };
}
