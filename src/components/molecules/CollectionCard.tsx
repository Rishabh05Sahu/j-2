import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SmartImage } from "@/components/atoms/SmartImage";
import type { Collection } from "@/types/product";
import { cn } from "@/lib/cn";

export function CollectionCard({
  collection,
  className,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw",
}: {
  collection: Collection;
  className?: string;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn("group block", className)}
      aria-label={`Explore ${collection.name}`}
    >
      <div className={cn("relative overflow-hidden bg-cream", aspect)}>
        <SmartImage
          src={collection.image}
          alt=""
          fill
          sizes={sizes}
          wrapperClassName="absolute inset-0"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-lux)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-espresso/0 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-7">
          <p className="eyebrow mb-2 text-ivory/80">{collection.tagline}</p>
          <h3 className="font-serif text-[1.75rem] font-light leading-tight sm:text-3xl">
            {collection.name}
          </h3>
        </div>
      </div>
      <div className="flex items-start justify-between gap-6 pt-4">
        <p className="max-w-sm text-[0.8125rem] leading-relaxed text-stone">
          {collection.description}
        </p>
        <span className="mt-0.5 inline-flex shrink-0 items-center gap-2 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-charcoal">
          Explore
          <ArrowRight
            aria-hidden
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.4}
          />
        </span>
      </div>
    </Link>
  );
}
