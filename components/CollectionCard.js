"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export default function CollectionCard({ collection }) {
  return (
    <AnimateIn>
      <Link
        href={collection.href}
        className="group glass-card glass-photo-frame luxury-shadow-hover relative block overflow-hidden rounded-3xl"
      >
        <div className="relative aspect-[3/4] md:aspect-[4/5]">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <motion.div
            className="glass-overlay absolute inset-x-3 bottom-3 rounded-2xl p-4 sm:inset-x-4 sm:bottom-4 sm:p-5"
            whileHover={{ y: -4 }}
          >
            <h3 className="font-heading text-xl font-semibold text-white sm:text-2xl">{collection.name}</h3>
            <p className="mt-2 text-sm text-white/80">{collection.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              Shop Collection
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </motion.div>
        </div>
      </Link>
    </AnimateIn>
  );
}
