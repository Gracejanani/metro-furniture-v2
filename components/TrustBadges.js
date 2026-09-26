"use client";

import { motion } from "framer-motion";
import { Award, MapPin, Palette, Sparkles } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const BADGE_ICONS = {
  quality: Award,
  range: Sparkles,
  custom: Palette,
  local: MapPin,
};

export default function TrustBadges({ badges }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((badge, i) => {
        const Icon = BADGE_ICONS[badge.id] || Sparkles;
        return (
        <AnimateIn key={badge.id} delay={i * 0.1}>
          <motion.li
            whileHover={{ y: -4 }}
            className="glass-card luxury-shadow-hover flex h-full flex-col rounded-3xl p-6 text-center"
          >
            <div className="glass-icon mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-accent-dark">
              <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className="font-heading text-lg font-bold">{badge.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{badge.description}</p>
          </motion.li>
        </AnimateIn>
        );
      })}
    </ul>
  );
}
