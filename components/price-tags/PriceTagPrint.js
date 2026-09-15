"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import PriceTag from "./PriceTag";

export default function PriceTagPrint() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("name")
      .limit(500)
      .then(({ data }) => setProducts(data || []));
  }, []);

  function toggle(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const toPrint = products.filter((p) => selected.includes(p.id));

  return (
    <div className="space-y-4">
      <div className="no-print max-h-48 overflow-y-auto rounded-xl border bg-white p-3 text-sm">
        {products.map((p) => (
          <label key={p.id} className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              checked={selected.includes(p.id)}
              onChange={() => toggle(p.id)}
            />
            {p.name} ({p.sku})
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="no-print rounded-xl bg-[#1a1c20] px-4 py-2 text-sm font-semibold text-white"
      >
        Print {toPrint.length} tags
      </button>
      <div className="price-tags-print-area flex flex-col gap-10 py-4">
        {toPrint.map((p) => (
          <PriceTag key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
