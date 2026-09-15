"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteProductButton({
  productId,
  productName,
  variant = "deactivate",
  className = "",
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function runDelete(hard) {
    const label = hard ? "permanently delete" : "deactivate";
    if (
      !window.confirm(
        `${hard ? "Permanently delete" : "Deactivate"} "${productName}"?` +
          (hard ? " Only if never sold." : " It will be hidden from POS.")
      )
    ) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/pos/products/${productId}${hard ? "?hard=1" : ""}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) {
        window.alert(data.error || "Could not delete product");
        return;
      }
      router.push("/products");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const compact = variant === "deactivate";

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        type="button"
        disabled={loading}
        onClick={() => runDelete(false)}
        className={
          compact
            ? "inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
            : "inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 disabled:opacity-50"
        }
      >
        {!compact && <Trash2 className="h-4 w-4" />}
        {loading ? "…" : compact ? "Delete" : "Deactivate"}
      </button>
      {variant === "full" && (
        <button
          type="button"
          disabled={loading}
          onClick={() => runDelete(true)}
          className="rounded-xl border border-red-300 px-3 py-2 text-xs text-red-800 disabled:opacity-50"
        >
          Delete permanently (Admin)
        </button>
      )}
    </div>
  );
}
