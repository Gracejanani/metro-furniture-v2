import Link from "next/link";
import PosPageShell from "@/components/pos/PosPageShell";
import { createClient } from "@/lib/supabase/server";

export default async function CustomersPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .eq("is_walk_in", false)
    .order("name")
    .limit(200);

  return (
    <PosPageShell title="Customers" description="Searchable customer directory">
      <div className="overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#faf9f6] text-left text-xs text-body">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">City</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(customers || []).map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3">
                  <Link href={`/customers/${c.id}`} className="font-medium hover:text-[#8a6d3b]">
                    {c.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{c.mobile}</td>
                <td className="px-4 py-3">{c.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PosPageShell>
  );
}
