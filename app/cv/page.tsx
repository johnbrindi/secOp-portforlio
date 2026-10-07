"use client";

import { useEffect } from "react";
import { Download, Phone, Mail, Globe, Linkedin, Github, MapPin } from "lucide-react";

export default function CVPage() {
  useEffect(() => {
    // Auto-trigger print dialog so user can save as PDF
    const timer = setTimeout(() => window.print(), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Print trigger button — hidden when printing */}
      <div
        className="no-print"
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 100,
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          onClick={() => window.print()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: ".5em 1.1em",
            borderRadius: "8px",
            background: "#6d28d9",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          <Download size={15} />
          Save as PDF
        </button>
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            padding: ".5em 1.1em",
            borderRadius: "8px",
            background: "#1a1a2e",
            color: "#aaa",
            border: "1px solid #333",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Back
        </a>
      </div>

      {/* ── CV Document ───────────────────────────── */}
      <div
        id="cv-content"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2.5rem 2rem",
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "#111",
          background: "#fff",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div style={{ borderBottom: "3px solid #6d28d9", paddingBottom: "1rem", marginBottom: "1.2rem" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>
            Mazwewoh John Brindi Nwosoh
          </h1>
          <p style={{ fontSize: "14px", color: "#6d28d9", fontWeight: 600, marginTop: "4px" }}>
            Network & Systems Infrastructure Engineer · Security Lead · Founder, ZIGEX
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "10px",
              fontSize: "12px",
              color: "#555",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Mail size={12} /> johnbrindimazwewoh@gmail.com
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Phone size={12} /> +237 650146590
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={12} /> Bambili, Cameroon
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Globe size={12} /> mazwewohjohnbrindi.vercel.app
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Linkedin size={12} /> linkedin.com/in/mazwewohjohnbrindi
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Github size={12} /> github.com/johnbrindi
            </span>
          </div>
        </div>

        {/* Summary */}
        <Section title="Professional Summary">
          <p style={{ color: "#333", margin: 0 }}>
            Network &amp; Systems Infrastructure Engineer and Security Lead with hands-on experience
            designing SOC frameworks, building enterprise LAN/WAN infrastructure, and implementing
            SIEM-based threat detection pipelines. Founder of ZIGEX, a career platform serving 500+
            students across Cameroon. Skilled in penetration testing, IDS/IPS deployment, identity
            and access management, and backend development. Currently pursuing a B.Eng. in Computer
            Engineering at NAHPI Bamenda.
          </p>
        </Section>

        {/* Skills */}
        <Section title="Technical Skills">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 2rem" }}>
            <SkillGroup label="Networking" items={["LAN/WAN Design & Implementation", "TCP/IP, Routing & Switching (Cisco)", "Network Traffic Analysis (Wireshark)", "TP-Link Switch Configuration", "VLANs & Network Segmentation"]} />
            <SkillGroup label="Security" items={["SOC Operations & SIEM (Wazuh)", "IDS/IPS Deployment (Suricata)", "Web Application Penetration Testing", "Incident Response", "IAM (Okta, OIDC, NextAuth.js)"]} />
            <SkillGroup label="Systems" items={["Linux System Administration", "Server Hardening", "Wazuh SIEM Configuration", "Suricata Rule Management"]} />
            <SkillGroup label="Development" items={["Backend Development (Node.js)", "Next.js / React", "PostgreSQL, Prisma ORM", "REST APIs", "Git & GitHub"]} />
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <ExperienceItem
            title="CEO & Founder"
            org="ZIGEX — Bamenda"
            date="2025 – Present"
            bullets={[
              "Founded and led a career platform connecting 500+ students with internships, programs, and events in tech across Cameroon.",
              "Drove product strategy, partnerships, and led backend architecture design.",
              "Oversaw full development lifecycle from MVP to production deployment.",
            ]}
          />
          <ExperienceItem
            title="Cybersecurity Instructor"
            org="SEED — Bamenda"
            date="2025"
            bullets={[
              "Designed and delivered cybersecurity curriculum covering SOC operations, threat detection, and penetration testing fundamentals.",
              "Mentored students on hands-on labs using Wazuh, Wireshark, and Kali Linux.",
            ]}
          />
          <ExperienceItem
            title="Physics Tutor"
            org="Model Initiative of Africa (MIA) — Bamenda"
            date="2024"
            bullets={[
              "Provided academic instruction to secondary school students in physics.",
            ]}
          />
        </Section>

        {/* Projects */}
        <Section title="Key Projects">
          <ProjectItem
            title="SOC Implementation with Wazuh SIEM"
            bullets={[
              "Designed and deployed a functional Security Operations Center using Wazuh as SIEM, Suricata as IDS/IPS, and custom alert rules.",
              "Configured log collection pipelines, real-time dashboards, and incident response workflows.",
            ]}
          />
          <ProjectItem
            title="Enterprise LAN Infrastructure Design"
            bullets={[
              "Designed and physically established a LAN infrastructure using TP-Link managed switches, CAT5e cabling, and router configuration.",
              "Implemented proper IP addressing, VLANs, and full network documentation.",
            ]}
          />
          <ProjectItem
            title="SecOps Portfolio with Okta IAM"
            bullets={[
              "Built a production cybersecurity portfolio in Next.js with enterprise-grade IAM using Okta OIDC and NextAuth.js.",
              "Implemented route protection middleware, JWT sessions, and authentication policy management.",
            ]}
          />
          <ProjectItem
            title="ZIGEX — Career Platform"
            bullets={[
              "Led backend development for a student-facing internship platform; grew to 500+ users.",
              "Tech stack: Next.js, Node.js, PostgreSQL, cloud deployment.",
            ]}
          />
        </Section>

        {/* Education */}
        <Section title="Education">
          <ExperienceItem
            title="B.Eng. Computer Engineering"
            org="National Higher Polytechnic Institute (NAHPI), Bamenda"
            date="2023 – Present"
            bullets={[]}
          />
        </Section>

        {/* Certifications */}
        <Section title="Certifications">
          <ul style={{ margin: 0, paddingLeft: "1.1rem", columns: 2, columnGap: "2rem" }}>
            {[
              "Ethical Hacker — Cisco Networking Academy, 2024",
              "Network Basics — Cisco Networking Academy, 2024",
              "Introduction to Cybersecurity — Cisco Networking Academy, 2024",
              "Performing Post-Exploitation Techniques — Cisco, 2024",
              "Exploiting Application-Based Vulnerabilities — Cisco, 2024",
              "Information Gathering & Vulnerability Scanning — Cisco, 2024",
              "Planning & Scoping a Pentest Assessment — Cisco, 2024",
              "Social Engineering Attacks — Cisco, 2024",
              "Exploiting Wired & Wireless Networks — Cisco, 2024",
              "Network Defense — Cisco, 2024",
              "Cloud, Mobile & IoT Security — Cisco, 2024",
              "Certified Backend Developer — SEED Bamenda, 2026",
            ].map((c) => (
              <li key={c} style={{ marginBottom: "4px", color: "#333" }}>
                {c}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; }
          #cv-content {
            padding: 1.5rem 1.5rem;
            max-width: 100%;
            font-size: 12px;
          }
        }
        @page {
          size: A4;
          margin: 1.5cm;
        }
      `}</style>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <h2
        style={{
          fontSize: "11px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: "#6d28d9",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "4px",
          marginBottom: "10px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <p style={{ fontWeight: 700, margin: "0 0 2px", color: "#111" }}>{label}</p>
      <ul style={{ margin: 0, paddingLeft: "1rem", color: "#444" }}>
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}

function ExperienceItem({ title, org, date, bullets }: { title: string; org: string; date: string; bullets: string[] }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <strong style={{ fontSize: "13px" }}>{title}</strong>
        <span style={{ fontSize: "11px", color: "#888" }}>{date}</span>
      </div>
      <p style={{ margin: "1px 0 4px", color: "#6d28d9", fontSize: "12px", fontWeight: 600 }}>{org}</p>
      {bullets.length > 0 && (
        <ul style={{ margin: "4px 0 0", paddingLeft: "1.1rem", color: "#444" }}>
          {bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      )}
    </div>
  );
}

function ProjectItem({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div style={{ marginBottom: "0.8rem" }}>
      <strong style={{ fontSize: "13px" }}>{title}</strong>
      <ul style={{ margin: "3px 0 0", paddingLeft: "1.1rem", color: "#444" }}>
        {bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </div>
  );
}
