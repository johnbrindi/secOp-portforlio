import Navbar from "../components/navbar";
import Footer from "../components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Mazweoh John Brindi",
  description:
    "Learn about Mazweoh John Brindi N., a cybersecurity professional specialising in SOC operations, network administration, and web penetration testing.",
};

const timeline = [
  {
    year: "2024",
    role: "Web Penetration Testing Intern",
    org: "SEED Cybersecurity",
    note: "Research, exploit, and report on OWASP Top 10 vulnerabilities in a controlled lab environment.",
  },
  {
    year: "2023",
    role: "SOC Analyst",
    org: "Freelance / Consulting",
    note: "Monitored SIEM alerts, triaged incidents, and performed log analysis across multiple client environments.",
  },
  {
    year: "2022",
    role: "Network Administrator",
    org: "Academic / Personal Projects",
    note: "Designed and deployed network topologies; built an Intrusion Detection System from scratch.",
  },
];

export default function AboutMePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">

          {/* ── Bio block ───────────────────────────────── */}
          <div
            className="grid md:grid-cols-[200px_1fr] gap-12 items-start mb-20"
            style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-xl)" }}
          >
            {/* Avatar */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto md:mx-0 flex-shrink-0">
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
                alt="Mazweoh John Brindi"
                className="relative w-full h-full object-cover rounded-2xl"
                style={{ border: "1px solid var(--border-hi)" }}
              />
            </div>

            {/* Text */}
            <div>
              <p className="text-label mb-3">About me</p>
              <h1 className="text-headline mb-4">
                Mazweoh John Brindi N.
              </h1>
              <p
                className="text-small font-medium mb-6 tracking-wide"
                style={{ color: "var(--accent)" }}
              >
                SOC Analyst · Network Administrator · Security Researcher · Web Pentester
              </p>
              <div className="prose" style={{ fontSize: "var(--step-1)" }}>
                <p>
                  I got into security because I wanted to understand how things
                  break — not just how to patch them. That curiosity led me from
                  building network topologies to designing IDS systems, and
                  eventually to web penetration testing and SOC operations.
                </p>
                <p>
                  My approach is simple: think like an attacker, document like an
                  engineer, and communicate like a human. I care deeply about making
                  security accessible — not just for enterprises, but for everyone.
                </p>
                <p>
                  When I&apos;m not in a terminal, I&apos;m writing about what I&apos;ve learned,
                  competing in CTFs, or exploring the next vulnerability class.
                </p>
              </div>
            </div>
          </div>

          {/* ── Timeline ────────────────────────────────── */}
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
                    {/* dot */}
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
                    <p className="text-small mb-2" style={{ color: "var(--accent-2)" }}>
                      {item.org}
                    </p>
                    <p className="text-small" style={{ color: "var(--text-muted)" }}>
                      {item.note}
                    </p>
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
