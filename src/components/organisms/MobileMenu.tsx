"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, ShoppingBag, X } from "lucide-react";
import { Sheet } from "@/components/molecules/Sheet";
import { Logo } from "@/components/atoms/Logo";
import { IconButton } from "@/components/atoms/IconButton";
import { ConciergeAvatar } from "@/components/concierge/ConciergeCharacter";
import { SHOP_CATEGORIES } from "@/constants/navigation";
import { collections } from "@/data/collections";
import { useUIStore } from "@/store/ui-store";
import { useConciergeStore } from "@/store/concierge-store";
import { easeLux } from "@/constants/design-tokens";

export function MobileMenu() {
  const open = useUIStore((s) => s.mobileMenuOpen);
  const setOpen = useUIStore((s) => s.setMobileMenuOpen);
  const openCart = useUIStore((s) => s.openCart);
  const openConcierge = useConciergeStore((s) => s.open);
  const close = () => setOpen(false);

  const links = [
    { label: "Collections", href: "/collections" },
    ...SHOP_CATEGORIES.map((c) => ({ label: c.label, href: `/shop/${c.slug}` })),
    { label: "Discover all", href: "/discover" },
    { label: "About Solenne", href: "/about" },
  ];

  return (
    <Sheet open={open} onClose={close} side="left" label="Main menu" className="max-w-[min(420px,100%)]">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
        <Logo onClick={close} />
        <IconButton label="Close menu" onClick={close} className="-mr-2.5">
          <X className="h-5 w-5" strokeWidth={1.3} />
        </IconButton>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-8 pt-4">
        <ul>
          {links.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 + i * 0.04, duration: 0.4, ease: easeLux }}
              className="border-b border-line/70"
            >
              <Link
                href={l.href}
                onClick={close}
                className="flex items-center justify-between py-4 font-serif text-[1.65rem] font-light text-charcoal"
              >
                {l.label}
                <ArrowRight className="h-4 w-4 text-stone" strokeWidth={1.2} aria-hidden />
              </Link>
            </motion.li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            close();
            openConcierge();
          }}
          className="mt-8 flex w-full items-center gap-4 bg-cream p-4 text-left"
        >
          <ConciergeAvatar className="h-14 w-14" />
          <span>
            <span className="block font-serif text-xl text-charcoal">Meet your concierge</span>
            <span className="block text-xs text-stone">Personal guidance, whenever you wish</span>
          </span>
        </button>

        <p className="eyebrow mb-3 mt-10 text-stone">Featured collections</p>
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {collections.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              onClick={close}
              className="shrink-0 rounded-full border border-line px-4 py-2 text-xs text-charcoal"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="grid shrink-0 grid-cols-2 border-t border-line pb-[env(safe-area-inset-bottom)]">
        <Link
          href="/wishlist"
          onClick={close}
          className="flex h-14 items-center justify-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal"
        >
          <Heart className="h-4 w-4" strokeWidth={1.3} /> Wishlist
        </Link>
        <button
          type="button"
          onClick={openCart}
          className="flex h-14 items-center justify-center gap-2 border-l border-line text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.3} /> Bag
        </button>
      </div>
    </Sheet>
  );
}
