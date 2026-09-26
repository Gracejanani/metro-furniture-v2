"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, Maximize2, Minimize2, Move, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoomPreview({ productImage, productName }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(0.45);
  const [opacity, setOpacity] = useState(0.85);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const dragRef = useRef(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
    } catch {
      setError("Camera access denied. Allow camera permission to preview in your room.");
    }
  }, []);

  useEffect(() => {
    if (open) startCamera();
    return () => stopCamera();
  }, [open, startCamera, stopCamera]);

  const onPointerDown = (e) => {
    e.preventDefault();
    dragRef.current = {
      startX: e.clientX - pos.x,
      startY: e.clientY - pos.y,
    };
  };

  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    setPos({
      x: e.clientX - dragRef.current.startX,
      y: e.clientY - dragRef.current.startY,
    });
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const reset = () => {
    setScale(0.45);
    setOpacity(0.85);
    setPos({ x: 0, y: 0 });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass-button group flex w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent hover:shadow-md"
      >
        <Camera className="h-4 w-4 text-accent transition group-hover:scale-110" />
        Try in Your Room
        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
          AR Preview
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md">
            <div>
              <p className="text-sm font-semibold text-white">Room Preview</p>
              <p className="text-xs text-white/60">{productName}</p>
            </div>
            <button
              type="button"
              onClick={() => { stopCamera(); setOpen(false); }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close room preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex-1 overflow-hidden"
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {error ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                <Camera className="h-12 w-12 text-white/40" />
                <p className="max-w-sm text-sm text-white/70">{error}</p>
                <Button onClick={startCamera} className="rounded-2xl text-primary">
                  Retry Camera
                </Button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {active ? (
                  <div
                    className="absolute left-1/2 top-1/2 touch-none cursor-grab active:cursor-grabbing"
                    style={{
                      transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${scale})`,
                      opacity,
                    }}
                    onPointerDown={onPointerDown}
                  >
                    <div className="relative h-48 w-48 sm:h-64 sm:w-64">
                      <Image
                        src={productImage}
                        alt={productName}
                        fill
                        className="object-contain drop-shadow-2xl"
                        sizes="256px"
                        unoptimized
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-1 text-[10px] font-medium text-white/80">
                      <Move className="h-3 w-3" /> Drag to position
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>

          <div className="border-t border-white/10 bg-black/80 px-4 py-4 backdrop-blur-md">
            <div className="mx-auto flex max-w-lg flex-col gap-4">
              <div className="flex items-center gap-3">
                <ZoomOut className="h-4 w-4 shrink-0 text-white/60" />
                <input
                  type="range"
                  min="0.15"
                  max="1.2"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="flex-1 accent-accent"
                  aria-label="Product size"
                />
                <ZoomIn className="h-4 w-4 shrink-0 text-white/60" />
              </div>
              <div className="flex items-center gap-3">
                <Minimize2 className="h-4 w-4 shrink-0 text-white/60" />
                <input
                  type="range"
                  min="0.3"
                  max="1"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="flex-1 accent-accent"
                  aria-label="Product opacity"
                />
                <Maximize2 className="h-4 w-4 shrink-0 text-white/60" />
              </div>
              <button
                type="button"
                onClick={reset}
                className="flex items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
              >
                <RotateCcw className="h-4 w-4" /> Reset position
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
