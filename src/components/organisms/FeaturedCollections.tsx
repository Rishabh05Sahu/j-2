import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { CollectionCard } from "@/components/molecules/CollectionCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { collections } from "@/data/collections";

export function FeaturedCollections() {
  return (
    <section aria-labelledby="collections-title" className="py-20 lg:py-28">
      <div className="container-lux">
        <SectionHeading
          id="collections-title"
          eyebrow="Curated collections"
          title={
            <>
              Six stories, <em className="italic">beautifully told</em>
            </>
          }
          description="Each collection is composed like a chapter — explore the one that feels like yours."
          action={
            <Button
              href="/collections"
              variant="link"
              icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />}
            >
              All collections
            </Button>
          }
        />
      </div>
      <div className="container-lux mt-12">
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-14 md:overflow-visible md:px-0 lg:grid-cols-3">
          {collections.map((c) => (
            <li key={c.slug} className="w-[80vw] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none">
              <CollectionCard collection={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
