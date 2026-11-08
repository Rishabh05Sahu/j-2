import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** CSS-only tooltip that appears on hover and keyboard focus. */
export function Tooltip({
  content,
  children,
  side = "bottom",
  className,
}: {
  content: string;
  children: ReactNode;
  side?: "top" | "bottom";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "group/tt relative",
        !/(^|\s)hidden(\s|$)/.test(className ?? "") && "inline-flex",
        className,
      )}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap lg:block bg-espresso px-2.5 py-1.5 text-[0.625rem] uppercase tracking-[0.14em] text-ivory opacity-0 transition-opacity duration-200 group-hover/tt:opacity-100 group-focus-within/tt:opacity-100",
          side === "bottom" ? "top-full mt-2" : "bottom-full mb-2",
        )}
      >
        {content}
      </span>
    </span>
  );
}
