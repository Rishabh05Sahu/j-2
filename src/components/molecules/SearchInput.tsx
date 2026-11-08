"use client";

import { Search, X } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "md" | "lg";
  id?: string;
  onSubmit?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { value, onChange, placeholder = "Search jewelry", className, size = "md", id, onSubmit },
  ref,
) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={cn(
        "flex items-center gap-3 border-b border-charcoal/25 transition-colors focus-within:border-charcoal",
        className,
      )}
    >
      <Search
        aria-hidden
        strokeWidth={1.4}
        className={cn("shrink-0 text-stone", size === "lg" ? "h-5 w-5" : "h-4 w-4")}
      />
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        ref={ref}
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          "w-full bg-transparent text-charcoal placeholder:text-stone/60 focus:outline-none focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden",
          size === "lg" ? "h-14 font-serif text-2xl sm:text-3xl" : "h-11 text-sm",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-stone hover:bg-cream hover:text-charcoal"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" strokeWidth={1.4} />
        </button>
      )}
    </form>
  );
});
