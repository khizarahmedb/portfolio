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
      <header className="hero-block">
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
      </header>

      <section className="card-block">
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

      <section className="card-block">
        <div className="section-head">
          <p className="section-kicker">Projects</p>
          <h2>Featured Case Studies</h2>
        </div>
        <ProjectSections projects={featuredProjects} />

        <div className="section-footer-link">
          <Link href="/projects">Open full projects breakdown</Link>
        </div>
      </section>

      <section className="two-col-grid">
        <article className="card-block">
          <div className="section-head">
            <p className="section-kicker">Experience</p>
            <h2>Recent Roles</h2>
          </div>
          <p className="meta-line">
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
        </article>

        <article className="card-block">
          <div className="section-head">
            <p className="section-kicker">Education</p>
            <h2>{education.degree}</h2>
          </div>
          <p className="meta-line">{education.school}</p>
          <p className="meta-line">Graduated: {education.year}</p>
          <p className="meta-line">GPA: {education.gpa}</p>
          <div className="hero-actions small">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link href="/skills">Skills</Link>
          </div>
        </article>
      </section>
    </div>
  );
}
