"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceOnly } from "@/components/PriceTag";
import QuickViewModal from "@/components/QuickViewModal";
import { buildWhatsAppUrl, productEnquiryMessage } from "@/lib/whatsapp";

export default function ProductCard({ product }) {
  const href = `/product/${product.slug}`;
  const [wishlisted, setWishlisted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const quoteUrl = buildWhatsAppUrl(productEnquiryMessage(product));

  return (
    <>
      <motion.article
        layout
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="group flex h-full flex-col overflow-hidden rounded-3xl glass-card glass-reflection luxury-shadow-hover"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Link href={href} aria-label={`View ${product.name}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
          </Link>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.featured ? <Badge>Premium</Badge> : null}
            {product.offer ? <Badge variant="secondary">{product.offer}</Badge> : null}
          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            <Button
              variant="glass"
              size="icon"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => setWishlisted((v) => !v)}
              className={wishlisted ? "!bg-accent !text-white" : ""}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="glass"
              size="icon"
              aria-label="Quick view"
              onClick={() => setQuickViewOpen(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute inset-x-0 bottom-0 translate-y-0 p-3 transition-transform duration-300 md:translate-y-full md:group-hover:translate-y-0">
            <Link
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-2.5 text-sm font-semibold text-primary transition hover:bg-accent-dark"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Quote
            </Link>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-accent">{product.category}</p>
            <span className="text-xs text-body">{product.material}</span>
          </div>

          <h3 className="line-clamp-2 min-h-[2.75rem] font-heading text-base font-semibold leading-snug tracking-tight">
            <Link href={href} className="transition hover:text-accent">
              {product.name}
            </Link>
          </h3>

          <div className="mt-auto space-y-3 pt-1">
            <PriceOnly product={product} size="sm" />
            <Link
              href={href}
              className="glass-button inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition hover:border-accent/60 hover:text-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      </motion.article>

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
