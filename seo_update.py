import json

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
        else:
            print(f"Warning: Could not find target in {filepath}:\n{old[:100]}...")
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# layout.tsx
layout_replacements = [
    (
        """  description:
    "Mazwewoh John Brindi Nwosoh — Network & Systems Infrastructure Engineer, Security Lead, SOC Analyst, and Founder of ZIGEX. Specializing in LAN/WAN design, SIEM deployment, penetration testing, and hardened server environments. Based in Cameroon.",
  keywords: [
    "Mazwewoh John Brindi",
    "Mazwewoh Nwosoh",
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
  ],""",
        """  description:
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
  ],"""
    ),
    (
        """  alternates: {
    canonical: BASE_URL,
  },""",
        ""
    ),
    (
        """        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mazwewoh John Brindi Nwosoh",
              url: BASE_URL,
              image: `${BASE_URL}/profile.jpg`,
              jobTitle: "Network & Systems Infrastructure Engineer",
              description:
                "Security Lead, SOC Analyst, Founder of ZIGEX. Specializing in network infrastructure, SIEM deployment, and penetration testing.",
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
                "http://zigexconnect.com/",
              ],
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
            }),
          }}
        />""",
        """        <script
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
        />"""
    )
]
replace_in_file('app/layout.tsx', layout_replacements)

# about/page.tsx
about_replacements = [
    (
        """export const metadata: Metadata = {
  title: "About — Mazwewoh John Brindi",
  description:
    "Learn about Mazwewoh John Brindi Nwosoh, a Cybersecurity Lead and IT professional specialising in SOC operations, network security, web penetration testing, and founder of ZIGEX.",
};""",
        """export const metadata: Metadata = {
  title: "About Mazwewoh John Brindi Nwosoh — Founder of ZigexConnect",
  description:
    "Learn about Mazwewoh John Brindi Nwosoh (John Brindi), Founder of ZIGEX (zigexconnect.com), a Cybersecurity Lead, SOC Analyst, and IT professional in Cameroon.",
  alternates: {
    canonical: "https://mazwewohjohnbrindi.vercel.app/about",
  }
};"""
    ),
    (
        """              <p
                className="text-small font-medium mb-6 tracking-wide"
                style={{ color: "var(--accent)" }}
              >
                Cybersecurity Lead · SOC Analyst · Network Security Practitioner · Web Pentester · Founder of ZIGEX
              </p>""",
        """              <p
                className="text-small font-medium mb-6 tracking-wide"
                style={{ color: "var(--accent)" }}
              >
                Cybersecurity Lead · SOC Analyst · Network Security Practitioner · Web Pentester · Founder of <a href="https://zigexconnect.com" rel="me" target="_blank" style={{textDecoration: 'underline'}}>ZIGEX (zigexconnect.com)</a>
              </p>"""
    ),
    (
        """                <p>
                  Outside of security work, I founded <strong>ZIGEX</strong> — a platform built to connect
                  students across Cameroon with internships and career opportunities. I spoke at
                  DevFest Bamenda 2025, and I remain active in digital empowerment initiatives
                  for youth across West Africa.
                </p>""",
        """                <p>
                  Outside of security work, I founded <strong><a href="https://zigexconnect.com" rel="me" target="_blank" style={{color: 'inherit', textDecoration: 'underline'}}>ZIGEX (zigexconnect.com)</a></strong> — a platform built to connect
                  students across Cameroon with internships and career opportunities. I spoke at
                  DevFest Bamenda 2025, and I remain active in digital empowerment initiatives
                  for youth across West Africa.
                </p>"""
    ),
    (
        """        <div className="container">""",
        """        <div className="container">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                mainEntity: {
                  "@type": "Person",
                  name: "Mazwewoh John Brindi Nwosoh",
                  alternateName: ["Mazwewoh John Brindi", "John Brindi", "Mazwewoh Nwosoh"],
                  description: "Founder of ZIGEX, Cybersecurity Lead, and SOC Analyst.",
                  sameAs: [
                    "https://zigexconnect.com/",
                    "https://www.linkedin.com/in/mazwewohjohnbrindi/",
                    "https://github.com/johnbrindi/"
                  ]
                },
                speakable: {
                  "@type": "SpeakableSpecification",
                  xpath: [
                    "/html/head/title",
                    "/html/head/meta[@name='description']/@content"
                  ]
                }
              })
            }}
          />"""
    )
]
replace_in_file('app/about/page.tsx', about_replacements)

print("Done updating layout and about page.")
