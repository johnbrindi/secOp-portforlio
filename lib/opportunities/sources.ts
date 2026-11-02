// Fetchers for every opportunity source. Each returns RawItem[] and never
// throws: a broken source is reported in the email instead of killing the run.

import { findDate } from "./deadline";

export type RawItem = {
  title: string;
  url: string;
  source: string;
  summary?: string;
  location?: string;
  company?: string;
  publishedAt?: Date;
  // Set when the source itself guarantees the item is in Cameroon.
  local?: boolean;
  // Set for remote job boards, so location eligibility is checked.
  remote?: boolean;
};

export type SourceResult = { name: string; items: RawItem[]; error?: string };

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

// LinkedIn's geoId for Cameroon (location=Cameroon alone matches the wrong country).
const LINKEDIN_CAMEROON = "105745966";
// How far back to look. Runs are up to 4 days apart (Thu → Mon), plus a day of slack;
// the database makes sure nothing is emailed twice.
const LOOKBACK_DAYS = 5;
// Cameroon gets only a handful of LinkedIn postings a week, so look further back there.
const LINKEDIN_LOOKBACK_DAYS = 7;

async function get(url: string, init: RequestInit = {}, retries = 1): Promise<Response> {
  try {
    const res = await fetch(url, {
      ...init,
      headers: { "User-Agent": UA, "Accept-Language": "en,fr;q=0.8", ...init.headers },
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });
    if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
    if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status}`), { final: true });
    return res;
  } catch (e) {
    if (retries <= 0 || (e as { final?: boolean }).final) throw e;
    await sleep(3000);
    return get(url, init, retries - 1);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── Minimal RSS / Atom parsing (no dependency needed for these feeds) ──────

const NAMED_ENTITIES: Record<string, string> = {
  eacute: "é", Eacute: "É", egrave: "è", Egrave: "È", ecirc: "ê", Ecirc: "Ê", euml: "ë", agrave: "à", Agrave: "À",
  acirc: "â", ccedil: "ç", Ccedil: "Ç", icirc: "î", iuml: "ï", ocirc: "ô", ucirc: "û", ugrave: "ù", oelig: "œ",
  rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', laquo: "«", raquo: "»", hellip: "…", ndash: "-", mdash: "-",
};

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    // Some feeds entity-encode their HTML, so tags are stripped before and after decoding.
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;(\w+|#\d+);/g, "&$1;")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;|&#8217;|&rsquo;/g, "'").replace(/&#8211;|&#8212;|&mdash;|&ndash;/g, "-")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&([A-Za-z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, name: string): string | undefined {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : undefined;
}

function parseFeed(xml: string, source: string): RawItem[] {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  return blocks.flatMap((b) => {
    const title = tag(b, "title");
    const link = tag(b, "link") || b.match(/<link[^>]*href="([^"]+)"/i)?.[1];
    if (!title || !link) return [];
    const date = tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || tag(b, "dc:date");
    return [{
      title,
      url: link.trim(),
      source: tag(b, "source") ? `${source} · ${tag(b, "source")}` : source,
      summary: (tag(b, "description") || tag(b, "summary") || "").slice(0, 300),
      location: tag(b, "region"),
      publishedAt: date ? new Date(date) : undefined,
    }];
  });
}

async function feed(name: string, url: string, extra: Partial<RawItem> = {}): Promise<SourceResult> {
  try {
    const xml = await (await get(url)).text();
    const items = parseFeed(xml, name).map((i) => ({ ...i, ...extra }));
    if (url.includes("news.google.com")) items.forEach((i) => delete i.summary);
    return { name, items };
  } catch (e) {
    return { name, items: [], error: String(e) };
  }
}

// ── Google News: the best free signal for Cameroonian events & programmes ──

function googleNews(q: string, lang: "en" | "fr", days = LOOKBACK_DAYS): string {
  const p = new URLSearchParams({
    q: `${q} when:${days}d`,
    hl: lang === "fr" ? "fr" : "en-CM",
    gl: "CM",
    ceid: lang === "fr" ? "CM:fr" : "CM:en",
  });
  return `https://news.google.com/rss/search?${p}`;
}

const NEWS_QUERIES: [string, string, "en" | "fr"][] = [
  ["Google News (CM)", 'Cameroon (cybersecurity OR "cyber security") (training OR conference OR hackathon OR internship OR job OR bootcamp OR "call for applications")', "en"],
  ["Google News (CM)", 'Cameroon (ICT OR tech OR developers OR "web development" OR networking OR coding) (hackathon OR bootcamp OR internship OR summit OR competition OR "call for applications" OR training)', "en"],
  ["Google News (CM)", '(Bamenda OR Buea OR Douala OR Yaounde) (tech OR developers OR cybersecurity OR ICT) (event OR workshop OR hackathon OR training OR summit)', "en"],
  ["Google Actualités (CM)", 'Cameroun (cybersécurité OR "sécurité informatique") (formation OR conférence OR hackathon OR stage OR recrutement OR "appel à candidatures")', "fr"],
  ["Google Actualités (CM)", 'Cameroun (numérique OR TIC OR développeurs OR "réseaux informatiques" OR informatique) (hackathon OR stage OR bootcamp OR concours OR "appel à candidatures" OR recrutement OR formation)', "fr"],
  ["Google News (Africa)", 'Africa (cybersecurity OR networking OR "web development") (fellowship OR scholarship OR bootcamp OR "call for applications" OR "training program" OR hackathon)', "en"],
];

// Master's scholarships are posted less often, so these look back a week.
const SCHOLARSHIP_QUERIES: [string, string, "en" | "fr"][] = [
  ["Google News (Scholarships)", '(scholarship OR "fully funded") (master OR masters OR MSc OR postgraduate) (cybersecurity OR "cyber security" OR telecommunications OR "computer engineering" OR networking OR "information technology")', "en"],
  ["Google News (Scholarships)", '("Erasmus Mundus" OR DAAD OR Chevening OR "Mastercard Foundation" OR MEXT OR "Stipendium Hungaricum" OR "Türkiye Burslari" OR "Chinese Government Scholarship" OR "Global Korea Scholarship" OR Fulbright OR "Eiffel Excellence" OR "Commonwealth Scholarship") (masters OR master) 2027', "en"],
  ["Google News (Scholarships)", '"fully funded" (masters OR master) scholarship (Africans OR "African students" OR "developing countries" OR "international students") engineering', "en"],
  ["Google Actualités (Bourses)", '(bourse OR "entièrement financée") master (cybersécurité OR télécommunications OR "génie informatique" OR réseaux OR informatique) étudiants africains', "fr"],
];

// ── LinkedIn public job search (the guest endpoint behind linkedin.com/jobs) ─

const LINKEDIN_QUERIES = [
  "cybersecurity", "sécurité informatique", "SOC analyst", "network engineer", "réseau",
  "web developer", "développeur web", "stage informatique", "IT intern", "informatique",
];

function parseLinkedIn(html: string): RawItem[] {
  return html.split(/<li[\s>]/).slice(1).flatMap((card) => {
    const title = card.match(/base-search-card__title[^>]*>([\s\S]*?)<\/h3>/)?.[1];
    const href = card.match(/base-card__full-link[^>]*href="([^"]+)"/)?.[1];
    if (!title || !href) return [];
    const company = card.match(/base-search-card__subtitle[^>]*>([\s\S]*?)<\/h4>/)?.[1];
    const location = card.match(/job-search-card__location[^>]*>([\s\S]*?)<\/span>/)?.[1];
    const date = card.match(/<time[^>]*datetime="([^"]+)"/)?.[1];
    return [{
      title: decode(title),
      url: href.replace(/&amp;/g, "&").split("?")[0],
      source: "LinkedIn Jobs",
      company: company ? decode(company) : undefined,
      location: location ? decode(location) : undefined,
      publishedAt: date ? new Date(date) : undefined,
      local: true,
    }];
  });
}

async function linkedInCameroon(): Promise<SourceResult> {
  const items: RawItem[] = [];
  const errors: string[] = [];
  // Sequential with a pause: LinkedIn rate-limits bursts from one IP.
  for (const keywords of LINKEDIN_QUERIES) {
    const p = new URLSearchParams({
      keywords, geoId: LINKEDIN_CAMEROON, f_TPR: `r${LINKEDIN_LOOKBACK_DAYS * 86400}`, start: "0",
    });
    try {
      const html = await (await get(`https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?${p}`)).text();
      items.push(...parseLinkedIn(html));
    } catch (e) {
      errors.push(`${keywords}: ${e}`);
    }
    await sleep(1500);
  }
  return {
    name: "LinkedIn Jobs (Cameroon)",
    items,
    error: errors.length === LINKEDIN_QUERIES.length ? errors[0] : undefined,
  };
}

// ── Remote job boards (filtered later to roles open to Cameroon/Africa) ────

async function remotive(): Promise<SourceResult> {
  try {
    const res = await Promise.all(
      ["security", "network", "devops", "frontend"].map(async (search) => {
        const data = await (await get(`https://remotive.com/api/remote-jobs?search=${search}&limit=50`)).json();
        return (data.jobs || []).map((j: Record<string, string>): RawItem => ({
          title: j.title, url: j.url, source: "Remotive", company: j.company_name,
          location: j.candidate_required_location, publishedAt: new Date(j.publication_date),
          summary: j.category, remote: true,
        }));
      }),
    );
    return { name: "Remotive", items: res.flat() };
  } catch (e) {
    return { name: "Remotive", items: [], error: String(e) };
  }
}

async function jobicy(): Promise<SourceResult> {
  try {
    const res = await Promise.all(
      ["security", "network", "devops", "web"].map(async (tag) => {
        const data = await (await get(`https://jobicy.com/api/v2/remote-jobs?count=50&tag=${tag}`)).json();
        return (data.jobs || []).map((j: Record<string, string>): RawItem => ({
          title: j.jobTitle, url: j.url, source: "Jobicy", company: j.companyName,
          location: j.jobGeo, publishedAt: new Date(j.pubDate),
          summary: decode(j.jobExcerpt || "").slice(0, 300), remote: true,
        }));
      }),
    );
    return { name: "Jobicy", items: res.flat() };
  } catch (e) {
    return { name: "Jobicy", items: [], error: String(e) };
  }
}

// ── WordPress sites whose RSS feed is off: the built-in JSON API still works ─

async function wordpress(name: string, site: string, extra: Partial<RawItem> = {}): Promise<SourceResult> {
  try {
    const posts = await (await get(`${site}/wp-json/wp/v2/posts?per_page=20&_fields=date_gmt,link,title,excerpt`)).json();
    return {
      name,
      items: (posts as { date_gmt: string; link: string; title: { rendered: string }; excerpt: { rendered: string } }[])
        .map((p) => ({
          title: decode(p.title.rendered),
          url: p.link,
          source: name,
          summary: decode(p.excerpt.rendered).slice(0, 300),
          publishedAt: new Date(`${p.date_gmt}Z`),
          ...extra,
        })),
    };
  } catch (e) {
    return { name, items: [], error: String(e) };
  }
}

// ── Cameroonian job boards without feeds: read the listing page ────────────
// Each job is a link matching `link`; its date is read from the text around it.

async function listingPage(name: string, url: string, link: RegExp, extra: Partial<RawItem> = {}): Promise<SourceResult> {
  try {
    const page = await (await get(url)).text();
    const items: RawItem[] = [];
    const seen = new Set<string>();
    for (const m of page.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
      const href = m[1].match(/href="([^"]+)"/)?.[1];
      if (!href || !link.test(href)) continue;
      const absolute = new URL(href.replace(/&amp;/g, "&"), url).href;
      if (seen.has(absolute)) continue;
      // Card-style links hold the title in a heading; plain links are the title themselves.
      const heading = m[2].match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/)?.[1];
      const title = decode(heading || m[1].match(/title="([^"]+)"/)?.[1] || m[2])
        // CARI Africa wraps titles as "Avis de recrutement : X Nouveau" (sometimes split around X).
        .replace(/^Avis de\s*(recrutement)?\s*:?\s*/i, "")
        .replace(/\s*(Nouveau|recrutement)\s*$/i, "")
        .trim();
      const desc = heading ? decode(m[2].match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "") : "";
      if (title.length < 8) continue;
      seen.add(absolute);
      const before = decode(page.slice(Math.max(0, m.index - 400), m.index));
      const after = decode(page.slice(m.index, m.index + 700));
      items.push({
        title: title.slice(0, 200),
        url: absolute,
        source: name,
        summary: desc && desc !== title ? desc.slice(0, 300) : undefined,
        // Boards show the date either just before the title or just after it.
        publishedAt: findDate(after.slice(0, 300)) ?? findDate(before.slice(-200)),
        local: true,
        ...extra,
      });
    }
    return { name, items };
  } catch (e) {
    return { name, items: [], error: String(e) };
  }
}

// ── dev.events: tech and security conferences, read from the page's schema.org data ─

// dev.events pads regional pages with worldwide events, so `keep` filters on the event location.
async function devEvents(name: string, url: string, keep: RegExp): Promise<SourceResult> {
  try {
    const page = await (await get(url)).text();
    const items: RawItem[] = [];
    for (const [, json] of page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      let data: unknown;
      try {
        data = JSON.parse(json);
      } catch {
        continue;
      }
      const list = Array.isArray(data) ? data : (data as { itemListElement?: unknown[] }).itemListElement ?? [data];
      for (const entry of list as Record<string, unknown>[]) {
        const e = (entry.item ?? entry) as Record<string, unknown>;
        if (!String(e["@type"] ?? "").includes("Event") || typeof e.url !== "string") continue;
        const place = (e.location as { name?: string } | undefined)?.name;
        if (!place || !keep.test(place)) continue;
        const start = typeof e.startDate === "string" ? new Date(e.startDate) : undefined;
        const end = typeof e.endDate === "string" ? e.endDate.slice(0, 10) : start?.toISOString().slice(0, 10);
        items.push({
          title: String(e.name),
          url: e.url,
          source: name,
          location: place,
          // "Event" makes it an opportunity; the end date becomes its deadline.
          summary: `Tech event in ${place}. ${e.description ? decode(String(e.description)).slice(0, 200) : ""} Deadline: ${end}`.trim(),
        });
      }
    }
    return { name, items };
  } catch (e) {
    return { name, items: [], error: String(e) };
  }
}

const CAMEROON = /cameroon|cameroun/i;
const AFRICA = /cameroon|cameroun|nigeria|ghana|kenya|rwanda|senegal|sénégal|south africa|egypt|morocco|maroc|tunisia|algeria|ivory coast|côte d'ivoire|ethiopia|uganda|tanzania|zambia|zimbabwe|botswana|namibia|benin|togo|gabon|congo|mauritius|africa/i;

// ── Devpost: open online hackathons (cybersecurity and web) anyone can enter ─

async function devpost(): Promise<SourceResult> {
  const name = "Devpost hackathons";
  try {
    const res = await Promise.all(["Cybersecurity", "Web"].map(async (theme) => {
      const data = await (await get(`https://devpost.com/api/hackathons?status[]=open&status[]=upcoming&themes[]=${theme}`)).json();
      return (data.hackathons ?? [])
        .filter((h: { invite_only: boolean; displayed_location?: { location?: string } }) =>
          !h.invite_only && /online/i.test(h.displayed_location?.location ?? ""))
        .map((h: { title: string; url: string; submission_period_dates: string; themes: { name: string }[]; organization_name?: string; prize_amount?: string }): RawItem => {
          // "Oct 17 - Nov 22, 2026" or "Nov 01 - 30, 2026" → submission deadline
          const [, startMonth, , endMonth, endDay, year] =
            h.submission_period_dates.match(/([A-Z][a-z]{2})\s+(\d+)\s*-\s*(?:([A-Z][a-z]{2})\s+)?(\d+),\s*(\d{4})/) ?? [];
          const deadline = year ? `${endMonth ?? startMonth} ${endDay}, ${year}` : "";
          return {
            title: `${h.title} (online hackathon)`,
            url: h.url,
            source: name,
            company: h.organization_name || undefined,
            location: "Online",
            summary: `Hackathon · ${h.themes.map((t) => t.name).join(", ")} · prizes ${decode(h.prize_amount ?? "").replace(/\s+/g, "")}. ${deadline ? `Deadline: ${deadline}` : ""}`,
          };
        });
    }));
    return { name, items: res.flat() };
  } catch (e) {
    return { name, items: [], error: String(e) };
  }
}

// ── Optional: social posts (LinkedIn posts, Facebook, X) via Serper ────────
// Facebook and X do not allow anonymous scraping, so their public posts are
// found through Google search. Enabled only when SERPER_API_KEY is set.

const SOCIAL_QUERIES = [
  'site:linkedin.com/posts Cameroon (cybersecurity OR networking OR "web developer" OR "développeur web") (internship OR stage OR hiring OR recrutement OR hackathon OR event OR training)',
  'site:facebook.com Cameroun (cybersécurité OR "réseaux informatiques" OR "développement web") (stage OR recrutement OR formation OR hackathon OR "appel à candidatures")',
  'site:facebook.com Cameroon (cybersecurity OR ICT OR tech) (internship OR training OR bootcamp OR hackathon OR "call for applications")',
  '(site:x.com OR site:twitter.com) Cameroon (cybersecurity OR tech OR developers) (hackathon OR internship OR event OR training)',
];

async function serperSocial(): Promise<SourceResult | null> {
  const key = process.env.SERPER_API_KEY;
  if (!key) return null;
  try {
    const res = await Promise.all(
      SOCIAL_QUERIES.map(async (q) => {
        const data = await (await get("https://google.serper.dev/search", {
          method: "POST",
          headers: { "X-API-KEY": key, "Content-Type": "application/json" },
          body: JSON.stringify({ q, gl: "cm", tbs: "qdr:w", num: 20 }),
        })).json();
        return (data.organic || []).map((r: Record<string, string>): RawItem => {
          const host = new URL(r.link).hostname.replace(/^www\.|^\w\w\./, "");
          return {
            title: r.title, url: r.link, summary: r.snippet,
            source: host.includes("facebook") ? "Facebook" : host.includes("linkedin") ? "LinkedIn post" : "X (Twitter)",
          };
        });
      }),
    );
    return { name: "Social (Serper)", items: res.flat() };
  } catch (e) {
    return { name: "Social (Serper)", items: [], error: String(e) };
  }
}

// ── Everything together ────────────────────────────────────────────────────

export async function fetchAllSources(): Promise<SourceResult[]> {
  const tasks: Promise<SourceResult | null>[] = [
    // Cameroon first: job boards, LinkedIn, NGO/UN jobs, events, local programmes
    linkedInCameroon(),
    listingPage("JobInfoCamer", "https://www.jobinfocamer.com/jobs/Informatique/", /^\/job\/\d+\//),
    listingPage("Job Cameroun", "https://job-cameroun.com/offres?categorie=informatique", /^\/offre\/\d+-/),
    listingPage("Emplois Cameroun", "https://emploiscameroun.com/offres/informatique/", /\/offre\/\d+-/),
    listingPage("CARI Africa / MinaJobs", "https://emploi.cm.cari.africa/emploi/informatique", /\/emploi\/view\/\d+\//),
    listingPage("Taf4all (Cameroon)", "https://www.taf4all.fr/en/emploi/cameroun/informatique", /^\/en\/offre\/\d+-/),
    feed("ReliefWeb (Cameroon)", "https://reliefweb.int/jobs/rss.xml?advanced-search=%28C49%29", { local: true }),
    devEvents("dev.events (Cameroon tech)", "https://dev.events/AF/CM/tech", CAMEROON),
    devEvents("dev.events (Cameroon security)", "https://dev.events/AF/CM/security", CAMEROON),
    wordpress("Kamerpower", "https://kamerpower.com", { local: true }),
    ...NEWS_QUERIES.map(([name, q, lang]) => feed(name, googleNews(q, lang))),
    serperSocial(),
    // Africa / international programmes
    feed("Opportunity Desk", "https://opportunitydesk.org/feed/"),
    feed("Opportunities For Africans", "https://www.opportunitiesforafricans.com/feed/"),
    feed("Opportunities Corners", "https://opportunitiescorners.com/feed/"),
    feed("Scholarship Region", "https://www.scholarshipregion.com/feed/"),
    devEvents("dev.events (Africa security)", "https://dev.events/AF/security", AFRICA),
    devpost(),
    // Master's scholarships
    ...SCHOLARSHIP_QUERIES.map(([name, q, lang]) => feed(name, googleNews(q, lang, 7))),
    feed("Scholars4Dev", "https://www.scholars4dev.com/feed/"),
    feed("Scholarship Union", "https://scholarshipunion.com/feed/"),
    feed("Scholarships Corner", "https://www.scholarshipscorner.website/feed/"),
    feed("Opportunities Circle", "https://opportunitiescircle.com/feed/"),
    feed("Opportunities For Africans (scholarships)", "https://www.opportunitiesforafricans.com/category/scholarships/feed/"),
    wordpress("Global South Opportunities", "https://www.globalsouthopportunities.com"),
    wordpress("After School Africa", "https://www.afterschoolafrica.com"),
    feed("CTFtime (upcoming CTFs)", "https://ctftime.org/event/list/upcoming/rss/"),
    // Remote jobs
    remotive(),
    jobicy(),
    feed("We Work Remotely", "https://weworkremotely.com/categories/remote-devops-sysadmin-jobs.rss", { remote: true }),
  ];
  return (await Promise.all(tasks)).filter((r): r is SourceResult => r !== null);
}
