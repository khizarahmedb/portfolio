"use client";

import { useState } from "react";
import {
  projectCaseStudies,
  type ProjectCaseStudy,
} from "../content/portfolio";

function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

function ProjectPanel({ project }: { project: ProjectCaseStudy }) {
  return (
    <article className="project-panel" id={`${project.slug}-details`}>
      <div className="project-panel-grid">
        <section>
          <h3>Project Description</h3>
          <p>{project.description}</p>
        </section>
        <section>
          <h3>Goal</h3>
          <p>{project.goal}</p>
        </section>
        <section>
          <h3>Achievement</h3>
          <p>{project.achievement}</p>
        </section>
      </div>

      <div className="project-panel-columns">
        <section>
          <h3>What I Built</h3>
          <ul>
            {project.whatIBuilt.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Features</h3>
          <ul>
            {project.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Outcomes</h3>
          <ul>
            {project.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h3>Skills Used</h3>
        <div className="chip-wrap">
          {project.skillsUsed.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {project.scriptUseCases && project.scriptUseCases.length > 0 ? (
        <section>
          <h3>D2C Automation Script Use Cases</h3>
          <p className="muted-text">
            Selected marketing automation and analytics use cases from
            production workflows.
          </p>
          <div className="script-grid">
            {project.scriptUseCases.map((scriptItem) => (
              <div key={scriptItem.script} className="script-row">
                <h4 className="script-title">{scriptItem.script}</h4>
                <p>{scriptItem.useCase}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {project.links.length > 0 ? (
        <section>
          <h3>Links</h3>
          <div className="link-list">
            {project.links.map((link) => (
              <a
                key={`${project.slug}-${link.href}-${link.label}`}
                href={link.href}
                target={isExternalUrl(link.href) ? "_blank" : undefined}
                rel={isExternalUrl(link.href) ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
          {project.links.some((link) => link.note) ? (
            <div className="note-list">
              {project.links
                .filter((link) => Boolean(link.note))
                .map((link) => (
                  <p key={`${project.slug}-${link.label}-note`}>
                    {link.label}: {link.note}
                  </p>
                ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {project.confidentialityNote ? (
        <section className="confidentiality-note">
          <h3>Public-Safe Disclosure</h3>
          <p>{project.confidentialityNote}</p>
        </section>
      ) : null}
    </article>
  );
}

type ProjectSectionsProps = {
  projects?: ProjectCaseStudy[];
  defaultOpenSlug?: string | null;
};

export default function ProjectSections({
  projects = projectCaseStudies,
  defaultOpenSlug,
}: ProjectSectionsProps) {
  const [openProjectSlug, setOpenProjectSlug] = useState<string | null>(
    defaultOpenSlug ?? null
  );

  return (
    <div className="project-sections">
      {projects.map((project) => {
        const isOpen = openProjectSlug === project.slug;

        return (
          <section
            key={project.slug}
            className={`project-section ${isOpen ? "is-open" : ""}`}
          >
            <button
              type="button"
              className="project-toggle"
              aria-expanded={isOpen}
              aria-controls={`${project.slug}-details`}
              onClick={() =>
                setOpenProjectSlug((current) =>
                  current === project.slug ? null : project.slug
                )
              }
            >
              <div className="project-toggle-main">
                <p className="project-kicker">{project.projectType}</p>
                <h2>{project.title}</h2>
                <p className="project-summary">{project.summary}</p>
              </div>
              <div className="project-toggle-meta">
                <span>{project.period}</span>
                <span className={`project-toggle-cta ${isOpen ? "is-open" : ""}`}>
                  <span className="project-toggle-cta-label">Details</span>
                  <span
                    aria-hidden="true"
                    className={`project-toggle-indicator ${isOpen ? "is-open" : ""}`}
                  >
                    &gt;
                  </span>
                </span>
              </div>
            </button>

            <div
              className={`project-panel-shell ${isOpen ? "is-open" : ""}`}
              aria-hidden={!isOpen}
            >
              <div className="project-panel-inner">
                <ProjectPanel project={project} />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
