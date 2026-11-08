import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef<
  HTMLInputElement,
  ComponentProps<"input"> & { invalid?: boolean }
>(function Input({ className, invalid, ...rest }, ref) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-12 w-full border-0 border-b bg-transparent px-0 font-sans text-[0.9375rem] text-charcoal placeholder:text-stone/60 transition-colors duration-200 focus:outline-none focus-visible:outline-none",
        invalid ? "border-rose" : "border-charcoal/25 focus:border-charcoal",
        className,
      )}
      {...rest}
    />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  ComponentProps<"select"> & { invalid?: boolean }
>(function Select({ className, invalid, children, ...rest }, ref) {
  return (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-12 w-full cursor-pointer appearance-none border-0 border-b bg-transparent bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2324211E%22 stroke-width=%221.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:12px] bg-[right_2px_center] bg-no-repeat pr-6 font-sans text-[0.9375rem] text-charcoal focus:outline-none",
        invalid ? "border-rose" : "border-charcoal/25 focus:border-charcoal",
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
});
