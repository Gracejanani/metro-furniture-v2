"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ProductImageUpload({ value, onChange, slugHint = "product" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `products/${slugHint}-${Date.now()}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from("product-images")
      .upload(path, file, { upsert: true, cacheControl: "3600" });

    if (upErr) {
      setError("Upload failed. Check bucket product-images and your role.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-body">Product image</label>
      <div className="flex flex-wrap items-start gap-4">
        {value ? (
          <div className="relative h-24 w-32 overflow-hidden rounded-lg border bg-muted">
            <Image src={value} alt="" fill className="object-cover" unoptimized />
          </div>
        ) : null}
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-3 text-sm hover:bg-[#faf9f6]">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading…" : "Upload to Supabase"}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
        </label>
      </div>
      <input
        type="url"
        placeholder="Or paste image URL"
        className="w-full rounded-lg border px-3 py-2 text-sm"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
