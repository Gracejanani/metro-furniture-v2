"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { materials } from "@/data/brands";

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

function sortProducts(list, sort) {
  const next = [...list];
  switch (sort) {
    case "price-asc":
      return next.sort(
        (a, b) =>
          (a.price ?? Number.MAX_SAFE_INTEGER) -
          (b.price ?? Number.MAX_SAFE_INTEGER)
      );
    case "price-desc":
      return next.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    case "name-asc":
      return next.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return next.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export default function ShopCatalog({ products, query = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const material = searchParams.get("material") || "all";

  const filtered = useMemo(() => {
    if (!material || material === "all") return products;
    return products.filter(
      (product) =>
        product.material?.toLowerCase() === material.toLowerCase()
    );
  }, [products, material]);

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [products, material, sort]);

  function setMaterial(value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("material");
    else params.set("material", value);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-body/60">
          Material
        </p>
        <div
          className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
          role="group"
          aria-label="Filter by material"
        >
          <FilterChip
            active={material === "all"}
            onClick={() => setMaterial("all")}
            label="All materials"
          />
          {materials.map((m) => (
            <FilterChip
              key={m}
              active={material.toLowerCase() === m.toLowerCase()}
              onClick={() => setMaterial(m)}
              label={m}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-white/70 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-body">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {sorted.length === 0
              ? 0
              : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, sorted.length)}`}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">{sorted.length}</span>
          {query ? (
            <>
              {" "}
              for <span className="font-medium text-primary">“{query}”</span>
            </>
          ) : null}
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="shop-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ProductGrid products={pageItems} />

      {totalPages > 1 ? (
        <nav
          className="flex flex-wrap items-center justify-center gap-2 pt-2"
          aria-label="Pagination"
        >
          <PaginationButton
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            label="Previous"
          />
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === currentPage ? "page" : undefined}
                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${
                  n === currentPage
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "border border-border bg-white text-body hover:border-primary/40 hover:text-primary"
                }`}
              >
                {n}
              </button>
            );
          })}
          <PaginationButton
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            label="Next"
          />
        </nav>
      ) : null}

      <p className="text-center text-xs text-body/50">
        Prefer browsing by room?{" "}
        <Link
          href="/shop/sofa"
          className="font-medium text-sky underline-offset-2 hover:underline"
        >
          Sofas
        </Link>
        ,{" "}
        <Link
          href="/shop/bed"
          className="font-medium text-sky underline-offset-2 hover:underline"
        >
          Beds
        </Link>
        ,{" "}
        <Link
          href="/shop/table"
          className="font-medium text-sky underline-offset-2 hover:underline"
        >
          Tables
        </Link>
      </p>
    </div>
  );
}

function FilterChip({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        active
          ? "bg-primary text-white shadow-sm"
          : "border border-border/80 bg-white text-body hover:border-primary/30 hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

function PaginationButton({ disabled, onClick, label }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-10 items-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}
