import Image from "next/image";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { ProductBrowser } from "@/components/organisms/ProductBrowser";
import { OpenConciergeButton } from "@/components/concierge/OpenConciergeButton";
import type { Product } from "@/types/product";

export function ProductListingTemplate({
  eyebrow,
  title,
  description,
  image,
  products,
  crumbs,
  hideCategoryFilter = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  products: Product[];
  crumbs: { label: string; href?: string }[];
  hideCategoryFilter?: boolean;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col justify-center px-5 py-12 sm:px-10 md:py-20 lg:px-16 xl:px-24">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow mt-10 text-stone">{eyebrow}</p>
            <h1 className="mt-4 font-serif text-5xl font-light leading-[1.02] text-charcoal sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-stone">{description}</p>
            <div className="mt-8">
              <OpenConciergeButton variant="link">Ask my concierge for guidance</OpenConciergeButton>
            </div>
          </div>
          <div className="relative h-72 sm:h-96 md:h-auto md:min-h-[440px]">
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <div className="container-lux pb-24 pt-10 lg:pt-14">
        <ProductBrowser source={products} hideCategoryFilter={hideCategoryFilter} />
      </div>
    </>
  );
}
