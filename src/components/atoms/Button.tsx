import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "link" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 font-sans text-center sm:whitespace-nowrap font-medium uppercase tracking-[0.18em] transition-[background-color,color,border-color,opacity,transform] duration-300 ease-[var(--ease-lux)] disabled:pointer-events-none disabled:opacity-45 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-espresso text-ivory hover:bg-charcoal active:scale-[0.99] border border-espresso",
  secondary:
    "border border-charcoal/80 text-charcoal hover:bg-charcoal hover:text-ivory bg-transparent",
  ghost: "text-charcoal hover:bg-cream bg-transparent",
  light: "bg-ivory text-espresso hover:bg-cream border border-ivory",
  link: "px-0! h-auto! tracking-[0.16em] text-charcoal after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-[0.35]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.6875rem]",
  md: "h-12 px-7 text-[0.6875rem]",
  lg: "h-14 px-9 text-xs",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    icon,
    iconPosition = "end",
    className,
    children,
    ...rest
  } = props;
  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
  const content = (
    <>
      {icon && iconPosition === "start" && <span aria-hidden>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "end" && (
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
        >
          {icon}
        </span>
      )}
    </>
  );

  if (typeof rest.href === "string") {
    const linkProps = rest as Omit<ButtonAsLink, keyof CommonProps>;
    return (
      <Link {...linkProps} className={classes}>
        {content}
      </Link>
    );
  }
  const buttonProps = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
