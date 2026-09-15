"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatINR } from "@/lib/billing/calculate";

export default function SaleSuccess({ sale, onNewSale }) {
  if (!sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-3 text-lg font-bold">Sale Completed</h3>
        <p className="text-sm text-body">{sale.invoice_number}</p>
        <p className="mt-2 text-2xl font-bold">{formatINR(sale.grand_total)}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href={`/sales/${sale.invoice_id}`}
            className="rounded-xl bg-[#1a1c20] py-2.5 text-sm font-semibold text-white"
          >
            View Invoice
          </Link>
          <button
            type="button"
            onClick={onNewSale}
            className="rounded-xl border border-black/10 py-2.5 text-sm font-medium"
          >
            New Sale
          </button>
        </div>
      </div>
    </div>
  );
}
