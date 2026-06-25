import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { GraduationCap, Mic, Award, BookOpen, Shield, Network, Globe, Terminal } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Mazwewoh John Brindi",
  description:
    "Learn about Mazwewoh John Brindi Nwosoh, a Cybersecurity Lead and IT professional specialising in SOC operations, network security, web penetration testing, and founder of ZIGEX.",
};

const timeline = [
  {
    year: "2025",
    role: "Cybersecurity Lead — Speaker",
    org: "DevFest Bamenda 2025 · Google Developer Groups",
    note: "Led the cybersecurity track at DevFest Bamenda 2025, delivering sessions on practical security for developers and youth digital empowerment across Cameroon.",
  },
  {
    year: "2024",
    role: "Founder & Lead Developer",
    org: "ZIGEX Platform",
    note: "Founded ZIGEX — a career and internship platform for students across Cameroon. Scaled to 500+ active users. Stack: Next.js, TypeScript, PostgreSQL, cloud deployment.",
  },
  {
    year: "2024",
    role: "Web Penetration Testing",
    org: "SEED Cybersecurity",
    note: "Researched, exploited, and documented OWASP Top 10 vulnerabilities in a controlled lab environment. Produced formal penetration testing reports.",
  },
  {
    year: "2023",
    role: "SOC Analyst",
    org: "Freelance / Consulting",
    note: "Monitored SIEM alerts, triaged security incidents, and performed log analysis across multiple client environments. Tuned detection rules to reduce false-positive rates.",
  },
  {
    year: "2022",
    role: "Network Security Practitioner",
    org: "Academic / Personal Projects",
    note: "Designed multi-VLAN network topologies with DMZ, firewalls, and IDS/IPS using PNETLab and Cisco IOS. Built a home IDS from scratch using Suricata.",
  },
];

const skills = [
  { name: "Security Operations (SOC)", level: 88, category: "Operations" },
  { name: "Web Application Pentesting", level: 85, category: "Offensive" },
  { name: "Network Security & Design", level: 82, category: "Infrastructure" },
  { name: "SIEM & Log Analysis", level: 86, category: "Operations" },
  { name: "Identity & Access Management", level: 78, category: "IAM" },
  { name: "Threat Hunting", level: 75, category: "Operations" },
  { name: "Incident Response", level: 80, category: "Operations" },
  { name: "Python / Scripting", level: 72, category: "Engineering" },
];

const education = [
  {
    degree: "Higher National Diploma — Computer Science",
    school: "National Higher Polytechnic Institute (NAHPI)",
    location: "Bamenda, Cameroon",
    year: "2022 – Present",
  },
  {
    degree: "University of Bamenda",
    school: "Faculty of Science",
    location: "Bamenda, Cameroon",
    year: "2020 – 2022",
  },
];

const certifications = [
  { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", status: "earned" },
  { name: "CompTIA Security+", issuer: "CompTIA", status: "earned" },
  { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", status: "earned" },
  { name: "OSCP", issuer: "Offensive Security", status: "in-progress" },
  { name: "Okta Certified Professional", issuer: "Okta", status: "in-progress" },
  { name: "AWS Security Specialty", issuer: "Amazon Web Services", status: "in-progress" },
];

const communityWork = [
  {
    title: "DevFest Bamenda 2025",
    role: "Cybersecurity Lead & Speaker",
    description: "Delivered cybersecurity sessions to developers and students at Cameroon's largest Google Developer Festival.",
    icon: Mic,
    color: "var(--accent)",
  },
  {
    title: "ZIGEX Youth Initiative",
    role: "Founder",
    description: "Built a platform to connect Cameroonian students with internships and career opportunities, reaching 500+ users.",
    icon: Globe,
    color: "#4ade80",
  },
  {
    title: "Security Education Advocacy",
    role: "Contributor",
    description: "Active advocate for accessible cybersecurity education for youth across Cameroon and West Africa.",
    icon: Shield,
    color: "var(--accent-2)",
  },
];

const currentlyLearning = [
  "Offensive Security Certified Professional (OSCP) — active lab practice",
  "SCIM provisioning and enterprise identity lifecycle management",
  "Advanced threat hunting with YARA rules and behavioral analysis",
  "Rust for low-level security tooling",
  "Cloud-native security architecture on AWS",
];

export default function AboutMePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">

          {/* ── Bio block ───────────────────────────────── */}
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
                src="/profile.jpg"
                alt="Mazwewoh John Brindi — DevFest Bamenda 2025"
                style={{
                  position: "relative",
                  width: "200px",
                  height: "240px",
                  objectFit: "cover",
                  objectPosition: "center top",
                  borderRadius: "16px",
                  border: "1px solid var(--border-hi)",
                  display: "block",
                }}
              />
            </div>

            {/* Text */}
            <div>
              <p className="text-label mb-3">About me</p>
              <h1 className="text-headline mb-3">
                Mazwewoh John Brindi Nwosoh
              </h1>
              <p
                className="text-small font-medium mb-6 tracking-wide"
                style={{ color: "var(--accent)" }}
              >
                Cybersecurity Lead · SOC Analyst · Network Security Practitioner · Web Pentester · Founder of ZIGEX
              </p>
              <div className="flex items-center gap-2 mb-6 text-small" style={{ color: "var(--text-muted)" }}>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                  📞 +237 650146590
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                  ✉️ johnbrindimazwewoh@gmail.com
                </span>
              </div>
              <div className="prose" style={{ fontSize: "var(--step-1)" }}>
                <p>
                  I got into security because I wanted to understand how systems
                  break — not just how to patch them. That curiosity led me from building
                  network topologies and IDS systems to web penetration testing and SOC operations.
                </p>
                <p>
                  Outside of security work, I founded <strong>ZIGEX</strong> — a platform built to connect
                  students across Cameroon with internships and career opportunities. I spoke at
                  DevFest Bamenda 2025, and I remain active in digital empowerment initiatives
                  for youth across West Africa.
                </p>
                <p>
                  My approach is straightforward: think like an attacker, document like an
                  engineer, and communicate like a human. I believe security should be
                  accessible — not only for enterprises, but for every developer and end user.
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

          {/* ── Timeline ────────────────────────────────── */}
          <div
            className="mb-20"
            style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-xl)" }}
          >
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

          {/* ── Education ───────────────────────────────── */}
          <div
            className="mb-20"
            style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-xl)" }}
          >
            <p className="text-label mb-8">Education</p>
            <div className="flex flex-col gap-6">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="card flex items-start gap-4 p-6"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold" style={{ fontSize: "var(--step-1)" }}>
                      {edu.degree}
                    </h3>
                    <p className="text-small" style={{ color: "var(--accent-2)" }}>
                      {edu.school} · {edu.location}
                    </p>
                    <p className="text-small" style={{ color: "var(--text-dim)" }}>
                      {edu.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Certifications ──────────────────────────── */}
          <div
            className="mb-20"
            style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-xl)" }}
          >
            <p className="text-label mb-8">Certifications</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="card p-4 flex items-start gap-3"
                  style={
                    cert.status === "in-progress"
                      ? {
                          borderStyle: "dashed",
                          opacity: 0.7,
                        }
                      : {}
                  }
                >
                  <Award
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{
                      color: cert.status === "earned" ? "var(--accent)" : "var(--text-dim)",
                    }}
                  />
                  <div>
                    <p className="font-medium text-small">{cert.name}</p>
                    <p className="text-small" style={{ color: "var(--text-muted)", fontSize: ".7rem" }}>
                      {cert.issuer}
                    </p>
                    {cert.status === "in-progress" && (
                      <span
                        className="text-label mt-1 inline-block"
                        style={{ fontSize: ".6rem", color: "#f59e0b" }}
                      >
                        In progress
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Community ───────────────────────────────── */}
          <div
            id="community"
            className="mb-20"
            style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-xl)" }}
          >
            <p className="text-label mb-8">Community leadership</p>
            <div className="grid md:grid-cols-3 gap-4">
              {communityWork.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="card p-6 flex flex-col gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `color-mix(in srgb, ${item.color} 14%, transparent)`,
                        color: item.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1" style={{ fontSize: "var(--step-1)" }}>
                        {item.title}
                      </h3>
                      <p className="text-small mb-2" style={{ color: "var(--accent-2)", fontSize: ".72rem" }}>
                        {item.role}
                      </p>
                      <p className="text-small" style={{ color: "var(--text-muted)" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Currently Learning ──────────────────────── */}
          <div
            className="mb-20"
            style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-xl)" }}
          >
            <p className="text-label mb-8">Currently learning</p>
            <div className="flex flex-col gap-3">
              {currentlyLearning.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-3"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-mono font-bold"
                    style={{
                      background: "var(--accent-glow)",
                      color: "var(--accent)",
                      fontSize: ".6rem",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-small" style={{ color: "var(--text-muted)" }}>
                    {item}
                  </p>
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
