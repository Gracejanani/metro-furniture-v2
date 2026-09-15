import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  catalogItemToProductRow,
  uniqueCatalogCategories,
} from "@/lib/catalog/to-product";
import {
  storageKeyForProduct,
  uploadLocalPublicImage,
} from "@/lib/catalog/upload-product-image";

async function requireManager() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized", status: 401 };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (!profile || !["ADMIN", "MANAGER"].includes(profile.role)) {
    return { error: "Only Admin or Manager can import catalog", status: 403 };
  }
  return { supabase };
}

export async function POST(request) {
  const auth = await requireManager();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let uploadImages = true;
  try {
    const body = await request.json().catch(() => ({}));
    if (body.uploadImages === false) uploadImages = false;
  } catch {
    /* default */
  }

  const catalogPath = path.join(process.cwd(), "data", "catalog-products.json");
  let catalog;
  try {
    const raw = await readFile(catalogPath, "utf8");
    catalog = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Could not read catalog-products.json" }, { status: 500 });
  }

  const admin = createAdminClient();
  const db = admin || auth.supabase;

  const categoryRows = uniqueCatalogCategories(catalog);
  let sort = 0;
  for (const cat of categoryRows) {
    sort += 1;
    await db.from("categories").upsert(
      {
        name: cat.name,
        slug: cat.slug,
        is_active: true,
        sort_order: sort,
      },
      { onConflict: "slug" }
    );
  }

  const { data: categories } = await db.from("categories").select("id, slug");
  const categoryIdBySlug = Object.fromEntries((categories || []).map((c) => [c.slug, c.id]));

  const siteBase = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  let imported = 0;
  let imagesUploaded = 0;
  const errors = [];

  for (const item of catalog) {
    const row = catalogItemToProductRow(item, categoryIdBySlug);
    const { _localImage, _categorySlug, _categoryName, _catalogId, ...product } = row;

    if (uploadImages && admin && _localImage) {
      const key = storageKeyForProduct(product.slug, _localImage);
      const publicUrl = await uploadLocalPublicImage(admin, _localImage, key);
      if (publicUrl) {
        product.image_url = publicUrl;
        imagesUploaded += 1;
      } else if (siteBase) {
        product.image_url = `${siteBase}${_localImage}`;
      }
    } else if (_localImage) {
      product.image_url = siteBase ? `${siteBase}${_localImage}` : _localImage;
    }

    const { error } = await db.from("products").upsert(product, { onConflict: "sku" });
    if (error) {
      errors.push({ sku: product.sku, message: error.message });
      continue;
    }
    imported += 1;
  }

  return NextResponse.json({
    ok: true,
    total: catalog.length,
    imported,
    imagesUploaded,
    categories: categoryRows.length,
    storage: admin ? "service-role" : "anon-fallback",
    errors: errors.slice(0, 10),
  });
}
