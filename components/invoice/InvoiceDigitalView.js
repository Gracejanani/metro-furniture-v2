"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import InvoiceA4 from "./InvoiceA4";

export default function InvoiceDigitalView({
  invoice,
  items,
  payments,
  customer,
  settings,
  autoDownload,
}) {
  const ref = useRef(null);
  const [downloading, setDownloading] = useState(false);

  async function downloadPdf() {
    if (!ref.current) return;
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: [4, 4, 4, 4],
          filename: `${invoice.invoice_number || "invoice"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(ref.current)
        .save();
    } catch {
      window.print();
    } finally {
      setDownloading(false);
    }
  }

  useEffect(() => {
    if (autoDownload) {
      const t = setTimeout(() => downloadPdf(), 800);
      return () => clearTimeout(t);
    }
  }, [autoDownload]);

  return (
    <div className="min-h-screen bg-[#f0eeea] py-6 px-4">
      <div className="no-print mx-auto mb-4 flex max-w-[210mm] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-bold">{invoice.invoice_number}</h1>
          <p className="text-sm text-body">Metro Furniture — digital tax invoice</p>
        </div>
        <button
          type="button"
          onClick={downloadPdf}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a1c20] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          {downloading ? "Preparing PDF…" : "Download PDF"}
        </button>
      </div>
      <div ref={ref} className="mx-auto max-w-[210mm]">
        <InvoiceA4
          invoice={invoice}
          items={items}
          payments={payments}
          customer={customer}
          settings={settings}
          hideQr
        />
      </div>
    </div>
  );
}
