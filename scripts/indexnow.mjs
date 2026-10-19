#!/usr/bin/env node
// Notifies IndexNow search engines (Bing, Yandex, Seznam, Naver, …) about changed URLs.
// Google does not take part in IndexNow and retired its sitemap "ping" in 2023 — for Google,
// the sitemap is submitted once in Search Console and re-read automatically.
//
// Usage:
//   node scripts/indexnow.mjs              # URLs whose sitemap <lastmod> is within the last 7 days
//   node scripts/indexnow.mjs --all        # every URL in the sitemap (first run / big redesigns)
//   node scripts/indexnow.mjs --dry-run    # print what would be sent
//
// Env: SITE_URL (default: production URL), INDEXNOW_KEY (default: the key file shipped in /public)

const SITE_URL = (process.env.SITE_URL || "https://mazwewohjohnbrindi.vercel.app").replace(/\/$/, "");
const KEY = process.env.INDEXNOW_KEY || "b2cf42fedc8157b4e34e4ec5de9189f0";
const RECENT_DAYS = Number(process.env.INDEXNOW_RECENT_DAYS || 7);
const ENDPOINT = "https://api.indexnow.org/indexnow";

const args = new Set(process.argv.slice(2));
const submitAll = args.has("--all");
const dryRun = args.has("--dry-run");

async function main() {
  // 1. Make sure the key file is live — engines reject submissions they can't verify (403).
  const keyRes = await fetch(`${SITE_URL}/${KEY}.txt`);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (keyBody !== KEY) {
    throw new Error(`Key file ${SITE_URL}/${KEY}.txt is missing or wrong (HTTP ${keyRes.status}). Deploy it first.`);
  }

  // 2. Read the sitemap.
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not fetch sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
    loc: block.match(/<loc>(.*?)<\/loc>/)?.[1]?.trim(),
    lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]?.trim(),
  }));

  const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;
  const urls = entries
    .filter((e) => e.loc && (submitAll || (e.lastmod && Date.parse(e.lastmod) >= cutoff)))
    .map((e) => e.loc);

  console.log(`Sitemap: ${entries.length} URLs · submitting ${urls.length}${submitAll ? " (all)" : ` (changed in last ${RECENT_DAYS} days)`}`);
  urls.forEach((u) => console.log(`  ${u}`));
  if (urls.length === 0 || dryRun) return;

  // 3. Submit (max 10,000 URLs per request — far above this site's size).
  const submit = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  const meaning = {
    200: "OK — submitted",
    202: "Accepted — key validation pending",
    400: "Bad request",
    403: "Key not valid",
    422: "URLs don't belong to host or key mismatch",
    429: "Too many requests",
  };
  console.log(`IndexNow: HTTP ${submit.status} ${meaning[submit.status] || ""}`);
  if (submit.status !== 200 && submit.status !== 202) {
    console.error(await submit.text());
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
