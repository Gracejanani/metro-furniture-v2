import Image from "next/image";
import Link from "next/link";
import { branches, business, navLinks } from "@/data/business";
import { brands } from "@/data/brands";
import { formatPhone, telHref } from "@/lib/format";
import BrandStrip from "@/components/BrandStrip";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-primary text-white">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Image
              src={business.logo}
              alt={business.name}
              width={160}
              height={56}
              className="h-14 w-auto rounded-2xl bg-white object-contain p-2"
            />
            <h2 className="font-heading text-xl font-bold">{business.name}</h2>
            <p className="font-tamil text-sm text-white/70">{business.nameTamil}</p>
            <p className="text-sm text-white/85">{business.tagline}</p>
            <p className="text-sm text-accent">{business.taglineSecondary}</p>
            <Link
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-white/75 underline-offset-2 hover:text-accent hover:underline"
            >
              @metrofurnituredpi
            </Link>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Contact
            </h3>
            <ul className="space-y-3">
              {business.phones.map((phone) => (
                <li key={phone}>
                  <Link
                    href={telHref(phone)}
                    className="text-sm font-medium text-white/90 transition hover:text-accent"
                  >
                    +91 {formatPhone(phone)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`mailto:${business.email}`}
                  className="text-sm text-white/75 transition hover:text-accent"
                >
                  {business.email}
                </Link>
              </li>
              <li className="text-sm text-white/70">{business.hours}</li>
            </ul>
          </div>

          <div>
            {branches.map((branch) => (
              <div key={branch.id}>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
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
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">
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
