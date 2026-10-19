export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  /** Public verification link (Credly, Cisco badge, etc.). Leave empty until a real one exists. */
  link?: string;
  status: "earned" | "in-progress";
}

// Source of truth: the CV (app/cv/page.tsx). Only list credentials that can be verified on request.
const certificationsData: Certification[] = [
  // Earned
  {
    id: "cisco-ethical-hacker",
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    date: "2024",
    description:
      "End-to-end penetration testing: planning and scoping, reconnaissance, vulnerability scanning, exploiting network and application weaknesses, post-exploitation, and reporting.",
    status: "earned",
  },
  {
    id: "cisco-network-defense",
    title: "Network Defense",
    issuer: "Cisco Networking Academy",
    date: "2024",
    description:
      "Defending networks with system and endpoint hardening, access control, firewalls, cloud security, cryptography, and security monitoring.",
    status: "earned",
  },
  {
    id: "cisco-network-basics",
    title: "Network Basics",
    issuer: "Cisco Networking Academy",
    date: "2024",
    description:
      "Networking fundamentals: protocols and models, IPv4/IPv6 addressing, Ethernet, the network and transport layers, and basic device configuration.",
    status: "earned",
  },
  {
    id: "cisco-intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2024",
    description:
      "Core cybersecurity concepts: threats and attacks, protecting personal and organisational data, and the security operations landscape.",
    status: "earned",
  },
  {
    id: "cisco-pentest-planning",
    title: "Planning & Scoping a Penetration Testing Assessment",
    issuer: "Cisco",
    date: "2024",
    description:
      "Rules of engagement, legal and compliance considerations, scoping, and methodology selection for professional penetration tests.",
    status: "earned",
  },
  {
    id: "cisco-info-gathering",
    title: "Information Gathering & Vulnerability Scanning",
    issuer: "Cisco",
    date: "2024",
    description:
      "Passive and active reconnaissance, enumeration, and running and analysing vulnerability scans.",
    status: "earned",
  },
  {
    id: "cisco-social-engineering",
    title: "Social Engineering Attacks",
    issuer: "Cisco",
    date: "2024",
    description: "Phishing, pretexting, physical attacks, and the tools used to simulate social engineering in authorised tests.",
    status: "earned",
  },
  {
    id: "cisco-wired-wireless",
    title: "Exploiting Wired & Wireless Networks",
    issuer: "Cisco",
    date: "2024",
    description: "Attacking switched networks, network protocols, and Wi-Fi in a lab setting, and recommending mitigations.",
    status: "earned",
  },
  {
    id: "cisco-app-vulns",
    title: "Exploiting Application-Based Vulnerabilities",
    issuer: "Cisco",
    date: "2024",
    description: "Web application attacks — injection, authentication and authorisation flaws, and insecure code — mapped to the OWASP Top 10.",
    status: "earned",
  },
  {
    id: "cisco-cloud-mobile-iot",
    title: "Cloud, Mobile & IoT Security",
    issuer: "Cisco",
    date: "2024",
    description: "Attack surfaces and testing approaches for cloud services, mobile platforms, and IoT devices.",
    status: "earned",
  },
  {
    id: "cisco-post-exploitation",
    title: "Performing Post-Exploitation Techniques",
    issuer: "Cisco",
    date: "2024",
    description: "Persistence, lateral movement, privilege escalation, and covering tracks — and how defenders detect them.",
    status: "earned",
  },
  {
    id: "seed-backend",
    title: "Certified Backend Developer",
    issuer: "SEED, Bamenda",
    date: "2026",
    description: "Backend engineering with Node.js, REST APIs, databases, and deployment.",
    status: "earned",
  },

  // Working towards
  {
    id: "goal-security-plus",
    title: "CompTIA Security+",
    issuer: "CompTIA",
    date: "Goal",
    description: "Baseline security certification covering threats, architecture, operations, and governance.",
    status: "in-progress",
  },
  {
    id: "goal-ceh",
    title: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "Goal",
    description: "Vendor-neutral ethical hacking certification following on from the Cisco Ethical Hacker pathway.",
    status: "in-progress",
  },
  {
    id: "goal-oscp",
    title: "Offensive Security Certified Professional (OSCP)",
    issuer: "OffSec",
    date: "Goal",
    description: "Hands-on, exam-lab-based penetration testing certification.",
    status: "in-progress",
  },
];

export default certificationsData;
