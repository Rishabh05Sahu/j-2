import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { Reveal } from "@/components/layout/Reveal";
import { collections, getCollectionProducts } from "@/data/collections";
import { cn } from "@/lib/cn";

export function CollectionsTemplate() {
  return (
    <div className="pb-24">
      <div className="container-lux">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} className="pt-6" />
        <header className="mx-auto max-w-2xl py-14 text-center sm:py-20">
          <p className="eyebrow text-stone">Our collections</p>
          <h1 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.05] text-charcoal sm:text-6xl">
            Stories in <em className="italic">gold &amp; light</em>
          </h1>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-stone">
            Six chapters, each composed around a feeling — from the quiet ritual of everyday
            elegance to the promise of the bridal edit.
          </p>
        </header>
      </div>

      <div className="container-lux space-y-20 lg:space-y-32">
        {collections.map((c, i) => {
          const items = getCollectionProducts(c.slug);
          return (
            <Reveal key={c.slug}>
              <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-24">
                <Link
                  href={`/collections/${c.slug}`}
                  className={cn("group relative block aspect-[4/5] overflow-hidden bg-cream", i % 2 === 1 && "md:order-2")}
                  aria-label={`Explore ${c.name}`}
                >
                  <SmartImage
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    wrapperClassName="absolute inset-0"
                    className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                  />
                </Link>
                <div>
                  <p className="eyebrow text-stone">
                    Chapter {String(i + 1).padStart(2, "0")} · {items.length} pieces
                  </p>
                  <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-charcoal sm:text-5xl">
                    {c.name}
                  </h2>
                  <p className="mt-2 font-serif text-xl italic text-stone">{c.tagline}</p>
                  <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-stone">{c.description}</p>
                  <ul className="mt-8 flex gap-3">
                    {items.slice(0, 3).map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/product/${p.slug}`}
                          className="relative block h-24 w-20 overflow-hidden bg-cream sm:h-28 sm:w-24"
                          aria-label={p.name}
                        >
                          <SmartImage
                            src={p.images[0]}
                            alt=""
                            fill
                            sizes="96px"
                            wrapperClassName="absolute inset-0"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="group mt-8 inline-flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal"
                  >
                    Explore the collection
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.4} />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
