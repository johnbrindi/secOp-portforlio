"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, Loader2, KeyRound } from "lucide-react";
import { changePassword, type ChangePasswordResult } from "./actions";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: ".75em 3rem .75em .9em",
  borderRadius: 10,
  border: "1px solid var(--border-hi)",
  background: "var(--surface-2)",
  color: "var(--text)",
  fontSize: "1rem",
  outline: "none",
};

function PasswordField({ name, label, autoComplete }: { name: string; label: string; autoComplete: string }) {
  const [show, setShow] = useState(false);
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-small" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span style={{ position: "relative", display: "block" }}>
        <input
          name={name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={show}
          style={{
            position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
            width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", borderRadius: 8, cursor: "pointer", color: "var(--text-muted)",
          }}
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </span>
    </label>
  );
}

export default function ChangePasswordForm() {
  const [state, action, pending] = useActionState<ChangePasswordResult | null, FormData>(changePassword, null);

  return (
    <form action={action} className="flex flex-col gap-4" key={state?.ok ? "done" : "form"}>
      {state && (
        <p
          role="status"
          className="text-small"
          style={{
            padding: ".7em .9em", borderRadius: 10,
            background: state.ok ? "rgba(74,222,128,.1)" : "rgba(248,113,113,.12)",
            border: `1px solid ${state.ok ? "rgba(74,222,128,.3)" : "rgba(248,113,113,.35)"}`,
            color: state.ok ? "#86efac" : "#fca5a5",
          }}
        >
          {state.message}
        </p>
      )}
      <PasswordField name="current" label="Current password" autoComplete="current-password" />
      <PasswordField name="next" label="New password" autoComplete="new-password" />
      <PasswordField name="confirm" label="Confirm new password" autoComplete="new-password" />
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ justifyContent: "center" }}>
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
        Change password
      </button>
    </form>
  );
}
