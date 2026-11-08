import { cn } from "@/lib/cn";

export function Spinner({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <span role="status" className={cn("inline-flex items-center", className)}>
      <span className="h-4 w-4 animate-spin rounded-full border border-current border-t-transparent" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
