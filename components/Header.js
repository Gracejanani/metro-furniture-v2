"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { business, navLinks } from "@/data/business";
import CallButton from "@/components/CallButton";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const getNavLinkClassName = (active) =>
    `relative rounded-xl px-3.5 py-2 text-sm font-medium transition duration-300 ${
      active
        ? "text-accent after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-accent"
        : "text-body hover:text-foreground"
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
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled ? "glass-nav shadow-nav" : "glass-nav-soft"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between gap-3 px-4 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3 md:py-3.5"
        }`}
      >
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
        >
          <span
            className={`relative flex shrink-0 items-center justify-center rounded-2xl glass-card p-1 transition-all duration-300 ${
              scrolled ? "h-10 w-10" : "h-11 w-11 sm:h-12 sm:w-12"
            }`}
          >
            <Image
              src={business.navLogo}
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="min-w-0 leading-tight">
            <span
              className={`block font-heading font-bold tracking-tight text-foreground transition-all duration-300 group-hover:text-accent ${
                scrolled ? "text-base sm:text-lg" : "text-lg sm:text-xl"
              }`}
            >
              {business.name}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-accent/80 sm:block">
              Dharmapuri
            </span>
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl glass-card text-foreground transition hover:border-accent/30 hover:text-accent xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-glass-border glass-nav xl:hidden"
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
                  className={`rounded-2xl px-4 py-3 text-base font-medium transition ${
                    active ? "bg-accent/12 text-accent" : "text-foreground hover:bg-muted/80"
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

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
