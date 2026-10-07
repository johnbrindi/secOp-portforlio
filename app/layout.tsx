import type { Metadata } from "next";
import "./globals.css";

import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });

const BASE_URL = "https://mazwewohjohnbrindi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mazwewoh John Brindi — Network & Infrastructure Engineer · Security Lead",
    template: "%s — Mazwewoh John Brindi",
  },
  description:
    "Mazwewoh John Brindi Nwosoh (also known as John Brindi or Mazwewoh Nwosoh) — Founder of ZIGEX (ZigexConnect), Network & Systems Infrastructure Engineer, Security Lead, and SOC Analyst. Specializing in LAN/WAN design, SIEM deployment, penetration testing, and hardened server environments. Based in Cameroon.",
  keywords: [
    "Mazwewoh John Brindi",
    "John Brindi",
    "Mazwewoh Nwosoh",
    "Mazwewoh John Brindi Nwosoh",
    "founder of Zigex",
    "who founded zigexconnect",
    "zigexconnect founder",
    "Zigex Cameroon",
    "ZIGEX platform",
    "network infrastructure engineer",
    "systems administrator",
    "security lead",
    "SOC analyst",
    "cybersecurity Cameroon",
    "penetration tester",
    "Wazuh SIEM",
    "LAN WAN design",
    "ZIGEX",
    "ethical hacker",
    "Cisco networking",
    "backend developer",
    "NAHPI Bamenda",
  ],
  authors: [{ name: "Mazwewoh John Brindi Nwosoh", url: BASE_URL }],
  creator: "Mazwewoh John Brindi Nwosoh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Mazwewoh John Brindi — Portfolio",
    title: "Mazwewoh John Brindi — Network & Infrastructure Engineer · Security Lead",
    description:
      "Portfolio of Mazwewoh John Brindi Nwosoh — Network & Systems Infrastructure Engineer, Security Lead, SOC Analyst, and Founder of ZIGEX. Based in Cameroon.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Mazwewoh John Brindi — Network & Infrastructure Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mazwewoh John Brindi — Network & Infrastructure Engineer",
    description:
      "Network & Systems Infrastructure Engineer, Security Lead, SOC Analyst, Founder of ZIGEX. Based in Cameroon.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": `${BASE_URL}/#person`,
                name: "Mazwewoh John Brindi Nwosoh",
                alternateName: ["Mazwewoh John Brindi", "John Brindi", "Mazwewoh Nwosoh"],
                url: BASE_URL,
                image: `${BASE_URL}/profile.jpg`,
                jobTitle: "Network & Systems Infrastructure Engineer",
                description:
                  "Security Lead, SOC Analyst, Founder of ZIGEX (zigexconnect.com). Specializing in network infrastructure, SIEM deployment, and penetration testing.",
                email: "johnbrindimazwewoh@gmail.com",
                telephone: "+237650146590",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Bambili",
                  addressCountry: "CM",
                },
                sameAs: [
                  "https://www.linkedin.com/in/mazwewohjohnbrindi/",
                  "https://github.com/johnbrindi/",
                  "https://zigexconnect.com/",
                ],
                founder: {
                  "@type": "Organization",
                  "@id": "https://zigexconnect.com/#organization"
                },
                worksFor: {
                  "@type": "Organization",
                  "@id": "https://zigexconnect.com/#organization"
                },
                alumniOf: {
                  "@type": "CollegeOrUniversity",
                  name: "National Higher Polytechnic Institute (NAHPI)",
                  address: { "@type": "PostalAddress", addressLocality: "Bamenda", addressCountry: "CM" },
                },
                knowsAbout: [
                  "Network Infrastructure",
                  "LAN/WAN Design",
                  "Security Operations Center",
                  "SIEM",
                  "Penetration Testing",
                  "Identity and Access Management",
                  "Wazuh",
                  "Suricata",
                  "Backend Development",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://zigexconnect.com/#organization",
                name: "ZIGEX",
                alternateName: "ZigexConnect",
                url: "https://zigexconnect.com/",
                description: "Zone for Internship, Growth and Experience",
                founder: {
                  "@type": "Person",
                  "@id": `${BASE_URL}/#person`
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${BASE_URL}/#website`,
                url: BASE_URL,
                name: "Mazwewoh John Brindi",
                publisher: {
                  "@type": "Person",
                  "@id": `${BASE_URL}/#person`
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "@id": `${BASE_URL}/#breadcrumb`,
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: BASE_URL
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Founder of ZIGEX",
                    item: `${BASE_URL}/zigex`
                  }
                ]
              }
            ]),
          }}
        />
      </head>
      <body className={`antialiased ${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  );
}