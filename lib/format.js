export function formatPrice(amount) {
  if (amount == null) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

export function telHref(phone) {
  return `tel:${String(phone).replace(/\D/g, "")}`;
}
