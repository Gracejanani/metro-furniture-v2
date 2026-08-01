"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar({
  placeholder = "Search sofas, beds, tables…",
  basePath = "/shop",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" role="search">
      <label htmlFor="product-search" className="sr-only">
        Search furniture
      </label>
      <div className="group flex items-center overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm transition duration-200 focus-within:border-primary/40 focus-within:shadow-md focus-within:ring-4 focus-within:ring-primary/10">
        <span className="pl-4 text-body/50" aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          id="product-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 py-3.5 text-sm text-foreground outline-none placeholder:text-body/50"
        />
        <button
          type="submit"
          className="m-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark active:scale-[0.98]"
        >
          Search
        </button>
      </div>
    </form>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
