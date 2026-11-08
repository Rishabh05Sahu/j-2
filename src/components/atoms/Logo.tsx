import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  tone = "dark",
  onClick,
}: {
  className?: string;
  tone?: "dark" | "light";
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Solenne — home"
      className={cn(
        "inline-flex flex-col items-center leading-none",
        tone === "dark" ? "text-charcoal" : "text-ivory",
        className,
      )}
    >
      <span className="font-serif text-[1.55rem] font-normal tracking-[0.32em] sm:text-[1.7rem]">
        SOLENNE
      </span>
      <span className="mt-1 text-[0.5rem] font-medium uppercase tracking-[0.5em] opacity-70">
        Fine Jewelry
      </span>
    </Link>
  );
}
