import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { SmartImage } from "@/components/atoms/SmartImage";
import { Reveal } from "@/components/layout/Reveal";

export function BrandStory() {
  return (
    <section aria-labelledby="story-title" className="overflow-hidden bg-ivory py-20 lg:py-32">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-[85%] overflow-hidden bg-cream">
            <SmartImage
              src="/images/editorial/story-hand.jpg"
              alt="A hand wearing delicate gold rings and a fine chain bracelet"
              fill
              sizes="(min-width: 1024px) 40vw, 85vw"
              wrapperClassName="absolute inset-0"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-10 right-0 aspect-[3/4] w-[42%] overflow-hidden border-[10px] border-ivory bg-cream">
            <SmartImage
              src="/images/editorial/atelier-rings.jpg"
              alt="Gold rings resting in a velvet presentation tray"
              fill
              sizes="(min-width: 1024px) 20vw, 42vw"
              wrapperClassName="absolute inset-0"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:pl-4">
          <p className="eyebrow flex items-center gap-3 text-stone">
            <span className="h-px w-8 bg-gold" aria-hidden /> Our atelier
          </p>
          <h2
            id="story-title"
            className="mt-6 font-serif text-4xl font-light leading-[1.08] text-charcoal text-balance sm:text-5xl lg:text-[3.5rem]"
          >
            Made to Be Treasured. <em className="italic">Designed to Last.</em>
          </h2>
          <div className="mt-8 max-w-lg space-y-5 text-[0.9375rem] leading-relaxed text-stone">
            <p>
              Every Solenne piece begins as a sketch in our atelier and is brought to life by
              artisans who have spent decades perfecting their craft — setting each stone by
              hand, polishing every surface until it glows.
            </p>
            <p>
              We work only in solid 18K recycled gold and platinum, with diamonds and gemstones
              traced to their origin. Jewelry, we believe, should outlive trends — and be
              passed on with its story intact.
            </p>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-y border-line py-6">
            {[
              ["40+", "Years of craft"],
              ["90 hrs", "For our most intricate pieces"],
              ["∞", "Complimentary cleaning"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-serif text-3xl text-charcoal">{k}</dt>
                <dd className="mt-1 text-xs leading-snug text-stone">{v}</dd>
              </div>
            ))}
          </dl>
          <Button
            href="/about"
            variant="link"
            className="mt-10"
            icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />}
          >
            Discover our story
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
