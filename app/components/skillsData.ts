// Shown on the home page whenever the Sanity "skill" documents are missing or the
// CMS is unreachable, so the Expertise section never renders empty.
export type CoreSkill = {
  title: string;
  category: string;
  summary: string;
  tools: string[];
};

const coreSkills: CoreSkill[] = [
  {
    title: "Enterprise Routing & Switching",
    category: "Networking",
    summary:
      "Designing and troubleshooting multi-site LAN/WAN fabrics, from VLAN segmentation at the access layer to dynamic routing in the core.",
    tools: ["Cisco IOS", "OSPF", "BGP", "VLANs", "GNS3", "Wireshark"],
  },
  {
    title: "Service Provider & MPLS",
    category: "Networking",
    summary:
      "Carrier-grade MPLS L3VPN backbones with BGP-free cores, VRF isolation per business unit, and media-aware QoS for broadcast traffic.",
    tools: ["MPLS", "LDP", "MP-BGP VPNv4", "VRF", "CBWFQ / LLQ"],
  },
  {
    title: "Security Operations & Monitoring",
    category: "Security",
    summary:
      "Building SIEM pipelines, writing and tuning detection rules, and triaging alerts in a home SOC lab modelled on production environments.",
    tools: ["Wazuh", "Elastic SIEM", "Suricata"],
  },
  {
    title: "Offensive Security Testing",
    category: "Security",
    summary:
      "Web application and network penetration testing against the OWASP Top 10, with findings documented in standard reporting formats.",
    tools: ["Burp Suite", "Nmap", "Kali Linux", "OWASP Top 10"],
  },
  {
    title: "Systems & Server Hardening",
    category: "Systems",
    summary:
      "Administering and hardening servers: SSH public-key-only access, perimeter firewalling with pfSense, and endpoint telemetry feeding the SIEM.",
    tools: ["Ubuntu", "OpenSSH", "pfSense", "Sysmon"],
  },
  {
    title: "Identity & Backend Architecture",
    category: "Development",
    summary:
      "Backend systems with security built in — OIDC single sign-on, server-side authorization, and hardened HTTP headers.",
    tools: ["Node.js", "Next.js", "PostgreSQL", "Okta / OIDC"],
  },
];

export default coreSkills;
