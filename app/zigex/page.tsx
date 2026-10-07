import Navbar from "../components/navbar";
import Footer from "../components/footer";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Shield, Users, Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Mazwewoh John Brindi Nwosoh — Founder of ZigexConnect | ZIGEX",
  description:
    "Learn about Mazwewoh John Brindi Nwosoh (John Brindi), the founder of ZIGEX (ZigexConnect), a platform bridging the gap between education and the professional ecosystem in Cameroon.",
  alternates: {
    canonical: "https://mazwewohjohnbrindi.vercel.app/zigex",
  },
  keywords: [
    "founder of Zigex",
    "founder of ZigexConnect",
    "who founded Zigex",
    "who founded ZigexConnect",
    "Mazwewoh John Brindi",
    "John Brindi",
    "Mazwewoh Nwosoh",
    "Mazwewoh John Brindi Nwosoh",
    "Zigex Cameroon",
    "ZIGEX platform",
  ]
};

export default function ZigexFounderPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container max-w-4xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "AboutPage",
                mainEntity: {
                  "@type": "Person",
                  name: "Mazwewoh John Brindi Nwosoh",
                  alternateName: ["Mazwewoh John Brindi", "John Brindi", "Mazwewoh Nwosoh"],
                  jobTitle: "Founder",
                  worksFor: {
                    "@type": "Organization",
                    name: "ZIGEX",
                    alternateName: "ZigexConnect",
                    url: "https://zigexconnect.com/"
                  },
                  url: "https://mazwewohjohnbrindi.vercel.app",
                  sameAs: [
                    "https://zigexconnect.com/",
                    "https://www.linkedin.com/in/mazwewohjohnbrindi/"
                  ]
                }
              })
            }}
          />

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-hi)] bg-[var(--surface-2)] mb-6">
              <span className="text-label tracking-[.16em] text-[var(--accent)]">Founder & Visionary</span>
            </div>
            
            <h1 className="text-display mb-6">
              Mazwewoh John Brindi Nwosoh<br />
              <span className="gradient-text">Founder of ZIGEX</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-8">
              Hi, I'm Mazwewoh John Brindi Nwosoh (often known as John Brindi or Mazwewoh Nwosoh). I am the founder of 
              <a href="https://zigexconnect.com" target="_blank" rel="me noopener noreferrer" className="mx-1 text-[var(--accent)] font-semibold hover:underline">ZIGEX (zigexconnect.com)</a>, 
              the Zone for Internship, Growth and Experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="card p-8 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl">
              <Globe className="w-10 h-10 text-[var(--accent)] mb-6" />
              <h2 className="text-2xl font-semibold mb-4">What is ZIGEX?</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                ZIGEX (Zone for Internship, Growth and Experience) is an innovative platform I built to bridge the gap between academic learning and the professional ecosystem across Cameroon and Africa.
              </p>
              <a href="https://zigexconnect.com" target="_blank" rel="me noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline">
                Visit zigexconnect.com <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="card p-8 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl">
              <Shield className="w-10 h-10 text-[var(--accent-2)] mb-6" />
              <h2 className="text-2xl font-semibold mb-4">The Mission</h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                As the founder of ZigexConnect, my goal is to empower students and young professionals by connecting them with world-class internship opportunities, mentorships, and practical tech programs. We've scaled to over 500+ active users.
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-semibold mb-6">The Journey of Founding ZIGEX</h2>
            <p className="mb-6 text-[var(--text-muted)] leading-relaxed">
              When I started my journey as a Network & Systems Infrastructure Engineer and Cybersecurity Lead, I noticed a significant disconnect between what students were learning and what the industry demanded. Many talented individuals in Cameroon struggled to find the right internships or mentors.
            </p>
            <p className="mb-6 text-[var(--text-muted)] leading-relaxed">
              That's why I founded <strong>ZIGEX</strong>. I wanted to create a centralized hub where verified companies could discover exceptional local talent, and students could find roles that fit their skills perfectly. Through ZIGEX, we are building a thriving community of innovators.
            </p>
            
            <div className="mt-12 pt-8 border-t border-[var(--border)]">
              <h3 className="text-2xl font-semibold mb-4">More About Mazwewoh John Brindi Nwosoh</h3>
              <p className="mb-6 text-[var(--text-muted)] leading-relaxed">
                Beyond being the founder of ZigexConnect, I am a dedicated SOC Analyst and Security Practitioner. I regularly speak at events like DevFest Bamenda and advocate for digital empowerment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn btn-outline">
                  Read My Full Bio
                </Link>
                <Link href="/contact" className="btn btn-primary">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
