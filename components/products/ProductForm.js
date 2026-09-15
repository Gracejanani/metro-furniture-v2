"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductImageUpload from "./ProductImageUpload";
import DeleteProductButton from "./DeleteProductButton";
import { Loader2, Save, X } from "lucide-react";
import { slugify } from "@/lib/products/normalize-payload";

export default function ProductForm({ categories, initial }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [form, setForm] = useState({
    name: initial?.name || "",
    sku: initial?.sku || "",
    product_code: initial?.product_code || "",
    barcode: initial?.barcode || "",
    category_id: initial?.category_id || categories[0]?.id || "",
    selling_price: initial?.selling_price ?? "",
    mrp: initial?.mrp ?? "",
    offer_price: initial?.offer_price ?? "",
    cost_price: initial?.cost_price ?? "",
    gst_rate: initial?.gst_rate ?? 18,
    stock_quantity: initial?.stock_quantity ?? 0,
    minimum_stock: initial?.minimum_stock ?? 2,
    material: initial?.material || "",
    color: initial?.color || "",
    size: initial?.size || "",
    dimensions: initial?.dimensions || "",
    warranty: initial?.warranty || "",
    description: initial?.description || "",
    image_url: initial?.image_url || "",
    unit: initial?.unit || "pc",
    is_active: initial?.is_active ?? true,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isEdit ? `/api/pos/products/${initial.id}` : "/api/pos/products";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not save product");
        setLoading(false);
        return;
      }
      router.push("/products");
      router.refresh();
    } catch {
      setError("Could not save product. Try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4 rounded-2xl border bg-white p-6">
      <ProductImageUpload
        value={form.image_url}
        onChange={(url) => setForm({ ...form, image_url: url })}
        slugHint={slugify(form.name || "product")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["name", "Name *"],
          ["sku", "SKU *"],
          ["product_code", "Product code"],
          ["barcode", "Barcode"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="text-xs text-body">{label}</label>
            <input
              required={key === "name" || key === "sku"}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
        <div>
          <label className="text-xs text-body">Category</label>
          <select
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-body">Unit</label>
          <select
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          >
            <option value="pc">pc</option>
            <option value="set">set</option>
          </select>
        </div>
        {[
          ["selling_price", "Selling price *"],
          ["mrp", "MRP"],
          ["offer_price", "Offer price"],
          ["cost_price", "Cost price"],
          ["gst_rate", "GST %"],
          ["stock_quantity", "Stock"],
          ["minimum_stock", "Min stock"],
          ["material", "Material"],
          ["color", "Color"],
          ["size", "Size / configuration"],
          ["dimensions", "Dimensions"],
          ["warranty", "Warranty"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="text-xs text-body">{label}</label>
            <input
              type={
                ["selling_price", "mrp", "offer_price", "cost_price", "gst_rate", "stock_quantity", "minimum_stock"].includes(key)
                  ? "number"
                  : "text"
              }
              required={key === "selling_price"}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>

      {isEdit && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          Active (show in POS)
        </label>
      )}

      <div>
        <label className="text-xs text-body">Description</label>
        <textarea
          rows={4}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1a1c20] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" aria-hidden />
              {isEdit ? "Update product" : "Add product"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2 text-sm"
        >
          <X className="h-4 w-4" aria-hidden />
          Cancel
        </button>
        {isEdit && (
          <DeleteProductButton
            productId={initial.id}
            productName={initial.name}
            variant="full"
            className="ml-auto"
          />
        )}
      </div>
    </form>
  );
}
