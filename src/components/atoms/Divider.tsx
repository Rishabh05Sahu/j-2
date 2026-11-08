import { cn } from "@/lib/cn";

export function Divider({
  className,
  ornament = false,
}: {
  className?: string;
  ornament?: boolean;
}) {
  if (!ornament) return <hr className={cn("border-0 border-t border-line", className)} />;
  return (
    <div role="separator" className={cn("flex items-center gap-4 text-gold", className)}>
      <span className="h-px flex-1 bg-line" />
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" opacity="0.7" />
      </svg>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
