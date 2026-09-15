"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export default function CategoryCard({ category }) {
  return (
    <AnimateIn>
      <Link
        href={`/shop/${category.slug}`}
        className="group relative block overflow-hidden rounded-3xl glass-card luxury-shadow-hover"
      >
        <div className="relative aspect-[4/3]">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <motion.div
            className="absolute inset-x-0 bottom-0 p-5 text-white"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-heading text-xl font-bold">{category.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-white/80">{category.description}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              Explore
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </motion.div>
        </div>
      </Link>
    </AnimateIn>
  );
}
