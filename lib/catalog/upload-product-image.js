import fs from "fs";
import path from "path";

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function uploadLocalPublicImage(admin, publicPath, storageKey) {
  if (!admin || !publicPath) return null;
  const relative = publicPath.replace(/^\//, "");
  const full = path.join(process.cwd(), "public", relative);
  if (!fs.existsSync(full)) return null;

  const ext = path.extname(full).toLowerCase();
  const contentType = MIME[ext] || "image/jpeg";
  const buffer = fs.readFileSync(full);

  const { error } = await admin.storage.from("product-images").upload(storageKey, buffer, {
    contentType,
    upsert: true,
    cacheControl: "3600",
  });

  if (error) {
    console.warn("Storage upload failed:", storageKey, error.message);
    return null;
  }

  const { data } = admin.storage.from("product-images").getPublicUrl(storageKey);
  return data.publicUrl;
}

export function storageKeyForProduct(slug, publicPath) {
  const ext = path.extname(publicPath || ".jpg") || ".jpg";
  return `catalog/${slug}${ext}`;
}
