import Link from "next/link";
import { telHref } from "@/lib/format";
import { business } from "@/data/business";

export default function CallButton({
  phone = business.primaryPhone,
  label = "Call Now",
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-dark shadow-sm shadow-accent/20 hover:shadow-md hover:shadow-accent/25 active:scale-[0.98]",
    secondary:
      "border-2 border-accent/40 text-foreground hover:bg-accent hover:text-white",
    ghost: "bg-muted text-foreground hover:bg-border",
    light: "bg-white text-primary hover:bg-muted",
  };

  return (
    <Link
      href={telHref(phone)}
      className={`${base} ${variants[variant]} ${className}`}
      aria-label={`Call ${phone}`}
    >
      <PhoneIcon />
      <span>{label}</span>
    </Link>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
    >
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z" />
    </svg>
  );
}
