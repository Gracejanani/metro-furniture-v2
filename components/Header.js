"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { business, navLinks } from "@/data/business";
import CallButton from "@/components/CallButton";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const getNavLinkClassName = (active) =>
      `relative rounded-full px-3.5 py-2 text-sm font-medium transition duration-200 ${
      active
        ? "bg-white/10 text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
        : "text-white/75 hover:bg-white/8 hover:text-white"
    }`;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-nav shadow-nav" : "glass-nav-soft"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between gap-3 px-4 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <Link href="/" className="group flex min-w-0 max-w-[min(100%,280px)] shrink items-center gap-2.5 sm:max-w-none sm:gap-3">
          <span className="relative flex h-9 shrink-0 items-center sm:h-10 md:h-11">
            <Image
              src={business.navLogo}
              alt={business.name}
              width={398}
              height={136}
              sizes="(max-width: 640px) 110px, 130px"
              className="h-full w-auto max-h-9 object-contain object-left sm:max-h-10 md:max-h-11"
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={getNavLinkClassName(active)}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CallButton label="Call" className="hidden sm:inline-flex" />
          <button
            type="button"
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-2xl border-white/20 bg-white/10 text-white transition hover:border-accent/50 hover:bg-white/15 hover:text-accent xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 glass-nav xl:hidden"
        >
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                    active ? "bg-accent/15 text-accent" : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 sm:hidden">
              <CallButton className="w-full" />
            </div>
          </nav>
        </motion.div>
      ) : null}
    </header>
  );
}
