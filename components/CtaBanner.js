import Link from "next/link";
import { business } from "@/data/business";
import CallButton from "@/components/CallButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimateIn from "@/components/AnimateIn";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 accent-gradient opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      <div className="container relative mx-auto px-4 text-center">
        <AnimateIn>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Ready to Transform Your Home?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90 md:text-lg">
            Visit {business.name} on Salem Main Road or get a personalised quote via WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CallButton className="!bg-white !text-primary hover:!bg-white/90" />
            <WhatsAppButton className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" />
            <Link
              href="/shop"
              className="inline-flex h-11 items-center rounded-2xl border-2 border-white/40 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse Catalog
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
