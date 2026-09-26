"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoryTabs({ categories, basePath = "/shop" }) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "all";
  const query = searchParams.get("q");

  function buildHref(slug) {
    const params = new URLSearchParams();
    if (slug !== "all") params.set("category", slug);
    if (query) params.set("q", query);
    const material = searchParams.get("material");
    if (material && material !== "all") params.set("material", material);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const tabs = [{ slug: "all", name: "All" }, ...categories];

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
      role="tablist"
      aria-label="Product categories"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.slug;
        return (
          <Link
            key={tab.slug}
            href={buildHref(tab.slug)}
            role="tab"
            aria-selected={isActive}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive
                ? "premium-button bg-accent text-primary shadow-md shadow-accent/20"
                : "glass-button text-body hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
