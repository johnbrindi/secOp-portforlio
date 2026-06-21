"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Mail, Github, Linkedin, Send, CheckCircle } from "lucide-react";

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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    setSubmitted(true);
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
              Whether it&apos;s a consulting inquiry, collaboration idea, or just a
              security question — I read every message.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_360px] gap-16 items-start">

            {/* ── Form ──────────────────────────────────── */}
            <div>
              {submitted ? (
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
                    Message sent!
                  </h2>
                  <p style={{ color: "var(--text-muted)" }}>
                    Thanks for reaching out. I&apos;ll get back to you within a day
                    or two.
                  </p>
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
                        Your Name
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
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email"
                        className="text-label"
                        style={{ fontSize: ".7rem" }}
                      >
                        Email Address
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
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-label"
                      style={{ fontSize: ".7rem" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell me what you need…"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      className="field resize-none"
                      required
                    />
                  </div>

                  {error && (
                    <p
                      className="text-small"
                      style={{ color: "#f87171" }}
                    >
                      {error}
                    </p>
                  )}

                  <button type="submit" className="btn btn-primary self-start">
                    Send Message <Send className="w-4 h-4" />
                  </button>
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
                    target="_blank"
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

              {/* Availability note */}
              <div
                className="card-glass p-4 rounded-[var(--radius)] mt-2"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "#4ade80" }}
                  />
                  <span className="text-small font-medium">Currently available</span>
                </div>
                <p className="text-small" style={{ color: "var(--text-muted)" }}>
                  Open to part-time consulting, internship, and freelance
                  security engagements.
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
