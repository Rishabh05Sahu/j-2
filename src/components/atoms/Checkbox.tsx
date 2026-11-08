import { Check } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ChoiceProps extends Omit<ComponentProps<"input">, "type"> {
  label: ReactNode;
  hint?: ReactNode;
}

export function Checkbox({ label, hint, className, ...rest }: ChoiceProps) {
  return (
    <label
      className={cn(
        "group flex min-h-10 cursor-pointer items-center gap-3 text-sm text-charcoal",
        className,
      )}
    >
      <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <input
          type="checkbox"
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none border border-charcoal/40 transition-colors checked:border-espresso checked:bg-espresso"
          {...rest}
        />
        <Check
          aria-hidden
          strokeWidth={2}
          className="pointer-events-none relative h-3 w-3 text-ivory opacity-0 transition-opacity peer-checked:opacity-100"
        />
      </span>
      <span className="flex-1">{label}</span>
      {hint !== undefined && <span className="text-xs text-stone">{hint}</span>}
    </label>
  );
}

export function Radio({ label, hint, className, ...rest }: ChoiceProps) {
  return (
    <label
      className={cn(
        "group flex min-h-10 cursor-pointer items-center gap-3 text-sm text-charcoal",
        className,
      )}
    >
      <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <input
          type="radio"
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full border border-charcoal/40 transition-colors checked:border-espresso"
          {...rest}
        />
        <span className="pointer-events-none relative h-2 w-2 rounded-full bg-espresso opacity-0 transition-opacity peer-checked:opacity-100" />
      </span>
      <span className="flex-1">{label}</span>
      {hint !== undefined && <span className="text-xs text-stone">{hint}</span>}
    </label>
  );
}
