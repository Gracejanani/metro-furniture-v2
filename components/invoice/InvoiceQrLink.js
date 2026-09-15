"use client";

import { useEffect, useState } from "react";
import InvoiceQr from "./InvoiceQr";

export default function InvoiceQrLink({ url, size = 72 }) {
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    if (!url) {
      setDataUrl("");
      return;
    }
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      QRCode.toDataURL(url, {
        width: size * 3,
        margin: 1,
        color: { dark: "#111111", light: "#ffffff" },
      }).then((result) => {
        if (!cancelled) setDataUrl(result);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [url, size]);

  if (!url || !dataUrl) {
    return <InvoiceQr seed={url || "metro"} className="h-[72px] w-[72px]" />;
  }

  return (
    <img
      src={dataUrl}
      alt="Scan to open digital invoice and download PDF"
      width={size}
      height={size}
      className="rounded-sm border border-[#e0e0e0] bg-white"
    />
  );
}
