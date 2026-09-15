"use client";

import { ChevronRight, User } from "lucide-react";
import { usePosCart } from "@/contexts/PosCartContext";

export default function CartCustomerBar({ onChangeClick }) {
  const { customer, isWalkIn } = usePosCart();

  return (
    <button
      type="button"
      onClick={onChangeClick}
      className="mx-4 mt-3 flex w-[calc(100%-2rem)] items-center gap-3 rounded-xl border border-[#c8a96a]/40 bg-[#faf9f6] px-3 py-2.5 text-left transition-colors hover:border-[#c8a96a]"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isWalkIn ? "bg-[#e8e4dc] text-body" : "bg-[#1a1c20] text-[#c8a96a]"
        }`}
      >
        <User className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-body">
          Customer
        </span>
        {isWalkIn ? (
          <span className="block text-sm font-semibold">Walk-in Customer</span>
        ) : (
          <>
            <span className="block truncate text-sm font-semibold">{customer?.name}</span>
            <span className="block truncate text-xs text-body">
              {[customer?.mobile, customer?.city].filter(Boolean).join(" · ") ||
                "No contact details"}
            </span>
          </>
        )}
      </span>
      <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-[#8a6d3b]">
        Change
        <ChevronRight className="h-4 w-4" />
      </span>
    </button>
  );
}
