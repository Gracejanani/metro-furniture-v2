"use client";

import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";

export default function Testimonials({ items }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, i) => (
        <AnimateIn key={item.id} delay={i * 0.1}>
          <motion.li
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-col rounded-3xl glass-card p-6 luxury-shadow-hover"
          >
            <div className="mb-4 flex gap-1 text-accent" aria-label={`${item.rating} out of 5 stars`}>
              {Array.from({ length: item.rating }).map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <blockquote className="flex-1 text-sm leading-relaxed text-body">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="mt-5 border-t border-border pt-4">
              <p className="font-semibold text-foreground">{item.name}</p>
              <p className="text-xs text-body">{item.location}</p>
            </div>
          </motion.li>
        </AnimateIn>
      ))}
    </ul>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}
