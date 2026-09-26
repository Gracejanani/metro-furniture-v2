"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

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
      <div className="glass-button group flex items-center overflow-hidden rounded-2xl transition duration-200 focus-within:border-accent/50 focus-within:shadow-md focus-within:ring-4 focus-within:ring-accent/10">
        <span className="pl-4 text-body/50" aria-hidden="true">
          <Search className="h-5 w-5" aria-hidden />
        </span>
        <input
          id="product-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="input-clear w-full bg-transparent px-3 py-3.5 text-sm text-foreground outline-none placeholder:text-body/50"
        />
        <button
          type="submit"
          className="premium-button m-1.5 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition active:scale-[0.98]"
        >
          Search
        </button>
      </div>
    </form>
  );
}
