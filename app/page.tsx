import Link from "next/link";
import ProjectSections from "./components/ProjectSections";
import {
  education,
  profile,
  projectCaseStudies,
  quickStats,
  workExperience,
} from "./content/portfolio";

const featuredProjects = projectCaseStudies.slice(0, 5);
const recentExperience = workExperience.slice(0, 3);

export default function Home() {
  return (
    <div className="page-stack">
      <section className="notice-strip">
        <p>Building product systems across software, data, automation, and analytics.</p>
      </section>

      <header className="hero-block hero-prime">
        <div className="hero-prime-copy">
          <p className="hero-kicker">Software Portfolio</p>
          <h1>{profile.name}</h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-summary">{profile.summary}</p>
          <p className="hero-summary">
            I specialize in turning paid-media and commerce signals into
            business-ready reporting systems, KPI pipelines, and operational
            dashboards that teams can act on daily.
          </p>

          <div className="hero-actions">
            <Link href="/projects">Explore Projects</Link>
            <a href="/reports/khizar-ahmed-cv.pdf" target="_blank" rel="noreferrer">
              View CV
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <aside className="hero-terminal" aria-label="Work focus snapshot">
          <div className="hero-terminal-tabs">
            <span>software</span>
            <span>analytics</span>
            <span>automation</span>
          </div>
          <div className="hero-terminal-body">
            <p>{">"} Ship full-stack product features in production environments.</p>
            <p>{">"} Build API and automation workflows for business reporting.</p>
            <p>{">"} Operationalize QA/security findings into concrete fixes.</p>
            <p>{">"} Translate marketing metrics into decision-ready systems.</p>
          </div>
        </aside>
      </header>

      <section className="card-block strip-block">
        <div className="section-head">
          <p className="section-kicker">Highlights</p>
          <h2>Impact Snapshot</h2>
        </div>
        <div className="stats-grid">
          {quickStats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-detail">{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card-block exp-edu-block prism-block">
        <div className="section-head">
          <p className="section-kicker">Experience + Education</p>
          <h2>Recent Roles and Qualifications</h2>
        </div>
        <div className="exp-edu-layout">
          <div>
            <p className="meta-line exp-edu-summary">
              Includes cross-functional execution across engineering, marketing
              analytics, and business reporting.
            </p>
            <div className="timeline-list">
              {recentExperience.map((item) => (
                <div key={`${item.company}-${item.period}`} className="timeline-item">
                  <p className="timeline-period">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-location">{item.location}</p>
                </div>
              ))}
            </div>
            <div className="section-footer-link">
              <Link href="/experience">View full experience</Link>
            </div>
          </div>

          <aside className="edu-panel">
            <p className="section-kicker">Education</p>
            <h3>{education.degree}</h3>
            <p className="meta-line">{education.school}</p>
            <p className="meta-line">Graduated: {education.year}</p>
            <p className="meta-line">GPA: {education.gpa}</p>
            <div className="hero-actions small">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <Link href="/skills">Skills</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="card-block projects-stream">
        <div className="section-head">
          <p className="section-kicker">Projects</p>
          <h2>Featured Case Studies</h2>
        </div>
        <ProjectSections projects={featuredProjects} />

        <div className="section-footer-link">
          <Link href="/projects">Open full projects breakdown</Link>
        </div>
      </section>
    </div>
  );
}
