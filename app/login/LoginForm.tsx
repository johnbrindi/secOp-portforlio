"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Shield, Eye, EyeOff, Loader2, LogIn } from "lucide-react";

const MESSAGES: Record<string, string> = {
  CredentialsSignin: "Incorrect email or password.",
  TooManyAttempts: "Too many failed attempts. The account is locked for 15 minutes.",
  AccessDenied: "This account isn't allowed into the admin area.",
};
const message = (code: string) => MESSAGES[code] ?? "Sign in failed. Please try again.";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: ".75em .9em",
  borderRadius: 10,
  border: "1px solid var(--border-hi)",
  background: "var(--surface-2)",
  color: "var(--text)",
  fontSize: "1rem", // 16px stops iPhone zooming into the field
  outline: "none",
};

export default function LoginForm({ callbackUrl, initialError }: { callbackUrl: string; initialError: string | null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState<"password" | "okta" | null>(null);
  const [error, setError] = useState(initialError ? message(initialError) : null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy("password");
    setError(null);
    const res = await signIn("password", { email, password, callbackUrl, redirect: false });
    if (res?.ok && !res.error) {
      window.location.assign(callbackUrl);
      return;
    }
    setError(message(res?.error ?? "CredentialsSignin"));
    setBusy(null);
  }

  return (
    <div className="card" style={{ width: "100%", maxWidth: 400, padding: "2rem 1.75rem" }}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
        >
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-semibold" style={{ fontSize: "var(--step-1)" }}>Admin sign in</h1>
          <p className="text-small" style={{ color: "var(--text-muted)" }}>Private dashboard</p>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="text-small mb-5"
          style={{ padding: ".7em .9em", borderRadius: 10, background: "rgba(248,113,113,.12)", border: "1px solid rgba(248,113,113,.35)", color: "#fca5a5" }}
        >
          {error}
        </p>
      )}

      <form onSubmit={submit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-small" style={{ color: "var(--text-muted)" }}>Email</span>
          <input
            type="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-small" style={{ color: "var(--text-muted)" }}>Password</span>
          <span style={{ position: "relative", display: "block" }}>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: "3rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              style={{
                position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                background: "none", border: "none", borderRadius: 8, cursor: "pointer", color: "var(--text-muted)",
              }}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </span>
        </label>

        <button type="submit" className="btn btn-primary" disabled={busy !== null} style={{ justifyContent: "center", width: "100%" }}>
          {busy === "password" ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
          Sign in
        </button>
      </form>

      <div className="flex items-center gap-3 my-5" style={{ color: "var(--text-dim)" }}>
        <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span className="text-small">or</span>
        <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      <button
        type="button"
        className="btn btn-outline"
        disabled={busy !== null}
        onClick={() => { setBusy("okta"); signIn("okta", { callbackUrl }); }}
        style={{ justifyContent: "center", width: "100%" }}
      >
        {busy === "okta" && <Loader2 className="w-4 h-4 animate-spin" />}
        Sign in with Okta
      </button>
    </div>
  );
}
