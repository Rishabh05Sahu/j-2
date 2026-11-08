import type { Metadata } from "next";
import { DiscoverTemplate } from "@/components/templates/DiscoverTemplate";

export const metadata: Metadata = {
  title: "Discover Jewelry",
  description:
    "Search, filter and explore Solenne's fine jewelry — rings, necklaces, earrings and bracelets in 18K gold and platinum.",
};

export default function DiscoverPage() {
  return <DiscoverTemplate />;
}
