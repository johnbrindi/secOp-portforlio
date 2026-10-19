import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Mazwewoh John Brindi about network engineering, infrastructure and cybersecurity roles or collaboration. Bamenda, Cameroon · remote.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([["Contact", "/contact"]])} />
      {children}
    </>
  );
}
