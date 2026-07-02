import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ── Profile ──────────────────────────────────────────────
  await prisma.profiles.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Mazwewoh John Brindi Nwosoh",
      title: "Network & Systems Infrastructure Engineer · Security Lead",
      bio: "Security Lead and Cybersecurity Instructor with hands-on experience designing SOC frameworks, leading incident response, and developing team capability in threat detection and analysis. Founder of ZIGEX, driving product strategy and partnerships to connect students with internships, programs, and events in tech. Specializing in network traffic analysis, web application penetration testing, SOC monitoring, and collaborative leadership. Currently pursuing a B.Eng. in Computer Engineering at NAHPI Bamenda.",
      image_url: "/profile.jpg",
    },
  });

  // ── Skills ───────────────────────────────────────────────
  const skills = [
    // Networking
    { name: "Network Analysis (Wireshark, TCP/IP, HTTP)", category: "Networking" },
    { name: "LAN/WAN Design & Implementation", category: "Networking" },
    { name: "Routing & Switching (Cisco)", category: "Networking" },
    { name: "TP-Link Switch Configuration", category: "Networking" },
    { name: "Suricata IDS/IPS", category: "Networking" },
    { name: "VLANs & Network Segmentation", category: "Networking" },
    // Security
    { name: "SOC Monitoring & Analysis", category: "Security" },
    { name: "Wazuh SIEM", category: "Security" },
    { name: "Incident Response", category: "Security" },
    { name: "Web Application Penetration Testing", category: "Security" },
    { name: "Ethical Hacking", category: "Security" },
    { name: "Threat Detection & Analysis", category: "Security" },
    { name: "Vulnerability Scanning", category: "Security" },
    { name: "Social Engineering Awareness", category: "Security" },
    { name: "OSINT", category: "Security" },
    // Backend
    { name: "Backend Development (Node.js)", category: "Development" },
    { name: "Next.js / React", category: "Development" },
    { name: "PostgreSQL / Neon DB", category: "Development" },
    { name: "Prisma ORM", category: "Development" },
    { name: "REST APIs", category: "Development" },
    { name: "Git & GitHub", category: "Development" },
    // Systems
    { name: "Linux System Administration", category: "Systems" },
    { name: "Server Hardening", category: "Systems" },
    { name: "Identity & Access Management (Okta, OIDC)", category: "Systems" },
  ];

  for (const skill of skills) {
    await prisma.skills.create({ data: skill }).catch(() => {});
  }

  // ── Projects ─────────────────────────────────────────────
  await prisma.projects.deleteMany({});

  await prisma.projects.createMany({
    data: [
      {
        title: "ZIGEX — Career & Internship Platform",
        description:
          "Founded and led the backend development of ZIGEX, a platform connecting students across Cameroon with internships, career opportunities, and professional growth resources. Scaled to 500+ active users. Drove product strategy, partnerships, and technology architecture.",
        tags: ["Next.js", "Node.js", "PostgreSQL", "Product Strategy", "Leadership"],
        link: "http://zigexconnect.com/",
        image_url: null,
      },
      {
        title: "SOC Implementation with Wazuh SIEM",
        description:
          "Designed and implemented a Security Operations Center (SOC) from the ground up using Wazuh as the primary SIEM tool. Configured log collection, alert rules, dashboards, and incident response workflows. The SOC monitors endpoints, network traffic, and system events in real-time for threat detection.",
        tags: ["Wazuh", "SIEM", "SOC", "Incident Response", "Ubuntu", "Log Analysis"],
        link: null,
        image_url: null,
      },
      {
        title: "Enterprise LAN Infrastructure Design",
        description:
          "Designed and physically established a robust Local Area Network (LAN) infrastructure to support organizational operations. Deployed TP-Link managed switches, CAT5e structured cabling, router configuration, and connected all end devices. Ensured redundancy, proper IP addressing, and network documentation.",
        tags: ["LAN", "TP-Link", "Cisco", "CAT5e", "Network Design", "TCP/IP"],
        link: null,
        image_url: null,
      },
      {
        title: "Suricata IDS/IPS Deployment",
        description:
          "Deployed Suricata as a network-level Intrusion Detection and Prevention System (IDS/IPS). Configured rule sets for detecting port scans, brute force attempts, malicious payloads, and protocol anomalies. Integrated alert outputs with the Wazuh SIEM pipeline for centralized threat visibility.",
        tags: ["Suricata", "IDS/IPS", "Network Security", "Wazuh", "Linux"],
        link: null,
        image_url: null,
      },
      {
        title: "SecOps Portfolio with Okta IAM",
        description:
          "Built this professional cybersecurity portfolio using Next.js and integrated enterprise-grade Identity and Access Management using Okta (OpenID Connect). Implemented NextAuth.js middleware to protect the admin dashboard, configured authentication policies, and demonstrinated real-world zero-trust access control.",
        tags: ["Next.js", "Okta", "OIDC", "NextAuth.js", "IAM", "Zero Trust", "PostgreSQL"],
        link: "https://mazwewohjohnbrindi.vercel.app",
        image_url: null,
      },
    ],
  });

  // ── Certifications ───────────────────────────────────────
  await prisma.certifications.deleteMany({});

  await prisma.certifications.createMany({
    data: [
      {
        title: "Ethical Hacker",
        issuer: "Cisco Networking Academy (Ingressive for Good)",
        date_issued: "Sep 02, 2024",
        description: "Completed the Cisco Ethical Hacker course — 70 hours covering offensive security techniques, cyber threat identification, and vulnerability exploitation.",
        link: "https://www.netacad.com/certificates?issuanceId=fs1d5912-7924-44ed-bb2a-7029bf395175",
        image_url: null,
      },
      {
        title: "Network Basics",
        issuer: "Cisco Networking Academy",
        date_issued: "Sep 02, 2024",
        description: "Achievement badge for completing the Network Basics module — covering TCP/IP fundamentals, LAN/WAN concepts, and network troubleshooting.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        date_issued: "Jul 09, 2024",
        description: "Completed Cisco's Introduction to Cybersecurity course covering global cyber threats, network security, and defending devices and data.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Performing Post-Exploitation Techniques",
        issuer: "Cisco Networking Academy",
        date_issued: "Aug 28, 2024",
        description: "Module achievement in ethical hacking covering pivoting, lateral movement, data exfiltration, and maintaining access after initial compromise.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Exploiting Application-Based Vulnerabilities",
        issuer: "Cisco Networking Academy",
        date_issued: "Aug 04, 2024",
        description: "Module achievement covering exploitation of web application vulnerabilities including SQL injection, XSS, and CSRF attacks.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Information Gathering and Vulnerability Scanning",
        issuer: "Cisco Networking Academy",
        date_issued: "Jul 25, 2024",
        description: "Module covering OSINT techniques, active/passive reconnaissance, and vulnerability scanning with tools like Nmap and Nessus.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Social Engineering Attacks",
        issuer: "Cisco Networking Academy",
        date_issued: "Aug 04, 2024",
        description: "Achievement covering phishing, pretexting, vishing, and how to identify and defend against human-based attack vectors.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Planning and Scoping a Pentest Assessment",
        issuer: "Cisco Networking Academy",
        date_issued: "Jul 25, 2024",
        description: "Module covering rules of engagement, scoping methodology, legal considerations, and deliverables for professional penetration testing assessments.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Cloud, Mobile, and IoT Security",
        issuer: "Cisco Networking Academy",
        date_issued: "Aug 18, 2024",
        description: "Module achievement covering security considerations for cloud infrastructure, mobile device management, and Internet of Things environments.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Network Defense",
        issuer: "Cisco Networking Academy",
        date_issued: "Jul 09, 2024",
        description: "Module covering defensive strategies including access control, IDS/IPS deployment, firewall configuration, and security monitoring.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Exploiting Wired and Wireless Networks",
        issuer: "Cisco Networking Academy",
        date_issued: "Aug 04, 2024",
        description: "Module covering wired and wireless network attack techniques including MITM attacks, evil twin, WPA cracking, and ARP poisoning.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Introduction to Ethical Hacking and Penetration Testing",
        issuer: "Cisco Networking Academy",
        date_issued: "Jul 22, 2024",
        description: "Foundation module introducing the penetration testing lifecycle, hacking mindset, and ethical and legal frameworks for security assessments.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Tools and Code Analysis",
        issuer: "Cisco Networking Academy",
        date_issued: "Aug 22, 2024",
        description: "Achievement covering security tooling and code analysis techniques used in penetration testing engagements.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Reporting and Communication",
        issuer: "Cisco Networking Academy",
        date_issued: "Aug 21, 2024",
        description: "Module covering how to write professional penetration testing reports, communicate risk to stakeholders, and deliver actionable findings.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "System Safeguards",
        issuer: "Cisco Networking Academy",
        date_issued: "Jul 09, 2024",
        description: "Module covering operating system hardening, patch management, and implementing system-level security controls.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Cybersecurity Administration",
        issuer: "Cisco Networking Academy",
        date_issued: "Jul 09, 2024",
        description: "Module covering security administration practices, user management, access control policies, and security documentation.",
        link: "https://www.netacad.com",
        image_url: null,
      },
      {
        title: "Certified Backend Developer",
        issuer: "SEED Bamenda",
        date_issued: "2026",
        description: "Certified backend developer credential from SEED, covering REST API design, database management, authentication systems, and production deployment.",
        link: null,
        image_url: null,
      },
    ],
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
