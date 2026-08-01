"use client";

import Link from "next/link";
import { useState } from "react";
import CallButton from "@/components/CallButton";
import PriceTag, {
  MaterialTag,
  StockBadge,
  WarrantyBadge,
} from "@/components/PriceTag";
import WhatsAppButton from "@/components/WhatsAppButton";
import { productEnquiryMessage } from "@/lib/whatsapp";

const TABS = [
  { id: "details", label: "Details" },
  { id: "features", label: "Features" },
  { id: "care", label: "Care & Delivery" },
];

export default function ProductBuyBox({ product }) {
  const [tab, setTab] = useState("details");
  const enquiry = productEnquiryMessage(product);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          {product.category}
        </p>
        <MaterialTag material={product.material} />
        {product.warranty ? <WarrantyBadge /> : null}
        <StockBadge onRequest={product.onRequest} />
      </div>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {product.name}
      </h1>

      {product.color ? (
        <p className="mt-2 text-sm text-body">
          Colour: <span className="font-medium text-foreground">{product.color}</span>
        </p>
      ) : null}

      <div className="mt-6 border-y border-border/70 py-5">
        <PriceTag product={product} size="lg" />
      </div>

      <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          Need help choosing?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-body">
          We can guide you on size, finish, fabric and delivery for this furniture piece.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <WhatsAppButton
          message={enquiry}
          label={product.onRequest ? "Get Best Price" : "Add to Quote"}
          className="flex-1 justify-center rounded-2xl !py-3.5 shadow-md"
        />
        <CallButton
          label="Call Now"
          className="flex-1 justify-center rounded-2xl !py-3.5"
        />
        <Link
          href="/contact"
          className="inline-flex flex-1 items-center justify-center rounded-2xl border border-border bg-surface px-5 py-3.5 text-sm font-semibold shadow-sm transition hover:border-accent hover:text-accent"
        >
          Custom Size?
        </Link>
      </div>

      <div className="mt-10">
        <div
          className="flex gap-1 overflow-x-auto border-b border-border no-scrollbar"
          role="tablist"
          aria-label="Product information"
        >
          {TABS.map((item) => {
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`tab-${item.id}`}
                aria-controls={`panel-${item.id}`}
                onClick={() => setTab(item.id)}
                className={`relative shrink-0 px-4 py-3 text-sm font-semibold transition ${
                  selected ? "text-accent" : "text-body hover:text-foreground"
                }`}
              >
                {item.label}
                {selected ? (
                  <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="animate-fade-in py-5"
        >
          {tab === "details" ? (
            <p className="text-[15px] leading-relaxed text-body">{product.description}</p>
          ) : null}

          {tab === "features" ? (
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <CheckIcon />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          ) : null}

          {tab === "care" ? (
            <ul className="space-y-3 text-sm leading-relaxed text-body">
              <li>Wipe with a soft dry cloth; avoid harsh chemicals on wood finishes.</li>
              <li>Showroom pickup available at our Salem Main Road location.</li>
              <li>Delivery & installation options — ask on WhatsApp when you enquire.</li>
              <li>Final price confirmed after size, finish and fabric selection.</li>
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}
