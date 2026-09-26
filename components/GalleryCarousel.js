"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateIn from "@/components/AnimateIn";

export default function GalleryCarousel({ images }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <AnimateIn>
      <div className="relative">
        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
          <div className="flex gap-4">
            {images.map((src, i) => (
              <div
                key={`gallery-${i}`}
                className="relative min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
              >
                <div className="glass-card glass-photo-frame relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={src}
                    alt={`Metro Furniture showroom ${i + 1}`}
                    fill
                    sizes="400px"
                    className="object-cover transition duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="glass"
          size="icon"
          onClick={scrollPrev}
          aria-label="Previous"
          className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 md:inline-flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="glass"
          size="icon"
          onClick={scrollNext}
          aria-label="Next"
          className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 md:inline-flex"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </AnimateIn>
  );
}
