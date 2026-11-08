import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListingTemplate } from "@/components/templates/ProductListingTemplate";
import { collections, getCollection, getCollectionProducts } from "@/data/collections";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection not found" };
  return {
    title: collection.name,
    description: collection.description,
    openGraph: { images: [collection.image] },
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  return (
    <ProductListingTemplate
      eyebrow={collection.tagline}
      title={collection.name}
      description={collection.description}
      image={collection.image}
      products={getCollectionProducts(collection.slug)}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Collections", href: "/collections" },
        { label: collection.name },
      ]}
    />
  );
}
