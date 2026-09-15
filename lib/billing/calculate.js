/** @typedef {'percentage' | 'fixed'} DiscountType */

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * @param {{ unitPrice: number; quantity: number; gstRate: number; itemDiscount?: number; itemDiscountType?: DiscountType }[]} items
 */
export function calculateSubtotal(items) {
  return round2(
    items.reduce((sum, item) => {
      const line = item.unitPrice * item.quantity;
      const disc = applyDiscount(line, item.itemDiscount || 0, item.itemDiscountType || "fixed");
      return sum + (line - disc);
    }, 0)
  );
}

export function applyDiscount(amount, discount, type = "fixed") {
  if (!discount || discount <= 0) return 0;
  if (type === "percentage") {
    return round2(Math.min(amount, amount * (discount / 100)));
  }
  return round2(Math.min(amount, discount));
}

export function calculateDiscount(subtotal, discount, type = "fixed") {
  return applyDiscount(subtotal, discount, type);
}

/**
 * Split GST into CGST/SGST (intra-state) or IGST (inter-state).
 * @param {number} taxableAmount
 * @param {number} gstRate percent e.g. 18
 * @param {'intra' | 'inter'} taxMode
 */
export function calculateTax(taxableAmount, gstRate, taxMode = "intra") {
  const tax = round2(taxableAmount * (gstRate / 100));
  if (taxMode === "inter") {
    return { cgst: 0, sgst: 0, igst: tax, totalTax: tax };
  }
  const half = round2(tax / 2);
  return { cgst: half, sgst: half, igst: 0, totalTax: tax };
}

export function calculateCGST(taxableAmount, gstRate, taxMode = "intra") {
  return calculateTax(taxableAmount, gstRate, taxMode).cgst;
}

export function calculateSGST(taxableAmount, gstRate, taxMode = "intra") {
  return calculateTax(taxableAmount, gstRate, taxMode).sgst;
}

export function calculateIGST(taxableAmount, gstRate, taxMode = "inter") {
  return calculateTax(taxableAmount, gstRate, taxMode).igst;
}

/**
 * @param {{ unitPrice: number; quantity: number; gstRate: number; itemDiscount?: number; itemDiscountType?: DiscountType }[]} items
 */
export function calculateLineItemsTax(items, taxMode = "intra") {
  let cgst = 0;
  let sgst = 0;
  let igst = 0;
  for (const item of items) {
    const line = item.unitPrice * item.quantity;
    const disc = applyDiscount(line, item.itemDiscount || 0, item.itemDiscountType || "fixed");
    const taxable = line - disc;
    const t = calculateTax(taxable, item.gstRate || 0, taxMode);
    cgst += t.cgst;
    sgst += t.sgst;
    igst += t.igst;
  }
  return {
    cgst: round2(cgst),
    sgst: round2(sgst),
    igst: round2(igst),
    totalTax: round2(cgst + sgst + igst),
  };
}

export function calculateGrandTotal({
  subtotal,
  cartDiscount = 0,
  cartDiscountType = "fixed",
  items = [],
  taxMode = "intra",
}) {
  const discount = calculateDiscount(subtotal, cartDiscount, cartDiscountType);
  const taxableAmount = round2(Math.max(0, subtotal - discount));
  const ratio = subtotal > 0 ? taxableAmount / subtotal : 0;
  const adjustedItems = items.map((item) => ({
    ...item,
    unitPrice: round2(item.unitPrice * ratio),
  }));
  const tax = calculateLineItemsTax(adjustedItems, taxMode);
  const beforeRound = round2(taxableAmount + tax.totalTax);
  const grandTotal = Math.round(beforeRound);
  const roundOff = round2(grandTotal - beforeRound);
  return {
    subtotal,
    discount,
    taxableAmount,
    ...tax,
    roundOff,
    grandTotal,
  };
}

export function calculatePaymentBalance(grandTotal, payments = []) {
  const paid = round2(payments.reduce((s, p) => s + (p.amount || 0), 0));
  return { paid, balance: round2(grandTotal - paid) };
}

export function calculateChange(cashReceived, amountDue) {
  const change = round2(cashReceived - amountDue);
  return change > 0 ? change : 0;
}

export function formatINR(amount) {
  if (amount == null || Number.isNaN(amount)) return "₹ 0";
  return `₹ ${Number(amount).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })}`;
}
