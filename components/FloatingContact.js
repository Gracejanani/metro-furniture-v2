import Link from "next/link";
import { Phone, MessageCircleMore } from "lucide-react";
import { business } from "@/data/business";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

export default function FloatingContact() {
  const whatsappHref = buildWhatsAppUrl(generalEnquiryMessage());

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <Link
        href={`tel:${business.primaryPhone}`}
        aria-label={`Call ${business.primaryPhone}`}
        className="glass-fab flex h-13 w-13 items-center justify-center rounded-full bg-primary text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark animate-float-soft"
      >
        <Phone size={22} strokeWidth={2.2} />
      </Link>

      <Link
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="glass-fab flex h-13 w-13 items-center justify-center rounded-full bg-[#168a4a] text-white shadow-[0_12px_30px_rgba(22,138,74,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#11733d] animate-wa-pulse"
      >
        <MessageCircleMore size={22} strokeWidth={2.2} />
      </Link>
    </div>
  );
}
