"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ConciergeCharacter } from "@/components/concierge/ConciergeCharacter";
import { OpenConciergeButton } from "@/components/concierge/OpenConciergeButton";
import { useConciergeStore } from "@/store/concierge-store";
import { INTENTS } from "@/data/concierge-flows";
import { easeLux } from "@/constants/design-tokens";

export function ConciergeIntro() {
  const open = useConciergeStore((s) => s.open);
  const mood = useConciergeStore((s) => s.mood);

  return (
    <section aria-labelledby="concierge-intro-title" className="bg-cream">
      <div className="container-lux grid items-center gap-12 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: easeLux }}
          className="relative mx-auto w-full max-w-[300px] md:max-w-[360px]"
        >
          <ConciergeCharacter mood={mood} />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ivory px-5 py-2.5 text-center shadow-[0_20px_40px_-25px_rgba(51,40,32,0.4)]">
            <p className="font-serif text-lg leading-none text-charcoal">Amara</p>
            <p className="mt-1 text-[0.5625rem] uppercase tracking-[0.22em] text-stone">
              Your virtual concierge
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: easeLux, delay: 0.1 }}
        >
          <p className="eyebrow flex items-center gap-3 text-stone">
            <span className="h-px w-8 bg-gold" aria-hidden /> A private consultation
          </p>
          <h2
            id="concierge-intro-title"
            className="mt-6 max-w-2xl font-serif text-4xl font-light leading-[1.08] text-charcoal text-balance sm:text-5xl lg:text-6xl"
          >
            May I Help You Find Something <em className="italic">Extraordinary?</em>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-stone">
            Every beautiful piece begins with a story. Tell me yours, and I&apos;ll help you
            discover the perfect piece.
          </p>

          <ul className="mt-9 flex flex-wrap gap-2.5" aria-label="Start with">
            {INTENTS.slice(0, 4).map((intent) => (
              <li key={intent.id}>
                <button
                  type="button"
                  onClick={() => open({ intent: intent.id })}
                  className="inline-flex min-h-10 items-center rounded-full border border-charcoal/20 bg-ivory px-4 text-sm text-charcoal transition-colors hover:border-espresso hover:bg-espresso hover:text-ivory"
                >
                  {intent.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <OpenConciergeButton size="lg" icon={<ArrowRight className="h-4 w-4" strokeWidth={1.4} />}>
              Begin Your Journey
            </OpenConciergeButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
