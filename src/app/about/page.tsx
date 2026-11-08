import type { Metadata } from "next";
import { AboutTemplate } from "@/components/templates/AboutTemplate";

export const metadata: Metadata = {
  title: "About the Maison",
  description:
    "Discover Solenne — fine jewelry crafted by hand in recycled 18K gold and platinum, made to be treasured for generations.",
};

export default function AboutPage() {
  return <AboutTemplate />;
}
