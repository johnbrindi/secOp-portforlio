import type { RawItem } from "./sources";
import { extractDeadline } from "./deadline";
import {
  TOPICS, PROFILE_BOOSTERS, OPPORTUNITY_TYPES, LOCAL_TERMS, REMOTE_ELIGIBLE, EXCLUDE, SENIOR,
  SCHOLARSHIP_TERMS, MASTERS_TERMS, MAJOR_PROGRAMMES, FIELD_FIT, ELIGIBILITY_TERMS, PHD_TERMS,
  UNDERGRAD_TERMS, DESTINATIONS, NOT_DEGREE, OTHER_NATIONALITY,
  FUNDED_TRAVEL_TERMS, TRAVEL_PROGRAMME_TERMS, OPEN_INTERNATIONALLY,
} from "./profile";

export type Stream = "tech" | "scholarship";

export const TECH_SECTIONS = ["Cameroon", "Fully funded travel", "Africa & Remote", "International"] as const;
export const SCHOLARSHIP_SECTIONS = Object.keys(FIELD_FIT);

const SECTION_LIMIT: Record<string, number> = {
  "Cameroon": 40, "Fully funded travel": 20, "Africa & Remote": 20, "International": 15,
  "Your fields": 25, "STEM & Engineering": 15, "Open to all fields": 15,
};

export type Opportunity = RawItem & {
  key: string;
  stream: Stream;
  section: string;
  category: string;
  topics: string[];
  score: number;
  // Scholarship details, when found in the listing.
  destination?: string;
  deadline?: string;
  deadlineAt?: Date;
  fullyFunded?: boolean;
};

const MAX_AGE_DAYS: Record<Stream, number> = { tech: 8, scholarship: 14 };
const MIN_SCORE: Record<Stream, number> = { tech: 3, scholarship: 9 };

// Sources that only list jobs: no "opportunity word" needed in the title.
const JOB_SOURCES = /LinkedIn Jobs|ReliefWeb|Remotive|Jobicy|We Work Remotely/;

const matchers = new Map<string, RegExp>();
function matcher(term: string): RegExp {
  let re = matchers.get(term);
  if (!re) {
    const prefix = term.endsWith("*");
    const body = term.replace(/\*$/, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    re = new RegExp(`(?<![\\p{L}\\d])${body}${prefix ? "" : "(?:s|x)?(?![\\p{L}\\d])"}`, "iu");
    matchers.set(term, re);
  }
  return re;
}
const hits = (text: string, terms: string[]) => terms.filter((t) => matcher(t).test(text));

export function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    for (const p of [...u.searchParams.keys()]) {
      if (/^(utm_|ref|trk|refId|trackingId|position|pageNum|fbclid|gclid)/i.test(p)) u.searchParams.delete(p);
    }
    u.hash = "";
    return (u.hostname.replace(/^(www|\w\w)\./, "") + u.pathname.replace(/\/$/, "") + u.search).toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

const tooOld = (item: RawItem, stream: Stream) =>
  item.publishedAt && !isNaN(+item.publishedAt) &&
  Date.now() - +item.publishedAt > MAX_AGE_DAYS[stream] * 86_400_000;

// Funded Master's study. Returns null when the item is not a degree scholarship.
function classifyScholarship(item: RawItem, text: string): Opportunity | null {
  if (!hits(text, SCHOLARSHIP_TERMS).length || NOT_DEGREE.test(item.title)) return null;
  const masters = hits(text, MASTERS_TERMS).length > 0;
  const programme = hits(text, MAJOR_PROGRAMMES).length > 0;
  if (!masters && !programme) return null;
  // PhD-only or undergraduate-only awards are not useful here.
  if (!masters && (hits(text, PHD_TERMS).length || hits(text, UNDERGRAD_TERMS).length)) return null;
  if (tooOld(item, "scholarship")) return null;
  if (OTHER_NATIONALITY.test(item.title) && !/cameroon|cameroun|africans|african students/i.test(text)) return null;

  const section = SCHOLARSHIP_SECTIONS.find((s) => hits(text, FIELD_FIT[s]).length);
  if (!section) return null;

  const fullyFunded = /fully[\s-]funded|full scholarship|entièrement financ|full tuition|full funding/i.test(text);
  const eligible = hits(text, ELIGIBILITY_TERMS).length > 0;
  const fieldHits = hits(text, FIELD_FIT["Your fields"]);

  let score = { "Your fields": 20, "STEM & Engineering": 10 }[section] ?? 6;
  score += Math.min(fieldHits.length, 3) * 2;
  if (fullyFunded) score += 5;
  if (eligible) score += 4;
  if (masters) score += 3;
  if (score < MIN_SCORE.scholarship) return null;

  return {
    ...item,
    key: normalizeUrl(item.url),
    stream: "scholarship",
    section,
    category: fullyFunded ? "Fully funded" : "Partial / other funding",
    topics: fieldHits.slice(0, 3),
    score,
    destination: DESTINATIONS.find((d) => new RegExp(`\\b${d}\\b`).test(text)),
    fullyFunded,
  };
}

// Funded summits, conferences, exchanges and fellowships abroad — any field.
function classifyTravel(item: RawItem, text: string): Opportunity | null {
  if (item.local || hits(text, LOCAL_TERMS).length) return null; // Cameroon items stay in the Cameroon section
  if (!hits(text, FUNDED_TRAVEL_TERMS).length || !hits(text, TRAVEL_PROGRAMME_TERMS).length) return null;
  // Jobs, PhDs and postdocs are not travel programmes.
  if (hits(text, PHD_TERMS).length || /\b(vacancy|hiring|full[- ]time|salary)\b/i.test(text)) return null;
  if (tooOld(item, "tech")) return null;
  if (OTHER_NATIONALITY.test(item.title) && !/cameroon|cameroun|africans|african/i.test(text)) return null;

  const topics: string[] = [];
  let topicHits = 0;
  for (const [topic, terms] of Object.entries(TOPICS)) {
    if (topic === "Tech (general)") continue;
    const n = hits(text, terms).length;
    if (n) { topics.push(topic); topicHits += n; }
  }
  // Label by programme kind ("fully funded" alone would make everything a fellowship).
  const category = /\b(summit|conference|forum|congress|assembly|festival|sommet|conférence|model united nations)\b/i.test(item.title)
    ? "Event"
    : /\b(summer school|winter school|camp|exchange|academy|bootcamp|training|workshop|programme d'échange)\b/i.test(item.title)
      ? "Training"
      : /\b(hackathon|competition|challenge)\b/i.test(item.title) ? "Competition" : "Fellowship / Funded Training";

  let score = 10 + Math.min(topicHits, 3) * 3;
  if (OPEN_INTERNATIONALLY.test(text)) score += 4;
  if (/fully[\s-]funded|all[\s-]expenses[\s-]paid/i.test(text)) score += 3;

  return {
    ...item,
    key: normalizeUrl(item.url),
    stream: "tech",
    section: "Fully funded travel",
    category,
    topics,
    score,
    destination: DESTINATIONS.find((d) => new RegExp(`\\b${d}\\b`).test(text)),
  };
}

function classifyTech(item: RawItem, text: string): Opportunity | null {
  if (tooOld(item, "tech")) return null;
  if (item.remote && !REMOTE_ELIGIBLE.test((item.location || "").trim())) return null;

  const local = item.local || hits(text, LOCAL_TERMS).length > 0;

  // Topic relevance: broad "tech" words only count for local items.
  const topics: string[] = [];
  let topicHits = 0;
  for (const [topic, terms] of Object.entries(TOPICS)) {
    if (topic === "Tech (general)" && !local) continue;
    const n = hits(text, terms).length;
    if (n) { topics.push(topic === "Tech (general)" ? "Tech" : topic); topicHits += n; }
  }
  if (!topicHits) return null;

  // What kind of opportunity is it? News-style sources must say.
  const types = Object.entries(OPPORTUNITY_TYPES)
    .map(([type, terms]) => [type, hits(text, terms).length] as const)
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1]);
  const isJobSource = JOB_SOURCES.test(item.source);
  if (!types.length && !isJobSource && !/CTFtime/.test(item.source)) return null;
  let category = types[0]?.[0] ?? (/CTFtime/.test(item.source) ? "Competition" : "Job");
  if (isJobSource && category !== "Internship") category = "Job";

  let score = Math.min(topicHits, 4) * 3 + Math.min(hits(text, PROFILE_BOOSTERS).length, 4) * 2;
  if (local) score += 15;
  // Final-year student: internships and trainee programmes matter most.
  if (category === "Internship") score += 5;
  if (!local && SENIOR.test(item.title)) score -= 6;

  if (score < MIN_SCORE.tech) return null;

  const section = local
    ? "Cameroon"
    : item.remote || /africa|african|afrique/i.test(text) ? "Africa & Remote" : "International";

  return { ...item, key: normalizeUrl(item.url), stream: "tech", section, category, topics, score };
}

function classify(item: RawItem): Opportunity | null {
  const text = [item.title, item.summary, item.company, item.location].filter(Boolean).join(" · ");
  if (hits(text, EXCLUDE).length) return null;
  // Never send something whose deadline (or event end date) has already passed.
  const deadline = extractDeadline(text);
  if (deadline && deadline.at.getTime() < Date.now()) return null;
  // A Master's scholarship never appears in the tech digest, and vice versa.
  const o = classifyScholarship(item, text) ?? classifyTravel(item, text) ?? classifyTech(item, text);
  return o && deadline ? { ...o, deadline: deadline.label, deadlineAt: deadline.at } : o;
}

function arrange(list: Opportunity[], sections: readonly string[]): Opportunity[] {
  // CTFtime lists dozens of CTFs at once; keep the digest readable.
  let ctfs = 0;
  const sorted = list
    .sort((a, b) => b.score - a.score)
    .filter((o) => !/CTFtime/.test(o.source) || ++ctfs <= 5);
  return sections.flatMap((s) => sorted.filter((o) => o.section === s).slice(0, SECTION_LIMIT[s] ?? 15));
}

// Different sites word the same listing differently ("DAAD MUBAS Scholarship 2027 |
// Fully Funded" vs "DAAD-MUBAS Scholarship 2027"); compare the distinctive words.
const FILLER = new Set(["scholarship", "scholarships", "fully", "funded", "programme", "program", "apply", "now",
  "the", "and", "for", "with", "2026", "2027", "2028", "2029", "university", "students"]);
const words = (o: Opportunity) => new Set(
  `${o.title} ${o.company ?? ""}`.toLowerCase().replace(/\s+-\s+[^-]+$/, "").split(/[^\p{L}\d]+/u)
    .filter((w) => w.length > 2 && !FILLER.has(w)));
function sameListing(a: Set<string>, b: Set<string>) {
  if (a.size < 2 || b.size < 2) return false;
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  return shared / Math.min(a.size, b.size) >= 0.75;
}

export function rankOpportunities(items: RawItem[]): { tech: Opportunity[]; scholarships: Opportunity[] } {
  const byKey = new Map<string, Opportunity>();
  const seenTitles = new Set<string>();

  for (const item of items) {
    const o = classify(item);
    if (!o) continue;
    // The same job/post often comes back from several queries or sources.
    const titleKey = (o.title + (o.company || "")).toLowerCase().replace(/[^\p{L}\d]+/gu, "");
    const prev = byKey.get(o.key);
    if (prev ? prev.score >= o.score : seenTitles.has(titleKey)) continue;
    byKey.set(o.key, o);
    seenTitles.add(titleKey);
  }

  const kept: { o: Opportunity; w: Set<string> }[] = [];
  for (const o of [...byKey.values()].sort((a, b) => b.score - a.score)) {
    const w = words(o);
    if (!kept.some((k) => k.o.stream === o.stream && sameListing(k.w, w))) kept.push({ o, w });
  }
  const all = kept.map((k) => k.o);
  return {
    tech: arrange(all.filter((o) => o.stream === "tech"), TECH_SECTIONS),
    scholarships: arrange(all.filter((o) => o.stream === "scholarship"), SCHOLARSHIP_SECTIONS),
  };
}
