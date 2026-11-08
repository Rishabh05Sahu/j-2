import Link from "next/link";
import { Logo } from "@/components/atoms/Logo";
import { FOOTER_COLUMNS } from "@/constants/navigation";
import { Newsletter } from "./Newsletter";

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Pinterest", href: "https://www.pinterest.com/" },
  { label: "TikTok", href: "https://www.tiktok.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-espresso text-ivory">
      <div className="container-lux grid gap-14 py-16 lg:grid-cols-[1.2fr_2fr] lg:gap-20 lg:py-24">
        <div>
          <Logo tone="light" className="items-start" />
          <p className="mt-8 max-w-sm font-serif text-2xl font-light leading-snug text-ivory/90">
            Join our private list for first access to new collections and atelier stories.
          </p>
          <Newsletter />
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow mb-5 text-champagne">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 sm:col-span-3">
            <p className="eyebrow mb-5 text-champagne">Follow the maison</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-lux flex flex-col gap-3 py-6 text-[0.6875rem] tracking-wide text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© Solenne Fine Jewelry. A demonstration storefront — no real orders are processed.</p>
          <p>Crafted with care · 18K gold &amp; platinum</p>
        </div>
      </div>
    </footer>
  );
}
