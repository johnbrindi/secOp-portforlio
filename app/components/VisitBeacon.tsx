"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Reports one visit per browser session on public pages, for the admin's
// "new visitor" notification (app/api/visit/route.ts).
export default function VisitBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    try {
      if (sessionStorage.getItem("visit-reported")) return;
      sessionStorage.setItem("visit-reported", "1");
    } catch {
      return;
    }
    const body = JSON.stringify({ path: pathname, referrer: document.referrer || null });
    navigator.sendBeacon?.("/api/visit", new Blob([body], { type: "application/json" }));
  }, [pathname]);

  return null;
}
