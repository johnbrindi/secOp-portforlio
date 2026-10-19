// Single source of truth for identity, SEO, and structured data.
// Everything search engines learn about "who this site is about" comes from here.

export const SITE_URL = "https://mazwewohjohnbrindi.vercel.app";

export const PERSON = {
  name: "Mazwewoh John Brindi",
  fullName: "Mazwewoh John Brindi Nwosoh",
  shortName: "John Brindi",
  alternateNames: ["Mazwewoh John Brindi Nwosoh", "John Brindi", "Mazwewoh Nwosoh", "Mazwewoh John Brindi N."],
  jobTitle: "Network & Infrastructure Engineer",
  headline: "Network & Infrastructure Engineer · Security Lead",
  description:
    "Network & infrastructure engineer, security lead, and CEO & founder of ZIGEX in Bamenda, Cameroon. Built a 4-site MPLS L3VPN backbone for CRTV.",
  email: "johnbrindimazwewoh@gmail.com",
  telephone: "+237650146590",
  locality: "Bamenda",
  region: "North-West Region",
  country: "CM",
  countryName: "Cameroon",
  image: "/me.jpg",
  knowsAbout: [
    "Network Engineering",
    "MPLS L3VPN",
    "BGP",
    "OSPF",
    "Cisco IOS",
    "LAN/WAN Design",
    "Network Troubleshooting",
    "Security Operations Center (SOC)",
    "SIEM",
    "Wazuh",
    "Suricata",
    "Penetration Testing",
    "Identity and Access Management",
    "Okta",
    "Linux Server Hardening",
    "Backend Development",
    "Node.js",
    "Next.js",
  ],
} as const;

// Verified public profiles (sameAs). Only add URLs that are actually about this person —
// these links are how search engines connect the site to the same real-world entity.
export const PROFILES = {
  github: "https://github.com/johnbrindi",
  linkedin: "https://www.linkedin.com/in/mazwewohjohnbrindi/",
  medium: "https://medium.com/@johnbrindimazwewoh",
} as const;

export const ZIGEX = {
  name: "ZIGEX",
  alternateName: "ZigexConnect",
  url: "https://zigexconnect.com/",
  description: "Zone for Internship, Growth and Experience — a career platform connecting students in Bamenda and beyond with internships.",
};

/**
 * Focused keyword set. Google ignores the meta keywords tag entirely (and penalises stuffing),
 * so these exist mainly for Bing and as a reference for the phrases titles/descriptions target.
 */
export const CORE_KEYWORDS = [
  "Mazwewoh John Brindi",
  "John Brindi",
  "Mazwewoh John Brindi Nwosoh",
  "network engineer Cameroon",
  "network engineer Bamenda",
  "cybersecurity Cameroon",
  "MPLS L3VPN",
  "SOC analyst",
  "ZIGEX founder",
];
