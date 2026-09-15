import { siteUrl } from "@/data/business";

export function getDigitalInvoiceUrl(invoice) {
  if (!invoice?.id || !invoice?.digital_token) return null;
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : siteUrl)
  ).replace(/\/$/, "");
  return `${base}/invoice/${invoice.id}?t=${encodeURIComponent(invoice.digital_token)}`;
}

export function getDigitalInvoicePdfHintUrl(invoice) {
  const url = getDigitalInvoiceUrl(invoice);
  return url ? `${url}&download=1` : null;
}
