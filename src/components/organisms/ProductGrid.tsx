import { ProductCard } from "@/components/molecules/ProductCard";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";

export function ProductGrid({
  products,
  className,
  columns = 4,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  columns?: 3 | 4;
  priorityCount?: number;
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3",
        columns === 4 && "xl:grid-cols-4",
        className,
      )}
    >
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} index={i} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
