import { redirect } from "next/navigation";
import POSSidebar from "@/components/pos/POSSidebar";
import POSMobileNav from "@/components/pos/POSMobileNav";
import { PosCartProvider } from "@/contexts/PosCartContext";
import { getProfile } from "@/lib/pos/getProfile";
import { createClient } from "@/lib/supabase/server";
import "@/app/pos.css";

export const metadata = {
  title: "Metro POS",
  robots: { index: false, follow: false },
};

export default async function PosLayout({ children }) {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("business_settings")
    .select("tax_mode")
    .maybeSingle();
  const taxMode = settings?.tax_mode || "intra";

  return (
    <PosCartProvider taxMode={taxMode}>
      <div className="pos-shell flex min-h-screen bg-[#faf9f6] font-[family-name:var(--font-pos)] text-foreground">
        <POSSidebar profile={profile} />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col pb-16 lg:pb-0">
          {children}
        </div>
        <POSMobileNav />
      </div>
    </PosCartProvider>
  );
}
