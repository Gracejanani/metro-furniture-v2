"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { PriceOnly } from "@/components/PriceTag";
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
            className="fixed inset-0 z-50 bg-foreground/25 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl glass-card shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.name}`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-sm transition hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid md:grid-cols-5">
              <div className="relative aspect-square bg-muted md:col-span-2 md:aspect-auto md:min-h-[320px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-4 p-5 md:col-span-3 md:p-7">
                <div>
                  <p className="text-xs text-body">{product.category}</p>
                  <h2 className="mt-1 font-heading text-xl font-semibold md:text-2xl">
                    {product.name}
                  </h2>
                  {product.model ? (
                    <p className="mt-1 text-xs text-body/70">Model {product.model}</p>
                  ) : null}
                </div>

                <PriceOnly product={product} size="md" />

                <p className="line-clamp-3 text-sm leading-relaxed text-body">
                  {product.description}
                </p>

                {product.features?.length ? (
                  <ul className="grid gap-1.5 text-sm text-body sm:grid-cols-2">
                    {product.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span className="line-clamp-2">{f}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-accent text-sm font-medium text-white transition hover:bg-accent-dark"
                  >
                    View Full Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={quoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium transition hover:border-accent hover:text-accent"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Quote
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
