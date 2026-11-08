import type { Metadata } from "next";
import { WishlistTemplate } from "@/components/templates/WishlistTemplate";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "The Solenne pieces you have saved for later.",
};

export default function WishlistPage() {
  return <WishlistTemplate />;
}
