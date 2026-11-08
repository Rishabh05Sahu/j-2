"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/atoms/Logo";
import { IconButton } from "@/components/atoms/IconButton";
import { Tooltip } from "@/components/atoms/Tooltip";
import { SmartImage } from "@/components/atoms/SmartImage";
import { ConciergeAvatar } from "@/components/concierge/ConciergeCharacter";
import { PRIMARY_NAV } from "@/constants/navigation";
import { collections } from "@/data/collections";
import { useUIStore } from "@/store/ui-store";
import { useConciergeStore } from "@/store/concierge-store";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { easeLux } from "@/constants/design-tokens";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { totals } = useCart();
  const { ids: wishlistIds } = useWishlist();
  const openCart = useUIStore((s) => s.openCart);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);
  const openConcierge = useConciergeStore((s) => s.open);
  const conciergeMood = useConciergeStore((s) => s.mood);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500",
        scrolled
          ? "border-line bg-ivory/92 shadow-[0_8px_30px_-20px_rgba(51,40,32,0.25)] backdrop-blur-md"
          : "border-transparent bg-ivory",
      )}
    >
      <div className="container-lux grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center lg:grid-cols-[auto_1fr_auto] lg:gap-10">
        {/* Mobile: left controls */}
        <div className="flex items-center gap-0.5 lg:hidden">
          <IconButton label="Open menu" onClick={() => setMobileMenuOpen(true)} className="-ml-2.5">
            <Menu className="h-5 w-5" strokeWidth={1.3} />
          </IconButton>
          <IconButton label="Search" onClick={() => setSearchOpen(true)}>
            <Search className="h-[18px] w-[18px]" strokeWidth={1.3} />
          </IconButton>
        </div>

        <Logo className="justify-self-center lg:justify-self-start" />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-1 xl:gap-3">
            {PRIMARY_NAV.map((item) =>
              item.hasMenu ? (
                <CollectionsMenu key={item.label} active={pathname.startsWith(item.href)} />
              ) : (
                <li key={item.label}>
                  <NavLink href={item.href} active={pathname.startsWith(item.href)}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Right controls */}
        <div className="flex items-center justify-end gap-0.5">
          <Tooltip content="Search" className="hidden lg:inline-flex">
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" strokeWidth={1.3} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Concierge">
            <button
              type="button"
              onClick={() => openConcierge()}
              aria-label="Open your personal concierge"
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream"
            >
              <ConciergeAvatar className="h-8 w-8" mood={conciergeMood} />
            </button>
          </Tooltip>
          <Tooltip content="Wishlist" className="hidden lg:inline-flex">
            <Link
              href="/wishlist"
              aria-label={`Wishlist${wishlistIds.length ? ` (${wishlistIds.length})` : ""}`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.3} />
              <CountBadge count={wishlistIds.length} />
            </Link>
          </Tooltip>
          <Tooltip content="Shopping bag">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping bag${totals.itemCount ? ` (${totals.itemCount} items)` : ""}`}
              className="relative -mr-2.5 flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream lg:mr-0"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.3} />
              <CountBadge count={totals.itemCount} />
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          aria-hidden
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="absolute right-1 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-espresso px-1 text-[9px] font-medium text-ivory"
        >
          {count > 99 ? "99+" : count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function NavLink({
  href,
  active,
  children,
  ...rest
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<"a">) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="group relative inline-flex h-11 items-center px-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal"
      {...rest}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute bottom-2 left-3 right-3 h-px origin-left bg-charcoal transition-transform duration-300 ease-[var(--ease-lux)]",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

function CollectionsMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <li
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <NavLink href="/collections" active={active} aria-expanded={open} aria-haspopup="true">
        Collections
      </NavLink>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: easeLux }}
            className="absolute inset-x-0 top-full border-y border-line bg-ivory shadow-[0_30px_60px_-30px_rgba(51,40,32,0.3)]"
          >
            <div className="container-lux grid grid-cols-[1fr_2fr] gap-12 py-10">
              <div>
                <p className="eyebrow mb-5 text-stone">Our collections</p>
                <ul className="space-y-1">
                  {collections.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/collections/${c.slug}`}
                        className="block py-1.5 font-serif text-2xl font-light text-charcoal transition-colors hover:text-gold-deep"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/collections"
                  className="mt-6 inline-block text-[0.6875rem] uppercase tracking-[0.18em] text-charcoal underline underline-offset-4"
                >
                  View all collections
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-5">
                {collections.slice(0, 3).map((c) => (
                  <Link key={c.slug} href={`/collections/${c.slug}`} className="group block" tabIndex={-1}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                      <SmartImage
                        src={c.image}
                        alt=""
                        fill
                        sizes="20vw"
                        wrapperClassName="absolute inset-0"
                        className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 font-serif text-lg text-charcoal">{c.name}</p>
                    <p className="text-xs text-stone">{c.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
