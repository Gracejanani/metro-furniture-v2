"use client";

import { useState } from "react";
import { PriceTagFront, PriceTagBack } from "./PriceTag";

export default function PriceTagPreview({ product }) {
  const [side, setSide] = useState("front");
  if (!product) return null;

  return (
    <div>
      <div className="no-print mb-3 flex gap-2">
        {["front", "back"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSide(s)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize ${
              side === s ? "bg-[#1a1c20] text-white" : "border border-black/10 bg-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex justify-center rounded-xl bg-[#2a2a2a] p-8">
        {side === "front" ? (
          <PriceTagFront product={product} />
        ) : (
          <PriceTagBack product={product} />
        )}
      </div>
    </div>
  );
}
