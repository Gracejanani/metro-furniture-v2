"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";

export default function UpcomingSlider({ items }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );

  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  if (!items?.length) return null;

  return (
    <section className="border-y border-accent/10 bg-muted/50 py-14 md:py-18">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            Arriving Soon
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-body">
            Bathroom taps, basins, showers & fittings — enquire on WhatsApp.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_45%] lg:flex-[0_0_30%]"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="group glass-card glass-photo-frame luxury-shadow-hover block overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 78vw, 30vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-foreground backdrop-blur-sm">
                      Coming Soon
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[11px] text-white/70">{item.category}</p>
                      <p className="mt-0.5 font-heading text-lg font-medium text-white">
                        {item.name}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-white/75">{item.tagline}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className="h-1.5 w-1.5 rounded-full bg-foreground/15 transition hover:bg-accent"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
