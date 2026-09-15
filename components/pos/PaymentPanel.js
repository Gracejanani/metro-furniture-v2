"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CircleCheck, Loader2 } from "lucide-react";
import SplitPayment from "./SplitPayment";
import { formatINR } from "@/lib/billing/calculate";
import { usePosCart } from "@/contexts/PosCartContext";

export default function PaymentPanel({ open, onClose, onSuccess }) {
  const { items, billing, customer, isWalkIn, cartDiscount, cartDiscountType, resetAfterSale } =
    usePosCart();
  const [payments, setPayments] = useState([
    { method: "CASH", amount: 0, reference_number: "", status: "PAID" },
  ]);

  useEffect(() => {
    if (open) {
      setPayments([
        {
          method: "CASH",
          amount: billing.grandTotal,
          reference_number: "",
          status: "PAID",
        },
      ]);
    }
  }, [open, billing.grandTotal]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function confirmSale() {
    setLoading(true);
    setError("");
    if (!isWalkIn && !customer?.id) {
      setError("Please select or create a customer before checkout.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/pos/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: isWalkIn ? null : customer?.id,
          is_walk_in: isWalkIn,
          items: items.map((i) => ({
            product_id: i.productId,
            quantity: i.quantity,
            item_discount: i.itemDiscount || 0,
            item_discount_type: i.itemDiscountType || "fixed",
          })),
          cart_discount: cartDiscount,
          cart_discount_type: cartDiscountType,
          payments: payments.map((p) => ({
            method: p.method,
            amount: p.amount,
            reference_number: p.reference_number || null,
            notes: null,
            status: p.method === "UPI" && !p.reference_number ? "PENDING" : "PAID",
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to complete sale");
        return;
      }
      resetAfterSale();
      onSuccess?.(data);
      onClose();
    } catch {
      setError("Unable to complete sale. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="border-b border-black/5 px-4 py-4">
          <h2 className="text-lg font-bold">Payment</h2>
          <p className="text-sm text-body">Split across Cash, UPI, Card & more</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 rounded-xl border border-black/8 bg-[#faf9f6] px-3 py-2 text-sm">
            <p className="text-[10px] font-semibold uppercase text-body">Customer</p>
            <p className="font-semibold">
              {isWalkIn ? "Walk-in Customer" : customer?.name || "—"}
            </p>
            {!isWalkIn && customer?.mobile && (
              <p className="text-xs text-body">{customer.mobile}</p>
            )}
          </div>
          <p className="mb-4 text-2xl font-bold">{formatINR(billing.grandTotal)}</p>
          <SplitPayment
            grandTotal={billing.grandTotal}
            payments={payments}
            onChange={setPayments}
          />
          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}
        </div>
        <div className="border-t border-black/5 p-4 space-y-2">
          <button
            type="button"
            disabled={loading}
            onClick={confirmSale}
            className="w-full rounded-xl bg-[#1a1c20] py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Processing…
              </span>
            ) : (
              <span className="inline-flex items-center justify-center gap-2">
                <CircleCheck className="h-4 w-4" aria-hidden />
                Confirm Sale
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 py-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
