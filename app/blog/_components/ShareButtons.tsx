"use client";

import { useState } from "react";
import { Linkedin, Twitter, Link as LinkIcon, Check } from "lucide-react";

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const text = `${title} — by Mazwewoh John Brindi`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (permissions, insecure context) — fail quietly
    }
  }

  const buttonClass =
    "w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200";

  return (
    <div className="flex items-center gap-2">
      <span className="text-small" style={{ color: "var(--text-dim)" }}>
        Share:
      </span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        style={{ color: "var(--text-muted)", background: "var(--surface-2)" }}
        aria-label="Share on X (Twitter)"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        style={{ color: "var(--text-muted)", background: "var(--surface-2)" }}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <button
        onClick={handleCopyLink}
        className={buttonClass}
        style={{
          color: copied ? "var(--accent)" : "var(--text-muted)",
          background: "var(--surface-2)",
        }}
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
      </button>
    </div>
  );
}
