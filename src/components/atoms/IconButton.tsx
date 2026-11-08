import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface IconButtonProps extends ComponentProps<"button"> {
  label: string;
  children: ReactNode;
  badge?: number;
  tone?: "default" | "light" | "solid";
  size?: "sm" | "md";
}

export function IconButton({
  label,
  children,
  badge,
  tone = "default",
  size = "md",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={badge ? `${label} (${badge})` : label}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-200",
        size === "md" ? "h-11 w-11" : "h-9 w-9",
        tone === "default" && "text-charcoal hover:bg-cream",
        tone === "light" && "bg-ivory/90 text-charcoal backdrop-blur hover:bg-ivory",
        tone === "solid" && "bg-espresso text-ivory hover:bg-charcoal",
        className,
      )}
      {...rest}
    >
      {children}
      {badge ? (
        <span
          aria-hidden
          className="absolute right-1 top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-espresso px-1 text-[10px] font-medium leading-none text-ivory"
        >
          {badge > 99 ? "99+" : badge}
        </span>
      ) : null}
    </button>
  );
}
