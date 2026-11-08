"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { sessionJSONStorage } from "@/lib/storage";
import { FLOWS, INTENTS } from "@/data/concierge-flows";
import { getProduct } from "@/data/products";
import {
  buildPreferences,
  describePreferences,
  metalShort,
  recommend,
} from "@/lib/recommendation-engine";
import { parseConciergeText } from "@/lib/concierge-parser";
import { formatCurrency } from "@/lib/format-currency";
import { useCartStore } from "./cart-store";
import { useWishlistStore } from "./wishlist-store";
import { useUIStore } from "./ui-store";
import type {
  ConciergeIntent,
  ConciergeMessage,
  ConciergeMood,
  ConciergePhase,
  Refinement,
} from "@/types/concierge";
import type { Metal, Product } from "@/types/product";

const BATCH = 4;
const SKIP = "__skip";

type NewMessage = ConciergeMessage extends infer M
  ? M extends ConciergeMessage
    ? Omit<M, "id">
    : never
  : never;

interface ConciergeState {
  isOpen: boolean;
  started: boolean;
  phase: ConciergePhase;
  intent: ConciergeIntent | null;
  answers: Record<string, string>;
  questionIndex: number;
  questionMarks: Record<string, number>;
  intentMark: number;
  returnToResults: boolean;
  refinements: Refinement[];
  contextProductId: string | null;
  messages: ConciergeMessage[];
  isTyping: boolean;
  mood: ConciergeMood;
  shownIds: string[];
  rejectedIds: string[];
  matchScores: Record<string, { matchPercent: number; reasons: string[] }>;

  pendingIntent: ConciergeIntent | null;
  open: (opts?: { productId?: string; intent?: ConciergeIntent }) => void;
  close: () => void;
  start: () => void;
  reset: () => void;
  selectIntent: (intent: ConciergeIntent) => void;
  answer: (optionId: string) => void;
  skip: () => void;
  back: () => void;
  editAnswer: (questionId: string) => void;
  finishEarly: () => void;
  loveProduct: (productId: string) => void;
  confirmAdd: (productId: string) => void;
  saveForLater: (productId: string) => void;
  rejectProduct: (productId: string) => void;
  showMore: () => void;
  refine: (refinement: Refinement, label: string) => void;
  sendText: (text: string) => void;
  productAction: (action: "details" | "similar" | "add" | "other") => void;
}

let msgCounter = 0;
const newId = () => `m${Date.now().toString(36)}${(msgCounter++).toString(36)}`;

/** Cancels pending concierge replies when the conversation is reset. */
let conversationToken = 0;
const timers = new Set<ReturnType<typeof setTimeout>>();

function defaultSize(product: Product, ringSize?: string) {
  if (ringSize && product.sizes.includes(ringSize)) return ringSize;
  return product.sizes[Math.floor((product.sizes.length - 1) / 2)] ?? "One Size";
}

const typingDelay = (text: string) =>
  Math.min(1300, 550 + Math.round(text.length * 6));

export const useConciergeStore = create<ConciergeState>()(
  persist(
    (set, get) => {
      const push = (...msgs: NewMessage[]) =>
        set((s) => ({
          messages: [
            ...s.messages,
            ...msgs.map((m) => ({ ...m, id: newId() }) as ConciergeMessage),
          ],
        }));

      /** Show the typing indicator, then run `fn` after a natural pause. */
      const reply = (fn: () => void, hint = "") => {
        const token = conversationToken;
        set({ isTyping: true, mood: "thinking" });
        const t = setTimeout(() => {
          timers.delete(t);
          if (token !== conversationToken) return;
          set({ isTyping: false, mood: "idle" });
          fn();
        }, typingDelay(hint));
        timers.add(t);
      };

      const delight = () => {
        set({ mood: "delighted" });
        const token = conversationToken;
        const t = setTimeout(() => {
          timers.delete(t);
          if (token === conversationToken && get().mood === "delighted")
            set({ mood: "idle" });
        }, 2200);
        timers.add(t);
      };

      const resolvePrompts = () =>
        set((s) => ({
          messages: s.messages.map((m) =>
            "resolved" in m && !m.resolved ? { ...m, resolved: true } : m,
          ),
        }));

      const prefs = () => {
        const s = get();
        return buildPreferences(
          s.intent,
          s.answers,
          s.refinements,
          s.intent ? null : s.contextProductId,
        );
      };

      const askQuestion = (index: number) => {
        const s = get();
        if (!s.intent) return;
        const q = FLOWS[s.intent][index];
        set((st) => ({
          phase: "questions",
          questionIndex: index,
          questionMarks: { ...st.questionMarks, [q.id]: st.messages.length },
        }));
        push({ role: "concierge", kind: "text", text: q.prompt });
      };

      const nextUnanswered = (from: number): number => {
        const s = get();
        if (!s.intent) return -1;
        const flow = FLOWS[s.intent];
        for (let i = from; i < flow.length; i++) {
          if (!(flow[i].id in s.answers)) return i;
        }
        return -1;
      };

      /** Pick the next batch of products and present them. */
      const presentRecommendations = (text: string, fresh: boolean) => {
        const s = get();
        const p = prefs();
        const exclude = [
          ...s.rejectedIds,
          ...(fresh ? [] : s.shownIds),
          ...(s.contextProductId && !s.intent ? [s.contextProductId] : []),
        ];
        const ranked = recommend(p, { exclude });
        const batch = ranked.slice(0, BATCH);
        if (!batch.length) {
          push({
            role: "concierge",
            kind: "refine-prompt",
            text: "I've shared every piece that suits your wishes. Shall we explore in a slightly different direction?",
            resolved: false,
          });
          set({ phase: "results" });
          return;
        }
        const scores = { ...s.matchScores };
        for (const r of batch)
          scores[r.productId] = { matchPercent: r.matchPercent, reasons: r.reasons };
        set({
          phase: "results",
          matchScores: scores,
          shownIds: fresh
            ? batch.map((b) => b.productId)
            : [...s.shownIds, ...batch.map((b) => b.productId)],
        });
        push({
          role: "concierge",
          kind: "recommendations",
          text,
          productIds: batch.map((b) => b.productId),
        });
      };

      const resultsIntro = () => {
        const s = get();
        const p = prefs();
        const described = describePreferences(p);
        if (s.intent === "engagement") {
          return `I've selected a few rings I believe could be the one. Each reflects your love of ${described}${
            p.proposal ? ` — perfect for ${p.proposal}` : ""
          }.`;
        }
        if (s.intent === "gift") {
          return `I've found a few pieces I think ${
            p.recipient ?? "they"
          } will absolutely love. Each one is gift-wrapped in our signature ivory box.`;
        }
        if (!s.intent && s.contextProductId) {
          const base = getProduct(s.contextProductId);
          return `Here are a few pieces that share the spirit of the ${base?.name ?? "piece you admired"}.`;
        }
        return `I've found a few pieces that I think you'll absolutely love. These selections reflect your preference for ${described} and designs made to last.`;
      };

      const addToBag = (productId: string) => {
        const product = getProduct(productId);
        if (!product) return;
        const size = defaultSize(product, prefs().ringSize);
        useCartStore.getState().addItem(productId, size, 1);
        useUIStore.getState().pushToast({
          title: "Added to your bag",
          description: `${product.name}${size !== "One Size" ? ` · Size ${size}` : ""}`,
          image: product.images[0],
          action: { label: "View bag", onClick: "open-cart" },
        });
        return { product, size };
      };

      const refinementReply = (r: Refinement): string => {
        switch (r.kind) {
          case "metal":
            return `Of course. Let me refine your selection with beautiful ${metalShort(
              r.value as Metal,
            )} pieces.`;
          case "gemstone":
            return `Lovely — let me bring forward pieces with ${(
              r.value ?? "gemstone"
            ).toLowerCase()}${r.value === "Ruby" ? "" : "s"}.`;
          case "affordable":
            return "Certainly. Here are some exquisite pieces at a gentler price.";
          case "minimal":
            return "Understood — quieter, more minimal designs it is.";
          case "diamonds":
            return "With pleasure. Let's bring in a little more brilliance.";
          case "different-gemstone":
            return "Of course — let's explore a different stone entirely.";
          case "statement":
            return "Let's be bold. These pieces are made to be noticed.";
          case "surprise":
            return "How exciting. Allow me to surprise you.";
          case "category":
            return `Of course — let me show you some ${(r.value ?? "pieces").toLowerCase()}.`;
          case "budget":
            return `Of course — let me focus on pieces under ${formatCurrency(Number(r.value))}.`;
          default:
            return "Let me refine your selection.";
        }
      };

      const startProductContext = (productId: string) => {
        const product = getProduct(productId);
        if (!product) return;
        conversationToken++;
        set({
          ...initialConversation(),
          started: true,
          contextProductId: productId,
          phase: "results",
        });
        reply(() => {
          push({
            role: "concierge",
            kind: "product-context",
            productId,
            text: `I see you're admiring the ${product.name}. ${product.shortDescription} How may I help you with this piece?`,
            resolved: false,
          });
        }, product.name);
      };

      return {
        ...initialConversation(),
        isOpen: false,
        pendingIntent: null,

        open: (opts) => {
          set({ isOpen: true });
          const s = get();
          if (opts?.productId) {
            if (s.contextProductId !== opts.productId || !s.started)
              startProductContext(opts.productId);
            return;
          }
          if (opts?.intent) {
            if (s.phase === "intent" && !s.isTyping) {
              get().selectIntent(opts.intent);
            } else {
              set({ pendingIntent: opts.intent });
              get().reset();
            }
            return;
          }
          if (!s.started) get().start();
        },

        close: () => set({ isOpen: false }),

        start: () => {
          conversationToken++;
          set({ ...initialConversation(), started: true });
          push({
            role: "concierge",
            kind: "text",
            text: "Welcome. It's a pleasure to help you discover something beautiful.",
          });
          reply(() => {
            set((s) => ({ phase: "intent", intentMark: s.messages.length }));
            push({ role: "concierge", kind: "text", text: "What brings you here today?" });
            const pending = get().pendingIntent;
            if (pending) {
              set({ pendingIntent: null });
              get().selectIntent(pending);
            }
          });
        },

        reset: () => {
          timers.forEach(clearTimeout);
          timers.clear();
          get().start();
        },

        selectIntent: (intent) => {
          const def = INTENTS.find((i) => i.id === intent);
          if (!def) return;
          resolvePrompts();
          push({ role: "user", kind: "text", text: def.label });
          reply(() => {
            set({
              intent,
              answers: {},
              refinements: [],
              questionMarks: {},
              shownIds: [],
              returnToResults: false,
            });
            push({ role: "concierge", kind: "text", text: def.acknowledgement });
            reply(() => askQuestion(0), FLOWS[intent][0].prompt);
          }, def.acknowledgement);
        },

        answer: (optionId) => {
          const s = get();
          if (!s.intent || s.phase !== "questions") return;
          const q = FLOWS[s.intent][s.questionIndex];
          const option = q.options.find((o) => o.id === optionId);
          if (!option) return;
          push({ role: "user", kind: "text", text: option.label });
          reply(() => {
            set((st) => ({
              answers: { ...st.answers, [q.id]: optionId },
              // a fresh answer supersedes earlier refinements of the same kind
              refinements: st.refinements.filter(
                (r) =>
                  !(
                    (q.id === "metal" && r.kind === "metal") ||
                    (q.id === "budget" && r.kind === "affordable") ||
                    ((q.id === "gemstone" || q.id === "center-stone") &&
                      (r.kind === "gemstone" || r.kind === "diamonds")) ||
                    (q.id === "category" && r.kind === "category")
                  ),
              ),
            }));
            const after = get();
            const next = after.returnToResults ? -1 : nextUnanswered(after.questionIndex + 1);
            if (next === -1) {
              set({ returnToResults: false });
              presentRecommendations(
                after.returnToResults || after.shownIds.length
                  ? "Of course — I've updated my selection to reflect that."
                  : resultsIntro(),
                true,
              );
              delight();
            } else {
              askQuestion(next);
            }
          }, option.label);
        },

        skip: () => {
          const s = get();
          if (!s.intent || s.phase !== "questions") return;
          const q = FLOWS[s.intent][s.questionIndex];
          push({ role: "user", kind: "text", text: "I'll skip this one" });
          reply(() => {
            set((st) => ({ answers: { ...st.answers, [q.id]: SKIP } }));
            const after = get();
            const next = after.returnToResults ? -1 : nextUnanswered(after.questionIndex + 1);
            if (next === -1) {
              set({ returnToResults: false });
              presentRecommendations(resultsIntro(), true);
            } else askQuestion(next);
          });
        },

        back: () => {
          const s = get();
          if (s.isTyping) return;
          if (s.phase === "questions" && s.intent) {
            if (s.questionIndex === 0 || s.returnToResults) {
              if (s.returnToResults) {
                // abandon the change and return to the latest results
                const mark = s.questionMarks[FLOWS[s.intent][s.questionIndex].id];
                set({
                  phase: "results",
                  returnToResults: false,
                  messages: s.messages.slice(0, Math.max(0, mark - 1)),
                });
                return;
              }
              set({
                phase: "intent",
                intent: null,
                answers: {},
                messages: s.messages.slice(0, s.intentMark + 1),
              });
              return;
            }
            const prevIndex = s.questionIndex - 1;
            const prevQ = FLOWS[s.intent][prevIndex];
            const mark = s.questionMarks[prevQ.id] ?? s.messages.length - 1;
            const answers = { ...s.answers };
            delete answers[prevQ.id];
            delete answers[FLOWS[s.intent][s.questionIndex].id];
            set({
              questionIndex: prevIndex,
              answers,
              messages: s.messages.slice(0, mark + 1),
            });
            return;
          }
          if (s.phase === "results" && s.intent) {
            // step back into the final question
            const lastIndex = FLOWS[s.intent].length - 1;
            get().editAnswer(FLOWS[s.intent][lastIndex].id);
          }
        },

        editAnswer: (questionId) => {
          const s = get();
          if (!s.intent || s.isTyping) return;
          const index = FLOWS[s.intent].findIndex((q) => q.id === questionId);
          if (index < 0) return;
          const q = FLOWS[s.intent][index];
          resolvePrompts();
          push({
            role: "user",
            kind: "text",
            text: `I'd like to change my ${q.summaryLabel.toLowerCase()}`,
          });
          reply(() => {
            set({ returnToResults: s.phase === "results" });
            askQuestion(index);
          }, q.prompt);
        },

        finishEarly: () => {
          const s = get();
          if (!s.intent || s.isTyping) return;
          push({ role: "user", kind: "text", text: "Show me what you'd suggest" });
          reply(() => {
            set({ returnToResults: false });
            presentRecommendations(resultsIntro(), true);
          });
        },

        loveProduct: (productId) => {
          const product = getProduct(productId);
          if (!product) return;
          resolvePrompts();
          delight();
          push({ role: "user", kind: "text", text: `I love the ${product.name}` });
          reply(() => {
            push({
              role: "concierge",
              kind: "love-prompt",
              productId,
              text: "Wonderful choice. Would you like me to add this to your bag?",
              resolved: false,
            });
            set({ mood: "delighted" });
          });
        },

        confirmAdd: (productId) => {
          resolvePrompts();
          push({ role: "user", kind: "text", text: "Yes, add it to my bag" });
          const added = addToBag(productId);
          delight();
          reply(() => {
            if (!added) return;
            push({
              role: "concierge",
              kind: "added-to-bag",
              productId,
              text: `It's in your bag${
                added.size !== "One Size" ? ` in size ${added.size} — you can adjust this anytime` : ""
              }. Shall I keep looking, or would you like to review your selection?`,
            });
          });
        },

        saveForLater: (productId) => {
          const product = getProduct(productId);
          resolvePrompts();
          push({ role: "user", kind: "text", text: "Save it for later" });
          useWishlistStore.getState().add(productId);
          useUIStore.getState().pushToast({
            title: "Saved to your wishlist",
            description: product?.name,
            image: product?.images[0],
            action: { label: "View wishlist", href: "/wishlist" },
          });
          reply(() => {
            push({
              role: "concierge",
              kind: "text",
              text: `I've saved the ${product?.name ?? "piece"} to your wishlist — it will be waiting whenever you're ready. Is there anything else you'd like me to find?`,
            });
          });
        },

        rejectProduct: (productId) => {
          const product = getProduct(productId);
          resolvePrompts();
          set((s) => ({ rejectedIds: [...new Set([...s.rejectedIds, productId])] }));
          push({
            role: "user",
            kind: "text",
            text: `The ${product?.name ?? "piece"} isn't quite for me`,
          });
          reply(() => {
            push({
              role: "concierge",
              kind: "refine-prompt",
              text: "Of course — not every piece speaks to us. What would you prefer instead?",
              resolved: false,
            });
          });
        },

        showMore: () => {
          resolvePrompts();
          push({ role: "user", kind: "text", text: "Show me more" });
          reply(() => {
            presentRecommendations("Here are a few more pieces I think you'll adore.", false);
          });
        },

        refine: (refinement, label) => {
          resolvePrompts();
          push({ role: "user", kind: "text", text: label });
          const value =
            refinement.kind === "different-gemstone" && !refinement.value
              ? prefs().gemstone
              : refinement.value;
          const r: Refinement = { ...refinement, value };
          reply(() => {
            set((s) => ({ refinements: [...s.refinements, r] }));
            push({ role: "concierge", kind: "text", text: refinementReply(r) });
            reply(() => presentRecommendations("Here's your refined selection.", true));
          }, label);
        },

        sendText: (text) => {
          const trimmed = text.trim();
          if (!trimmed) return;
          resolvePrompts();
          push({ role: "user", kind: "text", text: trimmed });
          const found = parseConciergeText(trimmed);
          reply(() => {
            if (!found.length) {
              push({
                role: "concierge",
                kind: "refine-prompt",
                text: "I want to be sure I understand you perfectly. Would any of these directions help?",
                resolved: false,
              });
              return;
            }
            set((s) => ({ refinements: [...s.refinements, ...found] }));
            push({ role: "concierge", kind: "text", text: refinementReply(found[0]) });
            reply(() => presentRecommendations("Here's your refined selection.", true));
          }, trimmed);
        },

        productAction: (action) => {
          const s = get();
          const product = s.contextProductId ? getProduct(s.contextProductId) : undefined;
          if (!product) return;
          resolvePrompts();
          if (action === "details") {
            push({ role: "user", kind: "text", text: "Tell me more about this piece" });
            reply(() => {
              const gem =
                product.gemstone === "None"
                  ? "It's pure polished metal — no stones —"
                  : `It features ${product.gemstone.toLowerCase()}${product.gemstone === "Pearl" ? "s" : ""}, and it's`;
              push({
                role: "concierge",
                kind: "text",
                text: `${product.description} ${gem} crafted in ${metalShort(product.metal)}, priced at ${formatCurrency(
                  product.price,
                )}. It's ${product.style
                  .map((x) => x.toLowerCase())
                  .join(" and ")} in spirit — lovely for ${product.occasion
                  .slice(0, 2)
                  .map((o) => o.toLowerCase())
                  .join(" or ")} moments.`,
              });
              reply(() =>
                push({
                  role: "concierge",
                  kind: "product-context",
                  productId: product.id,
                  text: "What else may I help you with?",
                  resolved: false,
                }),
              );
            }, product.description);
          } else if (action === "similar") {
            push({ role: "user", kind: "text", text: "Show me similar pieces" });
            reply(() =>
              presentRecommendations(
                `Here are a few pieces that share the spirit of the ${product.name}.`,
                true,
              ),
            );
          } else if (action === "add") {
            push({ role: "user", kind: "text", text: "Add it to my bag" });
            const added = addToBag(product.id);
            delight();
            reply(() => {
              if (!added) return;
              push({
                role: "concierge",
                kind: "added-to-bag",
                productId: product.id,
                text: `Beautifully done — the ${product.name} is in your bag${
                  added.size !== "One Size" ? ` in size ${added.size}` : ""
                }. Shall I find something to pair with it?`,
              });
            });
          } else {
            push({ role: "user", kind: "text", text: "Help me find something else" });
            reply(() => {
              set((st) => ({
                phase: "intent",
                intent: null,
                intentMark: st.messages.length,
              }));
              push({ role: "concierge", kind: "text", text: "With pleasure. What brings you here today?" });
            });
          }
        },
      };
    },
    {
      name: "solenne-concierge",
      storage: sessionJSONStorage,
      skipHydration: true,
      version: 1,
      partialize: (s) => ({
        started: s.started,
        phase: s.phase,
        intent: s.intent,
        answers: s.answers,
        questionIndex: s.questionIndex,
        questionMarks: s.questionMarks,
        intentMark: s.intentMark,
        refinements: s.refinements,
        contextProductId: s.contextProductId,
        messages: s.messages,
        shownIds: s.shownIds,
        rejectedIds: s.rejectedIds,
        matchScores: s.matchScores,
      }),
    },
  ),
);

function initialConversation() {
  return {
    started: false,
    phase: "welcome" as ConciergePhase,
    intent: null as ConciergeIntent | null,
    answers: {} as Record<string, string>,
    questionIndex: 0,
    questionMarks: {} as Record<string, number>,
    intentMark: 0,
    returnToResults: false,
    refinements: [] as Refinement[],
    contextProductId: null as string | null,
    messages: [] as ConciergeMessage[],
    isTyping: false,
    mood: "idle" as ConciergeMood,
    shownIds: [] as string[],
    rejectedIds: [] as string[],
    matchScores: {} as Record<string, { matchPercent: number; reasons: string[] }>,
  };
}

export { SKIP as CONCIERGE_SKIP };
