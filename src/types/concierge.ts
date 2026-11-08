import type { Category, Gemstone, Metal, Occasion, Style } from "./product";

export type ConciergeIntent =
  | "self"
  | "gift"
  | "engagement"
  | "occasion"
  | "explore";

export type Presence = "delicate" | "sparkle" | "bold" | "surprise";

export interface BudgetRange {
  min: number;
  max: number;
  label: string;
}

/** Everything the recommendation engine knows about the client. */
export interface ConciergePreferences {
  categories?: Category[];
  styles?: Style[];
  metal?: Metal;
  gemstone?: Gemstone;
  excludeGemstones?: Gemstone[];
  budget?: BudgetRange;
  presence?: Presence;
  occasion?: Occasion;
  recipient?: string;
  ringSize?: string;
  proposal?: string;
  surpriseSeed?: number;
  /** Attributes the client explicitly asked for mid-conversation — weighted heavily. */
  strict?: ("metal" | "gemstone")[];
}

export interface ConciergeOptionDef {
  id: string;
  label: string;
  description?: string;
  /** lucide icon name key from the concierge icon map */
  icon?: string;
  image?: string;
  apply: Partial<ConciergePreferences>;
}

export interface ConciergeQuestion {
  id: string;
  prompt: string;
  helper?: string;
  /** Short label used in the selection summary, e.g. "Metal". */
  summaryLabel: string;
  options: ConciergeOptionDef[];
}

export interface ConciergeIntentDef {
  id: ConciergeIntent;
  label: string;
  description: string;
  icon: string;
  image: string;
  acknowledgement: string;
}

export type RefinementKind =
  | "metal"
  | "affordable"
  | "minimal"
  | "diamonds"
  | "different-gemstone"
  | "statement"
  | "surprise"
  | "category"
  | "gemstone"
  | "budget";

export interface Refinement {
  kind: RefinementKind;
  value?: string;
}

export type ConciergeMessage =
  | { id: string; role: "concierge"; kind: "text"; text: string }
  | { id: string; role: "user"; kind: "text"; text: string }
  | {
      id: string;
      role: "concierge";
      kind: "recommendations";
      text: string;
      productIds: string[];
    }
  | {
      id: string;
      role: "concierge";
      kind: "love-prompt";
      text: string;
      productId: string;
      resolved: boolean;
    }
  | {
      id: string;
      role: "concierge";
      kind: "refine-prompt";
      text: string;
      resolved: boolean;
    }
  | {
      id: string;
      role: "concierge";
      kind: "added-to-bag";
      text: string;
      productId: string;
    }
  | {
      id: string;
      role: "concierge";
      kind: "product-context";
      text: string;
      productId: string;
      resolved: boolean;
    };

export type ConciergePhase = "welcome" | "intent" | "questions" | "results";

export type ConciergeMood = "idle" | "thinking" | "delighted";

export interface RecommendationResult {
  productId: string;
  score: number;
  matchPercent: number;
  reasons: string[];
}
