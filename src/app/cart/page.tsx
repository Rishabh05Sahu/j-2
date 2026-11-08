import type { Metadata } from "next";
import { CartTemplate } from "@/components/templates/CartTemplate";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review the pieces in your Solenne shopping bag.",
};

export default function CartPage() {
  return <CartTemplate />;
}
