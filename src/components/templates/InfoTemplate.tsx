import Link from "next/link";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { OpenConciergeButton } from "@/components/concierge/OpenConciergeButton";
import { INFO_PAGES } from "@/constants/navigation";
import type { InfoPage } from "@/data/info-pages";
import { cn } from "@/lib/cn";

export function InfoTemplate({ page }: { page: InfoPage }) {
  return (
    <div className="container-lux pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} className="pt-6" />
      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
        <nav aria-label="Client care">
          <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
            {INFO_PAGES.map((p) => (
              <li key={p.slug} className="shrink-0">
                <Link
                  href={`/care/${p.slug}`}
                  aria-current={p.slug === page.slug ? "page" : undefined}
                  className={cn(
                    "block rounded-full border px-4 py-2 text-sm transition-colors lg:rounded-none lg:border-0 lg:px-0 lg:py-1.5",
                    p.slug === page.slug
                      ? "border-espresso text-charcoal lg:underline lg:underline-offset-4"
                      : "border-line text-stone hover:text-charcoal",
                  )}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className="max-w-2xl">
          <h1 className="font-serif text-5xl font-light text-charcoal sm:text-6xl">{page.title}</h1>
          <p className="mt-6 font-serif text-xl font-light leading-relaxed text-stone sm:text-2xl">{page.intro}</p>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {page.sections.map((s) => (
              <section key={s.heading} className="py-7">
                <h2 className="eyebrow text-charcoal">{s.heading}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{s.body}</p>
              </section>
            ))}
          </div>
          <div className="mt-12 bg-cream p-8">
            <p className="font-serif text-2xl text-charcoal">Still have a question?</p>
            <p className="mt-2 text-sm text-stone">Amara, our virtual concierge, can help right away.</p>
            <OpenConciergeButton className="mt-6">Ask my concierge</OpenConciergeButton>
          </div>
        </article>
      </div>
    </div>
  );
}
