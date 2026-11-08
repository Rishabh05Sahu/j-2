"use client";

import { ArrowLeft, ArrowUp, PenLine, RotateCcw, SkipForward, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ConciergeAvatar, ConciergeCharacter } from "./ConciergeCharacter";
import { ConciergeConversation } from "./ConciergeConversation";
import { RefineChips } from "./ConciergePrompts";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { IconButton } from "@/components/atoms/IconButton";
import { useConcierge } from "@/hooks/useConcierge";
import { cn } from "@/lib/cn";

export function ConciergeExperience({
  mode,
  onClose,
}: {
  mode: "panel" | "page";
  onClose?: () => void;
}) {
  const c = useConcierge();

  // On the dedicated page, begin the consultation once storage is read.
  useEffect(() => {
    if (mode === "page" && c.hydrated && !c.started) c.start();
  }, [mode, c.hydrated, c.started, c]);

  const status = c.isTyping
    ? "Considering…"
    : c.phase === "results"
      ? "Curating for you"
      : "Virtual concierge";

  return (
    <div className="flex h-full min-h-0 flex-col bg-ivory lg:grid lg:grid-cols-[minmax(320px,30%)_1fr]">
      {/* ------------------------------------------------ Desktop aside */}
      <aside className="relative hidden min-h-0 flex-col overflow-y-auto border-r border-line bg-cream px-10 pb-10 pt-12 lg:flex xl:px-14">
        <p className="eyebrow text-stone">Private consultation</p>
        <div className="mx-auto mt-8 w-full max-w-[250px]">
          <ConciergeCharacter mood={c.mood} />
        </div>
        <div className="mt-6 text-center">
          <p className="font-serif text-3xl font-light text-charcoal">Amara</p>
          <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.2em] text-stone">
            {status}
          </p>
          <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-stone">
            Every beautiful piece begins with a story. Share yours, and I&apos;ll curate pieces
            that feel unmistakably you.
          </p>
        </div>

        {c.answeredSummary.length > 0 && (
          <div className="mt-10 border-t border-line pt-6">
            <p className="eyebrow mb-4 text-stone">Your preferences</p>
            <ul className="space-y-1">
              {c.answeredSummary.map((a) => (
                <li key={a.questionId}>
                  <button
                    type="button"
                    disabled={c.isTyping}
                    onClick={() => c.editAnswer(a.questionId)}
                    className="group flex w-full items-baseline justify-between gap-4 py-1.5 text-left disabled:opacity-50"
                  >
                    <span className="text-xs text-stone">{a.label}</span>
                    <span className="flex items-center gap-2 text-right text-sm text-charcoal">
                      {a.value}
                      <PenLine
                        aria-hidden
                        className="h-3 w-3 text-stone opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                        strokeWidth={1.4}
                      />
                      <span className="sr-only">— change</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-auto pt-10 text-[0.6875rem] leading-relaxed text-stone/80">
          Amara is a virtual assistant. Recommendations are generated from our catalogue
          and your answers in this session.
        </p>
      </aside>

      {/* ------------------------------------------------ Conversation */}
      <section className="flex min-h-0 flex-1 flex-col" aria-label="Conversation with your concierge">
        {/* mobile header */}
        <div className="shrink-0 border-b border-line bg-cream/70 lg:hidden">
          <div className="flex items-center gap-3 px-5 py-3">
            <ConciergeAvatar className="h-12 w-12" mood={c.mood} />
            <div className="min-w-0 flex-1">
              <p className="font-serif text-xl leading-tight text-charcoal">Amara</p>
              <p className="text-[0.625rem] uppercase tracking-[0.18em] text-stone">{status}</p>
            </div>
            {c.started && (
              <IconButton label="Start over" onClick={c.reset} disabled={c.isTyping}>
                <RotateCcw className="h-4 w-4" strokeWidth={1.4} />
              </IconButton>
            )}
            {onClose && (
              <IconButton label="Close concierge" onClick={onClose} className="-mr-2.5">
                <X className="h-5 w-5" strokeWidth={1.3} />
              </IconButton>
            )}
          </div>
          {c.answeredSummary.length > 0 && (
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-3">
              {c.answeredSummary.map((a) => (
                <button
                  key={a.questionId}
                  type="button"
                  disabled={c.isTyping}
                  onClick={() => c.editAnswer(a.questionId)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-ivory px-3 py-1.5 text-[0.6875rem] text-charcoal disabled:opacity-50"
                  aria-label={`Change ${a.label}: ${a.value}`}
                >
                  <span className="text-stone">{a.label}</span> {a.value}
                  <PenLine aria-hidden className="h-3 w-3 text-stone" strokeWidth={1.4} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* desktop header */}
        <div className="hidden shrink-0 items-center justify-between border-b border-line px-8 py-4 lg:flex">
          <p className="font-serif text-xl text-charcoal">
            {c.phase === "results" ? "Your curated selection" : "Tell me your story"}
          </p>
          <div className="flex items-center gap-2">
            {c.started && (
              <button
                type="button"
                onClick={c.reset}
                disabled={c.isTyping}
                className="inline-flex h-10 items-center gap-2 px-3 text-[0.625rem] uppercase tracking-[0.16em] text-stone transition-colors hover:text-charcoal disabled:opacity-40"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.4} /> Start over
              </button>
            )}
            {onClose && (
              <IconButton label="Close concierge" onClick={onClose}>
                <X className="h-5 w-5" strokeWidth={1.3} />
              </IconButton>
            )}
          </div>
        </div>

        <ConciergeConversation className="min-h-0 flex-1 overflow-y-auto overscroll-contain" />

        <BottomBar />
      </section>
    </div>
  );
}

function BottomBar() {
  const c = useConcierge();
  const [text, setText] = useState("");
  const inQuestions = c.phase === "questions";
  const inResults = c.phase === "results";
  const step = c.questionIndex + 1;
  const total = c.flow.length;

  return (
    <div className="shrink-0 border-t border-line bg-ivory/95 pb-[max(env(safe-area-inset-bottom),0.75rem)] backdrop-blur">
      <ProgressBar value={c.progress * 100} label="Consultation progress" />
      <div className="mx-auto w-full max-w-3xl px-5 pt-3 sm:px-8">
        {inQuestions && (
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={c.back}
              disabled={c.isTyping}
              className="inline-flex h-11 items-center gap-2 pr-3 text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.4} /> Back
            </button>
            <p className="text-[0.6875rem] tabular-nums tracking-[0.12em] text-stone">
              {step} / {total}
            </p>
            <div className="flex items-center gap-1">
              {c.questionIndex >= 1 && !c.returnToResults && (
                <button
                  type="button"
                  onClick={c.finishEarly}
                  disabled={c.isTyping}
                  className="hidden h-11 items-center px-3 text-[0.6875rem] uppercase tracking-[0.16em] text-stone transition-colors hover:text-charcoal disabled:opacity-40 sm:inline-flex"
                >
                  See suggestions
                </button>
              )}
              <button
                type="button"
                onClick={c.skip}
                disabled={c.isTyping}
                className="inline-flex h-11 items-center gap-2 pl-3 text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal disabled:opacity-40"
              >
                Skip <SkipForward className="h-3.5 w-3.5" strokeWidth={1.4} />
              </button>
            </div>
          </div>
        )}

        {c.phase === "intent" && (
          <p className="py-2.5 text-center text-xs text-stone">
            Choose whatever feels closest — you can change your mind at any time.
          </p>
        )}

        {(c.phase === "welcome" || !c.started) && (
          <p className="py-2.5 text-center text-xs text-stone">Preparing your private consultation…</p>
        )}

        {inResults && (
          <div className="space-y-3">
            <RefineChips compact disabled={c.isTyping} />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!text.trim() || c.isTyping) return;
                c.sendText(text);
                setText("");
              }}
              className="flex items-center gap-2 border-b border-charcoal/25 focus-within:border-charcoal"
            >
              <label htmlFor="concierge-input" className="sr-only">
                Tell Amara what you would prefer
              </label>
              <input
                id="concierge-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell me more — e.g. “rose gold, under $1,000”"
                autoComplete="off"
                className="h-12 min-w-0 flex-1 bg-transparent font-serif text-lg text-charcoal placeholder:font-sans placeholder:text-sm placeholder:text-stone/60 focus:outline-none focus-visible:outline-none"
              />
              <button
                type="submit"
                disabled={!text.trim() || c.isTyping}
                aria-label="Send"
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
                  text.trim() ? "bg-espresso text-ivory" : "bg-cream text-stone",
                )}
              >
                <ArrowUp className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
