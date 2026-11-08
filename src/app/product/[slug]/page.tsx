import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailsTemplate } from "@/components/templates/ProductDetailsTemplate";
import { getProductBySlug, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.name,
    description: `${product.shortDescription} ${product.metal}${
      product.gemstone !== "None" ? ` with ${product.gemstone.toLowerCase()}` : ""
    }.`,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailsTemplate product={product} />;
}
