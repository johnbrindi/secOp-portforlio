import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mazweoh John Brindi — Security Researcher & SOC Analyst",
  description:
    "Portfolio of Mazweoh John Brindi N. — SOC analyst, network administrator, web pentester and security researcher.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts loaded here — NOT via CSS @import (incompatible with Tailwind v4) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}