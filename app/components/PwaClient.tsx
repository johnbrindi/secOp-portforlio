"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Registers the service worker (installable PWA, offline pages, push) and reports
// one visit per browser session on public pages, for the visitor notification.
export default function PwaClient() {
  const pathname = usePathname();

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

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
