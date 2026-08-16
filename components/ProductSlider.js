"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { PriceOnly } from "@/components/PriceTag";
import { buildWhatsAppUrl, productEnquiryMessage } from "@/lib/whatsapp";

export default function ProductSlider({
  products,
  title,
  description,
  autoplayDelay = 3500,
  className = "",
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!products?.length) return null;

  return (
    <section className={`relative overflow-hidden py-14 md:py-18 ${className}`}>
      <div className="container relative mx-auto px-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-body md:text-base">
                {description}
              </p>
            ) : null}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-surface/80 text-foreground shadow-sm backdrop-blur transition hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-surface/80 text-foreground shadow-sm backdrop-blur transition hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_46%] lg:flex-[0_0_31%] xl:flex-[0_0_23%]"
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl glass-card luxury-shadow-hover">
                  <Link
                    href={`/product/${product.slug}`}
                    className="relative block aspect-[4/5] overflow-hidden bg-muted"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 78vw, 23vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    {product.offer ? (
                      <span className="absolute left-3 top-3 rounded-lg bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
                        {product.offer}
                      </span>
                    ) : null}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[11px] text-white/75">{product.category}</p>
                      <p className="line-clamp-2 font-heading text-base font-medium text-white">
                        {product.name}
                      </p>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <PriceOnly product={product} size="sm" />
                    <div className="mt-auto flex gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        className="flex flex-1 items-center justify-center rounded-xl border border-border py-2 text-xs font-medium transition hover:border-accent hover:text-accent"
                      >
                        Details
                      </Link>
                      <Link
                        href={buildWhatsAppUrl(productEnquiryMessage(product))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-accent py-2 text-xs font-medium text-white transition hover:bg-accent-dark"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Quote
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-1.5">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex % products.length
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-foreground/15 hover:bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
