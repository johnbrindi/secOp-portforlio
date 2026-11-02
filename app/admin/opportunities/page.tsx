import prisma from "../../../lib/prisma";
import { Radar, CheckCircle2, AlertTriangle, Clock, Briefcase, GraduationCap, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import RunNowButton from "./RunNowButton";
import { RECIPIENT } from "@/lib/opportunities/profile";

export const metadata: Metadata = { title: "Opportunity Digest — Admin" };
export const dynamic = "force-dynamic";
export const maxDuration = 300;

type SourceStatus = { name: string; items: number; error?: string };

const TZ = "Africa/Douala";

function formatDate(d: Date) {
  return new Date(d).toLocaleString("en-GB", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: TZ,
  });
}

// The cron runs at 05:00 UTC (06:00 in Cameroon) — see vercel.json.
function nextRun() {
  const next = new Date();
  next.setUTCHours(5, 0, 0, 0);
  if (next <= new Date()) next.setUTCDate(next.getUTCDate() + 1);
  return next;
}

async function getData() {
  const weekAgo = new Date(Date.now() - 7 * 86_400_000);
  try {
    const [runs, tech, scholarships, techWeek, scholarshipWeek, total] = await Promise.all([
      prisma.opportunity_runs.findMany({ orderBy: { ran_at: "desc" }, take: 14 }),
      prisma.opportunities.findMany({ where: { stream: "tech" }, orderBy: { created_at: "desc" }, take: 25 }),
      prisma.opportunities.findMany({ where: { stream: "scholarship" }, orderBy: { created_at: "desc" }, take: 25 }),
      prisma.opportunities.count({ where: { stream: "tech", created_at: { gte: weekAgo } } }),
      prisma.opportunities.count({ where: { stream: "scholarship", created_at: { gte: weekAgo } } }),
      prisma.opportunities.count(),
    ]);
    return { runs, tech, scholarships, techWeek, scholarshipWeek, total, dbError: null };
  } catch (e) {
    return { runs: [], tech: [], scholarships: [], techWeek: 0, scholarshipWeek: 0, total: 0, dbError: String(e) };
  }
}

const GREEN = "#4ade80";
const AMBER = "#f59e0b";
const RED = "#f87171";

export default async function AdminOpportunitiesPage() {
  const { runs, tech, scholarships, techWeek, scholarshipWeek, total, dbError } = await getData();
  const last = runs[0];
  const lastSources = (last?.sources ?? []) as SourceStatus[];
  const failedSources = lastSources.filter((s) => s.error);
  const stale = !last || Date.now() - +last.ran_at > 26 * 3_600_000;

  const status = dbError
    ? { color: RED, icon: AlertTriangle, title: "Database unreachable", text: dbError }
    : !last
      ? { color: AMBER, icon: Clock, title: "Waiting for the first run", text: `The first digest goes out at ${formatDate(nextRun())} (Cameroon time), or press "Run now".` }
      : last.error
        ? { color: RED, icon: AlertTriangle, title: "Last run had a problem", text: last.error }
        : stale
          ? { color: AMBER, icon: AlertTriangle, title: "No run in the last 26 hours", text: "Check the Cron Jobs tab in your Vercel project settings." }
          : { color: GREEN, icon: CheckCircle2, title: "All systems working", text: `Last run ${formatDate(last.ran_at)}, ${lastSources.length - failedSources.length} of ${lastSources.length} sources responded.` };
  const StatusIcon = status.icon;

  const stats = [
    { label: "Last run", value: last ? formatDate(last.ran_at) : "—" },
    { label: "Next scheduled run", value: formatDate(nextRun()) },
    { label: "Tech opportunities (7 days)", value: techWeek },
    { label: "Scholarships (7 days)", value: scholarshipWeek },
  ];

  return (
    <div>
      {/* Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
        style={{ paddingBottom: "var(--space-md)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(110,142,251,.1)", color: "var(--accent)" }}
          >
            <Radar className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-semibold" style={{ fontSize: "var(--step-2)" }}>
              Opportunity Digest
            </h1>
            <p className="text-small" style={{ color: "var(--text-muted)" }}>
              Two daily emails to {RECIPIENT} at 06:00 Cameroon time · {total} opportunities tracked
            </p>
          </div>
        </div>
        <RunNowButton />
      </div>

      {/* Status */}
      <div className="card p-5 mb-6 flex items-start gap-3" style={{ borderColor: status.color }}>
        <StatusIcon className="w-5 h-5 flex-shrink-0" style={{ color: status.color, marginTop: 2 }} />
        <div>
          <p className="font-display font-semibold" style={{ color: status.color }}>{status.title}</p>
          <p className="text-small" style={{ color: "var(--text-muted)", wordBreak: "break-word" }}>{status.text}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-label" style={{ color: "var(--text-dim)" }}>{s.label}</p>
            <p className="font-display font-semibold mt-1" style={{ fontSize: "var(--step-1)" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recently sent, kept apart like the emails */}
      <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        {[
          { title: "Tech opportunities sent", icon: Briefcase, color: "var(--accent)", items: tech },
          { title: "Master's scholarships sent", icon: GraduationCap, color: GREEN, items: scholarships },
        ].map((col) => {
          const Icon = col.icon;
          return (
            <div key={col.title} className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-4 h-4" style={{ color: col.color }} />
                <p className="font-display font-semibold">{col.title}</p>
              </div>
              {col.items.length === 0 ? (
                <p className="text-small" style={{ color: "var(--text-dim)" }}>Nothing sent yet.</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {col.items.map((o) => (
                    <li key={o.id} style={{ borderBottom: "1px solid var(--border)", paddingBottom: ".75rem" }}>
                      <a
                        href={o.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-small font-medium flex items-start gap-1.5"
                        style={{ color: "var(--text)", wordBreak: "break-word" }}
                      >
                        {o.title}
                        <ExternalLink className="w-3 h-3 flex-shrink-0" style={{ color: "var(--text-dim)", marginTop: 4 }} />
                      </a>
                      <p className="text-small" style={{ color: "var(--text-dim)", fontSize: ".75rem" }}>
                        {o.section} · {o.category} · {o.source} · {formatDate(o.created_at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Source health */}
      <div className="card p-5 mb-8">
        <p className="font-display font-semibold mb-1">Source health</p>
        <p className="text-small mb-4" style={{ color: "var(--text-dim)" }}>
          Items each source returned on the last run. A source that fails is skipped; the rest still run.
        </p>
        {lastSources.length === 0 ? (
          <p className="text-small" style={{ color: "var(--text-dim)" }}>No runs yet.</p>
        ) : (
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
            {lastSources.map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="flex items-center justify-between gap-2 text-small"
                style={{ padding: ".5rem .75rem", borderRadius: 8, background: "var(--surface-2)" }}
                title={s.error}
              >
                <span style={{ color: "var(--text-muted)" }}>{s.name}</span>
                <span style={{ color: s.error ? RED : s.items ? GREEN : AMBER, fontWeight: 600 }}>
                  {s.error ? "failed" : s.items}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Run history */}
      <div className="card p-5">
        <p className="font-display font-semibold mb-4">Run history</p>
        {runs.length === 0 ? (
          <p className="text-small" style={{ color: "var(--text-dim)" }}>No runs yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="text-small" style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr style={{ color: "var(--text-dim)", textAlign: "left" }}>
                  {["When", "Trigger", "Tech", "Scholarships", "Emails", "Time", "Status"].map((h) => (
                    <th key={h} style={{ padding: ".5rem", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {runs.map((r) => (
                  <tr key={r.id} style={{ color: "var(--text-muted)" }}>
                    <td style={{ padding: ".5rem" }}>{formatDate(r.ran_at)}</td>
                    <td style={{ padding: ".5rem" }}>{r.trigger}</td>
                    <td style={{ padding: ".5rem" }}>{r.tech_new}</td>
                    <td style={{ padding: ".5rem" }}>{r.scholarship_new}</td>
                    <td style={{ padding: ".5rem" }}>{r.emails_sent}</td>
                    <td style={{ padding: ".5rem" }}>{Math.round(r.duration_ms / 1000)}s</td>
                    <td style={{ padding: ".5rem", color: r.error ? RED : GREEN }} title={r.error ?? undefined}>
                      {r.error ? "error" : "ok"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
