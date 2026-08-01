"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  as = "div",
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

export function FadeIn({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, className, direction = "left", delay = 0 }) {
  const x = direction === "left" ? -32 : direction === "right" ? 32 : 0;
  const y = direction === "up" ? 32 : direction === "down" ? -32 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
