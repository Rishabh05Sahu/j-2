import type { Metadata } from "next";
import { ConciergeTemplate } from "@/components/templates/ConciergeTemplate";

export const metadata: Metadata = {
  title: "Personal Concierge",
  description:
    "Meet Amara, your virtual jewelry concierge. Share your story and receive a curated selection of fine jewelry.",
};

export default function ConciergePage() {
  return <ConciergeTemplate />;
}
