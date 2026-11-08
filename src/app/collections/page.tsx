import type { Metadata } from "next";
import { CollectionsTemplate } from "@/components/templates/CollectionsTemplate";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore Solenne's six collections — from The Bridal Edit to Everyday Elegance and Modern Heirlooms.",
};

export default function CollectionsPage() {
  return <CollectionsTemplate />;
}
