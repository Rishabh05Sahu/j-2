"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useIsWishlisted, useToggleWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";

export function WishlistButton({
  product,
  variant = "floating",
  className,
}: {
  product: Product;
  variant?: "floating" | "inline";
  className?: string;
}) {
  const active = useIsWishlisted(product.id);
  const toggle = useToggleWishlist();

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={() => toggle(product)}
        aria-pressed={active}
        className={cn(
          "inline-flex h-14 w-full items-center justify-center gap-2.5 border border-charcoal/80 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory",
          className,
        )}
      >
        <HeartIcon active={active} />
        {active ? "Saved to wishlist" : "Add to wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-ivory/85 text-charcoal backdrop-blur transition-colors hover:bg-ivory",
        className,
      )}
    >
      <HeartIcon active={active} />
    </button>
  );
}

function HeartIcon({ active }: { active: boolean }) {
  return (
    <motion.span
      key={active ? "on" : "off"}
      initial={{ scale: active ? 0.6 : 1 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className="inline-flex"
    >
      <Heart
        aria-hidden
        strokeWidth={1.4}
        className={cn("h-[17px] w-[17px] transition-colors", active && "fill-espresso text-espresso")}
      />
    </motion.span>
  );
}
