export default function PriceTag({ product, size = "md", showNote = true }) {
  const sizes = {
    sm: { price: "text-lg", note: "text-[10px]", unit: "text-[11px]", mrp: "text-sm" },
    md: { price: "text-2xl", note: "text-xs", unit: "text-sm", mrp: "text-base" },
    lg: { price: "text-3xl md:text-4xl", note: "text-sm", unit: "text-base", mrp: "text-lg" },
  };
  const s = sizes[size];

  if (product.onRequest || product.price == null) {
    return (
      <div className="space-y-1">
        <p className={`font-heading font-semibold tracking-tight text-accent ${s.price}`}>
          Get Best Price
        </p>
        {showNote ? (
          <p className={`text-body/60 ${s.note}`}>Enquire for size & finish quote</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-baseline gap-2">
        <span
          className={`font-heading font-semibold tracking-tight text-foreground ${s.price}`}
        >
          {product.priceLabel}
        </span>
        <span className={`font-medium text-body/70 ${s.unit}`}>
          / {product.priceUnit === "set" ? "set" : "pc"}
        </span>
      </div>
      {product.mrp ? (
        <p className={`font-medium text-body/50 line-through ${s.mrp}`}>
          MRP ₹{product.mrp.toLocaleString("en-IN")}
        </p>
      ) : null}
      {product.offer ? (
        <span className="inline-flex rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent">
          {product.offer}
        </span>
      ) : null}
      {showNote ? (
        <p className={`text-body/55 ${s.note}`}>
          *Showroom special price — confirm on WhatsApp
        </p>
      ) : null}
    </div>
  );
}

export function PriceOnly({ product, size = "md" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  if (product.onRequest || product.price == null) {
    return (
      <span className={`font-heading font-semibold text-accent ${sizes[size]}`}>
        Get Best Price
      </span>
    );
  }

  return (
    <span className={`font-heading font-semibold text-foreground ${sizes[size]}`}>
      {product.priceLabel}
      <span className="ml-1.5 text-xs font-medium text-body/60">
        /{product.priceUnit === "set" ? "set" : "pc"}
      </span>
    </span>
  );
}

export function MaterialTag({ material }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent ring-1 ring-inset ring-accent/20">
      {material}
    </span>
  );
}

export function ModelTag({ model }) {
  if (!model) return null;
  return (
    <span className="inline-flex items-center rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-body ring-1 ring-inset ring-border">
      {model}
    </span>
  );
}

export function WarrantyBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent ring-1 ring-inset ring-accent/30">
      Quality Assured
    </span>
  );
}

export function StockBadge({ onRequest }) {
  if (onRequest) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent ring-1 ring-inset ring-accent/25">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        Made to Order
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
      In Showroom
    </span>
  );
}

export function OfferBadge({ offer }) {
  if (!offer) return null;
  return (
    <span className="inline-flex rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
      {offer}
    </span>
  );
}
