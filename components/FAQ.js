"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export default function FAQ({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        return (
          <AnimateIn key={item.id} delay={i * 0.05}>
            <div className="overflow-hidden rounded-2xl glass-card">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-muted/50"
                aria-expanded={isOpen}
              >
                <span className="font-heading text-base font-semibold md:text-lg">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="border-t border-border px-6 pb-5 pt-3 text-sm leading-relaxed text-body md:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </AnimateIn>
        );
      })}
    </div>
  );
}
