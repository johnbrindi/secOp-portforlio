import prisma from "../../../lib/prisma";
import { MessageSquare, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Messages — Admin" };
export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminMessagesPage() {
  let messages: any[] = [];
  try {
    messages = await prisma.contacts.findMany({
      orderBy: { created_at: "desc" },
    });
  } catch {
    messages = [];
  }

  return (
    <div>
      <div
        className="flex items-center gap-3 mb-10"
        style={{ paddingBottom: "var(--space-md)", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(74,222,128,.1)", color: "#4ade80" }}
        >
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display font-semibold" style={{ fontSize: "var(--step-2)" }}>
            Messages
          </h1>
          <p className="text-small" style={{ color: "var(--text-muted)" }}>
            {messages.length} total message{messages.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div
          className="card flex flex-col items-center gap-3 py-16 text-center"
          style={{ maxWidth: "480px", margin: "0 auto" }}
        >
          <MessageSquare className="w-8 h-8" style={{ color: "var(--text-dim)" }} />
          <p className="font-display font-semibold" style={{ fontSize: "var(--step-1)" }}>
            No messages yet
          </p>
          <p className="text-small" style={{ color: "var(--text-muted)" }}>
            Contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="card p-6"
              style={
                !msg.read
                  ? { borderColor: "var(--border-hi)" }
                  : {}
              }
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display font-semibold" style={{ fontSize: "var(--step-1)" }}>
                      {msg.name}
                    </p>
                    {!msg.read && (
                      <span
                        className="text-label px-1.5 py-0.5 rounded-full"
                        style={{
                          fontSize: ".58rem",
                          color: "#4ade80",
                          background: "rgba(74,222,128,.1)",
                          border: "1px solid rgba(74,222,128,.2)",
                        }}
                      >
                        New
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="flex items-center gap-1.5 text-small"
                    style={{ color: "var(--accent)" }}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {msg.email}
                  </a>
                </div>
                <span
                  className="flex items-center gap-1.5 text-small"
                  style={{ color: "var(--text-dim)" }}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {formatDate(msg.created_at)}
                </span>
              </div>

              {msg.subject && (
                <p
                  className="text-small font-medium mb-2"
                  style={{ color: "var(--text)" }}
                >
                  Re: {msg.subject}
                </p>
              )}

              <p
                className="text-small leading-relaxed"
                style={{ color: "var(--text-muted)", whiteSpace: "pre-wrap" }}
              >
                {msg.message}
              </p>

              <div className="flex gap-2 mt-5">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Your message")}`}
                  className="btn btn-primary text-small"
                  style={{ padding: ".45em 1em" }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Reply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
