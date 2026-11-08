import Link from "next/link";
import { SmartImage } from "@/components/atoms/SmartImage";
import { SHOP_CATEGORIES } from "@/constants/navigation";

export function CategoryStrip() {
  return (
    <section aria-label="Shop by category" className="border-t border-line py-16 lg:py-20">
      <div className="container-lux">
        <p className="eyebrow mb-10 text-center text-stone">Shop by category</p>
        <ul className="no-scrollbar -mx-5 flex gap-6 overflow-x-auto px-5 sm:mx-0 sm:justify-center sm:gap-10 sm:px-0 lg:gap-14">
          {SHOP_CATEGORIES.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link href={`/shop/${c.slug}`} className="group flex flex-col items-center gap-4">
                <span className="relative block h-24 w-24 overflow-hidden rounded-full bg-cream ring-1 ring-line transition-shadow duration-500 group-hover:ring-champagne sm:h-32 sm:w-32">
                  <SmartImage
                    src={c.image}
                    alt=""
                    fill
                    sizes="128px"
                    wrapperClassName="absolute inset-0"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </span>
                <span className="font-serif text-lg text-charcoal">{c.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
