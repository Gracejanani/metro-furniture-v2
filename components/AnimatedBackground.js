"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ORBS = [
  {
    id: "gold-top",
    className: "left-[-12%] top-[-20%] h-[min(70vh,640px)] w-[min(70vh,640px)]",
    background:
      "radial-gradient(circle, rgba(200,169,106,0.22) 0%, rgba(200,169,106,0.06) 42%, transparent 72%)",
    animate: { x: [0, 36, 12, 0], y: [0, 28, 8, 0], scale: [1, 1.06, 1.02, 1] },
    duration: 32,
    parallax: 0.06,
  },
  {
    id: "champagne-right",
    className: "right-[-8%] top-[8%] h-[min(55vh,520px)] w-[min(55vh,520px)]",
    background:
      "radial-gradient(circle, rgba(232,213,168,0.2) 0%, rgba(232,213,168,0.05) 45%, transparent 70%)",
    animate: { x: [0, -28, -10, 0], y: [0, 22, 6, 0], scale: [1, 1.04, 1.01, 1] },
    duration: 38,
    parallax: -0.04,
  },
  {
    id: "gold-bottom",
    className: "bottom-[-18%] left-[18%] h-[min(60vh,560px)] w-[min(60vh,560px)]",
    background:
      "radial-gradient(circle, rgba(200,169,106,0.14) 0%, rgba(200,169,106,0.04) 48%, transparent 74%)",
    animate: { x: [0, 24, -8, 0], y: [0, -20, -6, 0], scale: [1, 1.05, 1, 1] },
    duration: 42,
    parallax: 0.05,
  },
  {
    id: "charcoal-accent",
    className: "bottom-[12%] right-[6%] h-[min(40vh,380px)] w-[min(40vh,380px)]",
    background:
      "radial-gradient(circle, rgba(26,28,32,0.05) 0%, rgba(26,28,32,0.02) 50%, transparent 72%)",
    animate: { x: [0, -18, 0], y: [0, -14, 0], scale: [1, 1.03, 1] },
    duration: 36,
    parallax: -0.03,
  },
];

function AnimatedOrb({ orb, reducedMotion, scrollY }) {
  const y = useTransform(scrollY, [0, 3000], [0, 3000 * orb.parallax]);

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl will-change-transform ${orb.className}`}
      style={{
        background: orb.background,
        y: reducedMotion ? 0 : y,
      }}
      animate={reducedMotion ? undefined : orb.animate}
      transition={
        reducedMotion
          ? undefined
          : { duration: orb.duration, repeat: Infinity, ease: "easeInOut" }
      }
    />
  );
}

export default function AnimatedBackground() {
  const { scrollY } = useScroll();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!mounted) {
    return <div className="pointer-events-none fixed inset-0 -z-10 bg-background" aria-hidden="true" />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />

      <div className="premium-mesh absolute inset-0" />

      {ORBS.map((orb) => (
        <AnimatedOrb
          key={orb.id}
          orb={orb}
          reducedMotion={reducedMotion}
          scrollY={scrollY}
        />
      ))}

      <div className="premium-grid absolute inset-0" />

      <div className="premium-vignette absolute inset-0" />

      <div className="premium-grain absolute inset-0" />

      {!reducedMotion ? <div className="premium-shimmer" /> : null}

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
    </div>
  );
}
