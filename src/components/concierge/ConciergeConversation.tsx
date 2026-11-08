"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";
import { INTENTS } from "@/data/concierge-flows";
import { useConcierge } from "@/hooks/useConcierge";
import { useConciergeStore } from "@/store/concierge-store";
import { ConciergeLine, TypingIndicator, UserReply } from "./ChatMessage";
import { ConciergeOption } from "./ConciergeOption";
import { ConciergeRecommendations } from "./ConciergeRecommendations";
import {
  AddedToBagCard,
  LovePromptActions,
  ProductContextActions,
  RefineChips,
} from "./ConciergePrompts";
import type { ConciergeMessage } from "@/types/concierge";

export function ConciergeConversation({ className }: { className?: string }) {
  const c = useConcierge();
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastCount = useRef(0);

  // Gently bring the newest exchange into view.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const count = c.messages.length;
    const grew = count !== lastCount.current;
    lastCount.current = count;
    if (!grew && !c.isTyping) return;
    const all = el.querySelectorAll<HTMLElement>("[data-msg]");
    const last = all[all.length - 1];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
    const lastMsg = c.messages[count - 1];
    if (last && lastMsg && lastMsg.role === "concierge" && !c.isTyping) {
      el.scrollTo({ top: Math.max(0, last.offsetTop - 24), behavior });
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior });
    }
  }, [c.messages, c.isTyping]);

  // When options appear after typing, keep them in view.
  useEffect(() => {
    if (c.isTyping) return;
    const el = scrollRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      const block = el.querySelector<HTMLElement>("[data-active-block]");
      if (!block) return;
      const blockBottom = block.offsetTop + block.offsetHeight;
      const all = el.querySelectorAll<HTMLElement>("[data-msg]");
      const lastMsg = all[all.length - 1];
      const wanted = Math.min(
        blockBottom - el.clientHeight + 24,
        lastMsg ? lastMsg.offsetTop - 24 : Infinity,
      );
      if (wanted > el.scrollTop) el.scrollTo({ top: wanted, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, [c.isTyping, c.phase, c.questionIndex]);

  return (
    <div
      ref={scrollRef}
      className={className}
      aria-live="polite"
      aria-relevant="additions"
      aria-busy={c.isTyping}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-7 px-5 pb-10 pt-6 sm:px-8 sm:pt-10">
        {c.messages.map((m, i) => (
          <div key={m.id} data-msg className="relative">
            <MessageView message={m} isFirst={i === 0} />
          </div>
        ))}

        <AnimatePresence>{c.isTyping && <TypingIndicator key="typing" />}</AnimatePresence>

        {!c.isTyping && c.phase === "intent" && (
          <div data-active-block className="grid gap-3 pl-7 sm:grid-cols-2">
            {INTENTS.map((intent, i) => (
              <ConciergeOption
                key={intent.id}
                index={i}
                label={intent.label}
                description={intent.description}
                image={intent.image}
                onSelect={() => c.selectIntent(intent.id)}
              />
            ))}
          </div>
        )}

        {!c.isTyping && c.currentQuestion && (
          <div data-active-block className="pl-7">
            {c.currentQuestion.helper && (
              <p className="-mt-3 mb-5 text-sm italic text-stone">{c.currentQuestion.helper}</p>
            )}
            <div
              className={
                c.currentQuestion.options.length > 4 && !c.currentQuestion.options.some((o) => o.description)
                  ? "grid grid-cols-1 gap-2.5 min-[430px]:grid-cols-2"
                  : "grid gap-2.5 sm:grid-cols-2"
              }
            >
              {c.currentQuestion.options.map((o, i) => (
                <ConciergeOption
                  key={o.id}
                  index={i}
                  label={o.label}
                  description={o.description}
                  icon={o.icon}
                  image={o.image}
                  selected={c.answers[c.currentQuestion!.id] === o.id}
                  onSelect={() => c.answer(o.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MessageView({
  message: m,
  isFirst,
}: {
  message: ConciergeMessage;
  isFirst: boolean;
}) {
  const isTyping = useConciergeStore((s) => s.isTyping);
  if (m.role === "user") return <UserReply>{m.text}</UserReply>;

  switch (m.kind) {
    case "text":
      return <ConciergeLine emphasis={isFirst}>{m.text}</ConciergeLine>;
    case "recommendations":
      return (
        <ConciergeLine extra={<ConciergeRecommendations productIds={m.productIds} />}>
          {m.text}
        </ConciergeLine>
      );
    case "love-prompt":
      return (
        <ConciergeLine extra={<LovePromptActions productId={m.productId} resolved={m.resolved} />}>
          {m.text}
        </ConciergeLine>
      );
    case "refine-prompt":
      return (
        <ConciergeLine extra={!m.resolved && <RefineChips disabled={isTyping} />}>
          {m.text}
        </ConciergeLine>
      );
    case "added-to-bag":
      return (
        <ConciergeLine extra={<AddedToBagCard productId={m.productId} />}>
          {m.text}
        </ConciergeLine>
      );
    case "product-context":
      return (
        <ConciergeLine
          emphasis={isFirst}
          extra={<ProductContextActions productId={m.productId} resolved={m.resolved} />}
        >
          {m.text}
        </ConciergeLine>
      );
    default:
      return null;
  }
}
