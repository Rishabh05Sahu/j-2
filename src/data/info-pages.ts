export interface InfoPage {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export const INFO_PAGE_CONTENT: InfoPage[] = [
  {
    slug: "customer-care",
    title: "Customer care",
    intro: "Our client advisors are here to help with every question — before, during and long after your purchase.",
    sections: [
      { heading: "Personal guidance", body: "Our virtual concierge, Amara, can guide you to the right piece in moments. For anything else, our client advisors are available Monday to Saturday, 9am–7pm." },
      { heading: "Sizing", body: "Every ring includes one complimentary resizing within the first year. Necklaces can be shortened or lengthened by our atelier on request." },
      { heading: "Lifetime care", body: "Bring or send your Solenne pieces to us at any time for a complimentary professional clean, inspection and re-polish." },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    intro: "We would love to hear from you. (This is a demonstration storefront — the details below are illustrative.)",
    sections: [
      { heading: "Client services", body: "Email: care@solenne.example · Phone: +1 (555) 010-2026 · Monday to Saturday, 9am–7pm." },
      { heading: "The atelier", body: "Visits by appointment. Begin a consultation with Amara and request an appointment — we'll prepare a selection in advance." },
      { heading: "Press & partnerships", body: "press@solenne.example" },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping",
    intro: "Every order is fully insured, beautifully packaged and delivered with signature confirmation.",
    sections: [
      { heading: "Complimentary shipping", body: "Orders above $500 ship complimentary with insured standard delivery. Orders below $500 ship for a flat $25." },
      { heading: "Express delivery", body: "Insured express delivery (1–2 business days) is available at checkout for $35." },
      { heading: "Made-to-order pieces", body: "Pieces marked “Made to order” are handcrafted for you and ship within 4–6 weeks. We'll keep you informed at every step." },
    ],
  },
  {
    slug: "returns",
    title: "Returns",
    intro: "If your piece isn't quite right, we'll make it right.",
    sections: [
      { heading: "30-day returns", body: "Unworn pieces in their original packaging may be returned within 30 days for a full refund or exchange." },
      { heading: "Engraved & made-to-order", body: "Engraved and made-to-order pieces are final sale, but remain covered by our lifetime care promise." },
      { heading: "How to return", body: "Contact client services and we'll arrange an insured, prepaid return courier at no cost to you." },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    intro: "This demonstration site does not collect, transmit or store personal data on any server.",
    sections: [
      { heading: "What stays on your device", body: "Your bag, wishlist and concierge conversation are stored only in your browser's local and session storage so they survive a page refresh." },
      { heading: "Checkout", body: "The checkout is a simulation. No card details are requested, and form entries are never sent anywhere." },
      { heading: "Clearing your data", body: "Clearing your browser's site data removes everything this demo has stored." },
    ],
  },
];

export function getInfoPage(slug: string) {
  return INFO_PAGE_CONTENT.find((p) => p.slug === slug);
}
