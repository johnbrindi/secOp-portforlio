import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Award, ExternalLink, Clock } from "lucide-react";
import certificationsData from "./certificationsData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications — Mazwewoh John Brindi",
  description:
    "Professional cybersecurity certifications earned and in-progress by Mazwewoh John Brindi Nwosoh.",
};

const earned = certificationsData.filter((c) => c.status === "earned");
const inProgress = certificationsData.filter((c) => c.status === "in-progress");

export default function CertificationsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">

          {/* Header */}
          <div className="mb-14">
            <p className="text-label mb-3">Credentials</p>
            <h1 className="text-headline mb-4">
              Certifications that{" "}
              <span className="gradient-text">prove the work</span>
            </h1>
            <p className="text-body" style={{ color: "var(--text-muted)", maxWidth: "48ch" }}>
              Every certification here is backed by hands-on practice — not just exam prep.
            </p>
          </div>

          {/* ── Earned ────────────────────────────────────── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <p className="text-label">Earned</p>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#4ade80" }}
              />
            </div>
            <div className="flex flex-col gap-0" style={{ borderTop: "1px solid var(--border)" }}>
              {earned.map((cert, i) => (
                <div
                  key={cert.id}
                  className="group grid md:grid-cols-[auto_1fr_auto] gap-6 py-8 items-start transition-colors duration-200"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  {/* Index + icon */}
                  <div className="flex items-center gap-4">
                    <span
                      className="font-mono text-small w-8 text-right"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "var(--accent-glow)",
                        color: "var(--accent)",
                      }}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h2
                      className="font-display font-semibold mb-1"
                      style={{ fontSize: "var(--step-1)" }}
                    >
                      {cert.title}
                    </h2>
                    <p className="text-small mb-2" style={{ color: "var(--accent-2)" }}>
                      {cert.issuer} · {cert.date}
                    </p>
                    <p
                      className="text-small"
                      style={{ color: "var(--text-muted)", maxWidth: "56ch" }}
                    >
                      {cert.description}
                    </p>
                  </div>

                  {/* Link */}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline text-small flex-shrink-0 self-start"
                      style={{ padding: ".4em .9em", gap: ".4em" }}
                    >
                      Verify <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── In Progress ───────────────────────────────── */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <p className="text-label">In progress</p>
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#f59e0b" }}
              />
            </div>
            <div className="flex flex-col gap-0" style={{ borderTop: "1px solid var(--border)" }}>
              {inProgress.map((cert, i) => (
                <div
                  key={cert.id}
                  className="group grid md:grid-cols-[auto_1fr_auto] gap-6 py-8 items-start"
                  style={{
                    borderBottom: "1px solid var(--border)",
                    opacity: 0.75,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="font-mono text-small w-8 text-right"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(245,158,11,.1)",
                        color: "#f59e0b",
                        border: "1px dashed rgba(245,158,11,.3)",
                      }}
                    >
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h2
                      className="font-display font-semibold mb-1"
                      style={{ fontSize: "var(--step-1)" }}
                    >
                      {cert.title}
                    </h2>
                    <p className="text-small mb-2" style={{ color: "#f59e0b" }}>
                      {cert.issuer} · {cert.date}
                    </p>
                    <p
                      className="text-small"
                      style={{ color: "var(--text-muted)", maxWidth: "56ch" }}
                    >
                      {cert.description}
                    </p>
                  </div>

                  <span
                    className="text-label flex-shrink-0 self-start px-2 py-1 rounded-full"
                    style={{
                      fontSize: ".62rem",
                      background: "rgba(245,158,11,.1)",
                      color: "#f59e0b",
                      border: "1px solid rgba(245,158,11,.2)",
                    }}
                  >
                    In progress
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
