import Link from "next/link";
import { Phone } from "lucide-react";
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
      <Phone className="h-4 w-4" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}
