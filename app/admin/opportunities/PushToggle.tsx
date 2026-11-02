"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, BellRing, Download, Loader2 } from "lucide-react";
import { savePushSubscription, removePushSubscription, sendTestPush } from "./actions";
import { ADMIN_SW_SCOPE } from "@/app/components/admin/AdminPwa";

type State = "loading" | "unsupported" | "denied" | "off" | "on";

function base64ToBytes(base64: string) {
  const padded = (base64 + "=".repeat((4 - (base64.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
}

async function registration() {
  return (await navigator.serviceWorker.getRegistration(ADMIN_SW_SCOPE))
    ?? navigator.serviceWorker.register("/sw.js", { scope: ADMIN_SW_SCOPE });
}

// "Install app": Chrome/Android uses the saved prompt; iPhone needs Share → Add to Home Screen.
function InstallButton() {
  const [mode, setMode] = useState<"hidden" | "prompt" | "ios" | "installed">("hidden");

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return setMode("installed");
    if (/iphone|ipad/i.test(navigator.userAgent)) return setMode("ios");
    const update = () => window.adminInstallPrompt && setMode("prompt");
    update();
    window.addEventListener("admin-installable", update);
    return () => window.removeEventListener("admin-installable", update);
  }, []);

  if (mode === "installed") return <span className="text-small" style={{ color: "#4ade80" }}>App installed</span>;
  if (mode === "ios") {
    return <span className="text-small" style={{ color: "var(--text-muted)" }}>Install: Share → Add to Home Screen</span>;
  }
  if (mode !== "prompt") return null;
  return (
    <button
      className="btn btn-outline"
      onClick={async () => {
        await window.adminInstallPrompt?.prompt();
        window.adminInstallPrompt = undefined;
        setMode("hidden");
      }}
    >
      <Download className="w-4 h-4" /> Install app
    </button>
  );
}

// Turns web push on or off for the current device.
export default function PushToggle({ publicKey, devices }: { publicKey: string | null; devices: number }) {
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!publicKey || !("serviceWorker" in navigator) || !("PushManager" in window)) return setState("unsupported");
      if (Notification.permission === "denied") return setState("denied");
      const sub = await (await registration()).pushManager.getSubscription();
      setState(sub ? "on" : "off");
    })().catch(() => setState("unsupported"));
  }, [publicKey]);

  async function enable() {
    setBusy(true);
    setMessage(null);
    try {
      if ((await Notification.requestPermission()) !== "granted") return setState("denied");
      const reg = await registration();
      await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: base64ToBytes(publicKey!) });
      await savePushSubscription(sub.toJSON() as Parameters<typeof savePushSubscription>[0], navigator.userAgent);
      setState("on");
      setMessage("Enabled on this device.");
    } catch (e) {
      setMessage(`Could not enable: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    try {
      const sub = await (await registration()).pushManager.getSubscription();
      if (sub) {
        await removePushSubscription(sub.endpoint);
        await sub.unsubscribe();
      }
      setState("off");
      setMessage("Disabled on this device.");
    } finally {
      setBusy(false);
    }
  }

  async function test() {
    setBusy(true);
    try {
      const { sent, failed } = await sendTestPush();
      setMessage(sent ? `Test sent to ${sent} device${sent === 1 ? "" : "s"}.` : failed ? "Sending failed; try disabling and enabling again." : "No devices subscribed yet.");
    } finally {
      setBusy(false);
    }
  }

  const note =
    state === "unsupported" ? (publicKey
      ? "This browser can't receive push. On iPhone, first add the site to your Home Screen (Share → Add to Home Screen), then open it from there."
      : "Push isn't configured on the server yet (VAPID keys missing).")
      : state === "denied" ? "Notifications are blocked for this site. Allow them in your browser's site settings, then reload."
        : null;

  return (
    <div className="card p-5 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {state === "on" ? <BellRing className="w-5 h-5" style={{ color: "#4ade80" }} /> : <Bell className="w-5 h-5" style={{ color: "var(--text-muted)" }} />}
          <div>
            <p className="font-display font-semibold">Admin app & notifications</p>
            <p className="text-small" style={{ color: "var(--text-muted)" }}>
              New visitors, opportunities and scholarships · {devices} device{devices === 1 ? "" : "s"} subscribed
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <InstallButton />
          {state === "off" && (
            <button className="btn btn-primary" onClick={enable} disabled={busy}>
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />} Enable on this device
            </button>
          )}
          {state === "on" && (
            <>
              <button className="btn btn-outline" onClick={test} disabled={busy}>
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <BellRing className="w-4 h-4" />} Send test
              </button>
              <button className="btn btn-outline" onClick={disable} disabled={busy}>
                <BellOff className="w-4 h-4" /> Disable
              </button>
            </>
          )}
        </div>
      </div>
      {(note || message) && (
        <p className="text-small mt-3" style={{ color: note ? "#f59e0b" : "var(--text-muted)" }}>{note ?? message}</p>
      )}
    </div>
  );
}
