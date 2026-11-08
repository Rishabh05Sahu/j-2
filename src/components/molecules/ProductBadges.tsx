import { Badge } from "@/components/atoms/Badge";
import type { Product } from "@/types/product";

export function ProductBadges({ product, className }: { product: Product; className?: string }) {
  const badges: { label: string; tone: "light" | "dark" | "gold" }[] = [];
  if (product.isNewArrival) badges.push({ label: "New", tone: "light" });
  if (product.isBestSeller) badges.push({ label: "Best seller", tone: "light" });
  if (product.stockStatus === "low-stock") badges.push({ label: "Few left", tone: "gold" });
  if (product.stockStatus === "made-to-order")
    badges.push({ label: "Made to order", tone: "gold" });
  if (!badges.length) return null;
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-1.5">
        {badges.slice(0, 2).map((b) => (
          <Badge key={b.label} tone={b.tone}>
            {b.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
