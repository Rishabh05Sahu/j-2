import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/cn";

export function Price({
  value,
  className,
  size = "md",
}: {
  value: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "font-sans tabular-nums text-charcoal",
        size === "sm" && "text-[0.8125rem]",
        size === "md" && "text-sm",
        size === "lg" && "text-lg tracking-wide",
        className,
      )}
    >
      {formatCurrency(value)}
    </span>
  );
}
