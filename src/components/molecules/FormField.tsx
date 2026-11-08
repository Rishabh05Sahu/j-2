import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function FormField({
  id,
  label,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="eyebrow text-[0.625rem] text-stone">
        {label}
      </label>
      {children}
      <p
        id={`${id}-message`}
        role={error ? "alert" : undefined}
        className={cn("mt-1.5 min-h-4 text-xs", error ? "text-rose" : "text-stone/80")}
      >
        {error ?? hint ?? ""}
      </p>
    </div>
  );
}
