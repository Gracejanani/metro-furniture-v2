"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

const HERO_WIDTH = 1717;
const HERO_HEIGHT = 550;

export default function HeroSlider({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section
      className="relative isolate w-full max-w-none overflow-hidden"
      aria-label="Showroom highlights"
    >
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((item, i) => (
            <div
              key={item.id}
              className="relative min-w-0 shrink-0 grow-0 basis-full"
            >
              <Image
                src={item.image}
                alt={item.alt || item.title || "Metro Furniture showroom"}
                width={HERO_WIDTH}
                height={HERO_HEIGHT}
                priority={i === 0}
                sizes="100vw"
                className="block h-auto w-full max-w-none"
              />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="flex justify-center gap-2 border-b border-border/50 bg-surface py-3 sm:py-4">
          {slides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-7 bg-accent" : "w-2 bg-foreground/25 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
