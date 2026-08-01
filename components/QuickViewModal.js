"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { PriceOnly } from "@/components/PriceTag";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl, productEnquiryMessage } from "@/lib/whatsapp";

export default function QuickViewModal({ product, open, onClose }) {
  if (!product) return null;

  const quoteUrl = buildWhatsAppUrl(productEnquiryMessage(product));

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl glass-card shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.name}`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 text-foreground transition hover:bg-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {product.category}
                </p>
                <h2 className="font-heading text-xl font-bold">{product.name}</h2>
                <p className="text-sm leading-relaxed text-body">{product.description}</p>
                <PriceOnly product={product} />
                <ul className="space-y-1.5 text-sm text-body">
                  {product.features?.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-2 pt-2">
                  <Link
                    href={quoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-accent text-sm font-semibold text-white transition hover:bg-accent-dark"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Quote
                  </Link>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-border text-sm font-semibold transition hover:border-accent hover:text-accent"
                  >
                    Full Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
