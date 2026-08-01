export default function BrandStrip({ brands, dark = false }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-3">
      {brands.map((brand) => (
        <li
          key={brand}
          className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
            dark
              ? "border-white/15 bg-white/5 text-white/85 hover:bg-white/10"
              : "border-border bg-surface text-body shadow-sm hover:shadow-md hover:text-primary"
          }`}
        >
          {brand}
        </li>
      ))}
    </ul>
  );
}
