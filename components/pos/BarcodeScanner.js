"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function BarcodeScanner({ open, onClose, onScan }) {
  const [error, setError] = useState("");
  const scannerRef = useRef(null);
  const containerId = "mf-barcode-scanner";

  useEffect(() => {
    if (!open) return;

    let scanner;
    setError("");

    async function start() {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        scanner = new Html5Qrcode(containerId);
        scannerRef.current = scanner;
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 120 } },
          (decoded) => {
            onScan(decoded);
            onClose();
          },
          () => {}
        );
      } catch {
        setError("Camera unavailable or permission denied.");
      }
    }

    start();

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch(() => {})
          .finally(() => {
            scannerRef.current?.clear?.();
            scannerRef.current = null;
          });
      }
    };
  }, [open, onClose, onScan]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">Scan Barcode</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-black/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div id={containerId} className="overflow-hidden rounded-xl" />
        {error ? (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        ) : (
          <p className="mt-3 text-xs text-body">Point camera at product barcode</p>
        )}
      </div>
    </div>
  );
}
