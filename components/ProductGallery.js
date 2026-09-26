"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { OfferBadge } from "@/components/PriceTag";

export default function ProductGallery({ images, name, offer }) {
  const gallery = images?.length ? images : [];
  const [active, setActive] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const current = gallery[active] || gallery[0];

  const onMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  }, []);

  if (!current) return null;

  return (
    <div className="space-y-4">
      <div
        className="group glass-card glass-photo-frame relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted sm:aspect-square lg:aspect-[4/5]"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={onMove}
      >
        <Image
          src={current}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition duration-300 ${
            zooming ? "scale-150" : "scale-100"
          }`}
          style={
            zooming
              ? { transformOrigin: `${origin.x}% ${origin.y}%` }
              : { transformOrigin: "center" }
          }
        />
        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          <OfferBadge offer={offer} />
        </div>
        <p className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/45 px-3 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
          Hover to zoom
        </p>
      </div>

      {gallery.length > 1 ? (
        <ul
          className="flex gap-3 overflow-x-auto pb-1 no-scrollbar"
          aria-label="Product thumbnails"
        >
          {gallery.map((image, index) => {
            const selected = index === active;
            return (
              <li key={`${image}-${index}`} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-current={selected ? "true" : undefined}
                  className={`relative block h-20 w-20 overflow-hidden rounded-2xl border-2 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    selected
                      ? "border-primary shadow-md"
                      : "border-transparent ring-1 ring-border hover:ring-primary/40"
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                    loading="lazy"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="flex gap-3" aria-label="Product thumbnails">
          <li className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-primary shadow-md">
            <Image src={current} alt="" fill sizes="80px" className="object-cover" />
          </li>
        </ul>
      )}
    </div>
  );
}
