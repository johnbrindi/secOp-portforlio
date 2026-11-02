"use client";

import { useFormStatus } from "react-dom";
import { Play, Loader2 } from "lucide-react";
import { runDigestNow } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending} style={{ opacity: pending ? 0.7 : 1 }}>
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
      {pending ? "Running… (about a minute)" : "Run now & email"}
    </button>
  );
}

export default function RunNowButton() {
  return (
    <form action={runDigestNow}>
      <SubmitButton />
    </form>
  );
}
