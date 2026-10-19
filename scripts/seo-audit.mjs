#!/usr/bin/env node
// Crawls every URL in the sitemap and checks the on-page SEO basics Google documents:
// indexable 200 responses, unique titles and descriptions, self-referencing canonicals,
// one <h1>, social tags, valid JSON-LD, and alt text on images.
//
// Usage: node scripts/seo-audit.mjs [baseUrl]   (default: production URL)
// Exits 1 if any page has an error, so CI fails loudly when SEO regresses.

const BASE = (process.argv[2] || process.env.SITE_URL || "https://mazwewohjohnbrindi.vercel.app").replace(/\/$/, "");
// Sitemap and canonical URLs always use the production origin; when auditing a preview or
// localhost build, the same paths are fetched from BASE and canonicals compared to production.

const errors = [];
const warnings = [];
const err = (url, msg) => errors.push(`${url}  ✗ ${msg}`);
const warn = (url, msg) => warnings.push(`${url}  ⚠ ${msg}`);

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const meta = (html, attr, name) =>
  html.match(new RegExp(`<meta[^>]+${attr}="${name}"[^>]*content="([^"]*)"`, "i"))?.[1] ??
  html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]*${attr}="${name}"`, "i"))?.[1];

async function main() {
  const robots = await fetch(`${BASE}/robots.txt`).then((r) => r.text());
  if (!/Sitemap:\s*\S+/i.test(robots)) err("/robots.txt", "no Sitemap: line");
  if (/Disallow:\s*\/\s*$/m.test(robots)) err("/robots.txt", "site-wide Disallow: /");

  const sitemap = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text());
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error("Sitemap has no URLs");

  const titles = new Map();
  const descriptions = new Map();

  for (const prodUrl of urls) {
    const path = new URL(prodUrl).pathname;
    const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
    if (res.status !== 200) {
      err(path, `HTTP ${res.status} (sitemap URLs must return 200, not redirect)`);
      continue;
    }
    const html = await res.text();

    const robotsMeta = meta(html, "name", "robots") || "";
    if (/noindex/i.test(robotsMeta)) err(path, "page is noindex but listed in sitemap");

    const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1]?.trim() || "");
    if (!title) err(path, "missing <title>");
    else {
      if (title.length > 70) warn(path, `title is ${title.length} chars (may be truncated): "${title}"`);
      if (title.length < 15) warn(path, `title is very short: "${title}"`);
      titles.set(title, [...(titles.get(title) || []), path]);
    }

    const desc = decode(meta(html, "name", "description") || "");
    if (!desc) err(path, "missing meta description");
    else {
      if (desc.length < 70 || desc.length > 170) warn(path, `description is ${desc.length} chars (aim for 70–170)`);
      descriptions.set(desc, [...(descriptions.get(desc) || []), path]);
    }

    const canonical = html.match(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
    if (!canonical) err(path, "missing canonical link");
    else if (canonical.replace(/\/$/, "") !== prodUrl.replace(/\/$/, "")) {
      err(path, `canonical points elsewhere: ${canonical}`);
    }

    const h1s = html.match(/<h1[\s>]/gi)?.length || 0;
    if (h1s !== 1) err(path, `expected exactly one <h1>, found ${h1s}`);

    for (const tag of ["og:title", "og:description", "og:image"]) {
      if (!meta(html, "property", tag)) err(path, `missing ${tag}`);
    }

    const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
    if (ldBlocks.length === 0) warn(path, "no JSON-LD structured data");
    for (const [, json] of ldBlocks) {
      try {
        JSON.parse(json);
      } catch {
        err(path, "invalid JSON-LD (does not parse)");
      }
    }

    const imgsWithoutAlt = [...html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)].length;
    if (imgsWithoutAlt) err(path, `${imgsWithoutAlt} <img> without alt attribute`);

    if (!/<html[^>]+lang="/i.test(html)) err(path, "missing <html lang>");
  }

  for (const [title, paths] of titles) if (paths.length > 1) err(paths.join(", "), `duplicate title "${title}"`);
  for (const [, paths] of descriptions) if (paths.length > 1) err(paths.join(", "), "duplicate meta description");

  console.log(`SEO audit of ${BASE} — ${urls.length} URLs\n`);
  warnings.forEach((w) => console.log(w));
  errors.forEach((e) => console.log(e));
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
  if (errors.length) process.exit(1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
