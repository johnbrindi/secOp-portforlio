import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Shield, Terminal, Network, Lock, Server, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab — Mazwewoh John Brindi",
  description:
    "Active security labs and home lab environment built by Mazwewoh John Brindi — SOC simulation, web security testing, IAM demonstration, and enterprise network design.",
};

const activeLabs = [
  {
    id: "soc-lab",
    title: "SOC Home Lab",
    status: "active",
    description:
      "A fully deployed Security Operations Center simulation environment running on self-hosted infrastructure. Ingests real attack telemetry from Kali Linux attack simulations against hardened endpoints.",
    stack: ["Wazuh 4.7", "Elastic SIEM 8.x", "Sysmon", "Suricata", "Ubuntu 22.04"],
    icon: Shield,
    accentColor: "var(--accent)",
    capabilities: [
      "Real-time log ingestion and alerting",
      "SIEM rule tuning and correlation",
      "Endpoint detection and response (EDR) via Wazuh agents",
      "Network IDS/IPS with Suricata",
      "Incident simulation and investigation workflows",
    ],
  },
  {
    id: "web-security-lab",
    title: "Web Security Lab",
    status: "active",
    description:
      "A controlled environment for OWASP Top 10 testing, vulnerability exploitation, and remediation documentation. Runs DVWA and custom vulnerable web applications.",
    stack: ["DVWA", "Burp Suite", "OWASP ZAP", "SQLMap", "Kali Linux"],
    icon: Terminal,
    accentColor: "var(--accent-2)",
    capabilities: [
      "SQL Injection exploitation and parameterized query remediation",
      "XSS payload crafting and CSP implementation",
      "CSRF token bypass and SameSite cookie analysis",
      "File upload vulnerability testing",
      "Business logic flaw identification",
    ],
  },
  {
    id: "network-lab",
    title: "Enterprise Network Design Lab",
    status: "active",
    description:
      "A full enterprise network simulation using PNETLab and GNS3. Covers multi-VLAN segmentation, DMZ design, firewall rule sets, and VPN connectivity.",
    stack: ["PNETLab", "GNS3", "Cisco IOS", "pfSense", "Suricata"],
    icon: Network,
    accentColor: "#f59e0b",
    capabilities: [
      "Multi-VLAN segmentation with inter-VLAN routing control",
      "DMZ architecture with dual-firewall configuration",
      "pfSense firewall rule design and testing",
      "Site-to-site VPN configuration",
      "IDS/IPS placement and traffic mirroring",
    ],
  },
  {
    id: "iam-lab",
    title: "IAM Demonstration Lab",
    status: "partial",
    description:
      "Enterprise Identity and Access Management demonstration built on Okta OIDC. Showcases RBAC, MFA enforcement, session management, and protected admin console.",
    stack: ["Okta OIDC", "NextAuth.js", "RBAC", "MFA", "Next.js"],
    icon: Lock,
    accentColor: "#4ade80",
    capabilities: [
      "OIDC authentication flow with Okta",
      "Role-based access control (Admin, Viewer, Lab User)",
      "Multi-factor authentication enforcement",
      "Session management and secure logout",
      "Audit log of all authentication events",
    ],
    // TODO: Full IAM lab becomes active once Okta credentials are configured in .env
    // Required: OKTA_CLIENT_ID, OKTA_CLIENT_SECRET, OKTA_ISSUER, NEXTAUTH_SECRET, NEXTAUTH_URL
  },
];

const infraSpecs = [
  { label: "Hypervisor", value: "KVM / Proxmox" },
  { label: "Endpoints monitored", value: "3 (Win10, Ubuntu x2)" },
  { label: "Log retention", value: "30 days (Elasticsearch)" },
  { label: "Alerts configured", value: "80+ Wazuh rules" },
  { label: "Attack simulations run", value: "50+ sessions" },
  { label: "Network nodes", value: "12+ (PNETLab)" },
];

function StatusBadge({ status }: { status: "active" | "partial" | "offline" }) {
  const config = {
    active: { label: "Active", color: "#4ade80", bg: "rgba(74,222,128,.1)" },
    partial: { label: "Partial", color: "#f59e0b", bg: "rgba(245,158,11,.1)" },
    offline: { label: "Offline", color: "var(--text-dim)", bg: "var(--surface-3)" },
  }[status];
  return (
    <span
      className="text-label flex items-center gap-1.5"
      style={{
        fontSize: ".6rem",
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.color}30`,
        padding: ".25em .7em",
        borderRadius: "999px",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: config.color,
          animation: status === "active" ? "pulse 2s infinite" : undefined,
        }}
      />
      {config.label}
    </span>
  );
}

export default function LabPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">

          {/* Header */}
          <div className="mb-14">
            <p className="text-label mb-3">Lab Environment</p>
            <h1 className="text-headline mb-4">
              Where the <span className="gradient-text">real learning happens</span>
            </h1>
            <p className="text-body" style={{ color: "var(--text-muted)", maxWidth: "52ch" }}>
              Hands-on lab environments purpose-built for security operations, penetration testing,
              network design, and identity management. Everything here generates real attack and defense telemetry.
            </p>
          </div>

          {/* Active Labs */}
          <div className="mb-20">
            <p className="text-label mb-8">Active labs</p>
            <div className="flex flex-col gap-6">
              {activeLabs.map((lab) => {
                const Icon = lab.icon;
                return (
                  <div
                    key={lab.id}
                    id={lab.id}
                    className="card p-6 md:p-8"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `color-mix(in srgb, ${lab.accentColor} 12%, transparent)`,
                            color: lab.accentColor,
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h2
                            className="font-display font-semibold"
                            style={{ fontSize: "var(--step-2)" }}
                          >
                            {lab.title}
                          </h2>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {lab.stack.map((s) => (
                              <span
                                key={s}
                                className="text-small px-1.5 py-0.5 rounded"
                                style={{
                                  background: "var(--surface-3)",
                                  color: "var(--text-dim)",
                                  fontSize: ".67rem",
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <StatusBadge status={lab.status as "active" | "partial" | "offline"} />
                    </div>

                    <p
                      className="text-small leading-relaxed mb-6"
                      style={{ color: "var(--text-muted)", maxWidth: "64ch" }}
                    >
                      {lab.description}
                    </p>

                    {lab.status === "partial" && (
                      <div
                        className="flex items-start gap-2 p-3 rounded-lg mb-6"
                        style={{
                          background: "rgba(245,158,11,.06)",
                          border: "1px solid rgba(245,158,11,.18)",
                        }}
                      >
                        <p className="text-small" style={{ color: "#f59e0b" }}>
                          {/* TODO: Full activation requires OKTA_CLIENT_ID, OKTA_CLIENT_SECRET, OKTA_ISSUER, NEXTAUTH_SECRET, NEXTAUTH_URL in .env */}
                          IAM lab is partially deployed. Full Okta OIDC integration requires credentials.
                          The architecture and protected route logic are already implemented.
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-label mb-3" style={{ fontSize: ".65rem" }}>Capabilities</p>
                      <ul className="flex flex-col gap-2">
                        {lab.capabilities.map((cap, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-small"
                            style={{ color: "var(--text-muted)" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                              style={{ background: lab.accentColor }}
                            />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Infrastructure Specs */}
          <div
            className="mb-20"
            style={{ borderTop: "1px solid var(--border)", paddingTop: "var(--space-xl)" }}
          >
            <p className="text-label mb-8">Infrastructure overview</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {infraSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="card p-5 flex flex-col gap-1"
                >
                  <p className="text-small" style={{ color: "var(--text-muted)" }}>
                    {spec.label}
                  </p>
                  <p
                    className="font-display font-semibold"
                    style={{ fontSize: "var(--step-1)", color: "var(--text)" }}
                  >
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Request Lab Access CTA */}
          <div
            className="card-glass rounded-[var(--radius-lg)] px-8 py-12 text-center"
            style={{ maxWidth: "640px", margin: "0 auto" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
            >
              <Server className="w-6 h-6" />
            </div>
            <h2
              className="font-display font-semibold mb-3"
              style={{ fontSize: "var(--step-2)" }}
            >
              Request lab access
            </h2>
            <p className="text-body mb-6" style={{ color: "var(--text-muted)", maxWidth: "40ch", margin: "0 auto 1.5rem" }}>
              Interested in seeing the IAM demo or SOC environment live?
              Send a request and I will schedule a walkthrough.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Request access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
