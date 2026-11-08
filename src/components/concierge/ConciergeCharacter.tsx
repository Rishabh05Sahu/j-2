"use client";

import { AnimatePresence, motion } from "framer-motion";
import { colors } from "@/constants/design-tokens";
import type { ConciergeMood } from "@/types/concierge";
import { cn } from "@/lib/cn";

const SKIN = "#EFE2D3";
const STROKE = colors.espresso;

function Sparkle({
  x,
  y,
  s = 1,
  delay = 0,
  duration = 3.2,
}: {
  x: number;
  y: number;
  s?: number;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.path
      d={`M${x} ${y - 6 * s} L${x + 1.4 * s} ${y - 1.4 * s} L${x + 6 * s} ${y} L${x + 1.4 * s} ${
        y + 1.4 * s
      } L${x} ${y + 6 * s} L${x - 1.4 * s} ${y + 1.4 * s} L${x - 6 * s} ${y} L${x - 1.4 * s} ${
        y - 1.4 * s
      } Z`}
      fill={colors.gold}
      initial={{ opacity: 0.2, scale: 0.7 }}
      animate={{ opacity: [0.15, 0.95, 0.15], scale: [0.7, 1, 0.7] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    />
  );
}

/**
 * An editorial line-art illustration of a virtual boutique concierge.
 * Clearly illustrative — never presented as a real person.
 */
export function ConciergeCharacter({
  mood = "idle",
  className,
  framed = true,
  portrait = false,
  title = "Illustration of Amara, your virtual jewelry concierge",
}: {
  mood?: ConciergeMood;
  className?: string;
  framed?: boolean;
  portrait?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox={portrait ? "52 88 96 96" : "0 0 200 260"}
      role="img"
      aria-label={title}
      className={cn("h-auto w-full overflow-visible", className)}
    >
      {framed && (
        <>
          <path
            d="M14 260 V104 A86 86 0 0 1 186 104 V260 Z"
            fill={colors.cream}
          />
          <path
            d="M24 260 V106 A76 76 0 0 1 176 106 V260"
            fill="none"
            stroke={colors.champagne}
            strokeWidth="0.8"
          />
        </>
      )}

      {/* breathing body */}
      <motion.g
        animate={{ y: [0, -1.6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* blazer */}
        <path
          d="M36 262 C38 224 58 205 100 200 C142 205 162 224 164 262 Z"
          fill={colors.ivory}
          stroke={STROKE}
          strokeWidth="1"
        />
        <path d="M100 236 L100 262" stroke={STROKE} strokeWidth="0.6" opacity="0.5" />
        {/* blouse / neckline */}
        <path d="M86 202 L100 236 L114 202 Z" fill={SKIN} stroke={STROKE} strokeWidth="0.9" />
        {/* lapels */}
        <path d="M86 202 L78 214 L96 238" fill="none" stroke={STROKE} strokeWidth="0.9" />
        <path d="M114 202 L122 214 L104 238" fill="none" stroke={STROKE} strokeWidth="0.9" />
        {/* pocket square */}
        <path d="M128 228 l8 -3 l2 6" fill="none" stroke={colors.gold} strokeWidth="0.9" />
        {/* neck */}
        <path d="M91 170 L91 203 Q100 208 109 203 L109 170 Z" fill={SKIN} />
        <path d="M91 170 L91 202 M109 170 L109 202" stroke={STROKE} strokeWidth="0.9" />
        {/* necklace */}
        <path d="M91 196 Q100 212 109 196" fill="none" stroke={colors.gold} strokeWidth="1" />
        <path d="M100 207 l2.2 2.8 -2.2 2.8 -2.2 -2.8 Z" fill={colors.gold} />

        {/* head with gentle tilt */}
        <motion.g
          animate={{ rotate: [0, 1.4, 0, -0.8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 170px" }}
        >
          {/* chignon */}
          <circle cx="124" cy="101" r="12" fill={colors.espresso} />
          {/* face */}
          <ellipse cx="100" cy="135" rx="27" ry="33" fill={SKIN} stroke={STROKE} strokeWidth="0.9" />
          {/* hair */}
          <path
            d="M72 140 C66 104 84 94 101 95 C121 96 134 108 128 140 C126 120 116 109 100 110 C86 111 76 121 72 140 Z"
            fill={colors.espresso}
          />
          <path d="M101 96 C96 104 92 108 86 112" stroke={colors.ivory} strokeWidth="0.5" opacity="0.4" fill="none" />
          {/* earring */}
          <circle cx="73.5" cy="148" r="2.4" fill={colors.gold} />
          {/* brows */}
          <path d="M85 126 Q90.5 123.5 96 126" stroke={STROKE} strokeWidth="0.9" fill="none" />
          <path d="M104 126 Q109.5 123.5 115 126" stroke={STROKE} strokeWidth="0.9" fill="none" />
          {/* eyes — blink */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 5.5, times: [0, 0.9, 0.93, 0.96, 1], repeat: Infinity }}
            style={{ transformOrigin: "100px 134px" }}
          >
            {mood === "delighted" ? (
              <>
                <path d="M87 135 Q91 131 95 135" stroke={STROKE} strokeWidth="1.2" fill="none" />
                <path d="M105 135 Q109 131 113 135" stroke={STROKE} strokeWidth="1.2" fill="none" />
              </>
            ) : (
              <>
                <ellipse cx="91" cy="134" rx="1.9" ry="2.3" fill={STROKE} />
                <ellipse cx="109" cy="134" rx="1.9" ry="2.3" fill={STROKE} />
              </>
            )}
          </motion.g>
          {/* nose */}
          <path d="M100 138 Q97.5 148 101 150" stroke={STROKE} strokeWidth="0.8" fill="none" />
          {/* smile */}
          <motion.path
            stroke={STROKE}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            animate={{
              d:
                mood === "delighted"
                  ? "M92 157 Q100 165 108 157"
                  : "M93.5 158 Q100 162 106.5 158",
            }}
            transition={{ duration: 0.35 }}
          />
          {/* blush */}
          <circle cx="86" cy="150" r="4" fill={colors.champagne} opacity="0.35" />
          <circle cx="114" cy="150" r="4" fill={colors.champagne} opacity="0.35" />
        </motion.g>
      </motion.g>

      {/* ambient sparkles */}
      {!portrait && (
        <>
          <Sparkle x={40} y={92} s={0.9} delay={0.2} />
          <Sparkle x={163} y={150} s={0.7} delay={1.4} />
          <Sparkle x={52} y={176} s={0.55} delay={2.3} />
        </>
      )}

      <AnimatePresence>
        {mood === "delighted" && !portrait && (
          <motion.g
            key="delight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkle x={150} y={84} s={1.2} duration={1.4} />
            <Sparkle x={160} y={112} s={0.8} delay={0.3} duration={1.4} />
            <Sparkle x={140} y={64} s={0.6} delay={0.6} duration={1.4} />
          </motion.g>
        )}
        {mood === "thinking" && !portrait && (
          <motion.g
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={142 + i * 8}
                cy={86 - i * 6}
                r={2 + i * 0.6}
                fill={colors.champagne}
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

/** Compact circular portrait used for the floating button and chat lines. */
export function ConciergeAvatar({
  className,
  mood = "idle",
}: {
  className?: string;
  mood?: ConciergeMood;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full bg-cream ring-1 ring-champagne",
        className,
      )}
    >
      <ConciergeCharacter
        mood={mood}
        framed={false}
        portrait
        title="Amara, virtual concierge"
        className="h-full w-full"
      />
    </span>
  );
}
