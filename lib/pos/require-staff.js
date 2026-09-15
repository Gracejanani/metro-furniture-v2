import { createClient } from "@/lib/supabase/server";

export async function getStaffProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized", status: 401 };

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("auth_user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (!profile) return { error: "Profile not found", status: 403 };
  return { supabase, profile, user };
}

export function canManageProducts(role) {
  return role === "ADMIN" || role === "MANAGER";
}

export function canDeleteProducts(role) {
  return role === "ADMIN" || role === "MANAGER";
}
