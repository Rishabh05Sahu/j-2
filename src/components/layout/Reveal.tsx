"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeLux } from "@/constants/design-tokens";

/** Fades content up as it scrolls into view (respects reduced motion). */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: easeLux, delay }}
    >
      {children}
    </motion.div>
  );
}
