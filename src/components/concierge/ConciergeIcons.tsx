import {
  Award,
  Cake,
  Compass,
  Flower2,
  Gem,
  Gift,
  Heart,
  Plane,
  Sparkles,
  Users,
  Wine,
} from "lucide-react";
import type { ReactNode } from "react";

const stroke = { strokeWidth: 1.2, className: "h-5 w-5" };

function RingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <circle cx="12" cy="14.5" r="6.5" />
      <path d="M9.5 6.5 12 3.5l2.5 3L12 8.5Z" />
    </svg>
  );
}
function NecklaceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M4 3c0 7 3.5 11 8 11s8-4 8-11" />
      <path d="M12 14v2m0 0-2 2.5 2 2.5 2-2.5Z" />
    </svg>
  );
}
function EarringIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <circle cx="12" cy="4.5" r="1.5" />
      <path d="M12 6v3" />
      <path d="M12 9c-3 3.5-3 8 0 11 3-3 3-7.5 0-11Z" />
    </svg>
  );
}
function BraceletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <ellipse cx="12" cy="12" rx="9" ry="5.5" />
      <ellipse cx="12" cy="12" rx="6" ry="3" />
    </svg>
  );
}
function Swatch({ from, to }: { from: string; to: string }) {
  return (
    <span
      aria-hidden
      className="block h-5 w-5 rounded-full ring-1 ring-charcoal/10"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    />
  );
}
function GemSwatch({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M7 4h10l4 5-9 11L3 9Z" fill={color} stroke="#332820" strokeWidth="0.8" />
      <path d="M3 9h18M9 4l-2 5 5 11 5-11-2-5" fill="none" stroke="#332820" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

const ICONS: Record<string, () => ReactNode> = {
  sparkles: () => <Sparkles {...stroke} />,
  gift: () => <Gift {...stroke} />,
  gem: () => <Gem {...stroke} />,
  wine: () => <Wine {...stroke} />,
  compass: () => <Compass {...stroke} />,
  heart: () => <Heart {...stroke} />,
  flower: () => <Flower2 {...stroke} />,
  users: () => <Users {...stroke} />,
  cake: () => <Cake {...stroke} />,
  award: () => <Award {...stroke} />,
  plane: () => <Plane {...stroke} />,
  circle: () => <RingIcon />,
  necklace: () => <NecklaceIcon />,
  earring: () => <EarringIcon />,
  bracelet: () => <BraceletIcon />,
  "swatch-yellow": () => <Swatch from="#F1D58A" to="#C9A24B" />,
  "swatch-white": () => <Swatch from="#F7F7F5" to="#C9CBCC" />,
  "swatch-rose": () => <Swatch from="#F2C9B8" to="#C98F79" />,
  "swatch-platinum": () => <Swatch from="#E9EAEC" to="#A9ADB2" />,
  "gem-diamond": () => <GemSwatch color="#F4F6F8" />,
  "gem-emerald": () => <GemSwatch color="#2F7A5A" />,
  "gem-sapphire": () => <GemSwatch color="#2B4C8C" />,
  "gem-ruby": () => <GemSwatch color="#A3263A" />,
  "gem-pearl": () => (
    <span aria-hidden className="block h-5 w-5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#EDE6DA_60%,#CFC4B2)] ring-1 ring-charcoal/10" />
  ),
};

export function ConciergeIcon({ name }: { name?: string }) {
  if (!name) return null;
  const render = ICONS[name];
  return render ? <>{render()}</> : null;
}
