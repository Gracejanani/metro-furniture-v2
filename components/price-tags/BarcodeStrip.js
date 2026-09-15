/** Decorative barcode bars for print tags (not for scanner validation). */
export default function BarcodeStrip({
  value = "8901234567890",
  height = 48,
  darkText = true,
}) {
  const digits = String(value).replace(/\D/g, "") || "0";
  const bars = [];
  let x = 0;
  for (let i = 0; i < digits.length; i++) {
    const n = parseInt(digits[i], 10);
    const w = 1 + (n % 3);
    bars.push({ x, w, dark: i % 2 === 0 });
    x += w + 1;
  }
  const width = x + 2;

  return (
    <div className="text-center">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto h-12 w-full max-w-[200px]"
        role="img"
        aria-label={`Barcode ${value}`}
      >
        <rect width={width} height={height} fill="white" />
        {bars.map((b, i) =>
          b.dark ? (
            <rect
              key={i}
              x={b.x}
              y={2}
              width={b.w}
              height={height - 4}
              fill="#111"
            />
          ) : null
        )}
      </svg>
      <p
        className={`mt-1 font-mono text-[9px] tracking-[0.2em] ${darkText ? "text-[#111]" : "text-white/90"}`}
      >
        {value}
      </p>
    </div>
  );
}
