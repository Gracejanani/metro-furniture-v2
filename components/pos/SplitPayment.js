"use client";

import { Plus, Trash2 } from "lucide-react";
import { formatINR, calculateChange, calculatePaymentBalance } from "@/lib/billing/calculate";

const METHODS = ["CASH", "UPI", "CARD", "BANK_TRANSFER", "OTHER"];

export default function SplitPayment({ grandTotal, payments, onChange }) {
  const { paid, balance } = calculatePaymentBalance(grandTotal, payments);
  const cashLine = payments.find((p) => p.method === "CASH");
  const cashReceived = cashLine?.cashReceived || 0;
  const change =
    cashLine && cashReceived > cashLine.amount
      ? calculateChange(cashReceived, cashLine.amount)
      : 0;

  function updatePayment(index, patch) {
    const next = payments.map((p, i) => (i === index ? { ...p, ...patch } : p));
    onChange(next);
  }

  function addPayment() {
    onChange([
      ...payments,
      { method: "UPI", amount: Math.max(0, balance), reference_number: "", status: "PAID" },
    ]);
  }

  function removePayment(index) {
    onChange(payments.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {payments.map((pay, index) => (
        <div key={index} className="rounded-xl border border-black/8 p-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <select
              value={pay.method}
              onChange={(e) => updatePayment(index, { method: e.target.value })}
              className="rounded-lg border border-black/10 px-2 py-1.5 text-sm"
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>{m.replace("_", " ")}</option>
              ))}
            </select>
            {payments.length > 1 && (
              <button type="button" onClick={() => removePayment(index)} className="text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <input
            type="number"
            min={0}
            value={pay.amount || ""}
            onChange={(e) => updatePayment(index, { amount: parseFloat(e.target.value) || 0 })}
            placeholder="Amount"
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
          {pay.method === "CASH" && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-body">Received</label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5"
                  value={pay.cashReceived || ""}
                  onChange={(e) =>
                    updatePayment(index, { cashReceived: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="rounded-lg bg-[#faf9f6] p-2">
                <p className="text-body">Change</p>
                <p className="font-bold">{formatINR(change)}</p>
              </div>
            </div>
          )}
          {pay.method === "UPI" && (
            <input
              type="text"
              placeholder="Transaction ID / UTR"
              value={pay.reference_number || ""}
              onChange={(e) => updatePayment(index, { reference_number: e.target.value })}
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
            />
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addPayment}
        className="inline-flex items-center gap-1 text-sm font-medium text-[#8a6d3b]"
      >
        <Plus className="h-4 w-4" /> Add Payment Method
      </button>

      <div className="rounded-xl bg-[#faf9f6] p-3 text-sm space-y-1">
        <div className="flex justify-between">
          <span>Total Due</span>
          <span className="font-bold">{formatINR(grandTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Paid</span>
          <span>{formatINR(paid)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Balance</span>
          <span className={balance !== 0 ? "text-red-600" : "text-emerald-600"}>
            {formatINR(balance)}
          </span>
        </div>
      </div>
    </div>
  );
}
