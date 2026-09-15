import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const q = request.nextUrl.searchParams.get("q")?.trim() || "";
  let query = supabase
    .from("customers")
    .select("*")
    .eq("is_walk_in", false)
    .order("name")
    .limit(30);

  if (q.length >= 1) {
    const digits = q.replace(/\D/g, "");
    if (digits.length >= 3) {
      query = query.or(
        `name.ilike.%${q}%,mobile.ilike.%${q}%,mobile.ilike.%${digits}%,gstin.ilike.%${q}%`
      );
    } else {
      query = query.or(`name.ilike.%${q}%,gstin.ilike.%${q}%`);
    }
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: "Could not load customers" }, { status: 500 });
  }
  return NextResponse.json({ customers: data || [] });
}

export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = body.name?.trim();
  const mobile = body.mobile?.trim()?.replace(/\s/g, "") || null;
  if (!name) {
    return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
  }
  if (!mobile || mobile.length < 10) {
    return NextResponse.json({ error: "Valid mobile number is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("customers")
    .insert({
      name,
      mobile,
      email: body.email?.trim() || null,
      address: body.address?.trim() || null,
      city: body.city?.trim() || null,
      state: body.state?.trim() || "Tamil Nadu",
      pincode: body.pincode?.trim() || null,
      gstin: body.gstin?.trim() || null,
      is_walk_in: false,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Customer already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Could not save customer" }, { status: 500 });
  }

  return NextResponse.json({ customer: data });
}
