export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  link?: string;
  status: "earned" | "in-progress";
}

const certificationsData: Certification[] = [
  // Earned
  {
    id: "1",
    title: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "Jan 2024",
    description:
      "Comprehensive ethical hacking and penetration testing skills across 20 security domains including network scanning, enumeration, system hacking, session hijacking, and more.",
    link: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
    status: "earned",
  },
  {
    id: "2",
    title: "CompTIA Security+",
    issuer: "CompTIA",
    date: "Mar 2023",
    description:
      "Foundational cybersecurity knowledge covering threats, vulnerabilities, architecture, identity management, risk management, and incident response.",
    link: "https://www.comptia.org/certifications/security",
    status: "earned",
  },
  {
    id: "3",
    title: "AWS Certified Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    date: "Aug 2022",
    description:
      "Cloud architecture design and security on the AWS platform including IAM, VPC, EC2, S3, and secure multi-tier application design.",
    link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    status: "earned",
  },
  // In Progress
  {
    id: "4",
    title: "Offensive Security Certified Professional (OSCP)",
    issuer: "Offensive Security",
    date: "Target: 2025",
    description:
      "Advanced hands-on penetration testing certification. Currently working through the PEN-200 coursework and PWK lab machines.",
    status: "in-progress",
  },
  {
    id: "5",
    title: "Okta Certified Professional",
    issuer: "Okta",
    date: "Target: 2025",
    description:
      "Validates expertise in Okta platform fundamentals, identity lifecycle management, SSO, MFA configuration, and OIDC/OAuth 2.0 implementation.",
    status: "in-progress",
  },
  {
    id: "6",
    title: "AWS Security Specialty",
    issuer: "Amazon Web Services",
    date: "Target: 2026",
    description:
      "Advanced certification covering data protection, infrastructure security, identity management, logging, monitoring, and incident response in AWS environments.",
    status: "in-progress",
  },
];

export default certificationsData;
