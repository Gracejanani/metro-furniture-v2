import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { business } from "@/data/business";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export default function WhatsAppButton({
  message = generalEnquiryMessage(),
  label = "WhatsApp",
  variant = "primary",
  className = "",
}) {
  const href = buildWhatsAppUrl(message);

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const variants = {
    primary: "bg-[#25D366] text-white hover:bg-[#1ebe5d] shadow-sm hover:shadow-md active:scale-[0.98]",
    secondary:
      "border-2 border-accent text-foreground hover:bg-accent hover:text-white",
    light: "bg-white text-[#128C7E] hover:bg-muted",
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
      aria-label={`Chat on WhatsApp with ${business.shortName}`}
    >
      <MessageCircleMore className="h-4 w-4" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}
