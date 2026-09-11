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

# HeroSection.tsx
hero_replacements = [
    (
        """            {/* Headline — updated priority: Infrastructure → Security → Backend */}
            <h1 className="text-display animate-fade-up animate-fade-up-2">
              Infrastructure Engineer.<br />
              <span className="gradient-text">System Administrator.</span><br />
              Defending the core.
            </h1>""",
        """            {/* Headline — updated priority: Infrastructure → Security → Backend */}
            <h1 className="text-display animate-fade-up animate-fade-up-2">
              Mazwewoh John Brindi.<br />
              <span className="gradient-text">Founder of ZIGEX.</span><br />
              Infrastructure Engineer.
            </h1>"""
    ),
    (
        """              I&apos;m <strong style={{ color: "var(--text)", fontWeight: 600 }}>Mazwewoh John Brindi N.</strong>{" "}
              Founder at{" "}
              <a
                href="http://zigexconnect.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}
              >
                ZIGEX
              </a>
              , Network &amp; Systems Infrastructure Engineer.""",
        """              I&apos;m <strong style={{ color: "var(--text)", fontWeight: 600 }}>Mazwewoh John Brindi Nwosoh</strong>{" "}
              (John Brindi), Founder of{" "}
              <a
                href="https://zigexconnect.com/"
                target="_blank"
                rel="me noopener noreferrer"
                style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "underline" }}
              >
                ZIGEX (zigexconnect.com)
              </a>
              , Network &amp; Systems Infrastructure Engineer."""
    )
]
replace_in_file('app/components/HeroSection.tsx', hero_replacements)

# sitemap.ts
sitemap_replacements = [
    (
        """  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },""",
        """  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/zigex`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },"""
    ),
    (
        """    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];""",
        """    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${base}/cv`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];"""
    )
]
replace_in_file('app/sitemap.ts', sitemap_replacements)

# robots.ts
robots_replacements = [
    (
        """    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },""",
        """    rules: [
      {
        userAgent: "*",
        allow: ["/", "/zigex", "/about", "/cv"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot-News",
        allow: ["/", "/zigex", "/about"],
      },
      {
        userAgent: "bingbot",
        allow: ["/", "/zigex", "/about"],
      }
    ],"""
    )
]
replace_in_file('app/robots.ts', robots_replacements)

# footer.tsx
footer_replacements = [
    (
        """            © {year} Mazwewoh John Brindi Nwosoh""",
        """            © {year} Mazwewoh John Brindi Nwosoh — <a href="https://zigexconnect.com" target="_blank" rel="me" className="hover:underline" style={{color: "var(--accent)"}}>Founder of ZigexConnect</a>"""
    )
]
replace_in_file('app/components/footer.tsx', footer_replacements)

print("Done updating components.")
