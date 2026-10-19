import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container text-center py-20">
          <p className="text-label mb-4">404</p>
          <h1 className="text-headline mb-4">Page not found</h1>
          <p className="text-body mb-8 mx-auto" style={{ color: "var(--text-muted)", maxWidth: "42ch" }}>
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="btn btn-primary">
              <ArrowLeft className="w-4 h-4" /> Back home
            </Link>
            <Link href="/projects" className="btn btn-outline">
              View projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
