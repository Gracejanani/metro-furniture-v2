import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { branches, business, navLinks } from "@/data/business";
import { brands } from "@/data/brands";
import { formatPhone, telHref } from "@/lib/format";
import BrandStrip from "@/components/BrandStrip";

export default function Footer() {
  return (
    <footer className="glass-footer mt-auto text-white">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Image
              src={business.logo}
              alt={business.name}
              width={180}
              height={64}
              className="h-12 w-auto object-contain"
            />
            <h2 className="font-heading text-xl font-bold">{business.name}</h2>
            <p className="font-tamil text-sm text-white/70">{business.nameTamil}</p>
            <p className="text-sm text-white/85">{business.tagline}</p>
            <p className="text-sm text-accent">{business.taglineSecondary}</p>
            <Link
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/75 underline-offset-2 hover:text-accent hover:underline"
            >
              <Instagram className="h-4 w-4 shrink-0" aria-hidden />
              @metrofurnituredpi
            </Link>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-accent">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-accent">
              Contact
            </h3>
            <ul className="space-y-3">
              {business.phones.map((phone) => (
                <li key={phone}>
                  <Link
                    href={telHref(phone)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-accent"
                  >
                    <Phone className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                    +91 {formatPhone(phone)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                  {business.email}
                </Link>
              </li>
              <li className="text-sm text-white/70">{business.hours}</li>
            </ul>
          </div>

          <div>
            {branches.map((branch) => (
              <div key={branch.id}>
                <h3 className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  <MapPin className="h-4 w-4" aria-hidden />
                  Showroom
                </h3>
                <address className="not-italic text-sm leading-relaxed text-white/75">
                  {branch.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="mb-4 text-center text-xs text-accent/80">
            Premium Materials
          </p>
          <BrandStrip brands={brands} dark />
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/55">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p className="mt-1">Salem Main Road, Senthil Nagar | Dharmapuri, TN</p>
        </div>
      </div>
    </footer>
  );
}
