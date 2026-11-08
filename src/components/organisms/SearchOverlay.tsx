"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Sheet } from "@/components/molecules/Sheet";
import { SearchInput } from "@/components/molecules/SearchInput";
import { IconButton } from "@/components/atoms/IconButton";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Price } from "@/components/atoms/Price";
import { products } from "@/data/products";
import { matchesQuery } from "@/lib/product-filters";
import { useUIStore } from "@/store/ui-store";

const SUGGESTIONS = ["Diamond studs", "Rose gold", "Pearl", "Hoops", "Engagement", "Emerald"];

export function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const close = () => setOpen(false);

  const results = useMemo(
    () => (query.trim() ? products.filter((p) => matchesQuery(p, query)) : []),
    [query],
  );

  const submit = () => {
    if (!query.trim()) return;
    close();
    router.push(`/discover?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <Sheet
      open={open}
      onClose={close}
      side="top"
      label="Search"
      initialFocusId="global-search"
      className="max-h-[92dvh]"
    >
      <div className="container-lux flex flex-col overflow-y-auto pb-10 pt-4 sm:pt-8">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-stone">Search the maison</p>
          <IconButton label="Close search" onClick={close} className="-mr-2.5">
            <X className="h-5 w-5" strokeWidth={1.3} />
          </IconButton>
        </div>
        <SearchInput
          id="global-search"
          size="lg"
          value={query}
          onChange={setQuery}
          onSubmit={submit}
          placeholder="What are you looking for?"
          className="mt-2"
        />

        {!query.trim() ? (
          <div className="mt-8">
            <p className="eyebrow mb-4 text-stone">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-line px-4 py-2 text-sm text-charcoal transition-colors hover:border-charcoal/50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8" aria-live="polite">
            <div className="mb-5 flex items-baseline justify-between">
              <p className="eyebrow text-stone">
                {results.length} {results.length === 1 ? "piece" : "pieces"}
              </p>
              {results.length > 0 && (
                <button
                  type="button"
                  onClick={submit}
                  className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal underline-offset-4 hover:underline"
                >
                  View all results <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
                </button>
              )}
            </div>
            {results.length === 0 ? (
              <p className="font-serif text-2xl font-light text-stone">
                Nothing matches “{query}” just yet. Perhaps try “gold” or “diamond”.
              </p>
            ) : (
              <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
                {results.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <Link href={`/product/${p.slug}`} onClick={close} className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                        <SmartImage
                          src={p.images[0]}
                          alt=""
                          fill
                          sizes="(min-width:1024px) 16vw, 45vw"
                          wrapperClassName="absolute inset-0"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-2 font-serif text-base leading-snug text-charcoal">{p.name}</p>
                      <Price value={p.price} size="sm" className="text-stone" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </Sheet>
  );
}
