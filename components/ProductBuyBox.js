"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, ShoppingBag } from "lucide-react";
import CallButton from "@/components/CallButton";
import RoomPreview from "@/components/RoomPreview";
import PriceTag, {
  MaterialTag,
  ModelTag,
  StockBadge,
  WarrantyBadge,
} from "@/components/PriceTag";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildWhatsAppUrl, productEnquiryMessage, productOrderMessage } from "@/lib/whatsapp";

const TABS = [
  { id: "details", label: "Details" },
  { id: "specs", label: "Specifications" },
  { id: "features", label: "Features" },
  { id: "care", label: "Care & Delivery" },
];

export default function ProductBuyBox({ product }) {
  const [tab, setTab] = useState("details");
  const [orderStep, setOrderStep] = useState(null);
  const [orderData, setOrderData] = useState({});
  const enquiry = productEnquiryMessage(product);

  const startQuickOrder = () => {
    setOrderStep("mobile");
    setOrderData({});
  };

  const submitOrderField = (value) => {
    if (orderStep === "mobile") {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 10) return;
      setOrderData((d) => ({ ...d, mobile: digits.slice(-10) }));
      setOrderStep("address");
      return;
    }
    if (orderStep === "address" && value.trim().length >= 10) {
      const url = buildWhatsAppUrl(
        productOrderMessage(product, {
          mobile: orderData.mobile,
          address: value.trim(),
        })
      );
      window.open(url, "_blank", "noopener,noreferrer");
      setOrderStep(null);
      setOrderData({});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card flex flex-col rounded-3xl p-5 sm:p-7 md:p-8"
    >
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-body">{product.category}</span>
        <ModelTag model={product.model} />
        <MaterialTag material={product.material} />
        {product.warranty ? <WarrantyBadge /> : null}
        <StockBadge onRequest={product.onRequest} />
      </div>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {product.name}
      </h1>

      {product.tagline ? (
        <p className="mt-2 text-base italic leading-relaxed text-body/80">
          {product.tagline}
        </p>
      ) : null}

      {product.color ? (
        <p className="mt-2 text-sm text-body">
          Colour: <span className="font-medium text-foreground">{product.color}</span>
        </p>
      ) : null}

      <div className="glass mt-6 rounded-2xl p-5">
        <PriceTag product={product} size="lg" />
      </div>

      {orderStep ? (
        <div className="glass mt-4 rounded-2xl p-4">
          <p className="text-sm font-medium text-foreground">Quick WhatsApp order</p>
          <p className="mt-2 text-sm text-body">
            {orderStep === "mobile"
              ? "Enter your 10-digit mobile number:"
              : "Enter your delivery address:"}
          </p>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitOrderField(e.target.field.value);
              e.target.reset();
            }}
          >
            <input
              name="field"
              type={orderStep === "mobile" ? "tel" : "text"}
              required
              placeholder={orderStep === "mobile" ? "9876543210" : "Area, landmark, pincode"}
              className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="submit"
              className="premium-button shrink-0 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent-dark"
            >
              Next
            </button>
          </form>
          <button
            type="button"
            onClick={() => { setOrderStep(null); setOrderData({}); }}
            className="mt-2 text-xs text-body underline-offset-2 hover:underline"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={startQuickOrder}
            className="premium-button flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-primary transition hover:bg-accent-dark"
          >
            <ShoppingBag className="h-4 w-4" />
            Quick Order via WhatsApp
          </button>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton
              message={enquiry}
              label={product.onRequest ? "Get Best Price" : "Add to Quote"}
              className="flex-1 justify-center rounded-2xl !py-3.5 shadow-md"
            />
            <CallButton
              label="Call Now"
              className="flex-1 justify-center rounded-2xl !py-3.5"
            />
          </div>
        </div>
      )}

      <div className="mt-4">
        <RoomPreview productImage={product.image} productName={product.name} />
      </div>

      <div className="glass mt-4 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-body" />
          <p className="text-sm text-body">
            Use the chat button (bottom-left) to ask about this product or place an order.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div
          className="flex gap-1 overflow-x-auto border-b border-border no-scrollbar"
          role="tablist"
          aria-label="Product information"
        >
          {TABS.map((item) => {
            const selected = tab === item.id;
            const hasSpecs = item.id === "specs" && product.specs?.length;
            const hasFeatures = item.id === "features" && product.features?.length;
            if (item.id === "specs" && !product.specs?.length) return null;
            if (item.id === "features" && !product.features?.length) return null;
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
            <div className="space-y-4">
              <p className="text-[15px] leading-relaxed text-body">{product.description}</p>
              {product.configuration ? (
                <div className="glass rounded-xl p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                    Configuration
                  </p>
                  <p className="mt-1 text-sm text-foreground">{product.configuration}</p>
                </div>
              ) : null}
              {product.upholstery ? (
                <div className="glass rounded-xl p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                    Upholstery
                  </p>
                  <p className="mt-1 text-sm text-foreground">{product.upholstery}</p>
                </div>
              ) : null}
            </div>
          ) : null}

          {tab === "specs" && product.specs?.length ? (
            <dl className="glass divide-y divide-border/60 overflow-hidden rounded-2xl">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex gap-4 px-4 py-3 even:bg-white/20">
                  <dt className="w-2/5 shrink-0 text-sm font-medium text-body">{spec.label}</dt>
                  <dd className="text-sm font-semibold text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {tab === "features" ? (
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <span className="glass-icon mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-accent-dark">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          ) : null}

          {tab === "care" ? (
            <ul className="space-y-3 text-sm leading-relaxed text-body">
              <li>Wipe with a soft dry cloth; avoid harsh chemicals on finishes.</li>
              <li>Showroom pickup available at our Salem Main Road location.</li>
              <li>Delivery & installation — confirm on WhatsApp when you order.</li>
              <li>No online payment — order via WhatsApp and pay as confirmed by our team.</li>
            </ul>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
