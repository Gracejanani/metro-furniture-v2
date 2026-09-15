"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatINR } from "@/lib/billing/calculate";

export default function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className="flex gap-3 border-b border-black/5 py-3 last:border-0">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
        {item.image_url ? (
          <Image src={item.image_url} alt="" fill className="object-cover" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{item.name}</p>
        <p className="text-[11px] text-body">{item.sku}</p>
        <p className="mt-1 text-sm font-bold">{formatINR(item.unitPrice)}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="inline-flex items-center rounded-lg border border-black/10 bg-[#faf9f6]">
            <button
              type="button"
              className="p-1.5 hover:bg-black/5"
              onClick={() => onUpdateQty(item.productId, item.quantity - 1)}
              aria-label="Decrease"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                onUpdateQty(item.productId, parseInt(e.target.value, 10) || 1)
              }
              className="w-10 border-x border-black/10 bg-transparent text-center text-xs font-semibold outline-none"
            />
            <button
              type="button"
              className="p-1.5 hover:bg-black/5"
              onClick={() => onUpdateQty(item.productId, item.quantity + 1)}
              aria-label="Increase"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.productId)}
            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
            aria-label="Remove"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
