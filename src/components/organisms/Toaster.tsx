"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SmartImage } from "@/components/atoms/SmartImage";
import { useUIStore } from "@/store/ui-store";
import { easeLux } from "@/constants/design-tokens";

export function Toaster() {
  const toasts = useUIStore((s) => s.toasts);
  const dismiss = useUIStore((s) => s.dismissToast);
  const openCart = useUIStore((s) => s.openCart);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-[95] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:left-6 sm:right-auto sm:items-start"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35, ease: easeLux }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 bg-espresso p-3 pr-2 text-ivory shadow-[0_20px_50px_-15px_rgba(36,33,30,0.5)]"
            role="status"
          >
            {t.image ? (
              <span className="relative h-14 w-12 shrink-0 overflow-hidden">
                <SmartImage src={t.image} alt="" fill sizes="48px" wrapperClassName="absolute inset-0" className="object-cover" />
              </span>
            ) : (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/30">
                <Check className="h-4 w-4" strokeWidth={1.5} />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em]">{t.title}</p>
              {t.description && (
                <p className="mt-0.5 truncate text-[0.8125rem] text-ivory/75">{t.description}</p>
              )}
            </div>
            {t.action &&
              (t.action.href ? (
                <Link
                  href={t.action.href}
                  onClick={() => dismiss(t.id)}
                  className="shrink-0 px-2 text-[0.625rem] uppercase tracking-[0.16em] text-champagne underline-offset-4 hover:underline"
                >
                  {t.action.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    dismiss(t.id);
                    if (t.action?.onClick === "open-cart") openCart();
                  }}
                  className="shrink-0 px-2 text-[0.625rem] uppercase tracking-[0.16em] text-champagne underline-offset-4 hover:underline"
                >
                  {t.action.label}
                </button>
              ))}
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ivory/70 hover:text-ivory"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
