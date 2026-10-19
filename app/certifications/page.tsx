import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Award, ExternalLink, Clock } from "lucide-react";
import certificationsData from "./certificationsData";
import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Certifications",
  description:
    "Cisco Networking Academy certificates in ethical hacking, network defense and penetration testing, plus SEED backend development — earned by Mazwewoh John Brindi.",
  path: "/certifications",
});

const earned = certificationsData.filter((c) => c.status === "earned");
const inProgress = certificationsData.filter((c) => c.status === "in-progress");

export default function CertificationsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <JsonLd data={breadcrumbSchema([["Certifications", "/certifications"]])} />
        <div className="container mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="mb-14">
            <p className="text-label mb-3">Credentials</p>
            <h1 className="text-headline mb-4">
              Certifications that{" "}
              <span className="gradient-text">prove the work</span>
            </h1>
            <p className="text-body" style={{ color: "var(--text-muted)", maxWidth: "48ch" }}>
              Cisco Networking Academy pathways in ethical hacking and network defense, backed by hands-on lab work — plus what I&apos;m studying for next.
            </p>
          </div>

          {[
            { label: "Earned", items: earned },
            { label: "Working towards", items: inProgress },
          ].map((group) => (
            <section key={group.label} className="mb-14" aria-labelledby={`certs-${group.label.replace(/ /g, "-")}`}>
              <h2 id={`certs-${group.label.replace(/ /g, "-")}`} className="text-label mb-2">
                {group.label} · {group.items.length}
              </h2>
              <div className="grid gap-0 divide-y divide-[rgba(255,255,255,.08)]">
                {group.items.map((cert, i) => (
                  <div
                    key={cert.id}
                    className="group grid gap-6 py-8 sm:grid-cols-[auto_1fr_auto] items-start transition-colors duration-200"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    {/* Index + icon */}
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className="font-mono text-small w-8 text-right"
                        style={{ color: "var(--text-dim)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                        style={{
                          background: "var(--surface-3)",
                          color: "var(--accent)",
                        }}
                      >
                        <Award className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 min-w-0">
                      <h3
                        className="font-display font-semibold mb-1"
                        style={{ fontSize: "var(--step-1)" }}
                      >
                        {cert.title}
                      </h3>
                      <p
                        className="text-small mb-2"
                        style={{ color: "var(--accent-2)" }}
                      >
                        {cert.issuer} · {cert.status === "earned" ? cert.date : "In progress"}
                      </p>
                      <p
                        className="text-small break-words"
                        style={{ color: "var(--text-muted)", maxWidth: "100%" }}
                      >
                        {cert.description}
                      </p>
                    </div>

                    {/* Link */}
                    {cert.link ? (
                      <div className="flex w-full justify-start sm:justify-end">
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline text-small flex-shrink-0 self-start w-full sm:w-auto justify-center text-center"
                          style={{ padding: ".7em 1rem", gap: ".4em" }}
                        >
                          Verify <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ))}

        </div>
      </main>
      <Footer />
    </>
  );
}
