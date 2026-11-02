import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions, isAdminEmail } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

// Only same-site paths, so the sign-in page can't be used to redirect elsewhere.
function safeCallback(url: string | undefined) {
  const fallback = "/admin/opportunities";
  if (!url) return fallback;
  try {
    const base = new URL(process.env.NEXTAUTH_URL || "http://localhost");
    const parsed = new URL(url, base);
    return parsed.origin === base.origin ? parsed.pathname + parsed.search : fallback;
  } catch {
    return fallback;
  }
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string; error?: string }> }) {
  const { callbackUrl, error } = await searchParams;
  const target = safeCallback(callbackUrl);

  const session = await getServerSession(authOptions);
  if (isAdminEmail(session?.user?.email)) redirect(target);

  return (
    <main
      className="flex items-center justify-center"
      style={{ minHeight: "100vh", padding: "1.5rem", background: "var(--bg)" }}
    >
      <LoginForm callbackUrl={target} initialError={error ?? null} />
    </main>
  );
}
