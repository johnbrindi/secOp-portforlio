import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "CV / Résumé",
  description:
    "CV of Mazwewoh John Brindi Nwosoh: network & infrastructure engineer, SEED cybersecurity instructor, ZIGEX founder. B.Eng., NAHPI Bamenda.",
  path: "/cv",
});

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([["CV", "/cv"]])} />
      {children}
    </>
  );
}
