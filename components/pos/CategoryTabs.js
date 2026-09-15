"use client";

import {
  Armchair,
  BedDouble,
  Lamp,
  LayoutGrid,
  MoreHorizontal,
  Sofa,
  Table,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  all: LayoutGrid,
  "corner-sofas": Sofa,
  sofas: Sofa,
  mattresses: BedDouble,
  "cots-beds": BedDouble,
  dining: UtensilsCrossed,
  lighting: Lamp,
  chandeliers: Lamp,
  "wall-lights": Lamp,
  chairs: Armchair,
  tables: Table,
  "bathroom-fittings": Table,
  accessories: LayoutGrid,
  more: MoreHorizontal,
};

export default function CategoryTabs({ categories, activeSlug, onChange }) {
  const primarySlugs = new Set([
    "corner-sofas",
    "sofas",
    "mattresses",
    "cots-beds",
    "dining",
    "lighting",
    "chandeliers",
    "chairs",
    "tables",
  ]);
  const primary = categories.filter((c) => primarySlugs.has(c.slug));
  const more = categories.filter((c) => !primarySlugs.has(c.slug));

  const tabs = [
    { slug: "all", name: "All Products" },
    ...primary,
    ...(more.length ? [{ slug: "more", name: "More" }] : []),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {tabs.map((cat) => {
        const Icon = iconMap[cat.slug] || LayoutGrid;
        const active = activeSlug === cat.slug;
        return (
          <button
            key={cat.slug}
            type="button"
            onClick={() => onChange(cat.slug)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors",
              active
                ? "bg-[#1a1c20] text-[#e8d5a8] shadow-sm"
                : "border border-black/8 bg-white text-foreground hover:border-[#c8a96a]/40"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
