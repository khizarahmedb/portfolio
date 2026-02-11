import { profile } from "../content/portfolio";

export default function ContactPage() {
  return (
    <section className="page-stack">
      <header className="hero-block compact contact-hero">
        <p className="hero-kicker">Contact</p>
        <h1>Work With Me</h1>
        <p className="hero-summary">
          Open to engineering roles, consulting, and contract work where
          full-stack product delivery meets marketing and business analytics.
          I build systems that connect paid-media, commerce, and operational data
          into decision-ready reporting and automation workflows.
        </p>
      </header>

      <div className="contact-grid contact-primary">
        <article className="contact-card compact">
          <h2>Email</h2>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </article>

        <article className="contact-card compact">
          <h2>Phone</h2>
          <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>{profile.phone}</a>
        </article>

        <article className="contact-card compact">
          <h2>LinkedIn</h2>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            View profile
          </a>
        </article>

        <article className="contact-card compact">
          <h2>GitHub</h2>
          <a href={profile.github} target="_blank" rel="noreferrer">
            View repositories
          </a>
        </article>

        <article className="contact-card compact">
          <h2>CV</h2>
          <a href="/reports/khizar-ahmed-cv.pdf" target="_blank" rel="noreferrer">
            Open resume PDF
          </a>
        </article>

        <article className="contact-card compact">
          <h2>Thesis Report</h2>
          <p className="skills-description">
            I have written a QA + security thesis report and can share details
            with interested contractors or employers.
          </p>
        </article>
      </div>

      <div className="contact-grid contact-capabilities">
        <article className="contact-card">
          <h2>Business + Marketing Analytics Capability</h2>
          <p className="skills-description">
            Hands-on experience building D2C marketing data infrastructure:
            PnL automation, daily and weekly performance reporting, attribution
            indexing, forecasting pipelines, alerting systems, and executive
            summaries that reduce manual reporting and improve decision speed.
          </p>
        </article>

        <article className="contact-card">
          <h2>Software Development Capability</h2>
          <p className="skills-description">
            End-to-end product development across Next.js, React, TypeScript,
            Node.js, and API architecture. I design and ship full-stack
            features from planning to deployment, with focus on scalability,
            maintainability, performance, and clean implementation standards.
          </p>
        </article>

        <article className="contact-card">
          <h2>DevOps + Cybersec QA + Product Engineering Capability</h2>
          <p className="skills-description">
            Practical delivery across Dockerized deployments, Nginx/PM2 server
            operations, CI/CD, QA/security testing, remediation verification,
            and product engineering workflows that align technical execution
            with business outcomes.
          </p>
        </article>
      </div>
    </section>
  );
}
