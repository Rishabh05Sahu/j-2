import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ProductGrid } from "./ProductGrid";
import { getBestSellers } from "@/data/products";

export function BestSellers() {
  return (
    <section aria-labelledby="bestsellers-title" className="border-t border-line py-20 lg:py-28">
      <div className="container-lux">
        <SectionHeading
          id="bestsellers-title"
          eyebrow="Most treasured"
          title="Our best-loved pieces"
          description="The pieces our clients return to again and again — quietly iconic, endlessly wearable."
          action={
            <Button
              href="/discover"
              variant="link"
              icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />}
            >
              Discover all jewelry
            </Button>
          }
        />
        <ProductGrid products={getBestSellers(8)} className="mt-12" />
      </div>
    </section>
  );
}
