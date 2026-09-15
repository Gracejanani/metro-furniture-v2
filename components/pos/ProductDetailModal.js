"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { formatINR } from "@/lib/billing/calculate";

export default function ProductDetailModal({ product, categoryName, onClose, onAdd }) {
  if (!product) return null;

  const stock = product.stock_quantity ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="relative aspect-[16/10] bg-muted">
          {product.image_url ? (
            <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="512px" unoptimized />
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#c8a96a]">
            {categoryName || product.categories?.name || "Product"}
          </p>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-sm text-body">SKU: {product.sku}</p>
          {product.description && (
            <p className="text-sm text-body whitespace-pre-line line-clamp-6">{product.description}</p>
          )}
          <dl className="grid grid-cols-2 gap-2 text-xs">
            {product.material && (
              <>
                <dt className="text-body">Material</dt>
                <dd className="font-medium">{product.material}</dd>
              </>
            )}
            {product.color && (
              <>
                <dt className="text-body">Color</dt>
                <dd className="font-medium">{product.color}</dd>
              </>
            )}
            {product.size && (
              <>
                <dt className="text-body">Size</dt>
                <dd className="font-medium">{product.size}</dd>
              </>
            )}
            <dt className="text-body">GST</dt>
            <dd className="font-medium">{product.gst_rate ?? 18}%</dd>
            <dt className="text-body">Stock</dt>
            <dd className="font-medium">{stock}</dd>
          </dl>
          <div className="flex items-center justify-between border-t pt-3">
            <div>
              <p className="text-xs text-body line-through">MRP {formatINR(product.mrp)}</p>
              <p className="text-2xl font-bold">{formatINR(product.selling_price)}</p>
            </div>
            <button
              type="button"
              disabled={stock <= 0}
              onClick={() => {
                onAdd(product);
                onClose();
              }}
              className="rounded-xl bg-[#1a1c20] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
