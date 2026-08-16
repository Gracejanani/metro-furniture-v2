"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  dispatchLoaderComplete,
  isMobileViewport,
  MAX_LOADER_MS,
  MOBILE_LOADER_MS,
} from "@/lib/loader";

const MOBILE_LOADER = "/mobile-loader.mp4";
const WEB_LOADER = "/web-loader.mp4";

export default function InitialLoader() {
  const [show, setShow] = useState(true);
  const [videoSrc, setVideoSrc] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const dismissedRef = useRef(false);
  const videoRef = useRef(null);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setShow(false);
    dispatchLoaderComplete();
  }, []);

  useEffect(() => {
    const mobile = isMobileViewport();
    setIsMobile(mobile);
    setVideoSrc(mobile ? MOBILE_LOADER : WEB_LOADER);

    const timeoutMs = mobile ? MOBILE_LOADER_MS : MAX_LOADER_MS;
    const fallback = window.setTimeout(dismiss, timeoutMs);
    return () => window.clearTimeout(fallback);
  }, [dismiss]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const playVideo = async () => {
      try {
        video.currentTime = 0;
        await video.play();
      } catch {
        dismiss();
      }
    };

    playVideo();
  }, [videoSrc, dismiss]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex min-h-[100dvh] min-w-full items-center justify-center bg-black"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading Metro Furniture"
        >
          {videoSrc ? (
            <video
              ref={videoRef}
              key={videoSrc}
              src={videoSrc}
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={isMobile ? undefined : dismiss}
              onError={dismiss}
            />
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
