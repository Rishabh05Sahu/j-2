import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";

interface Action {
  label: string;
  href?: string;
  onClick?: () => void;
}

export function EmptyState({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary?: Action;
  secondary?: Action;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center py-12 text-center">
      <Divider ornament className="mb-8 w-32" />
      <h2 className="font-serif text-3xl font-light leading-tight text-charcoal text-balance sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-sm leading-relaxed text-stone">{description}</p>}
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        {primary &&
          (primary.href ? (
            <Button href={primary.href} onClick={primary.onClick}>
              {primary.label}
            </Button>
          ) : (
            <Button onClick={primary.onClick}>{primary.label}</Button>
          ))}
        {secondary &&
          (secondary.href ? (
            <Button href={secondary.href} onClick={secondary.onClick} variant="secondary">
              {secondary.label}
            </Button>
          ) : (
            <Button onClick={secondary.onClick} variant="secondary">
              {secondary.label}
            </Button>
          ))}
      </div>
    </div>
  );
}
