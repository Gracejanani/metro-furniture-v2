"use client";

import { useState } from "react";
import InvoiceA4 from "./InvoiceA4";
import InvoiceThermal80 from "./InvoiceThermal80";
import InvoiceThermal58 from "./InvoiceThermal58";

export default function InvoicePreview({
  invoice,
  items,
  payments,
  customer,
  settings,
  cashier,
}) {
  const [format, setFormat] = useState("a4");

  function handlePrint() {
    window.print();
  }

  return (
    <div>
      <div className="no-print mb-4 flex flex-wrap gap-2">
        {["a4", "80mm", "58mm"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFormat(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              format === f ? "bg-[#1a1c20] text-white" : "border border-black/10 bg-white"
            }`}
          >
            {f === "a4" ? "A4" : f}
          </button>
        ))}
        <button
          type="button"
          onClick={handlePrint}
          className="ml-auto rounded-lg bg-[#c8a96a] px-4 py-1.5 text-xs font-semibold text-[#121316]"
        >
          Print
        </button>
      </div>
      {format === "a4" && (
        <InvoiceA4
          invoice={invoice}
          items={items}
          payments={payments}
          customer={customer}
          settings={settings}
          cashier={cashier}
        />
      )}
      {format === "80mm" && (
        <InvoiceThermal80
          invoice={invoice}
          items={items}
          payments={payments}
          customer={customer}
        />
      )}
      {format === "58mm" && (
        <InvoiceThermal58
          invoice={invoice}
          items={items}
          payments={payments}
          customer={customer}
        />
      )}
    </div>
  );
}
