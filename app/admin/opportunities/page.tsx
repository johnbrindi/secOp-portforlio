import Link from "next/link";
import prisma from "../../../lib/prisma";
import { Radar, CheckCircle2, AlertTriangle, Clock, Briefcase, GraduationCap, Users, Activity } from "lucide-react";
import type { Metadata } from "next";
import type { opportunities } from "@prisma/client";
import RunNowButton from "./RunNowButton";
import PushToggle from "./PushToggle";
import OpportunityCard from "./OpportunityCard";
import { RECIPIENT } from "@/lib/opportunities/profile";
import { TECH_SECTIONS, SCHOLARSHIP_SECTIONS } from "@/lib/opportunities/score";
import { TECH_CATEGORIES, TECH_SECTION_NOTES, SCHOLARSHIP_SECTION_NOTES } from "@/lib/opportunities/email";

export const metadata: Metadata = { title: "Opportunities — Admin" };
export const dynamic = "force-dynamic";
export const maxDuration = 300;

type SourceStatus = { name: string; items: number; error?: string };
type View = "tech" | "scholarships" | "visitors" | "status";

const TZ = "Africa/Douala";
const GREEN = "#4ade80";
const AMBER = "#f59e0b";
const RED = "#f87171";
const DAYS_SHOWN = 30;

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
  const since = new Date(Date.now() - DAYS_SHOWN * 86_400_000);
  const today = new Date(Date.now() - 86_400_000);
  try {
    const [items, runs, visits, visitsToday, visitsWeek, devices] = await Promise.all([
      prisma.opportunities.findMany({
        where: { created_at: { gte: since } },
        orderBy: [{ created_at: "desc" }, { score: "desc" }],
        take: 400,
      }),
      prisma.opportunity_runs.findMany({ orderBy: { ran_at: "desc" }, take: 14 }),
      prisma.visits.findMany({ orderBy: { created_at: "desc" }, take: 60 }),
      prisma.visits.count({ where: { created_at: { gte: today } } }),
      prisma.visits.count({ where: { created_at: { gte: new Date(Date.now() - 7 * 86_400_000) } } }),
      prisma.push_subscriptions.count(),
    ]);
    return { items, runs, visits, visitsToday, visitsWeek, devices, dbError: null };
  } catch (e) {
    return { items: [], runs: [], visits: [], visitsToday: 0, visitsWeek: 0, devices: 0, dbError: String(e) };
  }
}

function SectionHeader({ title, note, count }: { title: string; note: string; count: number }) {
  return (
    <div className="mb-4" style={{ borderBottom: "1px solid var(--border-hi)", paddingBottom: ".6rem" }}>
      <h2 className="font-display font-semibold" style={{ fontSize: "var(--step-1)" }}>
        {title} <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>· {count}</span>
      </h2>
      <p className="text-small" style={{ color: "var(--text-muted)" }}>{note}</p>
    </div>
  );
}

function CardGrid({ items, color }: { items: opportunities[]; color: string }) {
  return (
    <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
      {items.map((o) => <OpportunityCard key={o.id} o={o} color={color} />)}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="card flex flex-col items-center gap-2 py-14 text-center">
      <Radar className="w-7 h-7" style={{ color: "var(--text-dim)" }} />
      <p className="text-small" style={{ color: "var(--text-muted)" }}>{text}</p>
    </div>
  );
}

// Same structure as the Opportunity Digest email: region, then type.
function TechView({ items }: { items: opportunities[] }) {
  if (!items.length) return <Empty text={`No opportunities in the last ${DAYS_SHOWN} days yet. They appear here after each daily run.`} />;
  return (
    <>
      {TECH_SECTIONS.map((section) => {
        const inSection = items.filter((o) => o.section === section);
        if (!inSection.length) return null;
        return (
          <section key={section} className="mb-8">
            <SectionHeader title={section} note={TECH_SECTION_NOTES[section]} count={inSection.length} />
            {TECH_CATEGORIES.map((c) => {
              const group = inSection.filter((o) => o.category === c.name);
              if (!group.length) return null;
              return (
                <div key={c.name}>
                  <p className="text-small font-semibold mb-3" style={{ color: c.color }}>{c.label} ({group.length})</p>
                  <CardGrid items={group} color={c.color} />
                </div>
              );
            })}
          </section>
        );
      })}
    </>
  );
}

// Same structure as the Master's Scholarship Watch email: field fit, then funding.
function ScholarshipView({ items }: { items: opportunities[] }) {
  if (!items.length) return <Empty text={`No Master's scholarships in the last ${DAYS_SHOWN} days yet. They appear here after each daily run.`} />;
  return (
    <>
      {SCHOLARSHIP_SECTIONS.map((section) => {
        const inSection = items.filter((o) => o.section === section);
        if (!inSection.length) return null;
        const full = inSection.filter((o) => o.fully_funded ?? o.category === "Fully funded");
        const partial = inSection.filter((o) => !full.includes(o));
        return (
          <section key={section} className="mb-8">
            <SectionHeader title={section} note={SCHOLARSHIP_SECTION_NOTES[section] ?? ""} count={inSection.length} />
            {full.length > 0 && (
              <>
                <p className="text-small font-semibold mb-3" style={{ color: "#34d399" }}>Fully funded ({full.length})</p>
                <CardGrid items={full} color="#34d399" />
              </>
            )}
            {partial.length > 0 && (
              <>
                <p className="text-small font-semibold mb-3" style={{ color: "#22d3ee" }}>Partial / other funding ({partial.length})</p>
                <CardGrid items={partial} color="#22d3ee" />
              </>
            )}
          </section>
        );
      })}
    </>
  );
}

function VisitorsView({ visits, today, week }: { visits: Awaited<ReturnType<typeof getData>>["visits"]; today: number; week: number }) {
  return (
    <>
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {[{ label: "Visitors (24 hours)", value: today }, { label: "Visitors (7 days)", value: week }].map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-label" style={{ color: "var(--text-dim)" }}>{s.label}</p>
            <p className="font-display font-semibold mt-1" style={{ fontSize: "var(--step-1)" }}>{s.value}</p>
          </div>
        ))}
      </div>
      {visits.length === 0 ? <Empty text="No visitors recorded yet. Each new browser session on the public site appears here." /> : (
        <div className="card p-5" style={{ overflowX: "auto" }}>
          <table className="text-small" style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
            <thead>
              <tr style={{ color: "var(--text-dim)", textAlign: "left" }}>
                {["When", "Location", "First page", "Came from", "Device", "Notified"].map((h) => (
                  <th key={h} style={{ padding: ".5rem", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visits.map((v) => (
                <tr key={v.id} style={{ color: "var(--text-muted)" }}>
                  <td style={{ padding: ".5rem" }}>{formatDate(v.created_at)}</td>
                  <td style={{ padding: ".5rem" }}>{[v.city, v.country].filter(Boolean).join(", ") || "—"}</td>
                  <td style={{ padding: ".5rem" }}>{v.path}</td>
                  <td style={{ padding: ".5rem" }}>{v.referrer ?? "direct"}</td>
                  <td style={{ padding: ".5rem" }}>{v.device}</td>
                  <td style={{ padding: ".5rem", color: v.notified ? GREEN : "var(--text-dim)" }}>{v.notified ? "yes" : "repeat"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function StatusView({ runs, dbError }: { runs: Awaited<ReturnType<typeof getData>>["runs"]; dbError: string | null }) {
  const last = runs[0];
  const lastSources = (last?.sources ?? []) as SourceStatus[];
  const failedSources = lastSources.filter((s) => s.error);
  const stale = !last || Date.now() - +last.ran_at > 26 * 3_600_000;

  const status = dbError
    ? { color: RED, icon: AlertTriangle, title: "Database unreachable", text: dbError }
    : !last
      ? { color: AMBER, icon: Clock, title: "Waiting for the first run", text: `The next digest goes out at ${formatDate(nextRun())} (Cameroon time), or press "Run now".` }
      : last.error
        ? { color: RED, icon: AlertTriangle, title: "Last run had a problem", text: last.error }
        : stale
          ? { color: AMBER, icon: AlertTriangle, title: "No run in the last 26 hours", text: "Check the Cron Jobs tab in your Vercel project settings." }
          : { color: GREEN, icon: CheckCircle2, title: "All systems working", text: `Last run ${formatDate(last.ran_at)}, ${lastSources.length - failedSources.length} of ${lastSources.length} sources responded.` };
  const StatusIcon = status.icon;

  return (
    <>
      <div className="card p-5 mb-6 flex items-start gap-3" style={{ borderColor: status.color }}>
        <StatusIcon className="w-5 h-5 flex-shrink-0" style={{ color: status.color, marginTop: 2 }} />
        <div>
          <p className="font-display font-semibold" style={{ color: status.color }}>{status.title}</p>
          <p className="text-small" style={{ color: "var(--text-muted)", wordBreak: "break-word" }}>{status.text}</p>
        </div>
      </div>

      <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {[
          { label: "Last run", value: last ? formatDate(last.ran_at) : "—" },
          { label: "Next scheduled run", value: formatDate(nextRun()) },
          { label: "Emails sent (last run)", value: last?.emails_sent ?? 0 },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-label" style={{ color: "var(--text-dim)" }}>{s.label}</p>
            <p className="font-display font-semibold mt-1" style={{ fontSize: "var(--step-1)" }}>{s.value}</p>
          </div>
        ))}
      </div>

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
    </>
  );
}

export default async function AdminOpportunitiesPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const requested = (await searchParams).view;
  const view: View = requested === "scholarships" || requested === "visitors" || requested === "status" ? requested : "tech";
  const { items, runs, visits, visitsToday, visitsWeek, devices, dbError } = await getData();
  const tech = items.filter((o) => o.stream === "tech");
  const scholarships = items.filter((o) => o.stream === "scholarship");
  const lastRunOk = runs[0] && !runs[0].error && Date.now() - +runs[0].ran_at < 26 * 3_600_000;

  const tabs: { id: View; label: string; icon: typeof Briefcase; count?: number; dot?: string }[] = [
    { id: "tech", label: "Opportunities", icon: Briefcase, count: tech.length },
    { id: "scholarships", label: "Scholarships", icon: GraduationCap, count: scholarships.length },
    { id: "visitors", label: "Visitors", icon: Users, count: visitsToday },
    { id: "status", label: "Status", icon: Activity, dot: dbError || (runs[0] && !lastRunOk) ? AMBER : GREEN },
  ];

  return (
    <div>
      <div
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
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
            <h1 className="font-display font-semibold" style={{ fontSize: "var(--step-2)" }}>Opportunities</h1>
            <p className="text-small" style={{ color: "var(--text-muted)" }}>
              Last {DAYS_SHOWN} days · also emailed daily to {RECIPIENT} at 06:00 Cameroon time
            </p>
          </div>
        </div>
        <RunNowButton />
      </div>

      <PushToggle publicKey={process.env.VAPID_PUBLIC_KEY ?? null} devices={devices} />

      <nav className="flex flex-wrap gap-2 mb-8" aria-label="Opportunity views">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = t.id === view;
          return (
            <Link
              key={t.id}
              href={`/admin/opportunities?view=${t.id}`}
              className="flex items-center gap-2 text-small font-medium"
              style={{
                padding: ".55em 1em",
                borderRadius: 999,
                border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                background: active ? "rgba(110,142,251,.12)" : "var(--surface)",
                color: active ? "var(--text)" : "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              <Icon className="w-4 h-4" />
              {t.label}
              {t.count !== undefined && <span style={{ color: "var(--text-dim)" }}>{t.count}</span>}
              {t.dot && <span style={{ width: 7, height: 7, borderRadius: 999, background: t.dot }} />}
            </Link>
          );
        })}
      </nav>

      {view === "tech" && <TechView items={tech} />}
      {view === "scholarships" && <ScholarshipView items={scholarships} />}
      {view === "visitors" && <VisitorsView visits={visits} today={visitsToday} week={visitsWeek} />}
      {view === "status" && <StatusView runs={runs} dbError={dbError} />}
    </div>
  );
}
