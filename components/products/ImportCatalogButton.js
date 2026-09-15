"use client";

import { useState } from "react";
import { Database } from "lucide-react";

export default function ImportCatalogButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function runImport() {
    if (
      !window.confirm(
        "Import all products from catalog-products.json into Supabase? Existing SKUs will be updated."
      )
    ) {
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/pos/catalog/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uploadImages: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ error: data.error || "Import failed" });
        return;
      }
      setResult(data);
      window.location.reload();
    } catch {
      setResult({ error: "Import failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={runImport}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl border border-[#c8a96a] bg-white px-4 py-2 text-sm font-semibold text-[#1a1c20] disabled:opacity-50"
      >
        <Database className="h-4 w-4" />
        {loading ? "Importing…" : "Import Catalog JSON"}
      </button>
      {result?.error && <p className="text-xs text-red-600">{result.error}</p>}
      {result?.imported != null && (
        <p className="text-xs text-emerald-700">
          Imported {result.imported} products · {result.imagesUploaded} images
        </p>
      )}
    </div>
  );
}
