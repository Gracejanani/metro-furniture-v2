import Link from "next/link";
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
      <WhatsAppIcon />
      <span>{label}</span>
    </Link>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
    >
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 2.08.62 3.99 1.68 5.6L2 22l4.72-1.78a9.86 9.86 0 005.32 1.55c5.46 0 9.89-4.4 9.89-9.84C21.93 6.4 17.5 2 12.04 2zm5.76 13.98c-.24.67-1.4 1.23-1.94 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.39-.14-.2-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.57-.35.76-.35h.55c.17 0 .4-.07.62.47.24.58.81 2 .88 2.14.07.14.12.3.02.48-.1.2-.15.32-.29.49-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.3 1.41.28.14.45.12.61-.07.17-.2.7-.81.89-1.09.19-.28.38-.23.64-.14.26.1 1.66.78 1.94.92.28.14.47.21.54.33.07.12.07.69-.17 1.36z" />
    </svg>
  );
}
