import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import { CORE_KEYWORDS, PERSON, SITE_URL } from "@/lib/site";
import { JsonLd, organizationSchema, personSchema, websiteSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });

const DEFAULT_TITLE = `${PERSON.name} — Network & Security Engineer, Cameroon`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${PERSON.name}`,
  },
  description: PERSON.description,
  applicationName: PERSON.name,
  keywords: CORE_KEYWORDS,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  category: "technology",
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${PERSON.name} — Blog` }] },
  },
  openGraph: {
    type: "profile",
    firstName: "John Brindi",
    lastName: "Mazwewoh",
    locale: "en_US",
    url: "/",
    siteName: PERSON.name,
    title: DEFAULT_TITLE,
    description: PERSON.description,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: PERSON.description,
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
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#09090f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`antialiased ${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
        {/* Site-wide entity graph: who the site is about, the site itself, and ZIGEX */}
        <JsonLd data={[personSchema(), websiteSchema(), organizationSchema()]} />
        {children}
      </body>
    </html>
  );
}
