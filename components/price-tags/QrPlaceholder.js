/** Visual QR-style grid for product info (scan URL can be wired later). */
export default function QrPlaceholder({ seed = "metro" }) {
  const size = 11;
  const cells = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const corner =
        (x < 3 && y < 3) || (x >= size - 3 && y < 3) || (x < 3 && y >= size - 3);
      const fill =
        corner ||
        ((h >> ((x + y * size) % 28)) & 1) === 1 ||
        (x + y) % 5 === 0;
      if (fill) cells.push({ x, y });
    }
  }

  return (
    <div className="text-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-16 w-16 bg-white p-1">
        {cells.map((c, i) => (
          <rect key={i} x={c.x} y={c.y} width={1} height={1} fill="#111" />
        ))}
      </svg>
      <p className="mt-1 text-[7px] uppercase tracking-wide text-[#333]">
        Scan for Product Info
      </p>
    </div>
  );
}
