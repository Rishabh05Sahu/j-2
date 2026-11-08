import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListingTemplate } from "@/components/templates/ProductListingTemplate";
import { SHOP_CATEGORIES, getShopCategory } from "@/constants/navigation";
import { products } from "@/data/products";

export function generateStaticParams() {
  return SHOP_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await params;
  const shop = getShopCategory(category);
  if (!shop) return { title: "Category not found" };
  return { title: shop.title, description: shop.description, openGraph: { images: [shop.image] } };
}

export default async function ShopCategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category } = await params;
  const shop = getShopCategory(category);
  if (!shop) notFound();
  return (
    <ProductListingTemplate
      eyebrow="Fine jewelry"
      title={shop.title}
      description={shop.description}
      image={shop.image}
      products={products.filter((p) => p.category === shop.category)}
      hideCategoryFilter
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Discover", href: "/discover" },
        { label: shop.title },
      ]}
    />
  );
}
