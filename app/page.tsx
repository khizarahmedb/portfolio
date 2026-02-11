import type { CSSProperties } from "react";
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
    <div className="page-stack page-lab">
      <header className="hero-stage" data-reveal="scale-in">
        <div className="hero-readout" aria-hidden="true">
          <span>CHANNEL 00</span>
          <span>PORTFOLIO FEED</span>
        </div>
        <div className="hero-stage-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Software Portfolio</p>
            <h1>{profile.name}</h1>
            <p className="hero-title">{profile.title}</p>
            <p className="hero-summary">{profile.summary}</p>
            <p className="hero-summary">
              I build paid-media and commerce automation systems that compress
              reporting latency and expose decision-ready signals every day.
            </p>

            <div className="hero-actions">
              <Link href="/projects">Explore Projects</Link>
              <a
                href="/reports/khizar-ahmed-cv.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View CV
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <aside
            className="hero-satellites"
            aria-label="Impact Snapshot"
            data-reveal="slide-up"
          >
            {quickStats.map((stat, index) => (
              <article
                key={stat.label}
                className={`satellite-card satellite-card-${index + 1}`}
                style={
                  {
                    "--reveal-delay": `${120 + index * 80}ms`,
                  } as CSSProperties
                }
                data-reveal="slide-up"
              >
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-detail">{stat.detail}</p>
              </article>
            ))}
          </aside>
        </div>

        <div className="hero-marquee" aria-hidden="true">
          <span>automation pipelines</span>
          <span>qa + appsec execution</span>
          <span>full-stack delivery</span>
          <span>analytics ops</span>
          <span>system design</span>
        </div>
      </header>

      <section className="experience-river" data-reveal="slide-up">
        <div className="section-head">
          <p className="section-kicker">Experience + Education</p>
          <h2>Recent Roles and Qualifications</h2>
        </div>
        <p className="meta-line exp-edu-summary">
          Cross-functional execution across engineering, growth analytics, and
          business reporting workflows.
        </p>

        <div className="river-track">
          {recentExperience.map((item) => (
            <article
              key={`${item.company}-${item.period}`}
              className="river-node"
              data-reveal="slide-up"
            >
              <p className="timeline-period">{item.period}</p>
              <h3>{item.role}</h3>
              <p className="timeline-company">{item.company}</p>
              <p className="timeline-location">{item.location}</p>
            </article>
          ))}

          <aside className="education-node" data-reveal="slide-up">
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

        <div className="section-footer-link">
          <Link href="/experience">View full experience</Link>
        </div>
      </section>

      <section className="project-lab" data-reveal="slide-up">
        <div className="section-head">
          <p className="section-kicker">Projects</p>
          <h2>Featured Case Studies</h2>
        </div>
        <p className="meta-line project-lab-intro">
          Expand each strip to inspect architecture, outcomes, and production
          constraints.
        </p>
        <ProjectSections projects={featuredProjects} />

        <div className="section-footer-link">
          <Link href="/projects">Open full projects breakdown</Link>
        </div>
      </section>
    </div>
  );
}
