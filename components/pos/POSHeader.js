"use client";

import { Bell, ChevronDown, Search } from "lucide-react";
import { posBusiness } from "@/data/pos-business";
import { cn } from "@/lib/utils";

export default function POSHeader({
  search,
  onSearchChange,
  onScanClick,
  barcodeInputRef,
  onBarcodeSubmit,
  className,
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-black/5 bg-[#faf9f6]/95 backdrop-blur-md",
        className
      )}
    >
      <div className="flex flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:gap-4 lg:px-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products, SKU or scan barcode..."
            className="w-full rounded-xl border border-black/8 bg-white py-2.5 pl-10 pr-20 text-sm shadow-sm outline-none focus:border-[#c8a96a]/50 focus:ring-2 focus:ring-[#c8a96a]/15"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-black/10 bg-muted px-1.5 py-0.5 text-[10px] text-body sm:inline">
            Ctrl+K
          </span>
          <input
            ref={barcodeInputRef}
            type="text"
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onBarcodeSubmit?.(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onScanClick}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#c8a96a] bg-white px-4 py-2 text-sm font-medium text-[#1a1c20] shadow-sm hover:bg-[#c8a96a]/5"
          >
            Scan Barcode
          </button>
          <div className="hidden items-center gap-3 text-xs text-body md:flex">
            <span>{dateStr} | {timeStr}</span>
            <button
              type="button"
              className="relative rounded-lg p-2 hover:bg-black/5"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>
          <button
            type="button"
            className="hidden items-center gap-1 rounded-xl border border-black/8 bg-white px-3 py-2 text-xs font-medium sm:flex"
          >
            {posBusiness.storeName}
            <ChevronDown className="h-3.5 w-3.5 text-body" />
          </button>
        </div>
      </div>
    </header>
  );
}
