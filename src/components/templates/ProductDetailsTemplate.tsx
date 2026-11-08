import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ProductGallery } from "@/components/organisms/ProductGallery";
import { ProductInformation } from "@/components/organisms/ProductInformation";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { getRelatedProducts } from "@/data/products";
import { SHOP_CATEGORIES, categoryToSlug } from "@/constants/navigation";
import type { Product } from "@/types/product";

export function ProductDetailsTemplate({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4);
  const category = SHOP_CATEGORIES.find((c) => c.category === product.category);
  const gallery = [
    ...product.images,
    ...(category && !product.images.includes(category.image) ? [category.image] : []),
  ];

  return (
    <div className="pb-28 lg:pb-0">
      <div className="container-lux">
        <Breadcrumbs
          className="py-6"
          items={[
            { label: "Home", href: "/" },
            { label: category?.label ?? product.category, href: `/shop/${categoryToSlug(product.category)}` },
            { label: product.name },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 xl:gap-24">
          <ProductGallery images={gallery} name={product.name} />
          <ProductInformation product={product} />
        </div>
      </div>

      <section aria-labelledby="related-title" className="mt-24 border-t border-line py-20 lg:mt-32">
        <div className="container-lux">
          <SectionHeading id="related-title" eyebrow="You may also love" title="Pieces in harmony" />
          <ProductGrid products={related} className="mt-10" />
        </div>
      </section>
    </div>
  );
}
