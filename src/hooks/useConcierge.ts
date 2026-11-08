"use client";

import { useMemo } from "react";
import { FLOWS } from "@/data/concierge-flows";
import { useConciergeStore } from "@/store/concierge-store";
import { useHydrated } from "./useHydrated";

/** Convenience selectors for the concierge experience. */
export function useConcierge() {
  const hydrated = useHydrated();
  const state = useConciergeStore();
  const flow = useMemo(() => (state.intent ? FLOWS[state.intent] : []), [state.intent]);
  const currentQuestion =
    state.phase === "questions" ? flow[state.questionIndex] ?? null : null;

  const answeredSummary = useMemo(
    () =>
      flow
        .map((q) => {
          const id = state.answers[q.id];
          if (!id) return null;
          const option = q.options.find((o) => o.id === id);
          return {
            questionId: q.id,
            label: q.summaryLabel,
            value: option ? option.label : "Skipped",
          };
        })
        .filter((x): x is { questionId: string; label: string; value: string } => !!x),
    [flow, state.answers],
  );

  const progress =
    state.phase === "results"
      ? 1
      : state.phase === "questions" && flow.length
        ? (state.questionIndex + 0.5) / (flow.length + 1)
        : state.phase === "intent"
          ? 0.05
          : 0;

  return { ...state, hydrated, flow, currentQuestion, answeredSummary, progress };
}

export function useOpenConcierge() {
  return useConciergeStore((s) => s.open);
}
