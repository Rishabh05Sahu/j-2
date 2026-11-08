"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * next/image with a shimmering placeholder and an elegant fallback
 * if the asset is missing or fails to load.
 */
export function SmartImage({
  className,
  wrapperClassName,
  alt,
  ...props
}: ImageProps & { wrapperClassName?: string }) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <span
      className={cn(
        "block overflow-hidden bg-cream",
        !/\b(absolute|fixed)\b/.test(wrapperClassName ?? "") && "relative",
        wrapperClassName,
      )}
    >
      {state === "loading" && <span aria-hidden className="lux-shimmer absolute inset-0" />}
      {state === "error" ? (
        <ImageFallback label={alt} />
      ) : (
        <Image
          alt={alt}
          {...props}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          className={cn(
            "transition-opacity duration-700 ease-[var(--ease-lux)]",
            state === "loaded" ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      )}
    </span>
  );
}

export function ImageFallback({ label }: { label?: string }) {
  return (
    <span
      role="img"
      aria-label={label || "Image unavailable"}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-cream via-ivory to-sand text-gold"
    >
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M14 8h20l8 10-18 22L6 18l8-10Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M6 18h36M18 8l-4 10 10 22 10-22-4-10" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="font-serif text-sm tracking-[0.3em] text-stone">SOLENNE</span>
    </span>
  );
}
