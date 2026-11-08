import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { WishlistSection } from "@/components/organisms/WishlistSection";

export function WishlistTemplate() {
  return (
    <div className="container-lux pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} className="pt-6" />
      <header className="py-12 sm:py-16">
        <p className="eyebrow text-stone">Saved for you</p>
        <h1 className="mt-4 font-serif text-5xl font-light text-charcoal sm:text-6xl">Your wishlist</h1>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-stone">
          The pieces that caught your eye, kept safely until you&apos;re ready.
        </p>
      </header>
      <WishlistSection />
    </div>
  );
}
