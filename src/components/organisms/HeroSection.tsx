"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { OpenConciergeButton } from "@/components/concierge/OpenConciergeButton";
import { easeLux } from "@/constants/design-tokens";
import { cn } from "@/lib/cn";

const SLIDES = [
  { src: "/images/editorial/hero-drape.jpg", caption: "The Whisper Layering Set" },
  { src: "/images/editorial/hero-coin.jpg", caption: "Soleil Coin Pendant" },
  { src: "/images/editorial/story-delicate.jpg", caption: "Laurel Layered Necklace" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: easeLux, delay },
});

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="grid lg:min-h-[calc(100svh-var(--header-h)-2.25rem)] lg:grid-cols-[1fr_1.05fr]">
        {/* Copy */}
        <div className="order-2 flex flex-col justify-center px-5 pb-16 pt-10 sm:px-10 lg:order-1 lg:px-16 lg:py-20 xl:px-24">
          <motion.p {...fadeUp(0.1)} className="eyebrow flex items-center gap-3 text-stone">
            <span className="h-px w-8 bg-gold" aria-hidden />
            The Autumn Collection
          </motion.p>
          <motion.h1
            id="hero-title"
            {...fadeUp(0.2)}
            className="mt-6 max-w-xl font-serif text-[2.9rem] font-light leading-[1.02] text-charcoal text-balance sm:text-6xl lg:text-[4.6rem] xl:text-[5.4rem]"
          >
            Jewelry That Becomes <em className="font-light italic text-espresso">Your Story.</em>
          </motion.h1>
          <motion.p
            {...fadeUp(0.35)}
            className="mt-6 max-w-md text-base leading-relaxed text-stone sm:text-[1.0625rem]"
          >
            Discover timeless pieces, thoughtfully selected for every chapter of your life.
          </motion.p>
          <motion.div {...fadeUp(0.5)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/collections" size="lg" icon={<ArrowRight className="h-4 w-4" strokeWidth={1.4} />}>
              Explore Collections
            </Button>
            <OpenConciergeButton variant="secondary" size="lg">
              Meet Your Personal Concierge
            </OpenConciergeButton>
          </motion.div>

          <motion.dl
            {...fadeUp(0.65)}
            className="mt-14 hidden max-w-lg grid-cols-3 gap-6 border-t border-line pt-6 sm:grid"
          >
            {[
              ["18K", "Solid gold & platinum"],
              ["100%", "Responsibly sourced"],
              ["Lifetime", "Complimentary care"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-serif text-2xl text-charcoal">{k}</dt>
                <dd className="mt-1 text-xs text-stone">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Imagery */}
        <div
          className="relative order-1 h-[68svh] min-h-[420px] overflow-hidden bg-cream lg:order-2 lg:h-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={SLIDES[index].src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7.5, ease: "easeOut" }}
              >
                <Image
                  src={SLIDES[index].src}
                  alt={`Editorial photograph: ${SLIDES[index].caption}`}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent" />

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between sm:inset-x-8 sm:bottom-8">
            <p className="text-[0.625rem] uppercase tracking-[0.2em] text-ivory/90">
              Pictured — {SLIDES[index].caption}
            </p>
            <div className="flex gap-1" role="group" aria-label="Choose hero image">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={i === index}
                  className="flex h-8 w-8 items-center justify-center"
                >
                  <span
                    className={cn(
                      "h-px transition-all duration-500",
                      i === index ? "w-6 bg-ivory" : "w-3 bg-ivory/50",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
