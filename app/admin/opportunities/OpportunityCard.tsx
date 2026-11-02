import { ExternalLink, MapPin, Building2, CalendarClock, Plane } from "lucide-react";
import type { opportunities } from "@prisma/client";

const TZ = "Africa/Douala";
const DAY = 86_400_000;
// Listings are deleted this long after their deadline (EXPIRED_GRACE_DAYS in run.ts).
const GRACE_DAYS = 2;

function deadlineBadge(at: Date | null, label: string | null) {
  if (!at) return label ? { text: `Deadline ${label}`, color: "#f59e0b" } : null;
  const left = Math.ceil((+at - Date.now()) / DAY);
  if (left < 0) {
    const removal = Math.max(0, Math.ceil((+at + GRACE_DAYS * DAY - Date.now()) / DAY));
    return { text: `Deadline passed (${label}) · removed ${removal ? `in ${removal} day${removal === 1 ? "" : "s"}` : "today"}`, color: "#f87171" };
  }
  if (left <= 7) return { text: `Closes ${left === 0 ? "today" : `in ${left} day${left === 1 ? "" : "s"}`} · ${label}`, color: "#f59e0b" };
  return { text: `Deadline ${label}`, color: "#a3e635" };
}

const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: TZ });

// Dashboard version of an email card: same details, same link.
export default function OpportunityCard({ o, color }: { o: opportunities; color: string }) {
  const isNew = Date.now() - +o.created_at < 24 * 3_600_000;
  const title = o.source.startsWith("Google") ? o.title.replace(/\s+-\s+[^-]+$/, "") : o.title;
  const scholarship = o.stream === "scholarship";
  const deadline = deadlineBadge(o.deadline_at, o.deadline);

  return (
    <article
      className="card p-5 flex flex-col gap-2"
      style={{ borderLeft: `3px solid ${color}`, wordBreak: "break-word" }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="text-label px-2 py-0.5 rounded-full"
          style={{ fontSize: ".62rem", color: "var(--text)", background: `${color}40`, border: `1px solid ${color}` }}
        >
          {o.category}
        </span>
        {isNew && (
          <span
            className="text-label px-2 py-0.5 rounded-full"
            style={{ fontSize: ".62rem", color: "#4ade80", background: "rgba(74,222,128,.1)", border: "1px solid rgba(74,222,128,.25)" }}
          >
            New
          </span>
        )}
        {o.topics.length > 0 && (
          <span className="text-small" style={{ color: "var(--text-dim)", fontSize: ".72rem" }}>{o.topics.join(" · ")}</span>
        )}
      </div>

      <a
        href={o.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-display font-semibold"
        style={{ fontSize: "var(--step-0)", color: "var(--text)", lineHeight: 1.35 }}
      >
        {title}
      </a>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-small" style={{ color: "var(--text-muted)", fontSize: ".78rem" }}>
        {o.company && <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{o.company}</span>}
        {o.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{o.location}</span>}
        {o.destination && <span className="flex items-center gap-1"><Plane className="w-3.5 h-3.5" />{o.destination}</span>}
        {deadline && <span className="flex items-center gap-1 font-medium" style={{ color: deadline.color }}><CalendarClock className="w-3.5 h-3.5" />{deadline.text}</span>}
      </div>

      {o.summary && !o.title.startsWith(o.summary.slice(0, 40)) && (
        <p className="text-small" style={{ color: "var(--text-muted)", lineHeight: 1.55 }}>
          {o.summary.length > 260 ? `${o.summary.slice(0, 260)}…` : o.summary}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 mt-1">
        <span className="text-small" style={{ color: "var(--text-dim)", fontSize: ".72rem" }}>
          {o.source}{o.published_at ? ` · posted ${fmt(o.published_at)}` : ""} · received {fmt(o.created_at)}
        </span>
        <a
          href={o.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ padding: ".45em .9em", fontSize: ".78rem" }}
        >
          {scholarship ? "View scholarship" : "View & apply"} <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
