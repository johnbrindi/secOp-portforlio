import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Trophy, Flag, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements — Mazwewoh John Brindi",
  description:
    "CTF scoreboard, platform rankings, and security challenge writeups by Mazwewoh John Brindi Nwosoh.",
};

const platforms = [
  {
    name: "HackTheBox",
    rank: "Pro Hacker",
    challenges: 24,
    points: 2840,
    color: "#9fef00",
    href: "https://app.hackthebox.com/profile/TODO",
    // TODO: Replace href with real HackTheBox profile URL
  },
  {
    name: "TryHackMe",
    rank: "Top 5%",
    challenges: 38,
    points: 14200,
    color: "#e53e3e",
    href: "https://tryhackme.com/p/TODO",
    // TODO: Replace href with real TryHackMe profile URL
  },
  {
    name: "PicoCTF",
    rank: "Competitor",
    challenges: 15,
    points: 3400,
    color: "var(--accent)",
    href: "https://picoctf.org",
  },
];

const stats = [
  { value: "77+", label: "Challenges solved" },
  { value: "3", label: "Platforms active" },
  { value: "5", label: "CTF events participated" },
  { value: "Top 5%", label: "TryHackMe ranking" },
];

const recentChallenges = [
  {
    name: "Web Exploitation — SQL Injection to RCE",
    platform: "HackTheBox",
    category: "Web",
    difficulty: "Medium",
    points: 30,
    date: "2025-05-20",
    writeupId: "3",
  },
  {
    name: "Linux Privilege Escalation — SUID Binary",
    platform: "TryHackMe",
    category: "Privilege Escalation",
    difficulty: "Medium",
    points: 40,
    date: "2025-04-15",
    writeupId: null,
  },
  {
    name: "Binary Exploitation — Buffer Overflow",
    platform: "PicoCTF",
    category: "Binary",
    difficulty: "Hard",
    points: 500,
    date: "2025-03-28",
    writeupId: null,
  },
  {
    name: "CSRF Token Bypass — Web Challenge",
    platform: "HackTheBox",
    category: "Web",
    difficulty: "Easy",
    points: 20,
    date: "2025-03-10",
    writeupId: null,
  },
  {
    name: "Network Forensics — PCAP Analysis",
    platform: "TryHackMe",
    category: "Forensics",
    difficulty: "Easy",
    points: 25,
    date: "2025-02-14",
    writeupId: null,
  },
  {
    name: "Active Directory — Kerberoasting",
    platform: "HackTheBox",
    category: "Active Directory",
    difficulty: "Hard",
    points: 50,
    date: "2025-01-22",
    writeupId: null,
  },
];

const difficultyColor: Record<string, string> = {
  Easy: "#4ade80",
  Medium: "#f59e0b",
  Hard: "#f87171",
};

export default function AchievementsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">

          {/* Header */}
          <div className="mb-14">
            <p className="text-label mb-3">Achievements</p>
            <h1 className="text-headline mb-4">
              CTF scoreboard &{" "}
              <span className="gradient-text">challenge log</span>
            </h1>
            <p className="text-body" style={{ color: "var(--text-muted)", maxWidth: "48ch" }}>
              Competitive security challenges across HackTheBox, TryHackMe, and PicoCTF.
              Write-ups for selected challenges are published in the blog.
            </p>
          </div>

          {/* Stats */}
          <div
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="card p-6 text-center"
              >
                <p
                  className="font-display font-bold mb-1"
                  style={{ fontSize: "var(--step-3)", letterSpacing: "-.02em" }}
                >
                  {s.value}
                </p>
                <p className="text-small" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Platform Cards */}
          <div className="mb-16">
            <p className="text-label mb-8">Platforms</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card group p-6 flex flex-col gap-4 no-underline"
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className="font-display font-semibold"
                      style={{ fontSize: "var(--step-1)", color: p.color }}
                    >
                      {p.name}
                    </h3>
                    <span
                      className="text-label px-2 py-0.5 rounded-full"
                      style={{
                        fontSize: ".6rem",
                        color: p.color,
                        background: `${p.color}18`,
                        border: `1px solid ${p.color}30`,
                      }}
                    >
                      {p.rank}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p
                        className="font-display font-bold"
                        style={{ fontSize: "var(--step-2)" }}
                      >
                        {p.challenges}
                      </p>
                      <p className="text-small" style={{ color: "var(--text-muted)", fontSize: ".68rem" }}>
                        Challenges
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-display font-bold"
                        style={{ fontSize: "var(--step-2)" }}
                      >
                        {p.points.toLocaleString()}
                      </p>
                      <p className="text-small" style={{ color: "var(--text-muted)", fontSize: ".68rem" }}>
                        Points
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-small font-medium mt-auto transition-all duration-300 group-hover:gap-3"
                    style={{ color: p.color }}
                  >
                    View profile <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Challenges Table */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <p className="text-label">Recent challenges</p>
              <Link
                href="/blog"
                className="flex items-center gap-1.5 text-small font-medium transition-all duration-300 hover:gap-3"
                style={{ color: "var(--accent)" }}
              >
                All writeups <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div
              className="overflow-x-auto rounded-[var(--radius)] border"
              style={{ borderColor: "var(--border)" }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "var(--step--1)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Challenge", "Platform", "Category", "Difficulty", "Points", "Date", "Writeup"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: ".75em 1em",
                          textAlign: "left",
                          color: "var(--text-muted)",
                          fontWeight: 500,
                          background: "var(--surface-2)",
                          fontFamily: "Space Mono, monospace",
                          fontSize: ".65rem",
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentChallenges.map((c, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: i < recentChallenges.length - 1 ? "1px solid var(--border)" : undefined,
                        background: i % 2 === 0 ? "var(--surface)" : "var(--surface-2)",
                      }}
                    >
                      <td
                        style={{
                          padding: ".75em 1em",
                          color: "var(--text)",
                          fontWeight: 500,
                          maxWidth: "260px",
                        }}
                      >
                        {c.name}
                      </td>
                      <td
                        style={{
                          padding: ".75em 1em",
                          color: "var(--text-muted)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.platform}
                      </td>
                      <td
                        style={{
                          padding: ".75em 1em",
                          color: "var(--text-muted)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.category}
                      </td>
                      <td style={{ padding: ".75em 1em", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            color: difficultyColor[c.difficulty] || "var(--text-muted)",
                            fontWeight: 500,
                          }}
                        >
                          {c.difficulty}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: ".75em 1em",
                          fontFamily: "Space Mono, monospace",
                          color: "var(--accent)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.points} pts
                      </td>
                      <td
                        style={{
                          padding: ".75em 1em",
                          color: "var(--text-dim)",
                          fontFamily: "Space Mono, monospace",
                          fontSize: ".7rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.date}
                      </td>
                      <td style={{ padding: ".75em 1em" }}>
                        {c.writeupId ? (
                          <Link
                            href={`/blog/${c.writeupId}`}
                            className="flex items-center gap-1 text-small font-medium hover:underline"
                            style={{ color: "var(--accent)", fontSize: ".72rem" }}
                          >
                            <Flag className="w-3 h-3" />
                            Read
                          </Link>
                        ) : (
                          <span
                            className="text-small"
                            style={{ color: "var(--text-dim)", fontSize: ".72rem" }}
                          >
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Writeups CTA */}
          <div
            className="card-glass rounded-[var(--radius-lg)] px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6" style={{ color: "#f59e0b" }} />
                <h2 className="font-display font-semibold" style={{ fontSize: "var(--step-2)" }}>
                  Published writeups
                </h2>
              </div>
              <p className="text-small" style={{ color: "var(--text-muted)", maxWidth: "40ch" }}>
                Detailed writeups for CTF challenges, including methodology, exploitation steps, and remediation notes.
              </p>
            </div>
            <Link href="/blog" className="btn btn-primary flex-shrink-0">
              Browse writeups <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
