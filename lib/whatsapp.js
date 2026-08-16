import { business } from "@/data/business";

export function buildWhatsAppUrl(message) {
  const text = encodeURIComponent(message);
  return `${business.whatsappUrl}?text=${text}`;
}

export function productEnquiryMessage(product) {
  return `Enquiry about ${product.name} (${product.model || product.slug})`;
}

export function productOrderMessage(product, { mobile, address, name } = {}) {
  const lines = [
    `Order Request — ${product.name}`,
    product.model ? `Model: ${product.model}` : null,
    product.priceLabel && !product.onRequest ? `Price: ${product.priceLabel}` : "Price: Please confirm",
    name ? `Name: ${name}` : null,
    mobile ? `Mobile: ${mobile}` : null,
    address ? `Address: ${address}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

export function generalEnquiryMessage() {
  return `Hi ${business.shortName}, I would like to know more about your furniture.`;
}

export function customDesignMessage(details) {
  return `Hi ${business.shortName}, I need a custom furniture quote.\n${details}`;
}
