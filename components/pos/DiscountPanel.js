"use client";

export default function DiscountPanel({
  discount,
  discountType,
  onDiscountChange,
  onTypeChange,
}) {
  return (
    <div className="rounded-xl border border-black/8 p-3">
      <p className="mb-2 text-xs font-semibold">Cart Discount</p>
      <div className="flex gap-2">
        <div className="inline-flex rounded-lg border border-black/10 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => onTypeChange("percentage")}
            className={`rounded-md px-2 py-1 ${discountType === "percentage" ? "bg-[#1a1c20] text-white" : ""}`}
          >
            %
          </button>
          <button
            type="button"
            onClick={() => onTypeChange("fixed")}
            className={`rounded-md px-2 py-1 ${discountType === "fixed" ? "bg-[#1a1c20] text-white" : ""}`}
          >
            ₹
          </button>
        </div>
        <input
          type="number"
          min={0}
          value={discount || ""}
          onChange={(e) => onDiscountChange(parseFloat(e.target.value) || 0)}
          placeholder="0"
          className="flex-1 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#c8a96a]/50"
        />
      </div>
    </div>
  );
}
