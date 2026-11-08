import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { Reveal } from "@/components/layout/Reveal";
import { OpenConciergeButton } from "@/components/concierge/OpenConciergeButton";

const VALUES = [
  {
    title: "Crafted by hand",
    body: "Each piece passes through the hands of at least five artisans — from wax carver to stone setter to polisher — before it reaches yours.",
  },
  {
    title: "Responsibly sourced",
    body: "We work exclusively in recycled 18K gold and platinum, with diamonds and gemstones traced to responsible origins.",
  },
  {
    title: "Made to last",
    body: "Every Solenne piece comes with lifetime cleaning, inspection and one complimentary resizing — because heirlooms deserve care.",
  },
];

export function AboutTemplate() {
  return (
    <>
      <section className="relative h-[70svh] min-h-[460px] overflow-hidden bg-espresso">
        <Image
          src="/images/products/model-ring.jpg"
          alt="A woman wearing Solenne rings and a fine gold necklace"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
        <div className="container-lux absolute inset-x-0 bottom-0 pb-14 text-ivory sm:pb-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
            className="mb-8 text-ivory/70 [&_[aria-current]]:text-ivory"
          />
          <p className="eyebrow text-champagne">The maison</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-light leading-[1.02] sm:text-7xl">
            Jewelry for the moments that <em className="italic">become memories</em>.
          </h1>
        </div>
      </section>

      <section className="container-lux grid gap-14 py-20 lg:grid-cols-2 lg:gap-24 lg:py-32">
        <Reveal>
          <p className="eyebrow text-stone">Our story</p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-charcoal sm:text-5xl">
            Born in a small atelier, guided by a simple belief.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-[0.9375rem] leading-relaxed text-stone">
          <p>
            Solenne began with a single workbench and a conviction that fine jewelry should feel
            personal — chosen with intention, worn every day, and handed down with its story intact.
          </p>
          <p>
            Today our atelier brings together master goldsmiths, stone setters and designers who
            share that belief. We design slowly, make carefully and finish everything by hand.
          </p>
          <p>
            And because choosing jewelry is personal, we created Amara — a virtual concierge who
            listens to your story and guides you to pieces that feel unmistakably yours.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream py-20 lg:py-28">
        <div className="container-lux grid gap-12 md:grid-cols-3 md:gap-10">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <p className="font-serif text-5xl font-light text-gold">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-serif text-2xl text-charcoal">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-lux grid items-center gap-12 py-20 md:grid-cols-2 lg:gap-24 lg:py-32">
        <Reveal className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] overflow-hidden bg-cream">
            <SmartImage src="/images/editorial/atelier-chain.jpg" alt="A gold chain bracelet resting on an open book" fill sizes="(min-width: 768px) 22vw, 45vw" wrapperClassName="absolute inset-0" className="object-cover" />
          </div>
          <div className="relative mt-12 aspect-[3/4] overflow-hidden bg-cream">
            <SmartImage src="/images/editorial/story-chain.jpg" alt="A woman wearing a bold gold link necklace" fill sizes="(min-width: 768px) 22vw, 45vw" wrapperClassName="absolute inset-0" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow text-stone">Visit the atelier</p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-charcoal sm:text-5xl">
            A consultation, wherever you are.
          </h2>
          <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-stone">
            Begin a private consultation with Amara at any time — share what you&apos;re looking for,
            and receive a curated selection in moments.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <OpenConciergeButton>Meet your concierge</OpenConciergeButton>
            <Button href="/collections" variant="secondary" icon={<ArrowRight className="h-4 w-4" strokeWidth={1.4} />}>
              Explore collections
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
