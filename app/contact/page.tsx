"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, Loader2, Calendar } from "lucide-react";
import type { Metadata } from "next";

const SOCIALS = [
  {
    label: "Email",
    value: "johnbrindimazwewoh@gmail.com",
    href: "mailto:johnbrindimazwewoh@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/johnbrindi",
    href: "https://github.com/johnbrindi/",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mazwewohjohnbrindi",
    href: "https://www.linkedin.com/in/mazwewohjohnbrindi/",
    icon: Linkedin,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    setErrorMsg(null);
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">

          {/* Header */}
          <div className="mb-14">
            <p className="text-label mb-3">Contact</p>
            <h1 className="text-headline mb-4">
              Let&apos;s start a{" "}
              <span className="gradient-text">conversation</span>
            </h1>
            <p className="text-body" style={{ color: "var(--text-muted)", maxWidth: "48ch" }}>
              Whether it&apos;s a consulting inquiry, collaboration idea, or just a security question — I read every message.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_360px] gap-16 items-start">

            {/* ── Form ──────────────────────────────────── */}
            <div>
              {status === "success" ? (
                <div
                  className="card-glass flex flex-col items-center gap-4 py-16 text-center rounded-[var(--radius-lg)]"
                >
                  <CheckCircle
                    className="w-12 h-12"
                    style={{ color: "#4ade80" }}
                  />
                  <h2
                    className="font-display font-semibold"
                    style={{ fontSize: "var(--step-2)" }}
                  >
                    Message received
                  </h2>
                  <p style={{ color: "var(--text-muted)" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 1–2 days.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="btn btn-outline text-small"
                    style={{ marginTop: "1rem", padding: ".5em 1.2em" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="name"
                        className="text-label"
                        style={{ fontSize: ".7rem" }}
                      >
                        Your Name <span style={{ color: "#f87171" }}>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        className="field"
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email"
                        className="text-label"
                        style={{ fontSize: ".7rem" }}
                      >
                        Email Address <span style={{ color: "#f87171" }}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="field"
                        required
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="subject"
                      className="text-label"
                      style={{ fontSize: ".7rem" }}
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Consulting inquiry, collaboration, security question…"
                      value={form.subject}
                      onChange={handleChange}
                      className="field"
                      disabled={status === "loading"}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-label"
                      style={{ fontSize: ".7rem" }}
                    >
                      Message <span style={{ color: "#f87171" }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Describe what you need…"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      className="field resize-none"
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  {(errorMsg || status === "error") && (
                    <div
                      className="flex items-start gap-2 p-3 rounded-lg"
                      style={{ background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.2)" }}
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#f87171" }} />
                      <p className="text-small" style={{ color: "#f87171" }}>
                        {errorMsg}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary self-start"
                    disabled={status === "loading"}
                    style={{ opacity: status === "loading" ? 0.7 : 1 }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-small" style={{ color: "var(--text-dim)", fontSize: ".7rem" }}>
                    Typical response time: 1–2 business days.
                  </p>
                </form>
              )}
            </div>

            {/* ── Sidebar ───────────────────────────────── */}
            <aside className="flex flex-col gap-4">
              <p className="text-label mb-2">Or reach me directly</p>

              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="card flex items-center gap-4 p-4 no-underline"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "var(--accent-glow)",
                        color: "var(--accent)",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p
                        className="text-small font-medium"
                        style={{ color: "var(--text-muted)", marginBottom: ".1em" }}
                      >
                        {s.label}
                      </p>
                      <p className="text-small" style={{ color: "var(--text)" }}>
                        {s.value}
                      </p>
                    </div>
                  </a>
                );
              })}

              {/* Schedule a call */}
              <a
                href="https://calendly.com/johnbrindimazwewoh"
                target="_blank"
                rel="noreferrer"
                className="card flex items-center gap-4 p-4 no-underline"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(74,222,128,.1)", color: "#4ade80" }}
                >
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p
                    className="text-small font-medium"
                    style={{ color: "var(--text-muted)", marginBottom: ".1em" }}
                  >
                    Schedule a call
                  </p>
                  {/* TODO: Replace with actual Calendly/Cal.com link once account is set up */}
                  <p className="text-small" style={{ color: "var(--text)" }}>
                    Book a 30-min consultation
                  </p>
                </div>
              </a>

              {/* Availability note */}
              <div className="card-glass p-4 rounded-[var(--radius)] mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "#4ade80" }}
                  />
                  <span className="text-small font-medium">Currently available</span>
                </div>
                <p className="text-small" style={{ color: "var(--text-muted)" }}>
                  Open to part-time consulting, internship, and freelance security engagements.
                </p>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
