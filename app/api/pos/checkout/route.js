import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const FRIENDLY_ERRORS = {
  Unauthorized: "You are not authorized to complete this sale.",
  "Cart is empty": "Add at least one product to the cart.",
  "Payment total does not match invoice total":
    "Payment total does not match invoice total.",
  "Insufficient stock": "Insufficient stock for one or more items.",
  "Discount exceeds allowed limit for your role":
    "Discount exceeds your allowed limit.",
  "Customer not found": "Please select a valid customer or use Walk-in.",
};

export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("create_sale", { payload });

  if (error) {
    const msg = error.message || "";
    for (const [key, friendly] of Object.entries(FRIENDLY_ERRORS)) {
      if (msg.includes(key)) {
        return NextResponse.json({ error: friendly }, { status: 400 });
      }
    }
    if (msg.includes("Product not found")) {
      return NextResponse.json({ error: "A product in the cart is no longer available." }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to complete sale" }, { status: 500 });
  }

  return NextResponse.json({
    invoice_id: data.invoice_id,
    invoice_number: data.invoice_number,
    grand_total: data.grand_total,
  });
}
