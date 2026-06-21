import type { Metadata } from "next";
import "./globals.css";

import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });

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
      <body className={`antialiased ${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  );
}