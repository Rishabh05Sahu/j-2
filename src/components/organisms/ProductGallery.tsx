"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SmartImage } from "@/components/atoms/SmartImage";
import { cn } from "@/lib/cn";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);

  const go = (next: number) => {
    const n = (next + images.length) % images.length;
    setState([n, next > index ? 1 : -1]);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(index + 1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(index - 1);
  };

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-5">
      {/* Thumbnails */}
      <div className="hidden gap-3 lg:flex lg:flex-col" role="group" aria-label="Product images">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => go(i)}
            aria-label={`View image ${i + 1} of ${images.length}`}
            aria-pressed={i === index}
            className={cn(
              "relative h-24 w-20 overflow-hidden bg-cream transition-opacity",
              i === index ? "opacity-100 ring-1 ring-espresso ring-offset-2 ring-offset-ivory" : "opacity-60 hover:opacity-100",
            )}
          >
            <SmartImage src={src} alt="" fill sizes="80px" wrapperClassName="absolute inset-0" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              className="absolute inset-0 touch-pan-y"
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag={images.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              <SmartImage
                src={images[index]}
                alt={`${name} — image ${index + 1} of ${images.length}`}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                wrapperClassName="absolute inset-0"
                className="pointer-events-none object-cover"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/80 text-charcoal backdrop-blur transition-colors hover:bg-ivory sm:flex"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.3} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/80 text-charcoal backdrop-blur transition-colors hover:bg-ivory sm:flex"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.3} />
              </button>
            </>
          )}
        </div>

        {/* Mobile dots */}
        {images.length > 1 && (
          <div className="mt-4 flex justify-center gap-1 lg:hidden" role="group" aria-label="Choose image">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={i === index}
                className="flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={cn(
                    "h-px transition-all duration-300",
                    i === index ? "w-7 bg-espresso" : "w-3.5 bg-charcoal/30",
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
