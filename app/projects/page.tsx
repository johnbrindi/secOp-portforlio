import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Mazwewoh John Brindi",
  description:
    "Networking and infrastructure projects: Carrier-Grade MPLS backbone design, CRTV core infrastructure troubleshooting, ZIGEX backend architecture, SSH hardening, and more.",
};

interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  tags: string[];
  summary: string;
  detail: string[];
  links: { label: string; href: string }[];
}

const PROJECTS: Project[] = [
  {
    id: "mpls-crtv",
    title: "Architecting a Carrier-Grade MPLS Backbone for CRTV",
    category: "Network Engineering",
    date: "Aug 2026",
    image: "/projects/mpls-topology.png",
    tags: ["MPLS", "L3VPN", "BGP", "OSPF", "VRF", "LDP", "QoS", "Cisco IOS"],
    summary:
      "Designed and implemented a multi-site carrier-grade MPLS backbone to unify Cameroon Radio Television's Yaounde headquarters with regional hubs in Douala, Bamenda, and Maroua under a single high-performance transit fabric.",
    detail: [
      "Used a BGP-Free Core model to keep the transport layer lean and focused on high-speed label switching, removing the operational overhead of running BGP on internal P-routers.",
      "Deployed OSPF Process 100 across the Provider Edge mesh to establish seamless /32 Loopback reachability, forming the mandatory underlay foundation for LDP sessions and iBGP peerings.",
      "Implemented VRF instances per broadcast vertical and leveraged MP-BGP VPNv4 for signaling, ensuring that regional broadcast streams and management traffic remain logically segmented across the same physical infrastructure.",
      "Engineered a media-aware QoS policy using Class-Based Weighted Fair Queuing (CBWFQ) combined with Low Latency Queuing (LLQ) to prioritize ToIP sessions and guarantee bandwidth for centralized HQ NAS media uploads, eliminating jitter risk during live broadcasts.",
      "Performed final data-plane verification by tracing packets from remote branches through the full label switching path: label imposition at the ingress PE, label swap at the P-router, and label disposition at the egress PE.",
    ],
    links: [
      {
        label: "Read full article on Medium",
        href: "https://medium.com/@johnbrindimazwewoh/architecting-a-carrier-grade-mpls-backbone-for-crtv-a-multi-site-l3vpn-implementation-492fd97b47dd",
      },
    ],
  },
  {
    id: "crtv-troubleshooting",
    title: "Inside the Trenches: Core Infrastructure and High-Stakes Troubleshooting at CRTV",
    category: "Network Engineering",
    date: "Jul 2026",
    image: "/projects/crtv-infrastructure.png",
    tags: ["DHCP", "Routing", "Cisco", "Network Troubleshooting", "Server Administration", "Hardware"],
    summary:
      "Resolved a complete network outage at CRTV where client PCs received valid DHCP leases but could not reach the internet. Traced the fault, corrected the misconfiguration, and performed physical hardware upgrades to keep critical broadcast operations running.",
    detail: [
      "Investigated a production network outage: client machines were successfully leasing IP addresses from the DHCP server but had no internet connectivity. This narrow symptom pointed directly to a gateway-level misconfiguration rather than a DHCP service failure.",
      "Confirmed DHCP lease delivery was functioning correctly, then traced the routing path outward from the gateway. Identified that the default gateway entry on the DHCP server was misconfigured, causing clients to send traffic into a dead path.",
      "Corrected the gateway configuration, verified routing paths end-to-end, and confirmed full internet restoration across all affected workstations in the DSI.",
      "Performed physical hardware upgrades on production server racks and network panels during the same maintenance window, including cable management and switch port documentation.",
    ],
    links: [
      {
        label: "Read full article on Medium",
        href: "https://medium.com/@johnbrindimazwewoh/inside-the-trenches-sorting-core-infrastructure-and-high-stakes-troubleshooting-at-crtv-17b04446da2c",
      },
    ],
  },
  {
    id: "zigex-backend",
    title: "ZIGEX Backend Infrastructure and System Architecture",
    category: "System Architecture",
    date: "2025 – Present",
    image: "/projects/zigex-architecture.png",
    tags: ["Node.js", "PostgreSQL", "Redis", "REST API", "WebSockets", "System Design", "JWT"],
    summary:
      "Led the full backend infrastructure design and system architecture for ZIGEX. Responsible for the API layer, database schema, authentication system, real-time communication layer, and overall service architecture.",
    detail: [
      "Designed the core system architecture from the ground up, making key decisions around service boundaries, data modeling, and communication patterns that would support the platform at scale.",
      "Implemented a REST API layer with JWT-based authentication, role-based access control, and request validation middleware.",
      "Architected the database schema in PostgreSQL, including indexing strategy, relationship design, and migration management.",
      "Integrated Redis for session caching and real-time pub/sub messaging to support WebSocket-based features.",
      "Established backend engineering standards, documentation practices, and deployment pipelines for the development team.",
    ],
    links: [],
  },
  {
    id: "seed-mentorship",
    title: "Networking and Cybersecurity Mentorship at SEED",
    category: "Education and Mentorship",
    date: "2024 – Present",
    image: "/projects/seed-mentorship.png",
    tags: ["Teaching", "Cisco", "Networking", "Cybersecurity", "Linux", "Packet Tracer", "Mentorship"],
    summary:
      "Mentored over 50 students in networking fundamentals, Cisco configuration, and cybersecurity practices at SEED. Delivered hands-on lab sessions and guided students through applied engineering projects.",
    detail: [
      "Designed and delivered practical lab sessions covering VLANs, inter-VLAN routing, OSPF, access control lists, firewall configuration, and Linux system administration.",
      "Guided students through real-world project work including network topology design, subnetting exercises, and Cisco IOS configuration in Packet Tracer and on physical hardware.",
      "Mentored students on cybersecurity fundamentals including threat modeling, Linux hardening, SSH key authentication, and basic penetration testing concepts.",
      "Over 50 students completed programs under direct mentorship, many going on to pursue networking and security certifications.",
    ],
    links: [],
  },
  {
    id: "ssh-linux-hardening",
    title: "Strengthening Linux Security: SSH Public Key Authentication",
    category: "Cybersecurity",
    date: "Dec 2025",
    image: "/projects/ssh-security.png",
    tags: ["Linux", "SSH", "Cybersecurity", "Server Hardening", "Sysadmin", "Ed25519"],
    summary:
      "Documented a complete step-by-step implementation of SSH public key authentication on Linux, replacing password-based access to eliminate brute-force attack vectors on remote servers.",
    detail: [
      "Walked through the full key generation process using ed25519 for modern cryptographic strength, covering key pair creation, permissions, and authorized_keys configuration.",
      "Configured the SSH daemon to disable password authentication and enforce public key-only access, closing the primary entry vector for brute-force and credential stuffing attacks.",
      "Documented verification steps to confirm passwordless authentication was working before disabling fallback methods, preventing lockouts.",
      "Published as a technical guide on Medium targeting Linux system administrators and students learning defensive security practices.",
    ],
    links: [
      {
        label: "Read full article on Medium",
        href: "https://medium.com/@johnbrindimazwewoh/strengthening-linux-security-a-step-by-step-guide-to-ssh-public-key-authentication-2a4e342d25a3",
      },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Network Engineering": "var(--accent)",
  "System Architecture": "var(--accent-2)",
  "Education and Mentorship": "#4ade80",
  "Cybersecurity": "#f59e0b",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">

          {/* Header */}
          <div className="mb-16">
            <p className="text-label mb-3">Portfolio</p>
            <h1 className="text-headline mb-4">
              Projects and <span className="gradient-text">real work</span>
            </h1>
            <p className="text-body" style={{ color: "var(--text-muted)", maxWidth: "52ch" }}>
              Documented engineering work across network infrastructure design, system architecture, security hardening, and technical mentorship.
            </p>
          </div>

          {/* Project list */}
          <div className="flex flex-col">
            {PROJECTS.map((project, i) => (
              <article
                key={project.id}
                id={`project-${project.id}`}
                className="project-article"
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "var(--space-lg)",
                  paddingBottom: "var(--space-lg)",
                  borderBottom: i === PROJECTS.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div className="project-grid">

                  {/* Left: Text */}
                  <div>
                    {/* Category and date */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className="text-label"
                        style={{
                          color: CATEGORY_COLORS[project.category] ?? "var(--accent)",
                          fontSize: ".65rem",
                        }}
                      >
                        {project.category}
                      </span>
                      <span className="text-label" style={{ color: "var(--text-dim)", fontSize: ".65rem" }}>
                        {project.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="font-display font-bold mb-4"
                      style={{ fontSize: "var(--step-2)", letterSpacing: "-.02em", lineHeight: 1.2 }}
                    >
                      {project.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-body mb-5" style={{ color: "var(--text-muted)", maxWidth: "62ch" }}>
                      {project.summary}
                    </p>

                    {/* Detail points */}
                    <ul className="project-detail-list mb-5">
                      {project.detail.map((point, j) => (
                        <li key={j} className="text-small" style={{ color: "var(--text-muted)", lineHeight: 1.75 }}>
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-small px-2.5 py-1 rounded-full"
                          style={{
                            background: "var(--surface-3)",
                            color: "var(--text-muted)",
                            fontSize: ".7rem",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* External links */}
                    {project.links.length > 0 && (
                      <div className="flex flex-wrap gap-4">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-small font-medium transition-colors duration-200"
                            style={{ color: "var(--accent)" }}
                          >
                            {link.label}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Image */}
                  <div className="project-image-wrap">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                  </div>

                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-20 text-center"
            style={{ borderTop: "1px solid var(--border)", paddingTop: "var(--space-lg)" }}
          >
            <p className="text-label mb-4">More technical writing</p>
            <a
              href="https://medium.com/@johnbrindimazwewoh"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline inline-flex items-center gap-2"
            >
              Read on Medium <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
