// Public, independently verifiable references to Mazwewoh John Brindi's work.
// Every entry links to the source it was verified from (checked October 2026).
// Rendered on /about ("Around the web") and /achievements, and linked in JSON-LD —
// outbound links to profiles that link back are how search engines confirm identity.

export type FootprintEntry = {
  title: string;
  source: string;
  url: string;
  summary: string;
  kind: "profile" | "writing" | "code" | "organization";
};

export const MEDIUM_ARTICLES: FootprintEntry[] = [
  {
    title: "Architecting a Carrier-Grade MPLS Backbone for CRTV: A Multi-Site L3VPN Implementation",
    source: "Medium",
    url: "https://medium.com/@johnbrindimazwewoh/architecting-a-carrier-grade-mpls-backbone-for-crtv-a-multi-site-l3vpn-implementation-492fd97b47dd",
    summary: "BGP-free core, OSPF underlay, LDP, VRFs with MP-BGP VPNv4, and media-aware QoS across CRTV's Yaoundé, Douala, Bamenda and Maroua sites.",
    kind: "writing",
  },
  {
    title: "Inside the Trenches: Core Infrastructure and High-Stakes Troubleshooting at CRTV",
    source: "Medium",
    url: "https://medium.com/@johnbrindimazwewoh/inside-the-trenches-sorting-core-infrastructure-and-high-stakes-troubleshooting-at-crtv-17b04446da2c",
    summary: "Diagnosing a production outage where clients leased DHCP addresses but had no internet — traced to a misconfigured default gateway.",
    kind: "writing",
  },
  {
    title: "Strengthening Linux Security: A Step-by-Step Guide to SSH Public Key Authentication",
    source: "Medium",
    url: "https://medium.com/@johnbrindimazwewoh/strengthening-linux-security-a-step-by-step-guide-to-ssh-public-key-authentication-2a4e342d25a3",
    summary: "Replacing password logins with SSH key pairs and hardening sshd on Linux servers.",
    kind: "writing",
  },
];

export const FOOTPRINT: FootprintEntry[] = [
  {
    title: "LinkedIn — Mazwewoh John Brindi",
    source: "LinkedIn",
    url: "https://www.linkedin.com/in/mazwewohjohnbrindi/",
    summary: "Professional profile: experience, education, and recommendations.",
    kind: "profile",
  },
  {
    title: "GitHub — johnbrindi",
    source: "GitHub",
    url: "https://github.com/johnbrindi",
    summary: "Public profile of “MAZWEWOH JOHN BRINDI NWOSOH” since November 2023, with 37 public repositories across networking, security, Python and TypeScript.",
    kind: "profile",
  },
  {
    title: "Medium — @johnbrindimazwewoh",
    source: "Medium",
    url: "https://medium.com/@johnbrindimazwewoh",
    summary: "Long-form technical writing on MPLS, infrastructure troubleshooting, and Linux security.",
    kind: "profile",
  },
  {
    title: "ZIGEX — CEO & Founder",
    source: "zigexconnect.com",
    url: "https://zigexconnect.com/",
    summary: "The career platform I founded and lead as CEO, connecting students in Bamenda and beyond with internships. Its team page lists my hands-on role: “John Brindi — Cybersecurity & Backend”. ZIGEX reports a community of 2,000+ students.",
    kind: "organization",
  },
  {
    title: "SEED cybersecurity interns (2025)",
    source: "GitHub",
    url: "https://github.com/johnbrindi/SEED_CYBER_SECURITY_INTERNS",
    summary: "Hands-on exercises for SEED's 2025 cybersecurity interns — e.g. AES decryption, padding removal and key-management reflection. Forked by 7 learners.",
    kind: "code",
  },
  {
    title: "SEED cybersecurity internship (August 2024)",
    source: "GitHub",
    url: "https://github.com/johnbrindi/Seed_Cyber_August_2024",
    summary: "Projects completed as a cybersecurity intern at SEED, Bamenda.",
    kind: "code",
  },
  {
    title: "File encryption & decryption lab",
    source: "GitHub",
    url: "https://github.com/johnbrindi/DECRYPTION",
    summary: "Python demonstration of encrypting a file and recovering it with the correct key.",
    kind: "code",
  },
  {
    title: "Internship management system",
    source: "GitHub",
    url: "https://github.com/johnbrindi/future_prospect",
    summary: "Early JavaScript prototype of an internship management platform.",
    kind: "code",
  },
  {
    title: "This portfolio's source code",
    source: "GitHub",
    url: "https://github.com/johnbrindi/secOp-portforlio",
    summary: "Next.js site with Okta OIDC admin, server-side authorisation, hardened CSP and automated SEO checks.",
    kind: "code",
  },
];
