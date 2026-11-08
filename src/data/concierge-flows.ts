import type {
  ConciergeIntent,
  ConciergeIntentDef,
  ConciergeOptionDef,
  ConciergeQuestion,
} from "@/types/concierge";

const P = "/images/products";

export const INTENTS: ConciergeIntentDef[] = [
  {
    id: "self",
    label: "Something for myself",
    description: "A piece that feels entirely like you.",
    icon: "sparkles",
    image: `${P}/necklace-coin.jpg`,
    acknowledgement:
      "How lovely. There is nothing quite like choosing something just for yourself.",
  },
  {
    id: "gift",
    label: "I'm searching for a gift",
    description: "Thoughtful pieces for someone special.",
    icon: "gift",
    image: `${P}/necklace-heart.jpg`,
    acknowledgement:
      "What a thoughtful gesture. Let's find something they'll treasure for years.",
  },
  {
    id: "engagement",
    label: "An engagement ring",
    description: "For the question of a lifetime.",
    icon: "gem",
    image: `${P}/ring-halo.jpg`,
    acknowledgement:
      "Congratulations — this is a very special moment. I'd be honoured to help.",
  },
  {
    id: "occasion",
    label: "Celebrating an occasion",
    description: "Mark a milestone beautifully.",
    icon: "wine",
    image: `${P}/bracelet-bangles.jpg`,
    acknowledgement:
      "A celebration deserves something memorable. Tell me a little more.",
  },
  {
    id: "explore",
    label: "I'd simply love to explore",
    description: "Wander through our maison, unhurried.",
    icon: "compass",
    image: `${P}/earring-twist.jpg`,
    acknowledgement:
      "Wonderful. Let's wander together — just a couple of questions to guide us.",
  },
];

// ------------------------------------------------------------ shared Qs

const categoryOptions: ConciergeOptionDef[] = [
  { id: "rings", label: "Rings", icon: "circle", apply: { categories: ["Rings"] } },
  {
    id: "necklaces",
    label: "Necklaces",
    icon: "necklace",
    apply: { categories: ["Necklaces"] },
  },
  {
    id: "earrings",
    label: "Earrings",
    icon: "earring",
    apply: { categories: ["Earrings"] },
  },
  {
    id: "bracelets",
    label: "Bracelets",
    icon: "bracelet",
    apply: { categories: ["Bracelets"] },
  },
  {
    id: "open",
    label: "I'm open to suggestions",
    icon: "sparkles",
    apply: { categories: [] },
  },
];

const styleQuestion = (prompt: string): ConciergeQuestion => ({
  id: "style",
  prompt,
  summaryLabel: "Style",
  options: [
    {
      id: "minimal",
      label: "Minimal and timeless",
      description: "Clean lines, quiet confidence.",
      apply: { styles: ["Minimal", "Timeless"] },
    },
    {
      id: "classic",
      label: "Classic elegance",
      description: "Refined, forever in style.",
      apply: { styles: ["Classic", "Timeless"] },
    },
    {
      id: "modern",
      label: "Modern and bold",
      description: "Sculptural and assured.",
      apply: { styles: ["Modern", "Bold"] },
    },
    {
      id: "romantic",
      label: "Romantic and delicate",
      description: "Soft, tender, feminine.",
      apply: { styles: ["Romantic", "Delicate"] },
    },
    {
      id: "statement",
      label: "Statement pieces",
      description: "Made to be noticed.",
      apply: { styles: ["Statement", "Vintage"] },
    },
  ],
});

const metalQuestion: ConciergeQuestion = {
  id: "metal",
  prompt: "Which metal do you prefer?",
  helper: "All of our pieces are crafted in solid 18K gold or platinum.",
  summaryLabel: "Metal",
  options: [
    { id: "yellow", label: "Yellow gold", icon: "swatch-yellow", apply: { metal: "18K Yellow Gold" } },
    { id: "white", label: "White gold", icon: "swatch-white", apply: { metal: "18K White Gold" } },
    { id: "rose", label: "Rose gold", icon: "swatch-rose", apply: { metal: "18K Rose Gold" } },
    { id: "platinum", label: "Platinum", icon: "swatch-platinum", apply: { metal: "Platinum" } },
    { id: "any", label: "No preference", icon: "sparkles", apply: { metal: undefined } },
  ],
};

const gemstoneQuestion: ConciergeQuestion = {
  id: "gemstone",
  prompt: "Is there a particular gemstone you love?",
  summaryLabel: "Gemstone",
  options: [
    { id: "diamond", label: "Diamond", icon: "gem-diamond", apply: { gemstone: "Diamond" } },
    { id: "emerald", label: "Emerald", icon: "gem-emerald", apply: { gemstone: "Emerald" } },
    { id: "sapphire", label: "Sapphire", icon: "gem-sapphire", apply: { gemstone: "Sapphire" } },
    { id: "ruby", label: "Ruby", icon: "gem-ruby", apply: { gemstone: "Ruby" } },
    { id: "pearl", label: "Pearl", icon: "gem-pearl", apply: { gemstone: "Pearl" } },
    { id: "any", label: "No preference", icon: "sparkles", apply: { gemstone: undefined } },
  ],
};

const budgetQuestion: ConciergeQuestion = {
  id: "budget",
  prompt: "What budget would you feel comfortable with?",
  helper: "This simply helps me focus — I'll never show you less than our best.",
  summaryLabel: "Budget",
  options: [
    { id: "u250", label: "Under $250", apply: { budget: { min: 0, max: 250, label: "under $250" } } },
    { id: "250-500", label: "$250 – $500", apply: { budget: { min: 250, max: 500, label: "$250–$500" } } },
    { id: "500-1000", label: "$500 – $1,000", apply: { budget: { min: 500, max: 1000, label: "$500–$1,000" } } },
    { id: "1000-3000", label: "$1,000 – $3,000", apply: { budget: { min: 1000, max: 3000, label: "$1,000–$3,000" } } },
    { id: "3000+", label: "Above $3,000", apply: { budget: { min: 3000, max: 20000, label: "above $3,000" } } },
  ],
};

const presenceQuestion: ConciergeQuestion = {
  id: "presence",
  prompt: "Would you prefer something subtle, or something that makes a statement?",
  summaryLabel: "Presence",
  options: [
    { id: "delicate", label: "Delicate and understated", apply: { presence: "delicate" } },
    { id: "sparkle", label: "A little sparkle", apply: { presence: "sparkle" } },
    { id: "bold", label: "Bold and distinctive", apply: { presence: "bold" } },
    { id: "surprise", label: "Surprise me", apply: { presence: "surprise" } },
  ],
};

// ------------------------------------------------------------ flows

export const FLOWS: Record<ConciergeIntent, ConciergeQuestion[]> = {
  self: [
    {
      id: "category",
      prompt: "What kind of jewelry would you love to discover?",
      summaryLabel: "Jewelry",
      options: categoryOptions,
    },
    styleQuestion("Which style feels most like you?"),
    metalQuestion,
    gemstoneQuestion,
    budgetQuestion,
    presenceQuestion,
  ],
  gift: [
    {
      id: "recipient",
      prompt: "Who is the lucky recipient?",
      summaryLabel: "For",
      options: [
        { id: "partner", label: "My partner", icon: "heart", apply: { recipient: "your partner" } },
        { id: "mother", label: "My mother", icon: "flower", apply: { recipient: "your mother" } },
        { id: "friend", label: "A dear friend", icon: "sparkles", apply: { recipient: "your friend" } },
        { id: "family", label: "Sister or daughter", icon: "users", apply: { recipient: "her" } },
        { id: "someone", label: "Someone special", icon: "gift", apply: { recipient: "them" } },
      ],
    },
    {
      id: "occasion",
      prompt: "What's the occasion?",
      summaryLabel: "Occasion",
      options: [
        { id: "birthday", label: "Birthday", icon: "cake", apply: { occasion: "Birthday" } },
        { id: "anniversary", label: "Anniversary", icon: "heart", apply: { occasion: "Anniversary" } },
        { id: "graduation", label: "Graduation", icon: "award", apply: { occasion: "Graduation" } },
        { id: "wedding", label: "Wedding", icon: "gem", apply: { occasion: "Wedding" } },
        { id: "just-because", label: "Just because", icon: "gift", apply: { occasion: "Gift" } },
      ],
    },
    {
      id: "category",
      prompt: "What kind of piece are you imagining?",
      summaryLabel: "Jewelry",
      options: categoryOptions,
    },
    styleQuestion("How would you describe their style?"),
    budgetQuestion,
  ],
  engagement: [
    {
      id: "ring-style",
      prompt: "Which ring silhouette speaks to you?",
      summaryLabel: "Silhouette",
      options: [
        {
          id: "solitaire",
          label: "Classic solitaire",
          description: "A single stone, beautifully simple.",
          apply: { styles: ["Minimal", "Timeless"] },
        },
        {
          id: "halo",
          label: "Halo",
          description: "A centre stone framed in light.",
          apply: { styles: ["Classic", "Statement"] },
        },
        {
          id: "vintage",
          label: "Vintage-inspired",
          description: "Old-world romance and detail.",
          apply: { styles: ["Vintage", "Romantic"] },
        },
        {
          id: "modern",
          label: "Modern & unexpected",
          description: "Fancy cuts and fresh lines.",
          apply: { styles: ["Modern", "Statement"] },
        },
      ],
    },
    {
      id: "center-stone",
      prompt: "Which centre stone do you envision?",
      summaryLabel: "Centre stone",
      options: [
        { id: "diamond", label: "Diamond", icon: "gem-diamond", apply: { gemstone: "Diamond" } },
        { id: "sapphire", label: "Sapphire", icon: "gem-sapphire", apply: { gemstone: "Sapphire" } },
        { id: "any", label: "Open to ideas", icon: "sparkles", apply: { gemstone: undefined } },
      ],
    },
    metalQuestion,
    {
      id: "ring-size",
      prompt: "Do you know the ring size?",
      helper: "Not sure? Every engagement ring includes one complimentary resizing.",
      summaryLabel: "Ring size",
      options: [
        { id: "4", label: "Size 4", apply: { ringSize: "4" } },
        { id: "5", label: "Size 5", apply: { ringSize: "5" } },
        { id: "6", label: "Size 6", apply: { ringSize: "6" } },
        { id: "7", label: "Size 7", apply: { ringSize: "7" } },
        { id: "8", label: "Size 8", apply: { ringSize: "8" } },
        { id: "unsure", label: "Not sure yet", apply: { ringSize: undefined } },
      ],
    },
    {
      id: "budget",
      prompt: "What budget feels right for this ring?",
      summaryLabel: "Budget",
      options: [
        { id: "u3500", label: "Under $3,500", apply: { budget: { min: 0, max: 3500, label: "under $3,500" } } },
        { id: "3500-5000", label: "$3,500 – $5,000", apply: { budget: { min: 3500, max: 5000, label: "$3,500–$5,000" } } },
        { id: "5000-8000", label: "$5,000 – $8,000", apply: { budget: { min: 5000, max: 8000, label: "$5,000–$8,000" } } },
        { id: "8000+", label: "Above $8,000", apply: { budget: { min: 8000, max: 40000, label: "above $8,000" } } },
      ],
    },
    {
      id: "proposal",
      prompt: "And how are you dreaming of proposing?",
      helper: "Just between us — it helps me suggest the perfect presentation.",
      summaryLabel: "Proposal",
      options: [
        { id: "intimate", label: "Intimate, just the two of us", icon: "heart", apply: { proposal: "an intimate moment" } },
        { id: "grand", label: "A grand gesture", icon: "sparkles", apply: { proposal: "a grand gesture" } },
        { id: "travel", label: "Somewhere far away", icon: "plane", apply: { proposal: "a proposal abroad" } },
        { id: "planning", label: "Still planning", icon: "compass", apply: { proposal: undefined } },
      ],
    },
  ],
  occasion: [
    {
      id: "occasion",
      prompt: "Which moment are we celebrating?",
      summaryLabel: "Occasion",
      options: [
        { id: "anniversary", label: "An anniversary", icon: "heart", apply: { occasion: "Anniversary" } },
        { id: "birthday", label: "A birthday", icon: "cake", apply: { occasion: "Birthday" } },
        { id: "wedding", label: "A wedding", icon: "gem", apply: { occasion: "Wedding" } },
        { id: "graduation", label: "A graduation", icon: "award", apply: { occasion: "Graduation" } },
        { id: "evening", label: "A special evening", icon: "wine", apply: { occasion: "Evening" } },
        { id: "milestone", label: "A personal milestone", icon: "sparkles", apply: { occasion: "Celebration" } },
      ],
    },
    {
      id: "category",
      prompt: "What kind of piece would mark it best?",
      summaryLabel: "Jewelry",
      options: categoryOptions,
    },
    metalQuestion,
    budgetQuestion,
    presenceQuestion,
  ],
  explore: [
    styleQuestion("To begin, which mood draws you in?"),
    budgetQuestion,
  ],
};

export const CONCIERGE_NAME = "Amara";
