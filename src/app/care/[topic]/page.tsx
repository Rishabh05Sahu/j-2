import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoTemplate } from "@/components/templates/InfoTemplate";
import { INFO_PAGE_CONTENT, getInfoPage } from "@/data/info-pages";

export function generateStaticParams() {
  return INFO_PAGE_CONTENT.map((p) => ({ topic: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/care/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  const page = getInfoPage(topic);
  return page ? { title: page.title, description: page.intro } : { title: "Not found" };
}

export default async function CarePage({ params }: PageProps<"/care/[topic]">) {
  const { topic } = await params;
  const page = getInfoPage(topic);
  if (!page) notFound();
  return <InfoTemplate page={page} />;
}
