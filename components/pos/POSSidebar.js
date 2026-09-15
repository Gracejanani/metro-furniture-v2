"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { posNavGroups } from "@/lib/pos/navigation";
import { posBusiness } from "@/data/pos-business";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function POSSidebar({ profile }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col bg-[#121316] text-white border-r border-white/5">
      <div className="px-5 pt-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#c8a96a] to-[#8a6d3b] text-sm font-bold text-[#121316]">
            MF
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#c8a96a]">
              METRO
            </p>
            <p className="text-sm font-semibold leading-tight">FURNITURE</p>
          </div>
        </div>
        <p className="mt-2 text-[10px] tracking-wide text-white/45">
          {posBusiness.tagline}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {posNavGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-wider text-white/35">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                        active
                          ? "bg-gradient-to-r from-[#c8a96a]/25 to-transparent text-[#e8d5a8] shadow-[inset_3px_0_0_#c8a96a]"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-90" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/5 p-4 space-y-3">
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="relative h-20 bg-[#1a1c20]">
            <Image
              src="/logo.png"
              alt=""
              fill
              className="object-contain p-4 opacity-80"
            />
          </div>
          <p className="px-3 py-2 text-[10px] text-white/50 leading-snug">
            Crafting Comfort, Defining Lifestyles
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8a96a]/20 text-xs font-semibold text-[#c8a96a]">
            {(profile?.full_name || "U").charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{profile?.full_name || "User"}</p>
            <p className="text-[11px] text-white/45">{profile?.role || "Staff"}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
