import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  max = 100,
  label,
  className,
}: {
  value: number;
  max?: number;
  label: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.round(value)}
      className={cn("h-px w-full overflow-hidden bg-line", className)}
    >
      <div
        className="h-full bg-espresso transition-[width] duration-500 ease-[var(--ease-lux)]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
