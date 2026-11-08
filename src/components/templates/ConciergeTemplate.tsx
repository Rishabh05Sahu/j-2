import { ConciergeExperience } from "@/components/concierge/ConciergeExperience";

export function ConciergeTemplate() {
  return (
    <div className="h-[calc(100dvh-var(--header-h))] min-h-[560px] border-t border-line">
      <h1 className="sr-only">Your personal jewelry concierge</h1>
      <ConciergeExperience mode="page" />
    </div>
  );
}
