"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    // Chrome/Android's install prompt, kept until the "Install app" button uses it.
    adminInstallPrompt?: Event & { prompt: () => Promise<void> };
  }
}

export const ADMIN_SW_SCOPE = "/admin/";

// Registers the admin service worker (push notifications) and keeps the install
// prompt so the dashboard can offer "Install app". Mounted only in the admin layout.
export default function AdminPwa() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: ADMIN_SW_SCOPE }).catch(() => {});
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      window.adminInstallPrompt = e as Window["adminInstallPrompt"];
      window.dispatchEvent(new Event("admin-installable"));
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  return null;
}
