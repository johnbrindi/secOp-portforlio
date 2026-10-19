import Navbar from "../components/navbar";
import Footer from "../components/footer";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { JsonLd, PERSON_ID, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { FOOTPRINT, MEDIUM_ARTICLES } from "@/lib/footprint";
import { SITE_URL } from "@/lib/site";
import Image from "next/image";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Mazwewoh John Brindi, network and infrastructure engineer in Bamenda, Cameroon: MPLS design at CRTV, cybersecurity teaching at SEED, and ZIGEX.",
  path: "/about",
  ogType: "profile",
});

const timeline = [
  {
    year: "2026",
    role: "Networking Infrastructure Intern",
    org: "CRTV — Cameroon Radio Television, Yaounde",
    tags: ["MPLS", "BGP", "OSPF", "VRF", "QoS", "DHCP", "Cisco IOS"],
    points: [
      "Designed and deployed a Carrier-Grade MPLS backbone connecting the Yaounde HQ with Douala, Bamenda, and Maroua regional hubs using a BGP-Free Core model.",
      "Implemented L3VPN using VRF instances and MP-BGP VPNv4 signaling to ensure strict data isolation across multi-tenant broadcast traffic.",
      "Deployed OSPF Process 100 to establish seamless /32 Loopback reachability across the Provider Edge mesh as an underlay for LDP and BGP sessions.",
      "Engineered a QoS policy using CBWFQ and LLQ, prioritizing critical ToIP sessions and guaranteeing bandwidth for centralized HQ NAS media uploads.",
      "Diagnosed and resolved a complete network outage: client PCs were receiving DHCP leases but could not reach the internet. Traced the fault to a misconfigured default gateway on the DHCP server and corrected it, restoring full internet connectivity across the site.",
      "Performed physical hardware upgrades and cable management on production server racks and network panels.",
    ],
  },
  {
    year: "2025 – present",
    role: "CEO & Founder",
    org: "ZIGEX — Bamenda",
    tags: ["Leadership", "Product Strategy", "Node.js", "PostgreSQL", "System Architecture", "Security"],
    points: [
      "Founded ZIGEX, a career platform connecting students in Bamenda and across Cameroon with internships, programs and tech opportunities; lead the company's strategy, partnerships and product.",
      "Designed and led the backend infrastructure and system architecture for ZIGEX, a technology platform serving real-time operational needs.",
      "Architected the API layer, database schema, authentication system, and service communication patterns for the core platform.",
      "Implemented scalable patterns including connection pooling, Redis caching, and WebSocket real-time channels.",
    ],
  },
  {
    year: "2024 – present",
    role: "Networking and Cybersecurity Mentor",
    org: "SEED",
    tags: ["Teaching", "Cisco", "Networking", "Cybersecurity", "Linux"],
    points: [
      "Mentored over 50 students in networking fundamentals, Cisco configuration, and cybersecurity practices.",
      "Delivered hands-on lab sessions covering topics including VLANs, routing protocols, firewall configuration, and Linux system hardening.",
      "Guided students through practical projects and real-world scenarios bridging theoretical knowledge with applied engineering skills.",
    ],
  },
  {
    year: "2024",
    role: "Web Penetration Testing",
    org: "SEED Cybersecurity",
    tags: ["OWASP", "Burp Suite", "SQLi", "XSS", "CSRF", "Kali Linux"],
    points: [
      "Researched, exploited, and reported on OWASP Top 10 vulnerabilities in controlled lab environments.",
      "Documented findings and remediation recommendations following standard penetration testing reporting formats.",
    ],
  },
];

const skills = [
  { name: "Routing & Switching (Cisco)", level: 90, category: "Networking" },
  { name: "MPLS, BGP, OSPF", level: 85, category: "Networking" },
  { name: "Linux Administration", level: 85, category: "Systems" },
  { name: "Node.js & Backend Architecture", level: 80, category: "Development" },
  { name: "Penetration Testing (Web)", level: 75, category: "Security" },
  { name: "Network Troubleshooting", level: 95, category: "Operations" },
];

export default function AboutMePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <JsonLd
          data={[
            breadcrumbSchema([["About", "/about"]]),
            {
              "@type": "ProfilePage",
              "@id": `${SITE_URL}/about#profilepage`,
              url: `${SITE_URL}/about`,
              name: "About Mazwewoh John Brindi",
              dateCreated: "2025-10-01T00:00:00Z",
              dateModified: "2026-10-19T00:00:00Z",
              mainEntity: { "@id": PERSON_ID },
              hasPart: MEDIUM_ARTICLES.map((a) => ({
                "@type": "Article",
                headline: a.title,
                url: a.url,
                author: { "@id": PERSON_ID },
              })),
            },
          ]}
        />
        <div className="container">

          {/* Bio block */}
          <div
            className="grid md:grid-cols-[220px_1fr] gap-12 items-start mb-20"
            style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-xl)" }}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0 mx-auto md:mx-0">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)",
                  transform: "scale(1.2)",
                }}
              />
              <Image
                src="/pic.jpg"
                alt="Mazwewoh John Brindi"
                width={1152}
                height={1101}
                sizes="220px"
                className="relative w-full h-full object-cover rounded-2xl"
                style={{ border: "1px solid var(--border-hi)" }}
              />
            </div>

            {/* Text */}
            <div>
              <p className="text-label mb-3">About me</p>
              <h1 className="text-headline mb-4">
                Mazwewoh John Brindi N.
              </h1>
              <p
                className="text-small font-medium mb-6 tracking-wide"
                style={{ color: "var(--accent)" }}
              >
                Enterprise Networking · IT Infrastructure · Cybersecurity Engineer
              </p>
              <div className="prose" style={{ fontSize: "var(--step-1)" }}>
                <p>
                  I am a networking and IT infrastructure engineer who builds systems that hold together under pressure. My work began with a deep curiosity about how networks actually function at scale, which led me into designing routing architectures, diagnosing production failures, and eventually into the overlapping world of defensive security.
                </p>
                <p>
                  At CRTV, Cameroon&apos;s national broadcaster, I designed a Carrier-Grade MPLS backbone to unify four geographically distributed sites under a single high-performance transit fabric. That project required not just technical knowledge but the ability to reason about path control, traffic isolation, and quality of service simultaneously under real broadcast constraints.
                </p>
                <p>
                  Beyond infrastructure, I am the CEO and founder of ZIGEX — where I also built the backend and security architecture — and I spend a significant part of my time mentoring the next generation of engineers at SEED, where I have worked with over 50 students across networking and cybersecurity disciplines.
                </p>
                <p>
                  My approach is straightforward: understand the system deeply, document everything, and build things that can be trusted.
                </p>
              </div>
            </div>
          </div>

          {/* ── Skills Proficiency ───────────────────────── */}
          <div
            className="mb-20"
            style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-xl)" }}
          >
            <p className="text-label mb-8">Skills proficiency</p>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-small font-medium" style={{ color: "var(--text)" }}>
                      {skill.name}
                    </span>
                    <span className="text-small font-mono" style={{ color: "var(--text-dim)" }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--surface-3)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${skill.level}%`,
                        background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                      }}
                    />
                  </div>
                  <p className="text-small mt-1" style={{ color: "var(--text-dim)", fontSize: ".65rem" }}>
                    {skill.category}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-label mb-8">Experience</p>
            <div className="relative flex flex-col gap-0">
              {/* Vertical line */}
              <div
                className="absolute left-[3.5rem] top-0 bottom-0 w-px hidden md:block"
                style={{ background: "var(--border)" }}
              />

              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-[7rem_1fr] gap-4 md:gap-8 py-8"
                  style={{
                    borderBottom:
                      i < timeline.length - 1 ? "1px solid var(--border)" : undefined,
                  }}
                >
                  {/* Year */}
                  <div className="flex md:flex-col items-center md:items-start gap-3">
                    <span
                      className="font-mono font-bold text-small"
                      style={{ color: "var(--accent)" }}
                    >
                      {item.year}
                    </span>
                    <div
                      className="hidden md:block w-2 h-2 rounded-full mt-1 ml-auto mr-[-4.5px] flex-shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      className="font-display font-semibold mb-0.5"
                      style={{ fontSize: "var(--step-1)" }}
                    >
                      {item.role}
                    </h3>
                    <p className="text-small mb-3" style={{ color: "var(--accent-2)" }}>
                      {item.org}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-small px-2 py-0.5 rounded-full"
                          style={{
                            background: "var(--surface-3)",
                            color: "var(--text-muted)",
                            fontSize: ".68rem",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bullet points */}
                    <ul
                      className="flex flex-col gap-2"
                      style={{ paddingLeft: "1.1rem", listStyleType: "disc" }}
                    >
                      {item.points.map((point, j) => (
                        <li
                          key={j}
                          className="text-small"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Writing ───────────────────────────────────── */}
          <section className="mt-20" aria-labelledby="writing">
            <h2 id="writing" className="text-label mb-8">Published writing</h2>
            <ul className="grid md:grid-cols-3 gap-4">
              {MEDIUM_ARTICLES.map((a) => (
                <li key={a.url}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card p-6 h-full flex flex-col gap-3 no-underline"
                  >
                    <span className="text-label" style={{ fontSize: ".65rem", color: "var(--accent)" }}>
                      {a.source}
                    </span>
                    <span className="font-display font-semibold leading-snug" style={{ fontSize: "var(--step-1)" }}>
                      {a.title}
                    </span>
                    <span className="text-small flex-1" style={{ color: "var(--text-muted)", lineHeight: 1.65 }}>
                      {a.summary}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-small font-medium" style={{ color: "var(--accent)" }}>
                      Read on Medium <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Around the web (sources) ──────────────────── */}
          <section className="mt-20" aria-labelledby="around-the-web">
            <h2 id="around-the-web" className="text-label mb-3">Around the web</h2>
            <p className="text-small mb-8" style={{ color: "var(--text-muted)", maxWidth: "60ch" }}>
              Public profiles and independent sources about my work. Each link goes to the original source.
            </p>
            <ul style={{ borderTop: "1px solid var(--border)" }}>
              {FOOTPRINT.map((f) => (
                <li key={f.url} style={{ borderBottom: "1px solid var(--border)" }}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="group grid sm:grid-cols-[200px_1fr_auto] gap-x-6 gap-y-1 py-5 items-start"
                  >
                    <span className="text-label" style={{ fontSize: ".68rem" }}>{f.source}</span>
                    <span>
                      <span className="block font-medium" style={{ color: "var(--text)" }}>{f.title}</span>
                      <span className="block text-small mt-1" style={{ color: "var(--text-muted)", lineHeight: 1.65 }}>
                        {f.summary}
                      </span>
                    </span>
                    <ExternalLink
                      className="hidden sm:block w-4 h-4 mt-1 transition-colors group-hover:text-[var(--text)]"
                      style={{ color: "var(--text-dim)" }}
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
