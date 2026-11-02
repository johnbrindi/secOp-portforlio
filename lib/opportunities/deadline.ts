// Finds an application deadline (or, for events and CTFs, the end date) in a
// listing's text. Used to show deadlines, skip expired listings and delete
// listings two days after their deadline.

export type Deadline = { label: string; at: Date };

const MONTHS: Record<string, number> = {
  jan: 0, january: 0, janvier: 0, feb: 1, february: 1, fevrier: 1, février: 1, mar: 2, march: 2, mars: 2,
  apr: 3, april: 3, avril: 3, may: 4, mai: 4, jun: 5, june: 5, juin: 5, jul: 6, july: 6, juillet: 6,
  aug: 7, august: 7, aout: 7, août: 7, sep: 8, sept: 8, september: 8, septembre: 8, oct: 9, october: 9,
  octobre: 9, nov: 10, november: 10, novembre: 10, dec: 11, december: 11, decembre: 11, décembre: 11,
};

const MONTH = "(janv?(?:ier|uary)?|f[eé]v(?:rier)?|feb(?:ruary)?|mars?|march|apr(?:il)?|avr(?:il)?|ma[iy]|juin|june?|juil(?:let)?|july?|aug(?:ust)?|ao[uû]t|sept?(?:ember|embre)?|oct(?:ober|obre)?|nov(?:ember|embre)?|d[eé]c(?:ember|embre)?)\\.?";
const DAY = "(\\d{1,2})(?:st|nd|rd|th|er)?";
const YEAR = "(20\\d\\d)";

// Each pattern captures a date in one of three shapes; groups are read by parse().
const DATE = `(?:${DAY}\\s+${MONTH},?\\s*${YEAR}?|${MONTH}\\s+${DAY},?\\s*${YEAR}?|(\\d{1,2})[/.-](\\d{1,2})[/.-]${YEAR}|${YEAR}-(\\d{2})-(\\d{2}))`;
const LEAD = "(?:deadline|apply by|apply before|applications? close[sd]?|closing date|close[sd]? on|due date|last date|date limite(?: de (?:dépôt|candidature|soumission))?|avant le|au plus tard le)";

const PATTERNS = [
  new RegExp(`${LEAD}\\s*(?:is|on|:|-|–)?\\s*(?:on\\s+)?${DATE}`, "i"),
  new RegExp(`${DATE}\\s+deadline`, "i"),
  // CTFtime: "Date: Oct. 29, 2026, 9 a.m. — 29 Oct. 2026, 17:00 UTC" → the end date.
  new RegExp(`Date:[^—–]*[—–-]\\s*${DATE}`, "i"),
];

const monthIndex = (m: string) => MONTHS[m.toLowerCase().replace(".", "")] ?? MONTHS[m.toLowerCase().slice(0, 3)];

function parse(g: (string | undefined)[], now: Date): Date | undefined {
  let day: number, month: number, year: number | undefined;
  if (g[0]) [day, month, year] = [+g[0], monthIndex(g[1]!), g[2] ? +g[2] : undefined];
  else if (g[3]) [day, month, year] = [+g[4]!, monthIndex(g[3]), g[5] ? +g[5] : undefined];
  else if (g[6]) [day, month, year] = [+g[6], +g[7]! - 1, +g[8]!]; // day-first, as used in Cameroon and Europe
  else if (g[9]) [day, month, year] = [+g[11]!, +g[10]! - 1, +g[9]];
  else return undefined;
  if (month === undefined || isNaN(month) || month < 0 || month > 11 || day < 1 || day > 31) return undefined;

  // "Nov 30 deadline" with no year: the next Nov 30 (allowing for one just passed).
  if (!year) {
    year = now.getFullYear();
    if (new Date(Date.UTC(year, month, day)).getTime() < now.getTime() - 60 * 86_400_000) year++;
  }
  // End of that day in Cameroon (UTC+1).
  const at = new Date(Date.UTC(year, month, day, 22, 59));
  return at.getUTCDate() === day ? at : undefined;
}

export function extractDeadline(text: string, now = new Date()): Deadline | undefined {
  for (const re of PATTERNS) {
    const m = text.match(re);
    if (!m) continue;
    const at = parse(m.slice(1), now);
    if (at) {
      return { at, label: at.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Douala" }) };
    }
  }
  return undefined;
}

// Any date in a snippet of listing text ("20 Octobre 2026", "Il y a 5 jour(s)", "Hier").
// Used to date items scraped from job boards that have no feed.
const ANY_DATE = new RegExp(DATE, "i");
export function findDate(text: string, now = new Date()): Date | undefined {
  const ago = text.match(/il y a\s+(\d+)\s*(jour|heure|semaine)|(\d+)\s+(day|hour|week)s?\s+ago/i);
  if (ago) {
    const n = +(ago[1] ?? ago[3]);
    const unit = (ago[2] ?? ago[4]).toLowerCase();
    const ms = unit.startsWith("h") ? 3_600_000 : unit.startsWith("s") || unit.startsWith("w") ? 7 * 86_400_000 : 86_400_000;
    return new Date(now.getTime() - n * ms);
  }
  if (/aujourd['’]hui|today/i.test(text)) return now;
  if (/\bhier\b|yesterday/i.test(text)) return new Date(now.getTime() - 86_400_000);
  const m = text.match(ANY_DATE);
  return m ? parse(m.slice(1), now) : undefined;
}
