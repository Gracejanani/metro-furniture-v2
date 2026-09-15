"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  categoryMap,
  onAdd,
  onView,
  flashId,
}) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-white py-16 text-center text-sm text-body">
        No products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          categoryName={categoryMap?.[p.category_id]}
          onAdd={onAdd}
          onView={onView}
          flash={flashId === p.id}
        />
      ))}
    </div>
  );
}
