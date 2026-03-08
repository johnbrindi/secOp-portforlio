import { Mail, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="section"
      style={{ background: "var(--surface)" }}
    >
      <div className="container">
        <div
          className="card-glass rounded-[var(--radius-lg)] px-8 py-14 md:px-16 text-center mx-auto"
          style={{ maxWidth: "720px" }}
        >
          <p className="text-label mb-4">Ready to collaborate?</p>
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "var(--step-4)", letterSpacing: "-.025em", lineHeight: 1.1 }}
          >
            Let's build<br />
            <span className="gradient-text">something secure.</span>
          </h2>
          <p
            className="mb-8 mx-auto"
            style={{ color: "var(--text-muted)", fontSize: "var(--step-1)", maxWidth: "42ch" }}
          >
            Whether you need a penetration test, a second opinion on your
            architecture, or just want to talk security — my inbox is always open.
          </p>
          <a
            href="mailto:johnbrindimazwewoh@gmail.com"
            className="btn btn-primary"
            style={{ fontSize: "var(--step-1)" }}
          >
            <Mail className="w-5 h-5" />
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
