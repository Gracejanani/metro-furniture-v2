"use client";

import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { formatINR } from "@/lib/billing/calculate";
import { cn } from "@/lib/utils";

export default function ProductCard({ product, categoryName, onAdd, onView, flash }) {
  const stock = product.stock_quantity ?? 0;
  const min = product.minimum_stock ?? 2;
  const stockLabel =
    stock <= 0
      ? { text: "Out of Stock", className: "text-red-600" }
      : stock <= min
        ? { text: `Low Stock (${stock})`, className: "text-amber-600" }
        : { text: `In Stock (${stock})`, className: "text-emerald-600" };

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm transition-shadow hover:shadow-md",
        flash && "ring-2 ring-[#c8a96a]/60"
      )}
    >
      <button
        type="button"
        className="relative aspect-[4/3] w-full bg-muted text-left"
        onClick={() => onView?.(product)}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 50vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-body">
            No image
          </div>
        )}
        <span
          className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-body opacity-0 transition group-hover:opacity-100"
          aria-hidden
        >
          <Heart className="h-3.5 w-3.5" />
        </span>
      </button>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[10px] font-medium uppercase tracking-wide text-[#c8a96a]">
          {categoryName || "Product"}
        </p>
        <button
          type="button"
          onClick={() => onView?.(product)}
          className="mt-0.5 line-clamp-2 text-left text-sm font-semibold leading-snug hover:text-[#8a6d3b]"
        >
          {product.name}
        </button>
        {(product.material || product.color) && (
          <p className="line-clamp-1 text-[10px] text-body">
            {[product.material, product.color].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="text-[11px] text-body">{product.sku}</p>
        <p className="mt-2 text-base font-bold">{formatINR(product.selling_price)}</p>
        <p className={cn("text-[11px] font-medium", stockLabel.className)}>
          {stockLabel.text}
        </p>
        <button
          type="button"
          disabled={stock <= 0}
          onClick={() => onAdd(product)}
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#1a1c20] py-2 text-xs font-semibold text-white disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
    </article>
  );
}
