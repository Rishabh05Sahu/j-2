"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { easeLux } from "@/constants/design-tokens";
import { cn } from "@/lib/cn";

type Side = "right" | "left" | "bottom" | "center" | "top" | "full";

const panelVariants: Record<Side, Variants> = {
  right: { hidden: { x: "100%" }, visible: { x: 0 } },
  left: { hidden: { x: "-100%" }, visible: { x: 0 } },
  bottom: { hidden: { y: "100%" }, visible: { y: 0 } },
  top: { hidden: { y: "-100%" }, visible: { y: 0 } },
  center: {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  full: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
};

const panelPosition: Record<Side, string> = {
  right: "right-0 top-0 h-dvh w-full max-w-[440px]",
  left: "left-0 top-0 h-dvh w-full max-w-[420px]",
  bottom: "bottom-0 left-0 max-h-[88dvh] w-full rounded-t-[20px]",
  top: "left-0 top-0 w-full",
  center:
    "left-1/2 top-1/2 max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2",
  full: "inset-0 h-dvh w-full",
};

let lockCount = 0;
function lockScroll() {
  lockCount++;
  if (lockCount === 1) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
  }
}
function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
}

/** Stack of open sheets so only the top-most one handles keyboard events. */
const sheetStack: symbol[] = [];

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const subscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

interface SheetProps {
  open: boolean;
  onClose: () => void;
  label: string;
  side?: Side;
  className?: string;
  children: ReactNode;
  /** Element id to receive initial focus. */
  initialFocusId?: string;
  overlayClassName?: string;
}

export function Sheet({
  open,
  onClose,
  label,
  side = "right",
  className,
  children,
  initialFocusId,
  overlayClassName,
}: SheetProps) {
  const isClient = useIsClient();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const token = Symbol("sheet");
    sheetStack.push(token);
    lockScroll();

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const preferred = initialFocusId ? document.getElementById(initialFocusId) : null;
      const first = preferred ?? panel.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panel).focus({ preventScroll: true });
    }, 60);

    const onKey = (e: KeyboardEvent) => {
      if (sheetStack[sheetStack.length - 1] !== token) return;
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((n) => n.offsetParent !== null || n === document.activeElement);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      const at = sheetStack.indexOf(token);
      if (at >= 0) sheetStack.splice(at, 1);
      unlockScroll();
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open, initialFocusId]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]" key="sheet">
          <motion.div
            aria-hidden
            className={cn("absolute inset-0 bg-espresso/35 backdrop-blur-[2px]", overlayClassName)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className={cn(
              "absolute flex flex-col bg-ivory shadow-[0_30px_80px_-20px_rgba(51,40,32,0.35)] outline-none",
              panelPosition[side],
              className,
            )}
            variants={panelVariants[side]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: side === "center" ? 0.35 : 0.45, ease: easeLux }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
