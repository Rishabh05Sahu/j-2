import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "gold" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em]",
        tone === "light" && "bg-ivory/95 text-charcoal",
        tone === "dark" && "bg-espresso text-ivory",
        tone === "gold" && "bg-champagne/60 text-espresso",
        tone === "outline" && "border border-line text-stone",
        className,
      )}
    >
      {children}
    </span>
  );
}
