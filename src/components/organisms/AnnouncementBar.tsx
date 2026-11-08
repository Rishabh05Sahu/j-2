import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-espresso text-ivory">
      <div className="container-lux flex h-9 items-center justify-center">
        <p className="text-center text-[0.5625rem] uppercase tracking-[0.12em] sm:text-[0.6875rem] sm:tracking-[0.2em]">
          Complimentary shipping on all orders above $500
          <span className="mx-3 hidden text-champagne sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/care/shipping"
            className="hidden text-champagne underline-offset-4 hover:underline sm:inline"
          >
            Learn more
          </Link>
        </p>
      </div>
    </div>
  );
}
