import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ArrowRight, ExternalLink, Trophy, GraduationCap, Code2, FlaskConical } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { FOOTPRINT } from "@/lib/footprint";
import posts from "../blog/posts";

export const metadata: Metadata = pageMetadata({
  title: "Security Practice & Training",
  description:
    "How Mazwewoh John Brindi builds security skills: Cisco Ethical Hacker pathway, SEED internship and teaching, SOC labs, and CTF writeups.",
  path: "/achievements",
});

const milestones = [
  {
    icon: GraduationCap,
    year: "2024",
    title: "Cisco Ethical Hacker pathway",
    detail:
      "Completed Cisco Networking Academy's Ethical Hacker track — scoping, reconnaissance, social engineering, wired/wireless and application exploitation, post-exploitation — alongside Network Defense.",
    href: "/certifications",
    cta: "See certificates",
  },
  {
    icon: FlaskConical,
    year: "2024",
    title: "Cybersecurity intern, SEED Bamenda",
    detail: "Hands-on internship projects in offensive and defensive security, published on GitHub.",
    href: "https://github.com/johnbrindi/Seed_Cyber_August_2024",
    cta: "View projects",
  },
  {
    icon: Code2,
    year: "2025",
    title: "Cybersecurity instructor, SEED Bamenda",
    detail:
      "Designed lab exercises for SEED's 2025 cybersecurity interns — such as recovering AES-encrypted data and reasoning about key management — and mentored 50+ students.",
    href: "https://github.com/johnbrindi/SEED_CYBER_SECURITY_INTERNS",
    cta: "View exercises",
  },
  {
    icon: Trophy,
    year: "2025–26",
    title: "Home SOC lab",
    detail: "Wazuh, Elastic SIEM and Suricata detection lab used to practise alert triage, rule tuning and incident response.",
    href: "/lab",
    cta: "Tour the lab",
  },
];

const evidence = FOOTPRINT.filter((f) => f.kind === "code");
const writeups = posts.filter((p) => ["CTF Writeups", "Pentesting", "SOC"].includes(p.category));

export default function AchievementsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <JsonLd data={breadcrumbSchema([["Security Practice", "/achievements"]])} />
        <div className="container">

          {/* Header */}
          <div className="mb-14">
            <p className="text-label mb-3">Practice & training</p>
            <h1 className="text-headline mb-4">
              Learning security{" "}
              <span className="gradient-text">by doing</span>
            </h1>
            <p className="text-body" style={{ color: "var(--text-muted)", maxWidth: "52ch" }}>
              Structured training, hands-on labs, and teaching others. Every item below links to
              public evidence.
            </p>
          </div>

          {/* Milestones */}
          <section className="mb-16" aria-labelledby="milestones">
            <h2 id="milestones" className="text-label mb-8">Milestones</h2>
            <ol className="grid sm:grid-cols-2 gap-4">
              {milestones.map((m) => {
                const external = m.href.startsWith("http");
                const Icon = m.icon;
                return (
                  <li key={m.title} className="card p-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--surface-3)", color: "var(--accent)" }}
                        aria-hidden
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-small" style={{ color: "var(--text-dim)" }}>{m.year}</span>
                    </div>
                    <h3 className="font-display font-semibold" style={{ fontSize: "var(--step-1)" }}>{m.title}</h3>
                    <p className="text-small flex-1" style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>{m.detail}</p>
                    {external ? (
                      <a href={m.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-small font-medium" style={{ color: "var(--accent)" }}>
                        {m.cta} <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                      </a>
                    ) : (
                      <Link href={m.href} className="inline-flex items-center gap-1.5 text-small font-medium" style={{ color: "var(--accent)" }}>
                        {m.cta} <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Writeups */}
          <section className="mb-16" aria-labelledby="writeups">
            <h2 id="writeups" className="text-label mb-8">Writeups</h2>
            <ul className="grid gap-0" style={{ borderTop: "1px solid var(--border)" }}>
              {writeups.map((p) => (
                <li key={p.slug} style={{ borderBottom: "1px solid var(--border)" }}>
                  <Link href={`/blog/${p.slug}`} className="group flex flex-wrap items-center justify-between gap-3 py-5">
                    <span>
                      <span className="text-label block mb-1" style={{ fontSize: ".65rem", color: "var(--accent)" }}>{p.category}</span>
                      <span className="font-display font-semibold" style={{ fontSize: "var(--step-1)" }}>{p.title}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" style={{ color: "var(--text-muted)" }} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Public evidence */}
          <section className="mb-16" aria-labelledby="evidence">
            <h2 id="evidence" className="text-label mb-8">Code on GitHub</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {evidence.map((e) => (
                <a key={e.url} href={e.url} target="_blank" rel="noopener noreferrer" className="card p-5 flex flex-col gap-2 no-underline">
                  <span className="font-display font-semibold flex items-center gap-2" style={{ fontSize: "var(--step-0)" }}>
                    {e.title} <ExternalLink className="w-3.5 h-3.5" style={{ color: "var(--text-dim)" }} aria-hidden />
                  </span>
                  <span className="text-small" style={{ color: "var(--text-muted)", lineHeight: 1.65 }}>{e.summary}</span>
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="card-glass rounded-[var(--radius-lg)] px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-semibold mb-2" style={{ fontSize: "var(--step-2)" }}>
                Training a team or hiring?
              </h2>
              <p className="text-small" style={{ color: "var(--text-muted)", maxWidth: "44ch" }}>
                I teach hands-on networking and security, and I&apos;m open to infrastructure and security roles.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary flex-shrink-0">
              Get in touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
