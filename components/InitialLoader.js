"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { business } from "@/data/business";

export default function InitialLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-background px-4 py-20"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="w-full max-w-md text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl glass-card p-3"
            >
              <Image
                src={business.logo}
                alt={business.name}
                width={96}
                height={96}
                sizes="112px"
                className="object-contain"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-heading text-2xl font-bold text-foreground">
                {business.name}
              </h2>
              <p className="mt-1 text-sm text-body">{business.tagline}</p>
            </motion.div>

            <div className="mx-auto mt-6 h-1 w-44 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                className="h-full rounded-full accent-gradient"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
