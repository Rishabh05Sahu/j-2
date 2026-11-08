import type { Metadata } from "next";
import { CheckoutTemplate } from "@/components/templates/CheckoutTemplate";

export const metadata: Metadata = {
  title: "Checkout",
  description: "A demonstration checkout — no payment details are requested or processed.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutTemplate />;
}
