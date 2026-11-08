import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingSize = "display" | "xl" | "lg" | "md" | "sm";

const headingSizes: Record<HeadingSize, string> = {
  display:
    "text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5.25rem] lg:leading-[0.98] tracking-[-0.01em]",
  xl: "text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-6xl tracking-[-0.005em]",
  lg: "text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
  md: "text-2xl leading-tight sm:text-[1.75rem]",
  sm: "text-xl leading-snug",
};

interface HeadingProps {
  as?: ElementType;
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
  id?: string;
}

export function Heading({ as: Tag = "h2", size = "lg", className, children, id }: HeadingProps) {
  return (
    <Tag
      id={id}
      className={cn("font-serif font-light text-charcoal text-balance", headingSizes[size], className)}
    >
      {children}
    </Tag>
  );
}

interface TextProps {
  as?: ElementType;
  size?: "sm" | "md" | "lg";
  muted?: boolean;
  className?: string;
  children: ReactNode;
}

export function Text({ as: Tag = "p", size = "md", muted = true, className, children }: TextProps) {
  return (
    <Tag
      className={cn(
        "font-sans text-pretty",
        size === "sm" && "text-[0.8125rem] leading-relaxed",
        size === "md" && "text-[0.9375rem] leading-relaxed",
        size === "lg" && "text-base leading-relaxed sm:text-[1.0625rem]",
        muted ? "text-stone" : "text-charcoal",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("eyebrow text-stone", className)}>{children}</Tag>;
}
