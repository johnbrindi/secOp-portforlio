import nodemailer from "nodemailer";
import type { Opportunity } from "./score";
import { TECH_SECTIONS, SCHOLARSHIP_SECTIONS } from "./score";
import type { SourceResult } from "./sources";
import { RECIPIENT } from "./profile";

export type Digest = { subject: string; html: string; text: string };

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const INK = "#0f172a";

const esc = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const fmtDate = (d?: Date) =>
  d && !isNaN(+d) ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Douala" }) : "";

const longDate = () => new Date().toLocaleDateString("en-GB", {
  weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Douala",
});
const shortDate = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Douala" });

// Google News titles end with " - Publisher"; the publisher is already shown as the source.
const cleanTitle = (o: Opportunity) =>
  o.source.startsWith("Google") ? o.title.replace(/\s+-\s+[^-]+$/, "") : o.title;

// ── Shared layout ──────────────────────────────────────────────────────────

type Group = { label: string; color: string; items: Opportunity[] };
type Section = { title: string; note: string; groups: Group[] };

type Layout = {
  kicker: string;
  title: string;
  headerColor: string;
  kickerColor: string;
  intro: string;
  sections: Section[];
  sources: SourceResult[];
  footnote: string;
  badges: (o: Opportunity) => string[];
  button: string;
};

function card(o: Opportunity, color: string, layout: Layout): string {
  const meta = [o.company, o.location, o.source, fmtDate(o.publishedAt)].filter(Boolean).map(esc).join(" &nbsp;·&nbsp; ");
  const badges = layout.badges(o).map((b) =>
    `<span style="display:inline-block;margin:0 6px 0 0;font-size:11px;font-weight:600;color:${color};background:#f1f5f9;border-radius:3px;padding:2px 6px">${esc(b)}</span>`).join("");
  const summary = o.summary && !o.title.startsWith(o.summary.slice(0, 40))
    ? `<p style="margin:8px 0 0;font-size:13px;line-height:1.5;color:#475569">${esc(o.summary.slice(0, 200))}${o.summary.length > 200 ? "…" : ""}</p>`
    : "";
  return `
    <tr><td style="padding:0 0 12px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-left:3px solid ${color};border-radius:6px;background:#ffffff">
        <tr><td style="padding:14px 16px;word-break:break-word;overflow-wrap:anywhere">
          ${o.topics.length ? `<p style="margin:0;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:#64748b">${esc(o.topics.join(" · "))}</p>` : ""}
          <p style="margin:4px 0 0;font-size:15px;font-weight:600;line-height:1.4">
            <a href="${esc(o.url)}" style="color:${INK};text-decoration:none">${esc(cleanTitle(o))}</a>
          </p>
          ${badges ? `<p style="margin:6px 0 0">${badges}</p>` : ""}
          <p style="margin:4px 0 0;font-size:12px;color:#64748b">${meta}</p>
          ${summary}
          <p style="margin:10px 0 0"><a href="${esc(o.url)}" style="display:inline-block;font-size:12px;font-weight:600;color:#ffffff;background:${color};text-decoration:none;padding:6px 12px;border-radius:4px">${layout.button} →</a></p>
        </td></tr>
      </table>
    </td></tr>`;
}

function render(layout: Layout): string {
  const total = (s: Section) => s.groups.reduce((n, g) => n + g.items.length, 0);
  const visible = layout.sections.filter(total);

  const stats = layout.sections.map((s) => `
    <td width="33%" style="padding:12px 8px;text-align:center;background:#f1f5f9;border-radius:6px">
      <p style="margin:0;font-size:22px;font-weight:700;color:${layout.headerColor}">${total(s)}</p>
      <p style="margin:2px 0 0;font-size:12px;color:#64748b">${s.title}</p>
    </td>`).join(`<td width="8"></td>`);

  const sections = visible.map((s) => `
    <tr><td style="padding:28px 0 0">
      <p style="margin:0;font-size:18px;font-weight:700;color:${INK}">${s.title} <span style="font-weight:400;color:#94a3b8">· ${total(s)}</span></p>
      <p style="margin:2px 0 0;font-size:13px;color:#64748b;border-bottom:2px solid ${layout.headerColor};padding-bottom:8px">${s.note}</p>
    </td></tr>
    ${s.groups.filter((g) => g.items.length).map((g) => `
      <tr><td style="padding:14px 0 8px;font-size:13px;font-weight:700;color:${g.color}">${g.label} <span style="font-weight:400;color:#94a3b8">(${g.items.length})</span></td></tr>
      ${g.items.map((o) => card(o, g.color, layout)).join("")}`).join("")}`).join("");

  const failed = layout.sources.filter((s) => s.error);
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:${FONT}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7"><tr><td align="center" style="padding:24px 12px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px">
      <tr><td style="background:${layout.headerColor};border-radius:8px 8px 0 0;padding:24px 28px">
        <p style="margin:0;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${layout.kickerColor}">${layout.kicker}</p>
        <p style="margin:6px 0 0;font-size:22px;font-weight:700;color:#ffffff">${layout.title}</p>
        <p style="margin:6px 0 0;font-size:13px;color:#cbd5e1">${longDate()}</p>
      </td></tr>
      <tr><td style="background:#ffffff;border-radius:0 0 8px 8px;padding:24px 28px 28px">
        <p style="margin:0 0 16px;font-size:14px;line-height:1.55;color:#334155">${layout.intro}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${stats}</tr></table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${sections}</table>
      </td></tr>
      <tr><td style="padding:18px 28px;font-size:11px;line-height:1.6;color:#94a3b8">
        Sources checked: ${layout.sources.map((s) => `${esc(s.name)} (${s.items.length})`).join(", ")}.
        ${failed.length ? `<br>Unavailable today: ${failed.map((s) => esc(s.name)).join(", ")}.` : ""}
        <br>${layout.footnote}
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function plainText(heading: string, sections: Section[]): string {
  return [heading].concat(sections.flatMap((s) => {
    const groups = s.groups.filter((g) => g.items.length);
    if (!groups.length) return [];
    return [`\n=== ${s.title.toUpperCase()} ===`].concat(groups.flatMap((g) =>
      [`\n-- ${g.label} --`].concat(g.items.map((o) =>
        `* ${cleanTitle(o)}\n  ${[o.company, o.location, o.destination, o.deadline && `Deadline ${o.deadline}`, o.source].filter(Boolean).join(" · ")}\n  ${o.url}`))));
  })).join("\n");
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

// ── Tech opportunities digest ──────────────────────────────────────────────

export const TECH_SECTION_NOTES: Record<string, string> = {
  "Cameroon": "Local jobs, internships, events and programmes",
  "Africa & Remote": "Remote roles open to Cameroon and pan-African programmes",
  "International": "Global fellowships, training and CTF competitions",
};

export const TECH_CATEGORIES: { name: string; label: string; color: string }[] = [
  { name: "Internship", label: "Internships", color: "#15803d" },
  { name: "Job", label: "Jobs", color: "#1d4ed8" },
  { name: "Event", label: "Events", color: "#7e22ce" },
  { name: "Training", label: "Training & Programmes", color: "#c2410c" },
  { name: "Fellowship / Funded Training", label: "Fellowships & Funded Training", color: "#a16207" },
  { name: "Competition", label: "Competitions & Calls", color: "#b91c1c" },
];

export function buildTechDigest(items: Opportunity[], sources: SourceResult[]): Digest {
  const sections: Section[] = TECH_SECTIONS.map((s) => ({
    title: s,
    note: TECH_SECTION_NOTES[s],
    groups: TECH_CATEGORIES.map((c) => ({
      label: c.label, color: c.color,
      items: items.filter((o) => o.section === s && o.category === c.name),
    })),
  }));
  const local = items.filter((o) => o.section === "Cameroon").length;

  return {
    subject: `Opportunity Digest: ${items.length} new${local ? `, ${local} in Cameroon` : ""} (${shortDate()})`,
    html: render({
      kicker: "Daily Opportunity Digest",
      title: "Networking · Cybersecurity · Web Development",
      headerColor: "#0b1f3a",
      kickerColor: "#93c5fd",
      intro: `${items.length} new opportunit${items.length === 1 ? "y" : "ies"} matched your profile today, ranked by relevance. Cameroon listings appear first; internships and entry-level roles are ranked higher.`,
      sections,
      sources,
      footnote: "Always confirm an offer on the organiser's official page. Never pay a fee or share ID documents to apply.",
      badges: (o) => (o.deadline ? [`Deadline: ${o.deadline}`] : []),
      button: "View & apply",
    }),
    text: plainText(`DAILY OPPORTUNITY DIGEST · ${longDate()}`, sections),
  };
}

// ── Master's scholarship digest ────────────────────────────────────────────

export const SCHOLARSHIP_SECTION_NOTES: Record<string, string> = {
  "Your fields": "Cybersecurity, networking, telecommunications, computer engineering and related",
  "STEM & Engineering": "Engineering and technology programmes your degree qualifies you for",
  "Open to all fields": "Major programmes (Erasmus Mundus, DAAD, Chevening, MEXT…) that fund any Master's",
};

export function buildScholarshipDigest(items: Opportunity[], sources: SourceResult[]): Digest {
  const sections: Section[] = SCHOLARSHIP_SECTIONS.map((s) => ({
    title: s,
    note: SCHOLARSHIP_SECTION_NOTES[s] ?? "",
    groups: [
      { label: "Fully funded", color: "#047857", items: items.filter((o) => o.section === s && o.fullyFunded) },
      { label: "Partial / other funding", color: "#0e7490", items: items.filter((o) => o.section === s && !o.fullyFunded) },
    ],
  }));
  const yours = items.filter((o) => o.section === "Your fields").length;

  return {
    subject: `Master's Scholarship Watch: ${items.length} new${yours ? `, ${yours} in your fields` : ""} (${shortDate()})`,
    html: render({
      kicker: "Master's Scholarship Watch",
      title: "Funded Master's Study Abroad",
      headerColor: "#064e3b",
      kickerColor: "#6ee7b7",
      intro: `${plural(items.length, "new scholarship")} for Master's study that fit your plans after your Computer Engineering degree. Start early: most need transcripts, a CV, a motivation letter and recommendation letters.`,
      sections,
      sources,
      footnote: "Apply only through the official university or programme website. Genuine scholarships never ask for an application fee to a third party.",
      badges: (o) => [o.destination && `Destination: ${o.destination}`, o.deadline && `Deadline: ${o.deadline}`].filter((b): b is string => !!b),
      button: "View scholarship",
    }),
    text: plainText(`MASTER'S SCHOLARSHIP WATCH · ${longDate()}`, sections),
  };
}

export async function sendDigest(digest: Digest, fromName: string) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD must be set");

  const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transport.sendMail({ from: `"${fromName}" <${user}>`, to: RECIPIENT, ...digest });
}
