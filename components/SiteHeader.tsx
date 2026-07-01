"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, assetPath } from "@/lib/types";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "" || pathname === "/index.html";

  return (
    <header className="glass-header fixed top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-btn)] bg-brand shadow-sm">
            <img
              src={assetPath("/assets/logos/shape-rounded/512px.png")}
              alt=""
              className="h-7 w-7 object-contain"
            />
          </div>
          <div>
            <p className="text-lg font-bold text-[#333]">{BRAND.siteTitle}</p>
            <p className="text-xs text-muted">Brand Assets</p>
          </div>
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className={`nav-pill focus-ring font-semibold text-[#333] hover:text-brand ${isHome ? "bg-white/75" : ""}`}
          >
            资源库
          </Link>
          <span className="nav-pill font-medium text-brand">Logo v1.0</span>
        </nav>
      </div>
    </header>
  );
}
