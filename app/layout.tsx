import type { Metadata } from "next";
import "./globals.css";

import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });

export const metadata: Metadata = {
  title: "Mazwewoh John Brindi — Cybersecurity Lead & Security Researcher",
  description:
    "Portfolio of Mazwewoh John Brindi Nwosoh — Cybersecurity Lead, SOC analyst, network security practitioner, web pentester, and founder of ZIGEX. Based in Cameroon.",
  keywords: [
    "cybersecurity",
    "SOC analyst",
    "security researcher",
    "web pentesting",
    "ZIGEX",
    "Cameroon",
    "Mazwewoh John Brindi",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  );
}