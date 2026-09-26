import Link from "next/link";
import { business } from "@/data/business";
import CallButton from "@/components/CallButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimateIn from "@/components/AnimateIn";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div className="container relative mx-auto px-4">
        <AnimateIn>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/20 bg-primary px-5 py-10 text-center shadow-[0_24px_70px_rgba(25,33,28,0.2)] sm:px-10 md:rounded-[2.5rem] md:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_90%_at_12%_0%,rgba(200,169,106,0.22),transparent_60%),radial-gradient(ellipse_60%_80%_at_90%_100%,rgba(134,158,132,0.24),transparent_58%)]" />
            <div className="glass-overlay relative mx-auto max-w-3xl rounded-[1.6rem] px-5 py-8 sm:px-10 sm:py-10">
              <h2 className="font-heading text-3xl font-semibold text-white md:text-4xl">
                Ready to Transform Your Home?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/85 md:text-lg">
                Visit {business.name} on Salem Main Road or get a personalised quote via WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <CallButton variant="light" />
                <WhatsAppButton variant="light" className="!border-white/30 !bg-white/85" />
                <Link
                  href="/shop"
                  className="glass-button inline-flex h-11 items-center justify-center rounded-2xl border-white/40 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
