export default function InvoiceQr({ seed = "invoice", size = 13, className = "h-20 w-20" }) {
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
    <svg viewBox={`0 0 ${size} ${size}`} className={className}>
      <rect width={size} height={size} fill="white" />
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={1} height={1} fill="#111" />
      ))}
    </svg>
  );
}
