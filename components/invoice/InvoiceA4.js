import Image from "next/image";
import {
  Armchair,
  Diamond,
  Globe,
  Home,
  Leaf,
  MapPin,
  Phone,
  Check,
  ShoppingBag,
  User,
} from "lucide-react";
import { business } from "@/data/business";
import { posBusiness } from "@/data/pos-business";
import { formatINR } from "@/lib/billing/calculate";
import InvoiceQrLink from "./InvoiceQrLink";
import { getDigitalInvoiceUrl } from "@/lib/invoice/digital-link";

const GOLD = "#b59461";
const CHARCOAL = "#1a1a1a";
const HERO_IMAGE = "/Gallery/IMG-20260815-WA0030.jpg";

const DEFAULT_TERMS = [
  "Goods once sold will not be taken back or exchanged except manufacturing defects.",
  "Warranty as per manufacturer / store policy only.",
  "Installation charges, if any, are not included unless specified.",
  "Please retain this invoice for warranty and service claims.",
  "Subject to Dharmapuri jurisdiction.",
];

function MetaRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#e8e4dc] py-1.5 text-[11px]">
      <span className="text-[#666]">{label}</span>
      <span className="font-semibold text-right text-[#111]">{value}</span>
    </div>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <div
      className={`flex justify-between gap-6 py-1 text-[11px] ${bold ? "font-bold" : ""}`}
    >
      <span className="text-[#555]">{label}</span>
      <span className="tabular-nums text-[#111]">{value}</span>
    </div>
  );
}

export default function InvoiceA4({
  invoice,
  items,
  payments,
  customer,
  settings,
  cashier,
  hideQr = false,
}) {
  const digitalUrl = getDigitalInvoiceUrl(invoice);
  const created = new Date(invoice.created_at);
  const dateStr = created.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = created.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const billTo = customer?.name || (invoice.is_walk_in ? "Walk-in Customer" : "—");
  const phone = customer?.mobile || "—";
  const address =
    customer?.address ||
    [customer?.city, customer?.state, customer?.pincode].filter(Boolean).join(", ") ||
    "—";
  const gstin = customer?.gstin || "—";

  const totalPaid = (payments || []).reduce((s, p) => s + Number(p.amount || 0), 0);
  const balance = Number(invoice.grand_total) - totalPaid;
  const paid =
    invoice.payment_status === "PAID" || balance <= 0.01;

  const terms = settings?.terms_text
    ? settings.terms_text.split("\n").filter(Boolean)
    : DEFAULT_TERMS;

  const paymentStatusLabel = paid ? "Paid" : invoice.payment_status || "Pending";
  const gstLabel =
    items?.[0]?.gst_rate != null ? `GST (${items[0].gst_rate}%)` : "GST";

  return (
    <div
      className="invoice-a4 mx-auto w-full max-w-[210mm] overflow-hidden bg-white text-[#111] shadow-xl print:shadow-none"
      style={{ printColorAdjust: "exact" }}
    >
      {/* —— Header —— */}
      <div className="grid min-h-[130px] grid-cols-1 md:grid-cols-[58%_42%]">
        <div
          className="relative flex flex-col justify-between px-6 py-5 text-white"
          style={{ backgroundColor: CHARCOAL }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, #2a2a2a 0, #2a2a2a 1px, transparent 1px, transparent 6px)",
            }}
          />
          <div className="relative z-10 flex items-start gap-4">
            <div className="relative h-14 w-36 shrink-0">
              <Image
                src={business.navLogo}
                alt={business.name}
                width={398}
                height={136}
                className="h-14 w-auto object-contain object-left"
              />
            </div>
            <p
              className="mt-1 max-w-[200px] font-[family-name:var(--font-heading)] text-[13px] italic leading-snug"
              style={{ color: GOLD }}
            >
              Crafting Comfort,
              <br />
              Defining Lifestyles.
            </p>
          </div>
          <div
            className="absolute bottom-0 right-0 top-0 w-8 opacity-90"
            style={{
              background: `linear-gradient(135deg, transparent 40%, ${GOLD} 40%, ${GOLD} 42%, transparent 42%)`,
            }}
            aria-hidden
          />
        </div>
        <div className="relative min-h-[130px]">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            className="object-cover"
            sizes="42vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent" />
          <p
            className="absolute bottom-4 right-4 max-w-[160px] text-right text-[10px] font-bold uppercase leading-snug tracking-[0.12em] text-white"
          >
            Premium Furniture
            <br />
            for Every Space
          </p>
        </div>
      </div>

      {/* —— Contact + title + meta —— */}
      <div className="grid border-b border-[#e0e0e0] md:grid-cols-[1fr_auto_1fr]">
        <div className="space-y-2 border-[#e0e0e0] px-5 py-4 md:border-r">
          <p className="flex items-start gap-2 text-[10px] leading-snug text-[#444]">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: CHARCOAL }}
            >
              <MapPin className="h-3 w-3" />
            </span>
            {posBusiness.address.join(" ")}
          </p>
          <p className="flex items-center gap-2 text-[10px] text-[#444]">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: CHARCOAL }}
            >
              <Phone className="h-3 w-3" />
            </span>
            {posBusiness.phone}
          </p>
          <p className="flex items-center gap-2 text-[10px] text-[#444]">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: CHARCOAL }}
            >
              <Globe className="h-3 w-3" />
            </span>
            {posBusiness.website}
            {settings?.gstin ? ` · GSTIN ${settings.gstin}` : ""}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center border-[#e0e0e0] px-6 py-4 md:border-r">
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-wide">
            TAX INVOICE
          </h1>
          <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#888]">
            Furniture | Lighting | Interiors
          </p>
        </div>

        <div className="px-5 py-4">
          <MetaRow label="Invoice No" value={invoice.invoice_number} />
          <MetaRow label="Date" value={dateStr} />
          <MetaRow label="Time" value={timeStr} />
          <MetaRow label="Cashier" value={cashier?.full_name || "—"} />
          <MetaRow label="Payment Status" value={paymentStatusLabel} />
        </div>
      </div>

      {/* —— Bill to / delivery / order —— */}
      <div className="grid border-b border-[#e0e0e0] text-[10px] md:grid-cols-3">
        <div className="border-[#e0e0e0] px-4 py-3 md:border-r">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-[#888]">
            Bill To
          </p>
          <p className="flex items-center gap-1.5 font-bold text-[12px]">
            <User className="h-3.5 w-3.5 text-[#b59461]" /> {billTo}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[#555]">
            <Phone className="h-3 w-3" /> {phone}
          </p>
          <p className="mt-1 flex items-start gap-1.5 text-[#555]">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0" /> {address}
          </p>
          <p className="mt-1 text-[#555]">GSTIN: {gstin}</p>
        </div>
        <div className="border-[#e0e0e0] px-4 py-3 md:border-r">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-[#888]">
            Delivery Address
          </p>
          <p className="flex items-start gap-1.5 text-[#555]">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[#b59461]" />
            {customer?.address ? address : "Same as billing address"}
          </p>
        </div>
        <div className="px-4 py-3">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-[#888]">
            Order Type
          </p>
          <p className="flex items-center gap-1.5 font-semibold">
            <ShoppingBag className="h-3.5 w-3.5 text-[#b59461]" />
            {invoice.is_walk_in ? "Walk-in Customer" : "Registered Customer"}
          </p>
        </div>
      </div>

      {/* —— Line items —— */}
      <table className="w-full border-collapse text-[10px]">
        <thead>
          <tr style={{ backgroundColor: GOLD }} className="text-[#1a1a1a]">
            {["S.No", "Product", "SKU", "Qty", "Unit Price", "Discount", gstLabel, "Amount"].map(
              (h, i) => (
                <th
                  key={h}
                  className={`px-2 py-2.5 font-bold uppercase tracking-wide ${i >= 3 ? "text-right" : "text-left"}`}
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const thumb = item.products?.image_url;
            const sub =
              item.products?.material ||
              (item.product_name?.toLowerCase().includes("sofa")
                ? "Modern Fabric Sofa"
                : "");
            return (
              <tr
                key={item.id}
                className={i % 2 === 0 ? "bg-white" : "bg-[#f7f6f3]"}
              >
                <td className="px-2 py-2.5 align-top">{i + 1}</td>
                <td className="px-2 py-2.5">
                  <div className="flex gap-2">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded border border-[#e0e0e0] bg-white">
                      {thumb ? (
                        <Image src={thumb} alt="" fill className="object-cover" sizes="44px" />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-bold text-[11px]">{item.product_name}</p>
                      {sub && <p className="text-[9px] text-[#777]">{sub}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2.5 align-top">{item.sku}</td>
                <td className="px-2 py-2.5 text-right align-top">{item.quantity}</td>
                <td className="px-2 py-2.5 text-right align-top tabular-nums">
                  {formatINR(item.unit_price)}
                </td>
                <td className="px-2 py-2.5 text-right align-top tabular-nums">
                  {formatINR(item.item_discount)}
                </td>
                <td className="px-2 py-2.5 text-right align-top">{item.gst_rate}%</td>
                <td className="px-2 py-2.5 text-right align-top font-semibold tabular-nums">
                  {formatINR(item.line_total)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* —— Thank you + totals —— */}
      <div className="grid gap-4 border-b border-[#e0e0e0] px-5 py-5 md:grid-cols-2">
        <div>
          <p
            className="font-[family-name:var(--font-heading)] text-xl italic"
            style={{ color: GOLD }}
          >
            Thank you for choosing Metro Furniture!
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[8px] text-[#555]">
            {[
              { icon: Diamond, label: "Premium Quality" },
              { icon: Armchair, label: "Stylish Designs" },
              { icon: Leaf, label: "Long Lasting" },
              { icon: Home, label: "Beautiful Homes" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="h-4 w-4" style={{ color: GOLD }} strokeWidth={1.5} />
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="md:pl-8">
          <SummaryRow label="Subtotal" value={formatINR(invoice.subtotal)} />
          <SummaryRow label="Total Discount" value={`- ${formatINR(invoice.discount)}`} />
          <SummaryRow label="Taxable Amount" value={formatINR(invoice.taxable_amount)} />
          <SummaryRow label="CGST" value={formatINR(invoice.cgst)} />
          <SummaryRow label="SGST" value={formatINR(invoice.sgst)} />
          {Number(invoice.igst) > 0 && (
            <SummaryRow label="IGST" value={formatINR(invoice.igst)} />
          )}
          <SummaryRow label="Round Off" value={formatINR(invoice.round_off)} />
          <div
            className="mt-2 flex items-center justify-between rounded-sm px-4 py-2.5 text-white"
            style={{ backgroundColor: CHARCOAL }}
          >
            <span className="text-sm font-bold">Grand Total</span>
            <span className="text-xl font-bold tabular-nums" style={{ color: GOLD }}>
              {formatINR(invoice.grand_total)}
            </span>
          </div>
        </div>
      </div>

      {/* —— Payments + summary —— */}
      <div className="grid gap-4 px-5 py-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-[#888]">
            Payment Details
          </p>
          <table className="w-full border-collapse text-[10px]">
            <thead>
              <tr className="border-b border-[#e0e0e0] text-left text-[#666]">
                <th className="py-1.5 font-semibold">Payment Method</th>
                <th className="py-1.5 font-semibold">Amount</th>
                <th className="py-1.5 font-semibold">Reference / UTR</th>
                <th className="py-1.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {(payments || []).map((p) => (
                <tr key={p.id} className="border-b border-[#eee]">
                  <td className="py-2">{p.method?.replace("_", " ")}</td>
                  <td className="py-2 tabular-nums">{formatINR(p.amount)}</td>
                  <td className="py-2">{p.reference_number || "—"}</td>
                  <td className="py-2">
                    <span className="inline-flex items-center gap-1">
                      <span
                        className={`h-2 w-2 rounded-full ${p.status === "PAID" ? "bg-emerald-500" : "bg-amber-400"}`}
                      />
                      {p.status || "Paid"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col justify-center">
          <div className="rounded border border-[#e0e0e0] bg-[#faf9f6] p-4 text-[11px]">
            <SummaryRow label="Total Paid" value={formatINR(totalPaid)} />
            <SummaryRow label="Balance" value={formatINR(Math.max(0, balance))} bold />
            {paid && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                </span>
                Payment Completed
              </p>
            )}
          </div>
        </div>
      </div>

      {/* —— Footer —— */}
      <div className="grid gap-4 border-t border-[#e0e0e0] px-5 py-4 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-[#888]">
            Terms &amp; Conditions
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-[9px] leading-relaxed text-[#555]">
            {terms.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-[9px] text-[#888]">Authorized Signature</p>
            <p
              className="mt-2 font-[family-name:var(--font-heading)] text-2xl italic"
              style={{ color: GOLD }}
            >
              Metro
            </p>
            <p className="text-[9px] text-[#666]">For Metro Furniture</p>
          </div>
        </div>
        {!hideQr && (
          <div className="flex flex-col items-center justify-end text-center">
            <InvoiceQrLink url={digitalUrl} size={72} />
            <p className="mt-1 text-[8px] uppercase tracking-wide text-[#777]">
              Scan for Digital Copy
            </p>
            <p className="mt-0.5 max-w-[100px] text-[7px] leading-tight text-[#999]">
              Opens invoice &amp; PDF download
            </p>
          </div>
        )}
      </div>

      <div
        className="flex flex-col items-center justify-between gap-2 px-5 py-2.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-white sm:flex-row"
        style={{ backgroundColor: CHARCOAL }}
      >
        <span style={{ color: GOLD }}>
          Metro Furniture | Modern | Quality | Interiors
        </span>
        <span className="text-white/80">{posBusiness.website}</span>
      </div>
    </div>
  );
}
