"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Sheet } from "@/components/molecules/Sheet";
import { ConciergeAvatar } from "./ConciergeCharacter";
import { ConciergeExperience } from "./ConciergeExperience";
import { useConciergeStore } from "@/store/concierge-store";
import { cn } from "@/lib/cn";

const HIDDEN_ON = ["/concierge", "/checkout"];

/** Floating concierge button plus the full-screen consultation panel. */
export function ConciergeWidget() {
  const pathname = usePathname();
  const isOpen = useConciergeStore((s) => s.isOpen);
  const open = useConciergeStore((s) => s.open);
  const close = useConciergeStore((s) => s.close);
  const mood = useConciergeStore((s) => s.mood);
  const hideButton = HIDDEN_ON.some((p) => pathname.startsWith(p));
  const onProductPage = pathname.startsWith("/product/");

  return (
    <>
      <AnimatePresence>
        {!hideButton && !isOpen && (
          <motion.button
            type="button"
            key="concierge-fab"
            onClick={() => open()}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            aria-label="Open your personal concierge"
            className={cn(
              "group fixed right-4 z-40 flex items-center gap-3 rounded-full bg-espresso p-1.5 pr-1.5 text-ivory shadow-[0_18px_40px_-14px_rgba(51,40,32,0.6)] transition-[padding] duration-300 hover:pr-5 sm:right-6 sm:pr-5",
              onProductPage
                ? "bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] lg:bottom-6"
                : "bottom-[calc(env(safe-area-inset-bottom)+1rem)] sm:bottom-6",
            )}
          >
            <ConciergeAvatar className="h-12 w-12 ring-ivory/40" mood={mood} />
            <span className="hidden flex-col items-start leading-tight sm:flex">
              <span className="text-[0.625rem] uppercase tracking-[0.2em] text-champagne">
                Concierge
              </span>
              <span className="font-serif text-base">May I help?</span>
            </span>
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-champagne ring-2 ring-espresso sm:right-auto sm:left-11">
              <span className="absolute inset-0 animate-ping rounded-full bg-champagne/70" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <Sheet
        open={isOpen && !pathname.startsWith("/concierge")}
        onClose={close}
        side="full"
        label="Personal jewelry concierge"
        className="overflow-hidden"
      >
        <ConciergeExperience mode="panel" onClose={close} />
      </Sheet>
    </>
  );
}
