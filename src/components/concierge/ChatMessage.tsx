"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeLux } from "@/constants/design-tokens";
import { cn } from "@/lib/cn";

/** A line spoken by the concierge — editorial serif, no chat bubble. */
export function ConciergeLine({
  children,
  extra,
  emphasis = false,
}: {
  children: ReactNode;
  extra?: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeLux }}
      className="flex gap-3 sm:gap-4"
    >
      <span aria-hidden className="mt-3 flex h-3 w-3 shrink-0 items-center justify-center">
        <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-serif font-light leading-snug text-charcoal text-pretty",
            emphasis ? "text-[1.6rem] sm:text-[2rem]" : "text-[1.3rem] sm:text-[1.5rem]",
          )}
        >
          <span className="sr-only">Amara: </span>
          {children}
        </p>
        {extra && <div className="mt-5">{extra}</div>}
      </div>
    </motion.div>
  );
}

/** The client's reply — small, right-aligned, quietly framed. */
export function UserReply({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: easeLux }}
      className="flex justify-end"
    >
      <p className="max-w-[85%] rounded-full border border-champagne/70 bg-cream/80 px-4 py-2 text-[0.8125rem] text-espresso">
        <span className="sr-only">You: </span>
        {children}
      </p>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-3 pl-7 sm:pl-7"
      role="status"
      aria-label="Amara is composing a reply"
    >
      <span className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-gold"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </span>
      <span className="text-xs italic text-stone">Amara is considering…</span>
    </motion.div>
  );
}
