"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";

export default function CollectionCard({ collection }) {
  return (
    <AnimateIn>
      <Link
        href={collection.href}
        className="group relative block overflow-hidden rounded-3xl glass-card luxury-shadow-hover"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <motion.div
            className="absolute inset-x-0 bottom-0 p-6"
            whileHover={{ y: -4 }}
          >
            <h3 className="font-heading text-2xl font-bold text-white">{collection.name}</h3>
            <p className="mt-2 text-sm text-white/80">{collection.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent">
              Shop Collection →
            </span>
          </motion.div>
        </div>
      </Link>
    </AnimateIn>
  );
}
