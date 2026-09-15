"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

export default function ProductRowActions({ product }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/products/${product.id}`}
        className="inline-flex items-center gap-1 rounded-lg border border-black/10 px-2 py-1.5 text-xs font-medium hover:bg-[#faf9f6]"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </Link>
      <DeleteProductButton
        productId={product.id}
        productName={product.name}
        variant="deactivate"
      />
    </div>
  );
}
