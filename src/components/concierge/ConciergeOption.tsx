"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SmartImage } from "@/components/atoms/SmartImage";
import { ConciergeIcon } from "./ConciergeIcons";
import { easeLux } from "@/constants/design-tokens";
import { cn } from "@/lib/cn";

export function ConciergeOption({
  label,
  description,
  icon,
  image,
  selected = false,
  disabled = false,
  index = 0,
  onSelect,
}: {
  label: string;
  description?: string;
  icon?: string;
  image?: string;
  selected?: boolean;
  disabled?: boolean;
  index?: number;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeLux, delay: 0.05 + index * 0.05 }}
      whileTap={{ scale: 0.985 }}
      className={cn(
        "group relative flex w-full items-center gap-4 overflow-hidden border text-left transition-[border-color,background-color,box-shadow] duration-300",
        image ? "min-h-[88px] p-2.5 pr-4" : "min-h-[60px] px-4 py-3.5",
        selected
          ? "border-espresso bg-ivory shadow-[0_10px_30px_-18px_rgba(51,40,32,0.45)]"
          : "border-line bg-ivory/70 hover:border-charcoal/45 hover:bg-ivory hover:shadow-[0_10px_30px_-20px_rgba(51,40,32,0.35)]",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      {image ? (
        <span className="relative h-[68px] w-[56px] shrink-0 overflow-hidden bg-cream">
          <SmartImage
            src={image}
            alt=""
            fill
            sizes="56px"
            wrapperClassName="absolute inset-0"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </span>
      ) : icon ? (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-espresso">
          <ConciergeIcon name={icon} />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-[1.2rem] leading-snug text-charcoal">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs leading-relaxed text-stone">{description}</span>
        )}
      </span>
      <span
        aria-hidden
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
          selected ? "border-espresso bg-espresso text-ivory" : "border-line text-transparent group-hover:border-charcoal/40",
        )}
      >
        <Check className="h-3 w-3" strokeWidth={2} />
      </span>
    </motion.button>
  );
}
