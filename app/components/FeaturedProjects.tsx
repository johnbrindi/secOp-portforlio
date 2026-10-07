import { Shield, GitBranch, Users, Globe, Mic, ArrowRight } from "lucide-react";
import Link from "next/link";

const featuredProjects = [
  {
    id: "zigex",
    title: "ZIGEX",
    role: "Founder & Lead Developer",
    description:
      "A platform connecting students with internships, career opportunities, and professional growth resources across Cameroon. 500+ active users and growing.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Cloud"],
    icon: Globe,
    accentColor: "#4ade80",
    stat: "500+ users",
    href: "/projects#zigex",
    featured: true,
  },
  {
    id: "iam",
    title: "Enterprise IAM Portfolio",
    role: "Security Engineer",
    description:
      "Live demonstration of enterprise Identity and Access Management concepts including Okta OIDC, RBAC, MFA, session management, and audit logging.",
    tags: ["Okta OIDC", "RBAC", "MFA", "Next.js"],
    icon: Shield,
    accentColor: "var(--accent)",
    stat: "Live demo",
    href: "/projects#iam",
    featured: false,
  },
  {
    id: "soc-lab",
    title: "SOC Home Lab",
    role: "Security Operations",
    description:
      "Designed and deployed a simulated Security Operations Center environment with Wazuh, Elastic SIEM, Sysmon, and Suricata for real-time threat detection.",
    tags: ["Wazuh", "Elastic SIEM", "Suricata", "Ubuntu"],
    icon: GitBranch,
    accentColor: "var(--accent-2)",
    stat: "Self-hosted",
    href: "/projects#soc-lab",
    featured: false,
  },
  {
    id: "network",
    title: "Enterprise Network Design",
    role: "Network Security",
    description:
      "Designed and simulated multi-VLAN infrastructure with DMZ, firewalls, IDS/IPS, and VPN connectivity using PNETLab and Cisco IOS.",
    tags: ["PNETLab", "Cisco IOS", "pfSense", "GNS3"],
    icon: Users,
    accentColor: "#f59e0b",
    stat: "Full topology",
    href: "/projects#network",
    featured: false,
  },
];

export default function FeaturedProjects() {
  return (
    <section className="section">
      <div className="container">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-label mb-3">Portfolio</p>
            <h2 className="text-title">
              Selected <span className="gradient-text">work</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-small font-medium transition-all duration-300 hover:gap-3"
            style={{ color: "var(--accent)" }}
          >
            All projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          }}
        >
          {featuredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.id}
                href={project.href}
                className="card group flex flex-col gap-4 p-6 no-underline relative overflow-hidden"
                style={{ minHeight: "220px" }}
              >
                {project.featured && (
                  <span
                    className="absolute top-4 right-4 text-label px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(74,222,128,.12)",
                      color: "#4ade80",
                      fontSize: ".6rem",
                      border: "1px solid rgba(74,222,128,.25)",
                    }}
                  >
                    Flagship
                  </span>
                )}

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `color-mix(in srgb, ${project.accentColor} 14%, transparent)`,
                    color: project.accentColor,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3
                      className="font-display font-semibold"
                      style={{ fontSize: "var(--step-1)" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-small mb-3" style={{ color: "var(--accent-2)", fontSize: ".72rem" }}>
                    {project.role}
                  </p>
                  <p className="text-small leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-small px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--surface-3)",
                        color: "var(--text-dim)",
                        fontSize: ".67rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-center gap-1.5 text-small font-medium transition-all duration-300 group-hover:gap-3"
                  style={{ color: project.accentColor }}
                >
                  View project <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
