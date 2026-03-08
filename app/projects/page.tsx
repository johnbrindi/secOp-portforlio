import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from "next/link";
import { getProjects } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import PortableTextContent from "../components/PortableTextContent";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Mazweoh John Brindi",
  description: "Cybersecurity projects including IDS design, web exploitation labs, and network security research.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main className="pt-[7rem] pb-[var(--space-xl)]">
        <div className="container">

          {/* Header */}
          <div className="mb-14">
            <p className="text-label mb-3">Portfolio</p>
            <h1 className="text-headline mb-4">
              Things I've <span className="gradient-text">built & broken</span>
            </h1>
            <p className="text-body" style={{ color: "var(--text-muted)", maxWidth: "48ch" }}>
              From Intrusion Detection Systems to web application exploitation labs —
              practical security work across different domains.
            </p>
          </div>

          {/* Grid */}
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            }}
          >
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="card group flex flex-col no-underline overflow-hidden"
              >
                {project.mainImage && (
                  <div className="overflow-hidden" style={{ height: "200px" }}>
                    <img
                      src={urlFor(project.mainImage).width(800).height(400).fit("crop").url()}
                      alt={project.mainImage.alt || project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-3 p-6 flex-1">
                  <h2
                    className="font-display font-semibold"
                    style={{ fontSize: "var(--step-1)" }}
                  >
                    {project.title}
                  </h2>

                  {project.description?.length ? (
                    <PortableTextContent
                      value={project.description}
                      className="text-small flex-1"
                    />
                  ) : null}

                  {project.tags?.length ? (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-small px-2 py-0.5 rounded-full"
                          style={{
                            background: "var(--surface-3)",
                            color: "var(--text-muted)",
                            fontSize: ".7rem",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div
                    className="flex items-center gap-1.5 text-small font-medium mt-2 transition-all duration-300 group-hover:gap-3"
                    style={{ color: "var(--accent)" }}
                  >
                    View project <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
