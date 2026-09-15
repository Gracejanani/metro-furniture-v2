import Image from "next/image";
import {
  Armchair,
  Diamond,
  Home,
  Lamp,
  Leaf,
  MapPin,
  Phone,
  Sofa,
  Globe,
} from "lucide-react";
import { business } from "@/data/business";
import { posBusiness } from "@/data/pos-business";
import { formatINR } from "@/lib/billing/calculate";
import BarcodeStrip from "./BarcodeStrip";
import QrPlaceholder from "./QrPlaceholder";

const GOLD =
  "linear-gradient(135deg, #8a6d3b 0%, #e8d5a8 35%, #c8a96a 55%, #a8843a 100%)";

/** Matched front/back dimensions (print-safe). */
export const PRICE_TAG_WIDTH_PX = 320;
export const PRICE_TAG_HEIGHT_PX = 532;
export const PRICE_TAG_LOGO_HEIGHT_PX = 58;
export const PRICE_TAG_HEADER_MIN_PX = 92;

function TagFrame({ children, className = "" }) {
  return (
    <div
      className={`price-tag-card relative flex min-h-[532px] w-[320px] shrink-0 flex-col overflow-hidden bg-white text-[#111] shadow-lg ${className}`}
      style={{ width: PRICE_TAG_WIDTH_PX, minHeight: PRICE_TAG_HEIGHT_PX }}
      style={{
        clipPath:
          "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%, 0 14px)",
        border: "4px solid transparent",
        backgroundImage: `linear-gradient(white, white), ${GOLD}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[2px]"
        aria-hidden
      >
        <div
          className="h-5 w-5 rounded-full border-2 border-[#c8a96a] bg-gradient-to-b from-[#e8d5a8] to-[#8a6d3b] shadow-inner"
        />
        <div className="mx-auto -mt-1 h-6 w-px bg-[#c8a96a]/80" />
      </div>
      {children}
    </div>
  );
}

const NAV_LOGO_W = 398;
const NAV_LOGO_H = 136;

function TagLogo() {
  return (
    <span
      className="relative flex shrink-0 items-center"
      style={{
        height: PRICE_TAG_LOGO_HEIGHT_PX,
        width: Math.round(PRICE_TAG_LOGO_HEIGHT_PX * (NAV_LOGO_W / NAV_LOGO_H)),
        maxWidth: "52%",
      }}
    >
      <Image
        src={business.navLogo}
        alt={business.name}
        width={NAV_LOGO_W}
        height={NAV_LOGO_H}
        sizes="170px"
        priority
        className="h-full w-auto max-w-full object-contain object-left"
        style={{ maxHeight: PRICE_TAG_LOGO_HEIGHT_PX }}
      />
    </span>
  );
}

function TagHeader({ variant = "front", notchColor = "#faf9f6" }) {
  const isFront = variant === "front";
  return (
    <div
      className="relative shrink-0 bg-[#0a0a0a] px-3 pb-3.5 pt-8 text-white"
      style={{ minHeight: PRICE_TAG_HEADER_MIN_PX }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1a1a1a 0, #1a1a1a 2px, #0d0d0d 2px, #0d0d0d 4px)",
        }}
      />
      <div className="relative flex min-h-[58px] items-center justify-between gap-2">
        <TagLogo />
        {isFront ? (
          <p className="max-w-[118px] shrink-0 text-right font-[family-name:var(--font-heading)] text-[9px] italic leading-snug text-white/90">
            Crafting Comfort,
            <br />
            Defining Lifestyles.
          </p>
        ) : (
          <div className="flex shrink-0 gap-1.5 text-[7px] font-semibold uppercase tracking-wide text-[#c8a96a]">
            <span className="flex flex-col items-center gap-0.5">
              <Sofa className="h-3.5 w-3.5" /> Furniture
            </span>
            <span className="flex flex-col items-center gap-0.5">
              <Lamp className="h-3.5 w-3.5" /> Lighting
            </span>
            <span className="flex flex-col items-center gap-0.5">
              <Home className="h-3.5 w-3.5" /> Interiors
            </span>
          </div>
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: GOLD }}
      />
      <div
        className="absolute -bottom-[1px] left-0 right-0 h-3"
        style={{
          backgroundColor: notchColor,
          clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
        }}
      />
    </div>
  );
}

const FEATURES = [
  { icon: Armchair, label: "Premium Fabric" },
  { icon: Diamond, label: "Stylish Design" },
  { icon: Leaf, label: "Durable & Long Lasting" },
  { icon: Home, label: "Perfect for Modern Homes" },
];

export function PriceTagFront({ product }) {
  const price = product.offer_price ?? product.selling_price;
  const mrp = product.mrp || price;
  const subtitle =
    product.description?.slice(0, 48) || "LUXURY COMFORT FOR MODERN HOMES";

  return (
    <TagFrame>
      <TagHeader variant="front" notchColor="#faf9f6" />
      <div className="flex flex-1 flex-col bg-[#faf9f6] px-3 pb-3 pt-1">
        <div className="relative mt-1 overflow-hidden rounded-sm border border-black/5 bg-white">
          {product.image_url ? (
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-muted text-xs text-body">
              Product image
            </div>
          )}
          <span
            className="absolute right-0 top-0 px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider text-[#1a1c20]"
            style={{ background: GOLD }}
          >
            Premium Collection
          </span>
        </div>

        <h2
          className="mt-3 text-center font-[family-name:var(--font-heading)] text-[15px] font-bold uppercase leading-tight tracking-wide"
        >
          {product.name}
        </h2>
        <p className="mt-1 text-center text-[8px] font-medium uppercase tracking-[0.12em] text-body">
          {subtitle}
        </p>

        <div className="mt-3 grid grid-cols-4 gap-1 border-y border-black/8 py-2">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <Icon className="h-3.5 w-3.5 text-[#8a6d3b]" strokeWidth={1.5} />
              <span className="mt-0.5 text-[6px] font-medium leading-tight text-[#333]">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded border border-black/10 bg-white px-2 py-1.5 text-center">
            <p className="text-[7px] font-semibold uppercase text-body">MRP</p>
            <p className="text-sm font-bold text-red-600 line-through">
              {formatINR(mrp)}
            </p>
          </div>
          <div
            className="rounded px-2 py-1.5 text-center shadow-sm"
            style={{ background: GOLD }}
          >
            <p className="text-[7px] font-bold uppercase text-[#1a1c20]/80">
              Special Price
            </p>
            <p className="text-base font-black text-[#1a1c20]">{formatINR(price)}</p>
          </div>
        </div>

        <div className="mt-2 flex items-end justify-between gap-2 text-[7px] text-body">
          <div className="space-y-0.5">
            <p>
              <span className="font-semibold text-foreground">SKU:</span> {product.sku}
            </p>
            <p>
              <span className="font-semibold text-foreground">Code:</span>{" "}
              {product.product_code || product.sku}
            </p>
            <p>
              <span className="font-semibold text-foreground">GST:</span>{" "}
              {product.gst_rate ?? 18}% Incl.
            </p>
          </div>
          <div className="text-right">
            <p
              className="font-[family-name:var(--font-heading)] text-[11px] italic text-[#8a6d3b]"
            >
              Live Beautifully
            </p>
            <p className="text-[6px] font-semibold uppercase tracking-wider">
              With Metro Furniture
            </p>
          </div>
        </div>
      </div>
    </TagFrame>
  );
}

export function PriceTagBack({ product }) {
  const barcode = product.barcode || product.sku?.replace(/-/g, "") || "8901234567890";
  const rows = [
    ["Product Name", product.name],
    ["SKU", product.sku],
    ["Product Code", product.product_code || product.sku],
    ["Dimensions", product.dimensions || "—"],
    ["Material", product.material || "—"],
    ["Color", product.color || "—"],
    ["Warranty", product.warranty || "—"],
    ["GST", `${product.gst_rate ?? 18}% Incl.`],
  ];

  return (
    <TagFrame>
      <TagHeader variant="back" notchColor="#0a0a0a" />
      <div className="flex flex-1 flex-col bg-[#0a0a0a] px-3 pb-2 pt-2 text-white">
        <p
          className="border-b border-[#c8a96a]/50 pb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a96a]"
        >
          Product Details
        </p>
        <dl className="mt-1 flex-1 space-y-0 text-[8px]">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between gap-2 border-b border-white/10 py-1"
            >
              <dt className="shrink-0 text-white/55">{label}</dt>
              <dd className="text-right font-medium text-white">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-3 flex items-center justify-center gap-4 rounded bg-white px-3 py-2">
          <div className="flex-1">
            <BarcodeStrip value={barcode} />
          </div>
          <QrPlaceholder seed={`${product.id}-${barcode}`} />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-[7px] leading-snug text-white/75">
          <div className="flex gap-1">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[#c8a96a]" />
            <p>{posBusiness.address.join(" ")}</p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-[#c8a96a]" />
              {posBusiness.phone}
            </p>
            <p className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-[#c8a96a]" />
              {posBusiness.website}
            </p>
          </div>
        </div>

        <div
          className="-mx-3 mt-3 py-1.5 text-center text-[7px] font-bold uppercase tracking-[0.15em] text-[#1a1c20]"
          style={{ background: GOLD }}
        >
          Premium Furniture for Every Space
        </div>
      </div>
    </TagFrame>
  );
}

export default function PriceTag({ product }) {
  return (
    <div className="price-tag-pair inline-flex flex-wrap items-stretch justify-center gap-6 print:break-inside-avoid">
      <PriceTagFront product={product} />
      <PriceTagBack product={product} />
    </div>
  );
}
