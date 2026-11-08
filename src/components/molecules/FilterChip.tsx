import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function FilterChip({
  children,
  active = false,
  removable = false,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  removable?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={removable ? undefined : active}
      className={cn(
        "inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-xs tracking-wide transition-colors duration-200",
        active
          ? "border-espresso bg-espresso text-ivory"
          : "border-line bg-transparent text-charcoal hover:border-charcoal/50",
        className,
      )}
    >
      {children}
      {removable && <X aria-hidden className="h-3 w-3" strokeWidth={1.6} />}
      {removable && <span className="sr-only">Remove filter</span>}
    </button>
  );
}
