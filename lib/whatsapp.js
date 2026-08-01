import { business } from "@/data/business";

export function buildWhatsAppUrl(message) {
  const text = encodeURIComponent(message);
  return `${business.whatsappUrl}?text=${text}`;
}

export function productEnquiryMessage(product) {
  return `Enquiry about ${product.name}`;
}

export function generalEnquiryMessage() {
  return `Hi ${business.shortName}, I would like to know more about your furniture.`;
}

export function customDesignMessage(details) {
  return `Hi ${business.shortName}, I need a custom furniture quote.\n${details}`;
}
