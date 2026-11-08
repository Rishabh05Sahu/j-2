import { Suspense } from "react";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { DiscoverBrowser } from "@/components/organisms/DiscoverBrowser";
import { ProductBrowser } from "@/components/organisms/ProductBrowser";
import { products } from "@/data/products";

export function DiscoverTemplate() {
  return (
    <div className="container-lux pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Discover" }]} className="pt-6" />
      <header className="mx-auto max-w-2xl py-12 text-center sm:py-16">
        <p className="eyebrow text-stone">The full collection</p>
        <h1 className="mt-5 font-serif text-[2.6rem] font-light leading-[1.05] text-charcoal sm:text-6xl">
          Discover Your Next <em className="italic">Treasure</em>
        </h1>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-stone">
          Explore pieces chosen to complement your individuality.
        </p>
      </header>
      <Suspense fallback={<ProductBrowser source={products} />}>
        <DiscoverBrowser />
      </Suspense>
    </div>
  );
}
