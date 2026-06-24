import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from "next/link";
import { getProjects } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import PortableTextContent from "../components/PortableTextContent";
import { ArrowRight, Shield, Globe, Network, Terminal, GitBranch } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Mazwewoh John Brindi",
  description:
    "Cybersecurity projects including SOC lab, web exploitation research, enterprise network design, ZIGEX platform, and IAM implementation by Mazwewoh John Brindi.",
};

// Fallback projects used when Sanity is not configured
const fallbackProjects = [
  {
    _id: "zigex",
    slug: { current: "zigex" },
    title: "ZIGEX — Career & Internship Platform",
    role: "Founder & Lead Developer",
    description: null,
    descriptionText:
      "A platform connecting students across Cameroon with internships, career opportunities, and professional growth resources. Scaled to 500+ active users.",
    mainImage: null,
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Cloud Deployment"],
    category: "Platforms",
    accentColor: "#4ade80",
    icon: Globe,
    featured: true,
    demoUrl: null,
    githubUrl: "https://github.com/johnbrindi/",
  },
  {
    _id: "iam-portfolio",
    slug: { current: "iam-portfolio" },
    title: "Enterprise IAM Portfolio",
    role: "Security Engineer",
    description: null,
    descriptionText:
      "Live demonstration of enterprise Identity and Access Management concepts: Okta OIDC, RBAC, MFA enforcement, session management, and audit logging.",
    mainImage: null,
    tags: ["Okta OIDC", "RBAC", "MFA", "Next.js", "NextAuth.js"],
    category: "IAM",
    accentColor: "var(--accent)",
    icon: Shield,
    featured: false,
    demoUrl: "/lab#iam-lab",
    githubUrl: null,
  },
  {
    _id: "soc-lab",
    slug: { current: "soc-lab" },
    title: "SOC Home Lab",
    role: "Security Operations",
    description: null,
    descriptionText:
      "Designed and deployed a simulated Security Operations Center using Wazuh, Elastic SIEM, Sysmon, and Suricata. Generates real attack telemetry for detection engineering practice.",
    mainImage: null,
    tags: ["Wazuh", "Elastic SIEM", "Sysmon", "Suricata", "Ubuntu"],
    category: "SOC",
    accentColor: "var(--accent-2)",
    icon: Terminal,
    featured: false,
    demoUrl: "/lab#soc-lab",
    githubUrl: null,
  },
  {
    _id: "network-design",
    slug: { current: "network-design" },
    title: "Enterprise Network Design",
    role: "Network Security Practitioner",
    description: null,
    descriptionText:
      "Designed and simulated a multi-VLAN enterprise network with DMZ, firewall rules, IDS/IPS, and VPN connectivity using PNETLab and Cisco IOS.",
    mainImage: null,
    tags: ["PNETLab", "Cisco IOS", "pfSense", "GNS3", "Suricata"],
    category: "Network",
    accentColor: "#f59e0b",
    icon: Network,
    featured: false,
    demoUrl: null,
    githubUrl: null,
  },
  {
    _id: "web-security-lab",
    slug: { current: "web-security-lab" },
    title: "Web Security Lab",
    role: "Web Penetration Tester",
    description: null,
    descriptionText:
      "Controlled environment for OWASP Top 10 testing, vulnerability exploitation, and remediation documentation using DVWA, Burp Suite, and OWASP ZAP.",
    mainImage: null,
    tags: ["DVWA", "Burp Suite", "OWASP ZAP", "SQLMap", "Kali Linux"],
    category: "Web Security",
    accentColor: "var(--accent)",
    icon: Terminal,
    featured: false,
    demoUrl: "/lab#web-security-lab",
    githubUrl: null,
  },
  {
    _id: "ctf-writeups",
    slug: { current: "ctf-writeups" },
    title: "CTF & Blue Team Writeups",
    role: "Security Researcher",
    description: null,
    descriptionText:
      "Collection of detection engineering, incident investigations, threat hunting, forensics, and web exploitation writeups from HackTheBox, TryHackMe, and PicoCTF.",
    mainImage: null,
    tags: ["HackTheBox", "TryHackMe", "PicoCTF", "Forensics", "Detection"],
    category: "CTF",
    accentColor: "var(--accent-2)",
    icon: GitBranch,
    featured: false,
    demoUrl: "/achievements",
    githubUrl: null,
  },
];

const CATEGORIES = ["All", "Platforms", "SOC", "IAM", "Network", "Web Security", "CTF"];

export default async function ProjectsPage() {
  const sanityProjects = await getProjects();
  const useSanity = sanityProjects.length > 0;

  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">

          {/* Header */}
          <div className="mb-14">
            <p className="text-label mb-3">Portfolio</p>
            <h1 className="text-headline mb-4">
              Things I&apos;ve <span className="gradient-text">built & broken</span>
            </h1>
            <p className="text-body" style={{ color: "var(--text-muted)", maxWidth: "48ch" }}>
              From founding ZIGEX to designing enterprise SOC environments — practical security
              and engineering work across multiple domains.
            </p>
          </div>

          {/* Grid */}
          {useSanity ? (
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              }}
            >
              {sanityProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="card group flex flex-col no-underline overflow-hidden"
                >
                  {project.mainImage && (
                    <div className="overflow-hidden" style={{ height: "200px" }}>
                      <img
                        src={urlFor(project.mainImage).width(800).height(400).fit("crop").url()}
                        alt={project.mainImage.alt || project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 p-6 flex-1">
                    <h2 className="font-display font-semibold" style={{ fontSize: "var(--step-1)" }}>
                      {project.title}
                    </h2>
                    {project.description?.length ? (
                      <PortableTextContent value={project.description} className="text-small flex-1" />
                    ) : null}
                    {project.tags?.length ? (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-small px-2 py-0.5 rounded-full"
                            style={{ background: "var(--surface-3)", color: "var(--text-muted)", fontSize: ".7rem" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div
                      className="flex items-center gap-1.5 text-small font-medium mt-2 transition-all duration-300 group-hover:gap-3"
                      style={{ color: "var(--accent)" }}
                    >
                      View project <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // Fallback hardcoded projects
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              }}
            >
              {fallbackProjects.map((project) => {
                const Icon = project.icon;
                return (
                  <div
                    key={project._id}
                    id={project._id}
                    className="card group flex flex-col relative overflow-hidden"
                  >
                    {project.featured && (
                      <span
                        className="absolute top-4 right-4 text-label px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(74,222,128,.12)",
                          color: "#4ade80",
                          fontSize: ".6rem",
                          border: "1px solid rgba(74,222,128,.25)",
                          zIndex: 1,
                        }}
                      >
                        Flagship
                      </span>
                    )}

                    <div className="flex flex-col gap-4 p-6 flex-1">
                      {/* Icon + title */}
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `color-mix(in srgb, ${project.accentColor} 14%, transparent)`,
                            color: project.accentColor,
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2
                            className="font-display font-semibold"
                            style={{ fontSize: "var(--step-1)" }}
                          >
                            {project.title}
                          </h2>
                          <p
                            className="text-small"
                            style={{ color: "var(--accent-2)", fontSize: ".72rem" }}
                          >
                            {project.role}
                          </p>
                        </div>
                      </div>

                      <p
                        className="text-small flex-1 leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {project.descriptionText}
                      </p>

                      {project.tags.length > 0 && (
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
                      )}

                      <div className="flex gap-2 mt-1">
                        {project.demoUrl && (
                          <Link
                            href={project.demoUrl}
                            className="btn btn-outline text-small"
                            style={{ padding: ".4em .9em" }}
                          >
                            View Demo <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn text-small"
                            style={{
                              padding: ".4em .9em",
                              background: "var(--surface-2)",
                              color: "var(--text-muted)",
                              borderColor: "var(--border)",
                            }}
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
