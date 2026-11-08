import { FLOWS } from "@/data/concierge-flows";
import { getProduct, products as allProducts } from "@/data/products";
import type {
  ConciergeIntent,
  ConciergePreferences,
  RecommendationResult,
  Refinement,
} from "@/types/concierge";
import type { Gemstone, Metal, Product } from "@/types/product";

/** Rebuild preferences from the answers given so far plus later refinements. */
export function buildPreferences(
  intent: ConciergeIntent | null,
  answers: Record<string, string>,
  refinements: Refinement[],
  baseProductId?: string | null,
): ConciergePreferences {
  let prefs: ConciergePreferences = {};

  if (baseProductId) {
    const base = getProduct(baseProductId);
    if (base) {
      prefs = {
        categories: [base.category],
        metal: base.metal,
        gemstone: base.gemstone === "None" ? undefined : base.gemstone,
        styles: base.style,
      };
    }
  }

  if (intent === "engagement") prefs.categories = ["Engagement Rings"];

  if (intent) {
    for (const question of FLOWS[intent]) {
      const optionId = answers[question.id];
      if (!optionId || optionId === "__skip") continue;
      const option = question.options.find((o) => o.id === optionId);
      if (option) prefs = { ...prefs, ...option.apply };
    }
    if (intent === "engagement") prefs.categories = ["Engagement Rings"];
  }

  for (const r of refinements) prefs = applyRefinement(prefs, r);
  return prefs;
}

export function applyRefinement(
  prefs: ConciergePreferences,
  r: Refinement,
): ConciergePreferences {
  switch (r.kind) {
    case "metal":
      return { ...prefs, metal: r.value as Metal, strict: addStrict(prefs, "metal") };
    case "gemstone":
      return {
        ...prefs,
        strict: addStrict(prefs, "gemstone"),
        gemstone: r.value as Gemstone,
        excludeGemstones: (prefs.excludeGemstones ?? []).filter(
          (g) => g !== r.value,
        ),
      };
    case "category":
      return {
        ...prefs,
        categories: r.value ? [r.value as Product["category"]] : [],
      };
    case "affordable": {
      const currentMax = prefs.budget?.max ?? 3000;
      const max = Math.max(250, Math.round((currentMax * 0.55) / 50) * 50);
      return {
        ...prefs,
        budget: { min: 0, max, label: `under ${"$" + max.toLocaleString("en-US")}` },
      };
    }
    case "budget": {
      const max = Number(r.value);
      if (!max) return prefs;
      return {
        ...prefs,
        budget: { min: 0, max, label: `under $${max.toLocaleString("en-US")}` },
      };
    }
    case "minimal":
      return { ...prefs, styles: ["Minimal", "Delicate"], presence: "delicate" };
    case "statement":
      return { ...prefs, styles: ["Statement", "Bold"], presence: "bold" };
    case "diamonds":
      return {
        ...prefs,
        gemstone: "Diamond",
        presence: "sparkle",
        strict: addStrict(prefs, "gemstone"),
      };
    case "different-gemstone": {
      const exclude = new Set(prefs.excludeGemstones ?? []);
      if (r.value) exclude.add(r.value as Gemstone);
      if (prefs.gemstone) exclude.add(prefs.gemstone);
      return {
        ...prefs,
        gemstone: undefined,
        excludeGemstones: [...exclude],
        strict: (prefs.strict ?? []).filter((k) => k !== "gemstone"),
      };
    }
    case "surprise":
      return {
        ...prefs,
        presence: "surprise",
        surpriseSeed: Number(r.value ?? 1),
      };
    default:
      return prefs;
  }
}

function addStrict(prefs: ConciergePreferences, key: "metal" | "gemstone") {
  return [...new Set([...(prefs.strict ?? []), key])];
}

/** Deterministic pseudo-random number in [0,1) for "surprise me". */
function seeded(seed: number, id: string): number {
  let h = seed * 2654435761;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 2246822519);
  return ((h >>> 0) % 1000) / 1000;
}

const METAL_SHORT: Record<Metal, string> = {
  "18K Yellow Gold": "yellow gold",
  "18K White Gold": "white gold",
  "18K Rose Gold": "rose gold",
  Platinum: "platinum",
};

export function scoreProduct(
  product: Product,
  prefs: ConciergePreferences,
): RecommendationResult {
  let score = 0;
  let max = 0;
  const reasons: string[] = [];

  // Category ---------------------------------------------------------
  const cats = prefs.categories ?? [];
  if (cats.length) {
    max += 30;
    if (cats.includes(product.category)) score += 30;
    else score -= 45;
  }

  // Metal -------------------------------------------------------------
  if (prefs.metal) {
    max += 18;
    if (product.metal === prefs.metal) {
      score += 18;
      reasons.push(`Crafted in ${METAL_SHORT[product.metal]}, as you prefer`);
    } else if (
      (prefs.metal === "Platinum" && product.metal === "18K White Gold") ||
      (prefs.metal === "18K White Gold" && product.metal === "Platinum")
    ) {
      score += 9;
    } else score -= prefs.strict?.includes("metal") ? 40 : 6;
  }

  // Gemstone ----------------------------------------------------------
  if (prefs.gemstone) {
    max += 18;
    if (product.gemstone === prefs.gemstone) {
      score += 18;
      reasons.push(
        prefs.gemstone === "Pearl"
          ? "Luminous pearls, just as you love"
          : `Features ${prefs.gemstone.toLowerCase()}s, a stone you love`,
      );
    } else score -= prefs.strict?.includes("gemstone") ? 40 : 8;
  }
  if (prefs.excludeGemstones?.includes(product.gemstone)) score -= 30;

  // Style -------------------------------------------------------------
  if (prefs.styles?.length) {
    max += 20;
    const overlap = product.style.filter((s) => prefs.styles!.includes(s));
    score += Math.min(20, overlap.length * 11);
    if (overlap.length)
      reasons.push(
        `${overlap
          .slice(0, 2)
          .map((s) => s.toLowerCase())
          .join(" & ")
          .replace(/^./, (c) => c.toUpperCase())} — your signature style`,
      );
  }

  // Occasion ----------------------------------------------------------
  if (prefs.occasion) {
    max += 12;
    if (product.occasion.includes(prefs.occasion)) {
      score += 12;
      reasons.push(`Made for ${prefs.occasion.toLowerCase()} moments`);
    } else if (product.occasion.includes("Gift")) score += 5;
  }

  // Budget ------------------------------------------------------------
  if (prefs.budget) {
    max += 22;
    const { min, max: bMax } = prefs.budget;
    if (product.price >= min && product.price <= bMax) {
      score += 22;
      reasons.push(`Within your budget (${prefs.budget.label})`);
    } else if (product.price < min) score += 10;
    else if (product.price <= bMax * 1.2) score += 2;
    else score -= 30;
  }

  // Presence ----------------------------------------------------------
  if (prefs.presence) {
    max += 10;
    if (
      prefs.presence === "delicate" &&
      product.style.some((s) => s === "Delicate" || s === "Minimal")
    )
      score += 10;
    else if (prefs.presence === "sparkle" && product.gemstone === "Diamond") {
      score += 10;
      reasons.push("Just the right amount of sparkle");
    } else if (
      prefs.presence === "bold" &&
      product.style.some((s) => s === "Bold" || s === "Statement")
    )
      score += 10;
    else if (prefs.presence === "surprise")
      score += Math.round(seeded(prefs.surpriseSeed ?? 1, product.id) * 14);
  }

  // Gentle tie-breakers ---------------------------------------------------
  if (product.isBestSeller) score += 3;
  if (product.isNewArrival) score += 2;
  max += 4;

  const ratio = max > 0 ? Math.max(0, score) / max : 0.5;
  const matchPercent = Math.round(Math.min(98, Math.max(55, 52 + ratio * 46)));

  if (!reasons.length) {
    if (product.isBestSeller) reasons.push("A client favourite at our maison");
    else if (product.isNewArrival) reasons.push("Newly arrived from our atelier");
    else reasons.push("A beautiful counterpoint to your selections");
  }

  return { productId: product.id, score, matchPercent, reasons: reasons.slice(0, 2) };
}

export function recommend(
  prefs: ConciergePreferences,
  options: { exclude?: string[]; pool?: Product[] } = {},
): RecommendationResult[] {
  const exclude = new Set(options.exclude ?? []);
  return (options.pool ?? allProducts)
    .filter((p) => !exclude.has(p.id))
    .map((p) => scoreProduct(p, prefs))
    .sort((a, b) => b.score - a.score || b.matchPercent - a.matchPercent);
}

/** Human summary of what the concierge understood, e.g. "delicate gold jewelry". */
export function describePreferences(prefs: ConciergePreferences): string {
  const parts: string[] = [];
  if (prefs.styles?.length) parts.push(prefs.styles[0].toLowerCase());
  if (prefs.metal) parts.push(METAL_SHORT[prefs.metal]);
  if (prefs.gemstone && prefs.gemstone !== "None")
    parts.push(prefs.gemstone.toLowerCase());
  const cat = prefs.categories?.[0];
  parts.push(cat ? cat.toLowerCase() : "jewelry");
  return parts.join(" ");
}

export const metalShort = (m: Metal) => METAL_SHORT[m];
