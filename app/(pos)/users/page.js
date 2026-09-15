import PosPageShell from "@/components/pos/PosPageShell";
import { createClient } from "@/lib/supabase/server";

export default async function UsersPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, is_active")
    .order("full_name");

  return (
    <PosPageShell title="Users & Roles" description="Staff access (Admin)">
      <div className="overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#faf9f6] text-left text-xs text-body">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(profiles || []).map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium">{p.full_name}</td>
                <td className="px-4 py-3">{p.email}</td>
                <td className="px-4 py-3">{p.role}</td>
                <td className="px-4 py-3">{p.is_active ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PosPageShell>
  );
}
