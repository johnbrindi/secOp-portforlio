import prisma from "@/lib/prisma";
import { fetchAllSources } from "./sources";
import { rankOpportunities, type Opportunity, type Stream } from "./score";
import { buildTechDigest, buildScholarshipDigest, sendDigest, type Digest } from "./email";
import { sendPush, type PushMessage } from "@/lib/push";

const best = (items: Opportunity[]) => items[0]?.title.replace(/\s+-\s+[^-]+$/, "").slice(0, 90);

function pushFor(stream: Stream, items: Opportunity[]): PushMessage {
  if (stream === "scholarship") {
    const yours = items.filter((o) => o.section === "Your fields").length;
    return {
      title: `${items.length} new Master's scholarship${items.length === 1 ? "" : "s"}`,
      body: `${yours ? `${yours} in your fields · ` : ""}Top: ${best(items)}`,
      url: "/admin/opportunities?view=scholarships",
      tag: "scholarships",
    };
  }
  const local = items.filter((o) => o.section === "Cameroon").length;
  return {
    title: `${items.length} new opportunit${items.length === 1 ? "y" : "ies"}`,
    body: `${local ? `${local} in Cameroon · ` : ""}Top: ${best(items)}`,
    url: "/admin/opportunities?view=tech",
    tag: "opportunities",
  };
}

export type RunSummary = {
  techNew: number;
  scholarshipNew: number;
  emailsSent: number;
  sources: { name: string; items: number; error?: string }[];
  errors: string[];
  items?: Pick<Opportunity, "stream" | "section" | "category" | "score" | "title" | "source" | "url">[];
};

// Fetch → rank → drop already-sent → email each stream separately → remember.
// `dry` returns what would be sent without emailing or writing anything.
export async function runDigest({ trigger, dry = false }: { trigger: string; dry?: boolean }): Promise<RunSummary> {
  const started = Date.now();
  const sources = await fetchAllSources();
  const { tech, scholarships } = rankOpportunities(sources.flatMap((s) => s.items));

  const seen = await prisma.opportunities.findMany({
    where: { key: { in: [...tech, ...scholarships].map((o) => o.key) } },
    select: { key: true },
  });
  const seenKeys = new Set(seen.map((s) => s.key));
  const freshTech = tech.filter((o) => !seenKeys.has(o.key));
  const freshScholarships = scholarships.filter((o) => !seenKeys.has(o.key));

  const summary: RunSummary = {
    techNew: freshTech.length,
    scholarshipNew: freshScholarships.length,
    emailsSent: 0,
    sources: sources.map((s) => ({ name: s.name, items: s.items.length, error: s.error })),
    errors: [],
  };

  if (dry) {
    summary.items = [...freshTech, ...freshScholarships].map(({ stream, section, category, score, title, source, url }) =>
      ({ stream, section, category, score, title, source, url }));
    return summary;
  }

  const streams: [Stream, Opportunity[], Digest | null, string][] = [
    ["tech", freshTech, freshTech.length ? buildTechDigest(freshTech, sources) : null, "Opportunity Digest"],
    ["scholarship", freshScholarships, freshScholarships.length ? buildScholarshipDigest(freshScholarships, sources) : null, "Scholarship Watch"],
  ];

  for (const [stream, items, digest, fromName] of streams) {
    if (!digest) continue;
    try {
      await sendDigest(digest, fromName);
      summary.emailsSent++;
      // Only remember items after their email went out, so a failed send retries tomorrow.
      await prisma.opportunities.createMany({
        data: items.map((o) => ({
          key: o.key,
          stream,
          url: o.url,
          title: o.title.slice(0, 500),
          source: o.source,
          section: o.section,
          category: o.category,
          score: o.score,
          summary: o.summary?.slice(0, 600) || null,
          company: o.company || null,
          location: o.location || null,
          topics: o.topics,
          destination: o.destination || null,
          deadline: o.deadline || null,
          fully_funded: o.stream === "scholarship" ? !!o.fullyFunded : null,
          published_at: o.publishedAt && !isNaN(+o.publishedAt) ? o.publishedAt : null,
        })),
        skipDuplicates: true,
      });
      await sendPush(pushFor(stream, items)).catch((e) => console.error("[push error]", e));
    } catch (e) {
      summary.errors.push(`${stream}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  await prisma.opportunity_runs.create({
    data: {
      trigger,
      tech_new: summary.techNew,
      scholarship_new: summary.scholarshipNew,
      emails_sent: summary.emailsSent,
      sources: summary.sources,
      error: summary.errors.join("; ") || null,
      duration_ms: Date.now() - started,
    },
  });

  return summary;
}
