import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { GraduationCap, Mic, Award, BookOpen, Shield, Network, Globe, Terminal } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Mazwewoh John Brindi",
  description:
    "Enterprise networking and IT infrastructure engineer. Designed carrier-grade MPLS backbones at CRTV, mentored 50+ students at SEED, and led backend infrastructure at ZIGEX.",
};

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
    role: "Backend Infrastructure Lead and System Architect",
    org: "ZIGEX",
    tags: ["Node.js", "PostgreSQL", "Redis", "REST API", "System Architecture", "WebSockets"],
    points: [
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

export default function AboutMePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
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
              <img
                src="/pic.jpg"
                alt="Mazwewoh John Brindi"
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
                  Beyond infrastructure, I lead the backend engineering at ZIGEX and spend a significant part of my time mentoring the next generation of engineers at SEED, where I have worked with over 50 students across networking and cybersecurity disciplines.
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

        </div>
      </main>
      <Footer />
    </>
  );
}
