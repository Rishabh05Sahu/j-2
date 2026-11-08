import type { Refinement } from "@/types/concierge";

/**
 * A small keyword parser so clients can type requests like
 * "I actually prefer rose gold" or "something cheaper".
 * Returns the refinements it understood, in a stable order.
 */
export function parseConciergeText(input: string): Refinement[] {
  const text = input.toLowerCase();
  const found: Refinement[] = [];

  const metals: [RegExp, string][] = [
    [/rose\s*gold|pink gold/, "18K Rose Gold"],
    [/white\s*gold|silver/, "18K White Gold"],
    [/yellow\s*gold|\bgold\b/, "18K Yellow Gold"],
    [/platinum/, "Platinum"],
  ];
  for (const [re, value] of metals) {
    if (re.test(text)) {
      found.push({ kind: "metal", value });
      break;
    }
  }

  const gems: [RegExp, string][] = [
    [/emerald|\bgreen\b/, "Emerald"],
    [/sapphire|\bblue\b/, "Sapphire"],
    [/rub(y|ies)|\bred\b/, "Ruby"],
    [/pearl/, "Pearl"],
  ];
  const gem = gems.find(([re]) => re.test(text));
  if (gem) found.push({ kind: "gemstone", value: gem[1] });
  else if (/diamond|sparkl|brilliant/.test(text)) found.push({ kind: "diamonds" });

  const categories: [RegExp, string][] = [
    [/engagement|propos/, "Engagement Rings"],
    [/ring/, "Rings"],
    [/necklace|pendant|chain/, "Necklaces"],
    [/earring|hoop|stud/, "Earrings"],
    [/bracelet|bangle/, "Bracelets"],
  ];
  const cat = categories.find(([re]) => re.test(text));
  if (cat) found.push({ kind: "category", value: cat[1] });

  const ceiling = text.match(/(?:under|below|less than|max(?:imum)?|up to)\s*\$?\s*([\d,]+)\s*(k\b)?/);
  if (ceiling) {
    const amount = Number(ceiling[1].replace(/,/g, "")) * (ceiling[2] ? 1000 : 1);
    if (amount > 0) found.push({ kind: "budget", value: String(amount) });
  } else if (/cheap|afford|less expensive|lower price|budget|smaller price/.test(text))
    found.push({ kind: "affordable" });
  if (/minimal|simple|subtle|delicate|understated|dainty/.test(text))
    found.push({ kind: "minimal" });
  if (/statement|bold|bigger|dramatic|striking/.test(text))
    found.push({ kind: "statement" });
  if (/different (stone|gem)|other (stone|gem)|another (stone|gem)/.test(text))
    found.push({ kind: "different-gemstone" });
  if (/surprise|anything|random/.test(text))
    found.push({ kind: "surprise", value: String(Math.floor(Math.random() * 1000) + 1) });

  return found;
}
