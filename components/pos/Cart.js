"use client";

import { ArrowRight, Trash2 } from "lucide-react";
import CartItem from "./CartItem";
import DiscountPanel from "./DiscountPanel";
import { formatINR } from "@/lib/billing/calculate";
import CartCustomerBar from "./CartCustomerBar";
import { usePosCart } from "@/contexts/PosCartContext";

export default function Cart({ onCheckout, onCustomerClick }) {
  const {
    items,
    billing,
    cartDiscount,
    cartDiscountType,
    setCartDiscount,
    setCartDiscountType,
    updateQuantity,
    removeItem,
    clearCart,
  } = usePosCart();

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
        <h2 className="text-sm font-bold">
          Current Order ({items.length})
        </h2>
        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear Cart
        </button>
      </div>

      <CartCustomerBar onChangeClick={onCustomerClick} />

      <div className="flex-1 overflow-y-auto px-4">
        {items.length === 0 ? (
          <p className="py-12 text-center text-sm text-body">Cart is empty</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onUpdateQty={updateQuantity}
              onRemove={removeItem}
            />
          ))
        )}
      </div>

      <div className="border-t border-black/5 p-4 space-y-3">
        <DiscountPanel
          discount={cartDiscount}
          discountType={cartDiscountType}
          onDiscountChange={setCartDiscount}
          onTypeChange={setCartDiscountType}
        />
        <dl className="space-y-1 text-xs text-body">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-medium text-foreground">{formatINR(billing.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Discount</dt>
            <dd className="text-red-600">- {formatINR(billing.discount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Taxable Amount</dt>
            <dd>{formatINR(billing.taxableAmount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>GST (18%)</dt>
            <dd>{formatINR(billing.totalTax)}</dd>
          </div>
        </dl>
        <div className="rounded-xl bg-gradient-to-r from-[#c8a96a] to-[#a8843a] px-4 py-3 text-center">
          <p className="text-[10px] font-medium uppercase tracking-wide text-white/80">
            Grand Total
          </p>
          <p className="text-2xl font-bold text-white">
            {formatINR(billing.grandTotal)}
          </p>
        </div>
        <button
          type="button"
          disabled={items.length === 0}
          onClick={onCheckout}
          className="w-full rounded-xl bg-[#1a1c20] py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          <span className="inline-flex items-center justify-center gap-2">
            Proceed to Payment
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="rounded-xl border border-black/10 py-2 text-xs font-medium"
          >
            Save as Quotation
          </button>
          <button
            type="button"
            className="rounded-xl border border-black/10 py-2 text-xs font-medium"
          >
            Hold Order
          </button>
        </div>
      </div>
    </div>
  );
}
