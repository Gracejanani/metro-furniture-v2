import "@/app/pos.css";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#121316] font-[family-name:var(--font-pos)] text-white">
      {children}
    </div>
  );
}
