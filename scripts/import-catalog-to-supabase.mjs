/**
 * CLI: node scripts/import-catalog-to-supabase.mjs
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in env.
 */
import { readFile } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const admin = createClient(url, key);
const res = await fetch("http://localhost:3000/api/pos/catalog/import", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ uploadImages: true }),
}).catch(() => null);

if (res?.ok) {
  console.log(await res.json());
  process.exit(0);
}

console.log("Dev server import unavailable — use POST /api/pos/catalog/import from /products UI");
