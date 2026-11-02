// Admin service worker, registered with scope /admin/ by app/components/admin/AdminPwa.tsx.
// It only handles web push notifications; nothing is cached, so private data never
// stays on the device. The public portfolio has no service worker.

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let data = { title: "JB Admin", body: "", url: "/admin/opportunities" };
  try {
    data = { ...data, ...event.data.json() };
  } catch {
    if (event.data) data.body = event.data.text();
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      tag: data.tag,
      icon: "/icons/192.png",
      badge: "/icons/badge-96.png",
      data: { url: data.url },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || "/admin/opportunities", self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      const open = windows.find((w) => w.url.startsWith(self.location.origin + "/admin"));
      if (open) return open.navigate(target).then((w) => (w || open).focus());
      return self.clients.openWindow(target);
    }),
  );
});
